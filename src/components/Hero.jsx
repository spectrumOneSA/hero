import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import HeroText from "./HeroText";
import CameraRig from "./CameraRig";
import "../styles/hero.scss";

export default function Hero() {
  return (
    <section className="hero">

      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <CameraRig />
        <Scene />
      </Canvas>

      <HeroText />

    </section>
  );
}