import { CTAButton } from "@/components/ui/CTAButton";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";

export function CtaSection() {
  return (
    <section id="cta" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)] text-center">
      <Reveal>
        <Glass className="mx-auto max-w-[800px] rounded-lg p-9 sm:px-12 sm:py-[72px]">
          <span className="mb-5 block text-center text-[11px] font-semibold uppercase tracking-[2.5px] text-blue-light">
            100% gratuito · 45 minutos · Sem compromisso
          </span>
          <h2
            className="font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            Pronto pra parar de trabalhar mais
            <br />
            <span className="text-3d-gradient">e começar a faturar mais?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-[520px] text-[16px] leading-[1.8] text-white/68">
            Responda 7 perguntas rápidas, garanta sua vaga e receba um diagnóstico estratégico
            personalizado pro seu negócio digital. O Pedro Novaes entra em contato em até 2
            horas.
            <br />
            <br />A diferença entre esse mês e o próximo é{" "}
            <strong className="text-white">uma decisão de 2 minutos.</strong>
          </p>
          <CTAButton href="/quiz" variant="primary" className="!text-base !py-[18px] !px-11">
            Garantir minha call diagnóstica gratuita
          </CTAButton>
        </Glass>
      </Reveal>
    </section>
  );
}
