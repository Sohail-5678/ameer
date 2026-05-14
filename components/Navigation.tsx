"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Studies" },
  { href: "#contact", label: "Contact" },
];

type NavigationProps = {
  onAskAI: () => void;
};

export function Navigation({ onAskAI }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-[color:var(--rule)] bg-[color:var(--bg)]/85 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="container-x flex items-center justify-between py-4">
          <a
            href="#"
            className="group flex items-baseline gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--fg-muted)]">
              ASS · 01
            </span>
            <span
              className="font-display text-xl font-medium italic text-[color:var(--fg)] transition-colors group-hover:text-[color:var(--accent)]"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              Ameer&nbsp;Shaik
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "group relative flex items-baseline gap-1.5 text-sm transition-colors",
                  active === l.href
                    ? "text-[color:var(--fg)]"
                    : "text-[color:var(--fg-dim)] hover:text-[color:var(--fg)]",
                )}
              >
                <span className="font-mono text-[10px] tabular-nums text-[color:var(--fg-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{l.label}</span>
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 h-px w-full bg-[color:var(--accent)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onAskAI}
              className="hidden items-center gap-2 rounded-full border border-[color:var(--fg)] bg-[color:var(--fg)] px-4 py-2 text-sm font-medium text-[color:var(--bg)] transition-colors hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)] sm:inline-flex"
              aria-label="Ask AI about Ameer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask the concierge</span>
              <span className="hidden h-3 w-px bg-[color:var(--bg)]/30 md:inline-block" />
              <span className="hidden font-mono text-[10px] uppercase tracking-wider opacity-60 md:inline">
                ⌘K
              </span>
            </button>
            <button
              onClick={() => setOpen((s) => !s)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--rule-strong)] text-[color:var(--fg)] lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[72px] z-40 lg:hidden"
          >
            <div className="rounded-2xl border border-[color:var(--rule-strong)] bg-[color:var(--bg)] p-4 shadow-[0_20px_50px_-20px_rgba(26,24,21,0.25)]">
              <ul className="grid gap-1">
                {links.map((l, i) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-sm text-[color:var(--fg-dim)] hover:bg-[color:var(--bg-elev)] hover:text-[color:var(--fg)]"
                    >
                      <span className="font-mono text-[10px] text-[color:var(--fg-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      setOpen(false);
                      onAskAI();
                    }}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--fg)] px-4 py-2.5 text-sm font-medium text-[color:var(--bg)]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Ask the concierge
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
