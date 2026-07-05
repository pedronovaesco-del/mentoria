"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";

const LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#expert", label: "Sobre" },
  { href: "#para-quem", label: "Para quem é" },
  { href: "#resultados", label: "Resultados" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[200] flex items-center justify-between
          px-[clamp(20px,5vw,44px)] py-4 border-b border-white/[.06] backdrop-blur-xl
          transition-colors duration-300
          ${scrolled ? "bg-ink/90" : "bg-ink/55"}`}
      >
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <span className="w-[38px] h-[38px] shrink-0 flex items-center justify-center">
            <Image src="/images/logo.png" alt="Pedro Novaes logo" width={38} height={38} priority />
          </span>
          <span className="flex flex-col leading-none gap-px">
            <span className="font-serif italic text-[10px] uppercase tracking-[2px] text-white/45">
              Pedro
            </span>
            <span className="font-grotesk font-bold text-base bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
              Novaes
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/65 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
          <CTAButton href="/quiz" className="!min-h-0 !py-3 !px-[22px] !text-[13px]">
            Meu diagnóstico
          </CTAButton>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 w-[22px]"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 bg-white rounded-full transition-transform ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span className={`block h-0.5 bg-white rounded-full transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 bg-white rounded-full transition-transform ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[190] flex flex-col items-center justify-center gap-8 bg-ink/[.97] backdrop-blur-2xl md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-xl font-grotesk font-semibold text-white/70 hover:text-white no-underline"
            >
              {l.label}
            </a>
          ))}
          <CTAButton href="/quiz" onClick={() => setMenuOpen(false)}>
            Meu diagnóstico
          </CTAButton>
        </div>
      )}
    </>
  );
}
