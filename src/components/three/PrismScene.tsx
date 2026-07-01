'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import styles from './PrismScene.module.css';

interface PrismProps {
  exiting?: boolean;
}

function Prism({ exiting }: PrismProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const geometryRef = useRef<THREE.ConeGeometry>(null);
  
  // Animation state
  const exitProgress = useRef(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subtle auto-rotation
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      if (exiting && materialRef.current) {
        // Play refraction exit animation over 800ms (0.8s)
        exitProgress.current += delta / 0.8;
        const progress = Math.min(exitProgress.current, 1);
        
        // Scale down
        const scale = 1 - (progress * 0.5); // shrink to half size
        meshRef.current.scale.set(scale, scale, scale);
        
        // Opacity fade out
        materialRef.current.transparent = true;
        materialRef.current.opacity = 1 - progress;
      }
    }
  });

  useEffect(() => {
    // Cleanup geometry and materials on unmount
    const geo = geometryRef.current;
    const mat = materialRef.current;
    return () => {
      if (geo) geo.dispose();
      if (mat) mat.dispose();
    };
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* 5-6 faces: radius, height, radialSegments=5 */}
      <coneGeometry ref={geometryRef} args={[1.5, 3, 5]} />
      <meshPhysicalMaterial 
        ref={materialRef}
        transmission={1} 
        roughness={0} 
        thickness={1.5}
        ior={1.5}
        color="#a855f7" // violet tint
      />
    </mesh>
  );
}

// Simple WebGL check
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export default function PrismScene({ exiting = false }: PrismProps) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  if (!hasWebGL) return null;

  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
        <Prism exiting={exiting} />
      </Canvas>
    </div>
  );
}
