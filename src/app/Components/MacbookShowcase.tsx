"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

/*
  Split showcase directly under the hero: sticky pitch on the left, the
  MacBook scroll animation on the right. The copy animates in with GSAP
  (fade-up stagger) once the section enters; reduced-motion visitors get the
  static content because the tween simply never registers. The left column
  hosts #stage-showcase — the ScrollScene monolith recedes and dims behind it
  while the MacBook owns the right half (see poses.ts).
*/
export default function MacbookShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".showcase-line", {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative w-full overflow-x-clip px-4 md:px-16"
    >
      <div className="relative z-20 mx-auto grid max-w-6xl lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        {/* Left: the pitch. On mobile it pins to the TOP of the viewport (with a
            background fade so it stays legible over the laptop scrolling beneath
            it); on lg it becomes the sticky bottom-anchored column beside the
            MacBook. */}
        <div className="sticky top-0 z-30 self-start bg-gradient-to-b from-background from-55% to-transparent pt-24 pb-12 lg:flex lg:h-screen lg:items-end lg:bg-none lg:pb-24 lg:pt-0">
          <div id="stage-showcase">
            <p className="showcase-line font-mono text-xs uppercase tracking-[0.2em] text-ember">
              Élő bemutató
            </p>
            <h2 className="showcase-line mt-4 font-display text-4xl font-medium leading-[1.05] text-foreground md:text-6xl">
              A weboldalad ügyfeleket hoz. A többit intézem.
            </h2>
            <p className="showcase-line mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Görgess, és nézd meg, hogyan kel életre egy általam épített oldal
              — gyors, reszponzív, minden képernyőn hibátlan. A dizájntól a
              kódon át az üzemeltetésig mindenről gondoskodom.
            </p>
          </div>
        </div>

        {/* Right: the MacBook scroll animation */}
        <div className="relative">
          <MacbookScroll
            src="/mac_preview.png"
            showGradient={false}
            title={null}
          />
        </div>
      </div>
    </section>
  );
}
