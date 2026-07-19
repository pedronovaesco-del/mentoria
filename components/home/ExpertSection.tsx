import Image from "next/image";
import { HookBox, SectionTag } from "@/components/ui/SectionText";
import { StatCard } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: "8+", label: "dígitos de faturamento" },
  { value: "20", label: "anos de idade" },
  { value: "33+", label: "mentorados ativos" },
  { value: "4.9★", label: "avaliação média" },
];

export function ExpertSection() {
  return (
    <section id="expert" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)] text-center">
      <div className="mx-auto max-w-(--prose-w)">
        <Reveal>
          <SectionTag>Quem está te guiando</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            Eu sou <span className="text-3d-gradient">Pedro Novaes</span>
            <br />
            <span className="text-[0.75em] text-white/70">
              e já sentei exatamente na cadeira em que você está agora
            </span>
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <div className="relative mx-auto mt-7 max-h-[540px] max-w-[340px] overflow-hidden rounded-lg border border-white/8 bg-[#0b0b10] shadow-[0_32px_80px_rgba(26,86,255,.14),inset_0_1px_0_rgba(255,255,255,0.10)]">
            <Image
              src="/images/expert/pedronovaes1.jpeg"
              alt="Pedro Novaes"
              width={1024}
              height={1280}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
          <div className="mx-auto mt-5 flex max-w-[420px] justify-center gap-4">
            <div
              className="min-w-0 flex-1 overflow-hidden rounded-md border border-blue/20 bg-[#0b0b10] shadow-[0_16px_36px_rgba(0,0,0,0.40)]"
              style={{ transform: "rotate(-4deg)" }}
            >
              <Image
                src="/images/expert/expert.jpg"
                alt="Pedro Novaes"
                width={1086}
                height={1448}
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
            <div
              className="min-w-0 flex-1 overflow-hidden rounded-md border border-blue/20 bg-[#0b0b10] shadow-[0_16px_36px_rgba(0,0,0,0.40)]"
              style={{ transform: "rotate(4deg)" }}
            >
              <Image
                src="/images/expert/expert3.jpg"
                alt="Pedro Novaes acompanhando operações no dia a dia"
                width={960}
                height={1280}
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-7 mb-4 inline-flex items-center gap-2 rounded-sm border border-blue/20 bg-blue/8 px-4 py-2 text-[13px] leading-[1.5] text-white/60">
            📍 Comecei sem mentor, sem capital, com resultados que oscilavam violentamente
            toda semana. Aprendi da forma mais cara possível: queimando meu próprio dinheiro em
            campanhas até entender o que ninguém tinha me explicado.
          </div>
        </Reveal>

        <Reveal delay={2}>
          <p className="mx-auto max-w-full text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            Aos 20 anos, cruzei os 7 dígitos de faturamento no mercado digital: uma operação
            100% brasileira, produto próprio e tráfego pago. Eu não vendo ilusão: eu entrego
            método, sistema e clareza. Tudo que eu ensino foi testado primeiro na minha
            própria operação, com meu próprio dinheiro em jogo.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={3}>
          <HookBox>
            <p className="text-center">
              Foi errando com meu próprio dinheiro que eu construí{" "}
              <strong>
                a checagem de 3 pontos que hoje aplico na sua estrutura em menos de 10 minutos
                de call
              </strong>
              : a mesma que revelou onde o Arthur estava travado antes de ele bater
              R$1.000/dia.
            </p>
          </HookBox>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <h3
              className="mb-3.5 font-grotesk font-bold"
              style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)", lineHeight: 1.3 }}
            >
              O mecanismo da solução
            </h3>
          </Reveal>
          <Reveal delay={1}>
            <p className="mx-auto max-w-full text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              Não é sorte, não é produto da sorte. É{" "}
              <strong className="text-white">estrutura</strong>: ROI previsível, uma operação
              que roda sem depender do seu humor naquele dia, e você segurando as{" "}
              <strong className="text-white">2 ou 3 alavancas</strong> que realmente movem o
              faturamento. A call de diagnóstico existe pra te mostrar exatamente onde sua
              estrutura tem furos, e qual alavanca puxar primeiro.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <HookBox>
            <p className="text-center">
              E aqui está o detalhe que quase ninguém vê:{" "}
              <strong>
                quais são essas 2 ou 3 alavancas muda de operação pra operação, e raramente são
                as que você imagina.
              </strong>{" "}
              É exatamente isso que eu isolo na sua conta nos primeiros minutos da call, pra
              você parar de gastar energia no que não move o ponteiro.
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
