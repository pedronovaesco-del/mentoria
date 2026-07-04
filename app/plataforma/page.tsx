import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leads Qualificados por Nicho | Pedro Novaes",
  description:
    "Acesse leads qualificados e filtrados por nicho. Cada lead respondeu 7 perguntas de qualificação. Prospecte com contexto real.",
  openGraph: {
    title: "Leads Qualificados por Nicho | Pedro Novaes",
    description: "Cada lead respondeu 7 perguntas. Você sabe o objetivo, orçamento e desafio antes de prospectar.",
    images: ["/images/logo.png"],
  },
};

const STEPS = [
  {
    n: "01",
    title: "Escolha seu plano e adquira créditos",
    body: "Selecione o pacote ideal para o seu volume de prospecção. Após o pagamento, sua conta é criada e os créditos são liberados em até 1h.",
  },
  {
    n: "02",
    title: "Visualize o perfil completo do lead",
    body: "Veja o objetivo, faturamento atual, orçamento disponível, meta de 3 meses, principal desafio e nível de conhecimento digital antes de comprar.",
  },
  {
    n: "03",
    title: "Desbloqueie e prospecte com vantagem",
    body: "Use 1 crédito para liberar o contato completo do lead: nome, WhatsApp com DDI e e-mail. Aborde com o contexto certo desde o início.",
  },
];

const DATA_ITEMS = [
  { icon: "🎯", title: "Objetivo principal", body: "O que o lead quer agora: começar, crescer, escalar ou construir autoridade." },
  { icon: "💰", title: "Faturamento atual", body: "Faixa de receita mensal do lead, do zero até acima de R$ 50.000." },
  { icon: "💼", title: "Orçamento para investir", body: "Quanto o lead tem disponível para investir agora no negócio." },
  { icon: "📈", title: "Meta dos próximos 3 meses", body: "O faturamento que o lead quer alcançar em 3 meses." },
  { icon: "🚧", title: "Principal desafio", body: "O gargalo real: não sabe começar, não converte, ROI baixo ou não escala." },
  { icon: "💻", title: "Nível digital", body: "Do iniciante ao avançado para calibrar a abordagem certa." },
  { icon: "⏰", title: "Disponibilidade diária", body: "Quanto tempo o lead dedica ao negócio por dia." },
  { icon: "📞", title: "Contato completo", body: "Nome, WhatsApp com DDI e e-mail — desbloqueados com 1 crédito." },
];

const NICHES = [
  { icon: "🎯", name: "Marketing Digital" },
  { icon: "💰", name: "Tráfego Pago" },
  { icon: "✍️", name: "Copywriting & Funis" },
  { icon: "🛒", name: "E-commerce" },
  { icon: "📚", name: "Infoprodutos & Cursos" },
  { icon: "📱", name: "Social Media" },
  { icon: "💼", name: "Consultoria de Negócios" },
  { icon: "📊", name: "Vendas & Comercial" },
];

function planWaLink(tier: string, price: string, credits: string) {
  const msg = `Olá Pedro, quero adquirir o plano ${tier} (${price} / ${credits}) para a plataforma de leads.`;
  return `https://wa.me/4748199443?text=${encodeURIComponent(msg)}`;
}

const PLANS = [
  {
    tier: "Starter",
    price: "R$ 97",
    unit: "/ 10 créditos",
    upc: "R$ 9,70 por lead qualificado",
    feats: ["10 leads desbloqueáveis", "Filtro por nicho", "Perfil completo de qualificação", "WhatsApp + e-mail do lead"],
    hot: false,
  },
  {
    tier: "Pro",
    price: "R$ 247",
    unit: "/ 30 créditos",
    upc: "R$ 8,23 por lead qualificado",
    feats: [
      "30 leads desbloqueáveis",
      "Filtro por nicho",
      "Perfil completo de qualificação",
      "WhatsApp + e-mail do lead",
      "Acesso antecipado a novos leads",
    ],
    hot: true,
  },
  {
    tier: "Enterprise",
    price: "R$ 597",
    unit: "/ 100 créditos",
    upc: "R$ 5,97 por lead qualificado",
    feats: [
      "100 leads desbloqueáveis",
      "Filtro por nicho",
      "Perfil completo de qualificação",
      "WhatsApp + e-mail do lead",
      "Acesso antecipado a novos leads",
      "Suporte dedicado via WhatsApp",
    ],
    hot: false,
  },
];

function SectionHead({ tag, title, sub }: { tag: string; title: string; sub: string }) {
  return (
    <div className="mx-auto mb-12 max-w-[560px] text-center">
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-pill border border-blue/28 bg-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[1.2px] text-blue-light">
        {tag}
      </div>
      <h2 className="mb-3 font-grotesk font-extrabold" style={{ fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-1.5px" }}>
        {title}
      </h2>
      <p className="text-[15px] leading-[1.75] text-white/42">{sub}</p>
    </div>
  );
}

export default function PlataformaPage() {
  return (
    <>
      <nav className="flex items-center justify-between px-12 py-[18px] max-[768px]:px-5">
        <Link href="/plataforma" className="flex items-center gap-2.5 no-underline">
          <Image src="/images/logo.png" alt="Pedro Novaes" width={36} height={36} />
          <div className="flex flex-col leading-none gap-px">
            <span className="font-serif italic text-[10px] uppercase tracking-[2px] text-white/45">Pedro</span>
            <span className="font-grotesk text-base font-bold bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
              Novaes
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2.5">
          <Link href="/auth?mode=login" className="rounded-pill border border-white/12 px-[18px] py-2 text-sm font-semibold text-white/65 no-underline hover:border-white/30 hover:text-white">
            Entrar
          </Link>
          <a href="#precos" className="rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-5 py-2 font-grotesk text-sm font-bold text-white no-underline shadow-[0_4px_0_var(--blue-dark)] transition-transform hover:-translate-y-0.5">
            Ver planos →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-12 pb-[72px] pt-20 max-[768px]:px-5">
        <div className="mx-auto max-w-(--container-w)">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-pill border border-blue/28 bg-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[1.2px] text-blue-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Leads qualificados disponíveis agora
          </div>
          <h1 className="mb-5 font-grotesk font-extrabold leading-[1.08]" style={{ fontSize: "clamp(32px,5.5vw,62px)", letterSpacing: "-2px" }}>
            Prospecte com contexto.
            <br />
            <span className="bg-gradient-to-br from-blue-light via-blue to-blue-deep bg-clip-text text-transparent">
              Feche mais. Gaste menos.
            </span>
          </h1>
          <p className="mb-9 max-w-[560px] text-[clamp(15px,2vw,19px)] leading-[1.75] text-white/52">
            Cada lead passou por 7 perguntas de qualificação. Você sabe o objetivo, o
            faturamento, o orçamento e o desafio antes do primeiro contato.
          </p>
          <div className="mb-16 flex flex-wrap gap-3.5">
            <a href="#precos" className="rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-7 py-4 font-grotesk text-[15px] font-bold text-white no-underline shadow-[0_1px_0_rgba(187,212,255,0.3)_inset,0_5px_0_var(--blue-dark),0_8px_20px_rgba(10,44,140,0.45)] transition-transform hover:-translate-y-0.5">
              Ver planos →
            </a>
            <a href="#como-funciona" className="rounded-pill border border-white/14 px-7 py-4 font-grotesk text-[15px] font-bold text-white/70 no-underline hover:border-white/30 hover:text-white">
              Como funciona
            </a>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-white/7 sm:grid-cols-3">
            {[
              ["400+", "Leads capturados"],
              ["8", "Nichos disponíveis"],
              ["100%", "Leads qualificados"],
            ].map(([n, l]) => (
              <div key={l} className="bg-[#060606] px-6 py-7 text-center">
                <div className="font-grotesk font-extrabold bg-gradient-to-br from-white to-blue-light bg-clip-text text-transparent" style={{ fontSize: "clamp(26px,4vw,44px)", letterSpacing: "-1px" }}>
                  {n}
                </div>
                <div className="mt-1.5 text-[13px] font-medium text-white/38">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-white/6" />

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="px-12 py-[72px] max-[768px]:px-5">
        <div className="mx-auto max-w-(--container-w)">
          <SectionHead tag="Simples e direto" title="Como funciona" sub="Da captura até a prospecção em 3 passos" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative overflow-hidden rounded-lg border border-white/8 bg-white/3 p-7">
                <div className="mb-3.5 font-grotesk font-extrabold text-blue/10" style={{ fontSize: 52, letterSpacing: "-2px" }}>
                  {s.n}
                </div>
                <h3 className="mb-2.5 font-grotesk text-[17px] font-bold">{s.title}</h3>
                <p className="text-[13px] leading-[1.75] text-white/42">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-white/6" />

      {/* DADOS POR LEAD */}
      <section className="px-12 py-[72px] max-[768px]:px-5">
        <div className="mx-auto max-w-(--container-w)">
          <SectionHead
            tag="Qualificação real"
            title="O que você recebe por lead"
            sub="Cada lead respondeu 7 perguntas antes de entrar na plataforma. Prospecte com dados, não no escuro."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DATA_ITEMS.map((d) => (
              <div key={d.title} className="flex items-start gap-3.5 rounded-md border border-white/7 bg-white/3 p-[18px]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-blue/10 text-[19px]">{d.icon}</div>
                <div>
                  <h4 className="mb-1 font-grotesk text-sm font-bold">{d.title}</h4>
                  <p className="text-xs leading-[1.6] text-white/38">{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-white/6" />

      {/* NICHOS */}
      <section className="px-12 py-[72px] max-[768px]:px-5">
        <div className="mx-auto max-w-(--container-w)">
          <SectionHead
            tag="Segmentado por nicho"
            title="Nichos disponíveis"
            sub="Selecione seu mercado e veja apenas os leads que fazem sentido para o seu negócio"
          />
          <div className="grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 min-[860px]:grid-cols-4">
            {NICHES.map((n) => (
              <div key={n.name} className="rounded-md border border-white/8 bg-white/3 p-5 transition-all hover:-translate-y-0.5 hover:border-blue/35 hover:bg-blue/6">
                <div className="mb-2.5 text-[26px]">{n.icon}</div>
                <div className="font-grotesk text-sm font-bold">{n.name}</div>
                <div className="text-xs text-white/32">Leads disponíveis</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-white/6" />

      {/* PREÇOS */}
      <section id="precos" className="px-12 py-[72px] max-[768px]:px-5">
        <div className="mx-auto max-w-(--container-w)">
          <SectionHead tag="Planos" title="Escolha seu plano" sub="Pague pelos leads que você quer. Sem mensalidade obrigatória." />
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.tier} className={`relative overflow-hidden rounded-[22px] border p-7 ${p.hot ? "border-blue/45 bg-blue/6" : "border-white/9 bg-white/3"}`}>
                {p.hot && (
                  <span className="absolute right-3.5 top-3.5 rounded-pill bg-blue px-2.5 py-1 text-[11px] font-bold text-white">MAIS POPULAR</span>
                )}
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.8px] text-white/42">{p.tier}</div>
                <div className="mb-0.5 font-grotesk text-[40px] font-extrabold leading-none" style={{ letterSpacing: "-2px" }}>
                  {p.price} <em className="text-[15px] font-medium not-italic text-white/45">{p.unit}</em>
                </div>
                <div className="mb-[22px] text-xs text-white/35">{p.upc}</div>
                <ul className="mb-[26px] flex flex-col gap-2.5">
                  {p.feats.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-white/68">
                      <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-success/28 bg-success/12 text-[10px] font-black text-[#34D399]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={planWaLink(p.tier, p.price, p.unit.replace("/ ", ""))}
                  target="_blank"
                  rel="noopener"
                  className={`block w-full rounded-pill py-3.5 text-center font-grotesk text-sm font-bold no-underline transition-transform hover:-translate-y-0.5 ${
                    p.hot
                      ? "bg-gradient-to-b from-blue via-blue-mid to-blue-deep text-white shadow-[0_1px_0_rgba(187,212,255,0.3)_inset,0_4px_0_var(--blue-dark),0_6px_14px_rgba(10,44,140,0.4)]"
                      : "border border-white/12 bg-white/6 text-white/75"
                  }`}
                >
                  Adquirir {p.tier} →
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[13px] text-white/30">
            Créditos não expiram · Acesso liberado em até 1h após o pagamento
          </p>
        </div>
      </section>

      <div className="h-px bg-white/6" />

      {/* CTA FINAL */}
      <section className="px-12 py-[72px] max-[768px]:px-5">
        <div className="relative mx-auto max-w-(--container-w) overflow-hidden rounded-[26px] border border-blue/18 bg-blue/7 px-12 py-[60px] text-center max-[600px]:px-6 max-[600px]:py-11">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-pill border border-blue/28 bg-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[1.2px] text-blue-light">
            Comece hoje
          </div>
          <h2 className="mb-3.5 font-grotesk font-extrabold" style={{ fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-1.5px" }}>
            Pronto para prospectar
            <br />
            com qualidade?
          </h2>
          <p className="mx-auto mb-[30px] max-w-[420px] text-[15px] leading-[1.75] text-white/48">
            Escolha seu plano, adquira créditos e comece a acessar leads qualificados ainda hoje.
          </p>
          <a href="#precos" className="inline-flex rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-7 py-4 font-grotesk text-[15px] font-bold text-white no-underline shadow-[0_1px_0_rgba(187,212,255,0.3)_inset,0_5px_0_var(--blue-dark),0_8px_20px_rgba(10,44,140,0.45)] transition-transform hover:-translate-y-0.5">
            Escolher plano →
          </a>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/6 px-12 py-9 max-[600px]:px-5">
        <Link href="/plataforma" className="flex items-center gap-2.5 no-underline">
          <Image src="/images/logo.png" alt="Pedro Novaes" width={32} height={32} />
          <div className="flex flex-col leading-none gap-px">
            <span className="font-serif italic text-[9px] uppercase tracking-[2px] text-white/40">Pedro</span>
            <span className="font-grotesk text-sm font-bold bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
              Novaes
            </span>
          </div>
        </Link>
        <span className="text-[13px] text-white/30">© 2026 Pedro Novaes · Leads qualificados para profissionais do digital.</span>
      </footer>
    </>
  );
}
