"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

/*
  The three selling points.

  The previous version PINNED this section for two extra viewport heights and
  crossfaded the panels in place. Two problems: scrolling stopped moving the
  page, which reads as a broken scrollbar, and it showed one point at a time,
  so the three could never be compared. It also fought the mobile URL-bar
  resize badly enough to need an entirely separate mobile branch.

  Now they bank past instead. Each panel enters low, tilted and soft, and
  resolves to flat and sharp as it crosses the middle of the screen — the way
  something outside a window resolves as you move past it. Nothing pins,
  nothing is hijacked, all three coexist on the page, and one code path serves
  every width.

  Degradation: the DOM ships all three flat, opaque and readable. GSAP only
  touches them inside a motion-OK media gate, and the animation floors opacity
  at 0.62 rather than 0, so even a half-applied scrub is legible.
*/

/*
  Rewritten copy. All three panels broke the same three rules: they stacked
  quality adjectives instead of facts, sold appearance with no function
  attached, and one made a claim about the reader's competitors that nothing on
  the page supports. The middle panel additionally restated its own heading word
  for word — two lines of type carrying one line of information.

  Every claim below is now checkable from where the reader is standing: the
  editor is a real Hungarian-language surface, the speed is the speed of the
  page they are currently on, and the functional examples are the same three
  trades the hero names.

  The `tag` eyebrows are gone with them. "Rugalmasság / Teljesítmény / Arculat"
  labelled each panel with the adjective the body was already failing to earn.
*/
const features = [
  {
    heading: "Magad szerkeszted, fejlesztő nélkül",
    body: "Nem sablont kapsz: az oldal a te céljaidra épül. A szövegeket és a képeket magyar nyelvű felületen írod át, percek alatt.",
  },
  {
    heading: "Gyorsan tölt, mobilon is",
    body: "Nem csak asztali gépen, vezetékes neten. Hogy mennyire, azt most mérted le — ezt az oldalt is én építettem.",
  },
  {
    heading: "Szép is, és tud is valamit",
    body: "A dizájn az egyik fele. A másik, hogy a foglalási naptár tényleg foglal és a készlet tényleg stimmel.",
  },
];

export default function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".feature-panel");
        const wide = window.matchMedia("(min-width: 768px)").matches;

        panels.forEach((panel, i) => {
          // Alternate the bank direction so the sequence has rhythm instead of
          // three identical entrances — the uniform-reveal tell.
          const dir = i % 2 === 0 ? 1 : -1;

          gsap.fromTo(
            panel,
            {
              yPercent: 8,
              // The opacity floor is 0.62 and the blur 3.5px, not 0 and 7px:
              // with three tall panels, more than one is mid-animation at any
              // scroll position, and a harder tuning leaves a whole screen of
              // unreadable text.
              autoAlpha: 0.62,
              scale: 0.97,
              rotateY: wide ? dir * 10 : 0,
              rotateX: wide ? 5 : 0,
              filter: wide ? "blur(3.5px)" : "blur(0px)",
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              scale: 1,
              rotateY: 0,
              rotateX: 0,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                // Resolves by the time the panel reaches two-thirds up the
                // screen, so a panel you are actually reading is always sharp.
                start: "top 88%",
                end: "top 62%",
                scrub: 0.6,
              },
            },
          );

          const bar = panel.querySelector<HTMLElement>(".feature-fill");
          if (bar) {
            gsap.fromTo(
              bar,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                transformOrigin: "left",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 85%",
                  end: "top 45%",
                  scrub: true,
                },
              },
            );
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      // The lg sidebar gutter now comes from <main> in page.tsx — one rule for
      // every section, so none of them can forget it again.
      className="relative w-full px-4 py-28 md:px-16"
      style={{ zIndex: "var(--z-content)" }}
    >
      <div className="relative mx-auto max-w-6xl">
        <h2 className="max-w-[20ch] font-display text-[clamp(1.6rem,1.1rem_+_3.1vw,3.4rem)] font-medium leading-[1.1] text-foreground [hyphens:auto]">
          Ne érd be egy <span className="text-ember">földhözragadt</span>{" "}
          weboldallal
        </h2>

        {/* stage-features: measured by ScrollScene — the monolith settles in
            the gutter left of this block on desktop. perspective on the
            container rather than on each panel, so the three share one vanishing
            point and read as a sequence banking past a single viewer. */}
        <div
          id="stage-features"
          className="relative mx-auto mt-20 flex max-w-3xl flex-col gap-20"
          style={{ perspective: "1200px" }}
        >
          {features.map((f) => (
            <article
              key={f.heading}
              className="feature-panel"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.1] text-foreground">
                {f.heading}
              </h3>
              <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                {f.body}
              </p>
              {/* Per-panel rule, filled on scrub. It replaces the old shared
                  progress row, which only existed to report where the pin was
                  — with nothing pinned there is no shared progress to report. */}
              <span
                aria-hidden
                className="mt-7 block h-0.5 w-24 overflow-hidden rounded-full bg-border"
              >
                <span className="feature-fill block h-full w-full origin-left scale-x-0 bg-ember" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
