import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroSculpture — low-poly stylized "head/helmet" sculpt.
 *
 * Features:
 *  - Cursor-tracked spring rotation
 *  - Scroll-driven scale + extra rotation (the sculpt "docks" upward as you scroll)
 *  - Idle "anger" outburst after 5s of no pointer movement (shake + flash)
 */

// Original night palette (restored).
const PALETTE = {
  rim: "#ff3040",
  fill: "#5060ff",
  point: "#ff2030",
  emissive: "#ff1525",
  envPreset: "night" as const,
};

function Sculpt({
  pointer,
  scroll,
  anger,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  anger: React.MutableRefObject<number>; // 0..1 ramp during outbursts
}) {
  const group = useRef<THREE.Group>(null);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const leftEyeMat = useRef<THREE.MeshStandardMaterial>(null);
  const rightEyeMat = useRef<THREE.MeshStandardMaterial>(null);
  const leftAngryEye = useRef<THREE.Mesh>(null);
  const rightAngryEye = useRef<THREE.Mesh>(null);
  const leftAngryMat = useRef<THREE.MeshStandardMaterial>(null);
  const rightAngryMat = useRef<THREE.MeshStandardMaterial>(null);
  const boltGroup = useRef<THREE.Group>(null);
  const boltLeftMat = useRef<THREE.MeshStandardMaterial>(null);
  const boltRightMat = useRef<THREE.MeshStandardMaterial>(null);
  const angerLight = useRef<THREE.PointLight>(null);
  const t = useRef(0);

  useFrame((_, dt) => {
    if (!group.current) return;
    t.current += dt;

    // Anger shake (decays with anger value)
    const a = anger.current;
    const shakeX = a > 0 ? Math.sin(t.current * 38) * 0.08 * a : 0;
    const shakeY = a > 0 ? Math.cos(t.current * 44) * 0.08 * a : 0;
    const shakeZ = a > 0 ? Math.sin(t.current * 30) * 0.05 * a : 0;

    // Spring toward pointer (normalized -1..1)
    const targetY = pointer.current.x * 0.6 + shakeY;
    const targetX = pointer.current.y * 0.35 + shakeX;
    group.current.rotation.y +=
      (targetY - group.current.rotation.y) * Math.min(1, dt * 3.5);
    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * Math.min(1, dt * 3.5);
    // Slow idle spin
    group.current.rotation.y += dt * 0.05;

    // Scroll-driven: shrink + lift + extra tilt as the page scrolls.
    const s = scroll.current; // 0..1
    const scaleBase = 1 - s * 0.45; // 1 → 0.55
    const angerPulse = a > 0 ? 1 + Math.sin(t.current * 18) * 0.04 * a : 1;
    group.current.scale.setScalar(scaleBase * angerPulse);
    group.current.position.y = s * 0.6;
    group.current.position.x = shakeX * 0.5;
    group.current.rotation.z = s * 0.35 + shakeZ;

    // Anger glow flash on emissive materials
    const baseIntensity = 1.4;
    const flash = a > 0 ? 1 + Math.sin(t.current * 22) * 0.5 * a + a * 1.2 : 1;
    if (coreMat.current) coreMat.current.emissiveIntensity = baseIntensity * flash;

    // Eye swap: round glowing eyes fade out, flat angry slits fade in.
    const calm = 1 - a;
    if (leftEye.current) leftEye.current.visible = calm > 0.05;
    if (rightEye.current) rightEye.current.visible = calm > 0.05;
    if (leftEyeMat.current) leftEyeMat.current.emissiveIntensity = 3 * calm;
    if (rightEyeMat.current) rightEyeMat.current.emissiveIntensity = 3 * calm;

    if (leftAngryEye.current) {
      leftAngryEye.current.visible = a > 0.05;
      leftAngryEye.current.scale.x = 1 + a * 0.3;
      leftAngryEye.current.scale.y = 0.4 + a * 0.6;
    }
    if (rightAngryEye.current) {
      rightAngryEye.current.visible = a > 0.05;
      rightAngryEye.current.scale.x = 1 + a * 0.3;
      rightAngryEye.current.scale.y = 0.4 + a * 0.6;
    }
    if (leftAngryMat.current)
      leftAngryMat.current.emissiveIntensity = 6 * a * (0.7 + Math.sin(t.current * 30) * 0.3);
    if (rightAngryMat.current)
      rightAngryMat.current.emissiveIntensity = 6 * a * (0.7 + Math.sin(t.current * 30) * 0.3);

    // Lightning bolts above the head — only when angry, with strobe flicker.
    if (boltGroup.current) {
      boltGroup.current.visible = a > 0.05;
      boltGroup.current.rotation.z = Math.sin(t.current * 14) * 0.15 * a;
    }
    const strobe = Math.random() > 0.35 ? 1 : 0.15;
    if (boltLeftMat.current)
      boltLeftMat.current.emissiveIntensity = 8 * a * strobe;
    if (boltRightMat.current)
      boltRightMat.current.emissiveIntensity =
        8 * a * (Math.random() > 0.35 ? 1 : 0.15);

    if (angerLight.current) {
      angerLight.current.intensity = 4 * a * strobe;
    }
  });


  return (
    <group ref={group}>
      {/* Core skull/helmet */}
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

      {/* Inner glowing core */}
      <mesh scale={0.78}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          ref={coreMat}
          color={PALETTE.emissive}
          emissive={PALETTE.emissive}
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

      {/* Side horns */}
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
          ref={leftEye}
          color={PALETTE.emissive}
          emissive={PALETTE.emissive}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.32, 0.05, 1.0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial
          ref={rightEye}
          color={PALETTE.emissive}
          emissive={PALETTE.emissive}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Decorative orbiting rings */}
      <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[1.55, 0.018, 8, 64]} />
        <meshStandardMaterial
          color={PALETTE.emissive}
          emissive={PALETTE.emissive}
          emissiveIntensity={1.2}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, -0.3]}>
        <torusGeometry args={[1.7, 0.012, 8, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={PALETTE.emissive}
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

function Scene({
  pointer,
  scroll,
  anger,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  anger: React.MutableRefObject<number>;
}) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 3, 5]}
        intensity={1.2}
        color={PALETTE.rim}
        castShadow
      />
      <directionalLight position={[-5, -2, -3]} intensity={0.5} color={PALETTE.fill} />
      <pointLight position={[0, 0, 3]} intensity={1.2} color={PALETTE.point} distance={6} />

      <Float floatIntensity={0.6} rotationIntensity={0.2} speed={1.2}>
        <Sculpt pointer={pointer} scroll={scroll} anger={anger} />
      </Float>

      <Environment preset={PALETTE.envPreset} />
    </>
  );
}

export default function HeroSculpture() {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const anger = useRef(0);
  const lastMove = useRef(performance.now());
  const outburstUntil = useRef(0);

  // Idle detection — trigger an "anger" outburst after 5s without movement.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      const idleMs = now - lastMove.current;

      if (idleMs > 5000 && now > outburstUntil.current) {
        // Start a ~1.4s outburst
        outburstUntil.current = now + 1400;
        // Reset idle clock so it can re-trigger after the next 5s of stillness
        lastMove.current = now + 1400;
      }

      // Anger value ramps to 1 during outburst, decays after.
      if (now < outburstUntil.current) {
        anger.current = Math.min(1, anger.current + 0.08);
      } else {
        anger.current = Math.max(0, anger.current - 0.04);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Scroll progress within the hero (clamped 0..1).
  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight * 0.9;
      scroll.current = Math.min(1, Math.max(0, window.scrollY / max));
      lastMove.current = performance.now();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    lastMove.current = performance.now();
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
          <Scene pointer={pointer} scroll={scroll} anger={anger} />
        </Suspense>
      </Canvas>
    </div>
  );
}
