export const EASE_ENTRANCE = [0.16, 1, 0.3, 1] as const;

/** Delay em segundos por posição no stagger (equivalente aos antigos .d1-.d4) */
export const STAGGER_DELAYS = [0, 0.08, 0.16, 0.24, 0.32] as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
