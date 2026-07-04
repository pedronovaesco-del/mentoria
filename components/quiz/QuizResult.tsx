"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Profile } from "@/lib/quiz/profile";
import { EASE_ENTRANCE } from "@/lib/motion/variants";

const WA_URL =
  "https://wa.me/4748199443?text=Ola+Pedro+respondi+o+formulario+e+quero+agendar+minha+call+estrategica%21";

export function QuizResult({ profile, summary }: { profile: Profile; summary: string[] }) {
  const [secs, setSecs] = useState(5);

  useEffect(() => {
    if (secs <= 0) {
      window.location.href = WA_URL;
      return;
    }
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
      className="text-center"
    >
      <div
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-dark to-blue text-4xl shadow-[0_0_0_14px_rgba(59,130,246,0.07),0_0_0_28px_rgba(59,130,246,0.03)]"
      >
        {profile.icon}
      </div>
      <div className="mb-5 inline-flex items-center gap-2 rounded-pill border border-success/25 bg-success/10 px-[18px] py-2 text-[13px] font-bold text-[#34D399]">
        {profile.badge}
      </div>
      <h2
        className="mb-3 font-grotesk font-extrabold"
        style={{ fontSize: "clamp(22px,4vw,30px)", letterSpacing: "-1px" }}
      >
        {profile.title}
      </h2>
      <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.8] text-white/60">
        {profile.msg}
      </p>
      <div className="my-7 h-px bg-white/7" />
      <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.5px] text-white/35">
        Seu perfil
      </p>
      <div className="mb-7 flex flex-wrap justify-center gap-2">
        {summary.map((s) => (
          <span
            key={s}
            className="rounded-pill border border-blue/22 bg-blue/10 px-3.5 py-1.5 text-xs font-semibold text-blue-light"
          >
            {s}
          </span>
        ))}
      </div>
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-2.5 rounded-pill bg-gradient-to-b from-[#25D366] to-[#128C7E] px-10 py-[18px] font-grotesk text-base font-bold text-white shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_6px_0_#075E54,0_10px_24px_rgba(7,94,84,0.50)] transition-transform hover:-translate-y-0.5"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Falar com Pedro no WhatsApp
      </a>
      <p className="mt-4 text-[13px] text-white/30">
        Pedro Novaes entrará em contato em até 2h · Sem compromisso
      </p>
      <p className="mt-2 text-[13px] text-white/25">
        Redirecionando automaticamente em <strong>{secs}</strong>s
      </p>
    </motion.div>
  );
}
