'use client';

import React from 'react';
import type { DialogueChoice } from '../../lib/dialogue/types';
import styles from './ChoiceBlock.module.css';

interface ChoiceBlockProps {
  choice: DialogueChoice;
  index: number;
  onSelect: (choice: DialogueChoice) => void;
}

export function ChoiceBlock({ choice, index, onSelect }: ChoiceBlockProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(choice);
    }
  };

  return (
    <button
      className={styles.choiceButton}
      onClick={() => onSelect(choice)}
      onKeyDown={handleKeyDown}
      aria-label={choice.text}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <span>{choice.text}</span>
      {choice.shortcut && (
        <span aria-hidden="true" style={{ opacity: 0.5, fontSize: '0.8em' }}>
          [{choice.shortcut}]
        </span>
      )}
    </button>
  );
}
