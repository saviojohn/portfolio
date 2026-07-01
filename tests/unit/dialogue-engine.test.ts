import { describe, it, expect } from 'vitest';
import { 
  getNode, 
  getChoices, 
  buildPath, 
  getCoverage, 
  encodePathToURL, 
  decodePathFromURL
} from '../../src/lib/dialogue/engine';
import { DIALOGUE_TREE } from '../../src/lib/dialogue/tree';

describe('Dialogue Engine', () => {
  describe('getNode', () => {
    it('returns correct node by ID', () => {
      const node = getNode('ROOT');
      expect(node.id).toBe('ROOT');
      // Root might be 'choice' or 'branch', assert it exists
      expect(node.type).toBeTruthy();
    });

    it('throws for unknown ID', () => {
      expect(() => getNode('UNKNOWN_ID')).toThrow("not found in tree");
    });
  });

  describe('getChoices', () => {
    it('returns correct choices for branch nodes', () => {
      const choices = getChoices('ROOT');
      expect(choices.length).toBeGreaterThan(0);
      expect(choices[0]?.id).toBeTruthy(); // Avoid exact ID coupling
    });

    it('returns [] for terminal nodes', () => {
      const choices = getChoices('META'); // Assuming META is terminal
      expect(choices).toEqual([]);
    });
  });

  describe('buildPath', () => {
    it('correctly accumulates node IDs', () => {
      const path = buildPath(['ROOT', 'A']);
      expect(path).toEqual(['ROOT', 'A']);
    });
  });

  describe('getCoverage', () => {
    it('returns 0 for empty path', () => {
      const coverage = getCoverage([]);
      expect(coverage).toBe(0);
    });

    it('returns 100 when all nodes visited', () => {
      const allIds = Object.keys(DIALOGUE_TREE);
      const coverage = getCoverage(allIds);
      expect(coverage).toBe(100);
    });
  });

  describe('URL encoding/decoding', () => {
    it('produces URL-safe string', () => {
      const encoded = encodePathToURL(['ROOT', 'A', 'A1']);
      expect(encoded).toBe('ROOT.A.A1');
    });

    it('round-trips correctly', () => {
      const path = ['ROOT', 'B', 'B2'];
      const encoded = encodePathToURL(path);
      const decoded = decodePathFromURL(encoded);
      expect(decoded).toEqual(path);
    });
    
    it('handles empty string decoding', () => {
      expect(decodePathFromURL('')).toEqual([]);
    });
  });
});
