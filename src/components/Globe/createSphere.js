import { SPHERE_RADIUS } from "./constants";

export const PARTICLE_COUNT = 4000;

export default function createSphere() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);

    const theta = goldenAngle * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    positions[i * 3] = x * SPHERE_RADIUS;
    positions[i * 3 + 1] = y * SPHERE_RADIUS;
    positions[i * 3 + 2] = z * SPHERE_RADIUS;
  }

  return positions;
}