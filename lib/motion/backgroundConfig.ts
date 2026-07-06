/**
 * Configuração central do fundo animado (cor/velocidade/densidade).
 * Ajuste aqui em vez de mexer nos componentes.
 */
export const BACKGROUND_CONFIG = {
  particles: {
    /** RGB (sem alpha) — combina com --blue do design system */
    rgb: "59, 130, 246",
    dotOpacity: 0.7,
    lineOpacity: 0.24,
    /** distância máxima (px) pra desenhar uma linha entre duas partículas */
    linkDistance: 150,
    /** velocidade máxima de deriva, em px/frame a 60fps */
    maxSpeed: 0.18,
    byBreakpoint: {
      desktop: { count: 46, minWidth: 1024 },
      tablet: { count: 26, minWidth: 640 },
      mobile: { count: 14, minWidth: 0 },
    },
  },
  parallax: {
    /** deslocamento máximo (px) do parallax reativo ao mouse */
    mouseStrengthPx: 16,
    /** multiplicador do parallax reativo ao scroll */
    scrollStrength: 0.05,
  },
} as const;
