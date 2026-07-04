import type { Metadata } from "next";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizFooter } from "@/components/quiz/QuizFooter";

export const metadata: Metadata = {
  title: "Diagnóstico Gratuito | Pedro Novaes",
  description:
    "Responda 7 perguntas e descubra o seu perfil digital. Garanta sua vaga na call estratégica gratuita com Pedro Novaes.",
  openGraph: {
    title: "Diagnóstico Gratuito | Pedro Novaes",
    description:
      "Responda 7 perguntas e descubra o seu perfil digital. Garanta sua vaga na call estratégica gratuita.",
    images: ["/images/logo.png"],
  },
};

export default function QuizPage() {
  return (
    <>
      <QuizHeader />
      <main className="flex flex-1 flex-col items-center px-5 pt-12 pb-20">
        <QuizFlow />
      </main>
      <QuizFooter />
    </>
  );
}
