import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/#expert", label: "Sobre" },
  { href: "/#alunos", label: "Resultados" },
  { href: "/#para-quem", label: "Para quem é" },
  { href: "/#cta", label: "Agendar call" },
];

export function QuizFooter() {
  return (
    <footer className="border-t border-white/6 py-9">
      <div className="mx-auto max-w-(--container-w) px-7 flex flex-wrap items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image src="/images/logo.png" alt="Pedro Novaes logo" width={32} height={32} />
          <div className="flex flex-col leading-none gap-px">
            <span className="font-serif italic text-[9px] uppercase tracking-[2px] text-white/40">
              Pedro
            </span>
            <span className="font-grotesk text-sm font-bold bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
              Novaes
            </span>
          </div>
        </Link>
        <div className="flex flex-wrap gap-6 text-sm text-white/40">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="no-underline hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
        <span className="text-[13px] text-white/30">
          © 2026 Pedro Novaes · Mercado digital, resultados reais.
        </span>
      </div>
    </footer>
  );
}
