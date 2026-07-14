import Image from "next/image";
import { Glass } from "@/components/ui/Glass";
import { HookBox } from "@/components/ui/SectionText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

interface Student {
  photo?: string;
  initial?: string;
  name: string;
  meta: string;
  pills: string[];
  quote: string;
  proof: string;
  proofAlt: string;
}

const STUDENTS: Student[] = [
  {
    photo: "/images/alunos/aluno-1.jpg",
    name: "Cristian M.",
    meta: "São Paulo, SP · Paid traffic",
    pills: ["ROI 5× ↑", "CPA R$20", "21 days"],
    quote:
      '"Before, my ROI was below 1. I was losing money and didn\'t even know it. Today I\'m at a CPA of 20, ROI of 5. I trusted the rules and focused on scaling."',
    proof: "/images/alunos/prova1.jpeg",
    proofAlt: "Cristian's result as a mentee",
  },
  {
    photo: "/images/alunos/aluno-2.webp",
    name: "Alexandre R.",
    meta: "Curitiba, PR · Digital product",
    pills: ["ROI 4× ↑", "10 campaigns", "Operation running"],
    quote:
      '"My operation was unstable: one good month, two bad ones. With the method, I closed with an ROI of almost 4 and already scheduled 10 more campaigns. The operation is running on its own."',
    proof: "/images/alunos/prova2.jpeg",
    proofAlt: "Mentee's campaign result",
  },
  {
    photo: "/images/alunos/aluno-3.webp",
    name: "Henrique S.",
    meta: "Belo Horizonte, MG · E-commerce",
    pills: ["R$1,531 net", "ROAS 2.5", "Scaling"],
    quote:
      '"I had never managed to consistently close a month in the green. First month with the system: R$1,531 in net revenue, ROAS of 2.5. Now I want to scale."',
    proof: "/images/alunos/printmentorado.jpg",
    proofAlt: "Henrique's result as a mentee",
  },
  {
    initial: "C",
    name: "Carlos",
    meta: "Result after a 7-day trial",
    pills: ["R$2,343.20", "7 days", "Fast start"],
    quote:
      '"I was just about to message you to show you the revenue I made in the last 7 days… in just 7 days of testing, I already got this."',
    proof: "/images/alunos/printmentoradocarlos.jpg",
    proofAlt: "Carlos's result as a mentee",
  },
];

function StudentCard({ s, delay }: { s: Student; delay: 1 | 2 | 3 | 4 }) {
  return (
    <Reveal delay={delay}>
      <Glass className="p-8">
        <div className="mb-5 flex items-center gap-3.5">
          <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-blue-dark to-blue-mid shadow-[0_4px_16px_rgba(26,86,255,.30)]">
            {s.photo ? (
              <Image src={s.photo} alt={s.name} fill className="object-cover" loading="lazy" />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-grotesk text-xl font-bold text-white">
                {s.initial}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-grotesk text-sm font-bold">{s.name}</span>
            <span className="mt-0.5 text-xs text-white/40">{s.meta}</span>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {s.pills.map((p) => (
            <span
              key={p}
              className="rounded-md border border-blue/22 bg-blue/12 px-2.5 py-1 text-[11px] font-bold text-blue-light"
            >
              {p}
            </span>
          ))}
        </div>
        <blockquote className="font-serif text-[15px] italic leading-[1.8] text-white/65">
          {s.quote}
        </blockquote>
        <div className="relative mt-5 h-64 w-full overflow-hidden rounded-lg bg-[#0b0b10]">
          <Image src={s.proof} alt={s.proofAlt} fill className="object-contain" loading="lazy" />
        </div>
      </Glass>
    </Reveal>
  );
}

export function StudentsGrid() {
  return (
    <section id="alunos" className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--container-w)">
        <Reveal>
          <SectionTag>Real transformations</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="max-w-(--prose-w) font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            From stuck to <span className="text-3d-gradient">consistent</span>:
            <br />
            <span className="text-[0.8em] text-white/50">
              what happens when you stop guessing
            </span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="max-w-(--prose-w) text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            These aren&apos;t exceptions. These are people who were in the same cycle
            you&apos;re in, and traded &quot;guessing at the creative&quot; for a system that
            points to the right lever.
          </p>
        </Reveal>

        <div className="mt-[60px] grid grid-cols-1 gap-6 md:grid-cols-2">
          {STUDENTS.map((s, i) => (
            <StudentCard key={s.name} s={s} delay={(i + 1) as 1 | 2 | 3 | 4} />
          ))}
        </div>

        <Reveal delay={3}>
          <HookBox>
            <p>
              In Cristian&apos;s case, ROI jumped from under 1 to 5 by fixing{" "}
              <strong>
                an invisible scaling mistake almost every business makes when trying to
                &quot;grow faster&quot;
              </strong>
              : the same mistake that tanks your ROI right when you increase the budget. See
              in the next case what 7 days of this did for someone who started from zero ↓
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
