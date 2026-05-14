"use client";

/**
 * Editorial paper background. No orbs, no mesh, no parallax. Just:
 *  - faint warm gradient bloom in two corners
 *  - horizontal ruled-paper lines that fade to nothing at the edges
 *  - subtle SVG paper-grain noise (multiply blend on cream paper)
 *
 * Pointer-events-none and z-0 so it never interferes with UI.
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-fade-bg" />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
