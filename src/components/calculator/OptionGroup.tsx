"use client";

import type { PricingItem, PricingSection } from "@/lib/pricing";
import {
  choices,
  formatHUF,
  PER_UNIT_ID,
  PER_UNIT_MAX,
  type Selection,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

/*
  A group of choices, rendered as ruled rows.

  No cards, no fills, no icons. The section is a run of hairline-separated
  rows with the price flush right, which is the same instrument-readout
  vocabulary the AltitudeRail already speaks — and, more practically, the only
  treatment dense enough to put nineteen controls on one screen without the
  page turning into a wall of boxes. Selection is carried by the control, the
  label's weight and the price's colour; never by a coloured edge.

  Every row is a real <input>, visually hidden and styled through a sibling
  span. Radio groups are wrapped in <fieldset>/<legend> so the section name is
  announced as the group's label rather than being a floating heading a screen
  reader has to infer a relationship to.

  The detail trigger is a sibling of the <label>, never a child of it: a button
  inside a label is both invalid and behaviourally broken (the click toggles
  the control it is nested in). That constraint is what shapes the row grid.
*/

interface Props {
  section: PricingSection;
  selection: Selection;
  onRadio: (sectionName: string, itemId: string) => void;
  onToggle: (itemId: string) => void;
  onQuantity: (itemId: string, quantity: number) => void;
  onDetail: (itemMeta: { item: PricingItem; anchor: HTMLElement }) => void;
  /** Ids the current configuration already covers — shown, not billed. */
  covered: Set<string>;
  /** Ids flagged by an advisory as missing a requirement. */
  flagged: Set<string>;
  /** The lead group carries more weight: it is the decision the total hangs on. */
  emphasis?: boolean;
  className?: string;
}

function Tick({ kind, on }: { kind: "radio" | "checkbox"; on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-[0.15em] grid h-4 w-4 shrink-0 place-items-center border transition-all duration-200",
        kind === "radio" ? "rounded-full" : "rounded-[0.25rem]",
        // --primary is the oxblood fill, solved to carry --primary-foreground
        // on top; --ember is the same hue solved as INK and is what the price
        // beside it uses. Fill and ink are deliberately different tokens — an
        // ember-filled tick is too light to hold the check mark.
        on
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-background/50",
      )}
    >
      {on &&
        (kind === "radio" ? (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        ) : (
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
            <title>Kiválasztva</title>
            <path
              d="M2 6.5L4.5 9L10 3"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
    </span>
  );
}

/** The circled glyph that opens an item's full description. */
function DetailTrigger({
  item,
  onDetail,
}: {
  item: PricingItem;
  onDetail: Props["onDetail"];
}) {
  return (
    <button
      type="button"
      // Transparent until hovered, but never removed from the tab order —
      // keyboard users reach it exactly where sighted users see it.
      className="focus-ember -my-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 hover:text-ember focus-visible:opacity-100"
      onClick={(e) => onDetail({ item, anchor: e.currentTarget })}
      aria-label={`${item.name} — részletek`}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
        <circle
          cx="8"
          cy="8"
          r="6.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M8 7v4.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="4.9" r="0.85" fill="currentColor" />
      </svg>
    </button>
  );
}

/** Language count for the one per-unit item in the data. */
function Quantity({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  const step = (delta: number) =>
    onChange(Math.max(1, Math.min(PER_UNIT_MAX, value + delta)));

  return (
    <div className="col-start-2 mt-1.5 mb-1 flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Nyelvek száma</span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={value <= 1}
          aria-label="Egy nyelvvel kevesebb"
          className="focus-ember grid h-5 w-5 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-primary disabled:opacity-35"
        >
          <svg viewBox="0 0 10 10" className="h-2 w-2" aria-hidden>
            <path d="M1 5h8" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
        <span
          aria-live="polite"
          className="w-5 text-center text-xs font-semibold tabular-nums text-foreground"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={value >= PER_UNIT_MAX}
          aria-label="Egy nyelvvel több"
          className="focus-ember grid h-5 w-5 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-primary disabled:opacity-35"
        >
          <svg viewBox="0 0 10 10" className="h-2 w-2" aria-hidden>
            <path d="M1 5h8M5 1v8" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function OptionGroup({
  section,
  selection,
  onRadio,
  onToggle,
  onQuantity,
  onDetail,
  covered,
  flagged,
  emphasis = false,
  className,
}: Props) {
  const items = choices(section);
  const isRadio = section.type === "select";
  const chosen = selection.radios[section.name];

  const rows = items.map((entry) => {
    const on = isRadio
      ? chosen === entry.id
      : Boolean(selection.checks[entry.id]);
    const isCovered = on && covered.has(entry.id);
    const quantity = selection.quantities[entry.id] ?? 1;

    // The "Egyedi weboldal" package is a request for a personalised quote, so
    // its figure is a floor, not a price. Saying "-tól" is the difference
    // between an estimate and a promise the site cannot keep.
    const priceLabel = isCovered
      ? "Csomag része"
      : entry.id === "custom"
        ? `${formatHUF(entry.price)}-tól`
        : entry.price === 0 && entry.monthly
          ? `${formatHUF(entry.monthly)}/hó`
          : entry.price === 0
            ? "Ingyenes"
            : formatHUF(
                entry.price * (entry.id === PER_UNIT_ID ? quantity : 1),
              );

    return (
      <li
        key={entry.id}
        className={cn(
          // `calc-row` is the hook for the focus ring, which is declared in
          // PriceCalculator's own <style> rather than as a Tailwind variant —
          // see the note there.
          "calc-row group/row relative grid grid-cols-[auto_1fr_auto_auto] items-start gap-x-2.5 border-t border-border/70 transition-colors",
          "hover:bg-primary/5",
          emphasis ? "py-2.5" : "py-2",
        )}
      >
        <label
          className={cn(
            "col-span-2 grid cursor-pointer grid-cols-subgrid items-start gap-x-2.5",
          )}
        >
          <input
            type={isRadio ? "radio" : "checkbox"}
            name={isRadio ? `calc-${section.name}` : undefined}
            checked={on}
            onChange={() =>
              isRadio ? onRadio(section.name, entry.id) : onToggle(entry.id)
            }
            className="peer sr-only"
          />
          <Tick kind={isRadio ? "radio" : "checkbox"} on={on} />
          <span
            className={cn(
              "text-[0.8125rem] leading-snug transition-colors",
              emphasis && "text-sm",
              on ? "font-semibold text-foreground" : "text-foreground/90",
            )}
          >
            {entry.name}
            {flagged.has(entry.id) && (
              <span
                className="ml-1.5 align-middle text-ember"
                title="Ehhez még hiányzik valami"
                aria-label="Ehhez még hiányzik egy szükséges tétel"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="inline h-3 w-3"
                  aria-hidden
                  fill="currentColor"
                >
                  <path d="M8 1.4 15 14H1L8 1.4Zm0 4.1a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 8 5.5Zm0 6.6a.85.85 0 1 0 0-1.7.85.85 0 0 0 0 1.7Z" />
                </svg>
              </span>
            )}
          </span>
        </label>

        <span
          className={cn(
            "justify-self-end pt-px text-[0.8125rem] tabular-nums transition-colors",
            isCovered
              ? "text-muted-foreground italic"
              : on
                ? "font-semibold text-ember"
                : "text-muted-foreground",
          )}
        >
          {priceLabel}
        </span>

        <DetailTrigger item={entry} onDetail={onDetail} />

        {entry.id === PER_UNIT_ID && on && (
          <Quantity
            value={quantity}
            onChange={(next) => onQuantity(entry.id, next)}
          />
        )}
      </li>
    );
  });

  const heading = (
    <span
      className={cn(
        "block font-semibold text-foreground",
        emphasis ? "text-[0.9375rem]" : "text-[0.8125rem]",
      )}
    >
      {section.name}
    </span>
  );

  const body = <ul className="mt-1.5 border-b border-border/70">{rows}</ul>;

  /*
    Radios get a real fieldset so the group name is the accessible label for
    every option inside it. Checkbox groups do not: their items are
    independent, and wrapping them would assert a mutual exclusivity that does
    not exist. The heading is a plain heading there.
  */
  return isRadio ? (
    <fieldset className={className}>
      <legend className="w-full">{heading}</legend>
      {body}
    </fieldset>
  ) : (
    <div className={className}>
      {heading}
      {body}
    </div>
  );
}
