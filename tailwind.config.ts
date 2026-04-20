import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        bg: {
          primary:   '#09090b',
          secondary: '#111113',
          tertiary:  '#18181b',
        },
        border: {
          subtle: '#27272a',
          DEFAULT: '#3f3f46',
        },
        text: {
          primary:  '#fafafa',
          secondary:'#a1a1aa',
          muted:    '#52525b',
        },
        accent: {
          DEFAULT: '#3b82f6',
          hover:   '#60a5fa',
          subtle:  'rgba(59,130,246,0.08)',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'glow':    'glow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '0.3' },
          '50%':      { opacity: '0.6' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body':       '#a1a1aa',
            '--tw-prose-headings':   '#fafafa',
            '--tw-prose-links':      '#60a5fa',
            '--tw-prose-bold':       '#fafafa',
            '--tw-prose-code':       '#e4e4e7',
            '--tw-prose-pre-bg':     '#18181b',
            '--tw-prose-pre-code':   '#a1a1aa',
            '--tw-prose-hr':         '#27272a',
            '--tw-prose-th-borders': '#27272a',
            '--tw-prose-td-borders': '#27272a',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
