import Link from "next/link";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { ManifestoCard } from "@/components/ManifestoCard";
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
          {/*
            The eyebrow is gone: it read "Munkáim" directly above a heading and
            a rail label that both already say so. The clamp floor is sized for
            a ~10.8x-font-size word — at text-3xl (30px) the previous heading
            needed 324.5px of line in a 288px box at 320px, so it ran 20.5px
            past the right edge of the phone. Floor: 320px -> 0.4rem + 5.5vw =
            24px. Leave it as the budget any future heading here has to fit.
          */}
          <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.5rem,0.4rem_+_5.5vw,3rem)] font-medium leading-[1.1] text-foreground [hyphens:auto]">
            Nem mutatok olyat, amit ne tudnál megnyitni.
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

          {/* Last, and outside the registry on purpose. The poem is not a case
              study — no client, no constraint, no numbers — but it is the most
              complete thing on this page to open, so it belongs in the proof
              and not buried in the footer. */}
          <Reveal delay={caseStudies.length * 0.06}>
            <ManifestoCard />
          </Reveal>
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
