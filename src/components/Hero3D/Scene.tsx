"use client";

/*
  Hero centerpiece — a faceted metal monolith lit in oxblood, slowly turning
  over the plasma. Precision-object register (watchmaker / engine part), not a
  toy. All palette values are hard-coded hexes here: WebGL can't read the OKLCH
  design tokens, so these mirror the brand hue (~25) by hand. Swap points:
    - OBJECT  → the <Monolith> geometry/material
    - LIGHTS  → rim (oxblood) + key (warm) + fill
    - CAMERA  → parallax strength + idle drift in <Rig>
*/

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Float,
  Sparkles,
  PerformanceMonitor,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

const OXBLOOD = "#b02a2e";
const EMBER = "#e0623a";
const WARM = "#ffd9c0";

function Monolith({ reduced }: { reduced: boolean }) {
  const mesh = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    // slow, continuous turn on two axes — reads as "displayed on a plinth"
    const speed = reduced ? 0 : 1;
    mesh.current.rotation.y += delta * 0.18 * speed;
    mesh.current.rotation.x += delta * 0.05 * speed;
    if (reduced) {
      // one deliberate resting angle under reduced motion
      mesh.current.rotation.y = 0.6;
      mesh.current.rotation.x = 0.25;
    }
    void state;
  });

  return (
    <Float
      speed={reduced ? 0 : 1.1}
      rotationIntensity={reduced ? 0 : 0.25}
      floatIntensity={reduced ? 0 : 0.6}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={mesh} scale={1.35}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#1c1113"
          metalness={1}
          roughness={0.22}
          flatShading
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

function Rig({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();
  useFrame((state, delta) => {
    if (!group.current) return;
    // damped pointer parallax + slow idle drift
    const t = state.clock.elapsedTime;
    const driftX = reduced ? 0 : Math.sin(t * 0.15) * 0.12;
    const driftY = reduced ? 0 : Math.cos(t * 0.12) * 0.08;
    const targetX = reduced ? 0 : pointer.x * 0.35 + driftX;
    const targetY = reduced ? 0 : pointer.y * 0.25 + driftY;
    const damp = 1 - Math.pow(0.001, delta);
    group.current.rotation.y += (targetX - group.current.rotation.y) * damp;
    group.current.rotation.x += (-targetY - group.current.rotation.x) * damp;
  });
  return (
    <group ref={group}>
      <Monolith reduced={reduced} />
    </group>
  );
}

/*
  Under frameloop="demand" R3F renders only when invalidate() is called. Pump a
  few frames on mount / prop change so the static (reduced-motion or paused)
  frame — and the baked Environment — actually paint.
*/
function Warmup({ trigger }: { trigger: unknown }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let raf = 0;
    let n = 0;
    const pump = () => {
      invalidate();
      if (++n < 8) raf = requestAnimationFrame(pump);
    };
    pump();
    return () => cancelAnimationFrame(raf);
  }, [invalidate, trigger]);
  return null;
}

export default function HeroScene({
  reduced = false,
  active = true,
}: {
  reduced?: boolean;
  active?: boolean;
}) {
  const [dpr, setDpr] = useState<number>(1.5);
  const running = active && !reduced;

  return (
    <Canvas
      className="absolute! inset-0"
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={reduced ? 1 : dpr}
      frameloop={running ? "always" : "demand"}
      performance={{ min: 0.5 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      <Warmup trigger={`${reduced}-${active}-${dpr}`} />
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />

      {/* LIGHTS */}
      <ambientLight intensity={0.25} />
      <spotLight
        position={[-4, 3, 2]}
        angle={0.6}
        penumbra={1}
        intensity={40}
        color={OXBLOOD}
      />
      <pointLight position={[4, -2, 3]} intensity={30} color={EMBER} />
      <pointLight position={[0, 4, -3]} intensity={20} color={WARM} />

      <Rig reduced={reduced} />

      {!reduced && (
        <Sparkles
          count={18}
          scale={[6, 4, 3]}
          size={2.2}
          speed={0.3}
          opacity={0.5}
          color={EMBER}
        />
      )}

      {/* Reflections for the metal — lightformers only, no network HDRI.
          Baked ONCE (frames={1}): the lightformers are static, so re-baking
          every frame just doubled the render cost for an identical cubemap. */}
      <Environment resolution={128} frames={1}>
        <color attach="background" args={["#0b0708"]} />
        <Lightformer
          form="rect"
          intensity={2.4}
          color={OXBLOOD}
          position={[-3, 2, 3]}
          scale={[4, 6, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          color={EMBER}
          position={[3, -1, 2]}
          scale={[3, 4, 1]}
        />
        <Lightformer
          form="circle"
          intensity={1.2}
          color={WARM}
          position={[0, 3, -2]}
          scale={[3, 3, 1]}
        />
      </Environment>
    </Canvas>
  );
}
