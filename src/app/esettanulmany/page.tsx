import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { ManifestoCard } from "@/components/ManifestoCard";
import Reveal from "@/components/motion/Reveal";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Esettanulmányok — Szalai Bence",
  description:
    "Hogyan épülnek a projektjeim: döntések, megszorítások és a megoldások, amiket termeltek. Részletes esettanulmányok saját és megrendelői munkákról.",
};

export default function CaseStudyIndexPage() {
  return (
    <main className="w-full">
      <section
        id="intro"
        className="relative w-full px-4 pb-12 pt-32 md:px-16 md:pb-16 md:pt-40"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(90% 60% at 50% -10%, color-mix(in oklab, var(--hero-glow) 35%, transparent), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ember">
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-ember"
              >
                ← Portfólió
              </Link>
              <span aria-hidden className="text-border">
                /
              </span>
              <span>Esettanulmányok</span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-foreground md:text-7xl">
              Esettanulmányok
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Nem képernyőfotó-galéria. Végigvezetlek azon, milyen
              megszorítással indult egy projekt, milyen döntéseket kényszerített
              ki, és mi lett belőle — kóddal és számokkal.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative w-full px-4 pb-28 md:px-16">
        <div className="mx-auto max-w-5xl space-y-6">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.06}>
              <CaseStudyCard study={study} priority={i === 0} />
            </Reveal>
          ))}

          {/* Mirrors the homepage stack — the two listings are kept identical
              on purpose, so a reader never finds something in one and not the
              other. */}
          <Reveal delay={caseStudies.length * 0.06}>
            <ManifestoCard />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
