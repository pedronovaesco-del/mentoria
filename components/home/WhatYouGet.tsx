import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

export function WhatYouGet() {
  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)] text-center">
      <div className="mx-auto max-w-(--prose-w)">
        <Reveal>
          <SectionTag>45 minutes · what comes out the other side</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="mx-auto font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            What you get from the diagnostic call
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            This isn&apos;t a disguised sales pitch. It&apos;s your operation open on screen,
            reviewed by someone who&apos;s already scaled their own. You walk away with the{" "}
            <strong className="hl">exact bottleneck</strong> holding back your scale today,
            called out by name, not guesswork. The{" "}
            <strong className="hl">2 or 3 priority levers</strong> to pull first, and what to
            ignore for now. An{" "}
            <strong className="hl">action plan to apply this week</strong>, without depending
            on another course. And clarity to stop swapping creatives and audiences in the
            dark, and act with direction.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
