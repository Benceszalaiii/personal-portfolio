"use server";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import OfferWizard from "@/components/OfferWizard";

export default async function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full px-4 py-24 md:px-16 md:py-32"
    >
      {/*
        The split moved from md to xl. With the sidebar gutter reserved, the 1fr
        pitch column at 1024px is only ~306px wide — and "árajánlatot." alone
        needs 479px at the old text-6xl. Even before the gutter this was a coin
        flip: measured at 1366px the column was 478.9px and the word was 478.9px,
        i.e. zero margin. Below 1280px the pitch and the wizard each get the full
        column instead of two cramped ones.
      */}
      <div className="relative z-20 mx-auto grid max-w-6xl gap-12 xl:grid-cols-[1fr_1.3fr] xl:gap-16">
        {/* Left: the pitch */}
        <Reveal>
          {/*
            "árajánlatot." costs ~8x the font-size. text-4xl put it 0.6px from
            clipping in a 288px box at 320px; the 3rem ceiling keeps it inside
            the 417px pitch column at 1280px, the narrowest width where the
            two-column split now applies.
          */}
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] text-foreground [hyphens:auto]">
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
              href={`mailto:${process.env.CONTACT_TO_EMAIL ?? "bence.szalai@icloud.com"}`}
              className="font-mono text-sm text-foreground transition-colors hover:text-ember"
            >
              {process.env.CONTACT_TO_EMAIL ?? "bence.szalai@icloud.com"}
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
