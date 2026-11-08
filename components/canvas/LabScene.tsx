"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;
  void main() {
    vec3 p = position;
    float d = sin(p.x * 3.0 + uTime * 1.5) * sin(p.y * 3.0 + uTime) * sin(p.z * 3.0 + uTime * 1.2);
    d *= 0.12 + uHover * 0.18;
    p += normal * d;
    vDisp = d;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = normalize(-mv.xyz);
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;
  void main() {
    float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.5);
    vec3 col = mix(uColorB, uColorA, smoothstep(-0.12, 0.18, vDisp));
    col += fres * vec3(1.0, 0.95, 0.9) * 0.9;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Knot() {
  const mesh = useRef<THREE.Mesh>(null!);
  const hover = useRef(0);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uColorA: { value: new THREE.Color("#E10600") },
      uColorB: { value: new THREE.Color("#0A0A0A") },
    }),
    []
  );

  useFrame((state, d) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, hover.current, 0.05);
    mesh.current.rotation.x += d * 0.15;
    mesh.current.rotation.y += d * 0.25;
  });

  return (
    <Float speed={1.5} floatIntensity={0.6}>
      <mesh ref={mesh} onPointerOver={() => (hover.current = 1)} onPointerOut={() => (hover.current = 0)}>
        <torusKnotGeometry args={[1.2, 0.4, 320, 48]} />
        <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
      </mesh>
    </Float>
  );
}

export default function LabScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
      <Knot />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.4} intensity={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
