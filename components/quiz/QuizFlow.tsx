"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { submitQuizAnswers } from "@/lib/actions/leads";
import { EASE_ENTRANCE } from "@/lib/motion/variants";
import { getProfile, type QuizAnswers } from "@/lib/quiz/profile";
import { QUESTIONS } from "@/lib/quiz/questions";
import { QuizResult } from "./QuizResult";

const TOTAL = QUESTIONS.length;

interface StoredLead {
  name?: string;
  phone?: string;
  email?: string;
  id?: string;
}

export function QuizFlow() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [lead, setLead] = useState<StoredLead>({});
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("quiz_lead");
    if (!raw) {
      router.replace("/");
      return;
    }
    setLead(JSON.parse(raw));
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.top < 80) {
      window.scrollTo({ top: window.scrollY + rect.top - 88, behavior: "smooth" });
    }
  }, [step]);

  if (!ready) return null;

  const question = QUESTIONS[step - 1];
  const picked = question ? answers[question.key] : undefined;
  const pct = Math.round(((step - 1) / TOTAL) * 100);

  function pick(value: string) {
    if (!question) return;
    setAnswers((a) => ({ ...a, [question.key]: value }));
  }

  async function handleFinish() {
    setSubmitting(true);
    await submitQuizAnswers({
      leadId: lead.id ?? null,
      name: lead.name ?? "",
      phone: lead.phone ?? "",
      email: lead.email ?? "",
      answers,
    });
    localStorage.removeItem("quiz_lead");
    setDone(true);
  }

  const profile = done ? getProfile(answers) : null;
  const summary = [
    answers.goal,
    answers.revenue,
    answers.budget,
    answers.target,
    answers.challenge,
    answers.digital_level,
    answers.time,
  ].filter((v): v is string => Boolean(v));

  return (
    <div className="w-full max-w-[640px]">
      {!done && (
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-pill border border-blue/28 bg-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[1.2px] text-blue-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Diagnóstico gratuito
          </div>
          <h1
            className="mb-3 font-grotesk font-bold leading-[1.1]"
            style={{ fontSize: "clamp(26px,5vw,40px)", letterSpacing: "-1.5px" }}
          >
            Descubra seu{" "}
            <span className="bg-gradient-to-br from-blue-light via-blue to-blue-deep bg-clip-text text-transparent">
              perfil digital
            </span>
          </h1>
          <p className="mx-auto max-w-[460px] text-base leading-[1.7] text-white/50">
            7 perguntas rápidas. Receba um diagnóstico personalizado e garanta sua vaga na call
            estratégica gratuita.
          </p>
        </div>
      )}

      {!done && step > 1 && (
        <div className="mb-7">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[13px] font-medium text-white/35">
              Pergunta {step} de {TOTAL}
            </span>
            <span className="text-[13px] font-bold text-blue-light">{pct}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/7">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-deep via-blue to-blue-light"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
            />
          </div>
        </div>
      )}

      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-lg border border-white/10 bg-white/4 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue/50 before:to-transparent"
      >
        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {done && profile ? (
              <QuizResult key="result" profile={profile} summary={summary} />
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: EASE_ENTRANCE }}
              >
                <div className="mb-3 text-xs font-bold uppercase tracking-[1.5px] text-white/30">
                  Pergunta {step} de {TOTAL}
                </div>
                <div
                  className="mb-7 font-grotesk font-bold leading-[1.3]"
                  style={{ fontSize: "clamp(19px,3.5vw,24px)" }}
                >
                  {question.emoji} {question.text}
                </div>
                <div className="grid gap-2.5">
                  {question.options.map((opt) => {
                    const selected = picked === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => pick(opt.value)}
                        className={`flex w-full items-center gap-3.5 rounded-md border px-4.5 py-4 text-left font-grotesk text-[15px] font-medium transition-all duration-150 ${
                          selected
                            ? "border-blue/60 bg-blue/12 text-white"
                            : "border-white/9 bg-white/3 text-white/80 hover:border-blue/40 hover:bg-blue/7 hover:text-white"
                        }`}
                      >
                        <span className="shrink-0 text-xl">{opt.emoji}</span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-7 flex items-center gap-2.5">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="whitespace-nowrap rounded-pill border border-white/10 px-5 py-3 font-grotesk text-sm font-medium text-white/45 transition-colors hover:border-white/22 hover:text-white"
                    >
                      ← Voltar
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={!picked || submitting}
                    onClick={() => (step < TOTAL ? setStep((s) => s + 1) : handleFinish())}
                    className="flex-1 rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-6 py-3.5 font-grotesk text-[15px] font-bold text-white shadow-[0_1px_0_rgba(187,212,255,0.35)_inset,0_5px_0_var(--blue-dark),0_8px_16px_rgba(10,44,140,0.40)] transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
                  >
                    {step < TOTAL
                      ? "Próximo →"
                      : submitting
                        ? "Processando…"
                        : "Ver meu diagnóstico →"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
