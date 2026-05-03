"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { profile, type Project } from "@/lib/profile";
import { SectionHeader } from "./SectionHeader";

const accentMap: Record<Project["accent"], string> = {
  violet: "from-[#7c5cff] to-[#a78bff]",
  cyan: "from-[#22d3ee] to-[#7dd3fc]",
  pink: "from-[#f472b6] to-[#fb7185]",
  lime: "from-[#84e1bc] to-[#a7f3d0]",
  amber: "from-[#fbbf24] to-[#fb923c]",
  blue: "from-[#5b8cff] to-[#22d3ee]",
};

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Selected Work"
          title={
            <>
              Six projects I'm{" "}
              <span className="text-gradient">proud to ship</span>.
            </>
          }
          description="From multimodal RAG to causal inference at MovieLens scale. Live-demo links per project — paste yours into the data file and they update instantly."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {profile.projects.map((p, idx) => (
            <ProjectCard key={p.slug} project={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const gradient = accentMap[project.accent];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
      whileHover={{ y: -6 }}
      className="card group relative flex h-full flex-col overflow-hidden rounded-2xl"
    >
      {/* gradient glow */}
      <div
        className={`pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25`}
      />
      {/* top accent bar */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${gradient} opacity-50 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-lg shadow-lg`}
        >
          <span aria-hidden>{project.emoji}</span>
        </div>
        <div className="flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repo"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Live demo"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-tight text-white">
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-accent-glow">{project.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/65">
        {project.description}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3 border-y border-white/5 py-4">
        {project.stats.map((s) => (
          <div key={s.label}>
            <div
              className={`bg-gradient-to-br ${gradient} bg-clip-text font-mono text-base font-semibold text-transparent`}
            >
              {s.value}
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-widest text-white/40">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <a
          href={project.liveUrl ?? "#"}
          target={project.liveUrl ? "_blank" : undefined}
          rel={project.liveUrl ? "noreferrer" : undefined}
          className={`inline-flex items-center gap-1.5 text-sm font-medium transition ${
            project.liveUrl
              ? "text-white hover:text-accent-glow"
              : "text-white/40"
          }`}
        >
          {project.liveUrl ? "Live demo" : "Demo coming soon"}
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
          0{index + 1}
        </span>
      </div>
    </motion.article>
  );
}
