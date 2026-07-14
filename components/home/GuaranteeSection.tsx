import { Reveal } from "@/components/ui/Reveal";

export function GuaranteeSection() {
  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <Reveal>
        <div className="mx-auto flex max-w-[780px] flex-col items-start gap-6 rounded-lg border border-success/20 bg-success/5 px-6 py-8 sm:flex-row sm:px-[52px] sm:py-12">
          <div className="shrink-0 text-[52px] leading-none">🛡️</div>
          <div>
            <h3
              className="mb-3 font-grotesk font-bold text-[#34D399]"
              style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)" }}
            >
              Value guarantee: you don&apos;t walk away empty-handed
            </h3>
            <p className="text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              If you leave the diagnostic call without at least{" "}
              <strong className="text-white">3 actionable, specific insights</strong> for
              your business, message me and I&apos;ll schedule a second session, at no cost.
              It&apos;s that simple.
              <br />
              <br />The call is free. The value you get from it isn&apos;t.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
