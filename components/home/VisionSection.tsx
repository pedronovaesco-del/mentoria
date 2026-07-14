import { HookBox, SectionTag } from "@/components/ui/SectionText";
import { Reveal } from "@/components/ui/Reveal";

const VISION_ITEMS = [
  { icon: "📈", label: "Predictable revenue" },
  { icon: "⏱️", label: "Operation that runs without depending on you" },
  { icon: "🎯", label: "Consistent ROI every month" },
  { icon: "🧠", label: "Exact clarity on where to invest" },
];

export function VisionSection() {
  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)] text-center">
      <div className="mx-auto max-w-(--container-w)">
        <Reveal>
          <SectionTag>What&apos;s on the other side</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <p
            className="mx-auto mb-10 max-w-[760px] font-serif italic text-white/90"
            style={{ fontSize: "clamp(22px,3.5vw,36px)", lineHeight: 1.6 }}
          >
            Imagine opening the dashboard on day 1 of the month and already knowing, with a
            small margin of error, how much you&apos;re going to make. Campaigns running
            consistently. No hunting for a winning product every week. Just{" "}
            <strong className="text-blue">an operation with real predictability</strong>, and
            you in control of it.
            <br />
            <br />
            This isn&apos;t luck. It&apos;s what happens when you stop guessing and start{" "}
            <strong className="text-3d-gradient">following a system</strong>.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {VISION_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-[15px] font-medium text-white/60">
                <span>{item.icon}</span> {item.label}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={3}>
          <HookBox>
            <p className="text-center">
              Notice what really changes:{" "}
              <strong>
                it&apos;s not just about no longer depending on a &quot;lucky winning
                product&quot; every week
              </strong>
              : it&apos;s opening the dashboard on day 1 of the month already knowing, without
              that knot in your stomach, how much you&apos;re going to make. That peace of
              mind starts with a 45-minute call.
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
