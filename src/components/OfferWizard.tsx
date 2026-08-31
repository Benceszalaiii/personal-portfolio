"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

type Step = 1 | 2 | 3 | 4;

type Status = "idle" | "submitting" | "success" | "error";

interface OfferData {
  projectType: string;
  features: string[];
  currentUrl: string;
  budget: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

/**
 * A configuration handed over from /kalkulator.
 *
 * The calculator has already answered steps 1–3 factually — which package,
 * which add-ons, what it comes to — so a visitor arriving with one of these
 * must not be asked the same questions again in vaguer form. They land on the
 * contact step with the itemised configuration shown above the fields, and
 * `lines` travels verbatim into the e-mail, so the enquiry arrives as a spec
 * rather than as a mood.
 */
export interface OfferPrefill {
  projectType: string;
  features: string[];
  budget: string;
  /** Itemised configuration: label / value pairs, already formatted. */
  lines: { label: string; value: string }[];
  /** Headline figures, e.g. "360 000 Ft egyszeri · 10 000 Ft/hó". */
  total: string;
  /** True when the estimate is explicitly a starting point, not a quote. */
  indicative: boolean;
}

const INITIAL: OfferData = {
  projectType: "",
  features: [],
  currentUrl: "",
  budget: "",
  timeline: "",
  description: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

// ============================================================================
// Copy & Options (Hungarian) — written for a non-technical business owner
// ============================================================================

const PROJECT_TYPES = [
  {
    value: "showcase",
    label: "Bemutatkozó weboldal",
    desc: "Céged, szolgáltatásod vagy munkáid bemutatása",
  },
  {
    value: "ecommerce",
    label: "Webáruház",
    desc: "Termékek értékesítése online fizetéssel",
  },
  {
    value: "webapp",
    label: "Webalkalmazás",
    desc: "Foglalás, ügyfélportál, készlet, belső rendszer",
  },
  {
    value: "redesign",
    label: "Meglévő oldal megújítása",
    desc: "Régi weboldal modern dizájnnal és technológiával",
  },
  {
    value: "landing",
    label: "Landing oldal",
    desc: "Egyetlen fókuszált oldal egy kampányhoz vagy termékhez",
  },
  {
    value: "unsure",
    label: "Még nem tudom",
    desc: "Segítek eldönteni, mi való a vállalkozásodnak",
  },
] as const;

const FEATURE_OPTIONS = [
  {
    value: "cms",
    label: "Tartalomkezelő (CMS)",
    desc: "Magad szerkesztheted a szövegeket és képeket",
  },
  {
    value: "booking",
    label: "Foglalás / időpontkérés",
    desc: "Naptár, időpontok, automatikus visszaigazolás",
  },
  {
    value: "payments",
    label: "Online fizetés",
    desc: "Bankkártyás fizetés (Stripe, Barion)",
  },
  {
    value: "i18n",
    label: "Többnyelvűség",
    desc: "Magyar mellett angol vagy más nyelvek",
  },
  {
    value: "blog",
    label: "Blog / hírek",
    desc: "Rendszeresen frissülő saját tartalmak",
  },
  {
    value: "newsletter",
    label: "Hírlevél",
    desc: "Feliratkozás és e-mail lista kezelése",
  },
  {
    value: "seo",
    label: "SEO és analitika",
    desc: "Google-találatok, látogatottsági adatok",
  },
  {
    value: "motion",
    label: "Animáció / 3D",
    desc: "Amilyen mozgás ezen az oldalon van",
  },
] as const;

const BUDGET_OPTIONS = [
  { value: "under-300k", label: "300 ezer Ft alatt" },
  { value: "300k-800k", label: "300–800 ezer Ft" },
  { value: "800k-2m", label: "800 ezer – 2 millió Ft" },
  { value: "over-2m", label: "2 millió Ft felett" },
  { value: "unsure", label: "Kérek rá javaslatot" },
] as const;

const TIMELINE_OPTIONS = [
  { value: "asap", label: "Minél előbb" },
  { value: "1-2-months", label: "1–2 hónapon belül" },
  { value: "3-plus-months", label: "Később, 3+ hónap" },
  { value: "flexible", label: "Rugalmas vagyok" },
] as const;

const STEPS: Record<Step, { title: string; subtitle: string }> = {
  1: {
    title: "Milyen projektet képzelsz el?",
    subtitle:
      "Válaszd ki, milyen projektet képzelsz el — a részleteket később pontosítjuk.",
  },
  2: {
    title: "Mire lesz szükséged?",
    subtitle:
      "Jelöld be, milyen funkciókra lesz szükséged — ha még nem tudod, nyugodtan lépj tovább.",
  },
  3: {
    title: "Keretek",
    subtitle:
      "Egy reális ajánlathoz sokat segít, ha látom a határidőt és a költségkeretet.",
  },
  4: {
    title: "Elérhetőségeid",
    subtitle:
      "Hova küldjem az ajánlatot? Egy munkanapon belül jelentkezem vele.",
  },
};

const STEPS_TOTAL = 4;

const optionLabel = (
  list: readonly { value: string; label: string }[],
  value: string,
) => list.find((o) => o.value === value)?.label ?? value;

// ============================================================================
// Field styles (shared with the old contact form)
// ============================================================================

const field =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus-visible:border-ember focus-visible:ring-2 focus-visible:ring-ring/50";
const fieldLabel =
  "font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground";

// ============================================================================
// Option Card (single select)
// ============================================================================

function OptionCard({
  selected,
  onClick,
  label,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  desc?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full cursor-pointer rounded-xl border px-4 py-3 text-left transition-all duration-200",
        "focus-ember outline-none",
        selected
          ? "border-ember/70 bg-primary/10 text-foreground"
          : "border-border bg-background/60 text-foreground hover:border-muted-foreground/40",
      )}
    >
      <span className="block text-sm font-medium">{label}</span>
      {desc && (
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
          {desc}
        </span>
      )}
    </button>
  );
}

// ============================================================================
// Feature Toggle Card (multi select)
// ============================================================================

function FeatureCard({
  selected,
  onToggle,
  label,
  desc,
}: {
  selected: boolean;
  onToggle: () => void;
  label: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200",
        "focus-ember outline-none",
        selected
          ? "border-ember/70 bg-primary/10"
          : "border-border bg-background/60 hover:border-muted-foreground/40",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-all duration-200",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input bg-muted",
        )}
      >
        {selected && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6.5L4.5 9L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">
          {label}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
          {desc}
        </span>
      </span>
    </button>
  );
}

// ============================================================================
// Steps
// ============================================================================

function Step1({
  data,
  onSelect,
}: {
  data: OfferData;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {PROJECT_TYPES.map((pt) => (
        <OptionCard
          key={pt.value}
          selected={data.projectType === pt.value}
          onClick={() => onSelect(pt.value)}
          label={pt.label}
          desc={pt.desc}
        />
      ))}
    </div>
  );
}

function Step2({
  data,
  onToggle,
}: {
  data: OfferData;
  onToggle: (v: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {FEATURE_OPTIONS.map((f) => (
        <FeatureCard
          key={f.value}
          selected={data.features.includes(f.value)}
          onToggle={() => onToggle(f.value)}
          label={f.label}
          desc={f.desc}
        />
      ))}
    </div>
  );
}

function Step3({
  data,
  onChange,
}: {
  data: OfferData;
  onChange: (field: keyof OfferData, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className={fieldLabel}>Tervezett költségvetés</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {BUDGET_OPTIONS.map((b) => (
            <OptionCard
              key={b.value}
              selected={data.budget === b.value}
              onClick={() => onChange("budget", b.value)}
              label={b.label}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className={fieldLabel}>Mikor indulna a projekt?</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {TIMELINE_OPTIONS.map((t) => (
            <OptionCard
              key={t.value}
              selected={data.timeline === t.value}
              onClick={() => onChange("timeline", t.value)}
              label={t.label}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="offer-url" className={fieldLabel}>
          Jelenlegi weboldalad{" "}
          <span className="normal-case text-muted-foreground/50">(ha van)</span>
        </label>
        <input
          id="offer-url"
          type="url"
          inputMode="url"
          autoComplete="url"
          maxLength={300}
          value={data.currentUrl}
          onChange={(e) => onChange("currentUrl", e.target.value)}
          placeholder="https://vallalkozasom.hu"
          className={field}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="offer-desc" className={fieldLabel}>
          Mesélj röviden a projektről{" "}
          <span className="normal-case text-muted-foreground/50">
            (opcionális)
          </span>
        </label>
        <textarea
          id="offer-desc"
          rows={4}
          maxLength={5000}
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Például: Vendégházat üzemeltetek, kellene egy oldal galériával, árakkal és foglalási lehetőséggel…"
          className={`${field} resize-y`}
        />
      </div>
    </div>
  );
}

function Step4({
  data,
  onChange,
  errors,
  prefill,
}: {
  data: OfferData;
  onChange: (field: keyof OfferData, value: string) => void;
  errors: Partial<Record<keyof OfferData, string>>;
  prefill?: OfferPrefill;
}) {
  /*
    A calculator hand-off REPLACES the derived summary rather than joining it.
    Showing both would restate the same configuration twice — once itemised and
    once as a budget band — and the vaguer of the two would undermine the number
    the visitor just watched assemble itself.
  */
  const summary: { label: string; value: string }[] = prefill
    ? prefill.lines
    : [
        {
          label: "Projekt",
          value: optionLabel(PROJECT_TYPES, data.projectType),
        },
        ...(data.features.length > 0
          ? [
              {
                label: "Funkciók",
                value: data.features
                  .map((f) => optionLabel(FEATURE_OPTIONS, f))
                  .join(", "),
              },
            ]
          : []),
        {
          label: "Költségvetés",
          value: optionLabel(BUDGET_OPTIONS, data.budget),
        },
        {
          label: "Indulás",
          value: optionLabel(TIMELINE_OPTIONS, data.timeline),
        },
      ];

  return (
    <div className="flex flex-col gap-4">
      <dl className="grid gap-x-6 gap-y-1.5 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm sm:grid-cols-[auto_1fr]">
        {/* Indexed key: a calculator hand-off can legitimately repeat a label
            (two advisories both read "Még egyeztetendő"), so the label alone is
            not unique. */}
        {summary.map((row, i) => (
          <div key={`${row.label}-${i}`} className="contents">
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground sm:py-0.5">
              {row.label}
            </dt>
            <dd className="pb-1.5 text-foreground sm:pb-0 sm:py-0.5">
              {row.value}
            </dd>
          </div>
        ))}
        {prefill && (
          <div className="contents">
            <dt className="border-t border-border pt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground sm:py-0.5 sm:pt-2.5">
              {prefill.indicative ? "Irányár" : "Becsült ár"}
            </dt>
            <dd className="border-t border-border pt-2 font-semibold tabular-nums text-ember sm:py-0.5 sm:pt-2.5">
              {prefill.total}
            </dd>
          </div>
        )}
      </dl>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="offer-name" className={fieldLabel}>
            Név *
          </label>
          <input
            id="offer-name"
            type="text"
            autoComplete="name"
            maxLength={120}
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Kovács Anna"
            className={cn(field, errors.name && "border-destructive")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="offer-company" className={fieldLabel}>
            Cégnév{" "}
            <span className="normal-case text-muted-foreground/50">
              (opcionális)
            </span>
          </label>
          <input
            id="offer-company"
            type="text"
            autoComplete="organization"
            maxLength={200}
            value={data.company}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Vállalkozásom Kft."
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="offer-email" className={fieldLabel}>
            E-mail cím *
          </label>
          <input
            id="offer-email"
            type="email"
            autoComplete="email"
            maxLength={200}
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="anna@vallalkozas.hu"
            className={cn(field, errors.email && "border-destructive")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="offer-phone" className={fieldLabel}>
            Telefonszám{" "}
            <span className="normal-case text-muted-foreground/50">
              (opcionális)
            </span>
          </label>
          <input
            id="offer-phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+36 30 123 4567"
            className={field}
          />
        </div>
      </div>

      {/*
        A prefilled wizard never shows step 3, so the one genuinely open
        question on it — "tell me about the project" — is re-homed here rather
        than lost. It is the only field the calculator cannot answer.
      */}
      {prefill && (
        <div className="flex flex-col gap-2">
          <label htmlFor="offer-desc-inline" className={fieldLabel}>
            Bármi, amit még tudnom kellene{" "}
            <span className="normal-case text-muted-foreground/50">
              (opcionális)
            </span>
          </label>
          <textarea
            id="offer-desc-inline"
            rows={3}
            maxLength={5000}
            value={data.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Például: határidő, meglévő arculat, vagy mire kell leginkább figyelni…"
            className={`${field} resize-y`}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Component — inline card, no dialog
// ============================================================================

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function composeMessage(data: OfferData, prefill?: OfferPrefill): string {
  // A calculator hand-off leads with the itemised configuration: it is the part
  // of the enquiry that can be acted on without a reply.
  const configuration = prefill
    ? [
        "── Kalkulátor összeállítás ──",
        ...prefill.lines.map((line) => `${line.label}: ${line.value}`),
        `${prefill.indicative ? "Irányár" : "Becsült ár"}: ${prefill.total}`,
        "",
      ]
    : [];

  return [
    "Ajánlatkérés a portfólió űrlapról",
    "",
    ...configuration,
    `Projekt típusa: ${optionLabel(PROJECT_TYPES, data.projectType)}`,
    data.features.length > 0
      ? `Kért funkciók: ${data.features
          .map((f) => optionLabel(FEATURE_OPTIONS, f))
          .join(", ")}`
      : null,
    `Költségvetés: ${optionLabel(BUDGET_OPTIONS, data.budget)}`,
    `Indulás: ${optionLabel(TIMELINE_OPTIONS, data.timeline)}`,
    data.currentUrl ? `Jelenlegi weboldal: ${data.currentUrl}` : null,
    data.company ? `Cégnév: ${data.company}` : null,
    data.phone ? `Telefonszám: ${data.phone}` : null,
    data.description ? `\nLeírás:\n${data.description}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export default function OfferWizard({
  className,
  prefill,
}: {
  className?: string;
  prefill?: OfferPrefill;
}) {
  // A prefilled wizard opens on the contact step: steps 1–3 are already
  // answered, and re-asking them is the friction the hand-off exists to remove.
  const [step, setStep] = useState<Step>(prefill ? 4 : 1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OfferData>(() =>
    prefill
      ? {
          ...INITIAL,
          projectType: prefill.projectType,
          features: prefill.features,
          budget: prefill.budget,
          // The calculator says nothing about timing, so this stays the one
          // question the contact step still owns — and it is optional there.
          timeline: "",
        }
      : INITIAL,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof OfferData, string>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const reduceMotion = useReducedMotion();

  const slideVariants = {
    enter: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  function updateField(fieldName: keyof OfferData, value: string) {
    setData((d) => ({ ...d, [fieldName]: value }));
    if (errors[fieldName])
      setErrors((er) => ({ ...er, [fieldName]: undefined }));
  }

  function toggleFeature(value: string) {
    setData((d) => ({
      ...d,
      features: d.features.includes(value)
        ? d.features.filter((f) => f !== value)
        : [...d.features, value],
    }));
  }

  const canProceed =
    (step === 1 && !!data.projectType) ||
    step === 2 ||
    (step === 3 && !!data.budget && !!data.timeline) ||
    step === 4;

  function goTo(next: Step) {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  function validateContact(): boolean {
    const e: Partial<Record<keyof OfferData, string>> = {};
    if (!data.name.trim()) e.name = "Kérlek, add meg a neved.";
    if (!data.email.trim()) e.email = "Kérlek, add meg az e-mail címed.";
    else if (!isEmail(data.email))
      e.email = "Hiányzik a @ jel. Például: anna@vallalkozas.hu";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < 4) {
      if (canProceed) goTo((step + 1) as Step);
      return;
    }
    if (!validateContact()) return;

    setStatus("submitting");
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          message: composeMessage(data, prefill),
        }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setSubmitError(
          json.error ??
            "Nem sikerült elküldeni az ajánlatkérést. Addig írj közvetlenül e-mailben:",
        );
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setSubmitError(
        "Nem érlek el a hálózaton. Ellenőrizd a kapcsolatot, vagy írj közvetlenül e-mailben:",
      );
      setStatus("error");
    }
  }

  function reset() {
    setData(
      prefill
        ? {
            ...INITIAL,
            projectType: prefill.projectType,
            features: prefill.features,
            budget: prefill.budget,
          }
        : INITIAL,
    );
    setErrors({});
    setSubmitError("");
    setStatus("idle");
    setDirection(-1);
    // A hand-off has no step 1 to return to — the calculator is behind it.
    setStep(prefill ? 4 : 1);
  }

  if (status === "success") {
    return (
      <output
        className={cn(
          "flex min-h-[24rem] flex-col items-start justify-center rounded-2xl border border-border bg-card p-8",
          className,
        )}
      >
        <span
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-2xl text-ember"
        >
          ✓
        </span>
        <h3 className="mt-5 font-display text-2xl text-foreground">
          Köszönöm az ajánlatkérést!
        </h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          Megkaptam a részleteket — egy munkanapon belül személyre szabott
          ajánlattal jelentkezem a megadott e-mail címen.
        </p>
        <button
          type="button"
          onClick={reset}
          className="focus-ember mt-6 font-mono text-xs uppercase tracking-[0.15em] text-ember hover:underline"
        >
          Új ajánlatkérés
        </button>
      </output>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      {/* Header: step label + progress bar */}
      <div className="border-b border-border px-6 pb-4 pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {/* A hand-off from the calculator IS one step. Printing "4. lépés
                / 4" over a form that opened on its last screen reads as three
                steps having been skipped, rather than as three having been
                answered already. */}
            {prefill ? "Utolsó lépés" : `${step}. lépés / ${STEPS_TOTAL}`}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/60">
            Ajánlatkérés
          </p>
        </div>
        {!prefill && (
          <div
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS_TOTAL}
            aria-valuenow={step}
            aria-label="Ajánlatkérés folyamata"
            className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(step / STEPS_TOTAL) * 100}%` }}
            />
          </div>
        )}
        <h3 className="mt-4 font-display text-xl font-medium text-foreground sm:text-2xl">
          {prefill ? "Hova küldjem az ajánlatot?" : STEPS[step].title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {prefill
            ? "Az összeállításodat változatlanul viszem magammal — egy munkanapon belül jelentkezem az ajánlattal."
            : STEPS[step].subtitle}
        </p>
      </div>

      {/* Step content */}
      <div className="overflow-x-hidden px-6 py-6">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <Step1
                data={data}
                onSelect={(v) => updateField("projectType", v)}
              />
            )}
            {step === 2 && <Step2 data={data} onToggle={toggleFeature} />}
            {step === 3 && <Step3 data={data} onChange={updateField} />}
            {step === 4 && (
              <Step4
                data={data}
                onChange={updateField}
                errors={errors}
                prefill={prefill}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-border px-6 py-4">
        <div aria-live="polite">
          {status === "error" && submitError && (
            <p className="mb-3 text-sm text-destructive">
              {submitError}{" "}
              {/* The message ends in a colon on purpose: a send that failed is
                  the one moment the direct address is worth more than the
                  form, so it is offered inline rather than left for the
                  visitor to scroll back and find. */}
              <a
                href="mailto:bence.szalai@icloud.com"
                className="focus-ember font-semibold underline underline-offset-4"
              >
                bence.szalai@icloud.com
              </a>
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {step > 1 && !prefill ? (
            <button
              type="button"
              onClick={() => goTo((step - 1) as Step)}
              className="focus-ember cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Vissza
            </button>
          ) : (
            <span />
          )}

          {step < 4 ? (
            <button
              type="submit"
              disabled={!canProceed}
              className={cn(
                "focus-ember inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300",
                canProceed
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110"
                  : "cursor-not-allowed bg-muted text-muted-foreground opacity-60",
              )}
            >
              Tovább
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="focus-ember inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? "Küldés…" : "Ajánlatkérés elküldése"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
