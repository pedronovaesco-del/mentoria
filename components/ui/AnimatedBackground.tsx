"use client";

import { usePathname } from "next/navigation";

/**
 * Fixed ambient background behind all content (negative z-index,
 * pointer-events: none — never overlaps or blocks clicks).
 * Três glows com tons diferentes da escala azul (claro/médio/profundo,
 * não só uma cor lisa) pra dar sensação de profundidade, mais uma textura
 * fina de grão (SVG turbulence via data URI, blend overlay) que evita o
 * fundo ficar "chapado". Todos drift em trajetória de onda com múltiplos
 * waypoints (não ida-e-volta reta) via CSS transforms only — no JS, no
 * canvas. `prefers-reduced-motion` é tratado globalmente em globals.css
 * (animation-duration zerado pra todo elemento).
 *
 * Fica desligado em /crm* -- ferramenta interna de pipeline, fundo liso
 * (var(--ink), já definido em globals.css) em vez do glow de marketing.
 */
export function AnimatedBackground() {
  const pathname = usePathname();
  if (pathname?.startsWith("/crm")) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Glow principal: varre claro -> médio -> profundo em vez de uma cor só */}
      <span
        className="absolute rounded-full blur-[130px] motion-safe:animate-wave-a"
        style={{
          width: "min(90vw, 900px)",
          height: "min(90vw, 900px)",
          left: "-15%",
          top: "62%",
          background:
            "radial-gradient(circle, var(--blue-light) 0%, var(--blue) 32%, var(--blue-mid) 60%, transparent 78%)",
          opacity: 0.8,
        }}
      />
      {/* Glow secundário: tom profundo/índigo pra contraste tonal com o principal */}
      <span
        className="absolute rounded-full blur-[150px] motion-safe:animate-wave-b"
        style={{
          width: "min(60vw, 640px)",
          height: "min(60vw, 640px)",
          right: "-10%",
          top: "-8%",
          background:
            "radial-gradient(circle, var(--blue-deep) 0%, var(--blue-dark) 55%, transparent 75%)",
          opacity: 0.4,
        }}
      />
      {/* Glow de destaque: menor e mais claro, dá um brilho de profundidade extra */}
      <span
        className="absolute rounded-full blur-[110px] motion-safe:animate-wave-c"
        style={{
          width: "min(40vw, 420px)",
          height: "min(40vw, 420px)",
          left: "58%",
          top: "38%",
          background: "radial-gradient(circle, var(--blue-light) 0%, transparent 70%)",
          opacity: 0.22,
        }}
      />
      {/* Grão fino (SVG turbulence) pra tirar o efeito "chapado" dos glows */}
      <span
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
