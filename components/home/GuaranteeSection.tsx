import { Reveal } from "@/components/ui/Reveal";

export function GuaranteeSection() {
  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <Reveal>
        <div className="mx-auto flex max-w-[780px] flex-col items-start gap-6 rounded-lg border border-success/20 bg-success/5 px-6 py-8 sm:flex-row sm:px-[52px] sm:py-12">
          <div className="shrink-0 text-[52px] leading-none">🛡️</div>
          <div>
            <h3
              className="mb-3 font-grotesk font-bold text-[#34D399]"
              style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)" }}
            >
              Garantia de valor: você não sai de mãos vazias
            </h3>
            <p className="text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              Se você sair da call diagnóstica sem pelo menos{" "}
              <strong className="text-white">3 insights acionáveis e específicos</strong> pro
              seu negócio, me manda uma mensagem e eu marco uma segunda sessão, sem nenhum
              custo. Simples assim.
              <br />
              <br />A call é gratuita. O valor que você leva dela, não é.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
