import { NextRequest, NextResponse } from 'next/server'

const MODELS = [
  'openrouter/auto',
]

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function extractJson(text: string) {
  const cleaned = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/)
    if (match) {
      return JSON.parse(match[0])
    }
    throw new Error('AI returned invalid JSON')
  }
}

async function callOpenRouter(prompt: string, model: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'X-Title': 'Resume Builder AI',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
    }),
  })

  const rawText = await response.text()

  let data: any = {}
  try {
    data = rawText ? JSON.parse(rawText) : {}
  } catch {
    throw new Error('Invalid response from OpenRouter')
  }

  if (!response.ok) {
    const message = data?.error?.message || rawText || 'OpenRouter error'
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

Rules:
- Return ONLY raw JSON.
- Do NOT include markdown.
- Do NOT include code fences.
- Do NOT include explanations.
- Keep all information truthful.
- Do not fabricate experience, education, certifications, projects, or languages.
- Preserve all existing IDs when possible.
- Preserve certifications and languages exactly as provided.
- Improve the professional summary, experience bullets, skills, and project descriptions.

Return exactly this JSON structure:
{
  "personal": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": "",
    "summary": ""
  },
  "experience": [
    {
      "id": "",
      "company": "",
      "role": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "description": "",
      "bullets": []
    }
  ],
  "education": [
    {
      "id": "",
      "school": "",
      "degree": "",
      "field": "",
      "startDate": "",
      "endDate": "",
      "gpa": ""
    }
  ],
  "skills": [],
  "projects": [
    {
      "id": "",
      "name": "",
      "description": "",
      "tech": "",
      "link": ""
    }
  ],
  "certifications": [
    {
      "id": "",
      "name": "",
      "issuer": "",
      "date": "",
      "credentialUrl": ""
    }
  ],
  "languages": [
    {
      "id": "",
      "language": "",
      "proficiency": ""
    }
  ]
}

CURRENT RESUME:
${JSON.stringify(resume, null, 2)}

JOB DESCRIPTION:
${jobDescription}

Optimize the resume for this specific job. Return only raw JSON.`

    let lastError = 'AI failed'

    for (const model of MODELS) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`Trying model: ${model} attempt ${attempt}`)

          const data = await callOpenRouter(prompt, model)
          const aiText = data.choices?.[0]?.message?.content || ''

          if (!aiText) {
            throw new Error('AI returned empty response')
          }

          const optimized = extractJson(aiText)

          console.log(`Success with model: ${model}`)
          return NextResponse.json({ optimized })
        } catch (err: any) {
          lastError = err.message || 'AI model failed'
          console.error(`Model failed: ${model} attempt ${attempt}`, lastError)

          if (attempt < 3) {
            await sleep(1000)
          }
        }
      }
    }

    return NextResponse.json(
      {
        error:
          lastError ||
          'All AI models are currently busy. Please try again in a few seconds.',
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('Optimize error:', error)

    return NextResponse.json(
      { error: 'Failed to optimize resume' },
      { status: 500 }
    )
  }
}