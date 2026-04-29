"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { profile } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Experience"
          title={
            <>
              From <span className="text-gradient">notebooks</span> to{" "}
              <span className="text-gradient-warm">production</span>.
            </>
          }
          description="Roles where I've shipped models, pipelines, and dashboards that moved real numbers."
        />

        <div className="relative mt-16 pl-6 sm:pl-10">
          {/* spine */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-accent via-accent-cool to-transparent sm:left-[11px]" />

          <div className="space-y-8">
            {profile.experience.map((exp, idx) => (
              <motion.article
                key={`${exp.company}-${idx}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="relative"
              >
                {/* dot */}
                <span className="absolute -left-[26px] top-6 grid h-4 w-4 place-items-center rounded-full bg-ink-950 ring-2 ring-accent sm:-left-[34px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>

                <div className="card gradient-border rounded-2xl p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-accent-glow">
                        <Briefcase className="h-4 w-4" />
                        <span className="font-mono uppercase tracking-widest">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="mt-1 text-xl font-semibold text-white">
                        {exp.role}
                      </h3>
                      <div className="mt-0.5 text-base text-white/70">
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-right text-sm text-white/55">
                      <div className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.start} — {exp.end}
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="relative pl-5 text-sm leading-relaxed text-white/70"
                      >
                        <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                        {b}
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
      </div>
    </section>
  );
}
