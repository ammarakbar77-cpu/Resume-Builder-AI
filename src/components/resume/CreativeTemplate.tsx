'use client'

import { forwardRef } from 'react'
import { ResumeData } from '@/lib/types'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface Props { resume: ResumeData }

const CreativeTemplate = forwardRef<HTMLDivElement, Props>(({ resume }, ref) => {
  const { personal, experience, education, skills, projects, certifications, languages } = resume

  const accent = '#f97316'
  const dark = '#18181b'

  return (
    <div ref={ref} style={{ fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif", background: '#fff', color: dark }}>
      {/* Bold top bar */}
      <div style={{ background: dark, padding: '36px 40px 28px', position: 'relative', overflow: 'hidden' }}>
        {/* decorative circle */}
        <div style={{ position: 'absolute', right: -40, top: -40, width: 180, height: 180, borderRadius: '50%', background: accent, opacity: 0.15 }} />
        <div style={{ position: 'absolute', right: 60, bottom: -60, width: 120, height: 120, borderRadius: '50%', background: accent, opacity: 0.1 }} />

        {personal.name && (
          <h1 style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', marginBottom: 2, position: 'relative' }}>
            {personal.name}
          </h1>
        )}
        {personal.title && (
          <p style={{ fontSize: 13, color: accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 18, position: 'relative' }}>
            {personal.title}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', position: 'relative' }}>
          {personal.email && (
            <span style={{ fontSize: 11.5, color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Mail style={{ width: 11, height: 11, color: accent }} />{personal.email}
            </span>
          )}
          {personal.phone && (
            <span style={{ fontSize: 11.5, color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Phone style={{ width: 11, height: 11, color: accent }} />{personal.phone}
            </span>
          )}
          {personal.location && (
            <span style={{ fontSize: 11.5, color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPin style={{ width: 11, height: 11, color: accent }} />{personal.location}
            </span>
          )}
          {personal.linkedin && (
            <span style={{ fontSize: 11.5, color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Linkedin style={{ width: 11, height: 11, color: accent }} />{personal.linkedin}
            </span>
          )}
          {personal.website && (
            <span style={{ fontSize: 11.5, color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Globe style={{ width: 11, height: 11, color: accent }} />{personal.website}
            </span>
          )}
        </div>
      </div>

      {/* Orange accent line */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, #fb923c, #fbbf24)` }} />

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px' }}>
        {/* Main */}
        <div style={{ padding: '28px 32px 28px 40px' }}>
          {personal.summary && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 3, height: 16, background: accent, borderRadius: 2 }} />
                <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: dark }}>About Me</h2>
              </div>
              <p style={{ fontSize: 12.5, color: '#3f3f46', lineHeight: 1.75 }}>{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 3, height: 16, background: accent, borderRadius: 2 }} />
                <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: dark }}>Experience</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ paddingLeft: 14, borderLeft: '2px solid #f4f4f5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: dark }}>{exp.role}</span>
                        {exp.company && <span style={{ fontSize: 12, color: accent, fontWeight: 600 }}> @ {exp.company}</span>}
                      </div>
                      <span style={{ fontSize: 10.5, color: '#71717a', whiteSpace: 'nowrap', marginLeft: 8, background: '#fafafa', border: '1px solid #e4e4e7', padding: '2px 7px', borderRadius: 4 }}>
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.bullets.filter(Boolean).length > 0 && (
                      <ul style={{ marginTop: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {exp.bullets.filter(Boolean).map((b, i) => (
                          <li key={i} style={{ fontSize: 12, color: '#52525b', lineHeight: 1.65, paddingLeft: 12, position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: accent, fontWeight: 900, fontSize: 14 }}>·</span>{b}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 3, height: 16, background: accent, borderRadius: 2 }} />
                <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: dark }}>Projects</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ background: '#fafafa', border: '1px solid #f4f4f5', borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: dark }}>{proj.name}</span>
                      {proj.link && <span style={{ fontSize: 11, color: accent }}>{proj.link}</span>}
                    </div>
                    {proj.description && <p style={{ fontSize: 12, color: '#52525b', marginTop: 3, lineHeight: 1.6 }}>{proj.description}</p>}
                    {proj.tech && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                        {proj.tech.split(',').map((t) => (
                          <span key={t} style={{ fontSize: 10.5, background: '#fff7ed', color: accent, border: '1px solid #fed7aa', padding: '1px 7px', borderRadius: 99 }}>{t.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 3, height: 16, background: accent, borderRadius: 2 }} />
                <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: dark }}>Education</h2>
              </div>
              {education.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: dark }}>{edu.school}</span>
                    {(edu.degree || edu.field) && (
                      <span style={{ fontSize: 12, color: '#71717a' }}> · {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}</span>
                    )}
                    {edu.gpa && <span style={{ fontSize: 11, color: '#a1a1aa' }}> · GPA: {edu.gpa}</span>}
                  </div>
                  <span style={{ fontSize: 11, color: '#71717a', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {edu.startDate}{edu.startDate && edu.endDate ? '–' : ''}{edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ background: '#18181b', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {skills.length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: 10 }}>Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {skills.map((s) => (
                  <span key={s} style={{ fontSize: 10.5, background: '#27272a', color: '#d4d4d8', padding: '3px 9px', borderRadius: 4, border: '1px solid #3f3f46' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {(certifications || []).length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: 10 }}>Certifications</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(certifications || []).map((cert) => (
                  <div key={cert.id} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 8 }}>
                    <p style={{ fontSize: 11.5, fontWeight: 600, color: '#e4e4e7' }}>{cert.name}</p>
                    <p style={{ fontSize: 10.5, color: '#71717a' }}>{cert.issuer}</p>
                    {cert.date && <p style={{ fontSize: 10, color: '#52525b' }}>{cert.date}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(languages || []).length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: 10 }}>Languages</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(languages || []).map((l) => (
                  <div key={l.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 11.5, color: '#e4e4e7', fontWeight: 500 }}>{l.language}</span>
                      <span style={{ fontSize: 10, color: '#71717a' }}>{l.proficiency}</span>
                    </div>
                    <div style={{ height: 3, background: '#27272a', borderRadius: 99 }}>
                      <div style={{
                        height: 3, borderRadius: 99, background: accent,
                        width: l.proficiency === 'Native' ? '100%' : l.proficiency === 'Fluent' ? '85%' : l.proficiency === 'Advanced' ? '70%' : l.proficiency === 'Intermediate' ? '50%' : '30%'
                      }} />
                    </div>
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

CreativeTemplate.displayName = 'CreativeTemplate'
export default CreativeTemplate