"use client";

import { useEffect, useState } from "react";
import { deleteCrmLead, upsertLead } from "@/lib/actions/crm";
import { computeScore } from "@/lib/crm/scoring";
import type { CrmCompany, CrmEtapa, CrmFollowup, CrmLead, CrmPrioridade } from "@/types/database";

const ETAPAS: CrmEtapa[] = [
  "Novo",
  "Contatado",
  "Call Agendada",
  "Call Realizada",
  "Proposta Enviada",
  "Negociação",
  "Fechado",
  "Perdido",
];
const PRIORIDADES: CrmPrioridade[] = ["🔥 Alta", "🟡 Média", "🔵 Baixa", "⚪ Incompleto"];

const TYPE_LABEL: Record<string, string> = {
  contact: "📞 Contato",
  followup: "🔁 Follow-up",
  email_marketing: "✉️ E-mail marketing enviado",
  note: "📝 Nota",
  status_change: "🔀 Mudança de etapa",
};

interface Props {
  lead: CrmLead | null;
  companies: CrmCompany[];
  defaultCompanyId: string | null;
  followups: CrmFollowup[];
  onClose: () => void;
  onSaved: () => void;
}

export function LeadFormModal({ lead, companies, defaultCompanyId, followups, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    companyId: lead?.company_id || defaultCompanyId || "",
    name: lead?.name || "",
    whatsapp: lead?.whatsapp_display || "",
    email: lead?.email || "",
    objetivo: lead?.objetivo || "",
    faturamento: lead?.faturamento || "",
    orcamento: lead?.orcamento || "",
    meta: lead?.meta_3_meses || "",
    desafio: lead?.desafio || "",
    nivel: lead?.nivel_digital || "",
    tempo: lead?.tempo_dia || "",
    etapa: (lead?.etapa || "Novo") as CrmEtapa,
    prioridade: (lead?.prioridade || "⚪ Incompleto") as CrmPrioridade,
    dataEntrada: lead?.data_entrada || "",
    dataCall: lead?.data_call || "",
    proximo: lead?.proximo_passo || "",
    responsavel: lead?.responsavel || "",
    resultado: lead?.resultado || "",
    notas: lead?.notas || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const score = lead ? computeScore(lead) : null;

  async function handleSave() {
    if (!form.name.trim()) {
      setError("Informe o nome do lead.");
      return;
    }
    setSaving(true);
    const result = await upsertLead(lead?.id ?? null, {
      companyId: form.companyId,
      name: form.name.trim(),
      whatsappDisplay: form.whatsapp.trim() || null,
      email: form.email.trim() || null,
      objetivo: form.objetivo.trim() || null,
      faturamento: form.faturamento.trim() || null,
      orcamento: form.orcamento.trim() || null,
      meta3Meses: form.meta.trim() || null,
      desafio: form.desafio.trim() || null,
      nivelDigital: form.nivel.trim() || null,
      tempoDia: form.tempo.trim() || null,
      etapa: form.etapa,
      prioridade: form.prioridade,
      dataEntrada: form.dataEntrada || null,
      dataCall: form.dataCall || null,
      proximoPasso: form.proximo.trim() || null,
      responsavel: form.responsavel.trim() || null,
      resultado: form.resultado.trim() || null,
      notas: form.notas.trim() || null,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSaved();
  }

  async function handleDelete() {
    if (!lead) return;
    if (!confirm("Tem certeza que deseja excluir este lead? Essa ação não pode ser desfeita.")) return;
    await deleteCrmLead(lead.id);
    onSaved();
  }

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-black/78 p-5 backdrop-blur-md" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="my-8 w-full max-w-[620px] rounded-lg border border-white/10 bg-[#0b0b10]">
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <span className="font-grotesk text-base font-bold">{lead ? "Editar lead" : "Novo lead"}</span>
          <button onClick={onClose} className="text-xl text-white/40 hover:text-white">
            ×
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {error && <div className="mb-4 rounded-sm border border-danger/25 bg-danger/10 p-3 text-[13px] text-[#FCA5A5]">{error}</div>}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Nome">
              <Input value={form.name} onChange={(v) => set("name", v)} />
            </Field>
            <Field label="WhatsApp">
              <Input value={form.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="+55 11 99999-9999" />
            </Field>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="E-mail">
              <Input value={form.email} onChange={(v) => set("email", v)} placeholder="lead@email.com" />
            </Field>
            <Field label="Empresa">
              <Select value={form.companyId} onChange={(v) => set("companyId", v)}>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <SectionLbl>Qualificação (7 perguntas)</SectionLbl>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Objetivo principal agora">
              <Input value={form.objetivo} onChange={(v) => set("objetivo", v)} />
            </Field>
            <Field label="Faturamento mensal aproximado">
              <Input value={form.faturamento} onChange={(v) => set("faturamento", v)} />
            </Field>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Disponível p/ investir agora">
              <Input value={form.orcamento} onChange={(v) => set("orcamento", v)} />
            </Field>
            <Field label="Meta de faturamento (3 meses)">
              <Input value={form.meta} onChange={(v) => set("meta", v)} />
            </Field>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Maior desafio hoje">
              <Input value={form.desafio} onChange={(v) => set("desafio", v)} />
            </Field>
            <Field label="Nível de conhecimento digital">
              <Input value={form.nivel} onChange={(v) => set("nivel", v)} />
            </Field>
          </div>
          <div className="mt-3">
            <Field label="Tempo dedicado ao negócio/dia">
              <Input value={form.tempo} onChange={(v) => set("tempo", v)} />
            </Field>
          </div>

          <SectionLbl>Pipeline</SectionLbl>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Etapa">
              <Select value={form.etapa} onChange={(v) => set("etapa", v as CrmEtapa)}>
                {ETAPAS.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </Select>
            </Field>
            <Field label="Prioridade">
              <Select value={form.prioridade} onChange={(v) => set("prioridade", v as CrmPrioridade)}>
                {PRIORIDADES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Data entrada do lead">
              <Input type="date" value={form.dataEntrada} onChange={(v) => set("dataEntrada", v)} />
            </Field>
            <Field label="Data da call">
              <Input type="date" value={form.dataCall} onChange={(v) => set("dataCall", v)} />
            </Field>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Próximo passo">
              <Input value={form.proximo} onChange={(v) => set("proximo", v)} />
            </Field>
            <Field label="Responsável">
              <Input value={form.responsavel} onChange={(v) => set("responsavel", v)} />
            </Field>
          </div>
          <div className="mt-3">
            <Field label="Resultado">
              <Input value={form.resultado} onChange={(v) => set("resultado", v)} />
            </Field>
          </div>
          <div className="mt-3">
            <Field label="Notas">
              <textarea
                value={form.notas}
                onChange={(e) => set("notas", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </Field>
          </div>

          {score && (
            <div className="mt-4 rounded-sm border border-blue/20 bg-blue/6 p-3.5 text-[13px] leading-[1.6] text-white/65">
              📊 <strong className="text-white">Score calculado: {score.score ?? "—"}/100</strong>
              <br />
              Orçamento: {score.budgetScore ?? "—"} · Tempo disponível: {score.tScore ?? "—"} · Perguntas respondidas: {score.filled}/7
              <br />A prioridade acima pode ser ajustada manualmente e sempre prevalece sobre o score.
            </div>
          )}

          {lead && (
            <>
              <SectionLbl>Rastreio de contato</SectionLbl>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Primeiro contato">
                  <Input disabled value={lead.first_contact_at ? new Date(lead.first_contact_at).toLocaleString("pt-BR") : "Ainda não contatado"} onChange={() => {}} />
                </Field>
                <Field label="Último follow-up">
                  <Input disabled value={lead.last_followup_at ? new Date(lead.last_followup_at).toLocaleString("pt-BR") : "Nenhum registrado"} onChange={() => {}} />
                </Field>
              </div>

              <SectionLbl>Histórico</SectionLbl>
              <div className="flex flex-col gap-2">
                {followups.length ? (
                  followups.map((f) => (
                    <div key={f.id} className="flex gap-2.5 text-[13px] text-white/60">
                      <span className="text-white/35">{new Date(f.created_at).toLocaleDateString("pt-BR")}</span>
                      <span>
                        {TYPE_LABEL[f.type] || f.type}
                        {f.notes ? ` — ${f.notes}` : ""}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-[13px] text-white/35">Nenhum evento registrado ainda.</div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 border-t border-white/8 px-6 py-4">
          {lead && (
            <button onClick={handleDelete} className="mr-auto rounded-pill border border-danger/30 px-4 py-2 text-sm font-semibold text-[#FCA5A5]">
              Excluir lead
            </button>
          )}
          <button onClick={onClose} className="rounded-pill border border-white/12 px-4 py-2 text-sm font-semibold text-white/60">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-5 py-2 text-sm font-bold text-white disabled:opacity-40"
          >
            {saving ? "Salvando…" : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputClass = "w-full rounded-sm border border-white/11 bg-white/6 px-3.5 py-2.5 text-sm text-white outline-none focus:border-blue/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-[0.6px] text-white/38">{label}</label>
      {children}
    </div>
  );
}
function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${inputClass} disabled:opacity-50`}
    />
  );
}
function Select({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
      {children}
    </select>
  );
}
function SectionLbl({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.8px] text-blue-light">{children}</div>;
}
