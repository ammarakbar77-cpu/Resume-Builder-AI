import { NextRequest, NextResponse } from 'next/server'

const MODELS = [
  'deepseek/deepseek-chat:free',
  'google/gemma-3-27b-it:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'nvidia/llama-3.1-nemotron-nano-8b-v1:free',
  'openrouter/free',
]

async function callOpenRouter(prompt: string, model: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Resume Builder AI',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await response.json()
  return { response, data }
}

export async function POST(req: NextRequest) {
  try {
    const { resume, jobDescription } = await req.json()

    if (!jobDescription?.trim()) {
      return NextResponse.json({ error: 'Job description is required' }, { status: 400 })
    }

    const prompt = `You are an expert resume writer and career coach. 

I have a resume and a job description. Your task is to optimize the resume to better match the job description by:
1. Rewriting the professional summary to align with the role
2. Enhancing experience bullet points with relevant keywords and stronger action verbs
3. Highlighting the most relevant skills
4. Keeping all information truthful — only rephrase, don't fabricate
5. Preserve all certifications and languages exactly as provided

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

    let lastError = ''
    for (const model of MODELS) {
      console.log(`Trying model: ${model}`)
      const { response, data } = await callOpenRouter(prompt, model)

      if (!response.ok) {
        const code = data?.error?.code
        if (code === 429 || code === 503 || code === 404) {
          console.warn(`Model ${model} failed (${code}), trying next...`)
          lastError = data?.error?.message || 'Unknown error'
          continue
        }
        console.error('OpenRouter error:', data)
        return NextResponse.json({ error: 'AI API error' }, { status: 500 })
      }

      const text = data.choices?.[0]?.message?.content || ''
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

      try {
        const optimized = JSON.parse(cleaned)
        console.log(`Success with model: ${model}`)
        return NextResponse.json({ optimized })
      } catch {
        console.warn(`Model ${model} returned invalid JSON, trying next...`)
        lastError = 'Invalid JSON response'
        continue
      }
    }

    console.error('All models failed. Last error:', lastError)
    return NextResponse.json({ error: 'All AI models are currently busy. Please try again in a minute.' }, { status: 503 })

  } catch (error) {
    console.error('Optimize error:', error)
    return NextResponse.json({ error: 'Failed to optimize resume' }, { status: 500 })
  }
}