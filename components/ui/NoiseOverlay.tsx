const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

/**
 * Textura de grain sutil sobre o fundo. Puro CSS (nenhum estado/JS): a
 * "animação" é um cycle de background-position em steps(), então não corre
 * risco de layout thrash e desliga sozinha via prefers-reduced-motion
 * (regra global em globals.css zera animation-duration).
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none motion-safe:animate-grain"
      style={{
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundSize: "180px 180px",
        opacity: "var(--bg-noise-opacity)",
      }}
    />
  );
}
