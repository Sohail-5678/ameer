"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
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
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between rounded-2xl transition-all duration-500",
            scrolled
              ? "glass-strong px-4 py-2 sm:px-6"
              : "px-4 py-2 sm:px-6",
          )}
        >
          <a
            href="#"
            className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-cool text-white shadow-[0_8px_24px_-8px_rgba(124,92,255,0.7)] transition-transform group-hover:scale-105">
              AS
            </span>
            <span className="hidden text-white sm:inline">
              ameer<span className="text-accent">.</span>shaik
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  active === l.href
                    ? "text-white"
                    : "text-white/60 hover:text-white",
                )}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onAskAI}
              className="group relative hidden items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white shadow-[0_0_24px_-8px_rgba(124,92,255,0.5)] transition-all hover:border-white/30 hover:bg-white/[0.08] sm:inline-flex"
              aria-label="Ask AI about Ameer"
            >
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/20 via-accent-cool/20 to-accent-warm/20 opacity-0 transition-opacity group-hover:opacity-100" />
              <Sparkles className="h-4 w-4 text-accent-glow transition-transform group-hover:rotate-12" />
              <span>Ask AI</span>
              <span className="hidden h-4 w-px bg-white/15 md:inline-block" />
              <span className="hidden font-mono text-[10px] uppercase tracking-wider text-white/50 md:inline">
                ⌘ K
              </span>
            </button>
            <button
              onClick={() => setOpen((s) => !s)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 lg:hidden"
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
            <div className="glass-strong rounded-2xl p-4">
              <ul className="grid gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm text-white/80 hover:bg-white/[0.06] hover:text-white"
                    >
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
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-cool px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                    Ask AI About Ameer
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
