"use client";
import { MutableRefObject, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { pipelineStages } from "@/lib/data";

type P = MutableRefObject<number>;
const lerp = THREE.MathUtils.lerp;

function makeCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(-5, 1.2, -1),
    new THREE.Vector3(0, -0.6, 0),
    new THREE.Vector3(5, 1.2, -1),
    new THREE.Vector3(10, 0, 0),
  ]);
}

function NodeGeometry({ kind }: { kind: number }) {
  switch (kind) {
    case 0: return <cylinderGeometry args={[0.6, 0.6, 1, 32]} />;
    case 1: return <boxGeometry args={[1, 1, 1]} />;
    case 2: return <octahedronGeometry args={[0.8, 0]} />;
    case 3: return <dodecahedronGeometry args={[0.75, 0]} />;
    default: return <torusKnotGeometry args={[0.5, 0.16, 120, 16]} />;
  }
}

function StageNode({ position, index, progress, label }: {
  position: THREE.Vector3; index: number; progress: P; label: string;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);
  const wire = useRef<THREE.Mesh>(null!);

  useFrame((_, d) => {
    const active = Math.abs(progress.current * (pipelineStages.length - 1) - index) < 0.5;
    const s = lerp(mesh.current.scale.x, active ? 1.35 : 0.9, 0.08);
    mesh.current.scale.setScalar(s);
    wire.current.scale.setScalar(s * 1.45);
    mesh.current.rotation.y += d * (active ? 1.2 : 0.3);
    mesh.current.rotation.x += d * 0.2;
    wire.current.rotation.y -= d * 0.4;
    mat.current.emissiveIntensity = lerp(mat.current.emissiveIntensity, active ? 2.2 : 0.05, 0.08);
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <NodeGeometry kind={index} />
        <meshStandardMaterial ref={mat} color="#1a1a1a" emissive="#E10600" emissiveIntensity={0.05} metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color="#F4F1EC" wireframe transparent opacity={0.12} />
      </mesh>
      <Html center position={[0, -1.6, 0]} zIndexRange={[10, 0]}>
        <div className="whitespace-nowrap font-mono text-[10px] tracking-[0.3em] text-bone/80">
          <span className="text-blood">0{index + 1}</span> {label}
        </div>
      </Html>
    </group>
  );
}

function Flow({ curve, count = 180 }: { curve: THREE.CatmullRomCurve3; count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        o: Math.random(),
        s: 0.03 + Math.random() * 0.05,
        j: new THREE.Vector3((Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4),
      })),
    [count]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      const u = (p.o + t * p.s) % 1;
      dummy.position.copy(curve.getPointAt(u)).add(p.j);
      dummy.scale.setScalar(0.03 + Math.sin(u * Math.PI) * 0.035);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#FF3B30" toneMapped={false} />
    </instancedMesh>
  );
}

function Rig({ curve, progress }: { curve: THREE.CatmullRomCurve3; progress: P }) {
  const look = useMemo(() => curve.getPointAt(0).clone(), [curve]);
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const pt = curve.getPointAt(p);
    target.set(pt.x + state.pointer.x * 0.6, pt.y + 1.4 + state.pointer.y * 0.4, pt.z + 6.5);
    state.camera.position.lerp(target, 0.06);
    look.lerp(pt, 0.08);
    state.camera.lookAt(look);
  });
  return null;
}

function Scene({ progress }: { progress: P }) {
  const curve = useMemo(makeCurve, []);
  const n = pipelineStages.length;
  return (
    <>
      <color attach="background" args={["#0A0A0A"]} />
      <fog attach="fog" args={["#0A0A0A", 6, 22]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 6, 4]} intensity={1.2} />
      <pointLight position={[0, 3, 3]} intensity={20} color="#E10600" />
      <mesh>
        <tubeGeometry args={[curve, 240, 0.025, 8, false]} />
        <meshBasicMaterial color="#F4F1EC" transparent opacity={0.25} />
      </mesh>
      {pipelineStages.map((s, i) => (
        <StageNode key={s.name} index={i} label={s.name} progress={progress} position={curve.getPointAt(i / (n - 1))} />
      ))}
      <Flow curve={curve} />
      <gridHelper args={[80, 80, "#E10600", "#1f1f1f"]} position={[0, -2.5, 0]} />
      <Rig curve={curve} progress={progress} />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.3} intensity={1.1} />
      </EffectComposer>
    </>
  );
}

export default function PipelineScene({ progress }: { progress: P }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [-10, 1.5, 6.5], fov: 50 }}>
      <Scene progress={progress} />
    </Canvas>
  );
}
