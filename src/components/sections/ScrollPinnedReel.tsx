'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollPinnedReel.module.css';

interface ReelFrame {
  number: string;
  title: string;
  snippet: string;
  caption: string;
}

const FRAMES: ReelFrame[] = [
  {
    number: '01',
    title: 'THE QUESTION // Prompt Discovery',
    snippet: `// ROOT_STATE\n{\n  id: "ROOT",\n  text: "Welcome. Pick up where you left off, or start fresh?",\n  choices: [ { text: "Show me frontend work", leadsTo: "FRONTEND" } ]\n}`,
    caption:
      'Instead of a static portfolio hero, you are presented with a conversational decision tree. The interface responds dynamically to your curiosity.',
  },
  {
    number: '02',
    title: 'THE TRAVERSAL // Dynamic Filtering',
    snippet: `// Contextual Project Filter\nif (currentNode.contentFilter.type === 'project') {\n  return projects.filter(p => p.tags.some(t => filter.tags.includes(t)));\n}`,
    caption:
      'As you navigate branches, projects and case studies filter contextually. The dialogue memory records your decisions without intrusive tracking.',
  },
  {
    number: '03',
    title: 'THE CONTINUATION // Memory & Edge State',
    snippet: `// Persistence\nlocalStorage.setItem('dialogue_memory', JSON.stringify({\n  visitCount: 2,\n  pathHistory: ['ROOT', 'FRONTEND', 'CASE_STUDY']\n}));`,
    caption:
      'Returning visitors resume precisely where they left off. Seamless state persistence powered by Edge-ready local storage.',
  },
];

export function ScrollPinnedReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        },
      });

      // Frame 1 is visible at 0%. Animate Frame 1 -> Frame 2
      tl.to('.gsap-frame-0', { opacity: 0, y: -20, duration: 1 })
        .to('.gsap-frame-1', { opacity: 1, y: 0, duration: 1 }, '-=0.5')
        // Animate Frame 2 -> Frame 3
        .to('.gsap-frame-1', { opacity: 0, y: -20, duration: 1 })
        .to('.gsap-frame-2', { opacity: 1, y: 0, duration: 1 }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="scroll-reel" className={styles.section} ref={sectionRef} aria-labelledby="reel-heading">
      <div className={styles.pinContainer}>
        <div className={styles.header}>
          <span className={styles.label}>Interactive Reel // System Demonstration</span>
          <h2 id="reel-heading" className={styles.title}>
            The Dialogue Pipeline
          </h2>
        </div>

        {isReducedMotion ? (
          /* Reduced-Motion Fallback: Complete Readable Storyboard Grid */
          <div className={styles.storyboardGrid} role="region" aria-label="Storyboard demonstration of the dialogue pipeline">
            {FRAMES.map((f) => (
              <div key={f.number} className={styles.storyboardCard}>
                <div className={styles.frameHeader}>
                  <span className={styles.frameNumber}>{f.number}</span>
                  <h3 className={styles.frameTitle}>{f.title}</h3>
                </div>
                <div className={styles.frameVisual}>
                  <pre className={styles.codeSnippet}>{f.snippet}</pre>
                </div>
                <p className={styles.frameCaption}>{f.caption}</p>
              </div>
            ))}
          </div>
        ) : (
          /* Normal Motion: Scrubbed Pinned Reel */
          <div className={styles.reelViewport} role="region" aria-label="Interactive scroll reel of the dialogue pipeline">
            {FRAMES.map((f, idx) => (
              <div
                key={f.number}
                className={`${styles.frame} gsap-frame-${idx}`}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <div className={styles.frameHeader}>
                  <span className={styles.frameNumber}>{f.number}</span>
                  <h3 className={styles.frameTitle}>{f.title}</h3>
                </div>
                <div className={styles.frameVisual}>
                  <pre className={styles.codeSnippet}>{f.snippet}</pre>
                </div>
                <p className={styles.frameCaption}>{f.caption}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
