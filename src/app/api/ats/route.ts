import { NextRequest, NextResponse } from 'next/server'

const MODELS = [
  'deepseek/deepseek-chat:free',
  'google/gemma-3-27b-it:free',
  'meta-llama/llama-3.3-70b-instruct:free',
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

    const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze how well this resume matches the job description.

Return ONLY a valid JSON object with no markdown, no explanation, no code fences:
{
  "score": <number 0-100>,
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}

Rules:
- score: overall ATS match percentage (0-100)
- matchedKeywords: important keywords/skills from the job description that appear in the resume (max 10)
- missingKeywords: important keywords/skills from the job description missing from the resume (max 10)
- suggestions: 3-5 specific, actionable improvements to improve the ATS score

RESUME:
${JSON.stringify(resume, null, 2)}

JOB DESCRIPTION:
${jobDescription}

Return only raw JSON.`

    let lastError = ''
    for (const model of MODELS) {
      const { response, data } = await callOpenRouter(prompt, model)

      if (!response.ok) {
        const code = data?.error?.code
        if (code === 429 || code === 503 || code === 404) {
          lastError = data?.error?.message || 'Unknown error'
          continue
        }
        return NextResponse.json({ error: 'AI API error' }, { status: 500 })
      }

      const text = data.choices?.[0]?.message?.content || ''
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

      try {
        const result = JSON.parse(cleaned)
        return NextResponse.json({ result })
      } catch {
        lastError = 'Invalid JSON response'
        continue
      }
    }

    console.error('All models failed:', lastError)
    return NextResponse.json({ error: 'All AI models are currently busy. Please try again.' }, { status: 503 })

  } catch (error) {
    console.error('ATS check error:', error)
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 })
  }
}