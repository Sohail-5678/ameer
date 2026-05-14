"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Globe,
  Phone,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { profile } from "@/lib/profile";

type ContactProps = {
  onAskAI: () => void;
};

const links = [
  { Icon: Mail, label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { Icon: Linkedin, label: "LinkedIn", href: profile.links.linkedin, value: "Ameer Sohail Shaik" },
  { Icon: Github, label: "GitHub", href: profile.links.github, value: "@Sohail-5678" },
  { Icon: Globe, label: "Portfolio", href: profile.links.portfolio, value: "ameer-shaik.vercel.app" },
  { Icon: Phone, label: "Phone", href: `tel:+18138171935`, value: profile.phone },
];

export function Contact({ onAskAI }: ContactProps) {
  return (
    <section id="contact" className="relative py-28">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="border-t border-[color:var(--fg)] pt-10"
        >
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            {/* Headline */}
            <div className="col-span-12 lg:col-span-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
                § 06 · Get in touch
              </p>
              <h2
                className="mt-6 font-display font-medium leading-[0.95] tracking-tight text-[color:var(--fg)]"
                style={{
                  fontSize: "clamp(2.6rem, 7vw, 6rem)",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                Let's build{" "}
                <em className="italic text-[color:var(--accent)]">
                  something
                </em>
                .
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[color:var(--fg-dim)]">
                {profile.status}. The fastest way to gauge fit is the AI
                concierge — drop in your JD and watch it map evidence from
                my work.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <button onClick={onAskAI} className="btn btn-primary">
                  <Sparkles className="h-4 w-4" />
                  Ask the concierge
                </button>
                <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                  <Mail className="h-4 w-4" />
                  Write me a note
                </a>
              </div>
            </div>

            {/* Colophon */}
            <aside className="col-span-12 lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
                Directory
              </p>
              <ul className="mt-6 divide-y divide-[color:var(--rule)] border-y border-[color:var(--rule)]">
                {links.map(({ Icon, label, href, value }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center justify-between gap-3 py-3 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-[color:var(--accent)]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                          {label}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-[color:var(--fg)] transition-colors group-hover:text-[color:var(--accent)]">
                        <span>{value}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 -translate-y-px transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
