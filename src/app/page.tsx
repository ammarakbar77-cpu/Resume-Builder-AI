'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, FileText, Zap, Download } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-accent" />
          </div>
          <span className="font-display text-xl text-ink">ResumeAI</span>
        </div>
        <Link
          href="/builder"
          className="flex items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ink/80 transition-colors"
        >
          Start Building <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-ink/5 border border-ink/10 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <Sparkles className="w-3.5 h-3.5 text-ink/60" />
            <span className="text-xs font-medium text-ink/60 tracking-wide uppercase">Created by Amirul Ammar</span>
          </div>

          <h1
            className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] text-ink mb-8 animate-fade-up"
            style={{ animationDelay: '100ms', opacity: 0, animationFillMode: 'forwards' }}
          >
            Your resume,<br />
            <em className="not-italic text-ink/30">perfectly tailored.</em>
          </h1>

          <p
            className="text-xl text-muted leading-relaxed max-w-xl mb-12 animate-fade-up"
            style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}
          >
            Build your resume visually, paste any job description, and let AI rewrite it to match — in seconds.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: '300ms', opacity: 0, animationFillMode: 'forwards' }}
          >
            <Link
              href="/builder"
              className="group flex items-center gap-3 bg-ink text-paper px-8 py-4 rounded-2xl text-lg font-medium hover:bg-ink/85 transition-all hover:gap-4"
            >
              Build My Resume
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="flex items-center gap-2 text-muted text-sm">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-slow" />
              Free to use
            </div>
          </div>
        </div>

        {/* Features */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 animate-fade-up"
          style={{ animationDelay: '400ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          {[
            {
              icon: FileText,
              title: 'Visual Builder',
              desc: 'Fill in your details with a clean, structured editor. No formatting headaches.',
            },
            {
              icon: Zap,
              title: 'AI Optimization',
              desc: 'Paste a job description and AI rewrites your resume to match keywords and tone.',
            },
            {
              icon: Download,
              title: 'PDF Export',
              desc: 'Download a clean, ATS-friendly PDF ready to send to any recruiter.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/60 border border-border rounded-2xl p-8 hover:border-ink/20 transition-colors">
              <div className="w-10 h-10 bg-ink rounded-xl flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-2xl text-ink mb-3">{title}</h3>
              <p className="text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ink mx-8 mb-8 rounded-3xl py-20 px-8 text-center">
        <h2 className="font-display text-5xl text-paper mb-4">Ready to stand out?</h2>
        <p className="text-paper/50 mb-8 text-lg">Build a tailored resume in under 10 minutes.</p>
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 bg-accent text-ink px-8 py-4 rounded-2xl font-semibold hover:bg-accent/80 transition-colors"
        >
          Start for Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  )
}
