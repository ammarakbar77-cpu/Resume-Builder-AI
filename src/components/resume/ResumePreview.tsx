'use client'

import { forwardRef } from 'react'
import { ResumeData, TemplateId } from '@/lib/types'
import ClassicTemplate from '@/components/resume/ClassicTemplate'
import ModernTemplate from '@/components/resume/ModernTemplate'
import MinimalTemplate from '@/components/resume/MinimalTemplate'
import CreativeTemplate from '@/components/resume/CreativeTemplate'

interface Props {
  resume: ResumeData
  template?: TemplateId
}

const ResumePreview = forwardRef<HTMLDivElement, Props>(({ resume, template = 'classic' }, ref) => {
  const { personal, experience } = resume

  const isEmpty = !personal.name && !personal.summary && experience.length === 0

  if (isEmpty) {
    return (
      <div className="bg-white border border-border rounded-2xl p-12 text-center sticky top-24">
        <div className="w-16 h-16 bg-ink/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📄</span>
        </div>
        <p className="font-display text-2xl text-ink mb-2">Your resume preview</p>
        <p className="text-muted text-sm">Start filling in your details on the left and your resume will appear here.</p>
      </div>
    )
  }

  const templateMap: Record<TemplateId, React.ReactNode> = {
    classic: <ClassicTemplate resume={resume} ref={ref} />,
    modern: <ModernTemplate resume={resume} ref={ref} />,
    minimal: <MinimalTemplate resume={resume} ref={ref} />,
    creative: <CreativeTemplate resume={resume} ref={ref} />,
  }

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="no-print px-6 py-3 bg-ink/5 border-b border-border">
        <p className="text-xs text-muted uppercase tracking-wide font-medium">Live Preview</p>
      </div>
      {templateMap[template]}
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'
export default ResumePreview