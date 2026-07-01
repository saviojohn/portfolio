'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useDialogue } from '../../hooks/useDialogue';
import { SITE_NAME } from '../../lib/config';
import styles from './PrismOpening.module.css';

// Dynamic import with ssr: false
const PrismScene = dynamic(() => import('../three/PrismScene'), {
  ssr: false,
});

export function PrismOpening() {
  const { currentNode, memory, choose } = useDialogue();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  const isReturningVisitor = memory && memory.visitCount > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isReturningVisitor) {
      gsap.set('.gsap-reveal', { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Frame 1: Prism fades in (handled by wrapper/suspense timing)
      tl.to('.gsap-prism', { opacity: 1, duration: 1.5, ease: 'power2.out' })
        .to('.gsap-name', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
        .to('.gsap-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
        .to('.gsap-conversation', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
        .to('.gsap-choices', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5');

    }, containerRef);

    return () => ctx.revert();
  }, [mounted, isReturningVisitor]);

  if (!mounted) return null;

  const handleChoice = (leadsTo: string) => {
    // If returning visitor or reduced motion, skip animation
    if (isReturningVisitor || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      choose(leadsTo);
      return;
    }

    setExiting(true);
    // Wait for the 800ms refraction animation to complete before advancing
    setTimeout(() => {
      choose(leadsTo);
    }, 800);
  };

  if (isReturningVisitor) {
    return (
      <div className={styles.container}>
        <h1 className={styles.returnMessage}>
          Welcome back. Pick up where you left off, or start fresh?
        </h1>
        <div className={`${styles.choices} gsap-choices`} style={{ opacity: 1 }}>
          {currentNode.choices?.map((choice) => (
            <button 
              key={choice.id}
              onClick={() => handleChoice(choice.leadsTo)}
              style={{
                padding: '16px', background: 'var(--color-bg-surface-2)', 
                color: 'var(--color-text-primary)', border: '1px solid var(--color-border-subtle)',
                borderRadius: '8px', cursor: 'pointer', textAlign: 'right'
              }}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className="gsap-prism gsap-reveal" style={{ width: '100%', opacity: 0 }}>
        <Suspense fallback={<div className={styles.prism} />}>
          <PrismScene exiting={exiting} />
        </Suspense>
      </div>
      
      <div className={styles.textBlock}>
        <h1 className={`${styles.name} gsap-name gsap-reveal`} style={{ transform: 'translateY(16px)' }}>
          {SITE_NAME.replace('[REPLACE: ', '').replace(']', '')}
        </h1>
        <p className={`${styles.subtitle} gsap-subtitle gsap-reveal`} style={{ transform: 'translateY(16px)' }}>
          This isn&apos;t a typical portfolio.
        </p>
        <p className={`${styles.conversation} gsap-conversation gsap-reveal`} style={{ transform: 'translateY(16px)' }}>
          It&apos;s a conversation.
        </p>
      </div>

      <div className={`${styles.choices} gsap-choices gsap-reveal`} style={{ transform: 'translateY(16px)' }}>
        {currentNode.choices?.map((choice) => (
          <button 
            key={choice.id}
            onClick={() => handleChoice(choice.leadsTo)}
            style={{
              padding: '16px', background: 'var(--color-bg-surface-2)', 
              color: 'var(--color-text-primary)', border: '1px solid var(--color-border-subtle)',
              borderRadius: '8px', cursor: 'pointer', textAlign: 'right', marginBottom: '8px'
            }}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
