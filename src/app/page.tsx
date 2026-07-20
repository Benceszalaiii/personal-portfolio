import ScrollScene from "@/components/ScrollScene";
import { ServicesGridBlock } from "@/components/uitripled/services-grid-block-shadcnui";
import AboutSection from "./Components/AboutSection";
import ContactSection from "./Components/ContactSection";
import FaqSection from "./Components/FaqSection";
import Hero from "./Components/Hero";
import MacbookShowcase from "./Components/MacbookShowcase";
import StackSection from "./Components/StackSection";
import TechLoop from "./Components/TechLoop";

export default function Home() {
  return (
    // relative: hosts the absolutely-positioned ScrollScene canvas layer
    <main className="relative w-full">
      <Hero />

      <MacbookShowcase />

      <StackSection />

      <ServicesGridBlock />

      <AboutSection />

      <TechLoop />

      <FaqSection />

      <ContactSection />

      {/* The single persistent 3D canvas: absolute within <main>, sticky
          viewport inside, z-10 — above section backdrops, below content. */}
      <ScrollScene />
    </main>
  );
}
