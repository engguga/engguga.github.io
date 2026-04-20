# gustavo-viana-site

Personal website for Gustavo Lima Viana — Software Engineer & Security Researcher.

Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and MDX.

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── blog/         # Blog listing + post pages
│   ├── layout.tsx    # Root layout (theme, fonts, SEO)
│   ├── page.tsx      # Home page
│   └── globals.css   # Design tokens + base styles
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, About, Projects, Research, Blog, Contact
│   └── ui/           # SectionWrapper (scroll reveal)
├── content/
│   └── blog/         # MDX blog posts
├── lib/
│   ├── i18n.tsx      # Bilingual context (pt-BR / EN)
│   ├── mdx.ts        # MDX utilities (read, parse posts)
│   └── utils.ts      # cn() helper
└── messages/
    ├── pt.json       # Portuguese strings
    └── en.json       # English strings
public/
├── images/
│   └── photo.jpg     # Profile photo (ADD THIS)
└── pdfs/
    ├── Viana_SPEF_Framework_LLM_Security.pdf
    └── Viana_Brazilian_Municipal_Security_Assessment_2025.pdf
```

## Adding Files

### Profile Photo
Copy your photo to `public/images/photo.jpg`.

### Research PDFs
Copy your papers to `public/pdfs/`:
- `Viana_SPEF_Framework_LLM_Security.pdf`
- `Viana_Brazilian_Municipal_Security_Assessment_2025.pdf`

## Writing Blog Posts

Create a `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2026-05-01"
summary: "A short description of your post."
tags: ["Security", "AI"]
lang: pt        # pt or en
published: true
---

Your content here...
```

## Deployment

This project deploys automatically to GitHub Pages via GitHub Actions.

1. Go to your repo **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the site builds and deploys automatically

Live at: `https://engguga.github.io`

## Geist Font

This project uses Geist font from Vercel. Install the package:

```bash
npm install geist
```

If you run into issues, replace with Inter:
```tsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' })
```
