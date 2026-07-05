import { HookBox, SectionTag } from "@/components/ui/SectionText";
import { Reveal } from "@/components/ui/Reveal";

const VISION_ITEMS = [
  { icon: "📈", label: "Faturamento previsível" },
  { icon: "⏱️", label: "Operação que roda sem depender de você" },
  { icon: "🎯", label: "ROI consistente todo mês" },
  { icon: "🧠", label: "Clareza exata de onde investir" },
];

export function VisionSection() {
  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)] text-center">
      <div className="mx-auto max-w-(--container-w)">
        <Reveal>
          <SectionTag>O que está do outro lado</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <p
            className="mx-auto mb-10 max-w-[760px] font-serif italic text-white/90"
            style={{ fontSize: "clamp(22px,3.5vw,36px)", lineHeight: 1.6 }}
          >
            Imagine abrir o painel no dia 1 do mês e já saber, com margem pequena de erro,
            quanto você vai faturar. Campanha rodando com consistência. Sem caçar produto
            vencedor toda semana. Só <strong className="text-blue">uma operação com
            previsibilidade real</strong>, e você no controle dela.
            <br />
            <br />
            Isso não é sorte. É o que acontece quando você para de adivinhar e passa a{" "}
            <strong className="text-3d-gradient">seguir um sistema</strong>.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {VISION_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-[15px] font-medium text-white/60">
                <span>{item.icon}</span> {item.label}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={3}>
          <HookBox>
            <p className="text-center">
              Repare no que muda de verdade:{" "}
              <strong>
                não é só parar de depender de &quot;produto vencedor sortudo&quot; toda semana
              </strong>
              : é abrir o painel no dia 1 do mês já sabendo, sem aquele nó no estômago, quanto
              você vai faturar. Essa tranquilidade começa com uma call de 45 minutos.
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
