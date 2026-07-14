import Image from "next/image";
import { Fragment } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";

const TRUST_ITEMS = [
  { icon: "✅", label: "100% free" },
  { icon: "🇧🇷", label: "Brazilian market" },
  { icon: "⚡", label: "Real action plan" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center text-center">
      <Reveal delay={0} className="relative mx-auto h-[360px] w-[280px] overflow-hidden rounded-2xl sm:h-[520px] sm:w-[400px]">
        <Image
          src="/images/expert/banner.png"
          alt="Pedro Novaes"
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: "50% 30%",
            maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          }}
        />
      </Reveal>

      <div className="relative z-10 -mt-16 flex flex-1 flex-col items-center justify-center px-[var(--edge-pad)] pb-[var(--section-spacing-y)] sm:-mt-20">
      <div className="relative mx-auto max-w-(--prose-w) overflow-hidden">
        <Reveal as="h1" delay={1} className="font-grotesk font-bold mb-6" >
          <span
            className="text-3d-gradient block"
            style={{
              fontSize: "var(--fs-h1)",
              lineHeight: "var(--lh-heading)",
              letterSpacing: "var(--ls-h1)",
            }}
          >
            You increase the budget
          </span>
          <span
            className="text-3d block text-white"
            style={{
              fontSize: "var(--fs-h1)",
              lineHeight: "var(--lh-heading)",
              letterSpacing: "var(--ls-h1)",
            }}
          >
            and ROI crashes
          </span>
          <span
            className="text-3d-gradient block"
            style={{
              fontSize: "var(--fs-h1)",
              lineHeight: "var(--lh-heading)",
              letterSpacing: "var(--ls-h1)",
            }}
          >
            …I&apos;ll show you why
          </span>
        </Reveal>

        <Reveal
          delay={2}
          as="p"
          className="mx-auto mb-10 max-w-(--prose-w) text-[clamp(17px,2.3vw,21px)] font-light leading-[1.75] text-white/65"
        >
          In <strong className="font-semibold text-white">45 minutes</strong>{" "}
          I&apos;ll show you the
          invisible bottleneck holding back your scale. A free, straight-to-the-point call
          pinpoints exactly where your digital business is leaking money. You&apos;ll walk away with the{" "}
          <strong className="font-semibold text-white">
            plan to fix it this week
          </strong>
          , no more courses to buy.
        </Reveal>

        <Reveal delay={3} className="mb-10 flex flex-col items-center gap-3.5">
          <CTAButton href="/quiz" variant="primary" className="!text-[15px] !py-4 !px-9">
            Find the bottleneck blocking my scale
          </CTAButton>
          <a
            href="#como-funciona"
            className="text-[13px] text-white/35 underline underline-offset-2"
          >
            prefer to understand first? See how it works ↓
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
