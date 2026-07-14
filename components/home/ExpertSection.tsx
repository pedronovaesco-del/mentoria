import Image from "next/image";
import { HookBox, SectionTag } from "@/components/ui/SectionText";
import { StatCard } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: "8+", label: "revenue digits" },
  { value: "20", label: "years old" },
  { value: "33+", label: "active mentees" },
  { value: "4.9★", label: "average rating" },
];

export function ExpertSection() {
  return (
    <section id="expert" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)] text-center">
      <div className="mx-auto max-w-(--prose-w)">
        <Reveal>
          <SectionTag>Who&apos;s guiding you</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            I&apos;m <span className="text-3d-gradient">Pedro Novaes</span>
            <br />
            <span className="text-[0.75em] text-white/70">
              and I sat exactly in the chair you&apos;re sitting in right now
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
                alt="Pedro Novaes monitoring operations day to day"
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
            📍 I started with no mentor, no capital, and results that swung wildly every week.
            I learned the most expensive way possible: burning my own money on campaigns until
            I understood what nobody had explained to me.
          </div>
        </Reveal>

        <Reveal delay={2}>
          <p className="mx-auto max-w-full text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            At 20 years old, I crossed 7 figures in revenue in the digital market: an
            operation 100% based in Brazil, my own product, and paid traffic. I don&apos;t
            sell illusions: I deliver method, system, and clarity. Everything I teach was
            tested first in my own operation, with my own money on the line.
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
              It was by making mistakes with my own money that I built{" "}
              <strong>
                the 3-point check I now run on your structure in under 10 minutes of a call
              </strong>
              : the same one that revealed where Arthur was stuck before he hit R$1,000/day.
            </p>
          </HookBox>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <h3
              className="mb-3.5 font-grotesk font-bold"
              style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)", lineHeight: 1.3 }}
            >
              The mechanism of the solution
            </h3>
          </Reveal>
          <Reveal delay={1}>
            <p className="mx-auto max-w-full text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              It&apos;s not luck, it&apos;s not a lucky winning product. It&apos;s{" "}
              <strong className="text-white">structure</strong>: predictable ROI, an operation
              that runs without depending on your mood that day, and you holding the{" "}
              <strong className="text-white">2 or 3 levers</strong> that actually move
              revenue. The diagnostic call exists to show you exactly where your structure has
              holes, and which lever to pull first.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <HookBox>
            <p className="text-center">
              And here&apos;s the detail almost nobody sees:{" "}
              <strong>
                which 2 or 3 levers those are changes from operation to operation, and
                they&apos;re rarely the ones you imagine.
              </strong>{" "}
              That&apos;s exactly what I isolate on your account in the first few minutes of
              the call, so you stop spending energy on what doesn&apos;t move the needle.
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
