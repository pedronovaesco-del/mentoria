import Image from "next/image";
import { Fragment } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";

const TRUST_ITEMS = [
  { icon: "✅", label: "100% gratuito" },
  { icon: "🇧🇷", label: "Mercado brasileiro" },
  { icon: "⚡", label: "Plano de ação real" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center text-center">
      <Reveal delay={0} className="relative h-[420px] w-full overflow-hidden sm:mx-auto sm:h-[800px] sm:w-[580px] sm:rounded-2xl">
        <Image
          src="/images/expert/banner-cropped.png"
          alt="Pedro Novaes"
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: "50% 48%",
            maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          }}
        />
      </Reveal>

      <div className="relative z-10 -mt-28 flex flex-1 flex-col items-center justify-center px-[var(--edge-pad)] pb-[var(--section-spacing-y)] sm:-mt-52">
      <div className="relative mx-auto max-w-(--prose-w) overflow-hidden">
        <div
          className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[50%] blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--ink) 45%, transparent 100%)" }}
        />
        <Reveal as="h1" delay={1} className="font-grotesk font-bold mb-6" >
          <span
            className="text-3d-gradient block"
            style={{
              fontSize: "var(--fs-h1)",
              lineHeight: "var(--lh-heading)",
              letterSpacing: "var(--ls-h1)",
            }}
          >
            Você aumenta a verba
          </span>
          <span
            className="text-3d block text-white"
            style={{
              fontSize: "var(--fs-h1)",
              lineHeight: "var(--lh-heading)",
              letterSpacing: "var(--ls-h1)",
            }}
          >
            e o ROI despenca
          </span>
          <span
            className="text-3d-gradient block"
            style={{
              fontSize: "var(--fs-h1)",
              lineHeight: "var(--lh-heading)",
              letterSpacing: "var(--ls-h1)",
            }}
          >
            …eu mostro por quê
          </span>
        </Reveal>

        <Reveal
          delay={2}
          as="p"
          className="mx-auto mb-10 max-w-(--prose-w) text-[clamp(17px,2.3vw,21px)] font-light leading-[1.75] text-white/65"
        >
          Em <strong className="font-semibold text-white">45 minutos</strong> eu te mostro o
          gargalo invisível que trava a sua escala. Uma call gratuita e sem enrolação encontra
          o ponto exato onde o seu negócio digital está vazando dinheiro. Você sai com o{" "}
          <strong className="font-semibold text-white">
            plano pra corrigir ainda essa semana
          </strong>
          , sem comprar mais nenhum curso.
        </Reveal>

        <Reveal delay={3} className="mb-10 flex flex-col items-center gap-3.5">
          <CTAButton href="/quiz" variant="primary" className="!text-[15px] !py-4 !px-9">
            Descobrir o gargalo que trava a minha escala
          </CTAButton>
          <a
            href="#como-funciona"
            className="text-[13px] text-white/35 underline underline-offset-2"
          >
            prefere entender antes? Veja como funciona ↓
          </a>
        </Reveal>

        <Reveal delay={4} className="flex flex-wrap items-center justify-center gap-6">
          {TRUST_ITEMS.map((item, i) => (
            <Fragment key={item.label}>
              {i > 0 && <span className="text-white/20">|</span>}
              <span className="flex items-center gap-2 text-[13px] font-medium text-white/45">
                <span>{item.icon}</span> {item.label}
              </span>
            </Fragment>
          ))}
        </Reveal>
      </div>
      </div>
    </section>
  );
}
