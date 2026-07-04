/**
 * Camada de fundo fixa atrás de todo o conteúdo (z-index negativo,
 * pointer-events: none — nunca sobrepõe nem bloqueia cliques).
 * Server Component: a animação é 100% CSS (@theme/@keyframes em
 * globals.css), sem estado nem efeito de JS.
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <span
        className="absolute rounded-full motion-safe:animate-drift-a"
        style={{
          width: 620,
          height: 620,
          left: -160,
          top: "55%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.18), transparent 70%)",
        }}
      />
      <span
        className="absolute rounded-full motion-safe:animate-drift-b max-[640px]:hidden"
        style={{
          width: 520,
          height: 520,
          right: -140,
          top: "12%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.15), transparent 70%)",
        }}
      />
      <span
        className="absolute rounded-full motion-safe:animate-drift-c max-[640px]:w-[56vw] max-[640px]:h-[56vw]"
        style={{
          width: 420,
          height: 420,
          left: "38%",
          top: "82%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(26,86,255,0.14), transparent 70%)",
        }}
      />
    </div>
  );
}
