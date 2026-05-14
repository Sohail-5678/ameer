"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Magazine-style section number, e.g. "02". */
  index?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  index,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <div
        className={`flex items-center gap-4 text-[color:var(--accent)] ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index && (
          <span className="font-mono text-xs tabular-nums tracking-[0.28em]">
            §&nbsp;{index}
          </span>
        )}
        <span className="font-mono text-xs uppercase tracking-[0.28em]">
          {eyebrow}
        </span>
        <span className="h-px flex-1 bg-[color:var(--rule-strong)]" />
      </div>
      <h2 className="section-title mt-6">{title}</h2>
      {description && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--fg-dim)]">
          {description}
        </p>
      )}
    </motion.div>
  );
}
