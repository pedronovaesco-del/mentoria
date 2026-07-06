"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { submitLeadCapture, submitQuizAnswers } from "@/lib/actions/leads";
import { COUNTRIES } from "@/lib/data/countries";
import { EASE_ENTRANCE } from "@/lib/motion/variants";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { getProfile, type QuizAnswers } from "@/lib/quiz/profile";
import { QUESTIONS } from "@/lib/quiz/questions";
import { QuizResult } from "./QuizResult";

/**
 * Fluxo unificado: contato (nome, e-mail, telefone) e perguntas do quiz são
 * telas da MESMA sequência contínua, sem separação visual, de rota ou de
 * indicador de posição entre elas.
 *
 * Pra mudar o número de perguntas, edite QUESTIONS em lib/quiz/questions.ts
 * -- TOTAL_STEPS se ajusta sozinho. Pra mudar o destino dos dados, edite
 * submitLeadCapture/submitQuizAnswers em lib/actions/leads.ts.
 */
const CONTACT_STEPS = 3; // 1: nome · 2: e-mail · 3: telefone

/** Tempo (ms) que a opção escolhida fica destacada antes de avançar. */
const ADVANCE_DELAY = 380;

const STORAGE_KEY = "quiz_lead";

/** Estado centralizado: contato + respostas num único objeto, persistido em
 * localStorage a cada avanço -- um refresh no meio do fluxo retoma
 * exatamente de onde parou, nunca antes (e nunca do início). */
interface QuizState {
  leadId: string | null;
  step: number;
  name: string;
  ddi: string;
  phone: string;
  email: string;
  answers: QuizAnswers;
}

const INITIAL_STATE: QuizState = {
  leadId: null,
  step: 1,
  name: "",
  ddi: COUNTRIES[0].code,
  phone: "",
  email: "",
  answers: {},
};

function loadQuizState(): QuizState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return {
      leadId: parsed.leadId ?? null,
      step: parsed.step ?? 1,
      name: parsed.name ?? "",
      ddi: parsed.ddi ?? COUNTRIES[0].code,
      phone: parsed.phone ?? "",
      email: parsed.email ?? "",
      answers: parsed.answers ?? {},
    };
  } catch {
    return INITIAL_STATE;
  }
}

function saveQuizState(state: QuizState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function QuizFlow() {
  const [ready, setReady] = useState(false);
  const [quiz, setQuiz] = useState<QuizState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  // Escolha feita mas ainda não confirmada -- fica destacada por
  // ADVANCE_DELAY antes de virar resposta de fato (o que dispara o avanço).
  const [pendingChoice, setPendingChoice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // localStorage não existe no SSR: só pode ser lido num efeito, depois
    // do primeiro paint (evita mismatch de hidratação entre servidor e
    // cliente).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ver comentario acima
    setQuiz(loadQuizState());
    setReady(true);
  }, []);

  // Trava o scroll do body enquanto o quiz está montado (reforço além do
  // container fixed em app/quiz/page.tsx) e restaura ao sair da página.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const { step } = quiz;
  const questionIndex = step - CONTACT_STEPS - 1;
  const question =
    questionIndex >= 0 && questionIndex < QUESTIONS.length ? QUESTIONS[questionIndex] : undefined;

  // Impede retrocesso via botão "voltar" do navegador em qualquer tela do
  // fluxo (contato ou perguntas): empilha uma entrada extra de histórico e,
  // se o usuário tentar voltar, empurra pra frente de novo -- trava a
  // navegação nessa página até o fluxo terminar.
  useEffect(() => {
    if (!ready || done) return;
    window.history.pushState(null, "", window.location.href);
    function trapBack() {
      window.history.pushState(null, "", window.location.href);
    }
    window.addEventListener("popstate", trapBack);
    return () => window.removeEventListener("popstate", trapBack);
  }, [ready, done]);

  if (!ready) return null;

  function advance(patch: Partial<QuizState> = {}) {
    const nextState = { ...quiz, ...patch, step: quiz.step + 1 };
    setQuiz(nextState);
    saveQuizState(nextState);
    return nextState;
  }

  const phoneDigits = quiz.phone.replace(/\D/g, "");
  const requiredDigits = (COUNTRIES.find((c) => c.code === quiz.ddi)?.mask.match(/0/g) || []).length;

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    if (step === 1) {
      if (quiz.name.trim().length < 3) {
        setErrors({ name: "Informe seu nome completo." });
        return;
      }
      advance();
      return;
    }

    if (step === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(quiz.email.trim())) {
        setErrors({ email: "Informe um e-mail válido." });
        return;
      }
      advance();
      return;
    }

    // step === 3: telefone
    if (phoneDigits.length < requiredDigits) {
      setErrors({ phone: "Número incompleto para o país selecionado." });
      return;
    }
    const nextState = advance();

    // Captura o contato completo em segundo plano assim que ele existe --
    // não bloqueia nem aparece na tela (a pessoa já está na 1ª pergunta
    // quando isso termina). Garante que o lead fique registrado mesmo que
    // ela abandone o quiz antes do fim.
    submitLeadCapture({
      name: nextState.name,
      ddi: nextState.ddi,
      phoneDigits,
      phoneMasked: nextState.phone,
      requiredDigits,
      email: nextState.email,
    }).then((result) => {
      if (!result.ok) return;
      setQuiz((current) => {
        const merged = { ...current, leadId: result.leadId };
        saveQuizState(merged);
        return merged;
      });
    });
  }

  function pick(value: string) {
    if (!question || submitting || pendingChoice) return;
    setPendingChoice(value);

    // Avanço automático: sem botão "próximo". O pequeno atraso acima só
    // deixa a opção escolhida visível antes de trocar de tela.
    setTimeout(() => {
      const nextAnswers = { ...quiz.answers, [question.key]: value };
      const nextState = { ...quiz, answers: nextAnswers, step: quiz.step + 1 };
      setQuiz(nextState);
      saveQuizState(nextState);
      setPendingChoice(null);

      if (Object.keys(nextAnswers).length >= QUESTIONS.length) {
        handleFinish(nextState);
      }
    }, ADVANCE_DELAY);
  }

  /**
   * Envia contato + respostas completas pro destino configurado em
   * lib/actions/leads.ts (hoje: Supabase, tabela quiz_leads -- mesma base
   * que alimenta o CRM e o marketplace de leads). Pra trocar de destino,
   * basta editar submitQuizAnswers lá; nada aqui precisa mudar.
   */
  async function handleFinish(state: QuizState) {
    setSubmitting(true);
    await submitQuizAnswers({
      leadId: state.leadId,
      name: state.name,
      phone: `${state.ddi} ${state.phone}`,
      email: state.email,
      answers: state.answers,
    });
    localStorage.removeItem(STORAGE_KEY);
    setDone(true);
  }

  const profile = done ? getProfile(quiz.answers) : null;
  const summary = [
    quiz.answers.goal,
    quiz.answers.revenue,
    quiz.answers.budget,
    quiz.answers.target,
    quiz.answers.challenge,
    quiz.answers.digital_level,
    quiz.answers.time,
  ].filter((v): v is string => Boolean(v));

  const committed = question ? quiz.answers[question.key] : undefined;
  const displayed = pendingChoice ?? committed;

  const fieldLabelClass = "text-[11px] font-bold uppercase tracking-[0.8px] text-white/40";
  const fieldInputClass =
    "w-full rounded-sm border border-white/12 bg-white/6 px-4 py-3.5 text-base text-white outline-none focus:border-blue/55 focus:bg-blue/5";
  const continueBtnClass =
    "mt-1 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-pill bg-gradient-to-b from-blue-light via-blue to-blue-deep py-4 font-grotesk text-[15px] font-semibold text-white shadow-[0_1px_0_rgba(187,212,255,0.45)_inset,0_6px_0_var(--blue-dark),0_10px_24px_rgba(10,44,140,0.60)] disabled:opacity-50";

  return (
    <div className="relative w-full max-w-[640px]">
      {!done && step === 1 && (
        // Só existe no fluxo (não apenas invisível) na etapa 1: assim o
        // card fica exatamente centralizado na tela nas demais etapas, em
        // vez de sempre deslocado pra baixo por um espaço reservado. Sem
        // position:absolute -- o texto ocupa espaço normal do fluxo, então
        // não há risco de coordenada negativa/inalcançável em telas baixas.
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
            Responda em menos de 2 minutos e receba um diagnóstico personalizado, com vaga
            garantida na call estratégica gratuita.
          </p>
        </div>
      )}

      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/4 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue/50 before:to-transparent">
        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {done && profile ? (
              <QuizResult key="result" profile={profile} summary={summary} />
            ) : step === 1 ? (
              <motion.div
                key="step-name"
                className="quiz-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: EASE_ENTRANCE }}
              >
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-1.5">
                  <label className={fieldLabelClass}>Nome completo *</label>
                  <input
                    autoFocus
                    type="text"
                    value={quiz.name}
                    onChange={(e) => setQuiz((q) => ({ ...q, name: e.target.value }))}
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    className={fieldInputClass}
                  />
                  <span className="mt-[-2px] block min-h-4 text-xs text-danger">{errors.name}</span>
                  <button type="submit" className={continueBtnClass}>
                    Continuar
                  </button>
                </form>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step-email"
                className="quiz-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: EASE_ENTRANCE }}
              >
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-1.5">
                  <label className={fieldLabelClass}>E-mail *</label>
                  <input
                    autoFocus
                    type="email"
                    value={quiz.email}
                    onChange={(e) => setQuiz((q) => ({ ...q, email: e.target.value }))}
                    placeholder="seu@email.com"
                    autoComplete="email"
                    className={fieldInputClass}
                  />
                  <span className="mt-[-2px] block min-h-4 text-xs text-danger">{errors.email}</span>
                  <button type="submit" className={continueBtnClass}>
                    Continuar
                  </button>
                </form>
              </motion.div>
            ) : step === 3 ? (
              <motion.div
                key="step-phone"
                className="quiz-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: EASE_ENTRANCE }}
              >
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-1.5">
                  <label className={fieldLabelClass}>WhatsApp *</label>
                  <PhoneInput
                    value={quiz.phone}
                    onChange={(phone) => setQuiz((q) => ({ ...q, phone }))}
                    ddi={quiz.ddi}
                    onDdiChange={(ddi) => setQuiz((q) => ({ ...q, ddi }))}
                  />
                  <span className="mt-[-2px] block min-h-4 text-xs text-danger">{errors.phone}</span>
                  <button type="submit" className={continueBtnClass}>
                    Continuar
                  </button>
                </form>
              </motion.div>
            ) : question ? (
              <motion.div
                key={step}
                className="quiz-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: EASE_ENTRANCE }}
              >
                <div
                  className="mb-7 font-grotesk font-bold leading-[1.3]"
                  style={{ fontSize: "clamp(19px,3.5vw,24px)" }}
                >
                  {question.emoji} {question.text}
                </div>
                <div className="grid gap-2.5">
                  {question.options.map((opt) => {
                    const selected = displayed === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        disabled={Boolean(pendingChoice)}
                        onClick={() => pick(opt.value)}
                        className={`flex w-full items-center gap-3.5 rounded-md border px-[18px] py-4 text-left font-grotesk text-[15px] font-medium transition-all duration-150 disabled:cursor-default ${
                          selected
                            ? "border-blue/60 bg-blue/12 text-white"
                            : "border-white/9 bg-white/3 text-white/80 hover:border-blue/40 hover:bg-blue/7 hover:text-white disabled:hover:border-white/9 disabled:hover:bg-white/3"
                        }`}
                      >
                        <span className="shrink-0 text-xl">{opt.emoji}</span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="quiz-step py-10 text-center text-[15px] text-white/40"
              >
                Processando seu diagnóstico…
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
