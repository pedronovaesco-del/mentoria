import Image from "next/image";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

const RESULTS = [
  {
    src: "/images/resultados/resultado-dashboard.jpeg",
    alt: "Dashboard da Utmify mostrando R$305 mil em faturamento e ROI de 4,83",
    caption: "Faturamento líquido de R$305.676 · ROI 4,83",
    explain: "ROI = retorno sobre o valor investido em tráfego. Média de mercado: 1,5–2x",
  },
  {
    src: "/images/resultados/resultado-roas.jpeg",
    alt: "Tabela de ROAS das campanhas no Ads Manager",
    caption: "Campanhas com ROAS consistente acima de 3",
    explain: "ROAS = faturamento ÷ valor investido em tráfego. Acima de 3 é considerado excelente",
  },
  {
    src: "/images/resultados/callmentoria.jpg",
    alt: "Call de mentoria individual ao vivo",
    caption: "Suporte individual ao vivo com mentorados",
    explain: "Sessões gravadas com permissão: suporte real em tempo real",
  },
  {
    src: "/images/resultados/resultadosutm.jpg",
    alt: "Dashboard real da Utmify do Pedro Novaes, R$6.393,00 em faturamento naquele dia",
    caption: "R$6.393,00 em faturamento líquido em um único dia",
    explain: "Dashboard real do Pedro Novaes, sem edição",
  },
];

export function ResultsMedia() {
  return (
    <section id="resultados" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--container-w)">
        <Reveal>
          <SectionTag>Prova de performance</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="max-w-(--prose-w) font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            <span className="text-3d-gradient">Resultados reais e verificáveis</span> com data,
            print e contexto
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="max-w-(--prose-w) text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            Dashboards, métricas de campanha e acompanhamento ao vivo. Sem teatro, sem número
            redondo suspeito. Só o que dá pra auditar.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          {RESULTS.map((r, i) => (
            <Reveal key={r.src} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <Glass className="p-4">
                <div className="relative h-[460px] w-full overflow-hidden rounded-md bg-[#0b0b10]">
                  <Image src={r.src} alt={r.alt} fill className="object-cover object-top" loading="lazy" />
                </div>
                <p className="mt-3 text-center text-[13px] leading-[1.5] text-white/45">
                  {r.caption}
                  <span className="mt-1 block text-[11px] text-white/25">{r.explain}</span>
                </p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
