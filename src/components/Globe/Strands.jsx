import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import createStrands, {
  STRAND_COUNT,
  SEGMENTS,
} from "./createStrands";

export default function Strands() {
  const curves = useMemo(() => createStrands(), []);

  const refs = useRef([]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    refs.current.forEach((line, strand) => {
      if (!line) return;

      const curve = curves[strand];

      const points = [];

      for (let i = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS;

        const p = curve.getPoint(t);

        const normal =
          p.clone().normalize();

        const amount =
          Math.sin(
            time * 2 +
            strand +
            t * 10
          ) * 0.08;

        p.add(
          normal.multiplyScalar(amount)
        );

        points.push(p);
      }

      line.geometry.setFromPoints(points);
    });
  });

  return (
    <>
      {curves.map((curve, index) => (
        <line
          key={index}
          ref={(el) => (refs.current[index] = el)}
        >
          <bufferGeometry />
          <lineBasicMaterial
            color="#9dff00"
            transparent
            opacity={0.08}
          />
        </line>
      ))}
    </>
  );
}