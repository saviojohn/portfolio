import type { DialogueNode, DialogueChoice, DialoguePath, ContentFilter } from './types';
import { DIALOGUE_TREE } from './tree';

/**
 * Retrieves a dialogue node by ID. Throws if not found to ensure tree integrity.
 */
export function getNode(id: string): DialogueNode {
  const node = DIALOGUE_TREE[id];
  if (!node) {
    throw new Error(`DialogueNode with id '${id}' not found in tree.`);
  }
  return node;
}

/**
 * Retrieves choices for a given node. Returns empty array if none exist.
 */
export function getChoices(nodeId: string): DialogueChoice[] {
  const node = getNode(nodeId);
  return node.choices || [];
}

/**
 * Given an array of choices (or just the sequential progression), returns the full path of node IDs visited.
 * Usually you build a path sequentially, but if 'choices' means 'decisions made', you trace from ROOT.
 * Here we define buildPath as taking an array of node IDs and returning them as a Path,
 * or tracking the node progression. Assuming input is just the visited node IDs.
 */
export function buildPath(visitedIds: string[]): DialoguePath {
  return [...visitedIds];
}

/**
 * Calculates what percentage of the total dialogue tree has been visited.
 */
export function getCoverage(path: DialoguePath): number {
  const uniqueVisited = new Set(path);
  const totalNodes = Object.keys(DIALOGUE_TREE).length;
  if (totalNodes === 0) return 0;
  
  // Return percentage as integer 0-100
  return Math.round((uniqueVisited.size / totalNodes) * 100);
}

/**
 * Encodes a path into a short string for URL sharing.
 * E.g., ['ROOT', 'A', 'A1'] -> 'ROOT.A.A1'
 */
export function encodePathToURL(path: DialoguePath): string {
  return path.join('.');
}

/**
 * Decodes a URL string back into a DialoguePath.
 * Validates each node exists in the tree to prevent bad URLs from crashing.
 */
export function decodePathFromURL(encoded: string): DialoguePath {
  if (!encoded) return [];
  
  const segments = encoded.split('.');
  const validPath: DialoguePath = [];
  
  for (const segment of segments) {
    if (DIALOGUE_TREE[segment]) {
      validPath.push(segment);
    } else {
      // If a segment is invalid, we stop parsing to maintain path integrity
      break; 
    }
  }
  
  return validPath;
}

/**
 * Extracts the content filter from a node if it exists.
 */
export function getContentFilter(node: DialogueNode): ContentFilter | null {
  return node.contentFilter || null;
}
