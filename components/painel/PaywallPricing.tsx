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

export function PaywallPricing({ userEmail }: { userEmail: string }) {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-10">
      <div className="w-full max-w-[880px]">
        <div className="mb-11 text-center">
          <div className="mb-[18px] inline-flex items-center gap-1.5 rounded-pill border border-blue/28 bg-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[1.2px] text-blue-light">
            💎 Acesso à plataforma
          </div>
          <h2 className="mb-2.5 font-grotesk font-extrabold" style={{ fontSize: "clamp(24px,4vw,38px)", letterSpacing: "-1.5px" }}>
            Escolha seu plano para começar
          </h2>
          <p className="text-[15px] leading-[1.75] text-white/42">
            Sua conta foi criada. Para acessar os leads qualificados,
            <br />
            adquira créditos via WhatsApp e comece a prospectar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((p) => {
            const msg = encodeURI(
              `Olá Pedro, quero adquirir o plano ${p.tier} (${p.price} / ${p.unit.replace("/ ", "")}) para a plataforma de leads. Minha conta: ${userEmail}`
            );
            return (
              <div
                key={p.tier}
                className={`relative overflow-hidden rounded-lg border p-7 ${
                  p.hot ? "border-blue/45 bg-blue/6" : "border-white/9 bg-white/3"
                }`}
              >
                {p.hot && (
                  <span className="absolute right-3.5 top-3.5 rounded-pill bg-blue px-2.5 py-1 text-[11px] font-bold text-white">
                    MAIS POPULAR
                  </span>
                )}
                <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.8px] text-white/40">{p.tier}</div>
                <div className="mb-0.5 font-grotesk text-[38px] font-extrabold leading-none" style={{ letterSpacing: "-2px" }}>
                  {p.price} <em className="text-sm font-medium not-italic text-white/40">{p.unit}</em>
                </div>
                <div className="mb-5 text-xs text-white/32">{p.upc}</div>
                <ul className="mb-6 flex flex-col gap-2">
                  {p.feats.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-white/65">
                      <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-success/28 bg-success/12 text-[10px] font-black text-[#34D399]">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/4748199443?text=${msg}`}
                  target="_blank"
                  rel="noopener"
                  className={`block w-full rounded-pill py-3.5 text-center font-grotesk text-sm font-bold no-underline transition-transform hover:-translate-y-0.5 ${
                    p.hot
                      ? "bg-gradient-to-b from-blue via-blue-mid to-blue-deep text-white shadow-[0_1px_0_rgba(187,212,255,0.3)_inset,0_4px_0_var(--blue-dark),0_6px_14px_rgba(10,44,140,0.4)]"
                      : "border border-white/12 bg-white/6 text-white/75"
                  }`}
                >
                  Escolher {p.tier} →
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center text-[13px] text-white/28">
          Créditos não expiram · Após o pagamento, acesso liberado em até 1h
        </p>
      </div>
    </div>
  );
}
