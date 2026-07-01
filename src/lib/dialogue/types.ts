export interface ContentFilter {
  type: 'project' | 'blog' | 'experiment';
  tags?: string[];
  featured?: boolean;
  limit?: number;
  sort?: 'date' | 'relevance';
}

export interface DialogueChoice {
  id: string;
  text: string;
  leadsTo: string;
  shortcut?: string;
}

export interface DialogueNode {
  id: string;
  speaker: 'portfolio' | 'visitor';
  type: 'statement' | 'choice' | 'content-reveal' | 'terminal';
  text: string;
  contentRefs?: string[];
  contentFilter?: ContentFilter;
  choices?: DialogueChoice[];
  next?: string;
}

export type DialoguePath = string[];

export interface DialogueMemory {
  firstVisit: string;
  lastVisit: string;
  visitCount: number;
  lastPath: DialoguePath;
  projectsViewed: string[];
  coveragePercent: number;
}
