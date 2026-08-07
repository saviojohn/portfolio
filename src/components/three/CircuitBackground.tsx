'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

function ParticleNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 700;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.3 : 1.75);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    const palette = [0x6ee7dd, 0x9c8bff, 0xf5c451, 0x7ee787];

    /* ---- background: layered parallax starfield ---- */
    const starGroup = new THREE.Group();
    scene.add(starGroup);

    interface StarLayer {
      pointsObj: THREE.Points;
      depth: number;
    }
    const starLayers: StarLayer[] = [];

    const starDefs = isMobile
      ? [
          { n: 70, z: -8, size: 0.02, op: 0.85 },
          { n: 45, z: -16, size: 0.016, op: 0.5 },
        ]
      : [
          { n: 130, z: -8, size: 0.022, op: 0.9 },
          { n: 90, z: -16, size: 0.017, op: 0.55 },
          { n: 60, z: -26, size: 0.014, op: 0.3 },
        ];

    starDefs.forEach((def, li) => {
      const positions = new Float32Array(def.n * 3);
      for (let i = 0; i < def.n; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 2] = def.z + (Math.random() - 0.5) * 3;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const color = li === 0 ? 0xeef1f4 : palette[li % palette.length]!;
      const mat = new THREE.PointsMaterial({
        color,
        size: def.size,
        transparent: true,
        opacity: def.op,
        depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      starGroup.add(pts);
      starLayers.push({ pointsObj: pts, depth: li + 1 });
    });

    /* ---- foreground: particle network ---- */
    const N = isMobile ? 34 : 60;
    const netGeo = new THREE.BufferGeometry();
    const netPos = new Float32Array(N * 3);
    const vel: Array<[number, number, number]> = [];

    for (let i = 0; i < N; i++) {
      netPos[i * 3] = (Math.random() - 0.5) * 7;
      netPos[i * 3 + 1] = (Math.random() - 0.5) * 4.2;
      netPos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      vel.push([
        (Math.random() - 0.5) * 0.0035,
        (Math.random() - 0.5) * 0.0035,
        (Math.random() - 0.5) * 0.0018,
      ]);
    }
    netGeo.setAttribute('position', new THREE.BufferAttribute(netPos, 3));

    const netMat = new THREE.PointsMaterial({
      color: 0x6ee7dd,
      size: 0.055,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const netPoints = new THREE.Points(netGeo, netMat);
    scene.add(netPoints);

    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x40474f,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    /* ---- Mouse Movement Parallax ---- */
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };

    if (!isMobile && !reduceMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const clock = new THREE.Clock();
    let running = !reduceMotion;
    let frameId: number | null = null;

    function renderFrame() {
      const posAttr = netGeo.attributes['position'] as THREE.BufferAttribute | undefined;
      if (posAttr) {
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < N; i++) {
          const v = vel[i];
          const xIdx = i * 3;
          const yIdx = i * 3 + 1;
          const zIdx = i * 3 + 2;
          const cx = arr[xIdx];
          const cy = arr[yIdx];
          const cz = arr[zIdx];

          if (v && cx !== undefined && cy !== undefined && cz !== undefined) {
            arr[xIdx] = cx + v[0];
            arr[yIdx] = cy + v[1];
            arr[zIdx] = cz + v[2];

            if (Math.abs(arr[xIdx]!) > 3.6) v[0] *= -1;
            if (Math.abs(arr[yIdx]!) > 2.2) v[1] *= -1;
            if (Math.abs(arr[zIdx]!) > 1.3) v[2] *= -1;
          }
        }
        posAttr.needsUpdate = true;

        const linePts: number[] = [];
        const threshold = isMobile ? 1.0 : 1.3;

        for (let i = 0; i < N; i++) {
          for (let j = i + 1; j < N; j++) {
            const dx = arr[i * 3]! - arr[j * 3]!;
            const dy = arr[i * 3 + 1]! - arr[j * 3 + 1]!;
            const dz = arr[i * 3 + 2]! - arr[j * 3 + 2]!;
            const d = dx * dx + dy * dy + dz * dz;

            if (d < threshold) {
              linePts.push(
                arr[i * 3]!,
                arr[i * 3 + 1]!,
                arr[i * 3 + 2]!,
                arr[j * 3]!,
                arr[j * 3 + 1]!,
                arr[j * 3 + 2]!
              );
            }
          }
        }
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
      }

      scene.rotation.y += (mouseX * 0.3 - scene.rotation.y) * 0.025;
      scene.rotation.x += (mouseY * 0.15 - scene.rotation.x) * 0.025;

      starLayers.forEach(({ pointsObj, depth }) => {
        pointsObj.position.x += (-mouseX * 0.4 / depth - pointsObj.position.x) * 0.02;
        pointsObj.position.y += (-mouseY * 0.2 / depth - pointsObj.position.y) * 0.02;
        pointsObj.rotation.z += 0.00008 / depth;
      });

      renderer.render(scene, camera);
      if (running) {
        frameId = requestAnimationFrame(renderFrame);
      }
    }

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      renderFrame();
    }

    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        if (frameId) cancelAnimationFrame(frameId);
      } else if (!reduceMotion) {
        running = true;
        clock.getDelta();
        renderFrame();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (reduceMotion) renderer.render(scene, camera);
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bgCanvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block' }}
    />
  );
}

export function CircuitBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <canvas
        id="bgCanvas"
        style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block' }}
      />
    );
  }

  return <ParticleNetworkCanvas />;
}

export default CircuitBackground;
