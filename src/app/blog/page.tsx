import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos técnicos sobre segurança, IA e engenharia de software por Gustavo Viana.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogClient posts={posts} />
}
