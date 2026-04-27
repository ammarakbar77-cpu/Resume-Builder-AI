'use client'

import { useState } from 'react'
import { ATSResult, ResumeData } from '@/lib/types'
import { Loader2, CheckCircle, XCircle, AlertCircle, Target, Lightbulb } from 'lucide-react'

interface Props {
  resume: ResumeData
  jobDescription: string
}

export default function ATSScorePanel({ resume, jobDescription }: Props) {
  const [result, setResult] = useState<ATSResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheck = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description in the AI Optimize tab first.')
      return
    }
    setError('')
    setIsLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/ats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || 'Failed to analyze resume.')
        return
      }
      setResult(data.result)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const scoreColor = (score: number) => {
    if (score >= 80) return { text: 'text-green-700', bg: 'bg-green-500', ring: 'text-green-600', label: 'Excellent' }
    if (score >= 60) return { text: 'text-amber-700', bg: 'bg-amber-500', ring: 'text-amber-600', label: 'Good' }
    if (score >= 40) return { text: 'text-orange-700', bg: 'bg-orange-500', ring: 'text-orange-600', label: 'Fair' }
    return { text: 'text-red-700', bg: 'bg-red-500', ring: 'text-red-600', label: 'Needs Work' }
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-ink rounded-xl flex items-center justify-center">
          <Target className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">ATS Score Checker</h2>
          <p className="text-sm text-muted">See how well your resume matches the job</p>
        </div>
      </div>

      {!jobDescription.trim() && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">Go to the <strong>AI Optimize</strong> tab and enter a job description first, then come back to check your ATS score.</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleCheck}
        disabled={isLoading || !jobDescription.trim()}
        className="w-full flex items-center justify-center gap-3 bg-ink text-paper py-4 rounded-xl font-medium hover:bg-ink/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing resume...</>
        ) : (
          <><Target className="w-5 h-5" /> Check ATS Score</>
        )}
      </button>

      {result && (
        <div className="space-y-5">
          {/* Score Ring */}
          <div className="flex flex-col items-center py-4">
            <div className="relative w-36 h-36">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#f0ede8" strokeWidth="12" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke={result.score >= 80 ? '#16a34a' : result.score >= 60 ? '#d97706' : result.score >= 40 ? '#ea580c' : '#dc2626'}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(result.score / 100) * 314} 314`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${scoreColor(result.score).text}`}>{result.score}</span>
                <span className="text-xs text-muted">/ 100</span>
              </div>
            </div>
            <div className={`mt-2 text-lg font-semibold ${scoreColor(result.score).text}`}>
              {scoreColor(result.score).label}
            </div>
          </div>

          {/* Matched Keywords */}
          {result.matchedKeywords.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <h3 className="text-sm font-semibold text-ink">Matched Keywords ({result.matchedKeywords.length})</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.matchedKeywords.map((kw) => (
                  <span key={kw} className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1">
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Keywords */}
          {result.missingKeywords.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-semibold text-ink">Missing Keywords ({result.missingKeywords.length})</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((kw) => (
                  <span key={kw} className="text-xs bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-1">
                    ✗ {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-semibold text-ink">Suggestions to Improve</h3>
              </div>
              <div className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                    <span className="w-5 h-5 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-amber-900">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}