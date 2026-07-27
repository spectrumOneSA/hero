import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";

export default function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    const targetX = mouse.x * 0.35;
    const targetY = mouse.y * 0.20;

    camera.position.x = MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, 0.04);

    camera.position.x += Math.sin(t * 0.18) * 0.0008;
    camera.position.y += Math.cos(t * 0.14) * 0.0005;

    camera.position.z = 8 + Math.sin(t * 0.30) * 0.15;

    camera.lookAt(0, 0, 0);
  });

  return null;
}