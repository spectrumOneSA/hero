export default function Connections({ lines }) {
  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={lines}
          count={lines.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <lineBasicMaterial
        color="#9dff00"
        transparent
        opacity={0.025}
      />
    </lineSegments>
  );
}