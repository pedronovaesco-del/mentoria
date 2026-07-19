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
 * `label` (exibido ao usuário) e `value` (dado bruto salvo no Supabase,
 * exibido sem tradução no CRM/painel -- ver components/crm e
 * components/painel) estão ambos em português -- mantê-los idênticos evita
 * divergência entre o que a pessoa vê e o que fica registrado no histórico
 * de leads.
 */
export const QUESTIONS: QuizQuestion[] = [
  {
    key: "goal",
    emoji: "🧭",
    text: "Qual frase melhor descreve onde você está HOJE no seu negócio digital?",
    options: [
      { emoji: "🌱", label: "Ainda não comecei, só tenho a ideia e a vontade", value: "Ainda não comecei, só tenho a ideia e a vontade", weight: "cold" },
      { emoji: "🔄", label: "Já comecei, mas não tiro renda consistente", value: "Já comecei, mas não tiro renda consistente", weight: "warm" },
      { emoji: "🧱", label: "Já faturo, mas travei num teto e não consigo escalar", value: "Já faturo, mas travei num teto e não consigo escalar", weight: "hot" },
      { emoji: "🏗️", label: "Faturo bem, quero estruturar/profissionalizar pra crescer com previsibilidade", value: "Faturo bem, quero estruturar/profissionalizar pra crescer com previsibilidade", weight: "hot" },
    ],
  },
  {
    key: "revenue",
    emoji: "💰",
    text: "Quanto o seu negócio fatura atualmente POR MÊS (média dos últimos 3 meses)?",
    options: [
      { emoji: "🌱", label: "R$ 0 – ainda não faturo", value: "R$ 0 – ainda não faturo", weight: "cold" },
      { emoji: "📦", label: "Até R$ 2.000", value: "Até R$ 2.000", weight: "cold" },
      { emoji: "📈", label: "R$ 2.000 a R$ 5.000", value: "R$ 2.000 a R$ 5.000", weight: "warm" },
      { emoji: "🔥", label: "R$ 5.000 a R$ 15.000", value: "R$ 5.000 a R$ 15.000", weight: "hot" },
      { emoji: "🏆", label: "Acima de R$ 15.000", value: "Acima de R$ 15.000", weight: "hot" },
    ],
  },
  {
    key: "budget",
    emoji: "🏦",
    text: "Quanto você tem HOJE, guardado e disponível, pra investir no seu crescimento (mentoria, tráfego, ferramentas)?",
    options: [
      { emoji: "🚫", label: "Nada separado no momento", value: "Nada separado no momento", weight: "cold" },
      { emoji: "💵", label: "Até R$ 1.000", value: "Até R$ 1.000", weight: "cold" },
      { emoji: "💳", label: "R$ 1.000 a R$ 3.000", value: "R$ 1.000 a R$ 3.000", weight: "warm" },
      { emoji: "💰", label: "R$ 3.000 a R$ 8.000", value: "R$ 3.000 a R$ 8.000", weight: "hot" },
      { emoji: "🏦", label: "Acima de R$ 8.000", value: "Acima de R$ 8.000", weight: "hot" },
    ],
  },
  {
    key: "target",
    emoji: "🎯",
    text: "Qual faturamento mensal você quer estar batendo daqui a 3 meses?",
    options: [
      { emoji: "🎯", label: "R$ 3.000 a R$ 5.000", value: "R$ 3.000 a R$ 5.000", weight: "warm" },
      { emoji: "🚀", label: "R$ 5.000 a R$ 10.000", value: "R$ 5.000 a R$ 10.000", weight: "hot" },
      { emoji: "💎", label: "R$ 10.000 a R$ 30.000", value: "R$ 10.000 a R$ 30.000", weight: "hot" },
      { emoji: "👑", label: "Acima de R$ 30.000", value: "Acima de R$ 30.000", weight: "hot" },
    ],
  },
  {
    key: "digital_level",
    emoji: "💻",
    text: "Como você avalia seu nível atual em marketing digital e vendas online?",
    options: [
      { emoji: "🌱", label: "Iniciante total – ainda estou entendendo o básico", value: "Iniciante total – ainda estou entendendo o básico", weight: "cold" },
      { emoji: "📚", label: "Sei o básico, mas me perco na hora de executar", value: "Sei o básico, mas me perco na hora de executar", weight: "warm" },
      { emoji: "⚙️", label: "Já executo, tenho resultados, mas falta método e consistência", value: "Já executo, tenho resultados, mas falta método e consistência", weight: "hot" },
      { emoji: "🏆", label: "Avançado – já vendo, quero otimizar e escalar", value: "Avançado – já vendo, quero otimizar e escalar", weight: "hot" },
    ],
  },
  {
    key: "challenge",
    emoji: "🚧",
    text: "O que mais te trava HOJE de chegar onde você quer?",
    options: [
      { emoji: "🗺️", label: "Não sei por onde começar / falta de direção", value: "Não sei por onde começar / falta de direção", weight: "cold" },
      { emoji: "🧲", label: "Não consigo atrair clientes / gerar leads", value: "Não consigo atrair clientes / gerar leads", weight: "warm" },
      { emoji: "🎯", label: "Tenho audiência mas não converto em vendas", value: "Tenho audiência mas não converto em vendas", weight: "hot" },
      { emoji: "⚙️", label: "Falta consistência, método e disciplina no processo", value: "Falta consistência, método e disciplina no processo", weight: "hot" },
      { emoji: "🌀", label: "Já vendo, mas não consigo escalar sem me sobrecarregar", value: "Já vendo, mas não consigo escalar sem me sobrecarregar", weight: "hot" },
    ],
  },
  {
    key: "motivation",
    emoji: "❤️",
    text: "O que te motiva a querer crescer no digital AGORA?",
    options: [
      { emoji: "🌍", label: "Liberdade geográfica e de tempo (viver de onde quiser)", value: "Liberdade geográfica e de tempo (viver de onde quiser)", weight: "hot" },
      { emoji: "💪", label: "Provar pra mim mesmo que sou capaz", value: "Provar pra mim mesmo que sou capaz", weight: "warm" },
      { emoji: "🏡", label: "Sair do sufoco financeiro / estabilidade pra família", value: "Sair do sufoco financeiro / estabilidade pra família", weight: "hot" },
      { emoji: "👑", label: "Construir algo grande, uma marca/autoridade de referência", value: "Construir algo grande, uma marca/autoridade de referência", weight: "hot" },
      { emoji: "🤷", label: "Ainda não tenho clareza do meu porquê", value: "Ainda não tenho clareza do meu porquê", weight: "cold" },
    ],
  },
  {
    key: "time",
    emoji: "⏰",
    text: "Se você tivesse o método certo e alguém te guiando passo a passo, quanto tempo dedicaria por dia?",
    options: [
      { emoji: "⏳", label: "Menos de 30 min – tô sem tempo agora", value: "Menos de 30 min – tô sem tempo agora", weight: "cold" },
      { emoji: "🕐", label: "1 hora por dia", value: "1 hora por dia", weight: "warm" },
      { emoji: "⏰", label: "2 a 3 horas por dia", value: "2 a 3 horas por dia", weight: "hot" },
      { emoji: "🔥", label: "O que for preciso – é prioridade máxima na minha vida", value: "O que for preciso – é prioridade máxima na minha vida", weight: "hot" },
    ],
  },
  {
    key: "ethics",
    emoji: "⚖️",
    text: "Como você enxerga a forma de construir dinheiro online?",
    options: [
      { emoji: "💨", label: "Quero resultado rápido, não ligo muito pro método", value: "Quero resultado rápido, não ligo muito pro método", weight: "cold" },
      { emoji: "🤝", label: "Tanto faz, desde que dê dinheiro e seja legal", value: "Tanto faz, desde que dê dinheiro e seja legal", weight: "warm" },
      { emoji: "✨", label: "Só topo vender algo que realmente entrega valor e transforma o cliente", value: "Só topo vender algo que realmente entrega valor e transforma o cliente", weight: "hot" },
      { emoji: "🏛️", label: "Construir reputação sólida e de longo prazo é inegociável pra mim", value: "Construir reputação sólida e de longo prazo é inegociável pra mim", weight: "hot" },
    ],
  },
  {
    key: "readiness",
    emoji: "🤝",
    text: "Se identificarmos que faz sentido trabalharmos juntos, você está pronto pra tomar a decisão e começar?",
    options: [
      { emoji: "🔥", label: "Sim, tô decidido a mudar minha realidade agora", value: "Sim, tô decidido a mudar minha realidade agora", weight: "hot" },
      { emoji: "✅", label: "Sim, se fizer sentido e eu ver o caminho claro", value: "Sim, se fizer sentido e eu ver o caminho claro", weight: "hot" },
      { emoji: "🤔", label: "Talvez, preciso avaliar com calma", value: "Talvez, preciso avaliar com calma", weight: "warm" },
      { emoji: "👀", label: "Só estou pesquisando por enquanto", value: "Só estou pesquisando por enquanto", weight: "cold" },
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
