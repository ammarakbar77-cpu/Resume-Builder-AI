export interface ResumeData {
  personal: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
    summary: string
  }
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  bullets: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  tech: string
  link?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialUrl?: string
}

export interface Language {
  id: string
  language: string
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic'
}

export interface ATSResult {
  score: number
  matchedKeywords: string[]
  missingKeywords: string[]
  suggestions: string[]
}

export type TemplateId = 'classic' | 'modern' | 'minimal' | 'creative'

export const defaultResume: ResumeData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
}