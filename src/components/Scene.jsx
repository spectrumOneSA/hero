import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Globe from "./Globe/Globe";
import Stars from "./Stars";
import Snow from "./Snow";

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.12} />

      <pointLight
        position={[4, 3, 6]}
        color="#9dff00"
        intensity={0.45}
        distance={20}
        decay={2}
      />

      <pointLight
        position={[-5, -2, -4]}
        color="#4d79ff"
        intensity={0.08}
        distance={20}
        decay={2}
      />

      <pointLight
        position={[0, 5, -8]}
        color="#ffffff"
        intensity={0.05}
        distance={20}
        decay={2}
      />

      <Stars />
      <Snow />
      <Globe />

      <EffectComposer>
        <Bloom
          intensity={0.45}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}