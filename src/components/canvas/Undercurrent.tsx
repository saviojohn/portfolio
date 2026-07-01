'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './Undercurrent.module.css';
import type { Topic } from '../../lib/dialogue/topics';

interface UndercurrentProps {
  topic: Topic;
}

export function Undercurrent({ topic }: UndercurrentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const activeTopic = useRef<Topic>(topic);
  const [opacity, setOpacity] = useState(0.12);

  // Handle topic change with opacity transition
  useEffect(() => {
    if (activeTopic.current === topic) return;
    
    // Fade out
    setOpacity(0);
    
    const timeout = setTimeout(() => {
      activeTopic.current = topic;
      // Fade in
      setOpacity(0.12);
    }, 1000); // 1s matches CSS transition

    return () => clearTimeout(timeout);
  }, [topic]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Static tint handled by CSS
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;
    
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Common particles/state for animation reuse
    const count = isMobile ? 20 : 50;
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      phase: Math.random() * Math.PI * 2
    }));

    let time = 0;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);
      
      const current = activeTopic.current;
      
      ctx.fillStyle = '#a855f7'; // var(--color-accent-base)
      ctx.strokeStyle = '#a855f7';

      if (current === 'neutral') {
        // Slow drifting dots
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (current === 'frontend') {
        // Organic blobs using larger sine-wave displaced circles
        particles.slice(0, count/2).forEach((p, i) => {
          const r = 50 + Math.sin(time + p.phase) * 20;
          ctx.beginPath();
          ctx.arc(p.x + Math.cos(time + i) * 30, p.y + Math.sin(time + i) * 30, r, 0, Math.PI * 2);
          ctx.globalAlpha = 0.2;
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;
      } else if (current === 'architecture') {
        // Geometric grid with subtle pulse
        const spacing = 50;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3 + Math.sin(time * 2) * 0.1;
        for (let x = (time * 10) % spacing; x < width; x += spacing) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = (time * 10) % spacing; y < height; y += spacing) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
      } else if (current === 'ai') {
        // Branching neural lines (connect close particles)
        particles.forEach(p => {
          p.x += p.vx * 1.5;
          p.y += p.vy * 1.5;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        });
        
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            if (!p1 || !p2) continue;
            
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 150) {
              ctx.globalAlpha = 1 - (dist / 150);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1.0;
      } else if (current === 'philosophy') {
        // Slow radial light bloom
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(width, height) * 0.8 + Math.sin(time) * 50;
        
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      } else if (current === 'contact') {
        // Calm steady warm glow (using a slightly different color tint if desired, but we stick to accent)
        ctx.globalAlpha = 0.5 + Math.sin(time * 0.5) * 0.2;
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(0, height - 100, width, 100); // glowing horizon
        ctx.globalAlpha = 1.0;
      }

       
      requestRef.current = requestAnimationFrame(draw);
    };

    requestRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={styles.undercurrent}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
