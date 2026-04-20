'use client'

import { Github, Linkedin, Mail, BookOpen, Instagram } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const SOCIAL = [
  { icon: Github,    href: 'https://github.com/engguga',                          label: 'GitHub' },
  { icon: Linkedin,  href: 'https://linkedin.com/in/gustavo-viana',               label: 'LinkedIn' },
  { icon: Mail,      href: 'mailto:engsoftwaregustavoviana@gmail.com',             label: 'Email' },
  { icon: BookOpen,  href: 'https://medium.com/@gugacyber',                        label: 'Medium' },
  { icon: Instagram, href: 'https://instagram.com/gugacyber',                      label: 'Instagram' },
]

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-[#27272a] mt-32">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#52525b] hover:text-[#a1a1aa] transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs text-[#3f3f46]">
            © {new Date().getFullYear()} Gustavo Lima Viana. {t.footer.rights}
          </p>
          <p className="text-xs text-[#3f3f46] mt-1">{t.footer.built_with}</p>
        </div>
      </div>
    </footer>
  )
}
