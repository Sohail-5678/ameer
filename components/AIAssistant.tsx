"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  Trash2,
  ClipboardPaste,
  ShieldCheck,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// AIAssistant — the hiring concierge.
// Opens as a glass-morphism panel anchored bottom-right on desktop, full-sheet
// on mobile. Streams tokens from /api/chat (which talks to Groq).
// =============================================================================

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  id: string;
};

type AIAssistantProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SUGGESTIONS = [
  {
    label: "Why is Ameer a fit?",
    prompt:
      "I'm hiring a Machine Learning Engineer focused on production GenAI/RAG systems. Based on Ameer's experience and projects, why is he a strong fit? Map specific evidence to the role and call out any gaps.",
  },
  {
    label: "Walk me through Ragnarok",
    prompt:
      "Walk me through the Ragnarok project — architecture, the retrieval ensemble, why each design choice was made, and the impact in numbers.",
  },
  {
    label: "Strongest project for a Data Scientist role",
    prompt:
      "If you had to pick the single strongest project that demonstrates Ameer's data-science chops (statistics, experimentation, business framing), which would it be and why?",
  },
  {
    label: "Compare him to a typical 1-yr ML candidate",
    prompt:
      "How does Ameer's profile compare to a typical 1-year-experience ML/DS candidate? Be honest about strengths and growth areas based only on what's in his profile.",
  },
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function AIAssistant({ open, onOpenChange }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showJumpToBottom, setShowJumpToBottom] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasMessages = messages.length > 0;

  // Reset error when input changes
  useEffect(() => {
    if (errorMsg) setErrorMsg(null);
  }, [input, errorMsg]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    if (window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Cmd/Ctrl + K to toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);

  // Track scroll to show/hide jump-to-bottom button
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const distFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowJumpToBottom(distFromBottom > 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [open]);

  // Auto-scroll while streaming
  useEffect(() => {
    if (isStreaming) scrollToBottom(false);
  }, [messages, isStreaming, scrollToBottom]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      const userMsg: ChatMessage = {
        role: "user",
        content: trimmed,
        id: uid(),
      };
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: "",
        id: uid(),
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsStreaming(true);
      setErrorMsg(null);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: trimmed },
            ],
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const errText = await res.text().catch(() => "");
          throw new Error(
            errText || `Request failed: ${res.status} ${res.statusText}`,
          );
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === "assistant") {
              next[next.length - 1] = { ...last, content: acc };
            }
            return next;
          });
        }
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === "AbortError") {
          // user cancelled — keep partial
        } else {
          const msg =
            err instanceof Error ? err.message : "Something went wrong.";
          setErrorMsg(msg);
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === "assistant" && last.content === "") {
              next.pop();
            }
            return next;
          });
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming, messages],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const clear = useCallback(() => {
    if (isStreaming) abortRef.current?.abort();
    setMessages([]);
    setErrorMsg(null);
  }, [isStreaming]);

  const onPaste = useCallback(async () => {
    try {
      const txt = await navigator.clipboard.readText();
      if (txt) setInput((s) => (s ? `${s}\n${txt}` : txt));
      inputRef.current?.focus();
    } catch {
      // clipboard blocked — ignore
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send(input);
      }
    },
    [input, send],
  );

  const headerSubtitle = useMemo(() => {
    if (isStreaming) return "Thinking…";
    if (hasMessages) return "Grounded in Ameer's profile · ask anything";
    return "Paste a JD or just ask a question";
  }, [isStreaming, hasMessages]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-[#1a1815]/45 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 top-3 z-50 flex flex-col overflow-hidden rounded-3xl border border-[#1a1815] bg-[#1a1815] text-[#f6f1e8] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:inset-auto sm:right-6 sm:bottom-6 sm:top-6 sm:w-[460px] md:w-[540px] lg:w-[620px]"
            role="dialog"
            aria-modal="true"
            aria-label="AI concierge chat"
          >
            {/* glow ring */}
            <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl" />

            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-[#f6f1e8]/15 px-5 py-4">
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-[#c9482b] bg-[#c9482b] text-[#f6f1e8]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1a1815] bg-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    className="font-display text-lg font-medium tracking-tight text-[#f6f1e8]"
                    style={{ fontVariationSettings: '"opsz" 96' }}
                  >
                    The Concierge
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#c9482b]/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#e85a37]">
                    <ShieldCheck className="h-3 w-3" />
                    Grounded
                  </span>
                </div>
                <p className="truncate font-mono text-[10px] uppercase tracking-[0.22em] text-[#f6f1e8]/45">
                  {headerSubtitle}
                </p>
              </div>
              {hasMessages && (
                <button
                  onClick={clear}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#f6f1e8]/15 text-[#f6f1e8]/60 transition hover:border-[#c9482b] hover:text-[#e85a37]"
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => onOpenChange(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#f6f1e8]/15 text-[#f6f1e8]/60 transition hover:border-[#f6f1e8] hover:text-[#f6f1e8]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div
              ref={scrollRef}
              className="relative flex-1 overflow-y-auto px-5 py-5"
            >
              {!hasMessages ? (
                <Welcome onPick={(p) => send(p)} />
              ) : (
                <ul className="space-y-5">
                  {messages.map((m) => (
                    <Bubble
                      key={m.id}
                      role={m.role}
                      content={m.content}
                      streaming={
                        isStreaming &&
                        m === messages[messages.length - 1] &&
                        m.role === "assistant"
                      }
                    />
                  ))}
                </ul>
              )}

              {errorMsg && (
                <div className="mt-4 border-y border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                  <strong className="font-semibold">Couldn't reach the AI.</strong>{" "}
                  {errorMsg}
                </div>
              )}
            </div>

            <AnimatePresence>
              {showJumpToBottom && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  onClick={() => scrollToBottom()}
                  className="absolute bottom-32 right-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-[#c9482b] bg-[#c9482b] text-[#f6f1e8] shadow-lg transition hover:bg-[#e85a37]"
                  aria-label="Jump to latest"
                >
                  <ArrowDown className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Composer */}
            <div className="border-t border-[#f6f1e8]/15 bg-[#0f0d0a] px-3 py-3 sm:px-4 sm:py-4">
              {/* suggestions strip when empty */}
              {!hasMessages && (
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => send(s.prompt)}
                      className="shrink-0 rounded-full border border-[#f6f1e8]/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f6f1e8]/65 transition hover:border-[#c9482b] hover:text-[#e85a37]"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative flex items-end gap-2 rounded-2xl border border-[#f6f1e8]/15 bg-[#f6f1e8]/[0.03] p-2 focus-within:border-[#c9482b]/60 focus-within:bg-[#f6f1e8]/[0.05]">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(
                      e.target.scrollHeight,
                      180,
                    )}px`;
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste a job description, or ask anything about Ameer…"
                  className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-[#f6f1e8] placeholder:text-[#f6f1e8]/35 focus:outline-none"
                />
                <button
                  onClick={onPaste}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[#f6f1e8]/55 transition hover:bg-[#f6f1e8]/10 hover:text-[#f6f1e8]"
                  aria-label="Paste from clipboard"
                  title="Paste"
                >
                  <ClipboardPaste className="h-4 w-4" />
                </button>
                {isStreaming ? (
                  <button
                    onClick={stop}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f6f1e8]/10 text-[#f6f1e8] transition hover:bg-[#f6f1e8]/15"
                    aria-label="Stop"
                    title="Stop"
                  >
                    <span className="block h-3 w-3 rounded-sm bg-[#f6f1e8]" />
                  </button>
                ) : (
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim()}
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition",
                      input.trim()
                        ? "bg-[#c9482b] text-[#f6f1e8] hover:bg-[#e85a37]"
                        : "bg-[#f6f1e8]/10 text-[#f6f1e8]/40",
                    )}
                    aria-label="Send"
                    title="Send (↵)"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f6f1e8]/35">
                <span>Powered by Groq · Llama 3.3 70B</span>
                <span className="hidden sm:inline">
                  ⏎ send · shift ⏎ newline
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// -----------------------------------------------------------------------------
// Floating "Ask AI" launcher used everywhere on the page.
// -----------------------------------------------------------------------------
export function AILauncher({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="group fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full border border-[color:var(--fg)] bg-[color:var(--fg)] px-5 py-3 text-sm font-medium text-[color:var(--bg)] shadow-[0_18px_40px_-12px_rgba(26,24,21,0.45)] transition-colors hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)] sm:bottom-7 sm:right-7"
      aria-label="Open AI concierge"
    >
      <Sparkles className="h-4 w-4" />
      <span>Ask the concierge</span>
      <span className="ml-1 hidden rounded-md border border-current px-1.5 py-0.5 font-mono text-[10px] tracking-widest opacity-70 sm:inline-block">
        ⌘K
      </span>
    </motion.button>
  );
}

// -----------------------------------------------------------------------------
// Bubble — message renderer with light markdown support and streaming caret.
// -----------------------------------------------------------------------------
function Bubble({
  role,
  content,
  streaming,
}: {
  role: "user" | "assistant";
  content: string;
  streaming: boolean;
}) {
  const isUser = role === "user";
  return (
    <li
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-mono uppercase tracking-widest",
          isUser
            ? "border border-[#f6f1e8]/30 text-[#f6f1e8]/80"
            : "bg-[#c9482b] text-[#f6f1e8]",
        )}
        aria-hidden
      >
        {isUser ? "You" : <Sparkles className="h-3.5 w-3.5" />}
      </div>
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-2xl border border-[#c9482b]/40 bg-[#c9482b]/15 text-[#f6f1e8]"
            : "rounded-2xl border border-[#f6f1e8]/10 bg-[#f6f1e8]/[0.03] text-[#f6f1e8]/90",
        )}
      >
        {content === "" && streaming ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </span>
        ) : (
          <div className="chat-prose">
            <RichText text={content} />
            {streaming && (
              <span className="ml-0.5 inline-block h-4 w-1 animate-pulse bg-[#e85a37] align-middle" />
            )}
          </div>
        )}
      </div>
    </li>
  );
}

/**
 * Tiny markdown-ish renderer covering what our system prompt actually emits:
 *  - **bold**, *em*, `code`
 *  - leading "- " or "* " lines → unordered lists
 *  - leading "## " → h3
 *  - blank lines → paragraph break
 * No external lib so the bundle stays small.
 */
function RichText({ text }: { text: string }) {
  const blocks = useMemo(() => parseBlocks(text), [text]);
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h") {
          return (
            <h3 key={i} className="text-[15px]">
              {renderInline(b.content)}
            </h3>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i}>
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            {renderInline(b.content)}
          </p>
        );
      })}
    </>
  );
}

type Block =
  | { type: "p"; content: string }
  | { type: "h"; content: string }
  | { type: "ul"; items: string[] };

function parseBlocks(text: string): Block[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let buf: string[] = [];
  let listBuf: string[] = [];

  const flushP = () => {
    if (buf.length) {
      blocks.push({ type: "p", content: buf.join(" ").trim() });
      buf = [];
    }
  };
  const flushUl = () => {
    if (listBuf.length) {
      blocks.push({ type: "ul", items: listBuf });
      listBuf = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line === "") {
      flushP();
      flushUl();
      continue;
    }
    const heading = line.match(/^#{1,3}\s+(.*)$/);
    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (heading) {
      flushP();
      flushUl();
      blocks.push({ type: "h", content: heading[1] });
      continue;
    }
    if (bullet) {
      flushP();
      listBuf.push(bullet[1]);
      continue;
    }
    flushUl();
    buf.push(line);
  }
  flushP();
  flushUl();
  return blocks;
}

function renderInline(s: string) {
  // Order matters: code -> bold -> em
  const tokens: Array<string | { type: "code" | "b" | "i"; text: string }> = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] === "`") {
      const end = s.indexOf("`", i + 1);
      if (end > -1) {
        tokens.push({ type: "code", text: s.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    if (s.startsWith("**", i)) {
      const end = s.indexOf("**", i + 2);
      if (end > -1) {
        tokens.push({ type: "b", text: s.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }
    if (s[i] === "*") {
      const end = s.indexOf("*", i + 1);
      if (end > -1 && s[i + 1] !== " ") {
        tokens.push({ type: "i", text: s.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    // Fallback: consume the current char as plain text, then scan ahead for
    // the next special delimiter. Starting `j` at `i + 1` GUARANTEES forward
    // progress — without it, an unclosed `*` or backtick (very common during
    // streaming, e.g. mid-token of "**bold**") puts us in an infinite loop
    // that hangs the tab and surfaces as a generic "Application error".
    let j = i + 1;
    while (j < s.length && s[j] !== "`" && !s.startsWith("**", j) && s[j] !== "*") {
      j++;
    }
    tokens.push(s.slice(i, j));
    i = j;
  }
  return tokens.map((t, idx) =>
    typeof t === "string" ? (
      <span key={idx}>{t}</span>
    ) : t.type === "code" ? (
      <code key={idx}>{t.text}</code>
    ) : t.type === "b" ? (
      <strong key={idx}>{t.text}</strong>
    ) : (
      <em key={idx}>{t.text}</em>
    ),
  );
}

// -----------------------------------------------------------------------------
// Welcome panel (empty state)
// -----------------------------------------------------------------------------
function Welcome({ onPick }: { onPick: (p: string) => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Editorial header — like a magazine column intro */}
      <div className="border-b border-[#f6f1e8]/15 pb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e85a37]">
          § Concierge · grounded in profile
        </p>
        <h4
          className="mt-4 font-display text-3xl font-medium leading-[1.05] tracking-tight text-[#f6f1e8] sm:text-4xl"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          Ask anything about{" "}
          <em className="italic text-[#e85a37]">Ameer</em>.
        </h4>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#f6f1e8]/65">
          Paste a job description, ask about a project, or just say hi.
          Every answer is{" "}
          <span className="text-[#f6f1e8]">grounded in his actual profile</span>{" "}
          — no hallucinations, ever.
        </p>
      </div>

      {/* Numbered prompt index */}
      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#f6f1e8]/45">
          Suggested openings
        </p>
        <ul className="mt-4 divide-y divide-[#f6f1e8]/10 border-y border-[#f6f1e8]/10">
          {SUGGESTIONS.map((s, i) => (
            <li key={s.label}>
              <button
                onClick={() => onPick(s.prompt)}
                className="group flex w-full items-baseline justify-between gap-4 py-4 text-left transition-colors"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] tabular-nums tracking-[0.22em] text-[#f6f1e8]/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] text-[#f6f1e8]/85 transition-colors group-hover:text-[#e85a37]">
                    {s.label}
                  </span>
                </span>
                <ArrowDown className="h-3.5 w-3.5 -rotate-45 text-[#f6f1e8]/30 transition-all group-hover:rotate-0 group-hover:text-[#e85a37]" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
