import { useContext } from 'react';
import type { DialogueContextValue } from '../context/DialogueContext';
import { DialogueContext } from '../context/DialogueContext';
import type { DialogueNode, ContentFilter } from '../lib/dialogue/types';
import { getNode, getContentFilter } from '../lib/dialogue/engine';

/**
 * Primary hook to access the Dialogue Engine state and actions.
 */
export function useDialogue(): DialogueContextValue {
  const context = useContext(DialogueContext);
  if (!context) {
    throw new Error('useDialogue must be used within a DialogueProvider');
  }
  return context;
}

/**
 * Utility hook to fetch a specific dialogue node by ID.
 * Since this relies on the static tree, it doesn't need context, 
 * but it's exported here for convenience in the UI layer.
 */
export function useDialogueNode(id: string): DialogueNode {
  return getNode(id);
}

/**
 * Hook to retrieve the content filter for the current active node.
 * Returns null if the current node doesn't define a filter.
 */
export function useContentFilter(): ContentFilter | null {
  const { currentNode } = useDialogue();
  return getContentFilter(currentNode);
}
