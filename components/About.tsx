"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="About"
          title={
            <>
              Engineer-minded data scientist who ships{" "}
              <span className="text-gradient">to production</span>.
            </>
          }
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {profile.highlights.map((h) => (
                <div
                  key={h.label}
                  className="card group"
                >
                  <div className="font-display text-3xl font-bold text-gradient">
                    {h.value}
                  </div>
                  <div className="mt-1 text-sm text-white/55">{h.label}</div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="text-xs uppercase tracking-widest text-white/40">
                Currently
              </div>
              <div className="mt-2 text-sm text-white/80">
                M.S. Data Science @ University of Maryland, College Park.
                Focus: <span className="text-white">ML · NLP · GenAI</span>.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 text-lg leading-relaxed text-white/70"
          >
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
