import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

export function WhatYouGet() {
  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)] text-center">
      <div className="mx-auto max-w-(--prose-w)">
        <Reveal>
          <SectionTag>45 minutos · o que sai do outro lado</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="mx-auto font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            O que você leva da call de diagnóstico
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            Isso não é um pitch de vendas disfarçado. É sua operação aberta na tela, revisada
            por alguém que já escalou a própria. Você sai com o{" "}
            <strong className="hl">gargalo exato</strong> que está travando sua escala hoje,
            apontado pelo nome, não por achismo. As{" "}
            <strong className="hl">2 ou 3 alavancas prioritárias</strong> pra puxar primeiro, e
            o que ignorar por enquanto. Um{" "}
            <strong className="hl">plano de ação pra aplicar essa semana</strong>, sem depender
            de mais um curso. E clareza pra parar de trocar criativo e público no escuro, e
            agir com direção.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
