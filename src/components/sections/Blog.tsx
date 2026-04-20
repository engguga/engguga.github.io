'use client'

import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import SectionWrapper from '@/components/ui/SectionWrapper'
import type { PostMeta } from '@/lib/mdx'

interface Props {
  posts: PostMeta[]
}

export default function Blog({ posts }: Props) {
  const { t, locale } = useI18n()
  const b = t.blog

  const filtered = posts.filter(p => p.lang === locale).slice(0, 3)

  return (
    <SectionWrapper id="blog" className="max-w-5xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs font-mono text-[#3b82f6] uppercase tracking-widest mb-4">
            {b.label}
          </p>
          <h2 className="text-3xl font-semibold text-[#fafafa] mb-2">{b.title}</h2>
          <p className="text-[#a1a1aa] max-w-xl">{b.subtitle}</p>
        </div>
        <Link
          href="/blog"
          className="hidden md:flex items-center gap-1.5 text-sm text-[#52525b] hover:text-[#a1a1aa] transition-colors shrink-0"
        >
          {b.all_posts}
          <ArrowRight size={14} />
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-[#27272a] rounded-2xl p-12 text-center">
          <p className="text-sm text-[#3f3f46] font-mono">{b.no_posts}</p>
        </div>
      ) : (
        <div className="divide-y divide-[#27272a]">
          {filtered.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start justify-between gap-6 py-5 hover:bg-[#111113] -mx-4 px-4 rounded-xl transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-[#e4e4e7] group-hover:text-[#fafafa] transition-colors mb-1 truncate">
                  {post.title}
                </h3>
                <p className="text-xs text-[#52525b] line-clamp-1">{post.summary}</p>
                <div className="flex items-center gap-3 mt-2">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="tag text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-[#3f3f46] font-mono">
                  {new Date(post.date).toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })}
                </p>
                <p className="flex items-center justify-end gap-1 text-xs text-[#3f3f46] mt-1">
                  <Clock size={11} />
                  {post.readingTime} {b.min_read}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link
        href="/blog"
        className="mt-8 flex md:hidden items-center gap-1.5 text-sm text-[#52525b] hover:text-[#a1a1aa] transition-colors"
      >
        {b.all_posts}
        <ArrowRight size={14} />
      </Link>
    </SectionWrapper>
  )
}
