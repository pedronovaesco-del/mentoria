"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const NICHES = [
  "Marketing Digital",
  "Tráfego Pago",
  "Copywriting & Funis",
  "E-commerce",
  "Infoprodutos & Cursos",
  "Social Media",
  "Consultoria de Negócios",
  "Vendas & Comercial",
];

type Mode = "login" | "register";

export function AuthTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [mode, setMode] = useState<Mode>(() => (searchParams.get("mode") === "login" ? "login" : "register"));
  const [alert, setAlert] = useState<{ type: "error" | "success"; msg: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rNiche, setRNiche] = useState("");
  const [rPass, setRPass] = useState("");
  const [rPass2, setRPass2] = useState("");
  const [rErrors, setRErrors] = useState<Record<string, string>>({});

  const [lEmail, setLEmail] = useState("");
  const [lPass, setLPass] = useState("");
  const [lErrors, setLErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/painel");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);
    const errors: Record<string, string> = {};

    if (rName.trim().length < 2) errors.name = "Informe seu nome";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(rEmail)) errors.email = "E-mail inválido";
    if (!rNiche) errors.niche = "Selecione seu nicho";
    if (rPass.length < 8) errors.pass = "Mínimo 8 caracteres";
    if (rPass !== rPass2) errors.pass2 = "As senhas não coincidem";
    setRErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: rEmail,
      password: rPass,
      options: { data: { name: rName, niche: rNiche } },
    });

    if (error) {
      setAlert({
        type: "error",
        msg: error.message === "User already registered" ? "Este e-mail já está cadastrado." : error.message,
      });
      setSubmitting(false);
      return;
    }

    if (data.user) {
      try {
        await supabase.from("professionals").insert({ id: data.user.id, name: rName, niche: rNiche, credits: 0 });
      } catch (err) {
        console.warn(err);
      }
    }

    setAlert({ type: "success", msg: "Conta criada! Verifique seu e-mail para confirmar o cadastro." });
    setSubmitting(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);
    const errors: Record<string, string> = {};
    if (!lEmail) errors.email = "Informe o e-mail";
    if (!lPass) errors.pass = "Informe a senha";
    setLErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email: lEmail, password: lPass });

    if (error) {
      setAlert({ type: "error", msg: "E-mail ou senha incorretos." });
      setSubmitting(false);
      return;
    }

    router.push("/painel");
  }

  return (
    <div className="w-full max-w-[440px] overflow-hidden rounded-lg border border-white/10 bg-white/4 before:block before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue/50 before:to-transparent">
      <div className="grid grid-cols-2 border-b border-white/7">
        <button
          type="button"
          onClick={() => {
            setMode("register");
            setAlert(null);
          }}
          className={`py-4 font-grotesk text-sm font-bold transition-colors ${
            mode === "register" ? "border-b-2 border-blue text-white bg-blue/8" : "text-white/35"
          }`}
        >
          Criar conta
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setAlert(null);
          }}
          className={`py-4 font-grotesk text-sm font-bold transition-colors ${
            mode === "login" ? "border-b-2 border-blue text-white bg-blue/8" : "text-white/35"
          }`}
        >
          Entrar
        </button>
      </div>

      <div className="p-8">
        {alert && (
          <div
            className={`mb-4 rounded-sm border p-3.5 text-[13px] leading-[1.5] font-medium ${
              alert.type === "error"
                ? "border-danger/25 bg-danger/10 text-[#FCA5A5]"
                : "border-success/25 bg-success/10 text-[#6EE7B7]"
            }`}
          >
            {alert.msg}
          </div>
        )}

        {mode === "register" ? (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Field label="Nome completo" error={rErrors.name}>
              <input
                type="text"
                value={rName}
                onChange={(e) => setRName(e.target.value)}
                placeholder="Seu nome"
                autoComplete="name"
                className={inputClass}
              />
            </Field>
            <Field label="E-mail profissional" error={rErrors.email}>
              <input
                type="email"
                value={rEmail}
                onChange={(e) => setREmail(e.target.value)}
                placeholder="voce@empresa.com"
                autoComplete="email"
                className={inputClass}
              />
            </Field>
            <Field label="Seu nicho de atuação" error={rErrors.niche}>
              <select value={rNiche} onChange={(e) => setRNiche(e.target.value)} className={inputClass}>
                <option value="" disabled>
                  Selecione seu nicho
                </option>
                {NICHES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Senha" error={rErrors.pass}>
              <input
                type="password"
                value={rPass}
                onChange={(e) => setRPass(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                className={inputClass}
              />
            </Field>
            <Field label="Confirmar senha" error={rErrors.pass2}>
              <input
                type="password"
                value={rPass2}
                onChange={(e) => setRPass2(e.target.value)}
                placeholder="Repita a senha"
                autoComplete="new-password"
                className={inputClass}
              />
            </Field>
            <button type="submit" disabled={submitting} className={submitBtnClass}>
              {submitting ? "Criando conta…" : "Criar minha conta"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Field label="E-mail" error={lErrors.email}>
              <input
                type="email"
                value={lEmail}
                onChange={(e) => setLEmail(e.target.value)}
                placeholder="voce@empresa.com"
                autoComplete="email"
                className={inputClass}
              />
            </Field>
            <Field label="Senha" error={lErrors.pass}>
              <input
                type="password"
                value={lPass}
                onChange={(e) => setLPass(e.target.value)}
                placeholder="Sua senha"
                autoComplete="current-password"
                className={inputClass}
              />
            </Field>
            <button type="submit" disabled={submitting} className={submitBtnClass}>
              {submitting ? "Entrando…" : "Entrar"}
            </button>
          </form>
        )}
      </div>

      <div className="px-8 pb-7 text-center text-[13px] text-white/45">
        {mode === "register" ? (
          <>
            Já tem conta?{" "}
            <button type="button" onClick={() => setMode("login")} className="font-semibold text-blue-light hover:underline">
              Entrar
            </button>
          </>
        ) : (
          <>
            Não tem conta?{" "}
            <button type="button" onClick={() => setMode("register")} className="font-semibold text-blue-light hover:underline">
              Criar conta
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-sm border border-white/11 bg-white/6 px-4 py-3.5 text-base text-white outline-none focus:border-blue/55 focus:bg-blue/5";
const submitBtnClass =
  "mt-1.5 min-h-11 w-full rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep font-grotesk text-[15px] font-bold text-white shadow-[0_1px_0_rgba(187,212,255,0.3)_inset,0_5px_0_var(--blue-dark),0_8px_16px_rgba(10,44,140,0.4)] transition-transform hover:-translate-y-0.5 disabled:opacity-35 disabled:translate-y-0";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/40">{label}</label>
      {children}
      <span className="min-h-4 text-xs text-danger">{error}</span>
    </div>
  );
}
