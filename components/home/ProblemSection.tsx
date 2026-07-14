import { HookBox, SectionTitle } from "@/components/ui/SectionText";
import { Reveal } from "@/components/ui/Reveal";

export function ProblemSection() {
  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--prose-w)">
        <Reveal>
          <SectionTitle>The problem nobody had the guts to tell you</SectionTitle>
        </Reveal>

        <Reveal delay={1}>
          <p className="max-w-full text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            You don&apos;t have an effort problem. You work harder than most: you wake up
            thinking about campaigns, fall asleep scrolling the feed for the next
            &quot;insight,&quot; and you&apos;ve already lost a weekend tweaking an ad that
            was still in the red on Sunday night.
          </p>
        </Reveal>
        <Reveal delay={1}>
          <p
            className="mt-[18px] max-w-full text-body-color"
            style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
          >
            Your problem is crueler than that:{" "}
            <strong className="text-white">
              you&apos;re doing everything &quot;right,&quot; and you still aren&apos;t moving forward.
            </strong>
          </p>
        </Reveal>
        <Reveal delay={2}>
          <p
            className="mt-[18px] max-w-full text-body-color"
            style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
          >
            You swap the creative… and{" "}
            <strong className="font-bold text-blue-light">CPA keeps climbing</strong>. You
            change the audience… and{" "}
            <strong className="font-bold text-blue-light">ROI swings from 3 to 0.8</strong> with
            no explanation. You raise the budget to scale… and instead of growing with it,{" "}
            <strong className="font-bold text-blue-light">results collapse</strong>.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <p
            className="mt-[18px] max-w-full text-body-color"
            style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
          >
            And then that feeling hits — the one you don&apos;t tell anyone about: that maybe
            the problem is <em>you</em>. That everyone else found out a secret nobody passed
            on to you. That you&apos;re always one campaign away from &quot;finally
            clicking,&quot; but that campaign never comes.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <p
            className="mt-[18px] max-w-full text-body-color"
            style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
          >
            <strong className="text-white">
              It&apos;s not you. It&apos;s the structure behind your operation, and it&apos;s invisible from the inside.
            </strong>{" "}
            Nobody can read the label on the jar while they&apos;re inside it. That&apos;s why
            you can be smart, dedicated, well-read… and still be stuck on the exact same number
            for months.
          </p>
        </Reveal>

        <Reveal delay={4}>
          <HookBox>
            <p>
              And that invisible structure comes at a steep price:{" "}
              <strong>
                8 out of 10 operations that &quot;spend more on traffic&quot; are actually
                just scaling their losses
              </strong>
              , and there&apos;s a single metric that separates those who scale from those who
              just burn budget.{" "}
              <em>(scroll to find out ↓)</em>
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
