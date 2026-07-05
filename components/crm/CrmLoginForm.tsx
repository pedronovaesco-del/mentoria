"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const CRM_EMAIL = "equipe@pedronovaes.co";

export function CrmLoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/crm");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: CRM_EMAIL,
      password: pass,
    });
    if (authError) {
      setError("Senha incorreta.");
      setSubmitting(false);
      return;
    }
    router.push("/crm");
  }

  return (
    <div className="w-full max-w-[380px] overflow-hidden rounded-lg border border-white/10 bg-white/4 before:block before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue/50 before:to-transparent">
      <div className="p-8">
        <div className="mb-7 flex items-center justify-center gap-2.5">
          <div className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-sm">
            <Image src="/images/logo.png" alt="Pedro Novaes" width={38} height={38} className="object-contain" />
          </div>
          <div className="flex flex-col leading-none gap-px">
            <span className="font-serif italic text-[10px] uppercase tracking-[2px] text-white/45">Pedro</span>
            <span className="font-grotesk text-base font-bold bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
              Novaes
            </span>
          </div>
        </div>
        <span className="mb-6 block text-center text-xs font-semibold uppercase tracking-[1px] text-blue-light">
          🔒 Acesso restrito · CRM
        </span>

        {error && (
          <div className="mb-4 rounded-sm border border-danger/25 bg-danger/10 p-3.5 text-[13px] font-medium text-[#FCA5A5]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/38">Senha de acesso</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Digite a senha"
              autoComplete="current-password"
              required
              className="w-full rounded-sm border border-white/11 bg-white/6 px-4 py-3.5 text-base text-white outline-none focus:border-blue/55 focus:bg-blue/5"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 min-h-11 w-full rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep font-grotesk text-[15px] font-bold text-white shadow-[0_1px_0_rgba(187,212,255,0.3)_inset,0_5px_0_var(--blue-dark),0_8px_16px_rgba(10,44,140,0.4)] transition-transform hover:-translate-y-0.5 disabled:opacity-35"
          >
            {submitting ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
