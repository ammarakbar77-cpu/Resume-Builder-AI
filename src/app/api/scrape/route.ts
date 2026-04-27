import { NextRequest, NextResponse } from 'next/server'

// Domains that block scraping — tell user to paste manually
const BLOCKED_DOMAINS = ['linkedin.com', 'www.linkedin.com']

function extractJobText(html: string): string {
  // Remove script and style tags and their contents
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')

  // Try to find main job content containers first (common class/id patterns)
  const jobContainerPatterns = [
    /<[^>]*(?:job-description|jobDescription|job_description|jobdescription|job-details|jobDetails|description-content|job-content)[^>]*>([\s\S]*?)<\/(?:div|section|article)>/gi,
    /<[^>]*id=["'](?:job-description|jobDescription|job-details|jobDetails|description)[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|section|article)>/gi,
  ]

  for (const pattern of jobContainerPatterns) {
    const match = pattern.exec(text)
    if (match && match[1] && match[1].length > 200) {
      text = match[1]
      break
    }
  }

  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ')

  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&bull;/g, '•')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')

  // Collapse whitespace and clean up
  text = text
    .replace(/\t/g, ' ')
    .replace(/ {2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return text
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url?.trim()) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL format
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format. Please include https://' }, { status: 400 })
    }

    // Check for blocked domains
    const hostname = parsedUrl.hostname.replace(/^www\./, '')
    if (BLOCKED_DOMAINS.some(d => d.replace(/^www\./, '') === hostname)) {
      return NextResponse.json({
        error: 'LinkedIn blocks automated access. Please copy and paste the job description manually.',
        blocked: true,
      }, { status: 422 })
    }

    // Fetch the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    })

    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        return NextResponse.json({
          error: 'This site blocked access. Please copy and paste the job description manually.',
          blocked: true,
        }, { status: 422 })
      }
      return NextResponse.json({ error: `Failed to fetch page (${response.status})` }, { status: 400 })
    }

    const html = await response.text()
    const extracted = extractJobText(html)

    if (!extracted || extracted.length < 100) {
      return NextResponse.json({
        error: 'Could not extract job description from this page. Please paste it manually.',
        blocked: true,
      }, { status: 422 })
    }

    // Trim to reasonable length for the AI (roughly 6000 chars)
    const trimmed = extracted.length > 6000 ? extracted.slice(0, 6000) + '...' : extracted

    return NextResponse.json({ text: trimmed })

  } catch (error: unknown) {
    const isTimeout = error instanceof Error && error.name === 'TimeoutError'
    console.error('Scrape error:', error)
    return NextResponse.json({
      error: isTimeout
        ? 'Request timed out. The site took too long to respond.'
        : 'Failed to fetch the URL. Please paste the job description manually.',
    }, { status: 500 })
  }
}