import Link from 'next/link'
import { FileText, Sparkles, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Nav */}
      <nav className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-ink rounded-xl flex items-center justify-center">
            <FileText className="w-4 h-4 text-accent" />
          </div>
          <span className="font-display text-xl font-bold text-ink">ResumeAI</span>
        </div>
        <Link
          href="/builder"
          className="flex items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-ink/80 transition-all"
        >
          Start Building <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-20 pb-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-12">
          <Sparkles className="w-3.5 h-3.5 text-muted" />
          <span className="text-xs font-medium text-muted uppercase tracking-widest">Powered by Claude AI</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[80px] lg:text-[96px] leading-[0.95] tracking-tight mb-8">
          <span className="text-ink">Your resume,</span>
          <br />
          <span className="text-ink/25">perfectly tailored.</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg text-muted leading-relaxed mb-12 max-w-md">
          Build your resume visually, paste any job description, and let
          AI rewrite it to match — in seconds.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-5">
          <Link
            href="/builder"
            className="flex items-center gap-2 bg-ink text-paper px-7 py-4 rounded-2xl text-base font-semibold hover:bg-ink/80 transition-all"
          >
            Build My Resume <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted">Free to use</span>
          </div>
        </div>
      </section>
    </div>
  )
}