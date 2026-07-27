import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import createSphere, { PARTICLE_COUNT } from "./createSphere";

import {
  FLOAT_AMOUNT,
  FLOAT_SPEED,
} from "./constants";

export default function useGlobeEngine() {
  const group = useRef();

  const basePositions = useMemo(() => createSphere(), []);
  const positions = useMemo(() => createSphere(), []);

  useFrame((state, delta) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;

    // Continuous rotation with slight speed variation
    // Around 4 degrees per second
    const rotationSpeed = 0.065 + Math.sin(time * 0.08) * 0.008;

    group.current.rotation.y += delta * rotationSpeed;

    // Floating
    group.current.position.y =
      Math.sin(time * FLOAT_SPEED) *
      FLOAT_AMOUNT;

    // Particle animation
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const index = i * 3;

      const x = basePositions[index];
      const y = basePositions[index + 1];
      const z = basePositions[index + 2];

      const length = Math.sqrt(x * x + y * y + z * z);

      const nx = x / length;
      const ny = y / length;
      const nz = z / length;

      const offset =
        Math.sin(time * 2 + i * 0.05) * 0.08;

      positions[index] = x + nx * offset;
      positions[index + 1] = y + ny * offset;
      positions[index + 2] = z + nz * offset;
    }

    group.current.children[0].geometry.attributes.position.needsUpdate = true;
  });

  return {
    group,
    positions,
    particleCount: PARTICLE_COUNT,
  };
}