'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import type { Project } from '../../lib/types';
import { Badge } from '../ui/Badge';
import { IconLink } from '../ui/IconLink';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // We use a simple IntersectionObserver to trigger GSAP since ScrollTrigger isn't strictly required
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(card);

    return () => {
      if (card) observer.unobserve(card);
    };
  }, []);

  const dummyIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
  );

  return (
    <Link href={`/projects/${project.slug}`} className={styles.card} ref={cardRef}>
      <div className={styles.imageWrapper}>
        {/* Placeholder image since coverImage isn't in types yet */}
        <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-bg-surface-3)' }} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
        </div>
        
        {project.description && (
          <p className={styles.description}>{project.description}</p>
        )}
        
        {project.tech && project.tech.length > 0 && (
          <div className={styles.techList}>
            {project.tech.map((t) => (
              <Badge key={t} label={t} color="neutral" />
            ))}
          </div>
        )}

        <div className={styles.links} onClick={(e) => e.stopPropagation()}>
          {/* Mock live/github links since they aren't explicitly typed but requested */}
          <IconLink href="#" icon={dummyIcon} label="GitHub" external />
        </div>
      </div>
    </Link>
  );
}
