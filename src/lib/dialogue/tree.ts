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
    text: "Good timing! What type of role or focus are you looking for?",
    choices: [
      { id: 'c_A1', text: "Mobile / Cross-Platform Engineering", leadsTo: 'A1' },
      { id: 'c_A2', text: "Full-Stack / Web Systems", leadsTo: 'A2' },
      { id: 'c_A3', text: "Just show me your best work", leadsTo: 'A3' },
    ],
  },
  A1: {
    id: 'A1',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "Here are mobile applications built with Flutter, Riverpod, Socket.IO, and native integrations:",
    contentFilter: { type: 'project', tags: ['mobile'], limit: 3 },
    next: 'A_AFTER_PROJ',
  },
  A2: {
    id: 'A2',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "I build end-to-end applications across web, real-time messaging, and backends. Here is what that looks like:",
    contentFilter: { type: 'project', tags: ['fullstack'], limit: 3 },
    next: 'A_AFTER_PROJ',
  },
  A3: {
    id: 'A3',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "Gladly. Here are three featured projects and key systems I've built:",
    contentFilter: { type: 'project', featured: true, limit: 3 },
    next: 'A_AFTER_PROJ',
  },
  A_AFTER_PROJ: {
    id: 'A_AFTER_PROJ',
    speaker: 'portfolio',
    type: 'choice',
    text: "Those are key highlights. Would you like to explore deeper?",
    choices: [
      { id: 'c_A_B3', text: "Show me how you approach a problem", leadsTo: 'B3' },
      { id: 'c_A_B2', text: "I'd like to see code quality & architecture", leadsTo: 'B2' },
      { id: 'c_A_CONT', text: "I've seen enough — let's talk", leadsTo: 'CONTACT' },
    ],
  },

  // ==========================================
  // BRANCH B: CTO / TECHNICAL LEAD
  // ==========================================
  B: {
    id: 'B',
    speaker: 'portfolio',
    type: 'choice',
    text: "Let's skip the surface. Pick your lens:",
    choices: [
      { id: 'c_B1', text: "Architecture & Real-Time Systems", leadsTo: 'B1' },
      { id: 'c_B2', text: "Code Quality & Mobile State", leadsTo: 'B2' },
      { id: 'c_B3', text: "How I Solve Hard Problems", leadsTo: 'B3' },
    ],
  },
  B1: {
    id: 'B1',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "Here is how I design systems — combining FastAPI, WebSockets, FCM queues, and Next.js frontend state:",
    contentFilter: { type: 'project', tags: ['architecture'] },
    next: 'B_AFTER_B1',
  },
  B_AFTER_B1: {
    id: 'B_AFTER_B1',
    speaker: 'portfolio',
    type: 'choice',
    text: "Want to dive further into implementation details?",
    choices: [
      { id: 'c_B1_B2', text: "Show me code quality", leadsTo: 'B2' },
      { id: 'c_B1_B3', text: "How do you handle failure & recovery?", leadsTo: 'B3' },
      { id: 'c_B1_CONT', text: "Impressive — let's talk", leadsTo: 'CONTACT' },
    ],
  },
  B2: {
    id: 'B2',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "Code craft philosophy: Clean separation of concerns, single-flight token refreshers, and robust state machines for UI and WebSocket connections.",
    contentFilter: { type: 'project', tags: ['state-management'] },
    next: 'B_AFTER_B2',
  },
  B_AFTER_B2: {
    id: 'B_AFTER_B2',
    speaker: 'portfolio',
    type: 'choice',
    text: "That covers code quality and architecture craft.",
    choices: [
      { id: 'c_B2_B3', text: "Show me a hard problem you solved", leadsTo: 'B3' },
      { id: 'c_B2_CONT', text: "Let's connect", leadsTo: 'CONTACT' },
    ],
  },
  B3: {
    id: 'B3',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "Every major production app hits tricky bottlenecks. Here are complex architectural problems I've solved:",
    contentFilter: { type: 'project', featured: true },
    next: 'B_AFTER_B3',
  },
  B_AFTER_B3: {
    id: 'B_AFTER_B3',
    speaker: 'portfolio',
    type: 'choice',
    text: "That's how I engineer systems. Ready to connect?",
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
    text: "Welcome! What stage is your project currently at?",
    choices: [
      { id: 'c_C1', text: "Building something from scratch", leadsTo: 'C1' },
      { id: 'c_C2', text: "Scaling or upgrading an existing app", leadsTo: 'C2' },
      { id: 'c_C3', text: "Exploring possibilities", leadsTo: 'C3' },
    ],
  },
  C1: {
    id: 'C1',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "I've taken cross-platform mobile apps and web products from architecture to production launch. Here's a sample:",
    contentFilter: { type: 'project', tags: ['mobile'] },
    next: 'C_AFTER_C1',
  },
  C_AFTER_C1: {
    id: 'C_AFTER_C1',
    speaker: 'portfolio',
    type: 'choice',
    text: "Ready to discuss building your product?",
    choices: [
      { id: 'c_C1_CONT', text: "Let's talk about your project", leadsTo: 'CONTACT' },
    ],
  },
  C2: {
    id: 'C2',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "Upgrading legacy features, adding real-time messaging, and scaling API backends:",
    contentFilter: { type: 'project', tags: ['fullstack'] },
    next: 'C_AFTER_C2',
  },
  C_AFTER_C2: {
    id: 'C_AFTER_C2',
    speaker: 'portfolio',
    type: 'choice',
    text: "That's how performance and user experience scale.",
    choices: [
      { id: 'c_C2_CONT', text: "Tell me about your project", leadsTo: 'CONTACT' },
    ],
  },
  C3: {
    id: 'C3',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "Take your time exploring the full range of work across mobile, web, and backends:",
    contentFilter: { type: 'project' },
    next: 'C_AFTER_C3',
  },
  C_AFTER_C3: {
    id: 'C_AFTER_C3',
    speaker: 'portfolio',
    type: 'choice',
    text: "When you're ready, feel free to reach out.",
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
    text: "Welcome! Feel free to browse through projects and technical details:",
    choices: [
      { id: 'c_D1', text: "What you build", leadsTo: 'D1' },
      { id: 'c_D2', text: "How you work", leadsTo: 'D2' },
    ],
  },
  D1: {
    id: 'D1',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "Here are featured projects built across mobile, web, and cloud backends:",
    contentFilter: { type: 'project', featured: true },
    next: 'D_AFTER_D1',
  },
  D_AFTER_D1: {
    id: 'D_AFTER_D1',
    speaker: 'portfolio',
    type: 'choice',
    text: "Interested in connecting?",
    choices: [
      { id: 'c_D1_D2', text: "Tell me more", leadsTo: 'D2' },
      { id: 'c_D1_CONT', text: "Let me get in touch", leadsTo: 'CONTACT' },
    ],
  },
  D2: {
    id: 'D2',
    speaker: 'portfolio',
    type: 'content-reveal',
    text: "Engineering philosophy: Build robust, type-safe, user-focused applications with strong offline support and real-time responsiveness.",
    contentFilter: { type: 'project', featured: true },
    next: 'D_AFTER_D2',
  },
  D_AFTER_D2: {
    id: 'D_AFTER_D2',
    speaker: 'portfolio',
    type: 'choice',
    text: "Feel free to reach out anytime.",
    choices: [
      { id: 'c_D2_D1', text: "Show me projects", leadsTo: 'D1' },
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
    text: "This portfolio is built with Next.js, TypeScript, and standard MDX content pipelines.",
  },
  CONTACT: {
    id: 'CONTACT',
    speaker: 'portfolio',
    type: 'terminal',
    text: "Feel free to drop me an email at savio.john.t@gmail.com or connect via LinkedIn!",
  },
  COVERAGE: {
    id: 'COVERAGE',
    speaker: 'portfolio',
    type: 'terminal',
    text: "You've explored the portfolio dialogue tree.",
  }
};
