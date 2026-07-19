"use client";

import { usePathname } from "next/navigation";

/**
 * Fixed ambient background behind all content (negative z-index,
 * pointer-events: none — never overlaps or blocks clicks).
 * One dominant soft blue glow low in the frame, plus a dimmer secondary
 * glow for depth. Both drift in a slow, multi-waypoint wave path (not a
 * straight back-and-forth) via CSS transforms only — no JS, no canvas.
 * `prefers-reduced-motion` is handled globally in globals.css
 * (animation-duration is zeroed for every element).
 *
 * Fica desligado em /crm* -- ferramenta interna de pipeline, fundo liso
 * (var(--ink), já definido em globals.css) em vez do glow de marketing.
 */
export function AnimatedBackground() {
  const pathname = usePathname();
  if (pathname?.startsWith("/crm")) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <span
        className="absolute rounded-full blur-[130px] motion-safe:animate-wave-a"
        style={{
          width: "min(90vw, 900px)",
          height: "min(90vw, 900px)",
          left: "-15%",
          top: "62%",
          background:
            "radial-gradient(circle, var(--blue) 0%, var(--blue-mid) 40%, transparent 72%)",
          opacity: 0.85,
        }}
      />
      <span
        className="absolute rounded-full blur-[150px] motion-safe:animate-wave-b"
        style={{
          width: "min(60vw, 640px)",
          height: "min(60vw, 640px)",
          right: "-10%",
          top: "-8%",
          background: "radial-gradient(circle, var(--blue-mid) 0%, transparent 70%)",
          opacity: 0.28,
        }}
      />
    </div>
  );
}
