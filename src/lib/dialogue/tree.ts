import type { DialogueNode } from './types';

export const DIALOGUE_TREE: Record<string, DialogueNode> = {
  // ROOT / PRISM OPENING
  ROOT: {
    id: 'ROOT',
    speaker: 'portfolio',
    type: 'choice',
    text: "What brings you here?",
    choices: [
      { id: 'c_A', text: "I'm looking to hire someone", leadsTo: 'A' },
      { id: 'c_B', text: "I want to see what you build", leadsTo: 'B' },
      { id: 'c_C', text: "I might want to work together", leadsTo: 'C' },
      { id: 'c_D', text: "Just curious", leadsTo: 'D' },
    ],
  },

  // ==========================================
  // BRANCH A: RECRUITER
  // ==========================================
  A: {
    id: 'A',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: Good timing. What kind of role are you filling?]",
    choices: [
      { id: 'c_A1', text: "Frontend / UI Engineering", leadsTo: 'A1' },
      { id: 'c_A2', text: "Full-stack / Generalist", leadsTo: 'A2' },
      { id: 'c_A3', text: "Just show me your best work", leadsTo: 'A3' },
    ],
  },
  A1: {
    id: 'A1',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: That's where I'm sharpest. Here are three projects where the interface was everything:]",
    contentFilter: { type: 'project', tags: ['frontend'], limit: 3 },
    next: 'A_AFTER_PROJ',
  },
  A2: {
    id: 'A2',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: I build end to end. Here's what that looks like:]",
    contentFilter: { type: 'project', tags: ['fullstack'], limit: 3 },
    next: 'A_AFTER_PROJ',
  },
  A3: {
    id: 'A3',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: Gladly. These three — and why they matter:]",
    contentFilter: { type: 'project', featured: true, limit: 3 },
    next: 'A_AFTER_PROJ',
  },
  A_AFTER_PROJ: {
    id: 'A_AFTER_PROJ',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: Those are the highlights. Want more depth?]",
    choices: [
      { id: 'c_A_B3', text: "Show me how you approach a problem", leadsTo: 'B3' },
      { id: 'c_A_B2', text: "I'd like to see code quality", leadsTo: 'B2' },
      { id: 'c_A_CONT', text: "I've seen enough — let's talk", leadsTo: 'CONTACT' },
    ],
  },

  // ==========================================
  // BRANCH B: CTO
  // ==========================================
  B: {
    id: 'B',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: Let's skip the surface. Pick your lens:]",
    choices: [
      { id: 'c_B1', text: "Architecture & Systems", leadsTo: 'B1' },
      { id: 'c_B2', text: "Code Quality & Craft", leadsTo: 'B2' },
      { id: 'c_B3', text: "How I Solve Hard Problems", leadsTo: 'B3' },
    ],
  },
  B1: {
    id: 'B1',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: Let me show you how I think about systems.]",
    contentFilter: { type: 'project', tags: ['architecture'] },
    next: 'B_AFTER_B1',
  },
  B_AFTER_B1: {
    id: 'B_AFTER_B1',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: Questions I had to answer on these projects:]",
    choices: [
      { id: 'c_B1_B2', text: "Show me the code", leadsTo: 'B2' },
      { id: 'c_B1_B3', text: "How do you handle failure?", leadsTo: 'B3' },
      { id: 'c_B1_CONT', text: "Impressive — let's talk", leadsTo: 'CONTACT' },
    ],
  },
  B2: {
    id: 'B2',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: Code quality philosophy — 2 sentences]",
    contentFilter: { type: 'experiment', tags: ['code'] }, // Assuming code showcases are 'experiments' or similar
    next: 'B_AFTER_B2',
  },
  B_AFTER_B2: {
    id: 'B_AFTER_B2',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: That's the code craft.]",
    choices: [
      { id: 'c_B2_B3', text: "Show me a hard problem you solved", leadsTo: 'B3' },
      { id: 'c_B2_CONT', text: "Let's connect", leadsTo: 'CONTACT' },
    ],
  },
  B3: {
    id: 'B3',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: Every project has a moment where the obvious approach fails. Here are mine.]",
    contentFilter: { type: 'blog', tags: ['problem-solving'] },
    next: 'B_AFTER_B3',
  },
  B_AFTER_B3: {
    id: 'B_AFTER_B3',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: That's how I work. Still interested?]",
    choices: [
      { id: 'c_B3_CONT', text: "Let's talk", leadsTo: 'CONTACT' },
    ],
  },

  // ==========================================
  // BRANCH C: FOUNDER
  // ==========================================
  C: {
    id: 'C',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: I like that 'might.' Let me help you decide. What stage are you at?]",
    choices: [
      { id: 'c_C1', text: "Building something from scratch", leadsTo: 'C1' },
      { id: 'c_C2', text: "Leveling something up", leadsTo: 'C2' },
      { id: 'c_C3', text: "Still figuring it out", leadsTo: 'C3' },
    ],
  },
  C1: {
    id: 'C1',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: I've taken ideas from napkin to production. Here's how:]",
    contentFilter: { type: 'project', tags: ['greenfield'] },
    next: 'C_AFTER_C1',
  },
  C_AFTER_C1: {
    id: 'C_AFTER_C1',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: Here's what working with me looks like:]",
    choices: [
      { id: 'c_C1_CONT', text: "Let's talk about your project", leadsTo: 'CONTACT' },
    ],
  },
  C2: {
    id: 'C2',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: Making good things great. That's where the craft is.]",
    contentFilter: { type: 'project', tags: ['scale'] },
    next: 'C_AFTER_C2',
  },
  C_AFTER_C2: {
    id: 'C_AFTER_C2',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: That's the difference.]",
    choices: [
      { id: 'c_C2_CONT', text: "Tell me about your project", leadsTo: 'CONTACT' },
    ],
  },
  C3: {
    id: 'C3',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: No pressure. Let me show you the range.]",
    contentFilter: { type: 'project' },
    next: 'C_AFTER_C3',
  },
  C_AFTER_C3: {
    id: 'C_AFTER_C3',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: When the timing's right, I'm here.]",
    choices: [
      { id: 'c_C3_CONT', text: "Get in touch", leadsTo: 'CONTACT' },
    ],
  },

  // ==========================================
  // BRANCH D: EXPLORER
  // ==========================================
  D: {
    id: 'D',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: Welcome. This is the scenic route. What's more interesting to you — what I build, or how I think?]",
    choices: [
      { id: 'c_D1', text: "What you build", leadsTo: 'D1' },
      { id: 'c_D2', text: "How you think", leadsTo: 'D2' },
    ],
  },
  D1: {
    id: 'D1',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: Let me walk you through the highlights.]",
    contentFilter: { type: 'project', featured: true },
    next: 'D_AFTER_D1',
  },
  D_AFTER_D1: {
    id: 'D_AFTER_D1',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: That's the work. Want to know the person behind it?]",
    choices: [
      { id: 'c_D1_D2', text: "Tell me more", leadsTo: 'D2' },
      { id: 'c_D1_META', text: "How was this portfolio built?", leadsTo: 'META' },
      { id: 'c_D1_CONT', text: "I've seen enough — let's connect", leadsTo: 'CONTACT' },
    ],
  },
  D2: {
    id: 'D2',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "[REPLACE: Personal philosophy — paragraph]",
    contentFilter: { type: 'blog', tags: ['philosophy'] },
    next: 'D_AFTER_D2',
  },
  D_AFTER_D2: {
    id: 'D_AFTER_D2',
    speaker: 'portfolio',
    type: 'choice',
    text: "[REPLACE: That's how I see things. Resonates?]",
    choices: [
      { id: 'c_D2_D1', text: "Show me the work", leadsTo: 'D1' },
      { id: 'c_D2_META', text: "This portfolio is interesting — how'd you build it?", leadsTo: 'META' },
      { id: 'c_D2_CONT', text: "Let's connect", leadsTo: 'CONTACT' },
    ],
  },

  // ==========================================
  // CROSS-CUTTING NODES
  // ==========================================
  META: {
    id: 'META',
    speaker: 'portfolio',
    type: 'terminal',
    text: "[REPLACE: You're asking about the portfolio itself. I like that. This site is a conversation — not because chatbots are trendy, but because your time deserves better than a generic scroll. The source code is here.]",
  },
  CONTACT: {
    id: 'CONTACT',
    speaker: 'portfolio',
    type: 'terminal',
    text: "[REPLACE: Let's make this easy. Best for serious inquiries or the unfiltered version. Or use the form below.]",
  },
  COVERAGE: {
    id: 'COVERAGE',
    speaker: 'portfolio',
    type: 'terminal',
    text: "[REPLACE: Good question. Here's what you've explored — and what's left. You've seen a lot of this portfolio.]",
  }
};
