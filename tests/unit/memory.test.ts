import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { loadMemory, saveMemory, updateMemory, clearMemory } from '../../src/lib/dialogue/memory';
import { DialogueMemory } from '../../src/lib/dialogue/types';

describe('Memory System', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('loadMemory() returns null when localStorage empty', () => {
    expect(loadMemory()).toBeNull();
  });

  it('saveMemory() persists to localStorage', () => {
    const memory: DialogueMemory = {
      firstVisit: '2023-01-01',
      lastVisit: '2023-01-01',
      visitCount: 1,
      lastPath: ['ROOT'],
      projectsViewed: [],
      coveragePercent: 0,
    };
    saveMemory(memory);
    expect(localStorage.getItem('dialogue_memory')).toBeTruthy();
  });

  it('loadMemory() returns saved memory', () => {
    const memory: DialogueMemory = {
      firstVisit: '2023-01-01',
      lastVisit: '2023-01-01',
      visitCount: 1,
      lastPath: ['ROOT', 'A'],
      projectsViewed: ['proj1'],
      coveragePercent: 10,
    };
    saveMemory(memory);
    const loaded = loadMemory();
    expect(loaded?.lastPath).toEqual(['ROOT', 'A']);
    expect(loaded?.projectsViewed).toContain('proj1');
  });

  it('updateMemory() merges patch correctly', () => {
    const initial: DialogueMemory = {
      firstVisit: '2023-01-01',
      lastVisit: '2023-01-01',
      visitCount: 1,
      lastPath: ['ROOT'],
      projectsViewed: [],
      coveragePercent: 0,
    };
    saveMemory(initial);

    updateMemory({
      visitCount: 2,
      lastPath: ['ROOT', 'B'],
    });

    const updated = loadMemory();
    expect(updated?.visitCount).toBe(2);
    expect(updated?.lastPath).toEqual(['ROOT', 'B']);
    expect(updated?.firstVisit).toBe('2023-01-01'); // Preserved
  });

  it('clearMemory() removes key from localStorage', () => {
    saveMemory({
      firstVisit: '2023-01-01',
      lastVisit: '2023-01-01',
      visitCount: 1,
      lastPath: ['ROOT'],
      projectsViewed: [],
      coveragePercent: 0,
    });
    expect(localStorage.getItem('dialogue_memory')).toBeTruthy();
    
    clearMemory();
    expect(localStorage.getItem('dialogue_memory')).toBeNull();
  });

  it('handles localStorage throwing (private browsing simulation)', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Access denied');
    });
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Access denied');
    });
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('Access denied');
    });

    expect(() => loadMemory()).not.toThrow();
    expect(loadMemory()).toBeNull();

    expect(() => saveMemory({
      firstVisit: '2023-01-01',
      lastVisit: '2023-01-01',
      visitCount: 1,
      lastPath: ['ROOT'],
      projectsViewed: [],
      coveragePercent: 0,
    })).not.toThrow();

    expect(() => updateMemory({ visitCount: 2 })).not.toThrow();
    expect(() => clearMemory()).not.toThrow();

    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
    removeItemSpy.mockRestore();
  });
});
