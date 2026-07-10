/*
  The bridge between GSAP and R3F: ScrollTrigger scrub tweens mutate this plain
  object directly (no React state per scroll tick); the canvas reads it inside
  useFrame and damps toward it. One writer (GSAP), one reader (useFrame).
*/

export type SceneState = {
  /** world-space position target */
  x: number;
  y: number;
  z: number;
  /** pose rotation target, radians (idle spin/parallax are added on top) */
  rx: number;
  ry: number;
  rz: number;
  scale: number;
  opacity: number;
  /** multiplier on the traveling rig lights */
  light: number;
  /** idle self-rotation speed multiplier */
  spin: number;
};

export const HERO_STATE: SceneState = {
  x: 0,
  y: 0,
  z: 0,
  rx: 0,
  ry: 0,
  rz: 0,
  scale: 1.35,
  opacity: 1,
  light: 1,
  spin: 1,
};

export const sceneState: SceneState = { ...HERO_STATE };

export function resetSceneState(): void {
  Object.assign(sceneState, HERO_STATE);
}

/*
  Camera never moves — the whole screen-space→world-space mapping below depends
  on that. "Zoom" is done with object scale, depth with position.z.
*/
export const CAMERA = { z: 4.2, fov: 42 } as const;

/**
 * Convert a viewport pixel coordinate to world x/y on the plane at `depth`
 * (world z, negative = away from the camera). The sticky canvas always matches
 * the viewport exactly, so this mapping holds for the whole journey.
 */
export function pxToWorld(
  xPx: number,
  yPx: number,
  vw: number,
  vh: number,
  depth = 0,
): { x: number; y: number } {
  const dist = CAMERA.z - depth;
  const worldH = 2 * dist * Math.tan((CAMERA.fov * Math.PI) / 360);
  const worldW = worldH * (vw / vh);
  return {
    x: (xPx / vw - 0.5) * worldW,
    y: (0.5 - yPx / vh) * worldH,
  };
}
