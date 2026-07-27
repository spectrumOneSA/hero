import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Stars() {
  const group = useRef();
  const stars = useRef();

  const positions = useMemo(() => {
    const count = 10000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const brightness = 0.25 + Math.random() * 0.75;

      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness;
      colors[i * 3 + 2] = brightness;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !stars.current) return;

    // Slow orbit of the entire star field
    group.current.rotation.z += delta * 0.020;

    // Mouse parallax
    stars.current.rotation.y = state.mouse.x * 0.03;
    stars.current.rotation.x = state.mouse.y * 0.03;
  });

  return (
    <group ref={group}>
      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions.positions}
            count={positions.positions.length / 3}
            itemSize={3}
          />

          <bufferAttribute
            attach="attributes-color"
            array={positions.colors}
            count={positions.colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          color="white"
          vertexColors
          size={0.012}
          transparent
          opacity={0.65}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}