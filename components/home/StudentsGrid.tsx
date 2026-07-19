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
    meta: "São Paulo, SP · Tráfego pago",
    pills: ["ROI 5× ↑", "CPA R$20", "21 dias"],
    quote:
      '"Antes, meu ROI era abaixo de 1. Eu estava perdendo dinheiro e nem sabia. Hoje estou com CPA de 20, ROI de 5. Confiei nas regras e foquei em escalar."',
    proof: "/images/alunos/prova1.jpeg",
    proofAlt: "Resultado do Cristian como mentorado",
  },
  {
    photo: "/images/alunos/aluno-2.webp",
    name: "Alexandre R.",
    meta: "Curitiba, PR · Produto digital",
    pills: ["ROI 4× ↑", "10 campanhas", "Operação rodando"],
    quote:
      '"Minha operação era instável: um mês bom, dois ruins. Com o método, fechei com ROI de quase 4 e já tenho 10 campanhas agendadas. A operação está rodando sozinha."',
    proof: "/images/alunos/prova2.jpeg",
    proofAlt: "Resultado de campanha do mentorado",
  },
  {
    photo: "/images/alunos/aluno-3.webp",
    name: "Henrique S.",
    meta: "Belo Horizonte, MG · E-commerce",
    pills: ["R$1.531 líquido", "ROAS 2,5", "Escalando"],
    quote:
      '"Eu nunca tinha conseguido fechar um mês no azul de forma consistente. Primeiro mês com o sistema: R$1.531 de faturamento líquido, ROAS de 2,5. Agora quero escalar."',
    proof: "/images/alunos/printmentorado.jpg",
    proofAlt: "Resultado do Henrique como mentorado",
  },
  {
    initial: "C",
    name: "Carlos",
    meta: "Resultado após 7 dias de teste",
    pills: ["R$2.343,20", "7 dias", "Início rápido"],
    quote:
      '"Eu já estava pra te mandar mensagem pra mostrar o faturamento que fiz nos últimos 7 dias… em apenas 7 dias de teste, já consegui isso."',
    proof: "/images/alunos/printmentoradocarlos.jpg",
    proofAlt: "Resultado do Carlos como mentorado",
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
          <SectionTag>Transformações reais</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="max-w-(--prose-w) font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            De travado a <span className="text-3d-gradient">consistente</span>:
            <br />
            <span className="text-[0.8em] text-white/50">
              o que acontece quando você para de chutar
            </span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="max-w-(--prose-w) text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
            Essas não são exceções. São pessoas que estavam no mesmo ciclo em que você está, e
            trocaram &quot;chutar o criativo&quot; por um sistema que aponta a alavanca certa.
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
              No caso do Cristian, o ROI saltou de menos de 1 pra 5 corrigindo{" "}
              <strong>
                um erro invisível de escala que quase todo negócio comete ao tentar
                &quot;crescer mais rápido&quot;
              </strong>
              : o mesmo erro que derruba seu ROI bem na hora que você aumenta a verba. Veja no
              próximo caso o que 7 dias disso fizeram por alguém que começou do zero ↓
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
