"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { profile, type Project } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          index="03"
          eyebrow="Featured work"
          title={
            <>
              Six things I'm{" "}
              <em className="italic text-[color:var(--accent)]">proud of</em>.
            </>
          }
          description="A field guide to the projects that taught me the most. Each entry has a live demo where the link applies."
        />

        <div className="mt-20 space-y-24">
          {profile.projects.map((p, idx) => (
            <ProjectEntry key={p.slug} project={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-[color:var(--fg)] pt-8"
    >
      {/* Left side: number + name + description */}
      <div className={`col-span-12 lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
        <div className="flex items-baseline justify-between gap-6">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs tabular-nums tracking-[0.28em] text-[color:var(--accent)]">
              № {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
              {project.tagline}
            </span>
          </div>
          <span className="text-2xl" aria-hidden>
            {project.emoji}
          </span>
        </div>

        <h3
          className="mt-4 font-display font-medium leading-[0.95] tracking-tight text-[color:var(--fg)]"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {project.name}
        </h3>

        <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-[color:var(--fg-dim)]">
          {project.description}
        </p>

        <ul className="mt-6 space-y-2">
          {project.bullets.slice(0, 2).map((b, i) => (
            <li
              key={i}
              className="flex gap-3 text-[15px] leading-relaxed text-[color:var(--fg-dim)]"
            >
              <span className="mt-2 h-px w-3 shrink-0 bg-[color:var(--accent)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 border-b border-[color:var(--fg)] pb-0.5 text-sm font-medium text-[color:var(--fg)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              View live demo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-muted)]">
              Demo · coming soon
            </span>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="inline-flex items-center gap-1.5 text-sm text-[color:var(--fg-dim)] transition-colors hover:text-[color:var(--fg)]"
            >
              <Github className="h-4 w-4" />
              Source
            </a>
          )}
        </div>
      </div>

      {/* Right side: stats column with editorial type */}
      <div className={`col-span-12 lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>
        <div className="grid grid-cols-1 divide-y divide-[color:var(--rule)] border-y border-[color:var(--rule-strong)]">
          {project.stats.map((s, i) => (
            <div key={s.label} className="flex items-baseline justify-between py-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] tabular-nums text-[color:var(--fg-muted)]">
                  0{i + 1}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-dim)]">
                  {s.label}
                </span>
              </div>
              <div
                className="font-display text-4xl font-medium leading-none tabular-nums text-[color:var(--fg)] sm:text-5xl"
                style={{ fontVariationSettings: '"opsz" 144' }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
          Filed under: {project.stack.slice(0, 3).join(" · ")}
        </p>
      </div>
    </motion.article>
  );
}
