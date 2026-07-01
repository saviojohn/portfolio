import type { DialogueMemory } from './types';

const MEMORY_KEY = 'dialogue_memory';

/**
 * Loads the dialogue memory from localStorage.
 * Wrapped in try/catch because localStorage can throw in private/incognito modes.
 */
export function loadMemory(): DialogueMemory | null {
  try {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem(MEMORY_KEY);
    if (!stored) return null;
    
    return JSON.parse(stored) as DialogueMemory;
  } catch (error) {
    console.warn('Failed to load dialogue memory from localStorage:', error);
    return null;
  }
}

/**
 * Saves the dialogue memory to localStorage.
 */
export function saveMemory(memory: DialogueMemory): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
  } catch (error) {
    console.warn('Failed to save dialogue memory to localStorage:', error);
  }
}

/**
 * Clears the dialogue memory from localStorage.
 */
export function clearMemory(): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(MEMORY_KEY);
  } catch (error) {
    console.warn('Failed to clear dialogue memory from localStorage:', error);
  }
}

/**
 * Applies a partial update to the existing memory, creating a new one if it doesn't exist.
 */
export function updateMemory(patch: Partial<DialogueMemory>): void {
  const current = loadMemory();
  
  const now = new Date().toISOString();
  
  const updated: DialogueMemory = current ? {
    ...current,
    ...patch,
    lastVisit: now,
    visitCount: patch.visitCount ?? current.visitCount,
  } : {
    firstVisit: now,
    lastVisit: now,
    visitCount: 1,
    lastPath: [],
    projectsViewed: [],
    coveragePercent: 0,
    ...patch,
  };

  saveMemory(updated);
}
