import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { PasSection } from "@/components/home/PasSection";
import { ExpertSection } from "@/components/home/ExpertSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsBar } from "@/components/home/StatsBar";
import { ResultsMedia } from "@/components/home/ResultsMedia";
import { StudentsGrid } from "@/components/home/StudentsGrid";
import { ArthurCaseStudy } from "@/components/home/ArthurCaseStudy";
import { WhatYouGet } from "@/components/home/WhatYouGet";
import { ForWhoSection } from "@/components/home/ForWhoSection";
import { GuaranteeSection } from "@/components/home/GuaranteeSection";
import { VisionSection } from "@/components/home/VisionSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ProblemSection />
        <PasSection />
        <ExpertSection />
        <HowItWorks />
        <StatsBar />
        <ResultsMedia />
        <StudentsGrid />
        <ArthurCaseStudy />
        <WhatYouGet />
        <ForWhoSection />
        <GuaranteeSection />
        <VisionSection />
        <CtaSection />
        {/* Da FAQ em diante o conteúdo fica mais esparso, o que deixa os
            blobs do fundo animado (fixed, sempre na mesma posição da tela)
            visíveis demais e concentrados nos cantos -- esse gradiente
            esmaece o fundo gradualmente até opaco antes do rodapé. */}
        <div
          style={{
            background: "linear-gradient(to bottom, transparent 0%, var(--ink) 60%)",
          }}
        >
          <FaqAccordion />
        </div>
      </main>
      <Footer />
    </>
  );
}
