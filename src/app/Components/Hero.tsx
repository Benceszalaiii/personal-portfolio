"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PlasmaWave from "@/components/PlasmaWave";
import { Signature } from "@/components/ui/signature";
import { useThemeColors } from "@/lib/theme-color";

// Staggered entrance that stays visible without JS: SSR renders shown; the
// client hides-then-reveals on mount so no-JS / crawlers still see the copy.
function useEntrance() {
  const [enhanced, setEnhanced] = useState(false);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    setEnhanced(true);
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  const step = (i: number) => {
    const hidden = enhanced && !shown;
    return {
      opacity: hidden ? 0 : 1,
      transform: hidden ? "translateY(20px)" : "none",
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s`,
    } as const;
  };
  return step;
}

export default function Hero() {
  const step = useEntrance();
  // theme-derived plasma palette (WebGL needs concrete hex, not var());
  // PlasmaWave re-reads its colors prop every frame, so this updates live
  const plasma = useThemeColors({
    deep: { css: "var(--plasma-deep)", fallback: "#5c0f16" },
    bright: { css: "var(--plasma-bright)", fallback: "#c0392b" },
  });

  return (
    <section
      id="home"
      /*
        The hero owns its horizontal padding, and owns it SYMMETRICALLY.

        Every other section inherits a left-only gutter from <main>
        (`lg:[&>*]:pl-48`) so the fixed nav rail never prints through
        left-aligned copy. This section is the one composition on the page that
        is centred on the VIEWPORT rather than on a text column: the plasma, the
        radial core glow, the copy scrim and the traveling monolith are all
        drawn at 50%. A left-only gutter shifts the type by half of itself —
        measured at 1440px, the copy centre sat at 816px against a viewport
        centre of 720px, so the headline read 96px right of the glow it is
        supposed to be sitting inside. The scroll hint below was off by the same
        96px for the same reason.

        So the gutter is MIRRORED rather than removed. Removing it (the `pl-0!`
        opt-out TechLoop uses) re-centres the copy but stops reserving anything:
        at 1024px a centred max-w-3xl column starts at x=128, and the rail
        reaches 143px — measured, not assumed: the <aside> box ends at 131px and
        SiteNav passes `maxShift={12}` to LineSidebar's proximity transform.
        That is a collision, invisible today only because this particular
        headline does not fill its box.

        The mirror is the parent's own 192px, not a value cut to fit 143px. Two
        reasons. A 1px margin is not a margin — sizing to the measurement means
        the next rail font-size bump collides silently. And one number shared
        with <main> is one number to keep true, which is the whole reason the
        gutter stopped being per-section. It costs nothing here: at 1024px the
        column is still 640px against a widest headline line of 488px, because
        Bodoni sets far narrower than the display face this composition was
        first drawn against.

        `!` because `[&>*]:pl-48` on the parent resolves at (0,2,0) and would
        otherwise win.
      */
      className="relative flex min-h-svh w-full items-center overflow-hidden px-6 lg:px-48!"
    >
      {/* Layer 1: recolored oxblood plasma */}
      <div className="absolute inset-0">
        <PlasmaWave
          colors={[plasma.deep, plasma.bright]}
          speed1={0.065}
          speed2={0.1}
          focalLength={1.45}
          bend1={1.1}
          bend2={0.6}
          dir2={1}
          rotationDeg={30}
        />
      </div>

      {/* Layer 2: soft oxblood core glow under the monolith (the 3D canvas
          itself lives in the page-level ScrollScene layer, z-10) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side at 50% 48%, color-mix(in oklab, var(--hero-glow) 55%, transparent), transparent 70%)",
        }}
      />

      {/* Legibility scrims — radial behind copy + bottom blend into page.
          z-[11]: above the traveling canvas so the hero keeps its vignette. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[11]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 62%, transparent 24%, color-mix(in oklab, var(--background) 55%, transparent) 62%, color-mix(in oklab, var(--background) 80%, transparent) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[11] h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />
      {/*
        Copy scrim. The vignette above is `transparent 24%` at its core — a
        hole in the middle of the hero — which was correct while the centre of
        this section was a hand-drawn signature: a graphic tolerates a busy
        backdrop, and putting the plasma's brightest lobe straight through the
        mark was the point.

        It stopped being correct the moment real body copy moved into that
        hole. --muted-foreground on the plasma's bright lobe does not clear
        4.5:1, and the mono byline under it is 12px, where it needs 4.5:1 more
        than anything else on the page.

        So the copy gets its own scrim rather than the whole hero getting
        darker: a soft ellipse over the text column only, ramping to fully
        transparent well inside the frame. The plasma still runs bright and
        uninterrupted through the corners and the lower third, which is where
        its most legible motion lives anyway.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[11]"
        style={{
          background:
            "radial-gradient(62% 48% at 50% 50%, color-mix(in oklab, var(--background) 80%, transparent) 0%, color-mix(in oklab, var(--background) 62%, transparent) 52%, transparent 100%)",
        }}
      />

      {/* Copy. The section is now a flex container rather than h-svh with an
          inner h-full column: the fold has to grow when a long Hungarian
          headline wraps to three lines on a 320px phone, and a hard viewport
          height clipped it. */}
      {/* No padding of its own: the section owns it now, so the two cannot
          compound and squeeze the column at the width where it is tightest. */}
      <div className="relative z-20 mx-auto w-full max-w-6xl pt-28 pb-20 text-center">
        <div className="relative mx-auto max-w-3xl">
          {/*
            The headline is the h1 now, and the signature has become the
            byline underneath it.

            It used to be the other way round: the man's name was set as the
            hero in a hand-drawn script, and the only sentence saying what he
            SELLS was the third thing on the page in muted grey. A visiting
            business does not arrive knowing the name — the headline has to
            carry the offer, and the signature is worth more as the mark under
            it than as the pitch itself.

            Sized against the FONT rather than guessed. In Bodoni at 500,
            "vállalkozásod" is the widest word here and the clamp floor is set
            so it fits a 320px phone's 272px content box with margin; the 5rem
            ceiling is reached at ~1138px, where the copy column is max-w-3xl
            (768px) and still holds it on one line.

            `text-wrap: pretty` rather than the global `balance`: measured on
            this copy, balance picks a WORSE break here — it hangs the article
            "a" and widens the longest line — while pretty does the
            last-line-orphan job the copy actually needs. The opt-out is
            deliberately local; balance stays the default everywhere else.

            hyphens:auto is the net for the next long compound. Hungarian is
            agglutinative and this will recur.
          */}
          <h1
            style={step(0)}
            className="font-display text-[clamp(1.7rem,0.45rem_+_6.4vw,5rem)] font-medium leading-[1.05] text-foreground [hyphens:auto] [text-wrap:pretty]"
          >
            Vidd feljebb a vállalkozásod
          </h1>

          {/*
            Steps down with the headline. At 320px an 18px subline against a
            27.7px hero is a 1.54 ratio — too flat to read as hierarchy — so
            the body starts at 16px and climbs to 20px, keeping the interval
            near 1.75x or better at every width.

            The copy it replaced was four unbacked quality adjectives —
            "prémium", "egyedi", "kézműves" — telling the reader the site is
            good, on a site whose own design principle is "show, don't tell".
            This names three real functional modules in three real trades, and
            lands the third in second person so the list turns toward the
            reader instead of staying a catalogue.
          */}
          <p
            style={step(1)}
            className="mx-auto mt-7 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl"
          >
            Foglalási naptár a fodrászatnak, készletkezelő a boltnak,
            szerkesztőfelület a blogodnak. Megtervezve és megépítve, egy
            embertől.
          </p>
        </div>

        <div style={step(2)} className="relative z-20 mt-10">
          {/* The signature, demoted to a byline. It is still the hand-drawn
              mark — the sr-only name carries the text, the SVG carries none —
              but at a size where it signs the claim above rather than
              replacing it. */}
          <p className="flex flex-col items-center gap-1">
            <span className="sr-only">Szalai Bence</span>
            <span aria-hidden="true">
              <Signature
                text="Szalai Bence"
                color="var(--ember)"
                fontSize={34}
                delay={0.5}
                /*
                  Negative margin on the TOP only. Signature's glyph box is
                  ~3x the font size and most of that is air, so pulling it up
                  under the subline costs nothing — but the descenders of
                  "Szalai Bence" run to within ~12px of the box floor, and a
                  symmetric -my-4 dragged the mono byline straight through
                  them. Measured at 1440px: the SVG box ended at y 633.7 and
                  the byline started at 621.7.
                */
                className="-mt-5 h-auto max-w-full"
              />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Full-stack webfejlesztő
            </span>
          </p>

          {/* ONE CTA. The ghost "Ismerj meg közelebbről" is gone deliberately:
              the fold asks exactly one question, and a second button of equal
              size splits the only decision this section wants. Rólam is still
              one click away in the rail nav, so no path is lost. */}
          <div className="mt-7 flex justify-center">
            <Link
              href="#contact"
              className="focus-ember inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110"
            >
              Beszéljünk a projektedről
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-6 z-20 flex justify-center"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground/70">
          Görgess
        </span>
      </div>
    </section>
  );
}
