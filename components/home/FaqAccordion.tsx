"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

const FAQS = [
  {
    q: "A call é mesmo gratuita? Tem pegadinha?",
    a: "Sim, 100% gratuita e sem pegadinha. Não tem pitch obrigatório no final, nenhum tipo de pressão. O objetivo da call é entender onde você está e entregar valor real. Se fizer sentido trabalharmos juntos depois disso, a gente conversa sobre isso. Se não, você sai com um plano de ação claro e zero custo.",
  },
  {
    q: "Quanto tempo dura a call?",
    a: "45 minutos. Tempo suficiente pra mapear seu negócio em profundidade, identificar os gargalos específicos e traçar um plano de ação prático. Não é uma call de pitch. É uma sessão de trabalho real.",
  },
  {
    q: "Preciso ter experiência no digital pra participar?",
    a: "Não. Eu trabalho tanto com quem está começando do zero quanto com quem já fatura mas está travado no mesmo nível. O diagnóstico é totalmente adaptado ao seu nível e ao seu contexto específico. Não é um roteiro genérico.",
  },
  {
    q: "Isso funciona pro meu nicho?",
    a: "O método foi desenvolvido pra operações de venda online: produtos digitais, e-commerce, serviços, infoprodutos. Se você vende online e usa tráfego pago — ou quer usar — a estrutura em torno de sistema, ROI e previsibilidade se aplica ao seu negócio independente do nicho.",
  },
  {
    q: "Em quanto tempo eu vejo resultado?",
    a: "Depende do quanto você se compromete a aplicar. Mentorados que aplicaram o método de forma consistente viram resultado nas primeiras 2 a 3 semanas. O Arthur bateu R$1.000/dia depois de 7 dias de acompanhamento. Cada caso é único, mas resultado sempre vem de execução, não de intenção.",
  },
  {
    q: "Quanto tempo depois do diagnóstico você entra em contato?",
    a: "Em até 2 horas depois de enviar o diagnóstico, você recebe uma mensagem pra confirmar a data e o horário da call. O agendamento é direto, sem intermediários.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto mb-2 max-w-[560px] text-center">
        <Reveal>
          <SectionTag>Nenhuma dúvida antes de decidir</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            Perguntas <span className="text-3d-gradient">frequentes</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={2} className="mx-auto mt-12 flex max-w-[780px] flex-col gap-3">
        {FAQS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-md border border-white/9 bg-white/4 transition-colors hover:border-blue/25"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-grotesk text-base font-semibold"
              >
                {item.q}
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue/25 bg-blue/12 text-base text-blue-light transition-transform duration-200 ${open ? "rotate-45 !bg-blue/20" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p
                    className="px-6 pb-6 text-body-color"
                    style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
