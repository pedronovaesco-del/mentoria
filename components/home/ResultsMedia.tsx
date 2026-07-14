import Image from "next/image";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

const RESULTS = [
  {
    src: "/images/resultados/resultado-dashboard.jpeg",
    alt: "Utmify dashboard showing R$305K in revenue and 4.83 ROI",
    caption: "Net revenue of R$305,676 · ROI 4.83",
    explain: "ROI = return on ad spend. Market average: 1.5–2x",
  },
  {
    src: "/images/resultados/resultado-roas.jpeg",
    alt: "ROAS table for campaigns in Ads Manager",
    caption: "Campaigns with consistent ROAS above 3",
    explain: "ROAS = revenue ÷ ad spend. Above 3 is considered excellent",
  },
  {
    src: "/images/resultados/callmentoria.jpg",
    alt: "Live 1-on-1 mentoring call",
    caption: "Live 1-on-1 support with mentees",
    explain: "Sessions recorded with permission: real support in real time",
  },
  {
    src: "/images/resultados/resultadosutm.jpg",
    alt: "Pedro Novaes' real Utmify dashboard, R$6,393.00 in revenue that day",
    caption: "R$6,393.00 in net revenue in a single day",
    explain: "Pedro Novaes' real dashboard, unedited",
  },
];

export function ResultsMedia() {
  return (
    <section id="resultados" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--container-w)">
        <Reveal>
          <SectionTag>Proof of performance</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="max-w-(--prose-w) font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            <span className="text-3d-gradient">Real, verifiable results</span> with date,
            screenshot, and context
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="max-w-(--prose-w) text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            Dashboards, campaign metrics, and live tracking. No theatrics, no suspiciously
            round numbers. Just what can be audited.
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
