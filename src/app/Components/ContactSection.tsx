import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import OfferWizard from "@/components/OfferWizard";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full px-4 py-24 md:px-16 md:py-32"
    >
      <div className="relative z-20 mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.25fr] md:gap-16">
        {/* Left: the pitch */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
            Kapcsolat
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-foreground md:text-6xl">
            Kérj árajánlatot.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Válaszolj négy rövid kérdésre a projektedről — két perc az egész, és
            egy munkanapon belül személyre szabott ajánlattal jelentkezem.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Vagy írj közvetlenül
            </p>
            <a
              href="mailto:szbence2007@gmail.com"
              className="font-mono text-sm text-foreground transition-colors hover:text-ember"
            >
              szbence2007@gmail.com
            </a>
            <Link
              href="https://github.com/benceszalaiii"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-ember"
            >
              github.com/benceszalaiii
            </Link>
          </div>
          {/* stage-cta: empty in-flow stage under the links where the
              monolith comes to rest at the end of its journey */}
          <div
            id="stage-cta"
            aria-hidden
            className="mt-16 hidden h-40 md:block"
          />
        </Reveal>

        {/* Right: the inline offer wizard */}
        <Reveal delay={0.08}>
          <OfferWizard />
        </Reveal>
      </div>
    </section>
  );
}
