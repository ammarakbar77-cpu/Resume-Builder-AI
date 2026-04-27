'use client'

import { useState } from 'react'
import { Sparkles, Loader2, CheckCircle, AlertCircle, Link, FileText, X } from 'lucide-react'

interface Props {
  onOptimize: (jobDescription: string) => Promise<void>
  isOptimizing: boolean
  success: boolean
}

type InputMode = 'url' | 'paste'

export default function OptimizePanel({ onOptimize, isOptimizing, success }: Props) {
  const [mode, setMode] = useState<InputMode>('url')
  const [jobUrl, setJobUrl] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isScraping, setIsScraping] = useState(false)
  const [scrapeError, setScrapeError] = useState('')
  const [scrapeSuccess, setScrapeSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleScrape = async () => {
    if (!jobUrl.trim()) {
      setScrapeError('Please enter a job posting URL.')
      return
    }
    setScrapeError('')
    setScrapeSuccess(false)
    setIsScraping(true)

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: jobUrl }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setScrapeError(data.error || 'Failed to extract job description.')
        // If blocked, switch to paste mode automatically
        if (data.blocked) {
          setTimeout(() => {
            setMode('paste')
            setScrapeError('')
          }, 2000)
        }
        return
      }

      setJobDescription(data.text)
      setScrapeSuccess(true)
    } catch {
      setScrapeError('Network error. Please try again or paste manually.')
    } finally {
      setIsScraping(false)
    }
  }

  const handleClearUrl = () => {
    setJobUrl('')
    setScrapeError('')
    setScrapeSuccess(false)
    setJobDescription('')
  }

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setError(
        mode === 'url'
          ? 'Please fetch a job posting URL first.'
          : 'Please paste a job description first.'
      )
      return
    }
    setError('')
    await onOptimize(jobDescription)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-ink rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink">AI Optimization</h2>
            <p className="text-sm text-muted">Tailor your resume to any job in seconds</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-ink/5 rounded-xl p-1 gap-1 mb-6">
          <button
            onClick={() => { setMode('url'); setError('') }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'url' ? 'bg-ink text-paper shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            Paste URL
          </button>
          <button
            onClick={() => { setMode('paste'); setError('') }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'paste' ? 'bg-ink text-paper shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Paste Text
          </button>
        </div>

        <div className="space-y-4">
          {/* URL Mode */}
          {mode === 'url' && (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">
                Job Posting URL
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="url"
                    value={jobUrl}
                    onChange={(e) => { setJobUrl(e.target.value); setScrapeError(''); setScrapeSuccess(false) }}
                    onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
                    placeholder="https://indeed.com/viewjob?jk=..."
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-ink/40 transition-colors pr-8"
                  />
                  {jobUrl && (
                    <button
                      onClick={handleClearUrl}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleScrape}
                  disabled={isScraping || !jobUrl.trim()}
                  className="flex items-center gap-2 bg-ink text-paper px-4 py-3 rounded-xl text-sm font-medium hover:bg-ink/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isScraping ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Fetching...</>
                  ) : (
                    'Fetch Job'
                  )}
                </button>
              </div>

              <p className="text-xs text-muted">
                Works with Indeed, company career pages, Glassdoor, and most job boards.
                <span className="text-amber-600"> LinkedIn blocks scraping — use Paste Text instead.</span>
              </p>

              {/* Scrape error */}
              {scrapeError && (
                <div className="flex items-start gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-sm">{scrapeError}</p>
                </div>
              )}

              {/* Scrape success — show extracted text preview */}
              {scrapeSuccess && jobDescription && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <p className="text-sm">
                      Job description extracted! ({jobDescription.length} characters)
                    </p>
                  </div>
                  <div className="bg-surface border border-border rounded-xl px-4 py-3 max-h-40 overflow-y-auto">
                    <p className="text-xs text-muted whitespace-pre-wrap line-clamp-6">{jobDescription.slice(0, 400)}...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Paste Mode */}
          {mode === 'paste' && (
            <div>
              <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">
                Paste Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here — requirements, responsibilities, company info..."
                rows={12}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-ink/40 transition-colors resize-none"
              />
              <p className="text-xs text-muted mt-2">
                {jobDescription.length} characters · More detail = better optimization
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <p className="text-sm">Resume optimized! Switch to Preview to see the results.</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isOptimizing || !jobDescription.trim()}
            className="w-full flex items-center justify-center gap-3 bg-ink text-paper py-4 rounded-xl font-medium hover:bg-ink/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isOptimizing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Optimizing your resume...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Optimize Resume with AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white border border-border rounded-2xl p-6">
        <h3 className="font-display text-xl text-ink mb-4">How it works</h3>
        <div className="space-y-3">
          {[
            { step: '1', text: 'Fill in your resume details in the Edit tab' },
            { step: '2', text: 'Paste a job URL or the job description above' },
            { step: '3', text: 'AI rewrites your summary, bullets, and skills to match' },
            { step: '4', text: 'Preview and export as PDF' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-ink/5 text-ink/60 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                {step}
              </span>
              <p className="text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}