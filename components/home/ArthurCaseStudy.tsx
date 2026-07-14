import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const CONTEXT_ITEMS = ["📅 7 days of mentoring", "🚫 No prior experience", "✅ Consistent result"];

export function ArthurCaseStudy() {
  return (
    <section id="arthur" className="border-y border-blue/10 px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto grid max-w-(--container-w) grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-pill border border-blue/28 bg-blue/10 px-5 py-2.5 text-[13px] font-semibold text-blue-light">
              <span className="h-2 w-2 rounded-full bg-blue" />
              Real case study · 7 days of coaching
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2
              className="font-grotesk font-bold leading-[1.05] mb-5"
              style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
            >
              <span className="text-white/70">Arthur started from zero.</span>
              <br />
              <span className="text-3d-gradient">In 7 days:</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div
              className="text-3d-gradient font-grotesk font-bold leading-none my-6"
              style={{ fontSize: "clamp(52px,9vw,90px)", letterSpacing: "-4px" }}
            >
              R&nbsp;1.000<span className="text-[0.4em]">/day</span>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <p className="text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              Arthur came in with zero experience in paid traffic and no prior results at
              all. It was 7 days of 1-on-1 coaching: live campaign analysis, structure fixes,
              and copy adjustments. By the end of the first week, he was hitting{" "}
              <strong className="text-white">R$1,000 in revenue per day</strong>, consistently
              — not a lucky spike.
            </p>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-5 flex flex-wrap gap-3">
              {CONTEXT_ITEMS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 rounded-sm border border-white/8 bg-white/5 px-3 py-1.5 text-[13px] text-white/50"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal delay={1} className="grid grid-cols-1 gap-5">
            <div className="mx-auto flex w-full max-w-[340px] max-h-[600px] items-center justify-center overflow-hidden rounded-md border border-blue/20 bg-[#0b0b10]">
              <Image
                src="/images/resultados/arthur.jpg"
                alt="Arthur's result on day one of operation"
                width={738}
                height={1600}
                className="h-auto max-h-[600px] w-auto max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="mx-auto w-full max-w-[340px]">
              <div className="flex items-center justify-center overflow-hidden rounded-md border border-blue/20 bg-[#0b0b10]">
                <Image
                  src="/images/resultados/callmentoria2.jpg"
                  alt="Live 1-on-1 coaching with a mentee"
                  width={960}
                  height={1280}
                  className="h-auto max-h-[400px] w-auto max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="mt-2.5 text-center text-[13px] text-white/45">
                Live 1-on-1 coaching: building the operation in real time
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
