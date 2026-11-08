"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

const lerp = THREE.MathUtils.lerp;

function Core() {
  const group = useRef<THREE.Group>(null!);
  const wire = useRef<THREE.Mesh>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = window.scrollY / window.innerHeight; // 0 → 1 across the hero
    const g = group.current;
    g.rotation.y = lerp(g.rotation.y, state.pointer.x * 0.6 + t * 0.1, 0.05);
    g.rotation.x = lerp(g.rotation.x, -state.pointer.y * 0.4, 0.05);
    g.position.y = lerp(g.position.y, scroll * 2.2, 0.1);
    g.position.x = lerp(g.position.x, window.innerWidth > 768 ? 1.6 : 0, 0.05);
    const s = lerp(g.scale.x, 1 + scroll * 0.6, 0.1);
    g.scale.setScalar(s);
    wire.current.rotation.x = t * 0.15;
    wire.current.rotation.z = t * 0.1;
    ringA.current.rotation.x = t * 0.4;
    ringA.current.rotation.y = t * 0.2;
    ringB.current.rotation.y = t * 0.3;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.3, 64]} />
          <MeshDistortMaterial
            color="#E10600"
            emissive="#4a0000"
            roughness={0.15}
            metalness={0.65}
            distort={0.45}
            speed={2.2}
          />
        </mesh>
      </Float>
      <mesh ref={wire}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#F4F1EC" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh ref={ringA}>
        <torusGeometry args={[2.8, 0.01, 16, 220]} />
        <meshBasicMaterial color="#FF3B30" toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.3, 0.006, 16, 220]} />
        <meshBasicMaterial color="#F4F1EC" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function Field({ count, color, size, inner, outer, speed }: {
  count: number; color: string; size: number; inner: number; outer: number; speed: number;
}) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = inner + Math.random() * (outer - inner);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count, inner, outer]);

  useFrame((_, d) => {
    ref.current.rotation.y += d * speed;
    ref.current.rotation.x += d * speed * 0.3;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} opacity={0.8} />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#F4F1EC" />
      <pointLight position={[-4, 2, 3]} intensity={30} color="#FF3B30" />
      <pointLight position={[3, -3, 2]} intensity={12} color="#ffffff" />
      <Core />
      <Field count={2200} color="#F4F1EC" size={0.02} inner={4} outer={14} speed={0.02} />
      <Field count={500} color="#E10600" size={0.035} inner={3} outer={9} speed={-0.03} />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.25} intensity={0.9} />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
