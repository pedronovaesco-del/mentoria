import type { QuizAnswers } from "./profile";

export interface QuizOption {
  emoji: string;
  label: string;
  value: string;
}

export interface QuizQuestion {
  key: keyof QuizAnswers;
  emoji: string;
  text: string;
  options: QuizOption[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    key: "goal",
    emoji: "🎯",
    text: "Qual é o seu principal objetivo agora?",
    options: [
      { emoji: "🚀", label: "Começar a vender no digital", value: "Começar a vender no digital" },
      { emoji: "📈", label: "Aumentar o faturamento atual", value: "Aumentar o faturamento atual" },
      { emoji: "💰", label: "Reduzir custos e melhorar ROI", value: "Reduzir custos e melhorar ROI" },
      { emoji: "⭐", label: "Construir autoridade e marca", value: "Construir autoridade e marca" },
    ],
  },
  {
    key: "revenue",
    emoji: "💰",
    text: "Qual é o seu faturamento mensal aproximado?",
    options: [
      { emoji: "🌱", label: "Ainda não faturei", value: "Ainda não faturei" },
      { emoji: "📦", label: "Menos de R$ 10.000/mês", value: "Menos de R$ 10.000/mês" },
      { emoji: "🔥", label: "R$ 10.000 a R$ 50.000/mês", value: "R$ 10.000 a R$ 50.000/mês" },
      { emoji: "🏆", label: "Acima de R$ 50.000/mês", value: "Acima de R$ 50.000/mês" },
    ],
  },
  {
    key: "budget",
    emoji: "💼",
    text: "Quanto você tem disponível para investir agora?",
    options: [
      { emoji: "💵", label: "Menos de R$ 500/mês", value: "Menos de R$ 500/mês" },
      { emoji: "💳", label: "R$ 500 a R$ 2.000/mês", value: "R$ 500 a R$ 2.000/mês" },
      { emoji: "📊", label: "R$ 2.000 a R$ 10.000/mês", value: "R$ 2.000 a R$ 10.000/mês" },
      { emoji: "🏦", label: "Acima de R$ 10.000/mês", value: "Acima de R$ 10.000/mês" },
    ],
  },
  {
    key: "target",
    emoji: "📈",
    text: "Quanto quer faturar nos próximos 3 meses?",
    options: [
      { emoji: "🎯", label: "Até R$ 5.000", value: "Até R$ 5.000" },
      { emoji: "🔥", label: "R$ 5.000 a R$ 20.000", value: "R$ 5.000 a R$ 20.000" },
      { emoji: "🚀", label: "R$ 20.000 a R$ 100.000", value: "R$ 20.000 a R$ 100.000" },
      { emoji: "💎", label: "Acima de R$ 100.000", value: "Acima de R$ 100.000" },
    ],
  },
  {
    key: "challenge",
    emoji: "🚧",
    text: "Qual é o seu maior desafio hoje?",
    options: [
      { emoji: "🗺️", label: "Não sei por onde começar", value: "Não sei por onde começar" },
      { emoji: "🎯", label: "Não converto visitantes em clientes", value: "Não converto visitantes em clientes" },
      { emoji: "📉", label: "Tráfego caro ou ROI baixo", value: "Tráfego caro ou ROI baixo" },
      { emoji: "⚙️", label: "Não consigo escalar a operação", value: "Não consigo escalar a operação" },
    ],
  },
  {
    key: "digital_level",
    emoji: "💻",
    text: "Qual é o seu nível de conhecimento sobre o digital?",
    options: [
      { emoji: "🌱", label: "Nunca vendi online", value: "Nunca vendi online" },
      { emoji: "📚", label: "Sei o básico, ainda aprendendo", value: "Sei o básico, ainda aprendendo" },
      { emoji: "⚡", label: "Tenho experiência com anúncios e funis", value: "Tenho experiência com anúncios e funis" },
      { emoji: "🏆", label: "Avançado, já escalo campanhas", value: "Avançado, já escalo campanhas" },
    ],
  },
  {
    key: "time",
    emoji: "⏰",
    text: "Quanto tempo você dedica ao negócio por dia?",
    options: [
      { emoji: "⚡", label: "Menos de 2 horas (estou começando)", value: "Menos de 2 horas" },
      { emoji: "🕐", label: "2 a 6 horas por dia", value: "2 a 6 horas" },
      { emoji: "💼", label: "6 a 10 horas por dia", value: "6 a 10 horas" },
      { emoji: "🔥", label: "Mais de 10 horas (tempo integral)", value: "Mais de 10 horas" },
    ],
  },
];
