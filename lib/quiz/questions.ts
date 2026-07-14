import type { QuizAnswers } from "./profile";

/** Peso de qualificação da opção -- uso interno, nunca exibido ao usuário. */
export type Weight = "hot" | "warm" | "cold";

export interface QuizOption {
  emoji: string;
  label: string;
  value: string;
  weight: Weight;
}

export interface QuizQuestion {
  key: keyof QuizAnswers;
  emoji: string;
  text: string;
  options: QuizOption[];
}

/**
 * Quiz de mapeamento (aquecer + qualificar), 10 perguntas em ordem
 * estratégica: começa leve, aprofunda em dinheiro, fecha em ética/
 * comprometimento. Pra mudar o número de perguntas, edite este array --
 * o resto do fluxo se ajusta sozinho.
 *
 * NOTA: `label` é o texto em inglês exibido ao usuário. `value` continua
 * em português de propósito -- é o dado bruto salvo no Supabase e exibido
 * sem tradução no CRM/painel (ferramentas internas, ver components/crm e
 * components/painel), então manter esse valor consistente com o histórico
 * de leads existente evita misturar idiomas nessas telas.
 */
export const QUESTIONS: QuizQuestion[] = [
  {
    key: "goal",
    emoji: "🧭",
    text: "Which sentence best describes where you are TODAY in your digital business?",
    options: [
      { emoji: "🌱", label: "Haven't started yet, just have the idea and the drive", value: "Ainda não comecei, só tenho a ideia e a vontade", weight: "cold" },
      { emoji: "🔄", label: "Already started, but no consistent income yet", value: "Já comecei, mas não tiro renda consistente", weight: "warm" },
      { emoji: "🧱", label: "Already making money, but hit a ceiling and can't scale", value: "Já faturo, mas travei num teto e não consigo escalar", weight: "hot" },
      { emoji: "🏗️", label: "Doing well, want to structure/professionalize to grow with predictability", value: "Faturo bem, quero estruturar/profissionalizar pra crescer com previsibilidade", weight: "hot" },
    ],
  },
  {
    key: "revenue",
    emoji: "💰",
    text: "How much does your business currently make PER MONTH (average of the last 3 months)?",
    options: [
      { emoji: "🌱", label: "R$0 – no revenue yet", value: "R$ 0 – ainda não faturo", weight: "cold" },
      { emoji: "📦", label: "Up to R$2,000", value: "Até R$ 2.000", weight: "cold" },
      { emoji: "📈", label: "R$2,000 to R$5,000", value: "R$ 2.000 a R$ 5.000", weight: "warm" },
      { emoji: "🔥", label: "R$5,000 to R$15,000", value: "R$ 5.000 a R$ 15.000", weight: "hot" },
      { emoji: "🏆", label: "Above R$15,000", value: "Acima de R$ 15.000", weight: "hot" },
    ],
  },
  {
    key: "budget",
    emoji: "🏦",
    text: "How much do you have TODAY, set aside and available, to invest in your growth (mentoring, traffic, tools)?",
    options: [
      { emoji: "🚫", label: "Nothing set aside right now", value: "Nada separado no momento", weight: "cold" },
      { emoji: "💵", label: "Up to R$1,000", value: "Até R$ 1.000", weight: "cold" },
      { emoji: "💳", label: "R$1,000 to R$3,000", value: "R$ 1.000 a R$ 3.000", weight: "warm" },
      { emoji: "💰", label: "R$3,000 to R$8,000", value: "R$ 3.000 a R$ 8.000", weight: "hot" },
      { emoji: "🏦", label: "Above R$8,000", value: "Acima de R$ 8.000", weight: "hot" },
    ],
  },
  {
    key: "target",
    emoji: "🎯",
    text: "What monthly revenue do you want to be hitting 3 months from now?",
    options: [
      { emoji: "🎯", label: "R$3,000 to R$5,000", value: "R$ 3.000 a R$ 5.000", weight: "warm" },
      { emoji: "🚀", label: "R$5,000 to R$10,000", value: "R$ 5.000 a R$ 10.000", weight: "hot" },
      { emoji: "💎", label: "R$10,000 to R$30,000", value: "R$ 10.000 a R$ 30.000", weight: "hot" },
      { emoji: "👑", label: "Above R$30,000", value: "Acima de R$ 30.000", weight: "hot" },
    ],
  },
  {
    key: "digital_level",
    emoji: "💻",
    text: "How would you rate your current level in digital marketing and online sales?",
    options: [
      { emoji: "🌱", label: "Total beginner – still learning the basics", value: "Iniciante total – ainda estou entendendo o básico", weight: "cold" },
      { emoji: "📚", label: "Know the basics, but get lost when executing", value: "Sei o básico, mas me perco na hora de executar", weight: "warm" },
      { emoji: "⚙️", label: "Already executing, have results, but lack method and consistency", value: "Já executo, tenho resultados, mas falta método e consistência", weight: "hot" },
      { emoji: "🏆", label: "Advanced – already selling, want to optimize and scale", value: "Avançado – já vendo, quero otimizar e escalar", weight: "hot" },
    ],
  },
  {
    key: "challenge",
    emoji: "🚧",
    text: "What's holding you back MOST today from getting where you want to be?",
    options: [
      { emoji: "🗺️", label: "Don't know where to start / lack of direction", value: "Não sei por onde começar / falta de direção", weight: "cold" },
      { emoji: "🧲", label: "Can't attract customers / generate leads", value: "Não consigo atrair clientes / gerar leads", weight: "warm" },
      { emoji: "🎯", label: "Have an audience but don't convert into sales", value: "Tenho audiência mas não converto em vendas", weight: "hot" },
      { emoji: "⚙️", label: "Lack consistency, method, and discipline in the process", value: "Falta consistência, método e disciplina no processo", weight: "hot" },
      { emoji: "🌀", label: "Already selling, but can't scale without burning out", value: "Já vendo, mas não consigo escalar sem me sobrecarregar", weight: "hot" },
    ],
  },
  {
    key: "motivation",
    emoji: "❤️",
    text: "What's driving you to want to grow in digital RIGHT NOW?",
    options: [
      { emoji: "🌍", label: "Geographic and time freedom (live wherever I want)", value: "Liberdade geográfica e de tempo (viver de onde quiser)", weight: "hot" },
      { emoji: "💪", label: "Prove to myself that I'm capable", value: "Provar pra mim mesmo que sou capaz", weight: "warm" },
      { emoji: "🏡", label: "Get out of financial struggle / stability for my family", value: "Sair do sufoco financeiro / estabilidade pra família", weight: "hot" },
      { emoji: "👑", label: "Build something big, a reference brand/authority", value: "Construir algo grande, uma marca/autoridade de referência", weight: "hot" },
      { emoji: "🤷", label: "Still not clear on my why", value: "Ainda não tenho clareza do meu porquê", weight: "cold" },
    ],
  },
  {
    key: "time",
    emoji: "⏰",
    text: "If you had the right method and someone guiding you step by step, how much time would you dedicate per day?",
    options: [
      { emoji: "⏳", label: "Less than 30 min – no time right now", value: "Menos de 30 min – tô sem tempo agora", weight: "cold" },
      { emoji: "🕐", label: "1 hour a day", value: "1 hora por dia", weight: "warm" },
      { emoji: "⏰", label: "2 to 3 hours a day", value: "2 a 3 horas por dia", weight: "hot" },
      { emoji: "🔥", label: "Whatever it takes – it's my top priority right now", value: "O que for preciso – é prioridade máxima na minha vida", weight: "hot" },
    ],
  },
  {
    key: "ethics",
    emoji: "⚖️",
    text: "How do you see the way of building money online?",
    options: [
      { emoji: "💨", label: "I want fast results, don't care much about the method", value: "Quero resultado rápido, não ligo muito pro método", weight: "cold" },
      { emoji: "🤝", label: "Doesn't matter, as long as it makes money and feels okay", value: "Tanto faz, desde que dê dinheiro e seja legal", weight: "warm" },
      { emoji: "✨", label: "I'll only sell something that truly delivers value and transforms the customer", value: "Só topo vender algo que realmente entrega valor e transforma o cliente", weight: "hot" },
      { emoji: "🏛️", label: "Building a solid, long-term reputation is non-negotiable for me", value: "Construir reputação sólida e de longo prazo é inegociável pra mim", weight: "hot" },
    ],
  },
  {
    key: "readiness",
    emoji: "🤝",
    text: "If we identify that it makes sense to work together, are you ready to make the decision and get started?",
    options: [
      { emoji: "🔥", label: "Yes, I'm decided to change my reality now", value: "Sim, tô decidido a mudar minha realidade agora", weight: "hot" },
      { emoji: "✅", label: "Yes, if it makes sense and I see a clear path", value: "Sim, se fizer sentido e eu ver o caminho claro", weight: "hot" },
      { emoji: "🤔", label: "Maybe, I need to think it over", value: "Talvez, preciso avaliar com calma", weight: "warm" },
      { emoji: "👀", label: "Just researching for now", value: "Só estou pesquisando por enquanto", weight: "cold" },
    ],
  },
];

function weightOf(key: string, value: string | undefined): Weight | undefined {
  if (!value) return undefined;
  const question = QUESTIONS.find((q) => q.key === key);
  return question?.options.find((o) => o.value === value)?.weight;
}

export type Qualification = "quente" | "morno" | "frio";

/**
 * Qualificação de lead (uso interno -- nunca exibida ao usuário, só
 * enviada junto com o resto da resposta pro Supabase). Conta quantas
 * respostas caíram em peso "hot" e cruza com os 2 filtros mais duros da
 * régua: caixa disponível (budget) e prontidão pra decidir (readiness).
 */
export function getQualification(answers: QuizAnswers): Qualification {
  const hotCount = (Object.keys(answers) as (keyof QuizAnswers)[]).filter(
    (key) => weightOf(key, answers[key]) === "hot"
  ).length;
  const budgetWeight = weightOf("budget", answers.budget);
  const readinessWeight = weightOf("readiness", answers.readiness);

  if (hotCount >= 6 && budgetWeight === "hot" && readinessWeight === "hot") return "quente";
  if (budgetWeight === "cold" || !budgetWeight) return "frio";
  return "morno";
}
