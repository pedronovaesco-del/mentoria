export interface QuizAnswers {
  goal?: string;
  revenue?: string;
  budget?: string;
  target?: string;
  digital_level?: string;
  challenge?: string;
  motivation?: string;
  time?: string;
  ethics?: string;
  readiness?: string;
}

export interface Profile {
  icon: string;
  badge: string;
  title: string;
  msg: string;
}

export function getProfile(answers: QuizAnswers): Profile {
  const rev = answers.revenue || "";
  if (rev === "R$ 0 – ainda não faturo")
    return {
      icon: "🌱",
      badge: "🚀 Profile: Beginner with potential",
      title: "You're ready to get started!",
      msg: "We identified that you're at the start of your journey. Starting with the right method from day one avoids the mistakes that cost months of results. In your call, Pedro will build a plan from scratch specifically for you.",
    };
  if (rev === "Até R$ 2.000" || rev === "R$ 2.000 a R$ 5.000")
    return {
      icon: "🔥",
      badge: "📦 Profile: Growing",
      title: "You're at the right moment!",
      msg: "You already have results, but the next level requires structure and system. In your diagnostic call, we'll identify the exact bottleneck holding back your growth and build the plan to scale.",
    };
  if (rev === "R$ 5.000 a R$ 15.000")
    return {
      icon: "⚡",
      badge: "📈 Profile: Scaling",
      title: "Time to really scale!",
      msg: "With this revenue, you have real traction. What's missing is system and structure to scale without adding more chaos. In your call, we'll map out the right levers to reach the next level.",
    };
  return {
    icon: "🏆",
    badge: "💎 Profile: Advanced player",
    title: "Time to dominate the market!",
    msg: "You already have an operation running. The focus now is optimization, predictability, and premium positioning to protect and grow your margin consistently.",
  };
}

export function inferNiche(answers: QuizAnswers): string {
  const ch = answers.challenge || "";
  const goal = answers.goal || "";
  if (ch.startsWith("Tenho audiência")) return "Copywriting & Funis";
  if (ch.startsWith("Não consigo atrair")) return "Tráfego Pago";
  if (ch.startsWith("Já vendo, mas não consigo escalar")) return "Consultoria de Negócios";
  if (ch.startsWith("Falta consistência")) return "Consultoria de Negócios";
  if (goal.startsWith("Faturo bem")) return "Consultoria de Negócios";
  if (goal.startsWith("Já faturo, mas travei")) return "Tráfego Pago";
  return "Marketing Digital";
}
