import type { CrmLead, CrmPrioridade } from "@/types/database";

export function parseMoneyMax(str: string | null | undefined): number {
  if (!str) return 0;
  const s = String(str).toLowerCase();
  const re = /(\d+(?:\.\d{3})*(?:,\d+)?)\s*(k|mil)?/g;
  let max = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    const numStr = m[1].replace(/\./g, "").replace(",", ".");
    let num = parseFloat(numStr);
    if (isNaN(num)) continue;
    if (m[2] === "k" || m[2] === "mil") num *= 1000;
    if (num > max) max = num;
  }
  return max;
}

export function timeScore(str: string | null | undefined): number {
  if (!str) return 40;
  const s = String(str).toLowerCase();
  if (s.includes("<2") || s.includes("menos de 2")) return 20;
  if (s.includes("2") && (s.includes("6") || s.includes("a 6"))) return 50;
  if (s.includes("6") && s.includes("10")) return 75;
  if (s.includes("10") || s.includes("integral")) return 100;
  return 40;
}

export interface ScoreResult {
  score: number | null;
  label: CrmPrioridade;
  filled: number;
  budgetScore: number | null;
  tScore: number | null;
}

export function computeScore(
  lead: Pick<CrmLead, "objetivo" | "faturamento" | "orcamento" | "meta_3_meses" | "desafio" | "nivel_digital" | "tempo_dia">
): ScoreResult {
  const fields = [lead.objetivo, lead.faturamento, lead.orcamento, lead.meta_3_meses, lead.desafio, lead.nivel_digital, lead.tempo_dia];
  const filled = fields.filter((f) => f && String(f).trim()).length;

  if (filled === 0) {
    return { score: null, label: "⚪ Incompleto", filled, budgetScore: null, tScore: null };
  }

  const budgetMax = parseMoneyMax(lead.orcamento);
  const b = lead.orcamento ? Math.min(100, Math.round((budgetMax / 10000) * 100)) : 40;
  const t = timeScore(lead.tempo_dia);
  const score = Math.round(b * 0.6 + t * 0.4);

  let label: CrmPrioridade;
  if (score >= 70) label = "🔥 Alta";
  else if (score >= 40) label = "🟡 Média";
  else label = "🔵 Baixa";

  return { score, label, filled, budgetScore: b, tScore: t };
}

export function prioClass(p: string | null | undefined): "alta" | "media" | "baixa" | "incompleto" {
  if (!p) return "incompleto";
  if (p.includes("Alta")) return "alta";
  if (p.includes("Média")) return "media";
  if (p.includes("Baixa")) return "baixa";
  return "incompleto";
}

export function daysAgo(dateStr: string | null | undefined): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

export function timeAgoLabel(dateStr: string | null | undefined): string | null {
  const d = daysAgo(dateStr);
  if (d === null) return null;
  if (d <= 0) return "hoje";
  if (d === 1) return "há 1 dia";
  return `há ${d} dias`;
}

export function normalizePhone(str: string | null | undefined): string | null {
  if (!str) return null;
  const digits = String(str).replace(/\D/g, "");
  return digits || null;
}
