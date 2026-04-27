import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroSculpture — low-poly stylized "head/helmet" sculpt.
 * Built procedurally from primitives (icosahedron + cones + rings) so we
 * don't ship any GLB. Tracks the cursor with a soft spring rotation,
 * lit with a warm rim light to match the hero's red palette.
 */

function Sculpt({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    // Spring toward pointer (normalized -1..1)
    const targetY = pointer.current.x * 0.6;
    const targetX = pointer.current.y * 0.35;
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, dt * 3.5);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, dt * 3.5);
    // Slow idle spin
    group.current.rotation.y += dt * 0.05;
  });

  return (
    <group ref={group}>
      {/* Core skull/helmet — low-poly icosahedron with subtle distortion */}
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.15, 1]} />
        <MeshDistortMaterial
          color="#1a1a1a"
          roughness={0.35}
          metalness={0.85}
          distort={0.18}
          speed={1.2}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* Inner glowing core (visible through the faceted cracks) */}
      <mesh scale={0.78}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ff2030"
          emissive="#ff1525"
          emissiveIntensity={1.4}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Forehead horn */}
      <mesh position={[0, 1.1, 0.15]} rotation={[-0.2, 0, 0]} castShadow>
        <coneGeometry args={[0.18, 0.7, 6]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Side horns (samurai-style) */}
      <mesh position={[-0.95, 0.55, 0]} rotation={[0, 0, 0.9]} castShadow>
        <coneGeometry args={[0.14, 0.55, 6]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0.95, 0.55, 0]} rotation={[0, 0, -0.9]} castShadow>
        <coneGeometry args={[0.14, 0.55, 6]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Glowing eye sockets */}
      <mesh position={[-0.32, 0.05, 1.0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial
          color="#ff3040"
          emissive="#ff1020"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.32, 0.05, 1.0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial
          color="#ff3040"
          emissive="#ff1020"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Decorative orbiting ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[1.55, 0.018, 8, 64]} />
        <meshStandardMaterial
          color="#ff2030"
          emissive="#ff1525"
          emissiveIntensity={1.2}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, -0.3]}>
        <torusGeometry args={[1.7, 0.012, 8, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ff5060"
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

function Scene({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      {/* Lights — warm red rim + cool fill, matches hero palette */}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 3, 5]}
        intensity={1.2}
        color="#ff3040"
        castShadow
      />
      <directionalLight position={[-5, -2, -3]} intensity={0.5} color="#5060ff" />
      <pointLight position={[0, 0, 3]} intensity={1.2} color="#ff2030" distance={6} />

      <Float floatIntensity={0.6} rotationIntensity={0.2} speed={1.2}>
        <Sculpt pointer={pointer} />
      </Float>

      <Environment preset="night" />
    </>
  );
}

export default function HeroSculpture() {
  const pointer = useRef({ x: 0, y: 0 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  const handleLeave = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="absolute inset-0"
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}
