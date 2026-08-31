"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";

/*
  Rólam. One orchestrated entrance: a masked headline rise and a staggered
  fade-up through the copy. All tweens sit inside a reduced-motion matchMedia
  gate, so the DOM default stays fully visible for no-JS, crawlers and
  prefers-reduced-motion.

  The portrait is gone, and with it the parallax and the zoom dialog it needed.
  The right column is now the ScrollScene stage (#stage-about) with nothing in
  it but the monolith settling there — which is what that column was measured
  for in poses.ts all along, and what it now actually shows.
*/
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = sectionRef.current;
        if (!root) return;

        gsap.from(".about-rise", {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        });
        gsap.from(".about-fade", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full px-4 py-24 md:px-16 md:py-32"
    >
      <div className="relative z-20 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div>
          <p className="about-fade font-mono text-xs uppercase tracking-[0.2em] text-ember">
            Rólam
          </p>
          {/*
            Fluid rather than text-4xl/text-6xl. With the rail gutter reserved,
            this is a 1.3fr column of a max-w-6xl grid — at 1024px it measures
            ~398px, and the md jump straight from 36px to 60px broke the man's
            own name across two lines at every width below ~1330px. The clamp
            reaches full size only where the column can hold it.
          */}
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.75rem)] font-medium leading-[1.05] text-foreground [hyphens:auto]">
            {/* outer span masks the rise; padding keeps descenders unclipped */}
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span className="about-rise block">Szalai Bence</span>
            </span>
          </h2>
          <p className="about-fade mt-3 font-mono text-sm tracking-wide text-muted-foreground">
            Full-stack webfejlesztő · Győr
          </p>
          <div className="mt-7 max-w-[60ch] space-y-4 text-lg leading-relaxed text-muted-foreground">
            {/* "kézműves igényességű munka" was the same unbacked quality
                adjective the hero and StackSection were carrying. Replaced with
                what the work actually does, which is also the site's
                positioning: not presence, but the software a business runs on. */}
            <p className="about-fade">
              16 éves korom óta építek weboldalakat. Ami hobbiként indult, ma
              már{" "}
              <span className="font-medium text-ember">
                vállalkozások napi működését
              </span>{" "}
              viszi — foglalást, készletet, tartalmat.
            </p>
            <p className="about-fade">
              Nálam nincs ügynökségi futószalag: az első vázlattól az élesítésig{" "}
              <span className="font-medium text-ember">
                végig velem dolgozol
              </span>
              . Gyors visszajelzés, átlátható folyamat — és egy fejlesztő,
              akinek a te projekted a fő projekt.
            </p>
            {/* "hamarosan" was doing real damage here: it talked down a
                finished case study that renders on this same page. Naming the
                work instead. */}
            <p className="about-fade">
              Egy munkám írásban is megvan: a{" "}
              <Link
                href="/esettanulmany/nyaralashasonlito"
                className="font-medium text-foreground underline decoration-ember/50 underline-offset-4 transition-colors hover:text-ember"
              >
                Nyaraláshasonlító
              </Link>{" "}
              — hogy indult, mit kellett eldönteni, mi lett belőle. A többit
              megtalálod a{" "}
              <Link
                href="https://github.com/benceszalaiii"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline decoration-ember/50 underline-offset-4 transition-colors hover:text-ember"
              >
                GitHub profilomon
              </Link>
              .
            </p>
          </div>
        </div>

        {/*
          stage-about: measured by ScrollScene — the monolith comes to rest
          here. It is an EMPTY box on purpose, and it has to keep a height:
          the canvas is a fixed sibling layer that positions itself against
          this element's rect, so a zero-height div would collapse the pose to
          the top of the section. aspect-[4/5] preserves the footprint the
          portrait used to occupy, which is the ratio poses.ts was tuned
          against.
        */}
        <div
          id="stage-about"
          aria-hidden
          className="mx-auto hidden aspect-[4/5] w-full max-w-xs md:mx-0 md:block"
        />
      </div>
    </section>
  );
}
