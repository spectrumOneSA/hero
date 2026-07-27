import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import createStrands from "./createStrands";

const SIGNAL_COUNT = 18;

export default function SignalParticles() {
  const curves = useMemo(() => createStrands(), []);
  const refs = useRef([]);

  const signals = useMemo(
    () =>
      Array.from({ length: SIGNAL_COUNT }, (_, i) => ({
        curve: curves[i % curves.length],
        offset: Math.random(),
        speed: 0.08 + Math.random() * 0.08,
      })),
    [curves]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;

      const signal = signals[i];

      const progress = (signal.offset + t * signal.speed) % 1;

      signal.curve.getPoint(progress, mesh.position);
    });
  });

  return (
    <>
      {signals.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color="#22ff00"
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </>
  );
}