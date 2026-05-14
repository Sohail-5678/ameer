"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, FileText } from "lucide-react";
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

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero({ onAskAI }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28"
    >
      {/* Top metadata strip — like a magazine masthead */}
      <motion.div
        custom={0}
        variants={fade}
        initial="hidden"
        animate="show"
        className="container-x flex items-center justify-between border-b border-[color:var(--rule)] pb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]"
      >
        <span>Issue No. 01 · Portfolio</span>
        <span className="hidden sm:inline">College Park, Maryland</span>
        <span>{new Date().getFullYear()}</span>
      </motion.div>

      <div className="container-x flex-1 py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          {/* Left margin: small intro paragraph */}
          <motion.div
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="col-span-12 lg:col-span-3 lg:pt-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
              ⌖ Currently
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg-dim)]">
              {profile.status}.
              <br />
              <br />
              <span className="text-[color:var(--fg)]">
                Available for conversations.
              </span>
            </p>
          </motion.div>

          {/* Center: enormous serif headline */}
          <div className="col-span-12 lg:col-span-9">
            <motion.div
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]"
            >
              An essay in six chapters by Ameer Sohail Shaik
            </motion.div>

            <motion.h1
              custom={3}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-6 font-display font-medium leading-[0.92] tracking-[-0.025em] text-[color:var(--fg)]"
              style={{
                fontSize: "clamp(3.2rem, 9vw, 8rem)",
                fontVariationSettings: '"opsz" 144, "SOFT" 30',
              }}
            >
              <span className="block">Notes on</span>
              <span className="block italic text-[color:var(--accent)]">
                shipping models
              </span>
              <span className="block">into the world.</span>
            </motion.h1>

            <motion.div
              custom={4}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-16"
            >
              <p className="text-lg leading-relaxed text-[color:var(--fg-dim)]">
                I'm a data scientist and ML engineer who lives in the seam
                between rigorous experimentation and production engineering.
                Forecasting, multimodal RAG, causal inference at MovieLens
                scale, large-scale Spark feature stores — I take ideas from
                a Jupyter cell to a deployed API and I keep them honest
                with metrics.
              </p>

              <div className="space-y-3 text-sm">
                <a
                  href="#projects"
                  className="group flex items-center justify-between border-b border-[color:var(--rule)] pb-3 text-[color:var(--fg)] transition-colors hover:border-[color:var(--fg)]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                    Ch. 01 — The work
                  </span>
                  <ArrowUpRight className="h-4 w-4 -translate-y-px transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1" />
                </a>
                <a
                  href="#experience"
                  className="group flex items-center justify-between border-b border-[color:var(--rule)] pb-3 text-[color:var(--fg)] transition-colors hover:border-[color:var(--fg)]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                    Ch. 02 — The companies
                  </span>
                  <ArrowUpRight className="h-4 w-4 -translate-y-px transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1" />
                </a>
                <button
                  onClick={onAskAI}
                  className="group flex w-full items-center justify-between border-b border-[color:var(--rule)] pb-3 text-left text-[color:var(--fg)] transition-colors hover:border-[color:var(--accent)]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
                    Ch. 03 — Ask the concierge
                  </span>
                  <Sparkles className="h-4 w-4 text-[color:var(--accent)] transition-transform group-hover:rotate-12" />
                </button>
              </div>
            </motion.div>

            <motion.div
              custom={5}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              <button onClick={onAskAI} className="btn btn-primary">
                <Sparkles className="h-4 w-4" />
                Start a conversation
              </button>
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <FileText className="h-4 w-4" />
                Read the resume
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom: ticker as "in this issue" */}
      <motion.div
        custom={6}
        variants={fade}
        initial="hidden"
        animate="show"
        className="border-t border-[color:var(--rule)]"
      >
        <div className="container-x flex items-center gap-6 py-3">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
            In this issue
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee gap-10 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className="flex items-center gap-10">
                  <span>{t}</span>
                  <span className="text-[color:var(--accent)]">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
