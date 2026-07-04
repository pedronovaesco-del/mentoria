"use client";

import { daysAgo, prioClass, timeAgoLabel } from "@/lib/crm/scoring";
import type { CrmLead } from "@/types/database";

const PRIO_STYLES: Record<string, string> = {
  alta: "border-danger/25 bg-danger/12 text-[#FCA5A5]",
  media: "border-[#F59E0B]/25 bg-[#F59E0B]/12 text-[#FCD34D]",
  baixa: "border-blue/25 bg-blue/12 text-blue-light",
  incompleto: "border-white/15 bg-white/8 text-white/50",
};

interface Props {
  lead: CrmLead;
  onOpen: () => void;
  onLogFollowup: (type: "contact" | "followup") => void;
  onToggleEmail: () => void;
  onScheduleCall: () => void;
}

export function LeadCard({ lead, onOpen, onLogFollowup, onToggleEmail, onScheduleCall }: Props) {
  const chips = [lead.objetivo, lead.faturamento, lead.orcamento && `Invest: ${lead.orcamento}`, lead.desafio, lead.tempo_dia].filter(
    Boolean
  ) as string[];

  const entradaLbl = timeAgoLabel(lead.data_entrada || lead.created_at);
  const firstContactLbl = lead.first_contact_at ? timeAgoLabel(lead.first_contact_at) : null;
  const lastFollowupLbl = lead.last_followup_at ? timeAgoLabel(lead.last_followup_at) : null;
  const staleDays = daysAgo(lead.last_followup_at || lead.first_contact_at || lead.data_entrada || lead.created_at);
  const staleWarn = staleDays !== null && staleDays > 7;

  return (
    <div
      onClick={onOpen}
      className="cursor-pointer rounded-lg border border-white/8 bg-white/3 p-4 transition-colors hover:border-blue/25"
    >
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className={`rounded-pill border px-2.5 py-0.5 text-[11px] font-bold ${PRIO_STYLES[prioClass(lead.prioridade)]}`}>
          {lead.prioridade || "⚪ Incompleto"}
        </span>
        {lead.score != null && <span className="text-[11px] font-semibold text-white/40">Score {lead.score}</span>}
        <span className="ml-auto rounded-sm border border-white/10 bg-white/6 px-2 py-0.5 text-[11px] font-semibold text-white/55">
          {lead.etapa}
        </span>
      </div>

      <div className="mb-2 font-grotesk text-base font-bold">{lead.name}</div>

      <div className="mb-3 flex flex-wrap gap-2">
        {lead.whatsapp ? (
          <a
            href={`https://wa.me/${lead.whatsapp}`}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="rounded-sm border border-success/25 bg-success/10 px-2.5 py-1 text-xs font-semibold text-[#6EE7B7] no-underline"
          >
            📱 WhatsApp
          </a>
        ) : (
          <span className="rounded-sm border border-white/8 bg-white/4 px-2.5 py-1 text-xs text-white/30">📱 Sem WhatsApp</span>
        )}
        {lead.email ? (
          <a
            href={`mailto:${lead.email}`}
            onClick={(e) => e.stopPropagation()}
            className="rounded-sm border border-blue/22 bg-blue/10 px-2.5 py-1 text-xs font-semibold text-blue-light no-underline"
          >
            ✉️ E-mail
          </a>
        ) : (
          <span className="rounded-sm border border-white/8 bg-white/4 px-2.5 py-1 text-xs text-white/30">✉️ Sem e-mail</span>
        )}
      </div>

      {chips.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <span key={c} className="rounded-sm border border-white/8 bg-white/5 px-2 py-0.5 text-[11px] text-white/55">
              {c}
            </span>
          ))}
        </div>
      )}

      <div className="mb-3 flex flex-col gap-1 text-[12px]">
        <div className="text-white/40">⏱️ Entrou {entradaLbl || "—"}</div>
        <div className={firstContactLbl ? "text-[#6EE7B7]" : "text-[#FCA5A5]"}>
          📞 {firstContactLbl ? `Primeiro contato ${firstContactLbl}` : "Ainda não contatado"}
        </div>
        <div className={staleWarn ? "text-[#FCA5A5]" : lastFollowupLbl ? "text-[#6EE7B7]" : "text-white/40"}>
          🔁 {lastFollowupLbl ? `Último follow-up ${lastFollowupLbl}` : "Sem follow-up registrado"}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-white/6 pt-3">
        <MiniBtn onClick={() => onLogFollowup("contact")}>📞 Registrar contato</MiniBtn>
        <MiniBtn onClick={() => onLogFollowup("followup")}>🔁 Follow-up</MiniBtn>
        <MiniBtn onClick={onToggleEmail} on={lead.received_email_marketing}>
          ✉️ {lead.received_email_marketing ? "E-mail enviado" : "Marcar e-mail"}
        </MiniBtn>
        <MiniBtn onClick={onScheduleCall}>📅 Agendar call</MiniBtn>
      </div>
    </div>
  );
}

function MiniBtn({ children, onClick, on }: { children: React.ReactNode; onClick: () => void; on?: boolean }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`rounded-sm border px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
        on ? "border-success/30 bg-success/15 text-[#6EE7B7]" : "border-white/9 bg-white/5 text-white/55 hover:border-white/20 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
