'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const NAV_LINKS = ['about', 'projects', 'research', 'blog', 'books', 'contact'] as const

export default function Navbar() {
  const { t, locale, setLocale } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-sm text-[#fafafa] hover:text-[#60a5fa] transition-colors"
          >
            <span className="text-[#52525b]">~/</span>gustavo-viana
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(key => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
              >
                {t.nav[key as keyof typeof t.nav]}
              </button>
            ))}
          </nav>

          {/* Right: Lang switcher + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === 'pt' ? 'en' : 'pt')}
              className="hidden md:flex text-xs font-mono text-[#52525b] hover:text-[#a1a1aa] transition-colors border border-[#27272a] rounded px-2 py-1"
            >
              {locale === 'pt' ? 'EN' : 'PT'}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#09090b] pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map(key => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className="text-left text-xl text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                >
                  {t.nav[key as keyof typeof t.nav]}
                </button>
              ))}
              <button
                onClick={() => { setLocale(locale === 'pt' ? 'en' : 'pt'); setOpen(false) }}
                className="text-left text-sm font-mono text-[#52525b] hover:text-[#a1a1aa] transition-colors mt-4"
              >
                Switch to {locale === 'pt' ? 'English' : 'Português'}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
