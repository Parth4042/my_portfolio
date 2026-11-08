"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { sphereSkills } from "@/lib/data";

const R = 2.6;

function Tag({ position, label }: { position: THREE.Vector3; label: string }) {
  const g = useRef<THREE.Group>(null!);
  const div = useRef<HTMLDivElement>(null);
  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    g.current.getWorldPosition(v);
    const o = THREE.MathUtils.mapLinear(v.z, -R, R, 0.12, 1);
    if (div.current) {
      div.current.style.opacity = o.toFixed(2);
      div.current.style.transform = `scale(${(0.7 + o * 0.45).toFixed(2)})`;
      div.current.style.color = o > 0.85 ? "#E10600" : "#F4F1EC";
    }
  });

  return (
    <group ref={g} position={position}>
      <Html center zIndexRange={[10, 0]}>
        <div ref={div} data-cursor="hover" className="select-none whitespace-nowrap font-mono text-xs font-medium uppercase tracking-widest md:text-sm">
          {label}
        </div>
      </Html>
    </group>
  );
}

function Cloud() {
  const group = useRef<THREE.Group>(null!);
  const points = useMemo(() => {
    const n = sphereSkills.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return sphereSkills.map((label, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      return { label, pos: new THREE.Vector3(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R) };
    });
  }, []);

  useFrame((state, d) => {
    group.current.rotation.y += d * (0.15 + state.pointer.x * 0.4);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.5, 0.05);
  });

  return (
    <group ref={group}>
      {points.map((p) => (
        <Tag key={p.label} label={p.label} position={p.pos} />
      ))}
      <mesh>
        <sphereGeometry args={[R * 0.55, 24, 24]} />
        <meshBasicMaterial color="#E10600" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 0.25, 32, 32]} />
        <meshBasicMaterial color="#E10600" />
      </mesh>
    </group>
  );
}

export default function SkillsSphere() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7.5], fov: 45 }} gl={{ alpha: true }}>
      <Cloud />
    </Canvas>
  );
}
