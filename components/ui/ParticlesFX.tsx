"use client";

import { usePathname } from "next/navigation";

interface Particle {
  size: number;
  pos: { top?: string; bottom?: string; left?: string; right?: string };
  delay: string;
  duration: string;
  opacity: number;
  drift: "a" | "b";
  /** Some do em telas pequenas (sm:block) -- evita aglomerar 3 pontos por
   * canto num viewport estreito, mantém só os 2 mais visíveis por canto. */
  desktopOnly?: boolean;
}

// Posições/tempos fixos (sem Math.random() no render) -- gerar isso
// dinamicamente causaria mismatch de hidratação SSR/client, mesmo motivo
// documentado em AnimatedBackground.
const PARTICLES: Particle[] = [
  // canto superior esquerdo
  { size: 3, pos: { top: "5%", left: "3%" }, delay: "0s", duration: "9s", opacity: 0.6, drift: "a" },
  { size: 5, pos: { top: "11%", left: "8%" }, delay: "1.6s", duration: "11s", opacity: 0.4, drift: "b" },
  { size: 2, pos: { top: "17%", left: "2%" }, delay: "3.2s", duration: "8s", opacity: 0.7, drift: "a", desktopOnly: true },
  // canto superior direito
  { size: 4, pos: { top: "6%", right: "4%" }, delay: "0.8s", duration: "10s", opacity: 0.45, drift: "b" },
  { size: 2, pos: { top: "13%", right: "9%" }, delay: "2.4s", duration: "9s", opacity: 0.65, drift: "a" },
  { size: 5, pos: { top: "19%", right: "2%" }, delay: "4.6s", duration: "12s", opacity: 0.35, drift: "b", desktopOnly: true },
  // canto inferior esquerdo
  { size: 4, pos: { bottom: "7%", left: "3%" }, delay: "1.2s", duration: "10s", opacity: 0.5, drift: "a" },
  { size: 2, pos: { bottom: "13%", left: "9%" }, delay: "3.6s", duration: "8.5s", opacity: 0.65, drift: "b" },
  { size: 5, pos: { bottom: "4%", left: "15%" }, delay: "5.2s", duration: "11s", opacity: 0.35, drift: "a", desktopOnly: true },
  // canto inferior direito
  { size: 3, pos: { bottom: "6%", right: "4%" }, delay: "0.4s", duration: "9.5s", opacity: 0.55, drift: "b" },
  { size: 2, pos: { bottom: "12%", right: "10%" }, delay: "2.8s", duration: "8s", opacity: 0.7, drift: "a" },
  { size: 4, pos: { bottom: "18%", right: "3%" }, delay: "4.4s", duration: "10.5s", opacity: 0.4, drift: "b", desktopOnly: true },
];

const DRIFT_CLASS: Record<"a" | "b", string> = {
  a: "motion-safe:animate-particle-a",
  b: "motion-safe:animate-particle-b",
};

/**
 * Partículas fixas nos 4 cantos da tela (glow pontual + drift/twinkle
 * suave), sobrepostas ao glow do AnimatedBackground pra dar mais textura
 * de profundidade sem virar um fundo cheio de ruído no centro.
 * Fixed + pointer-events:none, mesmo padrão do AnimatedBackground.
 * Fica desligado em /crm* pelo mesmo motivo (ferramenta interna).
 */
export function ParticlesFX() {
  const pathname = usePathname();
  if (pathname?.startsWith("/crm")) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-blue-light ${DRIFT_CLASS[p.drift]} ${p.desktopOnly ? "hidden sm:block" : ""}`}
          style={{
            width: p.size,
            height: p.size,
            ...p.pos,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: "0 0 6px 1px var(--blue-light)",
          }}
        />
      ))}
    </div>
  );
}
