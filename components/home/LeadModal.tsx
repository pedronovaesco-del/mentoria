"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { submitLeadCapture } from "@/lib/actions/leads";
import { COUNTRIES } from "@/lib/data/countries";
import { PhoneInput } from "./PhoneInput";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
}

export function LeadModal({ open, onClose }: LeadModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [ddi, setDdi] = useState(COUNTRIES[0].code);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const phoneDigits = phone.replace(/\D/g, "");
    const requiredDigits = (COUNTRIES.find((c) => c.code === ddi)?.mask.match(/0/g) || [])
      .length;

    startTransition(async () => {
      const result = await submitLeadCapture({
        name,
        ddi,
        phoneDigits,
        phoneMasked: phone,
        requiredDigits,
        email,
      });

      if (!result.ok) {
        setErrors(result.errors);
        return;
      }

      localStorage.setItem(
        "quiz_lead",
        JSON.stringify({ name, phone: `${ddi} ${phone}`, email, id: result.leadId })
      );
      router.push("/quiz");
    });
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/78 p-6 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[480px] rounded-lg border border-blue/28 bg-[linear-gradient(135deg,rgba(12,20,40,0.99),rgba(5,10,25,0.99))] p-11 shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_60px_rgba(59,130,246,0.07)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/50"
        >
          ✕
        </button>

        <div className="mb-5 inline-flex items-center gap-1.5 rounded-pill border border-blue/28 bg-blue/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-blue-light">
          <span className="h-2 w-2 rounded-full bg-blue" />
          Diagnóstico gratuito
        </div>
        <h3
          className="mb-2 font-grotesk font-bold"
          style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-h3)" }}
        >
          Antes de começar
        </h3>
        <p className="mb-7 text-sm leading-[1.6] text-white/50">
          Para onde enviamos seu diagnóstico personalizado? Leva menos de 1 minuto.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/40">
              Nome completo *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              autoComplete="name"
              className="w-full rounded-sm border border-white/12 bg-white/6 px-4 py-3.5 text-base text-white outline-none"
            />
            <span className="mt-[-2px] block min-h-4 text-xs text-danger">{errors.name}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/40">
              WhatsApp *
            </label>
            <PhoneInput value={phone} onChange={setPhone} ddi={ddi} onDdiChange={setDdi} />
            <span className="mt-[-2px] block min-h-4 text-xs text-danger">{errors.phone}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/40">
              E-mail *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              className="w-full rounded-sm border border-white/12 bg-white/6 px-4 py-3.5 text-base text-white outline-none"
            />
            <span className="mt-[-2px] block min-h-4 text-xs text-danger">{errors.email}</span>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-pill bg-gradient-to-b from-blue-light via-blue to-blue-deep py-4 font-grotesk text-[15px] font-semibold text-white shadow-[0_1px_0_rgba(187,212,255,0.45)_inset,0_6px_0_var(--blue-dark),0_10px_24px_rgba(10,44,140,0.60)] disabled:opacity-50"
          >
            {isPending ? "Salvando…" : "Continuar para o diagnóstico →"}
          </button>
          <p className="mt-0.5 text-center text-xs leading-[1.6] text-white/25">
            🔒 Seus dados são 100% seguros e não serão compartilhados com terceiros.
          </p>
        </form>
      </div>
    </div>
  );
}
