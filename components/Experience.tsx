"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="The companies"
          title={
            <>
              Roles where I moved{" "}
              <em className="italic text-[color:var(--accent)]">real numbers</em>.
            </>
          }
          description="Production ML, dashboards that executives actually used, and pipelines that ran every morning."
        />

        <div className="mt-20 space-y-20">
          {profile.experience.map((exp, idx) => (
            <motion.article
              key={`${exp.company}-${idx}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-[color:var(--fg)] pt-8"
            >
              {/* Big serif year */}
              <div className="col-span-12 lg:col-span-3">
                <div
                  className="font-display text-5xl font-medium leading-none tracking-tight text-[color:var(--fg)] sm:text-6xl"
                  style={{ fontVariationSettings: '"opsz" 144' }}
                >
                  {exp.start.split(" ").pop()}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                  {exp.start} — {exp.end}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                  {exp.location}
                </div>
              </div>

              {/* Role + company + bullets */}
              <div className="col-span-12 lg:col-span-9">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
                  {exp.type}
                </div>
                <h3
                  className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight text-[color:var(--fg)] sm:text-4xl"
                  style={{ fontVariationSettings: '"opsz" 96' }}
                >
                  {exp.role}{" "}
                  <span className="italic text-[color:var(--fg-muted)]">
                    at {exp.company}
                  </span>
                </h3>

                <ul className="mt-6 divide-y divide-[color:var(--rule)] border-y border-[color:var(--rule)]">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-4 py-3">
                      <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-[color:var(--fg-muted)]">
                        0{i + 1}
                      </span>
                      <span className="flex-1 text-[15px] leading-relaxed text-[color:var(--fg-dim)]">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
