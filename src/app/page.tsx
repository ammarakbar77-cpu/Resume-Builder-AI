'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { FileText, ArrowLeft, Download, Sparkles } from 'lucide-react'
import { ResumeData, TemplateId, defaultResume } from '@/lib/types'
import ResumeEditor from '@/components/editor/ResumeEditor'
import ResumePreview from '@/components/resume/ResumePreview'
import OptimizePanel from '@/components/editor/OptimizePanel'
import ATSScorePanel from '@/components/editor/ATSScorePanel'
import TemplatePicker from '@/components/resume/TemplatePicker'

type Tab = 'edit' | 'optimize' | 'ats' | 'preview'

export default function BuilderPage() {
  const [resume, setResume] = useState<ResumeData>(defaultResume)
  const [activeTab, setActiveTab] = useState<Tab>('edit')
  const [template, setTemplate] = useState<TemplateId>('classic')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizeSuccess, setOptimizeSuccess] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const printRef = useRef<HTMLDivElement>(null)

  const handleOptimize = async (jd: string) => {
    setIsOptimizing(true)
    setOptimizeSuccess(false)
    setJobDescription(jd)
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription: jd }),
      })
      const data = await res.json()
      if (data.optimized) {
        setResume(data.optimized)
        setOptimizeSuccess(true)
        setActiveTab('preview')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleExportPDF = async () => {
    const element = printRef.current
    if (!element) return

    setIsExporting(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default

      const filename = resume.personal?.name
        ? `${resume.personal.name.replace(/\s+/g, '_')}_Resume.pdf`
        : 'resume.pdf'

      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm' as const, format: 'a4', orientation: 'portrait' as const },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setIsExporting(false)
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'edit', label: 'Edit' },
    { id: 'optimize', label: 'AI Optimize' },
    { id: 'ats', label: 'ATS Score' },
    { id: 'preview', label: 'Preview' },
  ]

  const PreviewPanel = () => (
    <div className="hidden lg:block sticky top-24 h-fit space-y-4">
      <TemplatePicker selected={template} onChange={setTemplate} />
      <ResumePreview resume={resume} template={template} ref={printRef} />
    </div>
  )

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="no-print sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-muted hover:text-ink transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-ink rounded-lg flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-accent" />
              </div>
              <span className="font-display text-lg text-ink">ResumeAI</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center bg-ink/5 rounded-xl p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-ink text-paper shadow-sm'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {tab.id === 'optimize' && (
                  <Sparkles className="w-3 h-3 inline mr-1.5 mb-0.5" />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-ink/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'edit' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResumeEditor resume={resume} onChange={setResume} />
            <PreviewPanel />
          </div>
        )}

        {activeTab === 'optimize' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <OptimizePanel
              onOptimize={handleOptimize}
              isOptimizing={isOptimizing}
              success={optimizeSuccess}
            />
            <PreviewPanel />
          </div>
        )}

        {activeTab === 'ats' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ATSScorePanel resume={resume} jobDescription={jobDescription} />
            <PreviewPanel />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="max-w-3xl mx-auto space-y-4">
            {optimizeSuccess && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
                <Sparkles className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Resume optimized!</p>
                  <p className="text-sm text-green-600">Your resume has been tailored to match the job description.</p>
                </div>
              </div>
            )}
            <TemplatePicker selected={template} onChange={setTemplate} />
            <ResumePreview resume={resume} template={template} ref={printRef} />
          </div>
        )}
      </main>
    </div>
  )
}