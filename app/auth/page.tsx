import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AuthTabs } from "@/components/auth/AuthTabs";

export const metadata: Metadata = {
  title: "Entrar | Pedro Novaes Leads",
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-white/6 px-10 py-[18px] max-[600px]:px-5 max-[600px]:py-3.5">
        <Link href="/plataforma" className="flex items-center gap-2.5 no-underline">
          <Image src="/images/logo.png" alt="Pedro Novaes" width={36} height={36} />
          <div className="flex flex-col leading-none gap-px">
            <span className="font-serif italic text-[10px] uppercase tracking-[2px] text-white/45">
              Pedro
            </span>
            <span className="font-grotesk text-base font-bold bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
              Novaes
            </span>
          </div>
        </Link>
        <Link href="/plataforma" className="text-sm font-medium text-white/40 no-underline hover:text-white">
          ← Voltar
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <Suspense>
          <AuthTabs />
        </Suspense>
      </main>
    </>
  );
}
