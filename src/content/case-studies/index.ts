import { nyaralashasonlito } from "./nyaralashasonlito";
import type { CaseStudy } from "./types";

/*
  The registry. Adding a case study is one new file next to this one plus one
  entry here — ordering in this array is the order they appear in the index.
*/
export const caseStudies: CaseStudy[] = [nyaralashasonlito];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export type { Block, CaseStudy, Chapter } from "./types";
