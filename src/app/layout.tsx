import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ResumeAI — Build & Optimize Your Resume',
  description: 'Visually build your resume and use AI to tailor it for any job description.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
