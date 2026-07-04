export interface QuizAnswers {
  goal?: string;
  revenue?: string;
  budget?: string;
  target?: string;
  challenge?: string;
  digital_level?: string;
  time?: string;
}

export interface Profile {
  icon: string;
  badge: string;
  title: string;
  msg: string;
}

export function getProfile(answers: QuizAnswers): Profile {
  const rev = answers.revenue || "";
  if (rev === "Ainda não faturei")
    return {
      icon: "🌱",
      badge: "🚀 Perfil: Iniciante com potencial",
      title: "Você está pronto para começar!",
      msg: "Identificamos que você está no início da jornada. Entrar com o método certo desde o começo evita os erros que custam meses de resultado. Na sua call, Pedro vai montar um plano do zero especialmente para você.",
    };
  if (rev === "Menos de R$ 10.000/mês")
    return {
      icon: "🔥",
      badge: "📦 Perfil: Em crescimento",
      title: "Você está no momento certo!",
      msg: "Você já tem resultado, mas o próximo nível exige estrutura e sistema. Na sua call diagnóstica, vamos identificar o gargalo exato que está travando seu crescimento e montar o plano para escalar.",
    };
  if (rev === "R$ 10.000 a R$ 50.000/mês")
    return {
      icon: "⚡",
      badge: "📈 Perfil: Em escala",
      title: "Hora de escalar de verdade!",
      msg: "Com esse faturamento, você tem tração real. Falta sistema e estrutura para escalar sem aumentar o caos. Na sua call vamos mapear as alavancas certas para chegar ao próximo patamar.",
    };
  return {
    icon: "🏆",
    badge: "💎 Perfil: Player avançado",
    title: "Hora de dominar o mercado!",
    msg: "Você já tem uma operação rodando. O foco agora é otimização, previsibilidade e posicionamento premium para proteger e expandir sua margem com consistência.",
  };
}

export function inferNiche(answers: QuizAnswers): string {
  const ch = answers.challenge || "";
  const gol = answers.goal || "";
  if (ch === "Tráfego caro ou ROI baixo") return "Tráfego Pago";
  if (ch === "Não converto visitantes em clientes") return "Copywriting & Funis";
  if (ch === "Não consigo escalar a operação") return "Consultoria de Negócios";
  if (gol === "Construir autoridade e marca") return "Social Media";
  if (gol === "Começar a vender no digital") return "Marketing Digital";
  if (gol === "Reduzir custos e melhorar ROI") return "Tráfego Pago";
  if (gol === "Aumentar o faturamento atual") return "Vendas & Comercial";
  return "Marketing Digital";
}
