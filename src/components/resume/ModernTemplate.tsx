'use client'

import { forwardRef } from 'react'
import { ResumeData } from '@/lib/types'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface Props { resume: ResumeData }

const ModernTemplate = forwardRef<HTMLDivElement, Props>(({ resume }, ref) => {
  const { personal, experience, education, skills, projects, certifications, languages } = resume

  const Section = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563eb]">{title}</span>
      <div className="flex-1 h-px bg-[#2563eb]/20" />
    </div>
  )

  return (
    <div ref={ref} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#fff' }}>
      {/* Header — full width blue band */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', padding: '32px 40px 28px' }}>
        {personal.name && (
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 4 }}>
            {personal.name}
          </h1>
        )}
        {personal.title && (
          <p style={{ fontSize: 13, color: '#93c5fd', fontWeight: 500, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {personal.title}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
          {personal.email && (
            <span style={{ fontSize: 12, color: '#bfdbfe', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Mail style={{ width: 12, height: 12 }} />{personal.email}
            </span>
          )}
          {personal.phone && (
            <span style={{ fontSize: 12, color: '#bfdbfe', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Phone style={{ width: 12, height: 12 }} />{personal.phone}
            </span>
          )}
          {personal.location && (
            <span style={{ fontSize: 12, color: '#bfdbfe', display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPin style={{ width: 12, height: 12 }} />{personal.location}
            </span>
          )}
          {personal.linkedin && (
            <span style={{ fontSize: 12, color: '#bfdbfe', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Linkedin style={{ width: 12, height: 12 }} />{personal.linkedin}
            </span>
          )}
          {personal.website && (
            <span style={{ fontSize: 12, color: '#bfdbfe', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Globe style={{ width: 12, height: 12 }} />{personal.website}
            </span>
          )}
        </div>
      </div>

      {/* Body — two column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', minHeight: 600 }}>
        {/* Left — main content */}
        <div style={{ padding: '28px 32px 28px 40px', borderRight: '1px solid #e2e8f0' }}>
          {personal.summary && (
            <div style={{ marginBottom: 24 }}>
              <Section title="Profile" />
              <p style={{ fontSize: 12.5, color: '#334155', lineHeight: 1.7 }}>{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Section title="Experience" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{exp.role}</span>
                        {exp.company && <span style={{ fontSize: 12.5, color: '#2563eb', fontWeight: 600 }}> · {exp.company}</span>}
                      </div>
                      <span style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap', marginLeft: 8, background: '#eff6ff', padding: '2px 8px', borderRadius: 99 }}>
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.bullets.filter(Boolean).length > 0 && (
                      <ul style={{ marginTop: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {exp.bullets.filter(Boolean).map((b, i) => (
                          <li key={i} style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, paddingLeft: 14, position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: '#2563eb', fontWeight: 700 }}>›</span>{b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Section title="Projects" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{proj.name}</span>
                      {proj.link && <span style={{ fontSize: 11, color: '#2563eb' }}>{proj.link}</span>}
                    </div>
                    {proj.description && <p style={{ fontSize: 12, color: '#475569', marginTop: 2, lineHeight: 1.6 }}>{proj.description}</p>}
                    {proj.tech && <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>{proj.tech}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <Section title="Education" />
              {education.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{edu.school}</span>
                    {(edu.degree || edu.field) && (
                      <span style={{ fontSize: 12, color: '#64748b' }}> · {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}</span>
                    )}
                    {edu.gpa && <span style={{ fontSize: 11, color: '#94a3b8' }}> · GPA: {edu.gpa}</span>}
                  </div>
                  <span style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {edu.startDate}{edu.startDate && edu.endDate ? '–' : ''}{edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ padding: '28px 24px 28px 20px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {skills.length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10 }}>Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {skills.map((s) => (
                  <span key={s} style={{ fontSize: 11, background: '#dbeafe', color: '#1e40af', padding: '3px 9px', borderRadius: 99, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {(certifications || []).length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10 }}>Certifications</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(certifications || []).map((cert) => (
                  <div key={cert.id}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{cert.name}</p>
                    <p style={{ fontSize: 11, color: '#64748b' }}>{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(languages || []).length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10 }}>Languages</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(languages || []).map((l) => (
                  <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: '#0f172a', fontWeight: 500 }}>{l.language}</span>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

ModernTemplate.displayName = 'ModernTemplate'
export default ModernTemplate