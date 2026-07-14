import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Qualified Leads by Niche | Pedro Novaes",
  description:
    "Access qualified leads filtered by niche. Every lead answered 7 qualification questions. Prospect with real context.",
  openGraph: {
    title: "Qualified Leads by Niche | Pedro Novaes",
    description: "Every lead answered 7 questions. You know their goal, budget, and challenge before you reach out.",
    images: ["/images/logo.png"],
  },
};

const STEPS = [
  {
    n: "01",
    title: "Choose your plan and get credits",
    body: "Select the ideal package for your prospecting volume. After payment, your account is created and credits are released within 1h.",
  },
  {
    n: "02",
    title: "View the lead's full profile",
    body: "See their goal, current revenue, available budget, 3-month target, main challenge, and digital knowledge level before you buy.",
  },
  {
    n: "03",
    title: "Unlock and prospect with an edge",
    body: "Use 1 credit to unlock the lead's full contact info: name, WhatsApp with country code, and email. Approach with the right context from the start.",
  },
];

const DATA_ITEMS = [
  { icon: "🎯", title: "Main goal", body: "What the lead wants right now: to start, grow, scale, or build authority." },
  { icon: "💰", title: "Current revenue", body: "The lead's monthly revenue range, from zero to above R$50,000." },
  { icon: "💼", title: "Budget to invest", body: "How much the lead has available to invest in the business right now." },
  { icon: "📈", title: "Next 3-month target", body: "The revenue the lead wants to reach in 3 months." },
  { icon: "🚧", title: "Main challenge", body: "The real bottleneck: doesn't know how to start, doesn't convert, low ROI, or can't scale." },
  { icon: "💻", title: "Digital level", body: "From beginner to advanced, to calibrate the right approach." },
  { icon: "⏰", title: "Daily availability", body: "How much time the lead dedicates to the business each day." },
  { icon: "📞", title: "Full contact info", body: "Name, WhatsApp with country code, and email — unlocked with 1 credit." },
];

const NICHES = [
  { icon: "🎯", name: "Digital Marketing" },
  { icon: "💰", name: "Paid Traffic" },
  { icon: "✍️", name: "Copywriting & Funnels" },
  { icon: "🛒", name: "E-commerce" },
  { icon: "📚", name: "Info Products & Courses" },
  { icon: "📱", name: "Social Media" },
  { icon: "💼", name: "Business Consulting" },
  { icon: "📊", name: "Sales & Business Development" },
];

function planWaLink(tier: string, price: string, credits: string) {
  const msg = `Hi Pedro, I want to get the ${tier} plan (${price} / ${credits}) for the leads platform.`;
  return `https://wa.me/4748199443?text=${encodeURIComponent(msg)}`;
}

const PLANS = [
  {
    tier: "Starter",
    price: "R$ 97",
    unit: "/ 10 credits",
    upc: "R$ 9.70 per qualified lead",
    feats: ["10 unlockable leads", "Filter by niche", "Full qualification profile", "Lead's WhatsApp + email"],
    hot: false,
  },
  {
    tier: "Pro",
    price: "R$ 247",
    unit: "/ 30 credits",
    upc: "R$ 8.23 per qualified lead",
    feats: [
      "30 unlockable leads",
      "Filter by niche",
      "Full qualification profile",
      "Lead's WhatsApp + email",
      "Early access to new leads",
    ],
    hot: true,
  },
  {
    tier: "Enterprise",
    price: "R$ 597",
    unit: "/ 100 credits",
    upc: "R$ 5.97 per qualified lead",
    feats: [
      "100 unlockable leads",
      "Filter by niche",
      "Full qualification profile",
      "Lead's WhatsApp + email",
      "Early access to new leads",
      "Dedicated WhatsApp support",
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
            Log in
          </Link>
          <a href="#precos" className="rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-5 py-2 font-grotesk text-sm font-bold text-white no-underline shadow-[0_4px_0_var(--blue-dark)] transition-transform hover:-translate-y-0.5">
            See plans →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-12 pb-[72px] pt-20 max-[768px]:px-5">
        <div className="mx-auto max-w-(--container-w)">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-pill border border-blue/28 bg-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[1.2px] text-blue-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Qualified leads available now
          </div>
          <h1 className="mb-5 font-grotesk font-extrabold leading-[1.08]" style={{ fontSize: "clamp(32px,5.5vw,62px)", letterSpacing: "-2px" }}>
            Prospect with context.
            <br />
            <span className="bg-gradient-to-br from-blue-light via-blue to-blue-deep bg-clip-text text-transparent">
              Close more. Spend less.
            </span>
          </h1>
          <p className="mb-9 max-w-[560px] text-[clamp(15px,2vw,19px)] leading-[1.75] text-white/52">
            Every lead went through 7 qualification questions. You know their goal, revenue,
            budget, and challenge before the first contact.
          </p>
          <div className="mb-16 flex flex-wrap gap-3.5">
            <a href="#precos" className="rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-7 py-4 font-grotesk text-[15px] font-bold text-white no-underline shadow-[0_1px_0_rgba(187,212,255,0.3)_inset,0_5px_0_var(--blue-dark),0_8px_20px_rgba(10,44,140,0.45)] transition-transform hover:-translate-y-0.5">
              See plans →
            </a>
            <a href="#como-funciona" className="rounded-pill border border-white/14 px-7 py-4 font-grotesk text-[15px] font-bold text-white/70 no-underline hover:border-white/30 hover:text-white">
              How it works
            </a>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-white/7 sm:grid-cols-3">
            {[
              ["400+", "Leads captured"],
              ["8", "Niches available"],
              ["100%", "Qualified leads"],
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
          <SectionHead tag="Simple and direct" title="How it works" sub="From capture to prospecting in 3 steps" />
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
            tag="Real qualification"
            title="What you get per lead"
            sub="Every lead answered 7 questions before joining the platform. Prospect with data, not in the dark."
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
            tag="Segmented by niche"
            title="Available niches"
            sub="Select your market and see only the leads that make sense for your business"
          />
          <div className="grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 min-[860px]:grid-cols-4">
            {NICHES.map((n) => (
              <div key={n.name} className="rounded-md border border-white/8 bg-white/3 p-5 transition-all hover:-translate-y-0.5 hover:border-blue/35 hover:bg-blue/6">
                <div className="mb-2.5 text-[26px]">{n.icon}</div>
                <div className="font-grotesk text-sm font-bold">{n.name}</div>
                <div className="text-xs text-white/32">Leads available</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-white/6" />

      {/* PREÇOS */}
      <section id="precos" className="px-12 py-[72px] max-[768px]:px-5">
        <div className="mx-auto max-w-(--container-w)">
          <SectionHead tag="Plans" title="Choose your plan" sub="Pay for the leads you want. No mandatory subscription." />
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.tier} className={`relative overflow-hidden rounded-[22px] border p-7 ${p.hot ? "border-blue/45 bg-blue/6" : "border-white/9 bg-white/3"}`}>
                {p.hot && (
                  <span className="absolute right-3.5 top-3.5 rounded-pill bg-blue px-2.5 py-1 text-[11px] font-bold text-white">MOST POPULAR</span>
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
                  Get {p.tier} →
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[13px] text-white/30">
            Credits never expire · Access granted within 1h after payment
          </p>
        </div>
      </section>

      <div className="h-px bg-white/6" />

      {/* CTA FINAL */}
      <section className="px-12 py-[72px] max-[768px]:px-5">
        <div className="relative mx-auto max-w-(--container-w) overflow-hidden rounded-[26px] border border-blue/18 bg-blue/7 px-12 py-[60px] text-center max-[600px]:px-6 max-[600px]:py-11">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-pill border border-blue/28 bg-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[1.2px] text-blue-light">
            Start today
          </div>
          <h2 className="mb-3.5 font-grotesk font-extrabold" style={{ fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-1.5px" }}>
            Ready to prospect
            <br />
            with quality?
          </h2>
          <p className="mx-auto mb-[30px] max-w-[420px] text-[15px] leading-[1.75] text-white/48">
            Choose your plan, get credits, and start accessing qualified leads today.
          </p>
          <a href="#precos" className="inline-flex rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-7 py-4 font-grotesk text-[15px] font-bold text-white no-underline shadow-[0_1px_0_rgba(187,212,255,0.3)_inset,0_5px_0_var(--blue-dark),0_8px_20px_rgba(10,44,140,0.45)] transition-transform hover:-translate-y-0.5">
            Choose plan →
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
        <span className="text-[13px] text-white/30">© 2026 Pedro Novaes · Qualified leads for digital professionals.</span>
      </footer>
    </>
  );
}
