"use client";

import { useMemo, useState } from "react";
import { deleteCall, upsertCall } from "@/lib/actions/crm";
import type { CrmCall, CrmCallStatus, CrmLead } from "@/types/database";

const STATUSES: CrmCallStatus[] = ["Agendada", "Realizada", "Cancelada", "Não compareceu"];

function toDatetimeLocalValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface Props {
  call: CrmCall | null;
  leads: CrmLead[];
  companyId: string;
  defaultLeadId: string | null;
  closers: string[];
  onClose: () => void;
  onSaved: () => void;
}

export function CallScheduleModal({ call, leads, companyId, defaultLeadId, closers, onClose, onSaved }: Props) {
  const initialLead = call ? leads.find((l) => l.id === call.lead_id) : defaultLeadId ? leads.find((l) => l.id === defaultLeadId) : null;

  const [leadSearch, setLeadSearch] = useState(initialLead ? `${initialLead.name} — ${initialLead.whatsapp_display || "sem WhatsApp"}` : "");
  const [leadId, setLeadId] = useState<string | null>(initialLead?.id ?? null);
  const [closer, setCloser] = useState(call?.closer || "");
  const [status, setStatus] = useState<CrmCallStatus>(call?.status || "Agendada");
  const [notes, setNotes] = useState(call?.notes || "");
  const [datetime, setDatetime] = useState(() => {
    if (call) return toDatetimeLocalValue(new Date(call.scheduled_at));
    const d = new Date();
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() + 1);
    return toDatetimeLocalValue(d);
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const leadLookup = useMemo(() => {
    const map = new Map<string, string>();
    leads.forEach((l) => map.set(`${l.name} — ${l.whatsapp_display || "sem WhatsApp"}`, l.id));
    return map;
  }, [leads]);

  function handleLeadInput(value: string) {
    setLeadSearch(value);
    setLeadId(leadLookup.get(value) ?? null);
  }

  async function handleSave() {
    if (!leadId) {
      setError("Selecione um lead válido da lista de sugestões.");
      return;
    }
    if (!closer.trim()) {
      setError("Informe o closer responsável.");
      return;
    }
    setSaving(true);
    const result = await upsertCall(call?.id ?? null, {
      companyId,
      leadId,
      closer: closer.trim(),
      scheduledAt: new Date(datetime).toISOString(),
      status,
      notes: notes.trim() || null,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSaved();
  }

  async function handleDelete() {
    if (!call) return;
    if (!confirm("Excluir este agendamento?")) return;
    await deleteCall(call.id);
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/78 p-5 backdrop-blur-md" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-[480px] rounded-lg border border-white/10 bg-[#0b0b10]">
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <span className="font-grotesk text-base font-bold">{call ? "Editar agendamento" : "Agendar call"}</span>
          <button onClick={onClose} className="text-xl text-white/40 hover:text-white">
            ×
          </button>
        </div>
        <div className="flex flex-col gap-3.5 px-6 py-5">
          {error && <div className="rounded-sm border border-danger/25 bg-danger/10 p-3 text-[13px] text-[#FCA5A5]">{error}</div>}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.6px] text-white/38">Lead</label>
            <input
              value={leadSearch}
              onChange={(e) => handleLeadInput(e.target.value)}
              placeholder="Digite o nome do lead…"
              list="crm-call-lead-list"
              className={inputClass}
            />
            <datalist id="crm-call-lead-list">
              {leads.map((l) => (
                <option key={l.id} value={`${l.name} — ${l.whatsapp_display || "sem WhatsApp"}`} />
              ))}
            </datalist>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.6px] text-white/38">Closer responsável</label>
            <input value={closer} onChange={(e) => setCloser(e.target.value)} placeholder="Nome do closer" list="crm-closer-list" className={inputClass} />
            <datalist id="crm-closer-list">
              {closers.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.6px] text-white/38">Data e horário (horário de Brasília)</label>
            <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.6px] text-white/38">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as CrmCallStatus)} className={inputClass}>
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.6px] text-white/38">Notas</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={inputClass} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2.5 border-t border-white/8 px-6 py-4">
          {call && (
            <button onClick={handleDelete} className="mr-auto rounded-pill border border-danger/30 px-4 py-2 text-sm font-semibold text-[#FCA5A5]">
              Excluir
            </button>
          )}
          <button onClick={onClose} className="rounded-pill border border-white/12 px-4 py-2 text-sm font-semibold text-white/60">
            Cancelar
          </button>
          <button onClick={handleSave} disabled={saving} className="rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-5 py-2 text-sm font-bold text-white disabled:opacity-40">
            {saving ? "Salvando…" : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputClass = "w-full rounded-sm border border-white/11 bg-white/6 px-3.5 py-2.5 text-sm text-white outline-none focus:border-blue/50";
