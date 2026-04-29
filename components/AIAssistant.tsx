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
  Loader2,
  ShieldCheck,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// AIAssistant — the hiring concierge.
// Opens as a glass-morphism panel anchored bottom-right on desktop, full-sheet
// on mobile. Streams tokens from /api/chat (which talks to NVIDIA Build).
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 top-3 z-50 flex flex-col overflow-hidden rounded-3xl glass-strong sm:inset-auto sm:right-6 sm:bottom-6 sm:top-6 sm:w-[460px] md:w-[540px] lg:w-[620px]"
            role="dialog"
            aria-modal="true"
            aria-label="AI concierge chat"
          >
            {/* glow ring */}
            <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-accent/40 via-accent-cool/20 to-accent-warm/30 opacity-50 blur-2xl" />

            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent via-accent-glow to-accent-cool shadow-[0_0_30px_-5px_rgba(124,92,255,0.7)]">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    Ameer's AI Concierge
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-300">
                    <ShieldCheck className="h-3 w-3" />
                    Grounded
                  </span>
                </div>
                <p className="truncate text-xs text-white/55">
                  {headerSubtitle}
                </p>
              </div>
              {hasMessages && (
                <button
                  onClick={clear}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => onOpenChange(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
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
                <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
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
                  className="absolute bottom-32 right-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20"
                  aria-label="Jump to latest"
                >
                  <ArrowDown className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Composer */}
            <div className="border-t border-white/10 bg-black/30 px-3 py-3 sm:px-4 sm:py-4">
              {/* suggestions strip when empty */}
              {!hasMessages && (
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => send(s.prompt)}
                      className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/75 transition hover:border-accent/50 hover:bg-accent/10 hover:text-white"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 focus-within:border-accent/50 focus-within:bg-white/[0.06]">
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
                  className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
                <button
                  onClick={onPaste}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white/55 transition hover:bg-white/10 hover:text-white"
                  aria-label="Paste from clipboard"
                  title="Paste"
                >
                  <ClipboardPaste className="h-4 w-4" />
                </button>
                {isStreaming ? (
                  <button
                    onClick={stop}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/15"
                    aria-label="Stop"
                    title="Stop"
                  >
                    <span className="block h-3 w-3 rounded-sm bg-white" />
                  </button>
                ) : (
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim()}
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition",
                      input.trim()
                        ? "bg-gradient-to-br from-accent to-accent-cool text-white shadow-[0_8px_30px_-8px_rgba(124,92,255,0.7)] hover:scale-105"
                        : "bg-white/10 text-white/40",
                    )}
                    aria-label="Send"
                    title="Send (↵)"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-[10px] uppercase tracking-widest text-white/35">
                <span>Powered by NVIDIA Build · Kimi K2</span>
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-gradient-to-br from-accent via-accent-glow to-accent-cool px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(124,92,255,0.7)] sm:bottom-7 sm:right-7"
      aria-label="Open AI concierge"
    >
      <span className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-br from-accent to-accent-cool opacity-50 blur-xl transition-opacity group-hover:opacity-80" />
      <Sparkles className="h-4 w-4" />
      <span>Ask AI</span>
      <span className="ml-1 hidden rounded-md bg-white/15 px-1.5 py-0.5 font-mono text-[10px] tracking-widest sm:inline-block">
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
          "grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-semibold",
          isUser
            ? "bg-white/10 text-white"
            : "bg-gradient-to-br from-accent to-accent-cool text-white",
        )}
        aria-hidden
      >
        {isUser ? "You" : <Sparkles className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-accent/15 text-white"
            : "bg-white/[0.04] text-white/85",
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
              <span className="ml-0.5 inline-block h-4 w-1 animate-pulse bg-accent-glow align-middle" />
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
    let j = i;
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
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent via-accent-glow to-accent-cool shadow-[0_0_60px_-10px_rgba(124,92,255,0.7)]"
      >
        <Sparkles className="h-8 w-8 text-white" />
      </motion.div>
      <h4 className="mt-5 font-display text-2xl font-semibold text-white">
        Ask anything about Ameer.
      </h4>
      <p className="mt-2 max-w-sm text-sm text-white/60">
        Paste a job description, ask about a project, or just say hi. Answers
        are <strong className="text-white">grounded in his actual profile</strong>{" "}
        — no hallucinations, ever.
      </p>
      <div className="mt-6 grid w-full max-w-md grid-cols-1 gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.prompt)}
            className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-white/80 transition hover:border-accent/40 hover:bg-accent/[0.08] hover:text-white"
          >
            <span>{s.label}</span>
            <Loader2 className="h-4 w-4 -rotate-45 text-white/40 transition group-hover:rotate-0 group-hover:text-accent-glow" />
          </button>
        ))}
      </div>
    </div>
  );
}
