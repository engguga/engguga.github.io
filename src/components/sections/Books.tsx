'use client'

import { BookOpen, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import SectionWrapper from '@/components/ui/SectionWrapper'

const LEVEL_COLOR: Record<string, string> = {
  'Avançado':     'text-red-400 bg-red-400/10 border-red-400/20',
  'Advanced':     'text-red-400 bg-red-400/10 border-red-400/20',
  'Intermediário':'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Intermediate': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Iniciante':    'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Beginner':     'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
}

export default function Books() {
  const { t } = useI18n()
  const b = t.books

  return (
    <SectionWrapper id="books" className="max-w-5xl mx-auto px-6 py-24">
      <p className="text-xs font-mono text-[#3b82f6] uppercase tracking-widest mb-4">
        {b.label}
      </p>
      <h2 className="text-3xl font-semibold text-[#fafafa] mb-3">{b.title}</h2>
      <p className="text-[#a1a1aa] mb-12 max-w-xl">{b.subtitle}</p>

      <div className="grid md:grid-cols-3 gap-5">
        {b.items.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col border border-[#27272a] rounded-2xl p-6 bg-[#0d0d0f] card-hover"
          >
            {/* Icon + level */}
            <div className="flex items-start justify-between mb-5">
              <div className="p-2 rounded-lg bg-[#18181b] border border-[#27272a]">
                <BookOpen size={18} className="text-[#60a5fa]" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${LEVEL_COLOR[book.level] ?? 'text-[#52525b] bg-[#18181b] border-[#27272a]'}`}>
                {book.level}
              </span>
            </div>

            {/* Title + author */}
            <h3 className="text-sm font-semibold text-[#fafafa] leading-snug mb-1">
              {book.title}
            </h3>
            <p className="text-xs font-mono text-[#60a5fa] mb-1">{book.author}</p>
            <p className="text-xs text-[#3f3f46] mb-4">
              {book.publisher} · {book.year}
            </p>

            {/* Description */}
            <p className="text-sm text-[#71717a] leading-relaxed flex-1">
              {book.description}
            </p>

            {/* Topics */}
            <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#27272a]">
              {book.topics.map(topic => (
                <span key={topic} className="tag text-[10px]">{topic}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
