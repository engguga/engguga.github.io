'use client'

import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Post } from '@/lib/mdx'

interface Props {
  post: Post
}

export default function PostClient({ post }: Props) {
  const { t, locale } = useI18n()
  const b = t.blog

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[#52525b] hover:text-[#a1a1aa] transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            {b.back_to_blog}
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold text-[#fafafa] leading-tight mb-5">
              {post.title}
            </h1>

            <div className="flex items-center gap-5 text-xs text-[#52525b] font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString(
                  locale === 'pt' ? 'pt-BR' : 'en-US',
                  { day: 'numeric', month: 'long', year: 'numeric' }
                )}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {post.readingTime} {b.min_read}
              </span>
              <span>{b.by} Gustavo Viana</span>
            </div>
          </header>

          <div className="border-t border-[#27272a] mb-10" />

          {/* MDX Content */}
          <article className="prose prose-sm prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
