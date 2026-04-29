"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Globe, Phone, Sparkles } from "lucide-react";
import { profile } from "@/lib/profile";

type ContactProps = {
  onAskAI: () => void;
};

const links = [
  { Icon: Mail, label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { Icon: Linkedin, label: "LinkedIn", href: profile.links.linkedin, value: "in/ameer-sohail-shaik" },
  { Icon: Github, label: "GitHub", href: profile.links.github, value: "@Sohail-5678" },
  { Icon: Globe, label: "Portfolio", href: profile.links.portfolio, value: "sohail-5678.github.io" },
  { Icon: Phone, label: "Phone", href: `tel:+18138171935`, value: profile.phone },
];

export function Contact({ onAskAI }: ContactProps) {
  return (
    <section id="contact" className="relative py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 p-10 sm:p-14"
        >
          {/* glow */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/30 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-[300px] w-[400px] rounded-full bg-accent-cool/20 blur-[120px]" />

          <div className="relative text-center">
            <div className="section-eyebrow inline-flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              Let's connect
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="section-title mt-4">
              Building something{" "}
              <span className="text-gradient">meaningful</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
              {profile.status}. The fastest way to gauge fit is the AI
              concierge below — drop in your JD and watch it map evidence
              from my work.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onAskAI}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent via-accent-glow to-accent-cool px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(124,92,255,0.7)] transition hover:scale-[1.02]"
              >
                <span className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] bg-[length:200%_100%] animate-shimmer" />
                <Sparkles className="h-4 w-4" />
                Ask AI: paste your JD
              </button>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                <Mail className="h-4 w-4" />
                Email me
              </a>
            </div>

            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
              {links.map(({ Icon, label, href, value }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/75 transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
                >
                  <Icon className="h-4 w-4 text-accent-glow" />
                  <span className="font-mono text-xs uppercase tracking-widest text-white/45">
                    {label}
                  </span>
                  <span className="text-white/85">{value}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
