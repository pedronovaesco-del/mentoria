"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra fina fixa no topo, preenchendo conforme o scroll. useScroll+useSpring
 * atualiza fora do ciclo de render do React -- mais barato que o rAF manual
 * usado na v1 estática, mesmo resultado visual.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-blue-mid to-blue-light"
        style={{ scaleX }}
      />
    </div>
  );
}
