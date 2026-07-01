'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './DialogueStatement.module.css';

interface DialogueStatementProps {
  text: string;
  animate?: boolean;
}

export function DialogueStatement({ text, animate = true }: DialogueStatementProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !animate) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to('.gsap-word', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, animate, text]);

  // Split text into words, retaining spaces by putting a space after each word.
  // This is a simple tokenizer for stagger animation.
  const words = text.split(' ').map((word, i, arr) => (
    <span key={i} className={`${styles.word} gsap-word`}>
      {word}{i !== arr.length - 1 ? ' ' : ''}
    </span>
  ));

  const shouldAnimate = mounted && animate;

  return (
    <p 
      ref={containerRef} 
      className={`${styles.statement} ${!shouldAnimate ? styles.instant : ''}`}
      aria-label={text} // Screen readers read the full text seamlessly
      aria-live="polite" // Announce text changes dynamically
    >
      {words}
    </p>
  );
}
