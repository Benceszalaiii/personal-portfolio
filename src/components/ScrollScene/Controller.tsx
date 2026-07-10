"use client";

/*
  Scroll choreography. One scrubbed fromTo per pose transition, chained so the
  segments tile the scroll range exactly: segment i starts where segment i-1
  ended (numeric start from the previous ScrollTrigger), and ends at an
  anchor-relative position ("center 60%" of the arriving section). Screen-space
  targets are measured from the in-flow anchor elements at refresh time and
  converted to world units, so the object lands beside real content at every
  viewport size. GSAP writes only to `sceneState` — zero React state per tick.
*/

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import {
  DESKTOP_POSES,
  MOBILE_POSES,
  type ScenePose,
  TABLET_POSES,
} from "./poses";
import { pxToWorld, resetSceneState, sceneState } from "./scene-state";

/**
 * Where pose `pose` should sit in world space, measured against its anchor's
 * DOCUMENT position and the scroll offset at which its segment settles
 * (`endScroll`). x is unaffected by vertical scroll; y is the anchor's
 * viewport position at that future scroll offset.
 */
function poseTarget(
  pose: ScenePose,
  endScroll: number,
): { x: number; y: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const yNudge = ((pose.yOffsetVh ?? 0) * vh) / 100;

  if (pose.align === "viewport-center") {
    return pxToWorld(vw / 2, vh / 2 + yNudge, vw, vh, pose.z);
  }

  const el = document.getElementById(pose.anchorId);
  if (!el) return pxToWorld(vw / 2, vh / 2, vw, vh, pose.z);

  const r = el.getBoundingClientRect();
  const docCenterY = r.top + window.scrollY + r.height / 2;

  let xPx: number;
  switch (pose.align) {
    case "left-of":
      xPx = r.left / 2;
      break;
    case "right-of":
      xPx = (r.right + vw) / 2;
      break;
    case "inside-right":
      xPx = r.right - vw * 0.1;
      break;
    default:
      xPx = r.left + r.width / 2;
  }
  let yPx = docCenterY - endScroll + yNudge;

  // keep the object on screen even if an anchor measures oddly
  xPx = Math.min(Math.max(xPx, vw * 0.08), vw * 0.92);
  yPx = Math.min(Math.max(yPx, vh * 0.12), vh * 0.88);

  return pxToWorld(xPx, yPx, vw, vh, pose.z);
}

function buildJourney(poses: ScenePose[]): void {
  // sts[k] = ScrollTrigger of the segment that ARRIVES at poses[k + 1]
  const sts: ScrollTrigger[] = [];
  const targetOf = (i: number) =>
    poseTarget(poses[i], i === 0 ? 0 : (sts[i - 1]?.end ?? 0));

  // open on the hero pose
  const hero = poses[0];
  const heroXY = poseTarget(hero, 0);
  gsap.set(sceneState, {
    x: heroXY.x,
    y: heroXY.y,
    z: hero.z,
    rx: hero.rotation[0],
    ry: hero.rotation[1],
    rz: hero.rotation[2],
    scale: hero.scale,
    opacity: hero.opacity,
    light: hero.lightIntensity,
    spin: hero.spin,
  });

  for (let i = 1; i < poses.length; i++) {
    const prev = poses[i - 1];
    const next = poses[i];
    const section = document.getElementById(next.triggerId);
    if (!section) continue;
    const idx = i;

    const tween = gsap.fromTo(
      sceneState,
      {
        x: () => targetOf(idx - 1).x,
        y: () => targetOf(idx - 1).y,
        z: prev.z,
        rx: prev.rotation[0],
        ry: prev.rotation[1],
        rz: prev.rotation[2],
        scale: prev.scale,
        opacity: prev.opacity,
        light: prev.lightIntensity,
        spin: prev.spin,
      },
      {
        x: () => targetOf(idx).x,
        y: () => targetOf(idx).y,
        z: next.z,
        rx: next.rotation[0],
        ry: next.rotation[1],
        rz: next.rotation[2],
        scale: next.scale,
        opacity: next.opacity,
        light: next.lightIntensity,
        spin: next.spin,
        ease: "power1.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          // chain onto the previous segment so the journey is continuous —
          // no dead zones, no overlapping writers
          start: idx === 1 ? "top bottom" : () => sts[idx - 2]?.end ?? 0,
          end: next.end ?? "center 60%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
    if (tween.scrollTrigger) sts.push(tween.scrollTrigger);
  }
}

export default function ScrollSceneController() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          motionOK: "(prefers-reduced-motion: no-preference)",
        },
        (mmCtx) => {
          const c = mmCtx.conditions ?? {};
          if (!c.motionOK) return; // reduced motion: no scroll choreography at all
          buildJourney(
            c.desktop ? DESKTOP_POSES : c.tablet ? TABLET_POSES : MOBILE_POSES,
          );
          return () => resetSceneState();
        },
      );
    });

    // anchors move once the display font swaps in — re-measure everything
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

    return () => ctx.revert();
  }, []);

  return null;
}
