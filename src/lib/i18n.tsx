'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import pt from '@/messages/pt.json'
import en from '@/messages/en.json'

type Locale = 'pt' | 'en'
type Messages = typeof pt

const messages: Record<Locale, Messages> = { pt, en }

interface I18nContextValue {
  locale: Locale
  t: Messages
  setLocale: (l: Locale) => void
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'pt',
  t: pt,
  setLocale: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved && (saved === 'pt' || saved === 'en')) setLocaleState(saved)
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
  }

  return (
    <I18nContext.Provider value={{ locale, t: messages[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
