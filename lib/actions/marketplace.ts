"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BuyLeadResult } from "@/types/database";

/**
 * Chama a RPC buy_lead (SECURITY DEFINER, ja existente no banco) --
 * ela mesma valida creditos e evita compra duplicada de forma atomica
 * (FOR UPDATE), resolvendo auth.uid() a partir da sessao do cookie.
 * Esta Server Action so repassa a chamada e revalida a pagina.
 */
export async function buyLead(leadId: string): Promise<BuyLeadResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("buy_lead", { p_lead_id: leadId });

  if (error) {
    return { error: "professional_not_found" };
  }

  revalidatePath("/painel");
  return data as BuyLeadResult;
}
