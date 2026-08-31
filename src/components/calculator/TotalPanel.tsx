"use client";

import { useEffect, useRef, useState } from "react";
import type { Estimate } from "@/lib/pricing";
import { formatHUF, formatMonthly } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/*
  The running estimate. The only RAISED surface on the page and the only filled
  button — every one of the nineteen option rows is a hairline-ruled row with
  no chrome at all, so this panel is the one thing the eye lands on. That
  scarcity is the whole treatment; giving the rows cards too would spend it.

  ── On the advisory not being amber ──────────────────────────────────────
  A flight display would render this in amber, and there is no amber token in
  this palette on purpose. The identity is a single oxblood hue (~25°) on
  charcoal, and an amber caution colour would be the one accent on the site
  that belongs to no family — "luxury through cohesion" is exactly the
  principle a second accent breaks. So the advisory is built structurally
  instead — inset, ruled, glyphed and actionable — and its urgency comes from
  position and the button, never from colour alone. That also satisfies WCAG
  1.4.1: the state is never signalled by hue on its own.
*/

/**
 * Counts a figure up to its new value.
 *
 * The panel is the page's single moment of motion, which is the whole reason
 * it is allowed to have one: an instrument readout settling is legible as
 * feedback, whereas the same animation applied to nineteen rows would be
 * noise. Rounded to the nearest 100 mid-flight so the digits read as a
 * mechanical roll rather than a slot machine.
 */
function useRolling(value: number): number {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);
  const frame = useRef(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      current.current = value;
      setDisplay(value);
      return;
    }

    const from = current.current;
    if (from === value) return;

    const started = performance.now();
    const duration = 420;

    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / duration);
      // Quintic ease-out — the same curve family as --ease-out-quint.
      const eased = 1 - (1 - p) ** 5;
      const next =
        p === 1
          ? value
          : Math.round((from + (value - from) * eased) / 100) * 100;
      current.current = next;
      setDisplay(next);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [value]);

  return display;
}

function Advisory({
  estimate,
  onResolve,
}: {
  estimate: Estimate;
  onResolve: (itemId: string) => void;
}) {
  if (estimate.advisories.length === 0) return null;

  return (
    <div className="mt-3 flex flex-col gap-2">
      {estimate.advisories.map((advisory) => (
        <div
          key={advisory.provider.id}
          className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/60 px-3 py-2.5"
        >
          <svg
            viewBox="0 0 16 16"
            className="mt-px h-3.5 w-3.5 shrink-0 text-ember"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 1.4 15 14H1L8 1.4Zm0 4.1a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 8 5.5Zm0 6.6a.85.85 0 1 0 0-1.7.85.85 0 0 0 0 1.7Z" />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="text-xs leading-snug text-foreground">
              {advisory.causes.join(", ")} — ehhez{" "}
              <strong className="font-semibold">
                {advisory.provider.name}
              </strong>{" "}
              is szükséges.
            </p>
            <button
              type="button"
              onClick={() => onResolve(advisory.provider.id)}
              className="focus-ember mt-1.5 rounded-full text-xs font-semibold text-ember underline underline-offset-4 hover:no-underline"
            >
              Hozzáadom
              {advisory.provider.price > 0 &&
                ` (+${formatHUF(advisory.provider.price)})`}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ExternalNotes({
  estimate,
  className,
}: {
  estimate: Estimate;
  className?: string;
}) {
  if (estimate.externals.length === 0) return null;

  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {estimate.externals.map((external) => (
        <li
          key={external.id}
          className="text-[0.6875rem] leading-snug text-muted-foreground"
        >
          <span className="font-semibold">{external.name}:</span>{" "}
          {external.note}
        </li>
      ))}
    </ul>
  );
}

interface Props {
  estimate: Estimate;
  onResolve: (itemId: string) => void;
  onEnquire: () => void;
  /** Set on the element the enquiry dialog morphs out of. */
  panelRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function TotalPanel({
  estimate,
  onResolve,
  onEnquire,
  panelRef,
  className,
}: Props) {
  const once = useRolling(estimate.once);
  const monthly = useRolling(estimate.monthly);
  const started = estimate.pkg !== null;

  return (
    <div
      ref={panelRef}
      className={cn(
        "rounded-2xl",
        // The dialog morphs out of this box, so it needs a stable name for the
        // view transition to pair against. It stays on THIS element, outside
        // the card: the morph pairs on geometry, and moving the name inside
        // would hand the transition a box that no longer matches the panel.
        "[view-transition-name:calc-panel]",
        className,
      )}
    >
      {/* The site's card surface, not glass: this panel sits over the plasma
          and the traveling monolith, and a translucent tier would drag the
          figure — the only number on the page — across whatever the canvas is
          doing behind it. Opaque card + gradient hairline keeps it readable at
          every scroll position. */}
      <div className="border-gradient-t relative w-full overflow-hidden rounded-2xl border border-border bg-card px-4 py-3.5 shadow-lg">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
            Becsült ár
          </span>
          {estimate.indicative && (
            <span className="text-[0.6875rem] text-muted-foreground">
              Irányár
            </span>
          )}
        </div>

        {started ? (
          <>
            {/*
            The rolling figure is aria-hidden and a settled copy is announced
            instead: a live region reading every intermediate frame of a count
            would be unusable, but silence would leave the total — the entire
            point of the page — unavailable to a screen reader.
          */}
            <p
              aria-hidden
              className="mt-1 font-display text-[clamp(1.75rem,2.5vw,2.375rem)] font-medium leading-[1.05] text-ember tabular-nums"
            >
              {formatHUF(once)}
            </p>
            <p className="sr-only" role="status">
              Becsült ár: {formatHUF(estimate.once)}
              {estimate.monthly > 0 &&
                `, valamint ${formatMonthly(estimate.monthly)}`}
              {estimate.indicative && ". Ez irányár, egyedi ajánlat alapján"}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground" aria-hidden>
              egyszeri díj
              {estimate.monthly > 0 && (
                <>
                  {" · "}
                  <span className="font-semibold text-foreground tabular-nums">
                    {formatMonthly(monthly)}
                  </span>{" "}
                  folyamatosan
                </>
              )}
            </p>

            {estimate.indicative && (
              <p className="mt-2 text-[0.6875rem] leading-snug text-foreground">
                Az egyedi weboldal pontos ára a feladattól függ — ez a szám
                kiindulópont, nem végleges ajánlat.
              </p>
            )}
          </>
        ) : (
          /*
          Not "0 Ft". A zero here reads as "this website is free", which is the
          one impression the page must never leave. The empty state names the
          next action instead.
        */
          <p className="mt-1.5 text-sm leading-snug text-foreground">
            Válassz alapcsomagot, és itt fut össze az ár.
          </p>
        )}

        <Advisory estimate={estimate} onResolve={onResolve} />

        <button
          type="button"
          onClick={onEnquire}
          disabled={!started}
          className={cn(
            "focus-ember mt-3.5 w-full cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
            started
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110"
              : "cursor-not-allowed bg-muted text-muted-foreground opacity-60",
          )}
        >
          Kérem az ajánlatot
        </button>

        <ExternalNotes
          estimate={estimate}
          // Sized so the two notes the data can actually produce today (vercel's
          // own, plus domain's registrar fee) both fit without a scrollbar;
          // anything added later scrolls rather than growing the panel into the
          // column above it.
          className="mt-3 hidden max-h-28 overflow-y-auto lg:flex"
        />
      </div>
    </div>
  );
}
