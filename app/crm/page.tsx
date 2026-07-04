import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CrmDashboard } from "@/components/crm/CrmDashboard";
import type { CrmCall, CrmCompany, CrmLead } from "@/types/database";

export const metadata: Metadata = {
  title: "CRM | Pedro Novaes",
  robots: { index: false, follow: false },
};

export default async function CrmPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/crm/login");

  // Guard extra alem da sessao: CRM nao tem cadastro publico (RLS de
  // crm_* eh "authenticated USING(true)"), entao confirmar tambem que
  // o e-mail bate com o unico usuario admin criado manualmente.
  if (session.user.email !== process.env.CRM_ADMIN_EMAIL) {
    redirect("/crm/login");
  }

  const { data: companies } = await supabase.from("crm_companies").select("*").order("name").returns<CrmCompany[]>();

  const activeCompanyId = companies?.[0]?.id ?? null;

  const [{ data: leads }, { data: calls }] = await Promise.all([
    activeCompanyId
      ? supabase
          .from("crm_leads")
          .select("*")
          .eq("company_id", activeCompanyId)
          .order("created_at", { ascending: false })
          .returns<CrmLead[]>()
      : Promise.resolve({ data: [] as CrmLead[] }),
    activeCompanyId
      ? supabase
          .from("crm_calls")
          .select("*, lead:crm_leads(id,name,whatsapp,whatsapp_display,email)")
          .eq("company_id", activeCompanyId)
          .order("scheduled_at", { ascending: true })
      : Promise.resolve({ data: [] }),
  ]);

  return (
    <CrmDashboard
      companies={companies ?? []}
      initialCompanyId={activeCompanyId}
      initialLeads={leads ?? []}
      initialCalls={(calls ?? []) as unknown as (CrmCall & { lead: Pick<CrmLead, "id" | "name" | "whatsapp" | "whatsapp_display" | "email"> | null })[]}
    />
  );
}
