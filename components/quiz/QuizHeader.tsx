import Image from "next/image";
import Link from "next/link";

export function QuizHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/6 bg-ink/80 px-10 py-4 backdrop-blur-xl max-[600px]:px-5 max-[600px]:py-3.5">
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <Image src="/images/logo.png" alt="Pedro Novaes logo" width={38} height={38} />
        <div className="flex flex-col leading-none gap-px">
          <span className="font-serif italic text-[11px] uppercase tracking-[2px] text-white/50">
            Pedro
          </span>
          <span className="font-grotesk text-[17px] font-bold bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
            Novaes
          </span>
        </div>
      </Link>
      <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-white/45 no-underline hover:text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Voltar ao site
      </Link>
    </header>
  );
}
