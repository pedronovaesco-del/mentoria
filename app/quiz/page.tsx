import type { Metadata } from "next";
import { QuizFlow } from "@/components/quiz/QuizFlow";

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
    <main className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <QuizFlow />
    </main>
  );
}
