'use client';

import React, { useState } from 'react';
import styles from './BranchAccordion.module.css';

interface AccordionItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const ACCORDION_ITEMS: AccordionItem[] = [
  {
    number: '01',
    title: 'PROMPT // Initial Discovery',
    description:
      'Unlike traditional static portfolios where visitors scroll through static lists, The Dialogue begins with an open question. Every choice sets the direction of the interface, tailoring what you see next.',
    tags: ['State machine', 'MDX content', 'Prism opening', 'Zero layout shift'],
  },
  {
    number: '02',
    title: 'BRANCH // Dynamic Tree Traversal',
    description:
      'Every decision traverses a JSON-based conversation tree. Selected pathways filter project case studies, blog entries, and architectural notes in real-time, adapting the sidebar and split screen without page reloads.',
    tags: ['Tree traversal', 'Memory persistence', 'Split screen', 'Contextual filter'],
  },
  {
    number: '03',
    title: 'RESOLVE // Tailored Context & Continuation',
    description:
      'The journey converges on high-signal case studies and direct contact resolution. User choices persist across sessions via local memory, offering returning visitors seamless continuation.',
    tags: ['3D transitions', 'A11y compliance', 'Edge rate-limiting', '0 Axe-Core violations'],
  },
];

export function BranchAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open 01 by default

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section} aria-labelledby="accordion-heading">
      <div className={styles.header}>
        <span className={styles.label}>Architecture // System Flow</span>
        <h2 id="accordion-heading" className={styles.title}>
          Dialogue State Machine
        </h2>
        <p className={styles.subtitle}>
          How the conversation tree adapts content, layout, and visual state across your session.
        </p>
      </div>

      <div className={styles.list} role="region" aria-label="Dialogue state phases">
        {ACCORDION_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `accordion-button-${index}`;
          const panelId = `accordion-panel-${index}`;

          return (
            <div key={item.number} className={styles.item}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <div className={styles.triggerLeft}>
                  <span className={styles.number}>{item.number}</span>
                  <span className={styles.itemTitle}>{item.title}</span>
                </div>
                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 1V15M1 8H15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`${styles.panelWrapper} ${isOpen ? styles.panelWrapperOpen : ''}`}
              >
                <div className={styles.panelContent}>
                  <div className={styles.panelInner}>
                    <p className={styles.description}>{item.description}</p>
                    <div className={styles.tags} aria-label="Associated technologies and patterns">
                      {item.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
