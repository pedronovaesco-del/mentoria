"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { EASE_ENTRANCE, revealVariants, STAGGER_DELAYS } from "@/lib/motion/variants";

interface RevealProps {
  children: ReactNode;
  /** Posição no stagger (0-4), equivalente às antigas classes .d1-.d4 */
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: ElementType;
  className?: string;
}

/**
 * Substitui o par .reveal/.d1-d4 + IntersectionObserver da v1 estática.
 * Trigger-once (viewport once:true), fade + translateY, stagger via prop
 * de delay. Desativado (mostra o conteúdo direto) sob prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, as = "div", className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as "div"];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={revealVariants}
      transition={{ duration: 0.6, ease: EASE_ENTRANCE, delay: STAGGER_DELAYS[delay] }}
    >
      {children}
    </MotionTag>
  );
}
