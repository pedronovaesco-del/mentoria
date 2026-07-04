"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { buyLead } from "@/lib/actions/marketplace";
import type { ProfessionalLeadView } from "@/types/database";

const NICHES = [
  "Todos",
  "Marketing Digital",
  "Tráfego Pago",
  "Copywriting & Funis",
  "E-commerce",
  "Infoprodutos & Cursos",
  "Social Media",
  "Consultoria de Negócios",
  "Vendas & Comercial",
];

interface Props {
  leads: ProfessionalLeadView[];
  credits: number;
  defaultNiche: string;
}

export function LeadMarketplace({ leads, credits, defaultNiche }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<"available" | "mine">("available");
  const [filter, setFilter] = useState(NICHES.includes(defaultNiche) ? defaultNiche : "Todos");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "Todos" ? leads : leads.filter((l) => l.niche === filter)),
    [leads, filter]
  );
  const available = filtered.filter((l) => !l.purchased);
  const mine = leads.filter((l) => l.purchased);

  function handleUnlock(leadId: string) {
    if (credits < 1) {
      setToast({ msg: "Créditos insuficientes. Compre mais créditos.", ok: false });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setPendingId(leadId);
    startTransition(async () => {
      const result = await buyLead(leadId);
      if ("error" in result) {
        const msg =
          result.error === "insufficient_credits"
            ? "Créditos insuficientes."
            : result.error === "already_purchased"
              ? "Lead já desbloqueado."
              : "Erro ao desbloquear. Tente novamente.";
        setToast({ msg, ok: false });
      } else {
        setToast({ msg: "Lead desbloqueado com sucesso!", ok: true });
        router.refresh();
      }
      setPendingId(null);
      setTimeout(() => setToast(null), 3000);
    });
  }

  return (
    <div className="mx-auto max-w-(--container-w) px-6 py-8">
      <div className="mb-7 flex gap-0 border-b border-white/7">
        {(["available", "mine"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-5 py-3 font-grotesk text-sm font-bold transition-colors ${
              tab === t ? "border-blue text-white" : "border-transparent text-white/35"
            }`}
          >
            {t === "available" ? "Leads disponíveis" : "Meus leads"}
          </button>
        ))}
      </div>

      {tab === "available" ? (
        <>
          <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
            <span className="font-grotesk text-lg font-bold">Leads qualificados</span>
            <span className="text-[13px] text-white/35">{available.length} leads disponíveis</span>
          </div>
          <div className="mb-7 flex flex-wrap gap-2">
            {NICHES.map((n) => (
              <button
                key={n}
                onClick={() => setFilter(n)}
                className={`whitespace-nowrap rounded-pill border px-4 py-1.5 font-grotesk text-[13px] font-semibold transition-colors ${
                  filter === n ? "border-blue/50 bg-blue/10 text-white" : "border-white/9 bg-white/3 text-white/50 hover:text-white/80"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          {available.length === 0 ? (
            <div className="py-16 text-center text-white/25">
              <div className="text-4xl">🔍</div>
              <p className="mt-3 text-[15px]">Nenhum lead disponível neste nicho.</p>
            </div>
          ) : (
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))" }}>
              {available.map((l) => (
                <LeadCard
                  key={l.id}
                  lead={l}
                  onUnlock={() => handleUnlock(l.id)}
                  pending={isPending && pendingId === l.id}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
            <span className="font-grotesk text-lg font-bold">Leads desbloqueados</span>
            <span className="text-[13px] text-white/35">{mine.length} leads desbloqueados</span>
          </div>
          {mine.length === 0 ? (
            <div className="py-16 text-center text-white/25">
              <div className="text-4xl">🔓</div>
              <p className="mt-3 text-[15px]">Você ainda não desbloqueou nenhum lead.</p>
            </div>
          ) : (
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))" }}>
              {mine.map((l) => (
                <LeadCard key={l.id} lead={l} onUnlock={() => {}} pending={false} />
              ))}
            </div>
          )}
        </>
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-md px-[18px] py-3 font-grotesk text-[13px] font-semibold ${
            toast.ok ? "bg-[#064E3B] border border-success/30 text-[#6EE7B7]" : "bg-[#450A0A] border border-danger/30 text-[#FCA5A5]"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function LeadCard({
  lead,
  onUnlock,
  pending,
}: {
  lead: ProfessionalLeadView;
  onUnlock: () => void;
  pending: boolean;
}) {
  const date = new Date(lead.created_at).toLocaleDateString("pt-BR");
  return (
    <div
      className={`relative overflow-hidden rounded-lg border bg-white/3 transition-colors ${
        lead.purchased ? "border-success/20" : "border-white/8 hover:border-blue/25"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/5 px-[18px] pb-3 pt-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/35">{lead.niche || "Geral"}</span>
        {lead.purchased ? (
          <span className="rounded-pill border border-success/25 bg-success/10 px-2.5 py-0.5 text-[11px] font-bold text-[#6EE7B7]">
            ✓ Desbloqueado
          </span>
        ) : (
          <span className="rounded-pill border border-blue/25 bg-blue/12 px-2.5 py-0.5 text-[11px] font-bold text-blue-light">
            Disponível
          </span>
        )}
      </div>
      <div className="p-[18px]">
        <div className="mb-4 flex flex-col gap-1">
          {lead.purchased ? (
            <span className="font-grotesk text-base font-bold">{lead.name || "—"}</span>
          ) : (
            <span className="select-none font-grotesk text-base font-bold text-white/50 blur-[5px]">●●●●● ●●●●●●●</span>
          )}
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            📱 {lead.purchased ? lead.phone || "—" : <span className="select-none blur-[5px]">+55 ●●●●●-●●●●</span>}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            ✉️ {lead.purchased ? lead.email || "—" : <span className="select-none blur-[5px]">●●●●@●●●●●.com</span>}
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {lead.goal && <Chip color="blue">{lead.goal}</Chip>}
          {lead.revenue && <Chip color="green">{lead.revenue}</Chip>}
          {lead.budget && <Chip color="amber">Invest: {lead.budget}</Chip>}
          {lead.challenge && <Chip color="red">{lead.challenge}</Chip>}
          {lead.digital_level && <Chip>{lead.digital_level}</Chip>}
          {lead.time && <Chip>⏰ {lead.time}</Chip>}
        </div>
        <div className="flex items-center justify-between gap-2.5 border-t border-white/5 pt-3">
          <span className="text-[11px] text-white/25">{date}</span>
          {lead.purchased ? (
            <span className="rounded-pill border border-success/25 bg-success/10 px-4 py-2 text-[13px] font-bold text-[#34D399]">
              ✓ Desbloqueado
            </span>
          ) : (
            <button
              onClick={onUnlock}
              disabled={pending}
              className="whitespace-nowrap rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-4 py-2 font-grotesk text-[13px] font-bold text-white shadow-[0_3px_0_var(--blue-dark)] transition-transform hover:-translate-y-0.5 disabled:opacity-35"
            >
              {pending ? "Desbloqueando…" : "🔓 Desbloquear · 1 crédito"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ children, color }: { children: React.ReactNode; color?: "blue" | "green" | "amber" | "red" }) {
  const colors = {
    blue: "border-blue/20 bg-blue/6 text-blue-light",
    green: "border-success/20 bg-success/6 text-[#6EE7B7]",
    amber: "border-[#F59E0B]/20 bg-[#F59E0B]/6 text-[#FCD34D]",
    red: "border-danger/20 bg-danger/6 text-[#FCA5A5]",
  };
  return (
    <span className={`rounded-sm border px-2.5 py-1 text-[11px] font-semibold ${color ? colors[color] : "border-white/8 bg-white/5 text-white/55"}`}>
      {children}
    </span>
  );
}
