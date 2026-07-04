"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

const FAQS = [
  {
    q: "A call realmente é gratuita? Tem alguma pegadinha?",
    a: "Sim, 100% gratuita e sem pegadinha. Não existe venda obrigatória ao final, nem pressão de qualquer tipo. O objetivo da call é entender o seu momento e entregar valor real. Se fizer sentido evoluirmos juntos depois disso, conversamos sobre isso. Se não fizer, você sai com um plano de ação claro e sem nenhum custo.",
  },
  {
    q: "Quanto tempo dura a call?",
    a: "45 minutos. Tempo suficiente para mapear o seu negócio em profundidade, identificar os gargalos específicos e traçar um plano de ação prático. Não é uma call de apresentação. É uma sessão de trabalho real.",
  },
  {
    q: "Preciso ter experiência no digital para participar?",
    a: "Não. Atendo tanto quem está começando do zero quanto quem já fatura mas trava no mesmo patamar. O diagnóstico é completamente adaptado ao seu nível e ao seu contexto específico. Não é um roteiro genérico.",
  },
  {
    q: "Isso funciona para o meu nicho?",
    a: "O método foi desenvolvido para operações de venda no digital: produto digital, e-commerce, serviço, infoproduto. Se você vende online e usa tráfego pago ou quer usar, a estrutura de sistema, ROI e previsibilidade se aplica ao seu negócio independente do nicho.",
  },
  {
    q: "Em quanto tempo posso ver resultados?",
    a: "Depende do seu comprometimento na aplicação. Mentorados que aplicaram o método com consistência viram resultados nas primeiras 2 a 3 semanas. O Arthur atingiu R$1.000/dia em 7 dias de acompanhamento. Cada caso é único, mas o resultado sempre vem de implementação, não de intenção.",
  },
  {
    q: "Quanto tempo depois do diagnóstico você entra em contato?",
    a: "Em até 2 horas após o envio do diagnóstico, você recebe uma mensagem para confirmar data e horário da call. O agendamento é feito diretamente, sem intermediários.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-[var(--edge-pad)] py-20">
      <div className="mx-auto mb-2 max-w-[560px] text-center">
        <Reveal>
          <SectionTag>Sem dúvidas antes de decidir</SectionTag>
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
