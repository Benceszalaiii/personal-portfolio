"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

/*
  Scroll-driven feature sequence, tuned per device:

  - md+ (desktop/tablet): the section PINS for two extra viewport heights while
    the three features crossfade in order, scrubbed by scroll. Thin shared
    progress bars fill as each step plays.
  - mobile: pinning a tall section fights the mobile URL-bar resize (jumps), so
    instead the three features stay in normal flow and each RISES + fades in on
    scroll, with an ember bar wiping across as it settles. A real scroll
    animation — just one that suits a small screen.

  Degradation: the DOM default is all three features stacked and visible. GSAP
  only touches them inside a matchMedia + motion-OK gate, so reduced-motion,
  no-JS and crawlers all get the readable list.
*/

const features = [
  {
    tag: "Rugalmasság",
    heading: "Szerkeszthetőség korlátok nélkül",
    body: "Nem sablont kapsz: az oldal a te céljaidra épül, a tartalmát pedig magad szerkeszted — fejlesztő nélkül, percek alatt.",
  },
  {
    tag: "Teljesítmény",
    heading: "Villámgyors, hibátlan működés",
    body: "Minden eszközön azonnal betölt és hibátlanul fut — az első benyomás már a megnyitás pillanatában eldől.",
  },
  {
    tag: "Arculat",
    heading: "Prémium, elegáns megjelenés",
    body: "Egyedi arculat, átgondolt animációk, letisztult élmény — dizájn, amivel kitűnsz a versenytársaid közül.",
  },
];

export default function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (mmCtx) => {
          const root = sectionRef.current;
          if (!root) return;
          const panels = gsap.utils.toArray<HTMLElement>(".feature-panel");
          if (panels.length === 0) return;
          const { desktop, mobile } = (mmCtx.conditions ?? {}) as {
            desktop?: boolean;
            mobile?: boolean;
          };

          if (desktop) {
            // ---- pinned crossfade sequence ----
            const fills = gsap.utils.toArray<HTMLElement>(".feature-bar-fill");
            const stage = root.querySelector<HTMLElement>(".feature-stage");
            const bars = root.querySelector<HTMLElement>(".feature-progress");
            if (!stage) return;

            // freeze the stage at the tallest panel, then stack the panels
            const maxH = Math.max(...panels.map((p) => p.offsetHeight));
            gsap.set(stage, { height: maxH });
            gsap.set(panels, {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            });
            gsap.set(panels.slice(1), { autoAlpha: 0, y: 32 });
            if (bars) gsap.set(bars, { display: "flex" });

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            panels.forEach((panel, i) => {
              const at = i * 1.35;
              if (i > 0) {
                tl.to(
                  panels[i - 1],
                  { autoAlpha: 0, y: -32, duration: 0.25, ease: "power1.in" },
                  at - 0.35,
                );
                tl.fromTo(
                  panel,
                  { autoAlpha: 0, y: 32 },
                  { autoAlpha: 1, y: 0, duration: 0.25, ease: "power1.out" },
                  at - 0.1,
                );
              }
              if (fills[i]) {
                tl.fromTo(
                  fills[i],
                  { scaleX: 0 },
                  { scaleX: 1, duration: 1 },
                  at + (i === 0 ? 0 : 0.15),
                );
              }
            });
            // settle hold so the last feature breathes before the pin releases
            tl.to({}, { duration: 0.4 });
          }

          if (mobile) {
            // ---- mobile: rise-and-fade reveal per feature, scrubbed bar ----
            panels.forEach((panel) => {
              gsap.from(panel, {
                y: 44,
                autoAlpha: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              });
              const bar = panel.querySelector<HTMLElement>(
                ".feature-mobile-fill",
              );
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
                      start: "top 80%",
                      end: "top 45%",
                      scrub: true,
                    },
                  },
                );
              }
            });
          }
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      // z-20: pinning makes this section position:fixed, which forms its own
      // stacking context — without an explicit z-index the z-10 canvas would
      // paint over the pinned text.
      // lg:pl-44: clear the fixed section sidebar (left-4, ~170px wide) so the
      // centered headline never slides under it on mid-width screens.
      className="relative z-20 w-full px-4 py-24 md:px-16 lg:pl-44"
    >
      <div className="relative z-20 mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
          Amit kínálok
        </p>
        <h2 className="mt-4 max-w-[22ch] font-display text-3xl font-medium leading-[1.1] text-foreground md:text-5xl">
          Ne elégedj meg egy unalmas, szerkeszthetetlen weboldallal.
        </h2>

        {/* stage-features: measured by ScrollScene — the monolith settles in
            the gutter left of this block on desktop */}
        <div
          id="stage-features"
          className="feature-stage relative mx-auto mt-16 flex max-w-3xl flex-col gap-16 md:mt-20"
        >
          {features.map((f) => (
            <article key={f.tag} className="feature-panel">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                {f.tag}
              </p>
              <h3 className="mt-4 font-display text-3xl font-medium leading-[1.1] text-foreground md:text-5xl">
                {f.heading}
              </h3>
              <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                {f.body}
              </p>
              {/* mobile-only per-feature progress bar (md+ uses the shared row) */}
              <span
                aria-hidden
                className="mt-6 block h-0.5 w-16 overflow-hidden rounded-full bg-border md:hidden"
              >
                <span className="feature-mobile-fill block h-full w-full origin-left scale-x-0 bg-ember" />
              </span>
            </article>
          ))}
        </div>

        {/* progress: hidden by default, shown only when the pin is active */}
        <div
          aria-hidden
          className="feature-progress mx-auto mt-12 hidden max-w-3xl gap-3"
        >
          {features.map((f) => (
            <span
              key={f.tag}
              className="h-0.5 w-12 overflow-hidden rounded-full bg-border"
            >
              <span className="feature-bar-fill block h-full w-full origin-left scale-x-0 bg-ember" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
