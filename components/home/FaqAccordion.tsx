"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionText";

const FAQS = [
  {
    q: "Is the call really free? Is there a catch?",
    a: "Yes, 100% free and no catch. There's no mandatory pitch at the end, no pressure of any kind. The goal of the call is to understand where you are and deliver real value. If it makes sense to work together after that, we'll talk about it. If not, you walk away with a clear action plan and zero cost.",
  },
  {
    q: "How long does the call last?",
    a: "45 minutes. Enough time to map your business in depth, identify the specific bottlenecks, and lay out a practical action plan. It's not a pitch call. It's a real working session.",
  },
  {
    q: "Do I need digital experience to join?",
    a: "No. I work with people starting from zero as well as people who already have revenue but are stuck at the same level. The diagnosis is fully adapted to your level and your specific context. It's not a generic script.",
  },
  {
    q: "Does this work for my niche?",
    a: "The method was developed for online sales operations: digital products, e-commerce, services, info products. If you sell online and use paid traffic — or want to — the structure around system, ROI, and predictability applies to your business regardless of niche.",
  },
  {
    q: "How soon can I see results?",
    a: "It depends on how committed you are to applying it. Mentees who applied the method consistently saw results within the first 2 to 3 weeks. Arthur hit R$1,000/day after 7 days of coaching. Every case is unique, but results always come from implementation, not intention.",
  },
  {
    q: "How long after the diagnostic do you reach out?",
    a: "Within 2 hours of submitting the diagnostic, you'll get a message to confirm the date and time of the call. Scheduling is done directly, with no middlemen.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto mb-2 max-w-[560px] text-center">
        <Reveal>
          <SectionTag>No doubts before deciding</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="font-grotesk font-bold leading-[1.05] mb-5"
            style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
          >
            Frequently <span className="text-3d-gradient">asked questions</span>
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
