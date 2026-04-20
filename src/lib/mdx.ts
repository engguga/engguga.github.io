import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  lang: 'pt' | 'en'
  readingTime: string
  published: boolean
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(lang?: 'pt' | 'en'): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    const rt = readingTime(content)

    return {
      slug: file.replace('.mdx', ''),
      title: data.title ?? 'Untitled',
      date: data.date ?? '',
      summary: data.summary ?? '',
      tags: data.tags ?? [],
      lang: data.lang ?? 'pt',
      readingTime: Math.ceil(rt.minutes).toString(),
      published: data.published !== false,
    } as PostMeta
  })

  return posts
    .filter(p => p.published && (!lang || p.lang === lang))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    title: data.title ?? 'Untitled',
    date: data.date ?? '',
    summary: data.summary ?? '',
    tags: data.tags ?? [],
    lang: data.lang ?? 'pt',
    readingTime: Math.ceil(rt.minutes).toString(),
    published: data.published !== false,
    content,
  }
}
