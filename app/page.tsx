import { Nav } from "@/components/layout/Nav";
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

export default function Home() {
  return (
    <>
      <Nav />
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
      </main>
      <Footer />
    </>
  );
}
