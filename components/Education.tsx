"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

export function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          index="05"
          eyebrow="Studies"
          title={
            <>
              Where I learned to{" "}
              <em className="italic text-[color:var(--accent)]">
                think in models
              </em>
              .
            </>
          }
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {profile.education.map((edu, i) => (
            <motion.article
              key={`${edu.school}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="border-t border-[color:var(--fg)] pt-6"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
                {edu.start} — {edu.end}
              </div>
              <h3
                className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-[color:var(--fg)]"
                style={{ fontVariationSettings: '"opsz" 96' }}
              >
                {edu.degree}
              </h3>
              <div className="mt-2 text-base text-[color:var(--fg-dim)]">
                {edu.school}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                {edu.location}
              </div>
              {edu.notes && (
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--fg-dim)]">
                  {edu.notes}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
