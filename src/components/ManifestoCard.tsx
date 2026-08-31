/*
  The manifesto card — "Szenvedély", the standalone poem at
  manifesto.benceszalai.hu.

  It sits in the same stack as the case studies but is deliberately NOT one:
  it has no client, no constraint that forced it and no numbers to report, so
  it must not be pushed through the CaseStudy content model. Forcing it there
  would also mint an /esettanulmany/<slug> route for a piece whose whole point
  is that it lives on its own domain and is read start to finish.

  What it shares with CaseStudyCard is the frame — same rounded-2xl grid, same
  eyebrow/title/summary/CTA order — so the row reads as one family. What it
  does NOT share is the screenshot: a poem has no screen worth cropping, so the
  right-hand panel carries the load-bearing line of the piece instead. The
  visual IS the type, which is also the argument the linked site makes.
*/

const MANIFESTO_URL = "https://manifesto.benceszalai.hu";

export function ManifestoCard() {
  return (
    /*
      Plain <a>, not next/link: this leaves the site entirely, so there is
      nothing for the router to prefetch or intercept.

      It borrows CaseStudyCard's surface exactly — same border, same card fill,
      same hover — because the row has to read as one family. What it does not
      borrow is the ember hover border: this card is an aside, not a fourth
      case study, and letting it light up the same way would promote it.
    */
    <a
      href={MANIFESTO_URL}
      target="_blank"
      rel="noreferrer"
      className="focus-ember group block rounded-2xl"
    >
      <div className="grid w-full overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 group-hover:border-ember/30 md:grid-cols-[1.1fr_1fr]">
        {/* Copy first in the DOM; the plate sits second on desktop and first on
            mobile, matching CaseStudyCard so the two cards stack identically. */}
        <div className="order-2 flex flex-col justify-center p-8 md:order-1 md:p-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ember">
            Manifesztum · 2026
          </p>
          <h3 className="mt-3 font-display text-2xl font-medium text-foreground md:text-3xl">
            Szenvedély
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Vers arról, mi marad az emberből, ha a gép bármit létre tud hozni.
            Nyolc fejezet, magyarul — az oldal nem illusztrálja a sorokat, hanem
            eljátssza őket.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {["Next.js", "Görgetésre írt animáció", "Magyar tipográfia"].map(
              (tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-foreground/60"
                >
                  {tag}
                </li>
              ),
            )}
          </ul>
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 group-hover:text-ember">
            Olvasd el
            {/* The arrow says "off-site"; the sr-only note says the same thing
                to a screen reader, which cannot see that it points north-east. */}
            <span aria-hidden>↗</span>
            <span className="sr-only">(új lapon nyílik)</span>
          </span>
        </div>

        {/*
          The quote plate. `relative` hosts the glow; `isolate` is not needed —
          the glow is the first child and paints under the blockquote by
          document order.
        */}
        <div className="relative order-1 flex items-center justify-center border-b border-border p-8 md:order-2 md:border-b-0 md:border-l md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(75% 65% at 50% 40%, color-mix(in oklab, var(--hero-glow) 30%, transparent), transparent 72%)",
            }}
          />
          {/*
            The thesis of the whole piece, split across two lines because the
            split IS the sentence: the first half is what everyone already
            grants the machine, the second is the correction. Only the second
            half carries the warm ink, exactly as it does on the poem itself.
          */}
          <blockquote className="relative font-display text-balance text-center text-xl font-medium leading-[1.25] text-foreground md:text-2xl">
            <p>Az AI formát ad.</p>
            <p className="text-ember">Te jelentést.</p>
          </blockquote>
        </div>
      </div>
    </a>
  );
}
