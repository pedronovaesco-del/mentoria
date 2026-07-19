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
      badge: "🚀 Perfil: Iniciante com potencial",
      title: "Você está pronto pra começar!",
      msg: "Identificamos que você está no início da sua jornada. Começar com o método certo desde o dia um evita os erros que custam meses de resultado. Na sua call, o Pedro vai montar um plano do zero, específico pra você.",
    };
  if (rev === "Até R$ 2.000" || rev === "R$ 2.000 a R$ 5.000")
    return {
      icon: "🔥",
      badge: "📦 Perfil: Em crescimento",
      title: "Você está no momento certo!",
      msg: "Você já tem resultados, mas o próximo nível exige estrutura e sistema. Na sua call de diagnóstico, vamos identificar o gargalo exato que está travando seu crescimento e montar o plano pra escalar.",
    };
  if (rev === "R$ 5.000 a R$ 15.000")
    return {
      icon: "⚡",
      badge: "📈 Perfil: Escalando",
      title: "Hora de escalar de verdade!",
      msg: "Com esse faturamento, você já tem tração real. O que falta é sistema e estrutura pra escalar sem virar mais caos. Na sua call, vamos mapear as alavancas certas pra chegar no próximo nível.",
    };
  return {
    icon: "🏆",
    badge: "💎 Perfil: Jogador avançado",
    title: "Hora de dominar o mercado!",
    msg: "Você já tem uma operação rodando. O foco agora é otimização, previsibilidade e posicionamento premium pra proteger e crescer sua margem de forma consistente.",
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
