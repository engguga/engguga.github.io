import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from 'next-themes'
import { I18nProvider } from '@/lib/i18n'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://engguga.github.io'),
  title: {
    default: 'Gustavo Viana — Software Engineer & Security Researcher',
    template: '%s | Gustavo Viana',
  },
  description:
    'Software Engineer and Security Researcher focused on AI Security, LLM defense systems, and applied cybersecurity research. Bahia, Brazil.',
  keywords: [
    'Gustavo Viana',
    'Software Engineer',
    'Security Researcher',
    'AI Security',
    'LLM Security',
    'Prompt Injection',
    'Cybersecurity',
    'Brazil',
  ],
  authors: [{ name: 'Gustavo Lima Viana', url: 'https://github.com/engguga' }],
  creator: 'Gustavo Lima Viana',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    url: 'https://engguga.github.io',
    siteName: 'Gustavo Viana',
    title: 'Gustavo Viana — Software Engineer & Security Researcher',
    description:
      'Software Engineer and Security Researcher focused on AI Security and applied cybersecurity research.',
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'Gustavo Viana' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gustavo Viana — Software Engineer & Security Researcher',
    description: 'Software Engineer and Security Researcher focused on AI Security.',
    images: ['/images/og.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-[#09090b] text-[#fafafa] antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
