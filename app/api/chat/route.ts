// =============================================================================
// /api/chat — RAG endpoint backed by NVIDIA Build (build.nvidia.com).
//
// Design goals:
//   1. ZERO HALLUCINATION. The model is given Ameer's full resume as ground
//      truth in the system prompt and is hard-instructed to refuse / say "I
//      don't have that information" when asked something outside the corpus.
//   2. The NVIDIA API key NEVER reaches the browser — it lives in the Vercel
//      environment and is read only on the server.
//   3. Streaming SSE response so the UI can render tokens as they arrive.
//   4. Always-on: the route is stateless and edge-ready (kept on Node runtime
//      for openai SDK compatibility); cold start is sub-second on Vercel.
// =============================================================================

import OpenAI from "openai";
import { buildKnowledgeBase, profile } from "@/lib/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";
const DEFAULT_MODEL = "moonshotai/kimi-k2-instruct";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = (kb: string) => `
You are "Ameer's AI Concierge" — a hiring-assistant chatbot embedded in
${profile.name}'s personal portfolio website. You speak ON BEHALF of Ameer to
recruiters and hiring managers who visit the site.

## YOUR MISSION
Help the visitor evaluate Ameer for the role they are hiring for. When they
paste a job description, role title, or any role-related context, you must:

  1. Identify the key responsibilities, required skills, and "nice-to-haves"
     in their role.
  2. Map each requirement to specific evidence from Ameer's PROFILE below
     (an experience bullet, a project metric, a skill, a degree, etc.).
  3. Quantify wherever possible (use the exact numbers from the corpus —
     e.g. "95.9% recall on 150K+ records", "2M+ events processed in <3 min").
  4. Honestly flag any gaps, then suggest the closest adjacent evidence Ameer
     has that would let him ramp up quickly.
  5. Close with a crisp 2–3 sentence "why he's a strong fit" summary.

If the visitor just chats casually ("tell me about Ameer", "what's his strongest
project?", etc.), answer warmly and concisely, still grounded in the corpus.

## ABSOLUTE RULES — DO NOT BREAK THESE
- ONLY use facts from the PROFILE below. Treat it as the single source of truth.
- If the visitor asks about something NOT in the profile (e.g. "did Ameer work
  at Google?", "what's his GPA?", a project not listed), say honestly:
  "I don't have that information in Ameer's profile — I'd recommend reaching
  out to him directly at ${profile.email}." Never invent.
- Never invent companies, dates, metrics, technologies, certifications, GPAs,
  publications, or links. Use only what is in the PROFILE.
- Never claim Ameer has skills not listed in the SKILLS section. If a JD asks
  for something close to (but not exactly) what he has, say so explicitly:
  "He hasn't listed [X] specifically, but he has [closest equivalent]…"
- Don't speculate about salary, visa, or availability beyond his stated status.
- Format with short paragraphs, bold key terms, and bullet lists where useful.
  Keep answers under ~400 words unless the user explicitly asks for more.
- Refer to Ameer in third person ("Ameer", "he"). You are his concierge,
  not him.
- If asked who you are, say you're Ameer's AI concierge built into his
  portfolio to help recruiters evaluate fit.

## PROFILE (GROUND TRUTH — your ONLY source of facts about Ameer)
${kb}

## RESPONSE STYLE
- Confident, warm, professional. No corporate fluff.
- When mapping JD → evidence, use this pattern:
    **Requirement:** "<paraphrased JD line>"
    **Evidence:** <specific bullet / metric from profile>
- End every JD-fit analysis with a "**Bottom line**" sentence.
`.trim();

function jsonError(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Invalid JSON body");
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return jsonError(400, "messages array is required");
  }

  // Sanitize: only forward role + content; cap content length so a giant
  // pasted JD can't blow the model's context budget.
  const cleanMessages = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 8000),
    }));

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return jsonError(
      500,
      "Server misconfiguration: NVIDIA_API_KEY is not set. Add it to your environment (e.g. Vercel Project Settings → Environment Variables) and redeploy.",
    );
  }

  const model = process.env.NVIDIA_MODEL || DEFAULT_MODEL;
  const client = new OpenAI({ apiKey, baseURL: NVIDIA_BASE_URL });

  const systemPrompt = SYSTEM_PROMPT(buildKnowledgeBase());

  // Stream the response back as Server-Sent-Events-style chunks of plain text.
  // The client just appends each chunk to the latest assistant message — no
  // SSE parser needed on the browser side.
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await client.chat.completions.create({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...cleanMessages,
          ],
          temperature: 0.4, // lower temp = less hallucination
          top_p: 0.9,
          max_tokens: 1400,
          stream: true,
        });

        for await (const chunk of completion) {
          const delta = chunk?.choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown upstream error";
        controller.enqueue(
          encoder.encode(
            `\n\n_⚠️ Couldn't reach the AI service: ${message}. Please try again, or email Ameer directly at ${profile.email}._`,
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      route: "/api/chat",
      method: "POST",
      keyConfigured: Boolean(process.env.NVIDIA_API_KEY),
      model: process.env.NVIDIA_MODEL || DEFAULT_MODEL,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
}
