import { Sprite, SpriteMaterial } from "@react-three/drei";

export default function Glow() {
  return (
    <Sprite scale={[7.5, 7.5, 1]}>
      <spriteMaterial
        color="#8cff00"
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </Sprite>
  );
}