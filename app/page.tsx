import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { PasSection } from "@/components/home/PasSection";
import { ExpertSection } from "@/components/home/ExpertSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsBar } from "@/components/home/StatsBar";

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
      </main>
      <Footer />
    </>
  );
}
