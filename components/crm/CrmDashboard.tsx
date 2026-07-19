"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logFollowup, toggleEmailMarketing } from "@/lib/actions/crm";
import { daysAgo } from "@/lib/crm/scoring";
import { CallScheduleModal } from "./CallScheduleModal";
import { CallsList } from "./CallsList";
import { ImportLeadsModal } from "./ImportLeadsModal";
import { LeadCard } from "./LeadCard";
import { LeadFormModal } from "./LeadFormModal";
import type { CrmCall, CrmCompany, CrmEtapa, CrmFollowup, CrmLead, CrmPrioridade } from "@/types/database";

type CallWithLead = CrmCall & { lead: Pick<CrmLead, "id" | "name" | "whatsapp" | "whatsapp_display" | "email"> | null };

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
const QUICK_FILTERS = [
  { key: "no_whatsapp", label: "📵 Sem WhatsApp" },
  { key: "no_email", label: "✉️ Sem e-mail" },
  { key: "stale", label: "⏰ +7 dias sem contato" },
  { key: "emailed", label: "📨 Recebeu e-mail marketing" },
] as const;
const CALL_STATUSES = ["Todas", "Agendada", "Realizada", "Cancelada", "Não compareceu"] as const;

interface Props {
  companies: CrmCompany[];
  initialCompanyId: string | null;
  initialLeads: CrmLead[];
  initialCalls: CallWithLead[];
}

export function CrmDashboard({ companies, initialCompanyId, initialLeads, initialCalls }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [companyId, setCompanyId] = useState(initialCompanyId);
  const [leads, setLeads] = useState(initialLeads);
  const [calls, setCalls] = useState(initialCalls);
  const [tab, setTab] = useState<"leads" | "calls">("leads");
  const [search, setSearch] = useState("");
  const [etapaFilter, setEtapaFilter] = useState<"Todos" | CrmEtapa>("Todos");
  const [prioFilter, setPrioFilter] = useState<"Todos" | CrmPrioridade>("Todos");
  const [quick, setQuick] = useState<Set<string>>(new Set());
  const [responsavelFilter, setResponsavelFilter] = useState("Todos");
  const [sort, setSort] = useState("score_desc");
  const [callsStatusFilter, setCallsStatusFilter] = useState<(typeof CALL_STATUSES)[number]>("Todas");
  const [callsCloserFilter, setCallsCloserFilter] = useState("Todos");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [leadModal, setLeadModal] = useState<{ open: boolean; lead: CrmLead | null; followups: CrmFollowup[] } | null>(null);
  const [callModal, setCallModal] = useState<{ open: boolean; call: CrmCall | null; defaultLeadId: string | null } | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleCompanyChange(id: string) {
    setCompanyId(id);
    const [{ data: newLeads }, { data: newCalls }] = await Promise.all([
      supabase.from("crm_leads").select("*").eq("company_id", id).order("created_at", { ascending: false }),
      supabase
        .from("crm_calls")
        .select("*, lead:crm_leads(id,name,whatsapp,whatsapp_display,email)")
        .eq("company_id", id)
        .order("scheduled_at", { ascending: true }),
    ]);
    setLeads((newLeads as CrmLead[]) || []);
    setCalls((newCalls as unknown as CallWithLead[]) || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/crm/login");
  }

  async function openLeadModal(lead: CrmLead | null) {
    let followups: CrmFollowup[] = [];
    if (lead) {
      const { data } = await supabase.from("crm_followups").select("*").eq("lead_id", lead.id).order("created_at", { ascending: false });
      followups = (data as CrmFollowup[]) || [];
    }
    setLeadModal({ open: true, lead, followups });
  }

  async function refreshLeads() {
    if (!companyId) return;
    const { data } = await supabase.from("crm_leads").select("*").eq("company_id", companyId).order("created_at", { ascending: false });
    setLeads((data as CrmLead[]) || []);
  }
  async function refreshCalls() {
    if (!companyId) return;
    const { data } = await supabase
      .from("crm_calls")
      .select("*, lead:crm_leads(id,name,whatsapp,whatsapp_display,email)")
      .eq("company_id", companyId)
      .order("scheduled_at", { ascending: true });
    setCalls((data as unknown as CallWithLead[]) || []);
  }

  async function handleLeadSaved() {
    setLeadModal(null);
    await refreshLeads();
    showToast("Lead salvo!", true);
  }
  async function handleCallSaved() {
    setCallModal(null);
    await refreshCalls();
    showToast("Agendamento salvo!", true);
  }

  async function handleImported(result: { inserted: number; updated: number }) {
    setImportModalOpen(false);
    await refreshLeads();
    showToast(`Importação concluída: ${result.inserted} novos, ${result.updated} atualizados.`, true);
  }

  const responsavelOptions = useMemo(
    () => [...new Set(leads.map((l) => (l.responsavel || "").trim()).filter(Boolean))].sort(),
    [leads]
  );
  const closerOptions = useMemo(() => [...new Set(calls.map((c) => c.closer).filter(Boolean))].sort(), [calls]);

  const filteredLeads = useMemo(() => {
    let list = leads;
    if (etapaFilter !== "Todos") list = list.filter((l) => l.etapa === etapaFilter);
    if (prioFilter !== "Todos") list = list.filter((l) => l.prioridade === prioFilter);
    if (responsavelFilter !== "Todos") list = list.filter((l) => (l.responsavel || "").trim() === responsavelFilter);
    if (quick.has("no_whatsapp")) list = list.filter((l) => !l.whatsapp);
    if (quick.has("no_email")) list = list.filter((l) => !l.email);
    if (quick.has("emailed")) list = list.filter((l) => l.received_email_marketing);
    if (quick.has("stale"))
      list = list.filter((l) => {
        const d = daysAgo(l.last_followup_at || l.first_contact_at || l.data_entrada || l.created_at);
        return d !== null && d > 7;
      });
    const q = search.trim().toLowerCase();
    if (q)
      list = list.filter(
        (l) =>
          (l.name || "").toLowerCase().includes(q) ||
          (l.whatsapp_display || "").toLowerCase().includes(q) ||
          (l.whatsapp || "").includes(q) ||
          (l.email || "").toLowerCase().includes(q)
      );

    list = [...list];
    if (sort === "score_desc") list.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
    else if (sort === "recent") list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    else if (sort === "stale")
      list.sort((a, b) => {
        const da = daysAgo(a.last_followup_at || a.first_contact_at || a.data_entrada || a.created_at) ?? -1;
        const db = daysAgo(b.last_followup_at || b.first_contact_at || b.data_entrada || b.created_at) ?? -1;
        return db - da;
      });
    else if (sort === "name") list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    return list;
  }, [leads, etapaFilter, prioFilter, responsavelFilter, quick, search, sort]);

  const filteredCalls = useMemo(() => {
    let list = calls;
    if (callsStatusFilter !== "Todas") list = list.filter((c) => c.status === callsStatusFilter);
    if (callsCloserFilter !== "Todos") list = list.filter((c) => c.closer === callsCloserFilter);
    return list;
  }, [calls, callsStatusFilter, callsCloserFilter]);

  const stats = useMemo(() => {
    const total = leads.length;
    const alta = leads.filter((l) => (l.prioridade || "").includes("Alta")).length;
    const media = leads.filter((l) => (l.prioridade || "").includes("Média")).length;
    const baixa = leads.filter((l) => (l.prioridade || "").includes("Baixa")).length;
    const incompleto = leads.filter((l) => (l.prioridade || "").includes("Incompleto")).length;
    const fechado = leads.filter((l) => l.etapa === "Fechado").length;
    const taxaFechamento = total ? ((fechado / total) * 100).toFixed(1) : "0.0";
    const semContato = leads.filter((l) => {
      const ref = l.last_followup_at || l.first_contact_at;
      const d = daysAgo(ref || l.data_entrada || l.created_at);
      return d !== null && d > 7;
    }).length;
    const semWhats = leads.filter((l) => !l.whatsapp).length;
    return { total, alta, media, baixa, incompleto, taxaFechamento, semContato, semWhats };
  }, [leads]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 flex flex-wrap items-center gap-4 border-b border-white/7 bg-ink/92 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Pedro Novaes" width={30} height={30} />
          <span className="rounded-sm border border-blue/25 bg-blue/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.5px] text-blue-light">
            CRM
          </span>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <select
            value={companyId ?? ""}
            onChange={(e) => handleCompanyChange(e.target.value)}
            className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou WhatsApp…"
            className="min-w-[200px] flex-1 rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-blue/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => openLeadModal(null)} className="rounded-pill border border-white/12 px-3.5 py-2 text-[13px] font-semibold text-white/75">
            + Novo lead
          </button>
          <button
            onClick={() => setImportModalOpen(true)}
            disabled={!companyId}
            className="rounded-pill border border-white/12 px-3.5 py-2 text-[13px] font-semibold text-white/75 disabled:opacity-40"
          >
            📥 Importar planilha
          </button>
          <button
            onClick={() => setCallModal({ open: true, call: null, defaultLeadId: null })}
            className="rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-3.5 py-2 text-[13px] font-bold text-white"
          >
            📅 Agendar call
          </button>
          <button onClick={handleLogout} className="rounded-sm px-2 py-1 text-xs text-white/30 hover:text-white">
            Sair
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-(--container-w) px-6 py-6">
        <div className="mb-6 flex gap-0 border-b border-white/7">
          <button
            onClick={() => setTab("leads")}
            className={`border-b-2 px-5 py-3 font-grotesk text-sm font-bold ${tab === "leads" ? "border-blue text-white" : "border-transparent text-white/35"}`}
          >
            Leads
          </button>
          <button
            onClick={() => setTab("calls")}
            className={`border-b-2 px-5 py-3 font-grotesk text-sm font-bold ${tab === "calls" ? "border-blue text-white" : "border-transparent text-white/35"}`}
          >
            📅 Agendamentos
          </button>
        </div>

        {tab === "leads" ? (
          <>
            <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
              <StatCard n={stats.total} l="Total de leads" />
              <StatCard n={stats.alta} l="🔥 Alta" />
              <StatCard n={stats.media} l="🟡 Média" />
              <StatCard n={stats.baixa} l="🔵 Baixa" />
              <StatCard n={stats.incompleto} l="⚪ Incompleto" />
              <StatCard n={`${stats.taxaFechamento}%`} l="Taxa fechamento" tone="ok" />
              <StatCard n={stats.semContato} l="+7 dias sem contato" tone="warn" />
              <StatCard n={stats.semWhats} l="Sem WhatsApp" tone="warn" />
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <FilterRow label="Etapa">
                {(["Todos", ...ETAPAS] as const).map((e) => (
                  <Pill key={e} active={etapaFilter === e} onClick={() => setEtapaFilter(e)}>
                    {e}
                  </Pill>
                ))}
              </FilterRow>
              <FilterRow label="Prioridade">
                {(["Todos", ...PRIORIDADES] as const).map((p) => (
                  <Pill key={p} active={prioFilter === p} onClick={() => setPrioFilter(p)}>
                    {p}
                  </Pill>
                ))}
              </FilterRow>
              <FilterRow label="Rápidos">
                {QUICK_FILTERS.map((q) => (
                  <Pill
                    key={q.key}
                    active={quick.has(q.key)}
                    onClick={() =>
                      setQuick((prev) => {
                        const next = new Set(prev);
                        if (next.has(q.key)) next.delete(q.key);
                        else next.add(q.key);
                        return next;
                      })
                    }
                  >
                    {q.label}
                  </Pill>
                ))}
              </FilterRow>
              <div className="flex flex-wrap gap-2.5">
                <select
                  value={responsavelFilter}
                  onChange={(e) => setResponsavelFilter(e.target.value)}
                  className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                >
                  <option value="Todos">Todos os responsáveis</option>
                  {responsavelOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  <option value="score_desc">Maior score</option>
                  <option value="recent">Mais recentes</option>
                  <option value="stale">Mais tempo sem contato</option>
                  <option value="name">Nome (A-Z)</option>
                </select>
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="py-16 text-center text-white/25">
                <div className="text-4xl">🔍</div>
                <p className="mt-3 text-[15px]">Nenhum lead encontrado com esses filtros.</p>
              </div>
            ) : (
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))" }}>
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onOpen={() => openLeadModal(lead)}
                    onLogFollowup={async (type) => {
                      await logFollowup(lead.id, type);
                      await refreshLeads();
                      showToast(type === "contact" ? "Contato registrado!" : "Follow-up registrado!", true);
                    }}
                    onToggleEmail={async () => {
                      await toggleEmailMarketing(lead.id, !lead.received_email_marketing);
                      await refreshLeads();
                    }}
                    onScheduleCall={() => setCallModal({ open: true, call: null, defaultLeadId: lead.id })}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <div className="flex flex-wrap gap-2">
                {CALL_STATUSES.map((s) => (
                  <Pill key={s} active={callsStatusFilter === s} onClick={() => setCallsStatusFilter(s)}>
                    {s}
                  </Pill>
                ))}
              </div>
              <select
                value={callsCloserFilter}
                onChange={(e) => setCallsCloserFilter(e.target.value)}
                className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <option value="Todos">Todos os closers</option>
                {closerOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <CallsList calls={filteredCalls} onOpen={(call) => setCallModal({ open: true, call, defaultLeadId: null })} />
          </>
        )}
      </div>

      {leadModal?.open && (
        <LeadFormModal
          lead={leadModal.lead}
          companies={companies}
          defaultCompanyId={companyId}
          followups={leadModal.followups}
          onClose={() => setLeadModal(null)}
          onSaved={handleLeadSaved}
        />
      )}
      {callModal?.open && (
        <CallScheduleModal
          call={callModal.call}
          leads={leads}
          companyId={companyId ?? ""}
          defaultLeadId={callModal.defaultLeadId}
          closers={closerOptions}
          onClose={() => setCallModal(null)}
          onSaved={handleCallSaved}
        />
      )}
      {importModalOpen && companyId && (
        <ImportLeadsModal companyId={companyId} leads={leads} onClose={() => setImportModalOpen(false)} onImported={handleImported} />
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[600] rounded-md px-4 py-3 font-grotesk text-[13px] font-semibold ${
            toast.ok ? "border border-success/30 bg-[#064E3B] text-[#6EE7B7]" : "border border-danger/30 bg-[#450A0A] text-[#FCA5A5]"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function StatCard({ n, l, tone }: { n: number | string; l: string; tone?: "ok" | "warn" }) {
  return (
    <div className={`rounded-md border p-3.5 text-center ${tone === "ok" ? "border-success/20 bg-success/6" : tone === "warn" ? "border-[#F59E0B]/20 bg-[#F59E0B]/6" : "border-white/8 bg-white/3"}`}>
      <div className={`font-grotesk text-xl font-extrabold ${tone === "ok" ? "text-[#34D399]" : tone === "warn" ? "text-[#FCD34D]" : "text-white"}`}>{n}</div>
      <div className="mt-0.5 text-[11px] text-white/40">{l}</div>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-xs font-semibold text-white/35">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-pill border px-3 py-1.5 text-xs font-semibold transition-colors ${
        active ? "border-blue/50 bg-blue/12 text-white" : "border-white/9 bg-white/3 text-white/50 hover:text-white/80"
      }`}
    >
      {children}
    </button>
  );
}
