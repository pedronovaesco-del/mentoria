import { normalizePhone } from "./scoring";

export interface ImportRow {
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

type ImportField = keyof ImportRow;

/**
 * Aceita tanto os nomes de coluna em portugues (form do CRM) quanto em
 * ingles (export direto da tabela quiz_leads do Supabase) -- é assim que
 * o usuario normalmente gera a planilha que reimporta aqui.
 */
const HEADER_ALIASES: Record<string, ImportField> = {
  nome: "name",
  name: "name",
  whatsapp: "whatsappDisplay",
  telefone: "whatsappDisplay",
  celular: "whatsappDisplay",
  fone: "whatsappDisplay",
  phone: "whatsappDisplay",
  email: "email",
  objetivo: "objetivo",
  goal: "objetivo",
  faturamento: "faturamento",
  revenue: "faturamento",
  orcamento: "orcamento",
  budget: "orcamento",
  meta: "meta3Meses",
  meta3meses: "meta3Meses",
  target: "meta3Meses",
  desafio: "desafio",
  challenge: "desafio",
  nivel: "nivelDigital",
  niveldigital: "nivelDigital",
  digitallevel: "nivelDigital",
  tempo: "tempoDia",
  tempodia: "tempoDia",
  time: "tempoDia",
};

function normalizeHeader(header: string): string {
  return header
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function detectFieldForHeader(header: string): ImportField | null {
  return HEADER_ALIASES[normalizeHeader(header)] ?? null;
}

/** Converte as linhas cruas do CSV (header: true no papaparse) em ImportRow tipado. */
export function mapCsvRows(rows: Record<string, string>[], headers: string[]): ImportRow[] {
  const fieldByHeader = headers.map((h) => [h, detectFieldForHeader(h)] as const);

  return rows.map((raw) => {
    const partial: Partial<Record<ImportField, string>> = {};
    for (const [header, field] of fieldByHeader) {
      if (!field) continue;
      const value = (raw[header] ?? "").toString().trim();
      if (value) partial[field] = value;
    }
    return {
      name: partial.name || "",
      whatsappDisplay: partial.whatsappDisplay || null,
      email: partial.email || null,
      objetivo: partial.objetivo || null,
      faturamento: partial.faturamento || null,
      orcamento: partial.orcamento || null,
      meta3Meses: partial.meta3Meses || null,
      desafio: partial.desafio || null,
      nivelDigital: partial.nivelDigital || null,
      tempoDia: partial.tempoDia || null,
    };
  });
}

/** Mesma regra usada em upsertLead/bulkImportLeads: telefone normalizado,
 * ou nome em minúsculo como fallback -- garante que a mesma pessoa nunca
 * vire duas linhas em crm_leads. */
export function computeDedupKey(whatsappDisplay: string | null, name: string): string {
  const digits = normalizePhone(whatsappDisplay);
  return digits || `name:${name.trim().toLowerCase()}`;
}
