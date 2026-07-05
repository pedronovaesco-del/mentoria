"use client";

import { motion } from "framer-motion";
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
 * de delay.
 *
 * A supressão sob prefers-reduced-motion é feita via CSS puro (classe
 * .reveal + regra global em globals.css), de propósito — NÃO via
 * useReducedMotion() em JS. Esse hook resolve de forma síncrona no
 * primeiro render do cliente, mas o servidor (sem window) sempre resolve
 * "false"; se o SO já estiver com reduced-motion ligado, servidor e
 * cliente renderizariam ramos diferentes na primeira pintura, e o React
 * trata isso como "mismatch só de atributo" e NÃO corrige — o estilo
 * oculto (opacity:0) do servidor fica preso no DOM pra sempre. Manter a
 * mesma árvore/atributos nos dois lados e deixar o CSS (que é avaliado
 * pelo browser, não pelo React) cuidar da preferência evita esse bug.
 */
export function Reveal({ children, delay = 0, as = "div", className }: RevealProps) {
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={`reveal ${className ?? ""}`}
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
