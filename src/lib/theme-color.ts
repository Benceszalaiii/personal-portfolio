/*
  Bridge between the CSS theme (shadcn/tweakcn custom properties) and code
  that needs concrete sRGB colors — WebGL can't read `var(--primary)`.

  Resolution is done by the browser itself so ANY css color the engine
  understands works (oklch, color-mix, relative color syntax, var chains):
  a probe element computes the color, a 1×1 canvas rasterizes it, and we read
  the pixel back. No hand-written color math to drift out of sync with CSS.
*/

import { useEffect, useMemo, useState } from "react";

let sharedCtx: CanvasRenderingContext2D | null | undefined;

function getCtx(): CanvasRenderingContext2D | null {
  if (sharedCtx === undefined) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    sharedCtx = canvas.getContext("2d", { willReadFrequently: true });
  }
  return sharedCtx ?? null;
}

const toHexByte = (v: number) => v.toString(16).padStart(2, "0");

/**
 * Resolve any CSS color expression (e.g. `var(--scene-rim)`) to a `#rrggbb`
 * hex in the document's current theme. Returns `fallback` on the server or
 * when the browser can't parse the expression.
 */
export function resolveCssColorToHex(
  cssColor: string,
  fallback: string,
): string {
  if (typeof document === "undefined") return fallback;
  const ctx = getCtx();
  if (!ctx) return fallback;
  try {
    // let the CSS engine evaluate var()/oklch()/color-mix() in context
    const probe = document.createElement("span");
    probe.style.display = "none";
    probe.style.color = cssColor;
    document.documentElement.appendChild(probe);
    const computed = getComputedStyle(probe).color;
    probe.remove();

    // pre-fill with the fallback: if `computed` fails to parse, fillStyle
    // keeps the fallback and the pixel read below still returns a sane color
    ctx.fillStyle = fallback;
    if (computed) ctx.fillStyle = computed;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
  } catch {
    return fallback;
  }
}

export type ThemeColorSpec = Record<string, { css: string; fallback: string }>;

/**
 * Resolve a map of CSS color expressions to hex strings, re-resolving when
 * the theme could have changed (class/style/data-theme mutations on <html>,
 * e.g. a future light/dark toggle). SSR and first paint get the fallbacks —
 * which mirror the default palette, so there is no visible swap.
 */
export function useThemeColors<T extends ThemeColorSpec>(
  spec: T,
): { [K in keyof T]: string } {
  type Result = { [K in keyof T]: string };
  const specKey = JSON.stringify(spec);
  // biome-ignore lint/correctness/useExhaustiveDependencies: spec is keyed by content
  const stableSpec = useMemo(() => spec, [specKey]);

  const [colors, setColors] = useState<Result>(() => {
    const out = {} as Result;
    for (const k in stableSpec) out[k] = stableSpec[k].fallback;
    return out;
  });

  useEffect(() => {
    const resolve = () => {
      const out = {} as Result;
      for (const k in stableSpec) {
        out[k] = resolveCssColorToHex(
          stableSpec[k].css,
          stableSpec[k].fallback,
        );
      }
      // skip no-op updates so mutation storms don't re-render consumers
      setColors((prev) => {
        for (const k in out) if (prev[k] !== out[k]) return out;
        return prev;
      });
    };
    resolve();
    const mo = new MutationObserver(resolve);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });
    return () => mo.disconnect();
  }, [stableSpec]);

  return colors;
}
