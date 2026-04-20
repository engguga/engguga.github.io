#!/usr/bin/env python3
"""
fetch_news.py — Busca notícias de segurança e gera posts MDX automaticamente.

Fontes: RSS feeds públicos (sem API key necessária)
IA:     Anthropic API (ANTHROPIC_API_KEY obrigatório como secret no GitHub)

Uso:
    python scripts/fetch_news.py

Variáveis de ambiente necessárias:
    ANTHROPIC_API_KEY  — chave da API da Anthropic
"""

import os
import re
import sys
import json
import hashlib
import datetime
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET

# ─── Configurações ────────────────────────────────────────────────────────────

# Quantas notícias buscar por execução
MAX_POSTS_PER_RUN = 2

# Idioma principal dos posts gerados
POST_LANG = "pt"

# Pasta de destino dos posts MDX
BLOG_DIR = "src/content/blog"

# Arquivo de controle (evita publicar a mesma notícia duas vezes)
SEEN_FILE = "scripts/.seen_articles.json"

# Feeds RSS monitorados
RSS_FEEDS = [
    {
        "url": "https://feeds.feedburner.com/TheHackersNews",
        "source": "The Hacker News",
        "topics": ["Cybersecurity", "Hacking", "Vulnerabilities"],
    },
    {
        "url": "https://www.bleepingcomputer.com/feed/",
        "source": "BleepingComputer",
        "topics": ["Cybersecurity", "Malware", "Ransomware"],
    },
    {
        "url": "https://krebsonsecurity.com/feed/",
        "source": "Krebs on Security",
        "topics": ["Cybersecurity", "Fraud", "Investigations"],
    },
    {
        "url": "https://www.darkreading.com/rss.xml",
        "source": "Dark Reading",
        "topics": ["Security", "Threats", "Vulnerabilities"],
    },
]

# ─── Helpers ──────────────────────────────────────────────────────────────────

def load_seen() -> set:
    """Carrega os hashes dos artigos já publicados."""
    if not os.path.exists(SEEN_FILE):
        return set()
    with open(SEEN_FILE, "r") as f:
        return set(json.load(f))


def save_seen(seen: set) -> None:
    """Salva os hashes atualizados."""
    os.makedirs(os.path.dirname(SEEN_FILE), exist_ok=True)
    with open(SEEN_FILE, "w") as f:
        json.dump(list(seen), f, indent=2)


def article_hash(url: str) -> str:
    return hashlib.sha256(url.encode()).hexdigest()[:16]


def slugify(text: str) -> str:
    """Converte título em slug para nome de arquivo."""
    text = text.lower()
    text = re.sub(r"[áàãâä]", "a", text)
    text = re.sub(r"[éèêë]", "e", text)
    text = re.sub(r"[íìîï]", "i", text)
    text = re.sub(r"[óòõôö]", "o", text)
    text = re.sub(r"[úùûü]", "u", text)
    text = re.sub(r"[ç]", "c", text)
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s-]+", "-", text).strip("-")
    return text[:60]


def fetch_rss(feed_url: str) -> list[dict]:
    """Busca e parseia um feed RSS. Retorna lista de artigos."""
    articles = []
    try:
        req = urllib.request.Request(
            feed_url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; SecurityNewsBot/1.0)"},
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()

        root = ET.fromstring(content)
        ns = {"atom": "http://www.w3.org/2005/Atom"}

        # RSS 2.0
        items = root.findall(".//item")
        for item in items[:5]:  # máximo 5 por feed
            title = item.findtext("title", "").strip()
            link  = item.findtext("link", "").strip()
            desc  = item.findtext("description", "").strip()
            pub   = item.findtext("pubDate", "").strip()

            # Remove tags HTML da descrição
            desc = re.sub(r"<[^>]+>", " ", desc)
            desc = re.sub(r"\s+", " ", desc).strip()[:600]

            if title and link:
                articles.append({
                    "title": title,
                    "url": link,
                    "description": desc,
                    "published": pub,
                })

    except Exception as e:
        print(f"  ⚠ Erro ao buscar {feed_url}: {e}")

    return articles


def call_claude(prompt: str, max_tokens: int = 1800) -> str:
    """Chama a API da Anthropic e retorna o texto gerado."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("ANTHROPIC_API_KEY não encontrada nas variáveis de ambiente.")

    import json as _json
    import urllib.request as _req

    body = _json.dumps({
        "model": "claude-sonnet-4-20250514",
        "max_tokens": max_tokens,
        "messages": [{"role": "user", "content": prompt}],
    }).encode()

    request = _req.Request(
        "https://api.anthropic.com/v1/messages",
        data=body,
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
        },
        method="POST",
    )

    with _req.urlopen(request, timeout=60) as resp:
        data = _json.loads(resp.read())

    return data["content"][0]["text"].strip()


def generate_post(article: dict, source: str, topics: list[str]) -> dict:
    """Usa IA para gerar o conteúdo do post em português."""

    prompt = f"""Você é Gustavo Viana, engenheiro de software e pesquisador em segurança.
Escreva um post técnico para o seu site pessoal sobre a seguinte notícia de segurança:

TÍTULO DA NOTÍCIA: {article['title']}
FONTE: {source}
RESUMO: {article['description']}
URL ORIGINAL: {article['url']}

INSTRUÇÕES:
- Escreva em português brasileiro (pt-BR)
- Tom: técnico, direto, analítico — como um pesquisador que comenta a notícia com profundidade
- NÃO copie o texto original. Analise, contextualize e adicione sua perspectiva
- Estrutura: comece com contexto, depois analise o impacto técnico, depois o que isso significa para defesa/segurança
- Inclua no mínimo 3 subtítulos usando ## (markdown)
- Mencione a fonte e link ao final
- Comprimento: 400-600 palavras
- NÃO inclua o frontmatter YAML — apenas o corpo do post em markdown

Escreva apenas o corpo do post, sem introdução ou explicação adicional."""

    content = call_claude(prompt)

    # Gerar título e tags com outra chamada curta
    meta_prompt = f"""Com base neste conteúdo de post sobre segurança:

"{article['title']}"

Responda APENAS com JSON válido no seguinte formato (sem markdown, sem explicação):
{{
  "title_pt": "título em português do post (máximo 80 chars)",
  "summary_pt": "resumo em uma frase (máximo 120 chars)",
  "tags": ["tag1", "tag2", "tag3"]
}}

Tags disponíveis para escolher (escolha 2-4 relevantes): Cybersecurity, LLM Security, AI Safety, Malware, Ransomware, Vulnerabilities, Pentest, Network Security, Privacy, Data Breach, Phishing, Web Security, OSINT, Exploit"""

    meta_raw = call_claude(meta_prompt, max_tokens=300)

    # Extrair JSON da resposta
    match = re.search(r"\{.*\}", meta_raw, re.DOTALL)
    if match:
        meta = json.loads(match.group())
    else:
        meta = {
            "title_pt": article["title"][:80],
            "summary_pt": article["description"][:120],
            "tags": topics[:3],
        }

    return {
        "title": meta.get("title_pt", article["title"]),
        "summary": meta.get("summary_pt", ""),
        "tags": meta.get("tags", topics[:3]),
        "content": content,
        "source_url": article["url"],
        "source_name": source,
    }


def write_mdx(post: dict) -> str:
    """Escreve o arquivo .mdx e retorna o caminho."""
    os.makedirs(BLOG_DIR, exist_ok=True)

    today = datetime.date.today().isoformat()
    slug = f"{today}-{slugify(post['title'])}"
    filepath = os.path.join(BLOG_DIR, f"{slug}.mdx")

    # Escapar aspas no título para o YAML
    title_safe = post["title"].replace('"', '\\"')
    summary_safe = post["summary"].replace('"', '\\"')
    tags_yaml = json.dumps(post["tags"])

    frontmatter = f"""---
title: "{title_safe}"
date: "{today}"
summary: "{summary_safe}"
tags: {tags_yaml}
lang: {POST_LANG}
published: true
source: "{post['source_name']}"
source_url: "{post['source_url']}"
---

"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(frontmatter + post["content"])

    return filepath


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("🔍 Buscando notícias de segurança...")

    seen = load_seen()
    new_articles = []

    for feed in RSS_FEEDS:
        print(f"  → {feed['source']}")
        articles = fetch_rss(feed["url"])
        for article in articles:
            h = article_hash(article["url"])
            if h not in seen:
                new_articles.append({**article, **feed, "hash": h})

    if not new_articles:
        print("✅ Nenhuma notícia nova encontrada. Nada a publicar.")
        return

    print(f"\n📰 {len(new_articles)} notícias novas encontradas. Gerando posts...")

    published = 0
    for article in new_articles:
        if published >= MAX_POSTS_PER_RUN:
            break

        print(f"\n  ✍ Gerando post: {article['title'][:60]}...")
        try:
            post = generate_post(article, article["source"], article["topics"])
            path = write_mdx(post)
            seen.add(article["hash"])
            published += 1
            print(f"  ✅ Publicado: {path}")
        except Exception as e:
            print(f"  ❌ Erro ao gerar post: {e}")
            continue

    save_seen(seen)
    print(f"\n🚀 {published} post(s) publicado(s) com sucesso.")


if __name__ == "__main__":
    main()
