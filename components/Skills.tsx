"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="The toolbelt"
          title={
            <>
              The stack I{" "}
              <em className="italic text-[color:var(--accent)]">reach for</em>{" "}
              daily.
            </>
          }
          description="Battle-tested in the work above. Not a list of things I once read about."
        />

        <div className="mt-16 border-t border-[color:var(--fg)]">
          {profile.skills.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-b border-[color:var(--rule)] py-7"
            >
              <div className="col-span-12 lg:col-span-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tabular-nums text-[color:var(--accent)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-display text-2xl font-medium tracking-tight text-[color:var(--fg)]"
                    style={{ fontVariationSettings: '"opsz" 96' }}
                  >
                    {group.title}
                  </h3>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <p className="text-[15px] leading-relaxed text-[color:var(--fg-dim)]">
                  {group.items.map((item, i) => (
                    <span key={item}>
                      <span className="text-[color:var(--fg)]">{item}</span>
                      {i < group.items.length - 1 && (
                        <span className="mx-2 text-[color:var(--accent)]">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
