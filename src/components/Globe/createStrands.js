import * as THREE from "three";
import { SPHERE_RADIUS } from "./constants";

export const STRAND_COUNT = 22;
export const SEGMENTS = 120;

export default function createStrands() {
  const strands = [];

  for (let s = 0; s < STRAND_COUNT; s++) {
    const theta =
        (s / STRAND_COUNT) * Math.PI * 2 +
        (Math.random() - 0.5) * 0.35;

    const points = [];

    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;

      const phi = t * Math.PI;

      // Drift sideways
      const wave =
        Math.sin(phi * 2.5 + s * 1.7) * 0.22 +
        Math.cos(phi * 5 + s) * 0.08;

      const angle = theta + wave;

      const x =
        SPHERE_RADIUS *
        Math.sin(phi) *
        Math.cos(angle);

      const y =
        SPHERE_RADIUS *
        Math.cos(phi);

      const z =
        SPHERE_RADIUS *
        Math.sin(phi) *
        Math.sin(angle);

      points.push(new THREE.Vector3(x, y, z));
    }

    strands.push(
      new THREE.CatmullRomCurve3(points)
    );
  }

  return strands;
}