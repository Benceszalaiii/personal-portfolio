"use client";

/*
  ScrollScene — the page-spanning layer that hosts the single persistent 3D
  canvas. The outer div is `absolute inset-0` INSIDE the page's relative <main>
  (it participates in the document's layout box, it is not a fixed overlay);
  the inner sticky viewport keeps the canvas on screen while sections scroll
  past, and the Controller drives the object between section anchors.

  Stacking: this layer is z-10 — above section backgrounds (plasma, glows),
  below all section content (z-20), the navbar (z-[1000]) and native dialogs.

  Reduced motion: no GSAP at all — the canvas collapses to a hero-height
  static frame, matching the old Hero3D behavior.
*/

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ScrollSceneController from "./Controller";

// Client-only: three.js has no business in the server bundle, and this keeps
// the page content painting instantly while the scene streams in behind it.
const TravelingScene = dynamic(() => import("./TravelingScene"), {
  ssr: false,
});

type Env = { reduced: boolean; lowPower: boolean };

function useEnv(): Env | null {
  const [env, setEnv] = useState<Env | null>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");
    const update = () =>
      setEnv({ reduced: reduce.matches, lowPower: small.matches });
    update();
    reduce.addEventListener("change", update);
    small.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      small.removeEventListener("change", update);
    };
  }, []);
  return env;
}

export default function ScrollScene() {
  const env = useEnv();
  if (!env) return null; // SSR / first paint: content renders without the canvas

  const { reduced, lowPower } = env;

  return (
    <div
      aria-hidden
      className={
        reduced
          ? "pointer-events-none absolute inset-x-0 top-0 z-10 h-svh min-h-[640px] overflow-hidden"
          : "pointer-events-none absolute inset-0 z-10"
      }
    >
      <div
        className={
          reduced ? "h-full w-full" : "sticky top-0 h-svh min-h-[640px] w-full"
        }
      >
        <TravelingScene reduced={reduced} lowPower={lowPower} />
      </div>
      {!reduced && <ScrollSceneController />}
    </div>
  );
}
