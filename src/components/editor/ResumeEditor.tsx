'use client'

import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { ResumeData, Experience, Education, Project, Certification, Language } from '@/lib/types'

interface Props {
  resume: ResumeData
  onChange: (data: ResumeData) => void
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

type Section = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages'

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-ink/40 transition-colors"
      />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-ink/40 transition-colors resize-none"
      />
    </div>
  )
}

export default function ResumeEditor({ resume, onChange }: Props) {
  const [openSection, setOpenSection] = useState<Section>('personal')

  const updatePersonal = (field: string, value: string) => {
    onChange({ ...resume, personal: { ...resume.personal, [field]: value } })
  }

  // Experience
  const addExperience = () => {
    const exp: Experience = {
      id: uid(), company: '', role: '', startDate: '', endDate: '',
      current: false, description: '', bullets: [''],
    }
    onChange({ ...resume, experience: [...resume.experience, exp] })
  }
  const updateExperience = (id: string, field: string, value: unknown) => {
    onChange({ ...resume, experience: resume.experience.map((e) => e.id === id ? { ...e, [field]: value } : e) })
  }
  const removeExperience = (id: string) => {
    onChange({ ...resume, experience: resume.experience.filter((e) => e.id !== id) })
  }

  // Education
  const addEducation = () => {
    const edu: Education = { id: uid(), school: '', degree: '', field: '', startDate: '', endDate: '' }
    onChange({ ...resume, education: [...resume.education, edu] })
  }
  const updateEducation = (id: string, field: string, value: string) => {
    onChange({ ...resume, education: resume.education.map((e) => e.id === id ? { ...e, [field]: value } : e) })
  }
  const removeEducation = (id: string) => {
    onChange({ ...resume, education: resume.education.filter((e) => e.id !== id) })
  }

  // Projects
  const addProject = () => {
    const proj: Project = { id: uid(), name: '', description: '', tech: '' }
    onChange({ ...resume, projects: [...resume.projects, proj] })
  }
  const updateProject = (id: string, field: string, value: string) => {
    onChange({ ...resume, projects: resume.projects.map((p) => p.id === id ? { ...p, [field]: value } : p) })
  }
  const removeProject = (id: string) => {
    onChange({ ...resume, projects: resume.projects.filter((p) => p.id !== id) })
  }

  // Certifications
  const addCertification = () => {
    const cert: Certification = { id: uid(), name: '', issuer: '', date: '', credentialUrl: '' }
    onChange({ ...resume, certifications: [...(resume.certifications || []), cert] })
  }
  const updateCertification = (id: string, field: string, value: string) => {
    onChange({
      ...resume,
      certifications: (resume.certifications || []).map((c) => c.id === id ? { ...c, [field]: value } : c),
    })
  }
  const removeCertification = (id: string) => {
    onChange({ ...resume, certifications: (resume.certifications || []).filter((c) => c.id !== id) })
  }

  // Languages
  const addLanguage = () => {
    const lang: Language = { id: uid(), language: '', proficiency: 'Fluent' }
    onChange({ ...resume, languages: [...(resume.languages || []), lang] })
  }
  const updateLanguage = (id: string, field: string, value: string) => {
    onChange({
      ...resume,
      languages: (resume.languages || []).map((l) => l.id === id ? { ...l, [field]: value } : l),
    })
  }
  const removeLanguage = (id: string) => {
    onChange({ ...resume, languages: (resume.languages || []).filter((l) => l.id !== id) })
  }

  const updateSkills = (value: string) => {
    onChange({ ...resume, skills: value.split(',').map((s) => s.trim()).filter(Boolean) })
  }

  const toggle = (s: Section) => setOpenSection(s)

  const SectionHeader = ({ id, title, count }: { id: Section; title: string; count?: number }) => (
    <button
      onClick={() => toggle(id)}
      className="w-full flex items-center justify-between p-5 hover:bg-ink/2 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="font-display text-xl text-ink">{title}</span>
        {count !== undefined && count > 0 && (
          <span className="text-xs bg-ink/10 text-ink/60 rounded-full px-2 py-0.5">{count}</span>
        )}
      </div>
      {openSection === id ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
    </button>
  )

  return (
    <div className="space-y-4">
      {/* Personal */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <SectionHeader id="personal" title="Personal Info" />
        {openSection === 'personal' && (
          <div className="px-5 pb-5 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Field label="Full Name" value={resume.personal.name} onChange={(v) => updatePersonal('name', v)} placeholder="Jane Doe" />
            </div>
            <div className="col-span-2">
              <Field label="Job Title" value={resume.personal.title} onChange={(v) => updatePersonal('title', v)} placeholder="Software Engineer" />
            </div>
            <Field label="Email" value={resume.personal.email} onChange={(v) => updatePersonal('email', v)} type="email" placeholder="jane@email.com" />
            <Field label="Phone" value={resume.personal.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="+1 555-0100" />
            <Field label="Location" value={resume.personal.location} onChange={(v) => updatePersonal('location', v)} placeholder="San Francisco, CA" />
            <Field label="LinkedIn" value={resume.personal.linkedin} onChange={(v) => updatePersonal('linkedin', v)} placeholder="linkedin.com/in/jane" />
            <div className="col-span-2">
              <Field label="Website / Portfolio" value={resume.personal.website} onChange={(v) => updatePersonal('website', v)} placeholder="janedev.com" />
            </div>
            <div className="col-span-2">
              <TextArea label="Professional Summary" value={resume.personal.summary} onChange={(v) => updatePersonal('summary', v)} placeholder="2-3 sentences about who you are and what you bring..." rows={4} />
            </div>
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <SectionHeader id="experience" title="Experience" count={resume.experience.length} />
        {openSection === 'experience' && (
          <div className="px-5 pb-5 space-y-6">
            {resume.experience.map((exp, idx) => (
              <div key={exp.id} className="border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-muted uppercase tracking-wide">Position {idx + 1}</span>
                  <button onClick={() => removeExperience(exp.id)} className="text-muted hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Acme Corp" />
                  <Field label="Role" value={exp.role} onChange={(v) => updateExperience(exp.id, 'role', v)} placeholder="Senior Engineer" />
                  <Field label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Jan 2022" />
                  <Field label="End Date" value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="Present" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">Bullet Points</label>
                  <div className="space-y-2">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex gap-2">
                        <input
                          value={bullet}
                          onChange={(e) => {
                            const bullets = [...exp.bullets]
                            bullets[bIdx] = e.target.value
                            updateExperience(exp.id, 'bullets', bullets)
                          }}
                          placeholder="Achieved X by doing Y, resulting in Z..."
                          className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-ink/40 transition-colors"
                        />
                        <button
                          onClick={() => {
                            const bullets = exp.bullets.filter((_, i) => i !== bIdx)
                            updateExperience(exp.id, 'bullets', bullets.length ? bullets : [''])
                          }}
                          className="text-muted hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => updateExperience(exp.id, 'bullets', [...exp.bullets, ''])}
                      className="text-xs text-muted hover:text-ink transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add bullet
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-3 text-sm text-muted hover:border-ink/30 hover:text-ink transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <SectionHeader id="education" title="Education" count={resume.education.length} />
        {openSection === 'education' && (
          <div className="px-5 pb-5 space-y-4">
            {resume.education.map((edu, idx) => (
              <div key={edu.id} className="border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted uppercase tracking-wide">School {idx + 1}</span>
                  <button onClick={() => removeEducation(edu.id)} className="text-muted hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Field label="School" value={edu.school} onChange={(v) => updateEducation(edu.id, 'school', v)} placeholder="MIT" />
                  </div>
                  <Field label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, 'degree', v)} placeholder="B.S." />
                  <Field label="Field of Study" value={edu.field} onChange={(v) => updateEducation(edu.id, 'field', v)} placeholder="Computer Science" />
                  <Field label="Start" value={edu.startDate} onChange={(v) => updateEducation(edu.id, 'startDate', v)} placeholder="2018" />
                  <Field label="End" value={edu.endDate} onChange={(v) => updateEducation(edu.id, 'endDate', v)} placeholder="2022" />
                  <div className="col-span-2">
                    <Field label="GPA (optional)" value={edu.gpa || ''} onChange={(v) => updateEducation(edu.id, 'gpa', v)} placeholder="3.8 / 4.0" />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-3 text-sm text-muted hover:border-ink/30 hover:text-ink transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <SectionHeader id="certifications" title="Certifications" count={(resume.certifications || []).length} />
        {openSection === 'certifications' && (
          <div className="px-5 pb-5 space-y-4">
            {(resume.certifications || []).map((cert, idx) => (
              <div key={cert.id} className="border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted uppercase tracking-wide">Certificate {idx + 1}</span>
                  <button onClick={() => removeCertification(cert.id)} className="text-muted hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Field label="Certificate Name" value={cert.name} onChange={(v) => updateCertification(cert.id, 'name', v)} placeholder="Microsoft PL-300: Power BI Data Analyst" />
                  </div>
                  <Field label="Issuer" value={cert.issuer} onChange={(v) => updateCertification(cert.id, 'issuer', v)} placeholder="Microsoft" />
                  <Field label="Date" value={cert.date} onChange={(v) => updateCertification(cert.id, 'date', v)} placeholder="Mar 2024" />
                  <div className="col-span-2">
                    <Field label="Credential URL (optional)" value={cert.credentialUrl || ''} onChange={(v) => updateCertification(cert.id, 'credentialUrl', v)} placeholder="https://learn.microsoft.com/..." />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addCertification}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-3 text-sm text-muted hover:border-ink/30 hover:text-ink transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Certification
            </button>
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <SectionHeader id="languages" title="Languages" count={(resume.languages || []).length} />
        {openSection === 'languages' && (
          <div className="px-5 pb-5 space-y-4">
            {(resume.languages || []).map((lang, idx) => (
              <div key={lang.id} className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted uppercase tracking-wide">Language {idx + 1}</span>
                  <button onClick={() => removeLanguage(lang.id)} className="text-muted hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Language"
                    value={lang.language}
                    onChange={(v) => updateLanguage(lang.id, 'language', v)}
                    placeholder="English"
                  />
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">Proficiency</label>
                    <select
                      value={lang.proficiency}
                      onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink/40 transition-colors"
                    >
                      {['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'].map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addLanguage}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-3 text-sm text-muted hover:border-ink/30 hover:text-ink transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Language
            </button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <SectionHeader id="skills" title="Skills" count={resume.skills.length} />
        {openSection === 'skills' && (
          <div className="px-5 pb-5">
            <TextArea
              label="Skills (comma separated)"
              value={resume.skills.join(', ')}
              onChange={updateSkills}
              placeholder="React, TypeScript, Node.js, PostgreSQL, Docker..."
              rows={3}
            />
            {resume.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {resume.skills.map((skill) => (
                  <span key={skill} className="text-xs bg-ink/5 text-ink rounded-full px-3 py-1">{skill}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <SectionHeader id="projects" title="Projects" count={resume.projects.length} />
        {openSection === 'projects' && (
          <div className="px-5 pb-5 space-y-4">
            {resume.projects.map((proj, idx) => (
              <div key={proj.id} className="border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted uppercase tracking-wide">Project {idx + 1}</span>
                  <button onClick={() => removeProject(proj.id)} className="text-muted hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Field label="Project Name" value={proj.name} onChange={(v) => updateProject(proj.id, 'name', v)} placeholder="ResumeAI" />
                <TextArea label="Description" value={proj.description} onChange={(v) => updateProject(proj.id, 'description', v)} placeholder="What it does and what you built..." rows={2} />
                <Field label="Tech Stack" value={proj.tech} onChange={(v) => updateProject(proj.id, 'tech', v)} placeholder="Next.js, Tailwind, Supabase" />
                <Field label="Link (optional)" value={proj.link || ''} onChange={(v) => updateProject(proj.id, 'link', v)} placeholder="github.com/jane/resumeai" />
              </div>
            ))}
            <button
              onClick={addProject}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-3 text-sm text-muted hover:border-ink/30 hover:text-ink transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        )}
      </div>
    </div>
  )
}