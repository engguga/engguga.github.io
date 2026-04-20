import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllPosts, getPost } from '@/lib/mdx'
import PostClient from './PostClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) notFound()
  return <PostClient post={post} />
}
