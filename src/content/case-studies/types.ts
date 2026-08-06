/*
  The case-study content model.

  A study is data, not JSX: one file per project under `src/content/case-studies`,
  registered in `index.ts`. The renderer in `src/components/case-study` turns the
  block list into the long-form layout, so adding a project never means writing
  markup — and every study stays visually identical to the others by construction.
*/

/** A single body block inside a chapter. */
export type Block =
  /** Body copy. One string per paragraph. */
  | { kind: "text"; body: string[] }
  /** A screenshot. `bleed` widens it past the reading column. */
  | {
      kind: "figure";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      bleed?: boolean;
    }
  /** A pulled-out line — the argument of the chapter in one sentence. */
  | { kind: "quote"; text: string; source?: string }
  /** A real excerpt from the project. Rendered verbatim, never highlighted. */
  | { kind: "code"; label?: string; lines: string[] }
  /** A compact numeric row. */
  | { kind: "stats"; items: { value: string; label: string }[] }
  /** Titled sub-points — the "how" under a chapter's "what". */
  | { kind: "points"; items: { title: string; body: string }[] }
  /** The constraint that forced the chapter, and what it produced. */
  | {
      kind: "problem";
      problem: string;
      solution: string;
    };

/**
 * A chapter is the scroll unit: it owns an anchor id, so the site sidebar can
 * spy on it, and a nav label short enough to sit in that sidebar.
 */
export type Chapter = {
  id: string;
  /** Sidebar label — keep to ~2 words. */
  nav: string;
  kicker: string;
  title: string;
  /** Optional standfirst under the chapter title. */
  lede?: string;
  blocks: Block[];
};

export type CaseStudyLink = {
  label: string;
  href: string;
  /** Primary renders as the filled button. */
  primary?: boolean;
};

export type CaseStudy = {
  slug: string;
  /** Card + hero title. */
  title: string;
  /** One line under the title, on the card and in the hero. */
  tagline: string;
  /** Meta description + index-card body. */
  summary: string;
  /** Displayed as-is, e.g. "2026". */
  year: string;
  /** "Saját projekt" / "Ügyfélmunka" — shown as the hero eyebrow. */
  kind: string;
  role: string;
  stack: string[];
  cover: { src: string; alt: string; width: number; height: number };
  /** The rail beside the intro: the study's vital statistics. */
  facts: { label: string; value: string }[];
  links?: CaseStudyLink[];
  chapters: Chapter[];
  /** Closing paragraphs — what the project is worth to a reader hiring me. */
  takeaway: string[];
};
