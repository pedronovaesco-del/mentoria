import { HookBox, SectionTag, SectionTitle } from "@/components/ui/SectionText";
import { Reveal } from "@/components/ui/Reveal";
import { PasBlock } from "./PasBlock";

export function PasSection() {
  return (
    <section className="px-[var(--edge-pad)] py-20">
      <div className="mx-auto max-w-(--prose-w)">
        <Reveal>
          <SectionTag>O diagnóstico da realidade</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <SectionTitle className="max-w-full">
            O problema não é só o mês que fechou no vermelho.
            <br />É pra onde isso te leva se nada mudar.
          </SectionTitle>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-14">
            <PasBlock variant="red" title="🔴 O cenário que você conhece de cor">
              <p>
                São 23h. A casa dormiu. Você passou o dia inteiro trocando criativo, mexendo em
                público, reescrevendo copy. Gastou mais R$ 500 em tráfego. Abre o painel, o
                coração acelera um pouco antes do número carregar, e lá está:{" "}
                <strong className="text-white">ROI 0.6. De novo.</strong> Você fecha o notebook
                com aquele nó no estômago e a mesma pergunta insistente. Não é{" "}
                <em>&quot;o que eu faço amanhã?&quot;</em>. É a pior de todas:{" "}
                <strong className="text-white">
                  &quot;por que nada do que eu faço funciona?&quot;
                </strong>
              </p>
            </PasBlock>

            <PasBlock variant="orange" title="🟠 O dinheiro é só a parte visível do prejuízo">
              <p>
                Some o que você já enterrou em tráfego que não voltou. Some os cursos que você
                comprou achando que <em>o próximo</em> seria o que faltava. Mas o rombo de
                verdade não aparece no extrato:
              </p>
              <p>
                <strong className="hl">Financeiro:</strong> cada dia rodando no escuro é
                orçamento queimado pra &quot;testar&quot; o que um diagnóstico resolveria em
                minutos. <strong className="hl">Tempo:</strong> são as horas, e os meses, que
                você nunca mais recupera, presos num ciclo de tentativa e erro que não vira
                aprendizado, vira desgaste.
              </p>
              <p>
                <strong className="hl">Emocional:</strong> a ansiedade de abrir o painel toda
                manhã, a culpa de não estar presente enquanto a cabeça está na campanha, a
                vergonha silenciosa de postar &quot;bora&quot; enquanto por dentro você não sabe
                se o mês fecha. <strong className="hl">Oportunidade:</strong> enquanto você
                patina, o concorrente que achou o método está escalando com a <em>sua</em> verba
                de anúncio ficando mais cara. O mercado não te espera.
              </p>
            </PasBlock>

            <PasBlock variant="yellow" title="🟡 O custo composto de continuar &quot;quase acertando&quot;">
              <p>
                Aqui está a parte que quase ninguém para pra calcular: isso não fica parado.{" "}
                <strong className="text-white">Piora sozinho.</strong> Cada semana sem estrutura
                é mais um pico de esperança seguido de mais uma frustração, e a cada ciclo, um
                pedaço da sua confiança de que <em>dá pra virar</em> vai embora. O risco real
                não é fechar mais um mês ruim. É você, daqui a seis meses, olhar pra trás e
                perceber que trabalhou o dobro, gastou mais, e está <em>exatamente</em> no
                mesmo lugar, só que mais cansado e mais descrente.{" "}
                <strong className="text-white">
                  É assim que gente boa desiste: não de uma vez, mas um mês frustrante de cada
                  vez.
                </strong>
              </p>
            </PasBlock>

            <PasBlock variant="green" title="🟢 E o mais injusto de tudo">
              <p>
                Não é falta de esforço: você tem esforço de sobra.{" "}
                <strong className="text-white">É falta de método.</strong> E método não se
                conserta trabalhando mais horas, comprando mais um curso ou trocando o criativo
                pela 40ª vez. Se conserta enxergando o que está{" "}
                <strong className="text-white">invisível pra você agora</strong>, porque está
                dentro da sua própria operação, no ponto cego que só quem olha de fora consegue
                apontar.
              </p>
            </PasBlock>

            <PasBlock variant="blue" title="🔵 A porta de saída existe, e tem nome">
              <p>
                Existe um padrão nos negócios digitais que escalam com consistência, e ele não
                tem nada a ver com &quot;produto vencedor sortudo&quot;. É estrutura. É
                exatamente esse ponto cego que a call diagnóstica foi feita pra iluminar: em 45
                minutos, com a sua operação aberta na tela.
              </p>
            </PasBlock>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <HookBox>
            <p>
              Antes de você se culpar de novo:{" "}
              <strong>
                o verdadeiro motivo do seu ROI travar no mesmo número há meses quase nunca tem a
                ver com criativo ruim ou público errado
              </strong>
              : a maioria mexe justo na alavanca que não move nada, e é por isso que se esforça
              mais e continua parada.
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
