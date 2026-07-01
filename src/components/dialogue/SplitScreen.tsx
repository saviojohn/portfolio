'use client';

import React from 'react';
import styles from './SplitScreen.module.css';

interface SplitScreenProps {
  depth: number; // e.g. path.length
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  sidebarContent?: React.ReactNode;
  mobilePathContent?: React.ReactNode;
}

export function SplitScreen({ 
  depth, 
  leftContent, 
  rightContent, 
  sidebarContent,
  mobilePathContent
}: SplitScreenProps) {
  // Left column goes from 40% -> 20% as depth increases.
  // We'll cap depth effect at 5.
  const cappedDepth = Math.min(Math.max(depth, 1), 5);
  // depth=1 -> 40%, depth=5 -> 20%
  // formula: 40 - (depth - 1) * 5
  const leftFlexBasis = 40 - ((cappedDepth - 1) * 5);

  return (
    <div className={styles.container}>
      {sidebarContent && (
        <aside className={styles.sidebar}>
          {sidebarContent}
        </aside>
      )}
      
      <main className={styles.mainArea}>
        {mobilePathContent && (
          <div className={styles.mobilePath}>
            {mobilePathContent}
          </div>
        )}
        
        <div className={styles.split}>
          <div 
            className={styles.leftColumn} 
            style={{ flexBasis: `${leftFlexBasis}%` }}
          >
            {leftContent}
          </div>
          
          <div className={styles.rightColumn}>
            {rightContent}
          </div>
        </div>
      </main>
    </div>
  );
}
