'use client';

import type { ReactNode } from 'react';
import React, { createContext, useReducer, useEffect } from 'react';
import type { DialogueNode, DialogueChoice, DialoguePath, DialogueMemory } from '../lib/dialogue/types';
import { getNode, getChoices, getCoverage } from '../lib/dialogue/engine';
import { loadMemory, updateMemory, clearMemory } from '../lib/dialogue/memory';
import ClientCircuitBackground from '../components/three/ClientCircuitBackground';

// --- State Types ---
interface DialogueState {
  currentNodeId: string;
  path: DialoguePath;
  memory: DialogueMemory | null;
  isLoading: boolean;
}

// --- Action Types ---
type DialogueAction = 
  | { type: 'CHOOSE'; payload: string }
  | { type: 'REWIND'; payload?: number }
  | { type: 'RESET' }
  | { type: 'LOAD_MEMORY'; payload: DialogueMemory | null }
  | { type: 'LOAD_PATH'; payload: DialoguePath };

// --- Reducer ---
function dialogueReducer(state: DialogueState, action: DialogueAction): DialogueState {
  switch (action.type) {
    case 'LOAD_PATH': {
      return {
        ...state,
        path: action.payload,
        currentNodeId: action.payload[action.payload.length - 1] || 'ROOT',
      };
    }
    case 'CHOOSE': {
      const nextNodeId = action.payload;
      const newPath = [...state.path, nextNodeId];
      
      // Compute new memory in the background
      if (state.memory !== null || typeof window !== 'undefined') {
        const coverage = getCoverage(newPath);
        updateMemory({ lastPath: newPath, coveragePercent: coverage });
      }

      return {
        ...state,
        currentNodeId: nextNodeId,
        path: newPath,
      };
    }
    case 'REWIND': {
      // By default rewind 1 step, unless specified
      const steps = action.payload || 1;
      const newPath = state.path.slice(0, Math.max(1, state.path.length - steps));
      const nextNodeId = newPath[newPath.length - 1] || 'ROOT';

      return {
        ...state,
        currentNodeId: nextNodeId,
        path: newPath,
      };
    }
    case 'RESET': {
      clearMemory();
      return {
        ...state,
        currentNodeId: 'ROOT',
        path: ['ROOT'],
        memory: null,
      };
    }
    case 'LOAD_MEMORY': {
      return {
        ...state,
        memory: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

// --- Context Type ---
export interface DialogueContextValue {
  currentNode: DialogueNode;
  choices: DialogueChoice[];
  path: DialoguePath;
  memory: DialogueMemory | null;
  isLoading: boolean;
  coverage: number;
  choose: (nodeId: string) => void;
  rewind: (steps?: number) => void;
  reset: () => void;
  loadPath: (path: DialoguePath) => void;
}

export const DialogueContext = createContext<DialogueContextValue | null>(null);

// --- Provider ---
export function DialogueProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dialogueReducer, {
    currentNodeId: 'ROOT',
    path: ['ROOT'],
    memory: null,
    isLoading: true,
  });

  // On mount, load memory
  useEffect(() => {
    const mem = loadMemory();
    dispatch({ type: 'LOAD_MEMORY', payload: mem });
    
    // If returning visitor, update visit count. 
    // We handle the UI routing of "Welcome back" separately based on memory state.
    if (mem) {
      updateMemory({ visitCount: mem.visitCount + 1 });
    } else {
      updateMemory({ visitCount: 1 });
    }
  }, []);

  const choose = (nodeId: string) => dispatch({ type: 'CHOOSE', payload: nodeId });
  const rewind = (steps?: number) => dispatch({ type: 'REWIND', payload: steps });
  const reset = () => dispatch({ type: 'RESET' });
  const loadPath = (path: DialoguePath) => dispatch({ type: 'LOAD_PATH', payload: path });

  // Derived state
  const currentNode = getNode(state.currentNodeId);
  const choices = getChoices(state.currentNodeId);
  const coverage = getCoverage(state.path);

  const value: DialogueContextValue = {
    currentNode,
    choices,
    path: state.path,
    memory: state.memory,
    isLoading: state.isLoading,
    coverage,
    choose,
    rewind,
    reset,
    loadPath,
  };

  return (
    <DialogueContext.Provider value={value}>
      {children}
    </DialogueContext.Provider>
  );
}
