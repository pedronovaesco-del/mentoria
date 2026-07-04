/**
 * Tipos manuais batendo com files/schema.sql e files/crm/schema.sql
 * coluna a coluna. Sem codegen porque o schema é fixo e não muda
 * durante esta migração.
 */

// ── schema.sql ──────────────────────────────────────────────

export type QuizStatus = "lead" | "quiz_completed";

export interface QuizLead {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  goal: string | null;
  revenue: string | null;
  budget: string | null;
  target: string | null;
  challenge: string | null;
  digital_level: string | null;
  time: string | null;
  niche: string | null;
  source: string | null;
  status: QuizStatus;
}

export interface Professional {
  id: string;
  created_at: string;
  name: string | null;
  niche: string | null;
  credits: number;
}

export interface LeadPurchase {
  id: string;
  created_at: string;
  professional_id: string;
  lead_id: string;
}

/** View professional_leads -- único caminho de leitura seguro para
 * profissionais autenticados. Mascara nome/telefone/e-mail quando
 * o lead ainda não foi comprado (purchased === false). NUNCA ler
 * a tabela quiz_leads diretamente a partir do lado "professional". */
export interface ProfessionalLeadView {
  id: string;
  created_at: string;
  goal: string | null;
  revenue: string | null;
  budget: string | null;
  target: string | null;
  challenge: string | null;
  digital_level: string | null;
  time: string | null;
  niche: string | null;
  status: QuizStatus;
  name: string | null;
  phone: string | null;
  email: string | null;
  purchased: boolean;
}

export type BuyLeadResult =
  | { success: true }
  | {
      error: "professional_not_found" | "insufficient_credits" | "already_purchased";
    };

// ── crm/schema.sql ──────────────────────────────────────────

export interface CrmCompany {
  id: string;
  created_at: string;
  name: string;
}

export type CrmEtapa =
  | "Novo"
  | "Contatado"
  | "Call Agendada"
  | "Call Realizada"
  | "Proposta Enviada"
  | "Negociação"
  | "Fechado"
  | "Perdido";

export type CrmPrioridade = "🔥 Alta" | "🟡 Média" | "🔵 Baixa" | "⚪ Incompleto";

export interface CrmLead {
  id: string;
  company_id: string;
  name: string;
  whatsapp: string | null;
  whatsapp_display: string | null;
  email: string | null;
  objetivo: string | null;
  faturamento: string | null;
  orcamento: string | null;
  meta_3_meses: string | null;
  desafio: string | null;
  nivel_digital: string | null;
  tempo_dia: string | null;
  etapa: CrmEtapa;
  prioridade: CrmPrioridade;
  score: number | null;
  data_entrada: string | null;
  data_call: string | null;
  resultado: string | null;
  proximo_passo: string | null;
  responsavel: string | null;
  notas: string | null;
  first_contact_at: string | null;
  last_followup_at: string | null;
  received_email_marketing: boolean;
  email_marketing_at: string | null;
  dedup_key: string;
  created_at: string;
  updated_at: string;
}

export type CrmFollowupType =
  | "contact"
  | "followup"
  | "email_marketing"
  | "note"
  | "status_change";

export interface CrmFollowup {
  id: string;
  lead_id: string;
  type: CrmFollowupType;
  notes: string | null;
  created_at: string;
}

export type CrmCallStatus =
  | "Agendada"
  | "Realizada"
  | "Cancelada"
  | "Não compareceu";

export interface CrmCall {
  id: string;
  company_id: string;
  lead_id: string;
  closer: string;
  scheduled_at: string;
  status: CrmCallStatus;
  notes: string | null;
  created_at: string;
}
