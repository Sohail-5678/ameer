"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          index="01"
          eyebrow="A bit about me"
          title={
            <>
              Engineer-minded data scientist who{" "}
              <em className="italic text-[color:var(--accent)]">ships</em>.
            </>
          }
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Body copy with drop cap */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-8"
          >
            {profile.about.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[5.5rem] first-letter:font-medium first-letter:leading-[0.85] first-letter:text-[color:var(--accent)] text-lg leading-[1.7] text-[color:var(--fg-dim)]"
                    : "mt-6 text-lg leading-[1.7] text-[color:var(--fg-dim)]"
                }
              >
                {p}
              </p>
            ))}
          </motion.div>

          {/* Right-side fact column — magazine "by the numbers" */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 lg:col-span-4"
          >
            <div className="border-t border-[color:var(--fg)] pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
                By the numbers
              </p>
              <dl className="mt-6 space-y-5">
                {profile.highlights.map((h, i) => (
                  <div
                    key={h.label}
                    className="flex items-baseline justify-between gap-4 border-b border-[color:var(--rule)] pb-4"
                  >
                    <dt className="text-sm text-[color:var(--fg-dim)]">
                      <span className="mr-2 font-mono text-[10px] tabular-nums text-[color:var(--fg-muted)]">
                        0{i + 1}
                      </span>
                      {h.label}
                    </dt>
                    <dd className="font-display text-3xl font-medium tabular-nums text-[color:var(--fg)]">
                      {h.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 border-t border-[color:var(--fg)] pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
                  Currently
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg-dim)]">
                  M.S. Data Science at the University of Maryland, College
                  Park. Focus areas:{" "}
                  <span className="text-[color:var(--fg)]">
                    machine learning, NLP, generative AI
                  </span>
                  .
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
