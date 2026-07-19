import type { Metadata } from "next";
import { QuizFlow } from "@/components/quiz/QuizFlow";

export const metadata: Metadata = {
  title: "Diagnóstico Gratuito | Pedro Novaes",
  description:
    "Responda 7 perguntas e descubra seu perfil digital. Garanta sua vaga na call estratégica gratuita com Pedro Novaes.",
  openGraph: {
    title: "Diagnóstico Gratuito | Pedro Novaes",
    description:
      "Responda 7 perguntas e descubra seu perfil digital. Garanta sua vaga na call estratégica gratuita.",
    images: ["/images/logo.png"],
  },
};

export default function QuizPage() {
  return (
    // Fixo ao viewport visual (h-dvh + inset-0), não ao documento -- em vez
    // de min-h-screen (100vh "grande", baseado no viewport com a barra de
    // endereço do navegador recolhida). Isso evita que o body precise
    // rolar quando a barra do navegador mobile mostra/esconde durante o
    // scroll, o que causava elementos no topo da tela sumirem/reaparecerem.
    // overflow-y-auto fica só como rede de segurança pra viewports muito
    // baixos -- a rolagem, se acontecer, é interna a este container, nunca
    // do documento.
    // Horizontal: justify-center é seguro (a largura do conteúdo é sempre
    // <= largura do viewport, w-full+max-w nunca estoura). Vertical: em vez
    // de align-items/justify-center (que corta o conteúdo igualmente dos
    // dois lados quando ele é mais alto que a tela, e a metade cortada no
    // topo vira inalcançável via scroll), uso my-auto no filho -- centraliza
    // enquanto cabe e degrada pra alinhado-ao-topo (sempre alcançável via
    // scroll) assim que o conteúdo excede a altura disponível.
    <main className="fixed inset-0 flex h-dvh justify-center overflow-y-auto px-5 py-10">
      <div className="my-auto w-full max-w-[640px]">
        <QuizFlow />
      </div>
    </main>
  );
}
