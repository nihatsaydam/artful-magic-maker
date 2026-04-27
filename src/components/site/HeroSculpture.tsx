import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroSculpture — low-poly stylized "head/helmet" sculpt.
 *
 * Features:
 *  - Cursor-tracked spring rotation
 *  - Scroll-driven scale + extra rotation (the sculpt "docks" upward as you scroll)
 *  - Time-of-day theme cycling (night → twilight → dawn) drives light colors
 */

type TimeTheme = {
  name: "night" | "twilight" | "dawn";
  rim: string; // warm rim light color
  fill: string; // cool fill light color
  point: string; // accent point light
  emissive: string; // inner core / eyes / ring emissive
  envPreset: "night" | "sunset" | "dawn";
};

const THEMES: TimeTheme[] = [
  {
    name: "night",
    rim: "#ff3040",
    fill: "#5060ff",
    point: "#ff2030",
    emissive: "#ff1525",
    envPreset: "night",
  },
  {
    name: "twilight",
    rim: "#ff5e7a",
    fill: "#7a5cff",
    point: "#ff4060",
    emissive: "#ff3a5c",
    envPreset: "sunset",
  },
  {
    name: "dawn",
    rim: "#ffb27a",
    fill: "#ff7aa8",
    point: "#ff7050",
    emissive: "#ff6a4a",
    envPreset: "dawn",
  },
];

// Smoothly interpolate between hex colors.
function lerpHex(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 255;
  const ag = (ah >> 8) & 255;
  const ab = ah & 255;
  const br = (bh >> 16) & 255;
  const bg = (bh >> 8) & 255;
  const bb = bh & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const b2 = Math.round(ab + (bb - ab) * t);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b2).toString(16).slice(1)}`;
}

function Sculpt({
  pointer,
  scroll,
  emissive,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  emissive: string;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    // Spring toward pointer (normalized -1..1)
    const targetY = pointer.current.x * 0.6;
    const targetX = pointer.current.y * 0.35;
    group.current.rotation.y +=
      (targetY - group.current.rotation.y) * Math.min(1, dt * 3.5);
    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * Math.min(1, dt * 3.5);
    // Slow idle spin
    group.current.rotation.y += dt * 0.05;

    // Scroll-driven: shrink + lift + extra tilt as the page scrolls.
    const s = scroll.current; // 0..1
    const scale = 1 - s * 0.45; // 1 → 0.55
    group.current.scale.setScalar(scale);
    group.current.position.y = s * 0.6; // lift up
    group.current.rotation.z = s * 0.35; // gentle dutch tilt
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
          color={emissive}
          emissive={emissive}
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
          color={emissive}
          emissive={emissive}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.32, 0.05, 1.0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial
          color={emissive}
          emissive={emissive}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Decorative orbiting ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[1.55, 0.018, 8, 64]} />
        <meshStandardMaterial
          color={emissive}
          emissive={emissive}
          emissiveIntensity={1.2}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, -0.3]}>
        <torusGeometry args={[1.7, 0.012, 8, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={emissive}
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
  theme,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  theme: TimeTheme;
}) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 3, 5]}
        intensity={1.2}
        color={theme.rim}
        castShadow
      />
      <directionalLight position={[-5, -2, -3]} intensity={0.5} color={theme.fill} />
      <pointLight position={[0, 0, 3]} intensity={1.2} color={theme.point} distance={6} />

      <Float floatIntensity={0.6} rotationIntensity={0.2} speed={1.2}>
        <Sculpt pointer={pointer} scroll={scroll} emissive={theme.emissive} />
      </Float>

      <Environment preset={theme.envPreset} />
    </>
  );
}

export default function HeroSculpture() {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  // Time theme cycles every ~9s with smooth interpolation.
  const [progress, setProgress] = useState(0); // 0..THEMES.length (loops)

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsedSec = (now - start) / 1000;
      const cycleSec = 9; // seconds per theme
      setProgress((elapsedSec / cycleSec) % THEMES.length);
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
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Interpolate between two themes for the current progress.
  const i = Math.floor(progress) % THEMES.length;
  const t = progress - Math.floor(progress);
  const a = THEMES[i];
  const b = THEMES[(i + 1) % THEMES.length];
  const theme: TimeTheme = {
    name: a.name,
    envPreset: t < 0.5 ? a.envPreset : b.envPreset,
    rim: lerpHex(a.rim, b.rim, t),
    fill: lerpHex(a.fill, b.fill, t),
    point: lerpHex(a.point, b.point, t),
    emissive: lerpHex(a.emissive, b.emissive, t),
  };

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
          <Scene pointer={pointer} scroll={scroll} theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  );
}
