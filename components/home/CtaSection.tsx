import { CTAButton } from "@/components/ui/CTAButton";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";

export function CtaSection() {
  return (
    <section id="cta" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)] text-center">
      <Reveal>
        <Glass className="mx-auto max-w-[800px] rounded-lg p-9 sm:px-12 sm:py-[72px]">
          <span className="mb-5 block text-center text-[11px] font-semibold uppercase tracking-[2.5px] text-blue-light">
            100% free · 45 minutes · No commitment
          </span>
          <h2
            className="font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            Ready to stop working harder
            <br />
            <span className="text-3d-gradient">and start earning more?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-[520px] text-[16px] leading-[1.8] text-white/68">
            Answer 7 quick questions, secure your spot, and get a personalized strategic
            diagnosis for your digital business. Pedro Novaes will reach out within 2 hours.
            <br />
            <br />The difference between this month and the next is{" "}
            <strong className="text-white">a 2-minute decision.</strong>
          </p>
          <CTAButton href="/quiz" variant="primary" className="!text-base !py-[18px] !px-11">
            Secure my free diagnostic call
          </CTAButton>
        </Glass>
      </Reveal>
    </section>
  );
}
