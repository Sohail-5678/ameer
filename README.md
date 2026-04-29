# Ameer Sohail Shaik — Portfolio

A modern, animated personal portfolio + an **AI Concierge** that recruiters
can use to evaluate fit against any JD they paste in. The concierge is
hard-grounded in your profile (no hallucinations) and powered by NVIDIA
Build's free LLM endpoint.

## Stack

| Layer       | Tech                                                   |
|-------------|---------------------------------------------------------|
| Framework   | Next.js 14 (App Router) + React 18 + TypeScript        |
| Styling     | Tailwind CSS, custom CSS variables, glassmorphism      |
| Animation   | Framer Motion                                          |
| Icons       | lucide-react                                           |
| AI backend  | `/api/chat` route → NVIDIA Build (`moonshotai/kimi-k2-instruct`) via the `openai` SDK with streaming |
| Hosting     | Vercel (recommended) — free tier handles everything   |

## Quick start

```bash
# 1. Install deps
npm install

# 2. Add your NVIDIA API key
cp .env.local.example .env.local
# then open .env.local and paste your key

# 3. Dev
npm run dev
# open http://localhost:3000
```

The AI assistant button is bottom-right, or hit **⌘K / Ctrl+K** to open it.

## Where to edit your content

**`lib/profile.ts`** is the single source of truth. The portfolio sections
AND the AI's knowledge base are both built from this file, so they can never
drift out of sync. Update any of:

- `profile.about[]` — paragraphs in the About section
- `profile.experience[]` — work history (timeline)
- `profile.projects[]` — project cards (set `liveUrl` to fill in your demo
  link; set `repoUrl` for a GitHub icon to appear)
- `profile.skills[]` — skill groups
- `profile.education[]` — education cards
- `profile.email`, `profile.phone`, `profile.links.*` — contact info

**Resume**: drop your PDF at `public/resume.pdf`. It's already linked from
the Hero "Resume" button.

**Profile photo**: not required by the current design (the hero uses an
abstract visual instead). If you want to add one, drop it at
`public/profile.jpg` and add an `<Image src="/profile.jpg" />` wherever you
prefer.

## How the anti-hallucination guarantee works

1. `lib/profile.ts` exports `buildKnowledgeBase()` — a flat string version
   of your entire profile.
2. `app/api/chat/route.ts` injects that string into the system prompt with
   strict rules: *"Only use facts from the PROFILE below. Never invent."*
3. The model (Kimi K2) is called at `temperature: 0.4` to keep answers
   tight and on-script.
4. If a recruiter asks about something you don't have (e.g. "did Ameer ever
   use Kafka?"), the model is instructed to say so honestly and point them
   to your email.

To extend the knowledge base, just add to `lib/profile.ts` — the prompt
regenerates automatically on every request.

## Deployment

### Recommended: Vercel (free, 2 min)

The AI route requires a Node server. **GitHub Pages alone won't work** —
it's static-only. Vercel is purpose-built for Next.js apps and is free for
personal projects.

1. Push this folder to GitHub (a new repo, e.g. `ameer-portfolio`).
2. Go to <https://vercel.com/new>, "Import" the repo.
3. In **Environment Variables**, add:
   - `NVIDIA_API_KEY` = your key from <https://build.nvidia.com>
   - *(optional)* `NVIDIA_MODEL` = `moonshotai/kimi-k2-instruct`
4. Click **Deploy**. You'll get a URL like `ameer-portfolio.vercel.app`.
5. *(optional)* Add a custom domain in Vercel → Project → Settings → Domains.

### Keep `sohail-5678.github.io` as the front door

Two options:

**Option A — Replace it entirely** (simplest)
- Add a custom domain (e.g. `ameershaik.com`) on Vercel, or
- Point your old GitHub Pages repo's `index.html` to a `<meta refresh>`
  redirect to your Vercel URL.

**Option B — Keep GitHub Pages static, host AI elsewhere**
- Deploy this Next.js app to Vercel.
- Put a tiny redirect or a link from `sohail-5678.github.io` → the Vercel app.

The portfolio you've got here is the canonical version going forward — the
AI concierge **only works on the Vercel deployment**, because GitHub Pages
cannot execute server code.

## Verifying the AI route

After deploying, open `https://<your-url>/api/chat` in a browser. You
should see a JSON response confirming the route is live and that
`keyConfigured: true`. If `false`, your env var didn't load — go back to
Vercel → Settings → Environment Variables and redeploy.

## Project structure

```
app/
  api/chat/route.ts       NVIDIA-backed streaming RAG endpoint
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
  resume.pdf              ← drop your PDF here
```

## Tweaks you'll probably want

- **Live demo links** → edit each project's `liveUrl` in `lib/profile.ts`.
- **Replace the model** → set `NVIDIA_MODEL=...` (any model on
  build.nvidia.com works — e.g. `meta/llama-3.3-70b-instruct`,
  `nvidia/llama-3.3-nemotron-super-49b-v1`).
- **Tighten the system prompt** → it lives in `app/api/chat/route.ts`
  inside the `SYSTEM_PROMPT` template.
- **Theme colors** → CSS variables in `app/globals.css` and
  `tailwind.config.ts`.

Built with care. Good luck on the search!
