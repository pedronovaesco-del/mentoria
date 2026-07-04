"use server";

import { createClient } from "@/lib/supabase/server";
import { inferNiche, type QuizAnswers } from "@/lib/quiz/profile";

export interface LeadCaptureInput {
  name: string;
  ddi: string;
  phoneDigits: string;
  phoneMasked: string;
  requiredDigits: number;
  email: string;
}

type LeadCaptureErrors = Partial<Record<"name" | "phone" | "email", string>>;

export type LeadCaptureResult =
  | { ok: true; leadId: string }
  | { ok: false; errors: LeadCaptureErrors };

/**
 * Espelha a validacao client-side de submitLM (index.html) -- mas roda no
 * servidor tambem (defesa em profundidade, nunca confiar so no client).
 * O insert usa o cliente Supabase server-side, que atua como "anon" pra
 * visitante nao autenticado -- a policy anon_insert do RLS eh quem
 * efetivamente autoriza isso, igual ao site original.
 */
export async function submitLeadCapture(
  input: LeadCaptureInput
): Promise<LeadCaptureResult> {
  const errors: LeadCaptureErrors = {};

  if (input.name.trim().length < 3) {
    errors.name = "Informe seu nome completo.";
  }
  if (input.phoneDigits.length < input.requiredDigits) {
    errors.phone = "Número incompleto para o país selecionado.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email.trim())) {
    errors.email = "Informe um e-mail válido.";
  }
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const supabase = await createClient();
  const leadId = crypto.randomUUID();
  const phone = `${input.ddi} ${input.phoneMasked}`;

  try {
    await supabase.from("quiz_leads").insert({
      id: leadId,
      name: input.name.trim(),
      phone,
      email: input.email.trim(),
      source: "formulario-2.0",
      status: "lead",
    });
  } catch (err) {
    // Mesma postura do original: nao bloqueia o funil se o insert falhar
    // (o usuario segue pro quiz mesmo assim), so registra no log do servidor.
    console.warn("submitLeadCapture insert falhou:", err);
  }

  return { ok: true, leadId };
}

export interface QuizSubmitInput {
  leadId: string | null;
  name: string;
  phone: string;
  email: string;
  answers: QuizAnswers;
}

/**
 * Espelha submitDirect (quiz.html): se ja existe leadId (veio do
 * LeadModal), faz UPDATE na mesma linha; senao, INSERT novo. Nunca
 * bloqueia o fluxo se o Supabase falhar -- mesma postura defensiva
 * do original.
 */
export async function submitQuizAnswers(input: QuizSubmitInput): Promise<void> {
  const supabase = await createClient();

  const quizData = {
    goal: input.answers.goal || null,
    revenue: input.answers.revenue || null,
    budget: input.answers.budget || null,
    target: input.answers.target || null,
    challenge: input.answers.challenge || null,
    digital_level: input.answers.digital_level || null,
    time: input.answers.time || null,
    niche: inferNiche(input.answers),
    status: "quiz_completed" as const,
  };

  try {
    if (input.leadId) {
      await supabase.from("quiz_leads").update(quizData).eq("id", input.leadId);
    } else {
      await supabase.from("quiz_leads").insert({
        name: input.name,
        phone: input.phone,
        email: input.email,
        source: "formulario-2.0/quiz",
        ...quizData,
      });
    }
  } catch (err) {
    console.warn("submitQuizAnswers falhou:", err);
  }
}
