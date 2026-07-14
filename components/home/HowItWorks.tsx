import { CTAButton } from "@/components/ui/CTAButton";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

const STEPS = [
  {
    n: 1,
    title: "Take the diagnostic",
    body: "4 quick questions about where you are right now. Less than 2 minutes, and it's what lets me walk into the call already knowing where you're losing money.",
  },
  {
    n: 2,
    title: "We schedule your call",
    body: (
      <>
        I&apos;ll reach out within <strong className="text-white">2 hours</strong> to confirm
        the best time. 45 minutes, 100% online, with your operation open on screen.
      </>
    ),
  },
  {
    n: 3,
    title: "Walk away with the plan in hand",
    body: "You end the call knowing exactly what to do the next day: with clarity, a defined priority, and without depending on another course to get started.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--container-w)">
        <div className="mx-auto max-w-[560px] text-center">
          <Reveal>
            <SectionTag>The process</SectionTag>
          </Reveal>
          <Reveal delay={1}>
            <h2
              className="font-grotesk font-bold leading-[1.05] mb-5"
              style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
            >
              In 3 steps you go from
              <br />
              <span className="text-3d-gradient">guesswork to a plan</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              No fluff. No hard sell. In less than a week you trade &quot;try again&quot; for
              a clear path forward.
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
              You&apos;ve already seen the whole process. All that&apos;s left is{" "}
              <strong className="text-white">step 1</strong>.
            </p>
            <CTAButton href="/quiz" className="!text-[15px] !py-4 !px-8">
              Take the diagnostic now (2 min)
            </CTAButton>
            <p className="mt-[18px] text-[13px] text-white/40">
              No cost, no commitment. Worst case, you walk away with clarity you didn&apos;t
              have, for free.
            </p>
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
