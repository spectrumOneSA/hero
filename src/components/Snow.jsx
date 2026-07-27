import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Snow() {
  const points = useRef();

  const COUNT = 200;

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;      // X
      positions[i * 3 + 1] = Math.random() * 20 - 10;      // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;   // Z

      speeds[i] = 0.15 + Math.random() * 0.25;
    }

    return {
      positions,
      speeds,
    };
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;

    const array = points.current.geometry.attributes.position.array;

    for (let i = 0; i < COUNT; i++) {
      array[i * 3 + 1] -= speeds[i] * delta;

      array[i * 3] += Math.sin(array[i * 3 + 1] * 0.5) * delta * 0.03;

      if (array[i * 3 + 1] < -10) {
        array[i * 3 + 1] = 10;

        array[i * 3] = (Math.random() - 0.5) * 30;
        array[i * 3 + 2] = (Math.random() - 0.5) * 18;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.021}
        opacity={0.45}
        transparent
        depthWrite={false}
      />
    </points>
  );
}