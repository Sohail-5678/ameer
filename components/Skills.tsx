"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Sparkles,
  Rocket,
  BarChart3,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code2,
  brain: Brain,
  sparkles: Sparkles,
  rocket: Rocket,
  chart: BarChart3,
  cloud: Cloud,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Toolbelt"
          title={
            <>
              The stack that{" "}
              <span className="text-gradient">earns its keep</span>.
            </>
          }
          description="Tools I reach for daily — battle-tested in the experience and projects above."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((group, idx) => {
            const Icon = ICON_MAP[group.icon] ?? Sparkles;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.06 }}
                className="card gradient-border"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent/30 to-accent-cool/30 text-accent-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {group.title}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
