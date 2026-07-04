"use client";

import { useMemo } from "react";
import { quickCallStatus } from "@/lib/actions/crm";
import type { CrmCall, CrmCallStatus, CrmLead } from "@/types/database";

type CallWithLead = CrmCall & { lead: Pick<CrmLead, "id" | "name" | "whatsapp" | "whatsapp_display" | "email"> | null };

const STATUS_STYLE: Record<CrmCallStatus, string> = {
  Agendada: "border-blue/25 bg-blue/12 text-blue-light",
  Realizada: "border-success/25 bg-success/12 text-[#6EE7B7]",
  Cancelada: "border-white/15 bg-white/8 text-white/45",
  "Não compareceu": "border-danger/25 bg-danger/12 text-[#FCA5A5]",
};

function brazilDateKey(d: Date) {
  return d.toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
}
function fmtBrazilDate(d: Date) {
  return d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric" });
}
function fmtBrazilTime(d: Date) {
  return d.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" });
}
function fmtBrazilWeekday(d: Date) {
  const s = d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function CallsList({ calls, onOpen }: { calls: CallWithLead[]; onOpen: (call: CrmCall) => void }) {
  const { todayKey, tomorrowKey, groups, sortedKeys } = useMemo(() => {
    const now = new Date();
    const groups = new Map<string, CallWithLead[]>();
    for (const c of calls) {
      const key = brazilDateKey(new Date(c.scheduled_at));
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(c);
    }
    return {
      todayKey: brazilDateKey(now),
      tomorrowKey: brazilDateKey(new Date(now.getTime() + 86400000)),
      groups,
      sortedKeys: [...groups.keys()].sort(),
    };
  }, [calls]);

  if (!calls.length) {
    return (
      <div className="py-16 text-center text-white/25">
        <div className="text-4xl">📅</div>
        <p className="mt-3 text-[15px]">Nenhuma call agendada com esses filtros.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {sortedKeys.map((key) => {
        const group = groups.get(key)!;
        const sampleDate = new Date(group[0].scheduled_at);
        const label =
          key === todayKey
            ? `Hoje · ${fmtBrazilDate(sampleDate)}`
            : key === tomorrowKey
              ? `Amanhã · ${fmtBrazilDate(sampleDate)}`
              : `${fmtBrazilWeekday(sampleDate)} · ${fmtBrazilDate(sampleDate)}`;

        return (
          <div key={key}>
            <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.8px] text-white/35">{label}</div>
            <div className="flex flex-col gap-2">
              {group.map((c) => {
                const d = new Date(c.scheduled_at);
                const isLate = d.getTime() < Date.now() && c.status === "Agendada";
                return (
                  <div
                    key={c.id}
                    onClick={() => onOpen(c)}
                    className={`flex cursor-pointer flex-wrap items-center gap-3 rounded-md border p-4 transition-colors hover:border-blue/25 ${
                      isLate ? "border-danger/25 bg-danger/5" : "border-white/8 bg-white/3"
                    }`}
                  >
                    <div className="font-grotesk text-base font-bold text-blue-light">{fmtBrazilTime(d)}</div>
                    <div className="min-w-[160px] flex-1">
                      <div className="font-grotesk text-sm font-bold">{c.lead?.name || "Lead removido"}</div>
                      <div className="text-xs text-white/40">
                        Closer: {c.closer}
                        {isLate ? " · atrasada" : ""}
                      </div>
                    </div>
                    <span className={`rounded-pill border px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLE[c.status]}`}>{c.status}</span>
                    <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {c.lead?.whatsapp && (
                        <a
                          href={`https://wa.me/${c.lead.whatsapp}`}
                          target="_blank"
                          rel="noopener"
                          className="rounded-sm border border-success/25 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-[#6EE7B7] no-underline"
                        >
                          📱 WhatsApp
                        </a>
                      )}
                      {c.status === "Agendada" && (
                        <button
                          onClick={() => quickCallStatus(c.id, "Realizada")}
                          className="rounded-sm border border-success/30 bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-[#6EE7B7]"
                        >
                          ✓ Realizada
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
