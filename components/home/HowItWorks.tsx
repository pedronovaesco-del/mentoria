import { CTAButton } from "@/components/ui/CTAButton";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

const STEPS = [
  {
    n: 1,
    title: "Faça o diagnóstico",
    body: "4 perguntas rápidas sobre onde você está agora. Menos de 2 minutos, e é isso que me permite chegar na call já sabendo onde você está perdendo dinheiro.",
  },
  {
    n: 2,
    title: "A gente agenda sua call",
    body: (
      <>
        Eu te chamo em até <strong className="text-white">2 horas</strong> pra confirmar o
        melhor horário. 45 minutos, 100% online, com sua operação aberta na tela.
      </>
    ),
  },
  {
    n: 3,
    title: "Saia com o plano em mãos",
    body: "Você termina a call sabendo exatamente o que fazer no dia seguinte: com clareza, prioridade definida, e sem depender de mais um curso pra começar.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--container-w)">
        <div className="mx-auto max-w-[560px] text-center">
          <Reveal>
            <SectionTag>O processo</SectionTag>
          </Reveal>
          <Reveal delay={1}>
            <h2
              className="font-grotesk font-bold leading-[1.05] mb-5"
              style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
            >
              Em 3 passos você sai do
              <br />
              <span className="text-3d-gradient">achismo pra um plano</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              Sem enrolação. Sem venda forçada. Em menos de uma semana você troca
              &quot;tentar de novo&quot; por um caminho claro pra seguir.
            </p>
          </Reveal>
        </div>

        <div className="mt-[60px] grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={(i + 1) as 1 | 2 | 3}>
              <Glass className="p-9 text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-dark to-blue-mid font-grotesk text-xl font-bold shadow-[0_8px_24px_rgba(26,86,255,.35)]">
                  {s.n}
                </div>
                <h3
                  className="mb-2.5 font-grotesk font-bold"
                  style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)" }}
                >
                  {s.title}
                </h3>
                <p className="text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
                  {s.body}
                </p>
              </Glass>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3}>
          <Glass className="mx-auto mt-14 max-w-(--prose-w) p-11 text-center">
            <p className="mb-[18px] text-[15px] leading-[1.7] text-white/50">
              Você já viu o processo todo. Só falta o{" "}
              <strong className="text-white">passo 1</strong>.
            </p>
            <CTAButton href="/quiz" className="!text-[15px] !py-4 !px-8">
              Fazer o diagnóstico agora (2 min)
            </CTAButton>
            <p className="mt-[18px] text-[13px] text-white/40">
              Sem custo, sem compromisso. No pior dos casos, você sai com uma clareza que não
              tinha, de graça.
            </p>
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
