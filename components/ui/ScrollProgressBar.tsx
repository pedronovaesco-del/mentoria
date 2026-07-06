"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Barra fina fixa no topo, preenchendo conforme o scroll. useScroll+useSpring
 * atualiza fora do ciclo de render do React -- mais barato que o rAF manual
 * usado na v1 estática, mesmo resultado visual.
 *
 * Montada globalmente no layout raiz (todas as páginas) -- exceto /quiz,
 * que é uma experiência de tela cheia e minimalista, sem cabeçalho/rodapé
 * nem indicador de posição/progresso.
 */
export function ScrollProgressBar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  if (pathname?.startsWith("/quiz")) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-blue-mid to-blue-light"
        style={{ scaleX }}
      />
    </div>
  );
}
