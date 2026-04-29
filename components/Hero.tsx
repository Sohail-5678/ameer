"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText, MapPin, Mail } from "lucide-react";
import { profile } from "@/lib/profile";

type HeroProps = {
  onAskAI: () => void;
};

const TICKER = [
  "Python",
  "PyTorch",
  "LangChain",
  "ChromaDB",
  "PySpark",
  "XGBoost",
  "RAG",
  "Airflow",
  "AWS",
  "Streamlit",
  "PostgreSQL",
  "Docker",
];

export function Hero({ onAskAI }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <div className="container-x relative z-10 grid items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
              {profile.status}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
          >
            Hi, I'm <span className="text-gradient-rose">Ameer</span>.
            <br />
            <span className="text-white/95">I build </span>
            <span className="relative inline-block">
              <span className="text-gradient-violet">intelligent</span>
              <svg
                aria-hidden
                viewBox="0 0 200 14"
                className="absolute -bottom-2 left-0 h-3 w-full text-accent/70"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q 60 2, 110 6 T 198 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            <span className="text-white/95">systems.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={onAskAI}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent via-accent-glow to-accent-cool px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(124,92,255,0.7)] transition-all hover:scale-[1.02]"
            >
              <span className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] bg-[length:200%_100%] animate-shimmer" />
              <Sparkles className="h-4 w-4" />
              Ask my AI: "Why is Ameer a fit?"
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#projects"
              className="btn btn-ghost"
            >
              View projects
            </a>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </motion.div>
        </div>

        {/* Hero "card stack" — visual showpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto hidden h-[440px] w-full max-w-[460px] lg:block"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Tech ticker */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-y border-white/5 bg-black/30 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-12 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{t}</span>
              <span className="text-accent/60">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-full w-full">
      {/* Glow */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-accent/30 via-accent-cool/20 to-accent-warm/20 blur-3xl" />

      {/* Big stat card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-4 w-[78%] rounded-2xl border border-white/10 bg-ink-900/80 p-5 backdrop-blur-xl"
      >
        <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-mono uppercase tracking-widest">production impact</span>
        </div>
        <div className="font-display text-4xl font-bold text-white">
          95%
        </div>
        <div className="mt-1 text-sm text-white/55">
          ETL runtime cut: 60 → 3 min/sync, freeing 8+ analyst-hours/week
          @ Proceedit
        </div>
        <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-accent to-accent-cool" />
        </div>
      </motion.div>

      {/* Code-ish card */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-32 w-[65%] rounded-2xl border border-white/10 bg-ink-900/80 p-4 font-mono text-[11px] leading-relaxed text-white/70 backdrop-blur-xl"
      >
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-[10px] text-white/40">rag.py</span>
        </div>
        <div>
          <span className="text-pink-300">def</span>{" "}
          <span className="text-accent-glow">retrieve</span>(q):
        </div>
        <div className="pl-4">
          dense = <span className="text-emerald-300">cosine</span>(q)
        </div>
        <div className="pl-4">
          sparse = <span className="text-emerald-300">bm25</span>(q)
        </div>
        <div className="pl-4">
          <span className="text-pink-300">return</span> rrf(dense, sparse)
        </div>
      </motion.div>

      {/* AI chip */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-8 w-[70%] rounded-2xl border border-white/10 bg-ink-900/80 p-4 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-cool">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-xs text-white/50">Concierge AI</div>
            <div className="text-sm font-medium text-white">
              "Strong fit for Data Science & AI roles."
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
