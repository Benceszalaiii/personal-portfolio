import Link from "next/link";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import Reveal from "@/components/motion/Reveal";
import { caseStudies } from "@/content/case-studies";

/*
  "Munkáim" — the homepage work section. Sources the same registry as
  /esettanulmany, so publishing a study lists it here automatically and nothing
  can appear in one place but not the other.

  #stage-munkaim is the ScrollScene anchor: the monolith recedes and dims behind
  this section (see poses.ts), because the cards are dense and need to stay
  legible.
*/

export default function WorkSection() {
  if (caseStudies.length === 0) return null;

  return (
    <section
      id="munkaim"
      className="relative z-20 w-full px-4 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
            Munkáim
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-medium leading-[1.1] text-foreground md:text-5xl">
            Nem lista, hanem indoklás
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Minden projekt mögött döntések állnak. Megmutatom, milyen
            megszorítással indult, mit kényszerített ki, és mi lett belőle —
            kóddal és számokkal.
          </p>
        </Reveal>

        <div id="stage-munkaim" className="mt-14 space-y-6">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.06}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>

        {/* Only worth a "see all" once there is more than what is shown here */}
        {caseStudies.length > 1 && (
          <Reveal delay={0.1} className="mt-10">
            <Link
              href="/esettanulmany"
              className="focus-ember inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-ember hover:text-ember"
            >
              Összes esettanulmány
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
