'use client'

import { Download, ExternalLink, FileText } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { motion } from 'framer-motion'

export default function Research() {
  const { t } = useI18n()
  const r = t.research

  return (
    <SectionWrapper id="research" className="max-w-5xl mx-auto px-6 py-24">
      <p className="text-xs font-mono text-[#3b82f6] uppercase tracking-widest mb-4">
        {r.label}
      </p>
      <h2 className="text-3xl font-semibold text-[#fafafa] mb-3">{r.title}</h2>
      <p className="text-[#a1a1aa] mb-12 max-w-xl">{r.subtitle}</p>

      <div className="space-y-5">
        {r.items.map((paper, i) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group border border-[#27272a] rounded-2xl p-6 bg-[#0d0d0f] card-hover"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="shrink-0 mt-1 p-2 rounded-lg bg-[#18181b] border border-[#27272a]">
                <FileText size={18} className="text-[#60a5fa]" />
              </div>

              <div className="flex-1 min-w-0">
                {/* Year + institution */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-[#52525b]">{paper.year}</span>
                  <span className="text-xs text-[#3f3f46]">·</span>
                  <span className="text-xs text-[#52525b]">{paper.institution}</span>
                </div>

                <h3 className="text-sm font-semibold text-[#fafafa] leading-snug mb-3">
                  {paper.title}
                </h3>

                <p className="text-sm text-[#71717a] leading-relaxed mb-4">
                  {paper.abstract}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {paper.topics.map(topic => (
                    <span key={topic} className="tag text-[10px]">{topic}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={paper.pdf}
                    download
                    className="flex items-center gap-1.5 text-xs font-medium text-[#fafafa] bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] hover:border-[#3f3f46] rounded-lg px-3 py-1.5 transition-colors"
                  >
                    <Download size={12} />
                    {r.download_pdf}
                  </a>
                  <a
                    href={paper.zenodo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors"
                  >
                    <ExternalLink size={12} />
                    {r.view_zenodo}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
