import * as THREE from "three";
import useGlobeEngine from "./useGlobeEngine";
import Strands from "./Strands";
import SignalParticles from "./SignalParticles";

export default function Globe({ mobile }) {
    const {
        group,
        positions,
        particleCount,
    } = useGlobeEngine();

    return (
        <group
            ref={group}
            position={mobile ? [0, -5.1, 0] : [4.6, 0, 0]}
            scale={mobile ? 0.75 : 0.90}
        >
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={particleCount}
                        itemSize={3}
                    />
                </bufferGeometry>

                <pointsMaterial color={mobile ? "#243a01" : "#457000"}
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