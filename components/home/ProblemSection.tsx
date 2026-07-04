import { HookBox, SectionTitle } from "@/components/ui/SectionText";
import { Reveal } from "@/components/ui/Reveal";

export function ProblemSection() {
  return (
    <section className="px-[var(--edge-pad)] py-20">
      <div className="mx-auto max-w-(--prose-w)">
        <Reveal>
          <SectionTitle>O problema que ninguém teve coragem de te falar</SectionTitle>
        </Reveal>

        <Reveal delay={1}>
          <p className="max-w-full text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            Você não tem um problema de esforço. Você trabalha mais do que a maioria: acorda
            pensando em campanha, dorme rolando o feed atrás da próxima &quot;sacada&quot;, já
            perdeu fim de semana ajustando anúncio que no domingo à noite ainda estava no
            vermelho.
          </p>
        </Reveal>
        <Reveal delay={1}>
          <p
            className="mt-[18px] max-w-full text-body-color"
            style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
          >
            O seu problema é mais cruel do que isso:{" "}
            <strong className="text-white">
              você está fazendo tudo &quot;certo&quot;, e mesmo assim não sai do lugar.
            </strong>
          </p>
        </Reveal>
        <Reveal delay={2}>
          <p
            className="mt-[18px] max-w-full text-body-color"
            style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
          >
            Você troca o criativo… e o{" "}
            <strong className="font-bold text-blue-light">CPA continua subindo</strong>. Troca
            o público… e o{" "}
            <strong className="font-bold text-blue-light">ROI oscila do 3 pro 0,8</strong> sem
            explicação. Aumenta o orçamento pra escalar… e o resultado, em vez de crescer junto,{" "}
            <strong className="font-bold text-blue-light">desaba</strong>.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <p
            className="mt-[18px] max-w-full text-body-color"
            style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
          >
            E aí bate aquela sensação que você não conta pra ninguém: a de que talvez o
            problema seja <em>você</em>. Que todo mundo descobriu um segredo que ninguém te
            passou. Que você está sempre a uma campanha de distância de &quot;finalmente
            engrenar&quot;, mas essa campanha nunca chega.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <p
            className="mt-[18px] max-w-full text-body-color"
            style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
          >
            <strong className="text-white">
              Não é você. É a estrutura por trás da sua operação, e ela é invisível de dentro.
            </strong>{" "}
            Ninguém consegue ler o próprio rótulo estando dentro do vidro. É por isso que você
            pode ser inteligente, dedicado, estudioso… e continuar travado exatamente no mesmo
            número há meses.
          </p>
        </Reveal>

        <Reveal delay={4}>
          <HookBox>
            <p>
              E essa estrutura invisível cobra caro:{" "}
              <strong>
                8 de cada 10 operações que &quot;gastam mais em tráfego&quot; estão, na
                verdade, escalando o prejuízo
              </strong>
              , e existe uma única métrica que separa quem escala de quem só queima verba.{" "}
              <em>(role e descubra ↓)</em>
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
