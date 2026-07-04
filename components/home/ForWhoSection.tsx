import { CTAButton } from "@/components/ui/CTAButton";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

const YES = [
  "Você já vende no digital, mas trava no mesmo patamar há meses e não sabe apontar o motivo exato",
  "Tem campanha rodando, mas o ROI oscila toda semana e você não confia no próximo mês",
  'Está cansado de trocar criativo, copy e público no escuro esperando "acertar" na tentativa certa',
  "Quer sair do modo sobrevivência e ter previsibilidade de faturamento, não mais um mês de sorte",
  "Está disposto a implementar o que sair da call nos próximos 30 dias, com comprometimento real",
];

const NO = [
  'Você procura resultado sem esforço ou "fórmula mágica garantida"',
  "Já fatura acima de 7 dígitos/mês com consistência e operação estruturada (você não precisa disso)",
  "Não tem 30 dias pra implementar mudança nenhuma agora",
  "Prefere acumular mais um curso antes de agir (paralisia por análise)",
  "Está atrás de alguém pra dizer que está tudo certo, e não de um diagnóstico honesto",
];

export function ForWhoSection() {
  return (
    <section id="para-quem" className="px-[var(--edge-pad)] py-20">
      <div className="mx-auto max-w-(--container-w)">
        <div className="mx-auto max-w-[560px] text-center">
          <Reveal>
            <SectionTag>Qualificação</SectionTag>
          </Reveal>
          <Reveal delay={1}>
            <h2
              className="font-grotesk font-bold leading-[1.05] mb-5"
              style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
            >
              Essa call é
              <br />
              <span className="text-3d-gradient">para você?</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              Seja honesto consigo mesmo. A call é gratuita, mas o seu tempo e o meu não são.
              Por isso ela não é pra todo mundo.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal delay={1}>
            <Glass className="border-success/15! bg-success/5! rounded-lg p-9">
              <h3 className="mb-5 flex items-center gap-2.5 font-grotesk font-bold" style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)" }}>
                <span className="text-lg">✅</span> Essa call é para você se:
              </h3>
              <div className="flex flex-col gap-3">
                {YES.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-white/68" style={{ fontSize: "var(--fs-body)", lineHeight: 1.6 }}>
                    <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-success/25 bg-success/15 text-xs font-bold text-[#34D399]">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </Glass>
          </Reveal>

          <Reveal delay={2}>
            <Glass className="border-danger/12! bg-danger/5! rounded-lg p-9">
              <h3 className="mb-5 flex items-center gap-2.5 font-grotesk font-bold" style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)" }}>
                <span className="text-lg">❌</span> Essa call NÃO é para você se:
              </h3>
              <div className="flex flex-col gap-3">
                {NO.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-white/68" style={{ fontSize: "var(--fs-body)", lineHeight: 1.6 }}>
                    <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-danger/20 bg-danger/12 text-xs font-bold text-[#F87171]">
                      ✗
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </Glass>
          </Reveal>
        </div>

        <div className="mt-10 text-center">
          <Reveal delay={3}>
            <CTAButton href="/quiz" className="!text-[15px] !py-4 !px-9">
              Me identifico! Quero a call →
            </CTAButton>
            <p className="mt-3.5 text-[13px] text-white/40">
              100% gratuito · Sem compromisso · Resposta em até 2h
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
