import { NextRequest, NextResponse } from 'next/server'

const MODELS = [
  'google/gemini-2.0-flash-exp:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'openrouter/auto',
]

async function callOpenRouter(prompt: string, model: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'X-Title': 'Resume Builder AI',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const text = await response.text()

  let data: any = {}
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    throw new Error('Invalid JSON from OpenRouter')
  }

  if (!response.ok) {
    const message = data?.error?.message || text || 'OpenRouter error'
    throw new Error(message)
  }

  return data
}

export async function POST(req: NextRequest) {
  try {
    const { resume, jobDescription } = await req.json()

    if (!jobDescription?.trim()) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      )
    }

    const prompt = `You are an expert resume writer and career coach. 

I have a resume and a job description. Your task is to optimize the resume to better match the job description by:
1. Rewriting the professional summary to align with the role
2. Enhancing experience bullet points with relevant keywords and stronger action verbs
3. Highlighting the most relevant skills
4. Keeping all information truthful — only rephrase, don't fabricate
5. Preserve all certifications and languages exactly as provided
6. Describe the projects in a way that emphasizes relevant technologies and impact

Return ONLY a valid JSON object matching exactly this structure (no markdown, no explanation, no code fences):
{
  "personal": {
    "name": "...",
    "title": "...",
    "email": "...",
    "phone": "...",
    "location": "...",
    "linkedin": "...",
    "website": "...",
    "summary": "optimized summary here"
  },
  "experience": [
    {
      "id": "...",
      "company": "...",
      "role": "...",
      "startDate": "...",
      "endDate": "...",
      "current": false,
      "description": "...",
      "bullets": ["optimized bullet 1", "optimized bullet 2"]
    }
  ],
  "education": [
    {
      "id": "...",
      "school": "...",
      "degree": "...",
      "field": "...",
      "startDate": "...",
      "endDate": "...",
      "gpa": "..."
    }
  ],
  "skills": ["skill1", "skill2"],
  "projects": [
    {
      "id": "...",
      "name": "...",
      "description": "...",
      "tech": "...",
      "link": "..."
    }
  ],
  "certifications": [
    {
      "id": "...",
      "name": "...",
      "issuer": "...",
      "date": "...",
      "credentialUrl": "..."
    }
  ],
  "languages": [
    {
      "id": "...",
      "language": "...",
      "proficiency": "..."
    }
  ]
}

CURRENT RESUME:
${JSON.stringify(resume, null, 2)}

JOB DESCRIPTION:
${jobDescription}

Optimize the resume for this specific job. Return only raw JSON.`

    try {
      const data = await callOpenRouter(prompt, MODELS[0])

      const text =
        data.choices?.[0]?.message?.content || ''

      const cleaned = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()

      const optimized = JSON.parse(cleaned)

      return NextResponse.json({ optimized })
    } catch (err: any) {
      console.error('AI error:', err.message)

      return NextResponse.json(
        { error: err.message || 'AI failed' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Optimize error:', error)

    return NextResponse.json(
      { error: 'Failed to optimize resume' },
      { status: 500 }
    )
  }
}