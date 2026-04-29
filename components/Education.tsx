"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { profile } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

export function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Education"
          title={
            <>
              Where I learned to{" "}
              <span className="text-gradient">think in models</span>.
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {profile.education.map((edu, i) => (
            <motion.article
              key={`${edu.school}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="card gradient-border"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/30 to-accent-cool/30 text-accent-glow">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-xs uppercase tracking-widest text-accent">
                    {edu.start} — {edu.end}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {edu.degree}
                  </h3>
                  <div className="mt-1 text-sm text-white/70">
                    {edu.school}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-white/50">
                    <MapPin className="h-3.5 w-3.5" />
                    {edu.location}
                  </div>
                  {edu.notes && (
                    <p className="mt-3 text-sm text-white/60">{edu.notes}</p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
