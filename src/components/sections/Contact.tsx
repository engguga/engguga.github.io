'use client'

import { Github, Linkedin, Mail, BookOpen, Instagram, ArrowUpRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import SectionWrapper from '@/components/ui/SectionWrapper'

const LINKS = [
  {
    key: 'email',
    icon: Mail,
    href: 'mailto:engsoftwaregustavoviana@gmail.com',
    display: 'engsoftwaregustavoviana@gmail.com',
  },
  {
    key: 'github',
    icon: Github,
    href: 'https://github.com/engguga',
    display: 'github.com/engguga',
  },
  {
    key: 'linkedin',
    icon: Linkedin,
    href: 'https://linkedin.com/in/gustavo-viana',
    display: 'linkedin.com/in/gustavo-viana',
  },
  {
    key: 'medium',
    icon: BookOpen,
    href: 'https://medium.com/@gugacyber',
    display: 'medium.com/@gugacyber',
  },
  {
    key: 'instagram',
    icon: Instagram,
    href: 'https://instagram.com/gugacyber',
    display: '@gugacyber',
  },
] as const

export default function Contact() {
  const { t } = useI18n()
  const c = t.contact

  return (
    <SectionWrapper id="contact" className="max-w-5xl mx-auto px-6 py-24">
      <p className="text-xs font-mono text-[#3b82f6] uppercase tracking-widest mb-4">
        {c.label}
      </p>
      <h2 className="text-3xl font-semibold text-[#fafafa] mb-3">{c.title}</h2>
      <p className="text-[#a1a1aa] mb-12 max-w-xl">{c.subtitle}</p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {LINKS.map(({ key, icon: Icon, href, display }) => (
          <a
            key={key}
            href={href}
            target={key !== 'email' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 border border-[#27272a] rounded-xl bg-[#0d0d0f] card-hover"
          >
            <div className="p-2 rounded-lg bg-[#18181b] border border-[#27272a] shrink-0">
              <Icon size={16} className="text-[#60a5fa]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-[#52525b] mb-0.5 uppercase tracking-wider">
                {c[key as keyof typeof c]}
              </p>
              <p className="text-xs text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors truncate">
                {display}
              </p>
            </div>
            <ArrowUpRight
              size={14}
              className="text-[#27272a] group-hover:text-[#52525b] transition-colors shrink-0"
            />
          </a>
        ))}
      </div>
    </SectionWrapper>
  )
}
