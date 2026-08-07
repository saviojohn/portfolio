'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './StickerCollageHero.module.css';

interface StickerItem {
  id: string;
  category: string;
  title: string;
  subtext: string;
  rotate: number;
  posClass: string;
}

const STICKERS: StickerItem[] = [
  {
    id: 'arch',
    category: 'ARCHITECTURE',
    title: 'JSON State Machine',
    subtext: 'Conversation tree with zero-latency branch traversal.',
    rotate: -5,
    posClass: styles.pos0 || '',
  },
  {
    id: 'phil',
    category: 'PHILOSOPHY',
    title: 'Not A Typical Portfolio',
    subtext: 'An interactive dialogue rather than static lists.',
    rotate: 6,
    posClass: styles.pos1 || '',
  },
  {
    id: 'a11y',
    category: 'COMPLIANCE',
    title: '0 Axe-Core Violations',
    subtext: 'Built from the ground up for assistive technologies.',
    rotate: 4,
    posClass: styles.pos2 || '',
  },
  {
    id: 'perf',
    category: 'PERFORMANCE',
    title: 'Next.js 15 + R3F',
    subtext: 'Edge runtime, React 19, and optimized Three.js.',
    rotate: -6,
    posClass: styles.pos3 || '',
  },
  {
    id: 'ui',
    category: 'UI // COLLAGE',
    title: 'Editorial Layering',
    subtext: 'Layered DOM elements interacting over webgl canvas.',
    rotate: -3,
    posClass: styles.pos4 || '',
  },
];

interface StickerCardProps {
  sticker: StickerItem;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

function StickerCard({ sticker, constraintsRef }: StickerCardProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 16;
    let dx = 0;
    let dy = 0;
    if (e.key === 'ArrowLeft') dx = -step;
    else if (e.key === 'ArrowRight') dx = step;
    else if (e.key === 'ArrowUp') dy = -step;
    else if (e.key === 'ArrowDown') dy = step;
    else return;

    e.preventDefault();
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  return (
    <motion.div
      className={`${styles.stickerCard} ${sticker.posClass}`}
      style={{
        rotate: sticker.rotate,
      }}
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      drag
      dragConstraints={constraintsRef}
      whileHover={{ scale: 1.03 }}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      tabIndex={0}
      role="group"
      aria-label={`Sticker: ${sticker.category} — ${sticker.title}. ${sticker.subtext}. Use arrow keys to move.`}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.stickerCategory}>{sticker.category}</span>
      <strong className={styles.stickerTitle}>{sticker.title}</strong>
      <span className={styles.stickerSubtext}>{sticker.subtext}</span>
    </motion.div>
  );
}

interface StickerCollageHeroProps {
  children: React.ReactNode;
}

export function StickerCollageHero({ children }: StickerCollageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.heroContainer} ref={containerRef} aria-label="Dialogue Moodboard Hero">
      <div className={styles.stickerLayer}>
        {STICKERS.map((sticker) => (
          <StickerCard key={sticker.id} sticker={sticker} constraintsRef={containerRef} />
        ))}
      </div>

      <div className={styles.contentLayer}>{children}</div>

      <a href="#scroll-reel" className={styles.scrollAnchor} aria-label="Scroll to pipeline demonstration">
        ↓ (SCROLL REEL)
      </a>
    </section>
  );
}
