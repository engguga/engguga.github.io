'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, MapPin, Circle } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export default function Hero() {
  const { t } = useI18n()

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Ambient glow */}
      <div
        className="glow-blob w-[600px] h-[600px] bg-blue-500/10 top-[-100px] right-[-200px]"
        style={{ position: 'absolute' }}
      />
      <div
        className="glow-blob w-[400px] h-[400px] bg-blue-700/10 bottom-0 left-[-100px]"
        style={{ position: 'absolute', animationDelay: '4s' }}
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center py-24">
        {/* Text side */}
        <div>
          {/* Status badge */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 mb-8">
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#52525b] border border-[#27272a] rounded-full px-3 py-1">
              <Circle size={6} className="fill-emerald-500 text-emerald-500" />
              {t.hero.status}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#3f3f46]">
              <MapPin size={11} />
              {t.hero.location}
            </span>
          </motion.div>

          {/* Greeting + name */}
          <motion.p {...fadeUp(0.15)} className="text-sm font-mono text-[#52525b] mb-2">
            {t.hero.greeting}
          </motion.p>

          <motion.h1 {...fadeUp(0.2)} className="text-5xl md:text-6xl font-semibold tracking-tight text-[#fafafa] leading-tight mb-4">
            {t.hero.name}
          </motion.h1>

          <motion.p {...fadeUp(0.25)} className="text-lg text-[#60a5fa] font-mono mb-6">
            {t.hero.title}
          </motion.p>

          <motion.p {...fadeUp(0.3)} className="text-base text-[#a1a1aa] leading-relaxed max-w-xl mb-10">
            {t.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 bg-[#fafafa] text-[#09090b] text-sm font-medium rounded-lg hover:bg-[#e4e4e7] transition-colors"
            >
              {t.hero.cta_projects}
            </button>
            <button
              onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 bg-transparent text-[#a1a1aa] text-sm font-medium rounded-lg border border-[#27272a] hover:border-[#3f3f46] hover:text-[#fafafa] transition-colors"
            >
              {t.hero.cta_research}
            </button>
            <a
              href="mailto:engsoftwaregustavoviana@gmail.com"
              className="px-5 py-2.5 bg-transparent text-[#a1a1aa] text-sm font-medium rounded-lg border border-[#27272a] hover:border-[#3f3f46] hover:text-[#fafafa] transition-colors"
            >
              {t.hero.cta_contact}
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.4)} className="flex items-center gap-5">
            {[
              { href: 'https://github.com/engguga', icon: Github },
              { href: 'https://linkedin.com/in/gustavo-viana', icon: Linkedin },
              { href: 'mailto:engsoftwaregustavoviana@gmail.com', icon: Mail },
            ].map(({ href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3f3f46] hover:text-[#a1a1aa] transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Photo side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="hidden md:block"
        >
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full border border-[#3b82f6]/20 scale-110" />
            <div className="w-56 h-56 rounded-full overflow-hidden border-2 border-[#27272a] relative">
              <Image
                src="/images/photo.jpg"
                alt="Gustavo Viana"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Floating tag */}
            <div className="absolute -bottom-3 -right-6 bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-1.5">
              <p className="text-xs font-mono text-[#60a5fa]">Security & AI</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#3f3f46] hover:text-[#52525b] transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  )
}
