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
            O que você recebe na call diagnóstica
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            Não é papo de venda disfarçado. É a sua operação aberta na tela, olhada por quem já
            escalou a própria. Você sai com o <strong className="hl">gargalo exato</strong> que
            trava a sua escala hoje, apontado com nome, não com achismo. As{" "}
            <strong className="hl">2 ou 3 alavancas prioritárias</strong> pra puxar primeiro, e
            o que ignorar por enquanto. Um{" "}
            <strong className="hl">plano de ação pra aplicar já essa semana</strong>, sem
            depender de mais nenhum curso. E clareza pra parar de trocar criativo e público no
            escuro, e agir com direção.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
