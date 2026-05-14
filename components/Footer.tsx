"use client";

import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--rule)] py-10">
      <div className="container-x flex flex-col items-start justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-muted)] sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} · {profile.name}
        </p>
        <p>Set in Fraunces &amp; Instrument Sans</p>
        <p>
          Issue 01 ·{" "}
          <span className="text-[color:var(--accent)]">College Park, MD</span>
        </p>
      </div>
    </footer>
  );
}
