import Image from "next/image";

const LINKS = [
  { href: "#expert", label: "Sobre" },
  { href: "#alunos", label: "Resultados" },
  { href: "#para-quem", label: "Para quem é" },
  { href: "/quiz", label: "Diagnóstico" },
  { href: "#cta", label: "Agende uma call" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[.06] bg-ink py-9">
      <div className="max-w-(--breakpoint-xl) mx-auto px-[var(--edge-pad)] flex flex-wrap items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <Image src="/images/logo.png" alt="Logo Pedro Novaes" width={32} height={32} loading="lazy" />
          <span className="flex flex-col leading-none gap-px">
            <span className="font-serif italic text-[9px] uppercase tracking-[2px] text-white/40">
              Pedro
            </span>
            <span className="font-grotesk font-bold text-sm bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
              Novaes
            </span>
          </span>
        </a>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <span className="text-xs text-white/30">
          © 2026 Pedro Novaes · Negócio digital, resultados reais.
        </span>
      </div>
    </footer>
  );
}
