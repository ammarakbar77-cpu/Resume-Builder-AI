# ResumeAI — AI-Powered Resume Builder

A full-stack Next.js app that lets you visually build your resume and use Claude AI to optimize it for any job description.

## ✨ Features

- **Visual Resume Editor** — Structured form for personal info, experience, education, skills, and projects
- **AI Optimization** — Paste a job description and Claude rewrites your resume to match keywords and tone
- **Live Preview** — See your resume update in real time as you type
- **PDF Export** — Browser print dialog generates a clean, ATS-friendly PDF
- **Modern UI** — Built with Tailwind CSS, clean editorial design

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (claude-opus-4-5)
- **Language**: TypeScript
- **Deployment**: Vercel

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/yourusername/resume-builder-ai
cd resume-builder-ai
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your API key at: https://console.anthropic.com/

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add `GEMINI_API_KEY` in the Environment Variables section
4. Deploy!

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── builder/page.tsx      # Main editor
│   └── api/
│       └── optimize/route.ts # AI optimization endpoint
├── components/
│   ├── editor/
│   │   ├── ResumeEditor.tsx  # Form editor
│   │   └── OptimizePanel.tsx # AI optimize UI
│   └── resume/
│       └── ResumePreview.tsx # Live resume preview
└── lib/
    └── types.ts              # TypeScript types
```

## 🎯 How to Use

1. Open the **Edit** tab and fill in your resume details
2. Switch to **AI Optimize**, paste a job description, and click optimize
3. Switch to **Preview** to see your tailored resume
4. Click **Export PDF** to download

## 📝 License

MIT
