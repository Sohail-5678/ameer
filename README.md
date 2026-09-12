# Ameer Sohail Shaik — Portfolio

**🌐 Live site: [ameer-shaik.vercel.app](https://ameer-shaik.vercel.app/)**

A modern, animated personal portfolio + an **AI Concierge** that recruiters
can use to evaluate fit against any JD they paste in. The concierge is
hard-grounded in the profile (no hallucinations) and powered by Groq's
free, OpenAI-compatible LLM endpoint.

## Stack

| Layer       | Tech                                                   |
|-------------|---------------------------------------------------------|
| Framework   | Next.js 14 (App Router) + React 18 + TypeScript        |
| Styling     | Tailwind CSS, custom CSS variables, glassmorphism      |
| Animation   | Framer Motion                                          |
| Icons       | lucide-react                                           |
| AI backend  | `/api/chat` route → Groq (`llama-3.3-70b-versatile`) via the `openai` SDK with streaming |

## Quick start

```bash
# 1. Install deps
npm install

# 2. Add your Groq API key
cp .env.local.example .env.local
# then open .env.local and paste your key

# 3. Dev
npm run dev
# open http://localhost:3000
```

The AI assistant button is bottom-right, or hit **⌘K / Ctrl+K** to open it.

## Where to edit content

**`lib/profile.ts`** is the single source of truth. The portfolio sections
AND the AI's knowledge base are both built from this file, so they can never
drift out of sync. Update any of:

- `profile.title`, `profile.tagline`, `profile.status` — headline positioning
  and the "Currently" blocks in the Hero and About sections
- `profile.about[]` — paragraphs in the About section
- `profile.highlights[]` — the "By the numbers" column
- `profile.experience[]` — work history (timeline)
- `profile.projects[]` — project cards (set `liveUrl` to fill in a demo
  link; set `repoUrl` for a GitHub icon to appear)
- `profile.skills[]` — skill groups
- `profile.education[]` — education cards
- `profile.email`, `profile.phone`, `profile.links.*` — contact info

**Resume**: the PDF lives at `public/resume.pdf`. Replacing that file updates
the Hero "Read the resume" button — no code change needed.

**Profile photo**: not required by the current design (the hero uses an
abstract visual instead). If you want to add one, drop it at
`public/profile.jpg` and add an `<Image src="/profile.jpg" />` wherever you
prefer.

## How the anti-hallucination guarantee works

1. `lib/profile.ts` exports `buildKnowledgeBase()` — a flat string version
   of the entire profile.
2. `app/api/chat/route.ts` injects that string into the system prompt with
   strict rules: *"Only use facts from the PROFILE below. Never invent."*
3. The model (Llama 3.3 70B on Groq) is called at `temperature: 0.4` to keep
   answers tight and on-script.
4. If a recruiter asks about something that isn't in the profile (e.g. "did
   Ameer ever use Kafka?"), the model is instructed to say so honestly and
   point them to the contact email.

To extend the knowledge base, just add to `lib/profile.ts` — the prompt
regenerates automatically on every request.

## Project structure

```
app/
  api/chat/route.ts       Groq-backed streaming RAG endpoint
  globals.css             Tailwind + custom utilities
  layout.tsx              Root layout, fonts, metadata
  page.tsx                Wires all sections together
components/
  AIAssistant.tsx         The concierge (panel + launcher)
  About.tsx
  BackgroundEffects.tsx   Animated mesh + parallax orbs
  Contact.tsx
  Education.tsx
  Experience.tsx
  Footer.tsx
  Hero.tsx
  Navigation.tsx
  Projects.tsx
  SectionHeader.tsx
  Skills.tsx
lib/
  profile.ts              Single source of truth
  utils.ts                cn() helper
public/
  resume.pdf              Resume served by the Hero button
```

## Tweaks you'll probably want

- **Live demo links** → edit each project's `liveUrl` in `lib/profile.ts`.
- **Replace the model** → set `GROQ_MODEL=...` (any model on Groq's catalog
  works — e.g. `openai/gpt-oss-120b`, `qwen/qwen3-32b`,
  `meta-llama/llama-4-scout-17b-16e-instruct`, `llama-3.1-8b-instant`).
- **Tighten the system prompt** → it lives in `app/api/chat/route.ts`
  inside the `SYSTEM_PROMPT` template.
- **Theme colors** → CSS variables in `app/globals.css` and
  `tailwind.config.ts`.
