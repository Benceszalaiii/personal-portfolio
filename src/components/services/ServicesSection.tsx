"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

/*
  Szolgáltatások — the offer, not a menu of six equal things.

  What this replaced: a 3 x 2 grid of identical glass cards, each with a
  rounded icon chip, a display-face title, three bullets and a "Részletek →"
  trigger. Three problems, in order of severity:

    1. It lied about the hierarchy. "Egyedi weboldalak" IS the product; the
       other five are what comes with it. Six equal boxes assert six equal
       products, so the visitor has to work out the offer for themselves.
    2. Six raised panels sat in one viewport. "Restraint is the flex": a
       surface treatment repeated six times stops being a treatment and
       becomes wallpaper.
    3. Every "Részletek →" trigger had the same accessible name, so a screen
       reader user tabbed through six identical controls.

  The composition now runs product → inventory:

    - one full-width primary statement, bracketed by the site's signature
      gradient hairline (.border-gradient-t/-b) and set in the SANS at black
      weight — upright and solid against the high-contrast Didone h2 above it,
      which is the contrast axis the type system was built on. Its detail copy
      is shown, not hidden: it is the thing being sold.
    - the remaining five as a run of ruled disclosure rows. No chrome, no
      icons, no glass. Native <details>, so the semantics, the keyboard
      behaviour and the no-JS fallback come from the platform rather than from
      us, and each control's accessible name is its own service title.
    - one raised panel in the whole section: the CTA, which is the only
      interactive surface that earns it.

  Motion: Reveal (IntersectionObserver + 1.6s timeout safety net) replaces
  framer-motion's whileInView. The old version rendered at opacity 0.1 in any
  context where rAF is throttled — hidden tab, headless capture — which is a
  section that ships blank. Reveal enhances an already-visible default.
  The disclosure animates via ::details-content behind an @supports gate, so
  browsers without interpolate-size get an instant, correct toggle.

  Copy is now derived from the calculator (src/pricing.json), because the two
  pages are the same offer and a visitor who reads this section and then opens
  /kalkulator must not find a different product there. Every row maps to real
  sections of that data — Dizájn, the CMS package, Biztonság + the booking
  package, hosting/maintenance, and the remaining extras — and every figure
  quoted here is a `price` from that file.

  What that data forced out of the section: the old "Teljesítmény & SEO" row.
  In pricing.json `seo`, `performance` and `responsive` are `base: true` at
  0 Ft — the calculator refuses to bill for them and prints them as facts in
  its "Minden csomagban benne van" strip. Selling them as a service row here
  would have been a page contradicting its own price list two clicks later, so
  all three collapse into one line under the primary block: they are the floor,
  not an item. Their old row is replaced by "Foglalás & belépés", which is
  where the money in the data actually is.

  Division of labour inside an open row, and the rule for anyone editing this
  copy: the LIST on the left carries the items and the figures, the PROSE on
  the right carries only what a list cannot — a dependency, an external cost,
  a decision that can wait. A `detail` that walks back through the same prices
  in sentence form is two columns saying one thing, so no price appears in a
  `detail` unless it exists nowhere else in the row (the domain fee and the
  paid hosting tier are the two that qualify — neither is a line I bill).

  Figures are hardcoded rather than read from pricing.json: this section is on
  the home page, and a static JSON import would ship the whole price file in
  its client bundle for the sake of six numbers. src/pricing.json stays the
  source of truth — when a price moves there, it moves here too.

  Ink: two tiers, no more. Losing the panels means the page background — and,
  where the traveling monolith passes behind, a moving one — sits under every
  word. --foreground and --muted-foreground both clear AA against it; a third,
  fainter tier would not, and inventing one is how a section ends up with copy
  that is only legible while the canvas happens to be dark. Hierarchy is
  carried by scale and weight instead. --ember stays on the arrow, the "Mit
  tartalmaz" label and the bullets.
*/

/**
 * One line of "Mit tartalmaz". The price is separate from the label rather
 * than baked into the string so it can be set in --ember and normal weight:
 * the reader scans the labels, and the figures sit under them as support
 * instead of competing with them. Thousands separators are non-breaking
 * spaces, matching what Intl produces for the calculator's own totals.
 */
type Feature = { label: string; price?: string };

type Service = {
  /** Stable id source for the disclosure wiring. */
  slug: string;
  title: string;
  description: string;
  features: Feature[];
  detail: string;
};

const SERVICES: Service[] = [
  {
    slug: "egyedi-weboldalak",
    title: "Egyedi weboldalak",
    description:
      "Bemutatkozó oldaltól a működő foglalási naptárig: négy kiindulás, és mind a nulláról épül.",
    features: [
      { label: "Landing oldal", price: "50 000 Ft" },
      { label: "Céges oldal szerkesztőfelülettel", price: "300 000 Ft" },
      { label: "Foglalási naptár", price: "150 000 Ft" },
      { label: "Teljesen egyedi fejlesztés", price: "300 000 Ft-tól" },
    ],
    detail:
      "Nincs sablon és nincs felesleges bővítmény. A forráskód a tiéd — egy másik fejlesztő is át tudja venni, ha egyszer arra kerül sor.",
  },
  {
    slug: "arculat-dizajn",
    // The one service that sold itself entirely on adjectives — "letisztult",
    // "prémium", "átgondolt", "egyedi" — plus a claim about the reader's
    // competitors. Rewritten to the three priced options in the data.
    title: "Arculat & dizájn",
    description:
      "Ha van kész arculatod, arra építek. Ha nincs, megtervezem — kontrasztra mérve, billentyűzettel is használhatóan.",
    features: [
      { label: "Meglévő arculatod átvétele", price: "25 000 Ft" },
      { label: "Dizájn a nulláról", price: "35 000 Ft" },
      { label: "3D grafika", price: "50 000 Ft" },
      { label: "Akadálymentesítés (WCAG 2.1 AA)", price: "mindháromban" },
    ],
    detail:
      "A dizájn külön tétel, mert külön munka — de ha már van arculatod, nem fizetsz újratervezésért. Az akadálymentesítés viszont nem választható: a kontrasztot megmérem, a felületet billentyűzettel is végigjárhatod.",
  },
  {
    slug: "tartalomkezeles",
    title: "Tartalomkezelés",
    description:
      "Szövegek, képek és blog: magad szerkeszted egy magyar nyelvű felületen, fejlesztő nélkül.",
    features: [
      { label: "Magyar nyelvű szerkesztőfelület" },
      { label: "Szerepkörök és jogosultságok" },
      { label: "Verziózott tartalom" },
      {
        label: "Backend: adatbázis és fájltár",
        price: "25 000 Ft + 10 000 Ft/hó",
      },
    ],
    detail:
      "Ha tartalom mozog az oldalon, adatbázis és fájltár kell alá — ez a backend, és havi díja van. Cserébe nem kell fejlesztőt hívnod egy árváltozás vagy egy új blogbejegyzés miatt.",
  },
  {
    slug: "foglalas-belepes",
    title: "Foglalás & belépés",
    description:
      "Időpontfoglalás dupla foglalás nélkül, és belépés, amihez az ügyfelednek nem kell új jelszót kitalálnia.",
    features: [
      { label: "Foglalási naptár", price: "150 000 Ft" },
      { label: "Belépés Google-fiókkal", price: "25 000 Ft" },
      { label: "Belépés egyszer használatos linkkel", price: "20 000 Ft" },
      { label: "Belépés e-maillel és jelszóval", price: "15 000 Ft" },
    ],
    detail:
      "A foglalási naptárban a Google-fiókos belépés már benne van, külön fizetned nem kell érte. Mindegyik belépés adatbázist igényel, tehát a backend tétel is kell mellé.",
  },
  {
    slug: "uzemeltetes-tamogatas",
    title: "Üzemeltetés & támogatás",
    description:
      "A karbantartás nem előfizetés, amibe beleragadsz: te döntöd el, meddig kéred.",
    features: [
      { label: "Élesítés és tárhely (Vercel)", price: "0 Ft" },
      { label: "Első 3 hónap karbantartás", price: "ingyenes" },
      { label: "Karbantartás utána", price: "10 000 Ft/hó" },
      { label: "Saját e-mail cím a domainhez", price: "15 000 Ft" },
      { label: "Látogatottsági statisztika", price: "0 Ft" },
    ],
    detail:
      "Két költség nem nálam landol: a domain díja 2 000–10 000 Ft/év a regisztrátornál, és nagy forgalomnál a tárhely fizetős csomagja 25 $/hó. A karbantartás a biztonsági frissítéseket, a hibajavítást és a tartalomfrissítést fedi.",
  },
  {
    slug: "bovitesek",
    title: "Bővítések",
    description:
      "Ami nem mindenkinek kell. Egyik csomagban sincs benne, és alapból nem is számolom fel.",
    features: [
      { label: "Többnyelvű oldal", price: "20 000 Ft/nyelv" },
      { label: "Világos/sötét mód", price: "10 000 Ft" },
      { label: "Termékfotózás az oldalhoz", price: "50 000 Ft" },
    ],
    detail:
      "A második nyelvet és a sötét módot utólag is fel lehet venni, ez nem most eldöntendő kérdés. A termékfotózással viszont érdemes az élesítés előtt végezni: kész oldalba képet cserélni több munka.",
  },
];

// The first entry is the product; the rest are what comes with it. Destructured
// rather than stored in two arrays so the source order stays the read order.
const [CORE, ...INCLUDED] = SERVICES;

/*
  Disclosure styling that cannot live in a Tailwind class: the UA marker and
  the ::details-content pseudo-element.

  The height transition sits behind @supports (interpolate-size) deliberately.
  A browser that understands ::details-content but not interpolate-size would
  apply `block-size: 0` and never animate to `auto` — content stuck closed.
  Gating on the feature that actually makes the animation possible means every
  other engine falls back to the native instant toggle, which is correct.
*/
const disclosureCss = `
.svc-row > summary::-webkit-details-marker { display: none; }
.svc-row > summary::marker { content: ""; }
@supports (interpolate-size: allow-keywords) {
  .svc-row { interpolate-size: allow-keywords; }
  .svc-row::details-content {
    block-size: 0;
    overflow: clip;
    transition:
      block-size 420ms var(--ease-out-expo),
      content-visibility 420ms allow-discrete;
  }
  .svc-row[open]::details-content { block-size: auto; }
  @media (prefers-reduced-motion: reduce) {
    .svc-row::details-content { transition: none; }
  }
}
`;

/** Disclosure affordance. Rotates a quarter turn to point into the panel it
 *  opens — the same arrow the old "Részletek →" link used, now carrying state
 *  instead of pretending to be a link. */
function RowArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h10" />
      <path d="M8.5 4l4 4-4 4" />
    </svg>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full px-4 py-24 md:px-16 md:py-32"
      style={{ zIndex: "var(--z-content)" }}
    >
      {/* React 19 hoists and dedupes this; globals.css is owned elsewhere. */}
      <style href="services-disclosure" precedence="medium">
        {disclosureCss}
      </style>

      <div className="mx-auto max-w-6xl">
        {/* ── Opener. The only display-face type in the section. ── */}
        <Reveal>
          {/* The lead starts at column 6 so it lands on the same axis as the
              primary block's body copy below — the diagonal is the composition,
              not decoration. The h2 needs the full measure: the display face is
              wide, and boxing this sentence into half the grid wraps it to five
              slanted lines. */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <h2 className="max-w-[21ch] font-display text-[clamp(1.75rem,4.4vw,3.25rem)] font-medium leading-[1.1] text-foreground lg:col-span-12">
              Mindent egy kézből, a tervezéstől az üzemeltetésig.
            </h2>
            {/* The old lead ("nem csak egy weboldalt kapsz, hanem egy
                partnert") would have survived unchanged on any developer's
                site. This one says something only this site can: the prices
                are already public, two clicks away, before you talk to me. */}
            <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-foreground lg:col-span-7 lg:col-start-6 lg:mt-10">
              Minden tétel, amit itt olvasol, fix áron szerepel a{" "}
              <Link
                href="/kalkulator"
                className="focus-ember rounded-sm font-medium text-foreground underline decoration-ember/50 underline-offset-4 transition-colors hover:text-ember"
              >
                kalkulátorban
              </Link>{" "}
              is. Nem kell ajánlatot kérned ahhoz, hogy lásd, mibe kerül.
            </p>
          </div>
        </Reveal>

        {/* ── The product. Full width, bracketed by the horizon hairline. ── */}
        <Reveal delay={0.08}>
          <div className="border-gradient-t border-gradient-b relative mt-16 grid gap-x-12 gap-y-7 py-12 lg:grid-cols-12 md:py-14">
            {/* Both ends of the clamp stay under the h2's (1.75→3.25rem) so the
                opener never loses to the offer at any viewport width. */}
            <h3 className="text-[clamp(1.55rem,4.2vw,2.9rem)] font-black leading-[1.08] tracking-tight text-foreground lg:col-span-5">
              {CORE.title}
            </h3>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="max-w-[48ch] text-xl leading-snug font-medium text-foreground md:text-2xl">
                {CORE.description}
              </p>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-foreground">
                {CORE.detail}
              </p>
            </div>

            {/* The four starting points, with their prices. Spans the whole
                block rather than the body column, so the strip caps the
                statement instead of trailing off it.

                It used to be an inline run of three rule-separated items. Four
                items — now carrying figures as well as labels — wrapped to a
                second line at 1280px, and a wrapped item still rendered the
                `border-l` that was standing in for a separator, so a rule hung
                in the gutter with nothing to its left. A rule that only reads
                correctly when the line does not wrap is a rule that will break
                again at the next copy change, so the separators are gone and
                the columns carry the division instead: four at lg, two at sm,
                stacked below that. Price under label, in --ember at normal
                weight — the labels are what you scan, the figures answer the
                question the labels raise. */}
            <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:col-span-12 lg:col-start-1 lg:mt-2 lg:grid-cols-4">
              {CORE.features.map((feature) => (
                <li key={feature.label} className="text-sm">
                  <span className="block font-semibold text-foreground">
                    {feature.label}
                  </span>
                  {feature.price ? (
                    <span className="mt-1 block text-ember">
                      {feature.price}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>

            {/*
              The baseline line — the one place SEO, speed and mobile are
              mentioned at all.

              These three are `base: true` at 0 Ft in pricing.json, which is a
              stronger statement than a service row could make: the price list
              itself will not charge for them. So the sentence says the quiet
              part instead of selling it, and the figure it carries is 0.
              Placed inside the primary block, below the strip, so it reads as
              a footing under the offer rather than as a fourth spec.
            */}
            <p className="max-w-[64ch] text-sm leading-relaxed text-foreground lg:col-span-12 lg:col-start-1">
              <span className="font-semibold text-ember">
                Minden oldalhoz jár:
              </span>{" "}
              mobilbarát megjelenés, gyors betöltés és keresőbarát felépítés. A
              kalkulátorban is 0 Ft — nálam ez nem extra, hanem a kiindulás.
            </p>

            {/*
              The calculator, as a real exit rather than a word in a sentence.

              It belongs at the bottom of THIS block and nowhere earlier: the
              visitor has just read four starting prices, so the next question
              they have is their own number, and this is the only place on the
              page that can answer it without them writing to anyone. The
              section's other CTA (further down) sends them to the form; two
              exits, and the visitor picks which question they are actually
              asking.

              Outline, not filled. The filled oxblood pill is the contact
              decision — the hero spends its one CTA establishing that, and a
              second filled button of equal weight for a lower-commitment
              action would flatten the hierarchy it bought.
            */}
            <div className="lg:col-span-12 lg:col-start-1">
              <Link
                href="/kalkulator"
                className="focus-ember inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-ember hover:text-ember"
              >
                Számold ki az árad
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* ── And what comes with it. Ruled rows, no chrome. ── */}
        <div className="mt-4 border-b border-border">
          {INCLUDED.map((service, i) => (
            <Reveal key={service.slug} delay={0.04 * i} y={16}>
              <details className="svc-row group border-t border-border">
                {/* Below lg the row stacks title over description with the
                    arrow pinned right. From lg the title and description sit on
                    the same two axes as the primary block above (5 / 7 of a
                    twelve-column grid), so one vertical line runs the height of
                    the section and the arrow has a column of its own instead of
                    floating in dead space. */}
                <summary className="focus-ember grid cursor-pointer grid-cols-[1fr_2rem] items-start gap-x-6 gap-y-1.5 py-6 md:py-7 lg:grid-cols-12 lg:gap-x-12">
                  <h3 className="col-start-1 row-start-1 text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-ember md:text-xl lg:col-span-5">
                    {service.title}
                  </h3>
                  <span className="col-start-1 row-start-2 max-w-[58ch] text-sm leading-relaxed text-foreground md:text-base lg:col-span-6 lg:col-start-6 lg:row-start-1">
                    {service.description}
                  </span>
                  <span
                    aria-hidden
                    className="col-start-2 row-span-2 row-start-1 mt-1 grid h-8 w-8 shrink-0 place-items-center text-ember transition-transform duration-300 ease-[var(--ease-out-expo)] group-open:rotate-90 lg:col-span-1 lg:col-start-12 lg:row-span-1 lg:justify-self-end"
                  >
                    <RowArrow />
                  </span>
                </summary>

                {/* Opening fills the column the title left empty, so the row
                    expands on both axes rather than dropping a slab of text. */}
                <div className="flex flex-col gap-6 pb-9 lg:grid lg:grid-cols-12 lg:gap-x-12">
                  <p className="max-w-[62ch] text-base leading-relaxed text-foreground lg:col-span-7 lg:col-start-6 lg:row-start-1">
                    {service.detail}
                  </p>
                  <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
                    <p className="text-sm font-semibold text-ember">
                      Mit tartalmaz
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {service.features.map((feature) => (
                        <li
                          key={feature.label}
                          className="flex items-start gap-2.5 text-sm text-foreground"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-ember"
                          />
                          {/* Label and figure on one baseline, the figure
                              pushed right so a column of prices lines up down
                              the list instead of ragging after the labels. */}
                          <span className="flex w-full flex-wrap items-baseline justify-between gap-x-4">
                            <span>{feature.label}</span>
                            {feature.price ? (
                              <span className="text-ember">
                                {feature.price}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        {/* ── The one glass panel in this section. ── */}
        <Reveal delay={0.06}>
          {/* The only raised surface in the section. Everything above it is a
              hairline rule on the page background, so a single bordered card
              is enough to read as an object — it does not need a shadow to
              earn attention it is already the only candidate for. */}
          <div className="border-gradient-t relative mt-16 flex w-full flex-col items-start gap-5 overflow-hidden rounded-2xl border border-border bg-card p-7 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <h3 className="font-display text-xl font-medium text-foreground md:text-2xl">
                Nincs a listán, amire szükséged van?
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
                Mondd el, mire van szükséged — egy munkanapon belül válaszolok.
              </p>
            </div>
            <a
              href="#contact"
              className="focus-ember inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110"
            >
              Kérj ajánlatot
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
