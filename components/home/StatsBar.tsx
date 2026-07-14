import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: "500+", label: <>diagnostic calls<br />completed</> },
  { value: "33+", label: <>active<br />mentees</> },
  { value: "R$80.3M+", label: <>revenue generated<br />by students</> },
  { value: "4.9★", label: <>average rating<br />from mentees</> },
];

export function StatsBar() {
  return (
    <div className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--container-w)">
        <div className="grid grid-cols-2 gap-0 rounded-lg border border-blue/10 bg-gradient-to-r from-blue/6 to-blue-mid/3 px-2 py-5 text-center md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i as 0 | 1 | 2 | 3} className="relative px-5 py-4">
              {i > 0 && (
                <span className="absolute inset-y-[20%] left-0 hidden w-px bg-white/8 md:block" />
              )}
              <div
                className="bg-gradient-to-r from-white to-blue-light bg-clip-text font-grotesk font-extrabold text-transparent"
                style={{ fontSize: "clamp(26px,3.5vw,38px)", letterSpacing: "-1.5px" }}
              >
                {s.value}
              </div>
              <div className="mt-1 text-[13px] leading-[1.4] text-white/45">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
