import { CTAButton } from "@/components/ui/CTAButton";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

const YES = [
  "You already sell online, but you've been stuck at the same level for months and can't pinpoint the exact reason",
  "You have campaigns running, but ROI swings every week and you don't trust next month",
  'You\'re tired of swapping creatives, copy, and audiences in the dark, hoping to "get it right" on the next try',
  "You want to get out of survival mode and have predictable revenue, not just another lucky month",
  "You're willing to implement what comes out of the call in the next 30 days, with real commitment",
];

const NO = [
  'You\'re looking for effortless results or a "guaranteed magic formula"',
  "You already consistently make 7 figures/month with a structured operation (you don't need this)",
  "You don't have 30 days to implement any change right now",
  "You'd rather stack up another course before acting (analysis paralysis)",
  "You're looking for someone to tell you everything's fine, not an honest diagnosis",
];

export function ForWhoSection() {
  return (
    <section id="para-quem" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--container-w)">
        <div className="mx-auto max-w-[560px] text-center">
          <Reveal>
            <SectionTag>Qualification</SectionTag>
          </Reveal>
          <Reveal delay={1}>
            <h2
              className="font-grotesk font-bold leading-[1.05] mb-5"
              style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
            >
              Is this call
              <br />
              <span className="text-3d-gradient">for you?</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              Be honest with yourself. The call is free, but your time and mine aren&apos;t.
              That&apos;s why it&apos;s not for everyone.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal delay={1} className="h-full">
            <Glass className="h-full border-success/15! bg-success/5! rounded-lg p-9">
              <h3 className="mb-5 flex items-center gap-2.5 font-grotesk font-bold" style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)" }}>
                <span className="text-lg">✅</span> This call is for you if:
              </h3>
              <div className="flex flex-col gap-2.5">
                {YES.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3.5 rounded-md border border-success/12 bg-success/[0.04] px-4 py-3.5 font-medium text-white/85"
                    style={{ fontSize: "18px", lineHeight: 1.65 }}
                  >
                    <span className="mt-px flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-success/25 bg-success/15 text-sm font-bold text-[#34D399]">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </Glass>
          </Reveal>

          <Reveal delay={2} className="h-full">
            <Glass className="h-full border-danger/12! bg-danger/5! rounded-lg p-9">
              <h3 className="mb-5 flex items-center gap-2.5 font-grotesk font-bold" style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)" }}>
                <span className="text-lg">❌</span> This call is NOT for you if:
              </h3>
              <div className="flex flex-col gap-2.5">
                {NO.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3.5 rounded-md border border-danger/10 bg-danger/[0.03] px-4 py-3.5 font-medium text-white/85"
                    style={{ fontSize: "18px", lineHeight: 1.65 }}
                  >
                    <span className="mt-px flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-danger/20 bg-danger/12 text-sm font-bold text-[#F87171]">
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
              That&apos;s me! I want the call
            </CTAButton>
            <p className="mt-3.5 text-[13px] text-white/40">
              100% free · No commitment · Response within 2h
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
