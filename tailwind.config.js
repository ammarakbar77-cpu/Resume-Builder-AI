/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)'],
        mono: ['var(--font-mono)'],
        display: ['var(--font-display)'],
      },
      colors: {
        ink: '#0D0D12',
        paper: '#F4F1EB',
        accent: '#D4FF00',
        muted: '#72717F',
        border: '#E0DDD5',
        surface: '#FAF8F4',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-in': 'slideIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(-10px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}