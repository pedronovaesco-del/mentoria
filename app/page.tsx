import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { PasSection } from "@/components/home/PasSection";
import { ExpertSection } from "@/components/home/ExpertSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <PasSection />
        <ExpertSection />
      </main>
      <Footer />
    </>
  );
}
