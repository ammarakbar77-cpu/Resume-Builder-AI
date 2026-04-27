'use client'

import { forwardRef } from 'react'
import { ResumeData } from '@/lib/types'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface Props {
  resume: ResumeData
}

const ResumePreview = forwardRef<HTMLDivElement, Props>(({ resume }, ref) => {
  const { personal, experience, education, skills, projects, certifications, languages } = resume

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

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
      {/* Preview label */}
      <div className="no-print px-6 py-3 bg-ink/3 border-b border-border">
        <p className="text-xs text-muted uppercase tracking-wide font-medium">Live Preview</p>
      </div>

      {/* Actual resume */}
      <div ref={ref} className="p-10 font-sans text-[#1a1a1a]" style={{ fontFamily: 'Georgia, serif' }}>

        {/* Header */}
        <div className="border-b-2 border-[#1a1a1a] pb-5 mb-6">
          {personal.name && (
            <h1 className="text-3xl font-bold text-[#1a1a1a] tracking-tight mb-1">{personal.name}</h1>
          )}
          {personal.title && (
            <p className="text-lg text-[#4a4a5a] mb-3">{personal.title}</p>
          )}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[#6b6b7b]">
            {personal.email && (
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{personal.email}</span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{personal.phone}</span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{personal.location}</span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" />{personal.linkedin}</span>
            )}
            {personal.website && (
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />{personal.website}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {personal.summary && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4a4a5a] mb-2">Summary</h2>
            <p className="text-sm leading-relaxed text-[#2a2a3a]">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4a4a5a] mb-3 border-b border-[#e2e0d8] pb-1">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-semibold text-[#1a1a1a] text-sm">{exp.role}</span>
                      {exp.company && <span className="text-[#4a4a5a] text-sm"> · {exp.company}</span>}
                    </div>
                    <span className="text-xs text-[#6b6b7b] shrink-0 ml-4">
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {exp.bullets.filter(Boolean).map((bullet, i) => (
                        <li key={i} className="text-sm text-[#2a2a3a] leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#9a9690]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4a4a5a] mb-3 border-b border-[#e2e0d8] pb-1">Projects</h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-[#1a1a1a] text-sm">{proj.name}</span>
                    {proj.link && <span className="text-xs text-[#6b6b7b]">{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-sm text-[#2a2a3a] mt-0.5 leading-relaxed">{proj.description}</p>}
                  {proj.tech && <p className="text-xs text-[#6b6b7b] mt-1"><span className="font-medium">Tech:</span> {proj.tech}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {(certifications || []).length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4a4a5a] mb-3 border-b border-[#e2e0d8] pb-1">Certifications</h2>
            <div className="space-y-2">
              {(certifications || []).map((cert) => (
                <div key={cert.id} className="flex items-baseline justify-between">
                  <div>
                    <span className="font-semibold text-[#1a1a1a] text-sm">{cert.name}</span>
                    {cert.issuer && (
                      <span className="text-[#4a4a5a] text-sm"> · {cert.issuer}</span>
                    )}
                    {cert.credentialUrl && (
                      <span className="text-xs text-[#6b6b7b] ml-2">· {cert.credentialUrl}</span>
                    )}
                  </div>
                  {cert.date && (
                    <span className="text-xs text-[#6b6b7b] shrink-0 ml-4">{cert.date}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4a4a5a] mb-3 border-b border-[#e2e0d8] pb-1">Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between">
                  <div>
                    <span className="font-semibold text-[#1a1a1a] text-sm">{edu.school}</span>
                    {(edu.degree || edu.field) && (
                      <span className="text-[#4a4a5a] text-sm"> · {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}</span>
                    )}
                    {edu.gpa && (
                      <span className="text-xs text-[#6b6b7b] ml-2">· GPA: {edu.gpa}</span>
                    )}
                  </div>
                  <span className="text-xs text-[#6b6b7b] shrink-0 ml-4">
                    {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4a4a5a] mb-2 border-b border-[#e2e0d8] pb-1">Skills</h2>
            <p className="text-sm text-[#2a2a3a] leading-relaxed">{skills.join(' · ')}</p>
          </div>
        )}

        {/* Languages */}
        {(languages || []).length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4a4a5a] mb-2 border-b border-[#e2e0d8] pb-1">Languages</h2>
            <p className="text-sm text-[#2a2a3a] leading-relaxed">
              {(languages || []).map((l) => `${l.language} (${l.proficiency})`).join(' · ')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'

export default ResumePreview