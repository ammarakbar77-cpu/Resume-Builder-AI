'use client'

import { forwardRef } from 'react'
import { ResumeData } from '@/lib/types'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface Props { resume: ResumeData }

const ClassicTemplate = forwardRef<HTMLDivElement, Props>(({ resume }, ref) => {
  const { personal, experience, education, skills, projects, certifications, languages } = resume

  const Section = ({ title }: { title: string }) => (
    <div style={{ borderBottom: '2px solid #1a1a1a', marginBottom: 10, paddingBottom: 3 }}>
      <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#1a1a1a' }}>{title}</h2>
    </div>
  )

  return (
    <div ref={ref} style={{ fontFamily: 'Georgia, "Times New Roman", serif', background: '#fff', padding: '40px 48px', color: '#1a1a1a' }}>
      {/* Header — centered classic */}
      <div style={{ textAlign: 'center', marginBottom: 28, borderBottom: '1px solid #d4d0c8', paddingBottom: 20 }}>
        {personal.name && (
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
            {personal.name}
          </h1>
        )}
        {personal.title && (
          <p style={{ fontSize: 13, color: '#555', fontStyle: 'italic', marginBottom: 10 }}>{personal.title}</p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 16px', fontSize: 11.5, color: '#444' }}>
          {personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail style={{ width: 11, height: 11 }} />{personal.email}</span>}
          {personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone style={{ width: 11, height: 11 }} />{personal.phone}</span>}
          {personal.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin style={{ width: 11, height: 11 }} />{personal.location}</span>}
          {personal.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Linkedin style={{ width: 11, height: 11 }} />{personal.linkedin}</span>}
          {personal.website && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Globe style={{ width: 11, height: 11 }} />{personal.website}</span>}
        </div>
      </div>

      {personal.summary && (
        <div style={{ marginBottom: 22 }}>
          <Section title="Professional Summary" />
          <p style={{ fontSize: 12.5, lineHeight: 1.75, color: '#2a2a2a', fontStyle: 'italic' }}>{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <Section title="Professional Experience" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{exp.role}</span>
                    {exp.company && <span style={{ fontSize: 12.5, color: '#444' }}>, {exp.company}</span>}
                  </div>
                  <span style={{ fontSize: 11.5, color: '#666', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul style={{ marginTop: 5, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 3, listStyleType: 'disc' }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ fontSize: 12, color: '#333', lineHeight: 1.65 }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <Section title="Projects" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {projects.map((proj) => (
              <div key={proj.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: 11, color: '#666' }}>{proj.link}</span>}
                </div>
                {proj.description && <p style={{ fontSize: 12, color: '#333', lineHeight: 1.65, marginTop: 2 }}>{proj.description}</p>}
                {proj.tech && <p style={{ fontSize: 11.5, color: '#666', marginTop: 2, fontStyle: 'italic' }}>Technologies: {proj.tech}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {(certifications || []).length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <Section title="Certifications" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(certifications || []).map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 12.5, fontWeight: 700 }}>{cert.name}</span>
                  {cert.issuer && <span style={{ fontSize: 12, color: '#555' }}> · {cert.issuer}</span>}
                </div>
                {cert.date && <span style={{ fontSize: 11.5, color: '#666' }}>{cert.date}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <Section title="Education" />
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{edu.school}</span>
                {(edu.degree || edu.field) && (
                  <span style={{ fontSize: 12.5, color: '#444' }}> · {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}</span>
                )}
                {edu.gpa && <span style={{ fontSize: 11.5, color: '#666' }}> · GPA: {edu.gpa}</span>}
              </div>
              <span style={{ fontSize: 11.5, color: '#666', whiteSpace: 'nowrap', marginLeft: 8 }}>
                {edu.startDate}{edu.startDate && edu.endDate ? '–' : ''}{edu.endDate}
              </span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: skills.length > 0 && (languages || []).length > 0 ? '1fr 1fr' : '1fr', gap: 24 }}>
        {skills.length > 0 && (
          <div>
            <Section title="Skills" />
            <p style={{ fontSize: 12, color: '#333', lineHeight: 1.75 }}>{skills.join(' · ')}</p>
          </div>
        )}
        {(languages || []).length > 0 && (
          <div>
            <Section title="Languages" />
            <p style={{ fontSize: 12, color: '#333', lineHeight: 1.75 }}>
              {(languages || []).map((l) => `${l.language} (${l.proficiency})`).join(' · ')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
})

ClassicTemplate.displayName = 'ClassicTemplate'
export default ClassicTemplate