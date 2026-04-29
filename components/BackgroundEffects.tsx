"use client";

import { useEffect, useRef } from "react";

/**
 * Layered, GPU-accelerated background:
 *  - animated gradient mesh (CSS, no JS cost)
 *  - subtle dotted grid that fades to the edges
 *  - 3 cursor-tracking blurred orbs (cheap, 60fps)
 *  - SVG noise overlay for film-grain texture
 *
 * Everything is pointer-events-none and z-0, so it never interferes with UI.
 */
export function BackgroundEffects() {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);
  const targetX = useRef(0.5);
  const targetY = useRef(0.5);
  const currentX = useRef(0.5);
  const currentY = useRef(0.5);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetX.current = e.clientX / window.innerWidth;
      targetY.current = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      currentX.current += (targetX.current - currentX.current) * 0.04;
      currentY.current += (targetY.current - currentY.current) * 0.04;
      const x = currentX.current;
      const y = currentY.current;

      if (orb1.current) {
        orb1.current.style.transform = `translate3d(${x * 60 - 30}vw, ${y * 60 - 30}vh, 0)`;
      }
      if (orb2.current) {
        orb2.current.style.transform = `translate3d(${(1 - x) * 50 - 25}vw, ${y * 50 - 25}vh, 0)`;
      }
      if (orb3.current) {
        orb3.current.style.transform = `translate3d(${x * 40 - 20}vw, ${(1 - y) * 40 - 20}vh, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-fade-bg" />
      <div
        ref={orb1}
        className="absolute left-1/2 top-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-[0.18] blur-[120px]"
      />
      <div
        ref={orb2}
        className="absolute left-1/2 top-1/2 h-[45vmin] w-[45vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cool opacity-[0.14] blur-[120px]"
        style={{ background: "#22d3ee" }}
      />
      <div
        ref={orb3}
        className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.10] blur-[120px]"
        style={{ background: "#f472b6" }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
