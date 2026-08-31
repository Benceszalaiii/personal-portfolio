import ScrollScene from "@/components/ScrollScene";
import ServicesSection from "@/components/services/ServicesSection";
import AboutSection from "./Components/AboutSection";
import ContactSection from "./Components/ContactSection";
import FaqSection from "./Components/FaqSection";
import Hero from "./Components/Hero";
import StackSection from "./Components/StackSection";
import TechLoop from "./Components/TechLoop";
import WorkSection from "./Components/WorkSection";

export default function Home() {
  return (
    // relative: hosts the absolutely-positioned ScrollScene canvas layer.
    //
    // The lg gutter is reserved ONCE, here, for every section — SiteNav's rail
    // is `position: fixed` at left-4 and its right edge measures ~131px (plus
    // up to 12px of LineSidebar proximity shift, so 143px worst case).
    // Sections used to each carry `lg:pl-44`; three of them forgot, and the
    // rail printed straight through About, Munkáim and the contact e-mail at
    // every width from 1024 up to ~1414px. A per-section opt-in is a rule that
    // can be forgotten, so it stopped being per-section.
    //
    // It targets `> *` rather than <main> itself on purpose: padding on <main>
    // would shrink each section's own box, and the sections' full-bleed layers
    // (the hero's scrims, the plasma) are `absolute inset-0` against the
    // SECTION, so they would stop reaching the left edge of the viewport.
    // Padding on the section leaves that box full-width — an absolutely
    // positioned child resolves against the padding box — while still
    // insetting the content. It also REPLACES each section's own `md:px-16`
    // left padding instead of adding to it, which keeps the max-w-6xl column
    // optically centred at ≥1440px.
    <main className="relative w-full lg:[&>*]:pl-48">
      <Hero />

      <StackSection />

      <ServicesSection />

      <AboutSection />

      <TechLoop />

      <FaqSection />

      {/* Work sits at the END, but BEFORE contact rather than dead last: the
          visitor should finish on the proof and step straight into the
          enquiry, not scroll past the contact form to reach the portfolio and
          then have to climb back. */}
      <WorkSection />

      <ContactSection />

      {/* The single persistent 3D canvas: absolute within <main>, sticky
          viewport inside, z-10 — above section backdrops, below content. */}
      <ScrollScene />
    </main>
  );
}
