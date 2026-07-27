import { useRef, useMemo } from "react";
import * as THREE from "three";
import useGlobeEngine from "./useGlobeEngine";
import Strands from "./Strands";
import SignalParticles from "./SignalParticles";

export default function Globe() {
    const {
        group,
        positions,
        particleCount,
    } = useGlobeEngine();

    return (
        <group ref={group} position={[4.6, 0, 0]} scale={0.90}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={particleCount}
                        itemSize={3}
                    />
                </bufferGeometry>

                <pointsMaterial
                    color="#457000"
                    size={0.04}
                    transparent
                    opacity={0.9}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    sizeAttenuation
                />
            </points>

            <Strands />
            <SignalParticles />
        </group>
    );
}