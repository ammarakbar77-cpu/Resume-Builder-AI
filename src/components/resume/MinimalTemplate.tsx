'use client'

import { forwardRef } from 'react'
import { ResumeData } from '@/lib/types'

interface Props { resume: ResumeData }

const MinimalTemplate = forwardRef<HTMLDivElement, Props>(({ resume }, ref) => {
  const { personal, experience, education, skills, projects, certifications, languages } = resume

  return (
    <div ref={ref} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#fff', padding: '48px 52px', color: '#111' }}>
      {/* Header — left aligned, stark */}
      <div style={{ marginBottom: 36 }}>
        {personal.name && (
          <h1 style={{ fontSize: 30, fontWeight: 300, letterSpacing: '-0.5px', color: '#111', marginBottom: 2 }}>
            {personal.name}
          </h1>
        )}
        {personal.title && (
          <p style={{ fontSize: 13, color: '#888', fontWeight: 400, marginBottom: 12, letterSpacing: '0.02em' }}>{personal.title}</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 20px', fontSize: 11.5, color: '#666' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {personal.summary && (
        <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid #f0f0f0' }}>
          <p style={{ fontSize: 12.5, color: '#444', lineHeight: 1.8, maxWidth: 560 }}>{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 16 }}>Experience</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
                <div style={{ paddingTop: 1 }}>
                  <p style={{ fontSize: 11, color: '#999', lineHeight: 1.5 }}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{exp.current ? 'Now' : exp.endDate}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 1 }}>{exp.role}</p>
                  {exp.company && <p style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>{exp.company}</p>}
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <p key={i} style={{ fontSize: 12, color: '#555', lineHeight: 1.65, paddingLeft: 12, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#ccc' }}>—</span>{b}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 16 }}>Projects</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {projects.map((proj) => (
              <div key={proj.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
                <div>
                  {proj.link && <p style={{ fontSize: 11, color: '#aaa' }}>{proj.link}</p>}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>{proj.name}</p>
                  {proj.description && <p style={{ fontSize: 12, color: '#555', lineHeight: 1.65 }}>{proj.description}</p>}
                  {proj.tech && <p style={{ fontSize: 11, color: '#aaa', marginTop: 3 }}>{proj.tech}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(certifications || []).length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 16 }}>Certifications</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(certifications || []).map((cert) => (
              <div key={cert.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
                <p style={{ fontSize: 11, color: '#999' }}>{cert.date}</p>
                <div>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: '#111' }}>{cert.name}</p>
                  {cert.issuer && <p style={{ fontSize: 11.5, color: '#666' }}>{cert.issuer}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 16 }}>Education</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
                <p style={{ fontSize: 11, color: '#999' }}>
                  {edu.startDate}{edu.startDate && edu.endDate ? '–' : ''}{edu.endDate}
                </p>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{edu.school}</p>
                  {(edu.degree || edu.field) && (
                    <p style={{ fontSize: 12, color: '#666' }}>{edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}</p>
                  )}
                  {edu.gpa && <p style={{ fontSize: 11, color: '#aaa' }}>GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {skills.length > 0 && (
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 10 }}>Skills</p>
            <p style={{ fontSize: 12, color: '#555', lineHeight: 1.8 }}>{skills.join(', ')}</p>
          </div>
        )}
        {(languages || []).length > 0 && (
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 10 }}>Languages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {(languages || []).map((l) => (
                <p key={l.id} style={{ fontSize: 12, color: '#555' }}>{l.language} <span style={{ color: '#aaa' }}>— {l.proficiency}</span></p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

MinimalTemplate.displayName = 'MinimalTemplate'
export default MinimalTemplate