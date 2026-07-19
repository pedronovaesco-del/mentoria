"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { computeScore, normalizePhone } from "@/lib/crm/scoring";
import type { CrmEtapa, CrmPrioridade, CrmCallStatus, CrmFollowupType } from "@/types/database";

export interface LeadFormPayload {
  companyId: string;
  name: string;
  whatsappDisplay: string | null;
  email: string | null;
  objetivo: string | null;
  faturamento: string | null;
  orcamento: string | null;
  meta3Meses: string | null;
  desafio: string | null;
  nivelDigital: string | null;
  tempoDia: string | null;
  etapa: CrmEtapa;
  prioridade: CrmPrioridade;
  dataEntrada: string | null;
  dataCall: string | null;
  proximoPasso: string | null;
  responsavel: string | null;
  resultado: string | null;
  notas: string | null;
}

export async function upsertLead(leadId: string | null, input: LeadFormPayload) {
  const supabase = await createClient();
  const whatsapp = normalizePhone(input.whatsappDisplay);

  const score = computeScore({
    objetivo: input.objetivo,
    faturamento: input.faturamento,
    orcamento: input.orcamento,
    meta_3_meses: input.meta3Meses,
    desafio: input.desafio,
    nivel_digital: input.nivelDigital,
    tempo_dia: input.tempoDia,
  }).score;

  const payload = {
    company_id: input.companyId,
    name: input.name,
    whatsapp,
    whatsapp_display: input.whatsappDisplay,
    email: input.email,
    objetivo: input.objetivo,
    faturamento: input.faturamento,
    orcamento: input.orcamento,
    meta_3_meses: input.meta3Meses,
    desafio: input.desafio,
    nivel_digital: input.nivelDigital,
    tempo_dia: input.tempoDia,
    etapa: input.etapa,
    prioridade: input.prioridade,
    data_entrada: input.dataEntrada,
    data_call: input.dataCall,
    proximo_passo: input.proximoPasso,
    responsavel: input.responsavel,
    resultado: input.resultado,
    notas: input.notas,
    score,
  };

  if (leadId) {
    const { error } = await supabase.from("crm_leads").update(payload).eq("id", leadId);
    if (error) return { ok: false as const, error: error.message };
  } else {
    const { error } = await supabase.from("crm_leads").insert({
      ...payload,
      dedup_key: whatsapp || `name:${input.name.trim().toLowerCase()}`,
      data_entrada: input.dataEntrada || new Date().toISOString().slice(0, 10),
    });
    if (error) return { ok: false as const, error: error.message };
  }

  revalidatePath("/crm");
  return { ok: true as const };
}

export async function deleteCrmLead(leadId: string) {
  const supabase = await createClient();
  await supabase.from("crm_leads").delete().eq("id", leadId);
  revalidatePath("/crm");
}

export async function logFollowup(leadId: string, type: CrmFollowupType) {
  const supabase = await createClient();
  const { data: lead } = await supabase.from("crm_leads").select("first_contact_at").eq("id", leadId).single();
  const now = new Date().toISOString();
  const patch: Record<string, string> = { last_followup_at: now };
  if (lead && !lead.first_contact_at) patch.first_contact_at = now;

  await supabase.from("crm_leads").update(patch).eq("id", leadId);
  await supabase.from("crm_followups").insert({ lead_id: leadId, type });
  revalidatePath("/crm");
}

export async function toggleEmailMarketing(leadId: string, newVal: boolean) {
  const supabase = await createClient();
  await supabase
    .from("crm_leads")
    .update({ received_email_marketing: newVal, email_marketing_at: newVal ? new Date().toISOString() : null })
    .eq("id", leadId);
  if (newVal) await supabase.from("crm_followups").insert({ lead_id: leadId, type: "email_marketing" });
  revalidatePath("/crm");
}

export interface CallFormPayload {
  companyId: string;
  leadId: string;
  closer: string;
  scheduledAt: string;
  status: CrmCallStatus;
  notes: string | null;
}

export async function upsertCall(callId: string | null, input: CallFormPayload) {
  const supabase = await createClient();
  const payload = {
    company_id: input.companyId,
    lead_id: input.leadId,
    closer: input.closer,
    scheduled_at: input.scheduledAt,
    status: input.status,
    notes: input.notes,
  };

  if (callId) {
    const { error } = await supabase.from("crm_calls").update(payload).eq("id", callId);
    if (error) return { ok: false as const, error: error.message };
  } else {
    const { error } = await supabase.from("crm_calls").insert(payload);
    if (error) return { ok: false as const, error: error.message };
  }

  revalidatePath("/crm");
  return { ok: true as const };
}

export async function deleteCall(callId: string) {
  const supabase = await createClient();
  await supabase.from("crm_calls").delete().eq("id", callId);
  revalidatePath("/crm");
}

export async function quickCallStatus(callId: string, status: CrmCallStatus) {
  const supabase = await createClient();
  await supabase.from("crm_calls").update({ status }).eq("id", callId);
  revalidatePath("/crm");
}

export interface ImportRowPayload {
  name: string;
  whatsappDisplay: string | null;
  email: string | null;
  objetivo: string | null;
  faturamento: string | null;
  orcamento: string | null;
  meta3Meses: string | null;
  desafio: string | null;
  nivelDigital: string | null;
  tempoDia: string | null;
}

export type BulkImportResult =
  | { ok: true; inserted: number; updated: number }
  | { ok: false; error: string };

/**
 * Reimport de planilha (Marco 8 tinha deixado essa feature de fora
 * deliberadamente). Casa cada linha com um lead existente pelo mesmo
 * dedup_key usado em upsertLead (whatsapp normalizado, ou nome como
 * fallback) -- linhas repetidas dentro do proprio arquivo colapsam antes
 * de bater no banco, e linhas que já existem em crm_leads são
 * atualizadas em vez de duplicadas. Etapa/prioridade/responsavel/notas
 * de leads já existentes não são tocados: só os dados de qualificação e
 * contato vindos da planilha.
 */
export async function bulkImportLeads(companyId: string, rows: ImportRowPayload[]): Promise<BulkImportResult> {
  const supabase = await createClient();

  const { data: existing, error: fetchError } = await supabase
    .from("crm_leads")
    .select("id, dedup_key")
    .eq("company_id", companyId);
  if (fetchError) return { ok: false as const, error: fetchError.message };

  const existingByKey = new Map((existing || []).map((l) => [l.dedup_key as string, l.id as string]));

  const collapsed = new Map<string, ImportRowPayload>();
  for (const row of rows) {
    if (!row.name.trim()) continue;
    const dedupKey = normalizePhone(row.whatsappDisplay) || `name:${row.name.trim().toLowerCase()}`;
    collapsed.set(dedupKey, row);
  }

  const toInsert: Record<string, unknown>[] = [];
  const updates: { id: string; payload: Record<string, unknown> }[] = [];

  for (const [dedupKey, row] of collapsed) {
    const whatsapp = normalizePhone(row.whatsappDisplay);
    const scoreResult = computeScore({
      objetivo: row.objetivo,
      faturamento: row.faturamento,
      orcamento: row.orcamento,
      meta_3_meses: row.meta3Meses,
      desafio: row.desafio,
      nivel_digital: row.nivelDigital,
      tempo_dia: row.tempoDia,
    });

    const qualificationPayload = {
      name: row.name.trim(),
      whatsapp,
      whatsapp_display: row.whatsappDisplay,
      email: row.email,
      objetivo: row.objetivo,
      faturamento: row.faturamento,
      orcamento: row.orcamento,
      meta_3_meses: row.meta3Meses,
      desafio: row.desafio,
      nivel_digital: row.nivelDigital,
      tempo_dia: row.tempoDia,
      score: scoreResult.score,
    };

    const existingId = existingByKey.get(dedupKey);
    if (existingId) {
      updates.push({ id: existingId, payload: qualificationPayload });
    } else {
      toInsert.push({
        ...qualificationPayload,
        company_id: companyId,
        dedup_key: dedupKey,
        etapa: "Novo",
        prioridade: scoreResult.label,
        data_entrada: new Date().toISOString().slice(0, 10),
      });
    }
  }

  if (toInsert.length) {
    const { error } = await supabase.from("crm_leads").insert(toInsert);
    if (error) return { ok: false as const, error: error.message };
  }

  if (updates.length) {
    const results = await Promise.all(updates.map(({ id, payload }) => supabase.from("crm_leads").update(payload).eq("id", id)));
    const failed = results.find((r) => r.error);
    if (failed?.error) return { ok: false as const, error: failed.error.message };
  }

  revalidatePath("/crm");
  return { ok: true as const, inserted: toInsert.length, updated: updates.length };
}

export async function createCompany(name: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("crm_companies").insert({ name }).select().single();
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/crm");
  return { ok: true as const, id: data.id as string };
}
