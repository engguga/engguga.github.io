'use client'

import { ExternalLink, Github, Shield, Link2, Phone } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { motion } from 'framer-motion'

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  phishguard:    <Shield size={20} className="text-[#60a5fa]" />,
  hermes:        <Link2 size={20} className="text-[#60a5fa]" />,
  'numero-seguro': <Phone size={20} className="text-[#60a5fa]" />,
}

export default function Projects() {
  const { t } = useI18n()
  const p = t.projects

  return (
    <SectionWrapper id="projects" className="max-w-5xl mx-auto px-6 py-24">
      <p className="text-xs font-mono text-[#3b82f6] uppercase tracking-widest mb-4">
        {p.label}
      </p>
      <h2 className="text-3xl font-semibold text-[#fafafa] mb-3">{p.title}</h2>
      <p className="text-[#a1a1aa] mb-12 max-w-xl">{p.subtitle}</p>

      <div className="grid md:grid-cols-3 gap-5">
        {p.items.map((proj, i) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col border border-[#27272a] rounded-2xl p-6 bg-[#0d0d0f] card-hover"
          >
            {/* Icon + title */}
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-[#18181b] border border-[#27272a]">
                {PROJECT_ICONS[proj.id]}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#52525b] hover:text-[#a1a1aa] transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#52525b] hover:text-[#a1a1aa] transition-colors"
                  aria-label="Live demo"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <h3 className="text-base font-semibold text-[#fafafa] mb-1">{proj.name}</h3>
            <p className="text-xs font-mono text-[#60a5fa] mb-3">{proj.tagline}</p>
            <p className="text-sm text-[#71717a] leading-relaxed flex-1">{proj.description}</p>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {proj.stack.map(tech => (
                <span key={tech} className="tag text-[10px]">{tech}</span>
              ))}
            </div>

            {/* Footer links */}
            <div className="flex gap-4 mt-5 pt-4 border-t border-[#27272a]">
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
              >
                <ExternalLink size={12} />
                {p.view_project}
              </a>
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors"
              >
                <Github size={12} />
                {p.view_code}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
