/**
 * pricing — the estimate engine behind /kalkulator.
 *
 * Deliberately pure and UI-free: it takes `src/pricing.json` plus a selection
 * and returns an Estimate. Nothing here touches React, so the arithmetic that
 * decides what a visitor is quoted can be reasoned about (and corrected) on
 * its own terms. The component layer only renders what comes out.
 *
 * Three facts about the data drive almost every decision below.
 *
 * 1. SEVEN OF THE 26 ITEMS ARE NOT CHOICES. Everything flagged `base: true`
 *    — the four in "Alapvető szolgáltatások", plus ssl, vercel and
 *    vercel-analytics — is always on and always 0 Ft. Rendering them as
 *    checkboxes nobody can uncheck would be a lie about agency, so they are
 *    split out as facts and never priced. That leaves 19 real controls.
 *
 * 2. EVERY LIVE REQUIREMENT RESOLVES TO ONE ITEM. `ssl → vercel` can never
 *    fire (vercel is base, so it is always provided). `cms → backend`,
 *    `booking → backend` and all three `auth-* → postgres` resolve, through
 *    `dependencies[].provided_by`, to the same missing item: backend. So the
 *    UI needs exactly one advisory shape, not five.
 *
 * 3. ONE COMBINATION WOULD DOUBLE-BILL. `booking.includes` contains
 *    `auth-google`, which is separately priced at 25 000 Ft. Ticking both must
 *    charge once. `coveredBy` below is what stops it.
 */

import raw from "@/pricing.json";

// ============================================================================
// Shape of the data
// ============================================================================

export type SectionType = "selected" | "select" | "checkbox";

export interface PricingItem {
  id: string;
  name: string;
  description: string;
  /** One-time fee in HUF. */
  price: number;
  /** Recurring fee in HUF per month, when the item has one. */
  monthly?: number;
  /** Always included, never priced, never a control. */
  base?: boolean;
  /** A cost or caveat that lands outside this estimate. */
  note?: string;
  /** Non-default unit, e.g. "Ft/nyelv" — the item is priced per quantity. */
  currency?: string;
  /** Dependency or item ids this item cannot work without. */
  needs: string[];
  /** Dependency or item ids this item already provides. */
  includes: string[];
}

export interface PricingSection {
  name: string;
  type: SectionType;
  description: string;
  items: PricingItem[];
}

export interface Dependency {
  name: string;
  name_hu: string;
  description: string;
  /** The item id that satisfies this dependency. */
  provided_by: string;
}

export interface ValidationRule {
  rule: string;
  rule_hu: string;
  if_selected: string | string[];
  requires: string[];
}

interface PricingData {
  sections: PricingSection[];
  dependencies: Record<string, Dependency>;
  validation_rules: ValidationRule[];
}

export const pricing = raw as unknown as PricingData;

// ============================================================================
// Named sections
// ============================================================================

/**
 * The layout places each section in a specific column, so it has to be able to
 * name them. Keyed by the section's own `name` because that is what the data
 * actually guarantees to be unique — there are no ids on sections.
 *
 * `section()` throws rather than returning undefined: a rename in pricing.json
 * should fail loudly at first render, not silently drop a whole column of the
 * calculator into the void.
 */
export const SECTION = {
  BASE: "Alapvető szolgáltatások",
  PACKAGES: "Alapcsomagok",
  HOSTING: "Tárhely és domain",
  DESIGN: "Dizájn",
  SECURITY: "Biztonság",
  ANALYTICS: "Analitika és marketing",
  EXTRA: "További szolgáltatások",
} as const;

export function section(name: string): PricingSection {
  const found = pricing.sections.find((s) => s.name === name);
  if (!found) {
    throw new Error(
      `pricing.json has no section named "${name}". SECTION in lib/pricing.ts is out of sync with the data.`,
    );
  }
  return found;
}

/** Every item, flattened, in source order. */
export const allItems: PricingItem[] = pricing.sections.flatMap((s) => s.items);

const byId = new Map(allItems.map((item) => [item.id, item]));

export function item(id: string): PricingItem | undefined {
  return byId.get(id);
}

/** The always-on facts. Rendered once as a strip; never priced, never a control. */
export const baseItems: PricingItem[] = allItems.filter((i) => i.base);

/** The items a visitor can actually choose — 19 of them. */
export function choices(s: PricingSection): PricingItem[] {
  return s.items.filter((i) => !i.base);
}

/** Priced per unit rather than per project, so it needs a quantity control. */
export const PER_UNIT_ID = "multilingual";
export const PER_UNIT_MAX = 8;

/**
 * Real money the visitor will spend that this estimate does not collect.
 *
 * `vercel` states its own caveat in a `note` field, so it is read from the
 * data. `domain` states its 2 000–10 000 Ft/év registrar fee inside its prose
 * `description`, where the panel cannot surface it as a discrete line — and
 * quietly dropping a recurring third-party cost from a page whose entire job
 * is to be trusted with a number is not an option. Declared here rather than
 * patched into pricing.json so the supplied data stays untouched.
 */
const EXTRA_EXTERNAL_NOTES: Record<string, string> = {
  domain:
    "A domain regisztrációs díja nem szerepel az árban: általában 2 000–10 000 Ft/év, közvetlenül a regisztrátornak.",
};

// ============================================================================
// Selection
// ============================================================================

export interface Selection {
  /** Section name → chosen item id, for `type: "select"` sections. */
  radios: Record<string, string>;
  /** Item id → chosen, for `type: "checkbox"` sections. */
  checks: Record<string, boolean>;
  /** Item id → quantity, for per-unit items. */
  quantities: Record<string, number>;
}

export const emptySelection: Selection = {
  radios: {},
  checks: {},
  quantities: {},
};

// ============================================================================
// Estimate
// ============================================================================

export interface LineItem {
  id: string;
  name: string;
  /** One-time cost actually charged, after coverage and quantity. */
  once: number;
  /** Recurring monthly cost actually charged. */
  monthly: number;
  quantity: number;
  unit?: string;
  /**
   * Already provided by something else that is selected, so it is listed at
   * 0 Ft rather than billed. Today this is only booking → auth-google, but it
   * is derived from `includes` rather than special-cased, so any future
   * overlap in the data is handled the same way.
   */
  coveredBy?: string;
}

export interface Advisory {
  /** The item that has to be added to satisfy everything currently missing. */
  provider: PricingItem;
  /** Display names of the selected items that need it. */
  causes: string[];
  /** Ids of those same items, so the rows can be flagged in place. */
  causeIds: string[];
}

export interface ExternalCost {
  id: string;
  name: string;
  note: string;
}

export interface Estimate {
  lines: LineItem[];
  /** Sum of one-time costs, HUF. */
  once: number;
  /** Sum of recurring costs, HUF per month. */
  monthly: number;
  advisories: Advisory[];
  externals: ExternalCost[];
  /** The chosen base package, or null when nothing is chosen yet. */
  pkg: PricingItem | null;
  /**
   * True when the number cannot be a firm quote — the "Egyedi weboldal"
   * package is explicitly a request for a personalised offer, so presenting
   * its 300 000 Ft as a price rather than a starting point would mislead.
   */
  indicative: boolean;
}

/** Ids selected by the visitor, in the order the sections are displayed. */
function selectedIds(selection: Selection): string[] {
  const ids: string[] = [];
  for (const s of pricing.sections) {
    if (s.type === "select") {
      const chosen = selection.radios[s.name];
      if (chosen && byId.has(chosen)) ids.push(chosen);
    } else if (s.type === "checkbox") {
      for (const i of choices(s)) {
        if (selection.checks[i.id]) ids.push(i.id);
      }
    }
  }
  return ids;
}

export function estimate(selection: Selection): Estimate {
  const chosen = selectedIds(selection);
  const chosenItems = chosen
    .map((id) => byId.get(id))
    .filter((i): i is PricingItem => i !== undefined);

  /*
    Everything the current configuration provides: the items themselves, plus
    whatever each of them `includes`. Base items are folded in because they are
    unconditionally present — that is precisely what makes `ssl → vercel` a
    rule that can never fire.
  */
  const provided = new Set<string>();
  for (const i of [...baseItems, ...chosenItems]) {
    provided.add(i.id);
    for (const inc of i.includes) provided.add(inc);
  }

  // ── lines ──────────────────────────────────────────────────────────────
  const lines: LineItem[] = chosenItems.map((i) => {
    // Who else already provides this? Itself never counts.
    const cover = [...baseItems, ...chosenItems].find(
      (other) => other.id !== i.id && other.includes.includes(i.id),
    );
    const quantity =
      i.id === PER_UNIT_ID
        ? Math.max(1, Math.min(PER_UNIT_MAX, selection.quantities[i.id] ?? 1))
        : 1;

    return {
      id: i.id,
      name: i.name,
      // Quantity multiplies the one-time fee only. Nothing in the data is
      // both per-unit and recurring, and inventing that rule here would be
      // guessing at a price on the visitor's behalf.
      once: cover ? 0 : i.price * quantity,
      monthly: cover ? 0 : (i.monthly ?? 0),
      quantity,
      unit: i.currency,
      coveredBy: cover?.name,
    };
  });

  const once = lines.reduce((sum, l) => sum + l.once, 0);
  const monthly = lines.reduce((sum, l) => sum + l.monthly, 0);

  // ── advisories ─────────────────────────────────────────────────────────
  /*
    Requirements come from two places that overlap but do not agree: each
    item's own `needs`, and the top-level `validation_rules`. Both are read,
    because `needs` is the richer of the two (it is the only place that knows
    cms wants s3) while `validation_rules` is the one a maintainer is likely
    to edit. Everything is resolved through the same satisfaction check and
    deduped by provider, so reading both cannot produce a duplicate warning.

    Only the visitor's own selections generate requirements. Base items are
    structurally satisfied — ssl needs vercel, and vercel is base — so folding
    them in would only ever produce phantom advisories.
  */
  const missing = new Map<string, Set<string>>();

  const require = (requirement: string, causedBy: PricingItem) => {
    const providerId =
      pricing.dependencies[requirement]?.provided_by ?? requirement;
    if (provided.has(providerId) || provided.has(requirement)) return;
    if (!byId.has(providerId)) return;
    const causes = missing.get(providerId) ?? new Set<string>();
    causes.add(causedBy.id);
    missing.set(providerId, causes);
  };

  for (const i of chosenItems) {
    for (const need of i.needs) require(need, i);
  }

  for (const rule of pricing.validation_rules) {
    const triggers = Array.isArray(rule.if_selected)
      ? rule.if_selected
      : [rule.if_selected];
    for (const trigger of triggers) {
      const source = chosenItems.find((i) => i.id === trigger);
      if (!source) continue;
      for (const requirement of rule.requires) require(requirement, source);
    }
  }

  const advisories: Advisory[] = [...missing.entries()]
    .map(([providerId, causeIds]) => {
      const provider = byId.get(providerId);
      if (!provider) return null;
      const ids = [...causeIds];
      return {
        provider,
        causeIds: ids,
        causes: ids.map((id) => byId.get(id)?.name ?? id),
      };
    })
    .filter((a): a is Advisory => a !== null);

  // ── external costs ─────────────────────────────────────────────────────
  const externals: ExternalCost[] = [];
  for (const i of [...baseItems, ...chosenItems]) {
    const note = i.note ?? EXTRA_EXTERNAL_NOTES[i.id];
    if (note) externals.push({ id: i.id, name: i.name, note });
  }

  const pkg = byId.get(selection.radios[SECTION.PACKAGES] ?? "") ?? null;

  return {
    lines,
    once,
    monthly,
    advisories,
    externals,
    pkg: pkg ?? null,
    indicative: pkg?.id === "custom",
  };
}

// ============================================================================
// Formatting
// ============================================================================

/*
  hu-HU groups thousands with a non-breaking space — "300 000 Ft" — which is
  the same convention lib/altitude's readout already follows. Intl is used
  rather than a hand-rolled regex so the separator stays correct if the locale
  data ever changes underneath us.
*/
const huf = new Intl.NumberFormat("hu-HU", { maximumFractionDigits: 0 });

export function formatHUF(value: number): string {
  return `${huf.format(value)} Ft`;
}

export function formatMonthly(value: number): string {
  return `${huf.format(value)} Ft/hó`;
}
