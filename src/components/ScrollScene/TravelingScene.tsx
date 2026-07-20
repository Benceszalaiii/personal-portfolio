"use client";

/*
  The one persistent WebGL scene — the faceted metal monolith from the old hero,
  now living in a page-spanning sticky layer so it can travel between sections.
  All motion targets come from `sceneState` (mutated by GSAP scrub tweens in
  Controller.tsx); useFrame damps toward them, so a ScrollTrigger.refresh() or a
  fast fling reads as a glide, never a teleport. Palette hexes mirror the OKLCH
  brand tokens by hand — WebGL can't read CSS custom properties.
*/

import {
  Environment,
  Float,
  Lightformer,
  PerformanceMonitor,
  Sparkles,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh, MeshStandardMaterial, PointLight } from "three";
import { useThemeColors } from "@/lib/theme-color";
import { CAMERA, sceneState } from "./scene-state";

/*
  The rig palette comes from the CSS theme (--scene-* tokens derive from the
  shadcn set, see globals.css), resolved to sRGB at runtime. Fallbacks mirror
  the default oxblood palette so SSR/first paint match the stylesheet.
*/
type ScenePalette = {
  rim: string; // oxblood rim light
  key: string; // ember key light
  fill: string; // warm fill light
  body: string; // monolith metal
  env: string; // environment backdrop
};

function useScenePalette(): ScenePalette {
  return useThemeColors({
    rim: { css: "var(--scene-rim)", fallback: "#b02a2e" },
    key: { css: "var(--scene-key)", fallback: "#e0623a" },
    fill: { css: "var(--scene-fill)", fallback: "#ffd9c0" },
    body: { css: "var(--scene-body)", fallback: "#1c1113" },
    env: { css: "var(--scene-env)", fallback: "#0b0708" },
  });
}

/** Normalized pointer (-1..1, y down) tracked on window — the canvas itself is
    pointer-events:none, so R3F's own pointer never updates. */
function usePagePointer(enabled: boolean) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);
  return pointer;
}

function Monolith({ reduced, body }: { reduced: boolean; body: string }) {
  const mesh = useRef<Mesh>(null);
  const mat = useRef<MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    if (reduced) {
      // one deliberate resting angle under reduced motion
      m.rotation.set(0.25, 0.6, 0);
    } else {
      // slow continuous turn, throttled per pose so later scenes feel calmer
      m.rotation.y += delta * 0.18 * sceneState.spin;
      m.rotation.x += delta * 0.05 * sceneState.spin;
    }
    if (mat.current) {
      const d = reduced ? 1 : 1 - 0.001 ** delta;
      mat.current.opacity += (sceneState.opacity - mat.current.opacity) * d;
    }
  });

  return (
    <Float
      speed={reduced ? 0 : 1.1}
      rotationIntensity={reduced ? 0 : 0.25}
      floatIntensity={reduced ? 0 : 0.6}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          ref={mat}
          color={body}
          metalness={1}
          roughness={0.22}
          flatShading
          transparent
          envMapIntensity={2.2}
        />
      </mesh>
    </Float>
  );
}

/*
  Position/rotation/scale rig. The lights travel WITH the object (constant
  oxblood/ember rim wherever it goes); only the baked Environment reflections
  stay world-fixed, which reads as the object moving through a lit room.
*/
function TravelGroup({
  reduced,
  lowPower,
  palette,
}: {
  reduced: boolean;
  lowPower: boolean;
  palette: ScenePalette;
}) {
  const mover = useRef<Group>(null);
  const spinner = useRef<Group>(null);
  const sparkles = useRef<Group>(null);
  const rim = useRef<PointLight>(null);
  const key = useRef<PointLight>(null);
  const fill = useRef<PointLight>(null);
  const pointer = usePagePointer(!reduced && !lowPower);

  useFrame((state, delta) => {
    const g = mover.current;
    const r = spinner.current;
    if (!g || !r) return;
    const s = sceneState;
    // exponential damp toward the GSAP-driven targets (~0.15s time constant)
    const d = reduced ? 1 : 1 - 0.001 ** delta;

    g.position.x += (s.x - g.position.x) * d;
    g.position.y += (s.y - g.position.y) * d;
    g.position.z += (s.z - g.position.z) * d;
    r.scale.setScalar(r.scale.x + (s.scale - r.scale.x) * d);

    // pose rotation + damped pointer parallax + slow idle drift
    // rotation damps slower than position (~0.2s vs ~0.15s) so the pointer
    // tilt reads as mass, not twitch
    const dr = reduced ? 1 : 1 - 0.008 ** delta;
    const t = state.clock.elapsedTime;
    const parallax = reduced || lowPower ? 0 : 0.45;
    const targetY =
      s.ry +
      (reduced
        ? 0
        : pointer.current.x * parallax + Math.sin(t * 0.15) * 0.1 * s.spin);
    const targetX =
      s.rx +
      (reduced
        ? 0
        : pointer.current.y * parallax * 0.6 +
          Math.cos(t * 0.12) * 0.07 * s.spin);
    r.rotation.y += (targetY - r.rotation.y) * dr;
    r.rotation.x += (targetX - r.rotation.x) * dr;
    r.rotation.z += (s.rz - r.rotation.z) * dr;

    if (rim.current) rim.current.intensity = 60 * s.light;
    if (key.current) key.current.intensity = 42 * s.light;
    if (fill.current) fill.current.intensity = 30 * s.light;
    // sparkles have a fixed-opacity shader — hide them when the object dims
    if (sparkles.current) sparkles.current.visible = s.opacity > 0.45;
  });

  return (
    <group ref={mover}>
      <group ref={spinner}>
        <Monolith reduced={reduced} body={palette.body} />
        {!reduced && !lowPower && (
          <group ref={sparkles}>
            <Sparkles
              count={70}
              scale={[5.5, 4.5, 3.5]}
              size={2.2}
              speed={0.3}
              opacity={0.5}
              color={palette.key}
            />
          </group>
        )}
      </group>
      {/* LIGHTS — oxblood rim + ember key + warm fill, riding along */}
      <pointLight
        ref={rim}
        position={[-4, 3, 2]}
        intensity={45}
        color={palette.rim}
      />
      <pointLight
        ref={key}
        position={[4, -2, 3]}
        intensity={30}
        color={palette.key}
      />
      <pointLight
        ref={fill}
        position={[0, 4, -3]}
        intensity={20}
        color={palette.fill}
      />
    </group>
  );
}

/*
  Under frameloop="demand" (reduced motion) R3F renders only on invalidate().
  Pump a few frames on mount so the static frame and the baked Environment
  actually paint.
*/
function Warmup({ trigger }: { trigger: string }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    void trigger; // re-pump whenever the palette changes
    let raf = 0;
    let n = 0;
    const pump = () => {
      invalidate();
      if (++n < 10) raf = requestAnimationFrame(pump);
    };
    pump();
    return () => cancelAnimationFrame(raf);
  }, [invalidate, trigger]);
  return null;
}

export default function TravelingScene({
  reduced,
  lowPower,
}: {
  reduced: boolean;
  lowPower: boolean;
}) {
  const [dpr, setDpr] = useState(1.5);
  const palette = useScenePalette();
  // theme swaps are rare: remounting the baked Environment (and repainting
  // the demand-mode frame) via this key is cheaper than re-baking per frame
  const paletteKey = `${palette.rim}${palette.key}${palette.fill}${palette.env}`;

  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA.z], fov: CAMERA.fov }}
      dpr={reduced || lowPower ? 1 : dpr}
      frameloop={reduced ? "demand" : "always"}
      performance={{ min: 0.5 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      {reduced && <Warmup trigger={paletteKey} />}
      {!reduced && !lowPower && (
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />
      )}

      <ambientLight intensity={0.4} />
      <TravelGroup reduced={reduced} lowPower={lowPower} palette={palette} />

      {/* Reflections for the metal — lightformers only, no network HDRI.
          Baked ONCE (frames={1}): static formers, re-baking would double the
          per-frame cost for an identical cubemap. The key remounts it on
          theme changes so the bake picks up the new palette. */}
      <Environment key={paletteKey} resolution={128} frames={1}>
        <color attach="background" args={[palette.env]} />
        {/* wrap-around fill: formers on every side so no rotation leaves a
            face unlit — the metal reads across the whole turn, not just when
            it happens to point at the key light */}
        <Lightformer
          form="rect"
          intensity={3.4}
          color={palette.rim}
          position={[-3, 2, 3]}
          scale={[4, 6, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.6}
          color={palette.key}
          position={[3, -1, 2]}
          scale={[3, 4, 1]}
        />
        <Lightformer
          form="circle"
          intensity={2.0}
          color={palette.fill}
          position={[0, 3, -2]}
          scale={[3, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.8}
          color={palette.fill}
          position={[0, -3, 3]}
          scale={[5, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          color={palette.key}
          position={[-3, -1, -3]}
          scale={[4, 4, 1]}
        />
      </Environment>
    </Canvas>
  );
}
