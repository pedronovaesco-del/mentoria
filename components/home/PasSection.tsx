import { HookBox, SectionTag, SectionTitle } from "@/components/ui/SectionText";
import { Reveal } from "@/components/ui/Reveal";
import { PasBlock } from "./PasBlock";

export function PasSection() {
  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--prose-w)">
        <Reveal>
          <SectionTag>O diagnóstico da realidade</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <SectionTitle className="max-w-full">
            O problema não é só o mês que fechou no vermelho.
            <br />É pra onde isso leva se nada mudar.
          </SectionTitle>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-14">
            <PasBlock variant="red" title="🔴 A cena que você conhece de cor">
              <p>
                São 23h. A casa está dormindo. Você passou o dia inteiro trocando criativo,
                ajustando público, reescrevendo copy. Gastou mais R$500 em tráfego. Abre o
                dashboard, o coração acelera um pouco antes do número carregar, e lá está:{" "}
                <strong className="text-white">ROI 0,6. De novo.</strong> Você fecha o notebook
                com aquele nó no estômago e a mesma pergunta martelando. Não é{" "}
                <em>&quot;o que eu faço amanhã?&quot;</em>. É a pior de todas:{" "}
                <strong className="text-white">
                  &quot;por que nada do que eu faço funciona?&quot;
                </strong>
              </p>
            </PasBlock>

            <PasBlock variant="orange" title="🟠 O dinheiro é só a parte visível do estrago">
              <p>
                Some tudo que você já enterrou em tráfego que nunca voltou. Some os cursos que
                você comprou achando que <em>o próximo</em> seria a peça que faltava. Mas o
                estrago de verdade não aparece no seu extrato:
              </p>
              <p>
                <strong className="hl">Financeiro:</strong> cada dia rodando no escuro é verba
                queimada &quot;testando&quot; o que um diagnóstico resolveria em minutos.{" "}
                <strong className="hl">Tempo:</strong> são as horas, e os meses, que você nunca
                mais recupera — preso num ciclo de tentativa e erro que não vira aprendizado,
                vira burnout.
              </p>
              <p>
                <strong className="hl">Emocional:</strong> a ansiedade de abrir o dashboard
                toda manhã, a culpa de não estar presente enquanto a cabeça está na campanha, a
                vergonha silenciosa de postar &quot;bora&quot; sem saber, por dentro, se o mês
                vai fechar.{" "}
                <strong className="hl">Oportunidade:</strong> enquanto você roda em círculos, o
                concorrente que achou o método está escalando — e o seu próprio tráfego fica
                cada vez mais caro. O mercado não espera por você.
              </p>
            </PasBlock>

            <PasBlock variant="yellow" title="🟡 O custo composto de ficar &quot;quase lá&quot;">
              <p>
                Aqui está a parte que quase ninguém para pra calcular: isso não fica parado.{" "}
                <strong className="text-white">Piora sozinho.</strong> Cada semana sem
                estrutura é mais um pico de esperança seguido de mais uma frustração, e a cada
                ciclo, um pedaço da sua crença de que <em>as coisas podem virar</em> escorre pelo
                ralo. O risco real não é fechar mais um mês ruim. É você, daqui a seis meses,
                olhando pra trás e percebendo que trabalhou o dobro, gastou mais, e está{" "}
                <em>exatamente</em> no mesmo lugar — só que mais cansado e mais desiludido.{" "}
                <strong className="text-white">
                  É assim que gente boa desiste: não de uma vez, mas um mês frustrante de
                  cada vez.
                </strong>
              </p>
            </PasBlock>

            <PasBlock variant="green" title="🟢 E a parte mais injusta de tudo">
              <p>
                Não é falta de esforço — disso você tem de sobra.{" "}
                <strong className="text-white">É falta de método.</strong> E método não se
                resolve trabalhando mais horas, comprando mais um curso ou trocando o criativo
                pela 40ª vez. Se resolve enxergando o que está{" "}
                <strong className="text-white">invisível pra você agora</strong>, porque está
                dentro da sua própria operação, no ponto cego que só um olhar de fora consegue
                apontar.
              </p>
            </PasBlock>

            <PasBlock variant="blue" title="🔵 A saída existe, e ela tem nome">
              <p>
                Existe um padrão nos negócios digitais que escalam de forma consistente, e não
                tem nada a ver com &quot;produto da sorte&quot;. É estrutura. Esse é exatamente
                o ponto cego que a call de diagnóstico foi feita pra iluminar: em 45 minutos,
                com sua operação aberta na tela.
              </p>
            </PasBlock>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <HookBox>
            <p>
              Antes de se culpar de novo:{" "}
              <strong>
                o motivo real do seu ROI estar travado no mesmo número por meses quase nunca
                tem a ver com criativo ruim ou público errado
              </strong>
              : a maioria das pessoas puxa exatamente a alavanca que não move nada, e é por
              isso que empurra mais forte e continua travada.
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
