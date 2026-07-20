"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";

/*
  Rólam. One orchestrated entrance (masked headline rise + staggered copy +
  portrait arrival) and a slow portrait parallax while the section scrolls.
  All tweens are gsap.from/gsap.to inside a reduced-motion matchMedia gate,
  so the DOM default stays fully visible for no-JS, crawlers and
  prefers-reduced-motion.
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
        gsap.from(".about-portrait", {
          y: 48,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 65%" },
        });
        // gentle drift — the portrait scrolls a touch slower than the copy
        gsap.to(".about-portrait", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
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
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-foreground md:text-6xl">
            {/* outer span masks the rise; padding keeps descenders unclipped */}
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span className="about-rise block">Szalai Bence</span>
            </span>
          </h2>
          <p className="about-fade mt-3 font-mono text-sm tracking-wide text-muted-foreground">
            Full-stack webfejlesztő · Győr
          </p>
          <div className="mt-7 max-w-[60ch] space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p className="about-fade">
              16 éves korom óta építek weboldalakat — ami hobbiként indult, mára{" "}
              <span className="font-medium text-ember">
                vállalkozások online jelenlétét
              </span>{" "}
              hordozó, kézműves igényességű munkává érett.
            </p>
            <p className="about-fade">
              Nálam nincs ügynökségi futószalag: az első vázlattól az élesítésig{" "}
              <span className="font-medium text-ember">
                végig velem dolgozol
              </span>
              . Gyors visszajelzés, átlátható folyamat — és egy fejlesztő,
              akinek a te projekted a fő projekt.
            </p>
            <p className="about-fade">
              A referenciáim hamarosan itt is helyet kapnak — addig is
              megtalálod a munkáimat a{" "}
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

        {/* stage-about: measured by ScrollScene — the monolith settles beside it */}
        <div id="stage-about" className="mx-auto w-full max-w-xs md:mx-0">
          <div className="about-portrait">
            <MorphingDialog>
              <MorphingDialogTrigger>
                <div className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-card p-2 transition-colors duration-300 hover:border-ember/60">
                  <MorphingDialogImage
                    src="/picture.jpeg"
                    className="aspect-4/5 w-full rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    alt="Szalai Bence portré"
                  />
                </div>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="max-w-md border border-border bg-card">
                  <MorphingDialogClose />
                  <MorphingDialogImage
                    src="/picture.jpeg"
                    className="w-full rounded-lg"
                    alt="Szalai Bence portré"
                  />
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
            <p className="mt-3 text-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground/80 md:text-left">
              Győr, Magyarország
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
