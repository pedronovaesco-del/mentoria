"use server";

import { createClient } from "@/lib/supabase/server";

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
