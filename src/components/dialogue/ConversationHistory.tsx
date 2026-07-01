'use client';

import React from 'react';
import { useDialogue } from '../../hooks/useDialogue';
import styles from './ConversationHistory.module.css';

export function ConversationHistory() {
  const { path, rewind } = useDialogue();

  // Basic branch mapper to show human readable text for each step in the path
  const getLabelForNode = (nodeId: string) => {
    if (nodeId === 'ROOT') return 'Start';
    // We could map the node's choice text that led here, but that's complex to re-derive without storing it.
    // A simpler way is a mapping of branch IDs, or deriving it from the tree's text context.
    const branchMap: Record<string, string> = {
      A: 'Hiring',
      B: 'CTO',
      C: 'Founder',
      D: 'Explorer',
      A1: 'Frontend',
      A2: 'Full-stack',
      A3: 'Best Work',
      B1: 'Architecture',
      B2: 'Code Quality',
      B3: 'Problem Solving',
      C1: 'From Scratch',
      C2: 'Level Up',
      C3: 'Range',
      D1: 'Work',
      D2: 'Thinking',
      META: 'Behind the Scenes',
      CONTACT: 'Contact',
    };
    
    // Fallback to the ID itself if it's an intermediate step like A_AFTER_PROJ
    return branchMap[nodeId] || nodeId.replace('_AFTER_', ' ').replace('PROJ', 'Projects');
  };

  return (
    <div className={styles.historyList}>
      {path.map((nodeId, index) => {
        const isCurrent = index === path.length - 1;
        const stepsToRewind = (path.length - 1) - index;
        
        return (
          <div 
            key={`${nodeId}-${index}`} 
            className={`${styles.historyItem} ${isCurrent ? styles.active : ''}`}
          >
            <button
              className={styles.rewindButton}
              onClick={() => {
                if (stepsToRewind > 0) {
                  rewind(stepsToRewind);
                }
              }}
              disabled={isCurrent}
              aria-label={isCurrent ? `Currently at ${getLabelForNode(nodeId)}` : `Rewind to ${getLabelForNode(nodeId)}`}
            >
              {getLabelForNode(nodeId)}
            </button>
          </div>
        );
      })}
    </div>
  );
}
