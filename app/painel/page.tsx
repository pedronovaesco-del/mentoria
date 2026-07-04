import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LeadMarketplace } from "@/components/painel/LeadMarketplace";
import { PaywallPricing } from "@/components/painel/PaywallPricing";
import { LogoutButton } from "@/components/painel/LogoutButton";
import type { Professional, ProfessionalLeadView } from "@/types/database";

export const metadata: Metadata = {
  title: "Painel | Pedro Novaes Leads",
  robots: { index: false, follow: false },
};

export default async function PainelPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/auth?mode=login");

  const user = session.user;
  const displayName = (user.user_metadata?.name as string | undefined) || user.email!.split("@")[0];

  const { data: profile } = await supabase
    .from("professionals")
    .select("*")
    .eq("id", user.id)
    .single<Professional>();

  const credits = profile?.credits ?? 0;

  if (credits === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <PainelHeader displayName={displayName} credits={0} userEmail={user.email!} />
        <PaywallPricing userEmail={user.email!} />
      </div>
    );
  }

  const { data: leads } = await supabase
    .from("professional_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<ProfessionalLeadView[]>();

  return (
    <div className="flex min-h-screen flex-col">
      <PainelHeader displayName={displayName} credits={credits} userEmail={user.email!} />
      <LeadMarketplace leads={leads ?? []} credits={credits} defaultNiche={profile?.niche ?? "Todos"} />
    </div>
  );
}

function PainelHeader({
  displayName,
  credits,
  userEmail,
}: {
  displayName: string;
  credits: number;
  userEmail: string;
}) {
  const waCredits = `https://wa.me/4748199443?text=${encodeURIComponent(
    "Ola Pedro quero comprar creditos para a plataforma de leads!"
  )}`;
  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-white/7 bg-ink/92 px-8 py-3.5 backdrop-blur-xl max-[600px]:px-4 max-[600px]:py-3">
      <Link href="/plataforma" className="flex items-center gap-2.5 no-underline">
        <Image src="/images/logo.png" alt="Pedro Novaes" width={32} height={32} />
        <div className="flex flex-col leading-none gap-px">
          <span className="font-serif italic text-[9px] uppercase tracking-[2px] text-white/40">Pedro</span>
          <span className="font-grotesk text-sm font-bold bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
            Novaes
          </span>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-pill border border-blue/25 bg-blue/10 px-3.5 py-1.5 font-grotesk text-[13px] font-bold text-blue-light">
          💎 <span className="text-base text-white">{credits}</span> créditos
        </div>
        <a
          href={waCredits}
          target="_blank"
          rel="noopener"
          className="rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-3.5 py-1.5 font-grotesk text-[13px] font-bold text-white no-underline shadow-[0_3px_0_var(--blue-dark)] transition-transform hover:-translate-y-0.5"
        >
          Comprar créditos
        </a>
        <div className="flex items-center gap-2">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-blue/30 bg-blue/20 font-grotesk text-sm font-bold text-blue-light">
            {displayName[0]?.toUpperCase()}
          </div>
          <span className="text-[13px] font-semibold text-white/70 max-[480px]:hidden">{displayName}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
