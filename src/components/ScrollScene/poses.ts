/*
  Pose tables for the scroll journey — one named pose per landing-page section,
  per breakpoint. A pose describes where the monolith should sit ON SCREEN when
  its section is "settled" (the scrub segment's end). Screen position is derived
  from a real in-flow anchor element at ScrollTrigger refresh time, never from
  hard-coded pixels, so the poses survive resizes and copy changes.

  - triggerId: section whose scroll position drives the scrub segment that
    ARRIVES at this pose.
  - anchorId + align: the in-flow element measured to compute the screen-space
    target (left-of = center of the gutter left of the anchor, etc.).
  - rotation.y only ever increases across the journey so the object always
    turns forward — no rewinding between sections.
*/

export type SceneId = "hero" | "work" | "features" | "about" | "cta";

export type PoseAlign =
  | "viewport-center" // ignore the anchor, center of the viewport
  | "anchor-center" // center of the anchor element
  | "left-of" // midpoint between viewport left edge and the anchor's left edge
  | "right-of" // midpoint between the anchor's right edge and viewport right edge
  | "inside-right"; // just inside the anchor's right edge

export type ScenePose = {
  id: SceneId;
  triggerId: string;
  anchorId: string;
  align: PoseAlign;
  /** vertical nudge from the computed target, in vh (negative = up) */
  yOffsetVh?: number;
  /** world-space depth (negative = away from camera) */
  z: number;
  rotation: [number, number, number];
  scale: number;
  opacity: number;
  lightIntensity: number;
  /** idle self-rotation speed multiplier */
  spin: number;
  /** ScrollTrigger end for the segment arriving here (default "center 60%") */
  end?: string;
};

/*
  Desktop (≥1024px): the full editorial choreography.
  hero center → dim recede behind the work cards → left of the features panel →
  upper-right bleed beside the portrait → calm settle under the contact links.
*/
export const DESKTOP_POSES: ScenePose[] = [
  {
    id: "hero",
    triggerId: "home",
    anchorId: "home",
    align: "viewport-center",
    z: 0,
    rotation: [0, 0, 0],
    scale: 1.5,
    opacity: 1,
    lightIntensity: 1,
    spin: 1,
  },
  {
    // dim recede behind the case-study cards — dense content, needs legibility
    id: "work",
    triggerId: "munkaim",
    anchorId: "stage-munkaim",
    align: "anchor-center",
    z: -0.9,
    rotation: [0.3, 1.4, 0.06],
    scale: 0.6,
    opacity: 0.22,
    lightIntensity: 0.5,
    spin: 0.4,
    end: "top 40%",
  },
  {
    id: "features",
    triggerId: "features",
    anchorId: "stage-features",
    align: "left-of",
    z: 0,
    rotation: [0.35, 2.3, 0.05],
    scale: 1.0,
    opacity: 1,
    lightIntensity: 1,
    spin: 0.7,
    end: "center 60%",
  },
  {
    id: "about",
    triggerId: "about",
    anchorId: "stage-about",
    align: "right-of",
    yOffsetVh: -14,
    z: 0,
    rotation: [0.2, 5.7, 0],
    scale: 0.75,
    opacity: 1,
    lightIntensity: 0.95,
    spin: 0.5,
    end: "center 55%",
  },
  {
    id: "cta",
    triggerId: "contact",
    anchorId: "stage-cta",
    align: "anchor-center",
    z: 0,
    rotation: [0.3, 8.2, 0.12],
    scale: 0.7,
    opacity: 1,
    lightIntensity: 1,
    spin: 0.4,
    end: "center 60%",
  },
];

/*
  Tablet (768–1023px): content spans nearly the full width, so no side gutters.
  The object travels down the center, dipping behind cards (dim, pushed back)
  and surfacing for the marquee + contact moments. Never squeezed beside text.
*/
export const TABLET_POSES: ScenePose[] = [
  {
    id: "hero",
    triggerId: "home",
    anchorId: "home",
    align: "viewport-center",
    z: 0,
    rotation: [0, 0, 0],
    scale: 1.3,
    opacity: 1,
    lightIntensity: 1,
    spin: 1,
  },
  {
    id: "work",
    triggerId: "munkaim",
    anchorId: "stage-munkaim",
    align: "anchor-center",
    z: -0.9,
    rotation: [0.3, 1.4, 0.06],
    scale: 0.55,
    opacity: 0.16,
    lightIntensity: 0.5,
    spin: 0.4,
    end: "top 40%",
  },
  {
    id: "features",
    triggerId: "features",
    anchorId: "stage-features",
    align: "anchor-center",
    z: -1,
    rotation: [0.35, 2.3, 0.05],
    scale: 1.0,
    // behind the pinned feature text — stays dim for legibility
    opacity: 0.3,
    lightIntensity: 0.6,
    spin: 0.7,
    end: "center 60%",
  },
  {
    id: "about",
    triggerId: "about",
    anchorId: "stage-about",
    align: "anchor-center",
    z: -0.8,
    rotation: [0.2, 5.7, 0],
    scale: 0.7,
    opacity: 0.35,
    lightIntensity: 0.6,
    spin: 0.5,
    end: "center 55%",
  },
  {
    id: "cta",
    triggerId: "contact",
    anchorId: "stage-cta",
    align: "anchor-center",
    z: 0,
    rotation: [0.3, 8.2, 0.12],
    scale: 0.65,
    opacity: 0.9,
    lightIntensity: 0.9,
    spin: 0.4,
    end: "center 60%",
  },
];

/*
  Mobile (<768px): single-column layout — the object never sits beside text.
  It travels the center line, dimmed well below the copy, and quietly fades
  for the CTA. stage-cta is hidden on mobile, so the CTA pose anchors the
  contact section itself.
*/
export const MOBILE_POSES: ScenePose[] = [
  {
    id: "hero",
    triggerId: "home",
    anchorId: "home",
    align: "viewport-center",
    z: 0,
    rotation: [0, 0, 0],
    scale: 1.25,
    opacity: 1,
    lightIntensity: 1,
    spin: 1,
  },
  {
    id: "work",
    triggerId: "munkaim",
    anchorId: "stage-munkaim",
    align: "anchor-center",
    z: -0.8,
    rotation: [0.3, 1.4, 0.06],
    scale: 0.5,
    opacity: 0.1,
    lightIntensity: 0.45,
    spin: 0.4,
    end: "top 40%",
  },
  {
    id: "features",
    triggerId: "features",
    anchorId: "stage-features",
    align: "anchor-center",
    z: -1,
    rotation: [0.35, 2.3, 0.05],
    scale: 0.8,
    opacity: 0.25,
    lightIntensity: 0.5,
    spin: 0.7,
    end: "center 60%",
  },
  {
    id: "about",
    triggerId: "about",
    anchorId: "stage-about",
    align: "anchor-center",
    z: -0.8,
    rotation: [0.2, 5.7, 0],
    scale: 0.55,
    opacity: 0.25,
    lightIntensity: 0.5,
    spin: 0.5,
    end: "center 55%",
  },
  {
    id: "cta",
    triggerId: "contact",
    anchorId: "contact",
    align: "anchor-center",
    yOffsetVh: -22,
    z: -0.4,
    rotation: [0.3, 8.2, 0.12],
    scale: 0.45,
    opacity: 0.4,
    lightIntensity: 0.6,
    spin: 0.4,
    end: "center 60%",
  },
];
