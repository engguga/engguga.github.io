'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface Props {
  children: ReactNode
  id?: string
  className?: string
  delay?: number
}

export default function SectionWrapper({ children, id, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={{
        hidden:  { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
