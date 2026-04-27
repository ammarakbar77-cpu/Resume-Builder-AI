'use client'

import { TemplateId } from '@/lib/types'

interface Props {
  selected: TemplateId
  onChange: (t: TemplateId) => void
}

const templates: {
  id: TemplateId
  name: string
  description: string
  preview: React.ReactNode
}[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional serif, ATS-safe',
    preview: (
      <div style={{ padding: '8px 10px', height: '100%', fontFamily: 'Georgia, serif', background: '#fff' }}>
        <div style={{ textAlign: 'center', borderBottom: '1.5px solid #1a1a1a', paddingBottom: 5, marginBottom: 5 }}>
          <div style={{ height: 7, background: '#1a1a1a', borderRadius: 1, width: '60%', margin: '0 auto 3px' }} />
          <div style={{ height: 4, background: '#888', borderRadius: 1, width: '40%', margin: '0 auto 4px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {[28, 22, 20].map((w, i) => <div key={i} style={{ height: 3, background: '#bbb', borderRadius: 1, width: w }} />)}
          </div>
        </div>
        {['EXPERIENCE', 'EDUCATION'].map((s) => (
          <div key={s} style={{ marginBottom: 5 }}>
            <div style={{ height: 3, background: '#1a1a1a', borderRadius: 1, width: '35%', marginBottom: 3 }} />
            <div style={{ height: 2.5, background: '#ccc', borderRadius: 1, width: '80%', marginBottom: 2 }} />
            <div style={{ height: 2.5, background: '#ddd', borderRadius: 1, width: '65%' }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Blue header, two-column',
    preview: (
      <div style={{ height: '100%', background: '#fff', fontFamily: 'sans-serif', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', padding: '8px 10px 7px' }}>
          <div style={{ height: 7, background: 'rgba(255,255,255,0.9)', borderRadius: 1, width: '55%', marginBottom: 3 }} />
          <div style={{ height: 3.5, background: '#93c5fd', borderRadius: 1, width: '38%', marginBottom: 4 }} />
          <div style={{ display: 'flex', gap: 5 }}>
            {[24, 18, 20].map((w, i) => <div key={i} style={{ height: 2.5, background: 'rgba(255,255,255,0.4)', borderRadius: 1, width: w }} />)}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px', gap: 0, flex: 1 }}>
          <div style={{ padding: '6px 6px 6px 10px', borderRight: '1px solid #e2e8f0' }}>
            {['EXPERIENCE', 'PROJECTS'].map((s) => (
              <div key={s} style={{ marginBottom: 5 }}>
                <div style={{ height: 2.5, background: '#2563eb', borderRadius: 1, width: '30%', marginBottom: 3 }} />
                <div style={{ height: 2, background: '#cbd5e1', borderRadius: 1, width: '85%', marginBottom: 1.5 }} />
                <div style={{ height: 2, background: '#e2e8f0', borderRadius: 1, width: '70%' }} />
              </div>
            ))}
          </div>
          <div style={{ background: '#f8fafc', padding: '6px 5px' }}>
            <div style={{ height: 2.5, background: '#2563eb', borderRadius: 1, width: '80%', marginBottom: 4 }} />
            {[1, 2, 3].map((i) => <div key={i} style={{ height: 10, background: '#dbeafe', borderRadius: 3, marginBottom: 3 }} />)}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra clean, whitespace',
    preview: (
      <div style={{ padding: '10px 12px', height: '100%', fontFamily: 'Helvetica, sans-serif', background: '#fff' }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ height: 8, background: '#111', borderRadius: 1, width: '50%', marginBottom: 3, fontWeight: 300 }} />
          <div style={{ height: 3, background: '#aaa', borderRadius: 1, width: '30%', marginBottom: 4 }} />
          <div style={{ display: 'flex', gap: 6 }}>
            {[20, 15, 18].map((w, i) => <div key={i} style={{ height: 2, background: '#ccc', borderRadius: 1, width: w }} />)}
          </div>
        </div>
        <div style={{ borderBottom: '1px solid #f0f0f0', marginBottom: 7, paddingBottom: 6 }}>
          <div style={{ height: 2, background: '#ddd', borderRadius: 1, width: '90%', marginBottom: 2 }} />
          <div style={{ height: 2, background: '#ddd', borderRadius: 1, width: '75%' }} />
        </div>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 6, marginBottom: 7 }}>
            <div style={{ height: 2.5, background: '#ccc', borderRadius: 1, marginTop: 1 }} />
            <div>
              <div style={{ height: 3.5, background: '#333', borderRadius: 1, width: '60%', marginBottom: 2 }} />
              <div style={{ height: 2, background: '#ddd', borderRadius: 1, width: '85%', marginBottom: 1.5 }} />
              <div style={{ height: 2, background: '#eee', borderRadius: 1, width: '70%' }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold & memorable',
    preview: (
      <div style={{ height: '100%', background: '#fff', fontFamily: 'sans-serif', overflow: 'hidden' }}>
        <div style={{ background: '#18181b', padding: '8px 10px 7px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -8, top: -8, width: 36, height: 36, borderRadius: '50%', background: '#f97316', opacity: 0.2 }} />
          <div style={{ height: 7, background: 'rgba(255,255,255,0.9)', borderRadius: 1, width: '55%', marginBottom: 3 }} />
          <div style={{ height: 3, background: '#f97316', borderRadius: 1, width: '38%', marginBottom: 4 }} />
          <div style={{ display: 'flex', gap: 5 }}>
            {[20, 15, 18].map((w, i) => <div key={i} style={{ height: 2, background: 'rgba(255,255,255,0.3)', borderRadius: 1, width: w }} />)}
          </div>
        </div>
        <div style={{ height: 3, background: 'linear-gradient(90deg,#f97316,#fb923c,#fbbf24)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px' }}>
          <div style={{ padding: '6px 6px 6px 10px' }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 3 }}>
                  <div style={{ width: 2, height: 8, background: '#f97316', borderRadius: 1 }} />
                  <div style={{ height: 2.5, background: '#333', borderRadius: 1, width: '25%' }} />
                </div>
                <div style={{ borderLeft: '1.5px solid #f4f4f5', paddingLeft: 5 }}>
                  <div style={{ height: 2.5, background: '#ccc', borderRadius: 1, width: '80%', marginBottom: 1.5 }} />
                  <div style={{ height: 2, background: '#e4e4e7', borderRadius: 1, width: '65%' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#18181b', padding: '6px 5px' }}>
            <div style={{ height: 2.5, background: '#f97316', borderRadius: 1, width: '70%', marginBottom: 4 }} />
            {[1, 2, 3].map((i) => <div key={i} style={{ height: 8, background: '#27272a', borderRadius: 3, marginBottom: 3, border: '1px solid #3f3f46' }} />)}
          </div>
        </div>
      </div>
    ),
  },
]

export default function TemplatePicker({ selected, onChange }: Props) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5">
      <div className="mb-4">
        <h3 className="font-display text-xl text-ink">Choose Template</h3>
        <p className="text-xs text-muted mt-0.5">Pick a design — your content stays the same</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 text-left ${
              selected === t.id
                ? 'border-ink shadow-md scale-[1.02]'
                : 'border-border hover:border-ink/30 hover:shadow-sm'
            }`}
            style={{ height: 140 }}
          >
            {/* Thumbnail */}
            <div className="absolute inset-0 overflow-hidden">
              {t.preview}
            </div>

            {/* Label overlay at bottom */}
            <div className={`absolute bottom-0 left-0 right-0 px-2.5 py-2 transition-all ${
              selected === t.id ? 'bg-ink' : 'bg-white/90 backdrop-blur-sm border-t border-border'
            }`}>
              <p className={`text-xs font-semibold ${selected === t.id ? 'text-white' : 'text-ink'}`}>{t.name}</p>
              <p className={`text-[10px] leading-tight ${selected === t.id ? 'text-white/70' : 'text-muted'}`}>{t.description}</p>
            </div>

            {/* Selected checkmark */}
            {selected === t.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-ink rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}