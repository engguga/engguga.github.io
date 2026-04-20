'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { PostMeta } from '@/lib/mdx'
import { cn } from '@/lib/utils'

interface Props {
  posts: PostMeta[]
}

export default function BlogClient({ posts }: Props) {
  const { t, locale } = useI18n()
  const b = t.blog
  const [filter, setFilter] = useState<string | null>(null)

  const filtered = posts
    .filter(p => p.lang === locale)
    .filter(p => !filter || p.tags.includes(filter))

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)))

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#52525b] hover:text-[#a1a1aa] transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            Home
          </Link>

          <p className="text-xs font-mono text-[#3b82f6] uppercase tracking-widest mb-4">
            {b.label}
          </p>
          <h1 className="text-3xl font-semibold text-[#fafafa] mb-3">{b.title}</h1>
          <p className="text-[#a1a1aa] mb-10">{b.subtitle}</p>

          {/* Tag filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setFilter(null)}
                className={cn(
                  'tag transition-all',
                  !filter
                    ? 'bg-[#3b82f6]/20 border-[#3b82f6]/40 text-[#60a5fa]'
                    : 'opacity-50 hover:opacity-100'
                )}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag === filter ? null : tag)}
                  className={cn(
                    'tag transition-all',
                    filter === tag
                      ? 'bg-[#3b82f6]/20 border-[#3b82f6]/40 text-[#60a5fa]'
                      : 'opacity-50 hover:opacity-100'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Posts */}
          {filtered.length === 0 ? (
            <div className="border border-dashed border-[#27272a] rounded-2xl p-16 text-center">
              <p className="text-sm text-[#3f3f46] font-mono">{b.no_posts}</p>
            </div>
          ) : (
            <div className="divide-y divide-[#27272a]">
              {filtered.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block py-6 hover:bg-[#111113] -mx-4 px-4 rounded-xl transition-colors"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-base font-medium text-[#e4e4e7] group-hover:text-[#fafafa] transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#52525b] mb-3 leading-relaxed">{post.summary}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag text-[10px]">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-[#3f3f46] font-mono whitespace-nowrap">
                        {new Date(post.date).toLocaleDateString(
                          locale === 'pt' ? 'pt-BR' : 'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </p>
                      <p className="flex items-center justify-end gap-1 text-xs text-[#3f3f46] mt-1">
                        <Clock size={11} />
                        {post.readingTime} {b.min_read}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
