"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import OptionGroup from "@/components/calculator/OptionGroup";
import TotalPanel, { ExternalNotes } from "@/components/calculator/TotalPanel";
import OfferWizard, { type OfferPrefill } from "@/components/OfferWizard";
import {
  baseItems,
  estimate as computeEstimate,
  emptySelection,
  item as findItem,
  formatHUF,
  formatMonthly,
  PER_UNIT_MAX,
  type PricingItem,
  SECTION,
  type Selection,
  section,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

/*
  ══ ÁRKALKULÁTOR ══════════════════════════════════════════════════════════
  One screen, no page scroll, total bottom-right.

  ── Why the shell is a grid and not a column-wrap flex container ──────────
  `flex-flow: column wrap` is the obvious answer to "fill a fixed height, then
  start a new column", and it was the first thing tried here. It fails on this
  data for a reason worth recording: column wrap is GREEDY. It packs column one
  to the container's full height before starting column two, so the number of
  columns is a function of content height divided by viewport height. The six
  groups come to roughly 1 300px of content against ~760px of usable height,
  which wraps into two columns and leaves the third empty — and the total panel
  lands at the foot of column two, which is the middle of the page, not the
  bottom right.

  A three-column grid with each group placed deliberately gives the balance
  column-wrap cannot: the columns are declared, not derived, so they cannot
  collapse to two on a short viewport or spill to four on a long word. Each
  column is then itself a flex column, which is what lets the panel take
  `margin-top: auto` and sit flush with the bottom of the screen regardless of
  how much sits above it. Grid for the two-dimensional problem, flex for the
  one-dimensional one — which is the rule, not a compromise.

  Flex-wrap does the job it is actually good at: the always-included strip in
  the header, where a variable number of short chips should flow and rewrap.

  ── Below lg ─────────────────────────────────────────────────────────────
  The viewport lock is released entirely. A configurator pinned to 100dvh on a
  phone is a trap — nineteen controls in 600px means everything is 20px tall —
  so it becomes an ordinary scrolling stack, and a compact bar carries the
  total until the real panel scrolls into view.
*/

const GROUPS = {
  packages: section(SECTION.PACKAGES),
  hosting: section(SECTION.HOSTING),
  design: section(SECTION.DESIGN),
  security: section(SECTION.SECURITY),
  analytics: section(SECTION.ANALYTICS),
  extra: section(SECTION.EXTRA),
};

/*
  Mapping the configuration onto the wizard's own vocabulary.

  The wizard asks three qualitative questions the calculator has already
  answered precisely. Rather than showing the visitor a vaguer version of what
  they just built, the hand-off translates: package to project type, add-ons to
  feature flags, total to budget band. The translation is lossy in one
  direction only — the exact configuration still travels verbatim in
  `lines`, so nothing is actually thrown away.
*/
const PROJECT_TYPE_BY_PACKAGE: Record<string, string> = {
  landing: "landing",
  cms: "showcase",
  booking: "webapp",
  custom: "unsure",
};

const FEATURE_BY_ITEM: Record<string, string> = {
  cms: "cms",
  booking: "booking",
  multilingual: "i18n",
  "design-3d": "motion",
  "analytics-google": "seo",
  "tag-manager": "seo",
};

function budgetBand(total: number): string {
  if (total < 300_000) return "under-300k";
  if (total < 800_000) return "300k-800k";
  if (total < 2_000_000) return "800k-2m";
  return "over-2m";
}

// ============================================================================
// Detail popover
// ============================================================================

interface DetailTarget {
  item: PricingItem;
  anchor: HTMLElement;
}

/*
  One shared popover rather than nineteen.

  It has to be the native Popover API specifically: the grid columns are
  fixed-height and scroll internally, so an absolutely-positioned panel would
  be clipped by its own column. A popover renders in the top layer, outside
  every ancestor's overflow and stacking context, and brings light-dismiss and
  Escape with it for free.

  Positioning is computed on open rather than declared with CSS anchor
  positioning, which is still Chromium-only — this has to work in Safari and
  Firefox today.
*/
function DetailPopover({
  target,
  onClose,
}: {
  target: DetailTarget | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!target) {
      if (node.matches(":popover-open")) node.hidePopover();
      return;
    }

    const rect = target.anchor.getBoundingClientRect();
    const width = 320;
    const margin = 12;

    // Prefer the right of the trigger; flip left when it would leave the
    // viewport. Vertically centred on the trigger, then clamped so a row near
    // either edge of the screen still shows the whole panel.
    const wantsLeft = rect.right + margin + width > window.innerWidth;
    const left = wantsLeft
      ? Math.max(margin, rect.left - width - margin)
      : rect.right + margin;

    node.style.width = `${width}px`;
    node.style.left = `${left}px`;
    // Height is unknown until it renders, so open first and correct after.
    node.style.top = "0px";
    node.showPopover();
    const height = node.getBoundingClientRect().height;
    const top = Math.max(
      margin,
      Math.min(
        window.innerHeight - height - margin,
        rect.top + rect.height / 2 - height / 2,
      ),
    );
    node.style.top = `${top}px`;
    setPos({ top, left });
  }, [target]);

  const detail = target?.item;

  return (
    <div
      ref={ref}
      popover="auto"
      // Light dismiss and Escape both fire this; keeping React's state in step
      // with the platform's is what stops a second click on the same trigger
      // from reopening a popover the browser considers already open.
      onToggle={(e) => {
        if ((e as unknown as { newState: string }).newState === "closed") {
          onClose();
        }
      }}
      className="calc-detail rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-2xl"
      style={pos ? undefined : { visibility: "hidden" }}
    >
      {detail && (
        <>
          <p className="text-sm font-semibold text-foreground">{detail.name}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground">
            {detail.description}
          </p>
          {detail.note && (
            <p className="mt-2 border-t border-border pt-2 text-xs leading-relaxed text-muted-foreground">
              {detail.note}
            </p>
          )}
          <p className="mt-2.5 border-t border-border pt-2 text-xs font-semibold text-ember tabular-nums">
            {detail.price > 0 ? formatHUF(detail.price) : "Ingyenes"}
            {detail.currency ? ` · ${detail.currency}` : ""}
            {detail.monthly ? ` · ${formatMonthly(detail.monthly)}` : ""}
          </p>
        </>
      )}
    </div>
  );
}

// ============================================================================
// Enquiry dialog
// ============================================================================

/*
  The panel becomes the dialog.

  components/ui/MorphingDialog does this already, but its trigger wraps its
  children in a role="button" div — which would make the entire price panel,
  footnotes and advisory button included, one giant clickable control with
  nested interactive elements inside it. Here the SOURCE of the morph (the
  panel) and the TRIGGER (the CTA inside it) have to be different elements, so
  the transition is driven directly. It is the same technique, ~20 lines of it.

  startViewTransition is progressive: without support, or under reduced motion,
  the callback simply runs and the dialog opens with no animation.
*/
function morph(run: () => void) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (
    typeof document === "undefined" ||
    !document.startViewTransition ||
    reduced
  ) {
    run();
    return;
  }
  document.startViewTransition(run);
}

function EnquiryDialog({
  open,
  prefill,
  onClose,
}: {
  open: boolean;
  prefill: OfferPrefill;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        morph(onClose);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) morph(onClose);
      }}
      className="calc-dialog m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-lg overflow-visible border-none bg-transparent p-0 backdrop:bg-[oklch(0.08_0.01_25_/_0.7)] backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="relative">
          {/*
            Outside the panel's top-right corner, not inside it: the wizard's
            own header puts its "Ajánlatkérés" label hard against the right
            edge at that exact height, and a close button laid over it made
            both unreadable. Sitting proud of the corner also keeps it clear of
            the scroll container, which would otherwise clip it.
          */}
          <button
            type="button"
            onClick={() => morph(onClose)}
            aria-label="Bezárás"
            className="focus-ember absolute -top-3 -right-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground shadow-lg transition-colors hover:border-ember hover:text-ember"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
            <OfferWizard
              prefill={prefill}
              className="border-0 bg-transparent"
            />
          </div>
        </div>
      )}
    </dialog>
  );
}

// ============================================================================
// Page-scoped CSS
// ============================================================================

/*
  Three things Tailwind cannot express: the UA's default popover box, the
  view-transition pairing name on the dialog, and the popover's entrance.
  React 19 hoists and dedupes this <style>.
*/
const calculatorCss = `
.calc-detail {
  position: fixed;
  inset: auto;
  margin: 0;
  border: 0;
  overflow: visible;
}
.calc-detail:popover-open {
  animation: calc-detail-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes calc-detail-in {
  from { opacity: 0; transform: translateY(4px) scale(0.985); }
  to   { opacity: 1; transform: none; }
}
.calc-dialog[open] { view-transition-name: calc-panel; }

/* The option rows' focus ring lives in globals.css, unlayered — it has to
   outrank the universal outline rule in @layer base, which a rule declared
   from this element cannot. See the note there. */

@media (prefers-reduced-motion: reduce) {
  .calc-detail:popover-open { animation: none; }
  .calc-dialog[open] { view-transition-name: none; }
}
`;

// ============================================================================
// Calculator
// ============================================================================

export default function PriceCalculator() {
  const [selection, setSelection] = useState<Selection>(emptySelection);
  const [detail, setDetail] = useState<DetailTarget | null>(null);
  const [enquiring, setEnquiring] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelSeen, setPanelSeen] = useState(true);

  const estimate = useMemo(() => computeEstimate(selection), [selection]);

  const covered = useMemo(
    () => new Set(estimate.lines.filter((l) => l.coveredBy).map((l) => l.id)),
    [estimate],
  );

  const flagged = useMemo(
    () => new Set(estimate.advisories.flatMap((a) => a.causeIds)),
    [estimate],
  );

  const onRadio = useCallback((sectionName: string, itemId: string) => {
    setSelection((s) => ({
      ...s,
      // Re-selecting the current choice clears it. Radio groups here are all
      // optional — there is no "none of these" row to go back to, and a
      // visitor who ticked "3D grafika" to see the price must be able to
      // un-tick it without reloading the page.
      radios:
        s.radios[sectionName] === itemId
          ? Object.fromEntries(
              Object.entries(s.radios).filter(([k]) => k !== sectionName),
            )
          : { ...s.radios, [sectionName]: itemId },
    }));
  }, []);

  const onToggle = useCallback((itemId: string) => {
    setSelection((s) => ({
      ...s,
      checks: { ...s.checks, [itemId]: !s.checks[itemId] },
    }));
  }, []);

  const onQuantity = useCallback((itemId: string, quantity: number) => {
    setSelection((s) => ({
      ...s,
      quantities: {
        ...s.quantities,
        [itemId]: Math.max(1, Math.min(PER_UNIT_MAX, quantity)),
      },
    }));
  }, []);

  /** "Hozzáadom" on an advisory: tick the missing provider wherever it lives. */
  const onResolve = useCallback((itemId: string) => {
    const target = findItem(itemId);
    if (!target) return;
    const owner = [
      GROUPS.packages,
      GROUPS.hosting,
      GROUPS.design,
      GROUPS.security,
      GROUPS.analytics,
      GROUPS.extra,
    ].find((s) => s.items.some((i) => i.id === itemId));
    if (!owner) return;

    setSelection((s) =>
      owner.type === "select"
        ? { ...s, radios: { ...s.radios, [owner.name]: itemId } }
        : { ...s, checks: { ...s.checks, [itemId]: true } },
    );
  }, []);

  // Mobile only: show the compact bar while the real panel is off screen.
  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setPanelSeen(entry.isIntersecting),
      { rootMargin: "0px 0px -72px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const prefill: OfferPrefill = useMemo(() => {
    const lines = [
      ...(estimate.pkg
        ? [
            {
              label: "Alapcsomag",
              value: `${estimate.pkg.name} — ${formatHUF(estimate.pkg.price)}${
                estimate.indicative ? "-tól" : ""
              }`,
            },
          ]
        : []),
      ...estimate.lines
        .filter((l) => l.id !== estimate.pkg?.id)
        .map((l) => ({
          label: l.name,
          value: l.coveredBy
            ? `a(z) ${l.coveredBy} része`
            : [
                l.quantity > 1 ? `${l.quantity} nyelv · ` : "",
                l.once > 0 ? formatHUF(l.once) : "0 Ft",
                l.monthly > 0 ? ` + ${formatMonthly(l.monthly)}` : "",
              ].join(""),
        })),
      /*
        Advisories never block the CTA — losing a lead over an unticked
        database would be the wrong trade — but an enquiry that quietly omits
        a known-missing requirement would reach Bence as an internally
        inconsistent quote. Sending it along means the first reply can correct
        the figure instead of discovering the gap halfway through the project.
      */
      ...estimate.advisories.map((a) => ({
        label: "Még egyeztetendő",
        value: `${a.provider.name} (${a.causes.join(", ")} miatt) — nincs az árban`,
      })),
    ];

    return {
      projectType: estimate.pkg
        ? (PROJECT_TYPE_BY_PACKAGE[estimate.pkg.id] ?? "unsure")
        : "unsure",
      features: [
        ...new Set(
          estimate.lines
            .map((l) => FEATURE_BY_ITEM[l.id])
            .filter((f): f is string => Boolean(f)),
        ),
      ],
      budget: budgetBand(estimate.once),
      lines,
      total: [
        `${formatHUF(estimate.once)} egyszeri`,
        estimate.monthly > 0 ? formatMonthly(estimate.monthly) : null,
      ]
        .filter(Boolean)
        .join(" · "),
      indicative: estimate.indicative,
    };
  }, [estimate]);

  const groupProps = {
    selection,
    onRadio,
    onToggle,
    onQuantity,
    onDetail: setDetail,
    covered,
    flagged,
  };

  return (
    <>
      <style href="calculator" precedence="medium">
        {calculatorCss}
      </style>

      <main
        className={cn(
          "relative w-full px-4 pb-28 pt-24 md:px-10 lg:pb-0 lg:pt-0",
          // The viewport lock, desktop only. min-h-0 on the grid below is what
          // lets the columns actually respect it instead of growing past it.
          "lg:flex lg:h-[100dvh] lg:flex-col lg:overflow-hidden lg:px-14 xl:px-20",
          // The section rail owns the left edge; nothing owns the right, so
          // the trailing gutter is symmetry rather than clearance.
          "lg:pr-14 xl:pr-20",
        )}
        style={{ zIndex: "var(--z-content)" }}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="mx-auto w-full max-w-[1600px] shrink-0 lg:pt-[4.5rem]">
          <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-[clamp(1.875rem,3.4vw,3rem)] font-medium leading-[1.05] text-foreground">
                Mennyibe kerül az oldalad?
              </h1>
              <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-foreground md:text-base">
                Állítsd össze, mire van szükséged — az ár menet közben fut
                össze. Ez becslés, nem szerződés: a végleges ajánlat mindig a
                konkrét feladatra készül.
              </p>
            </div>

            {/*
              The always-included strip. These seven items are `base: true` in
              the data — always on, always 0 Ft — so they are facts, not
              controls. A checkbox nobody can uncheck is a lie about agency,
              and pulling them out of the grid is what buys back the room that
              makes one screen possible at all.

              This is where flex-wrap genuinely belongs: a variable number of
              short chips that should flow and rewrap on their own.
            */}
            <div className="lg:max-w-[38rem] lg:shrink-0">
              <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                Minden csomagban benne van
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5">
                {baseItems.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1 text-[0.6875rem] leading-none text-foreground"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5 shrink-0 text-ember"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 6.5L4.5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {entry.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        {/* ── The three columns ───────────────────────────────────────── */}
        <div
          className={cn(
            "mx-auto mt-8 grid w-full max-w-[1600px] grid-cols-1 gap-x-10 gap-y-8",
            "lg:mt-7 lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:gap-y-0 lg:pb-6",
          )}
        >
          {/* Column 1 — the decision the total is a function of. */}
          <div className="flex flex-col gap-7 lg:min-h-0 lg:gap-8 lg:overflow-y-auto lg:pr-1">
            <OptionGroup section={GROUPS.packages} emphasis {...groupProps} />
            <OptionGroup section={GROUPS.design} {...groupProps} />
          </div>

          {/* Column 2 — infrastructure and access. */}
          <div className="flex flex-col gap-7 lg:min-h-0 lg:gap-8 lg:overflow-y-auto lg:pr-1">
            <OptionGroup section={GROUPS.hosting} {...groupProps} />
            <OptionGroup section={GROUPS.security} {...groupProps} />
            <OptionGroup section={GROUPS.analytics} {...groupProps} />
          </div>

          {/* Column 3 — extras, then the total pinned to the floor. */}
          <div className="flex flex-col gap-7 lg:min-h-0 lg:gap-8">
            <OptionGroup
              section={GROUPS.extra}
              {...groupProps}
              className="lg:min-h-0 lg:overflow-y-auto lg:pr-1"
            />
            <TotalPanel
              estimate={estimate}
              onResolve={onResolve}
              onEnquire={() => morph(() => setEnquiring(true))}
              panelRef={panelRef}
              className={cn(
                // mt-auto is the whole trick: however much sits above it, the
                // panel is flush with the bottom of the viewport.
                "lg:mt-auto lg:shrink-0",
                // A view-transition name has to be unique among rendered
                // elements. The panel and the open dialog both claim
                // `calc-panel` — that IS the morph — so the panel has to stop
                // being captured the moment the dialog takes the name over,
                // or the browser finds a duplicate and silently downgrades the
                // whole thing to a cross-fade. visibility:hidden removes it
                // from capture while keeping its box, so the layout under the
                // dialog does not shift.
                enquiring && "invisible",
              )}
            />
            {/* Desktop keeps these inside the panel; the stack shows them at
                the end of the page, where there is room to read them. */}
            <ExternalNotes estimate={estimate} className="lg:hidden" />
          </div>
        </div>
      </main>

      {/* ── Mobile: the total follows you until the real panel arrives ── */}
      <div
        aria-hidden={panelSeen}
        className="fixed inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-3 lg:hidden"
        /*
          Opacity, transform and pointer-events are set inline rather than
          through `opacity-0` / `opacity-100` utilities on purpose.

          Tailwind v4 generates utilities from scanned SOURCE, and globals.css
          already documents this project getting burned by exactly that: the
          `opacity-0` a dependency relied on was never emitted, so an
          "invisible" layer shipped fully opaque. Measuring this element found
          no matching opacity rule either. An inline style cannot be
          tree-shaken, so the bar's visibility does not depend on whether a
          utility name happens to survive the build.

          The fill is fully opaque. This bar floats over whatever row happens
          to be behind it, so its legibility cannot rest on a backdrop-filter
          or on a few percent of transparency.
        */
        style={{
          zIndex: "var(--z-rail)",
          background: "var(--card)",
          boxShadow: "var(--shadow-xl)",
          opacity: panelSeen ? 0 : 1,
          transform: panelSeen ? "translateY(0.75rem)" : "none",
          pointerEvents: panelSeen ? "none" : "auto",
          transition:
            "opacity 300ms var(--ease-out-quint), transform 300ms var(--ease-out-quint)",
        }}
      >
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.5625rem] tracking-[0.18em] text-muted-foreground uppercase">
            {estimate.indicative ? "Irányár" : "Becsült ár"}
          </p>
          {/*
            The two figures stack rather than sharing a line: side by side they
            overflowed a 375px viewport by a couple of pixels and truncated the
            monthly fee mid-word, which is the one number a visitor is most
            likely to misread.
          */}
          <p className="text-base leading-tight font-semibold text-ember tabular-nums">
            {estimate.pkg ? formatHUF(estimate.once) : "—"}
          </p>
          {estimate.monthly > 0 && (
            <p className="text-[0.6875rem] leading-tight font-medium text-muted-foreground tabular-nums">
              + {formatMonthly(estimate.monthly)}
            </p>
          )}
        </div>
        <button
          type="button"
          disabled={!estimate.pkg}
          onClick={() => panelRef.current?.scrollIntoView({ block: "center" })}
          className="focus-ember shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50"
        >
          Összesítés
        </button>
      </div>

      <DetailPopover target={detail} onClose={() => setDetail(null)} />
      <EnquiryDialog
        open={enquiring}
        prefill={prefill}
        onClose={() => setEnquiring(false)}
      />
    </>
  );
}
