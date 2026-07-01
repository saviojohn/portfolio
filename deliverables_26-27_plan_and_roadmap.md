# Deliverables 26–27: Implementation Plan & Build Roadmap

---

## Deliverable 26: Complete Implementation Plan

### 26.1 Project Summary

| Field | Value |
|-------|-------|
| **Project Name** | The Dialogue |
| **Type** | Personal portfolio — category-defining interactive experience |
| **Concept** | Branching conversational interface that asks what the visitor needs |
| **Originality Score** | 96/100 |
| **Target Audience** | Recruiters (30s), CTOs (2min), Founders (5min), Explorers (3–5min) |
| **Framework** | Next.js 15 (App Router, RSC) |
| **Language** | TypeScript (strict) |
| **Deployment** | Vercel (free tier sufficient) |
| **Maintenance Burden** | < 2 hours/month |

---

### 26.2 Concept Rationale

The Dialogue wins over 14 competing concepts because it is the only concept that:

1. **Inverts the portfolio power dynamic** — asks before broadcasting
2. **Delivers value in under 15 seconds** for every visitor type (no linear scroll required)
3. **Scores highest on accessibility** (90/100) — typographic-first means screen readers, keyboard users, and reduced-motion users all get the full experience
4. **Requires no WebGL** for its core experience — the prism is isolated to a single component that degrades gracefully
5. **Is self-documenting** — the meta layer means the portfolio explains its own construction, turning it into a portfolio piece about itself
6. **Is genuinely original** — no portfolio exists today that uses this specific combination: conversational structure + dual typographic voice + split-screen spatial layout + ambient undercurrent + return visitor memory + self-documentation

---

### 26.3 Technology Stack

| Layer | Technology | Justification |
|-------|-----------|--------------|
| Framework | Next.js 15 (App Router) | SSG for performance; RSC for streaming; built-in image/font optimization; native OG image support |
| Language | TypeScript (strict) | Type-safe dialogue tree and content schemas prevent runtime errors |
| 3D (limited) | React Three Fiber + Three.js + Drei | Industry standard; isolated to PrismScene only; dynamic import prevents bundle impact |
| Animation | GSAP 3 + Framer Motion | GSAP for text/timeline animations; Framer for layout animations (better at React component transitions) |
| Styling | CSS Modules + CSS Custom Properties | Zero runtime overhead; token-based; fully maintainable |
| Content | MDX + gray-matter | File-based CMS; no external service; zero recurring cost |
| Testing | Vitest + Playwright + axe-core | Best-in-class for each layer; all open source |
| Icons | Lucide React | Consistent, maintained, tree-shakeable |
| Deployment | Vercel | Best Next.js platform; free tier sufficient; edge network for API routes |

---

### 26.4 Architecture Summary

#### Data Flow

```
MDX Files (content/)
    │ (build time)
    ▼
Content Loader (src/content/loader.ts)
    │ validates, enriches, auto-generates SEO
    ▼
Static Content Objects (Project[], BlogPost[], etc.)
    │
    ├──▶ generateStaticParams() → SSG page generation
    ├──▶ generateMetadata()    → SEO metadata per page
    ├──▶ sitemap.ts            → Auto-updated sitemap.xml
    └──▶ Dialogue Tree        → contentFilter refs resolve at render time

Dialogue Tree (src/dialogue/tree.ts)
    │ (client runtime)
    ▼
Dialogue Engine (src/dialogue/engine.ts)
    │ useReducer-based state machine
    ▼
useDialogue Hook (src/hooks/useDialogue.ts)
    │
    ▼
DialoguePage (src/app/page.tsx)
    ├── DialogueBlock (portfolio voice)
    ├── ChoiceBlock (visitor choices)
    └── ProjectCard / CaseStudyView (resolved content)
```

#### Key Architectural Decisions

| Decision | Choice | Justification |
|----------|--------|--------------|
| State management | useReducer + Context | Sufficient for dialogue engine; avoids Zustand/Redux dependency |
| Content pipeline | File-based MDX (no CMS API) | Zero cost; version-controlled; no external service dependency |
| Dialogue tree storage | TypeScript module | Type-safe; tree-shakeable; no fetch overhead; lintable |
| 3D scope | Prism only (isolated, dynamic import) | Full 3D nav would destroy accessibility and mobile performance |
| Styling | CSS Modules + Custom Properties | Zero runtime overhead vs CSS-in-JS; maintainable token system |
| Routing | Next.js App Router | Native RSC support; best SSG/ISR control |
| API | Edge Runtime | Globally distributed; no cold start issues for contact form |
| Animations | GSAP for timelines, Framer for layout | Each library excels at what the other doesn't |
| Fonts | next/font/google | Automatic subset, self-host, zero CLS from font swap |

---

### 26.5 Design System Summary

**Color**: Warm-dark background (#0e0e10) + violet accent (#a855f7) + editorial light text. Dual-mode (dark default, light supported).

**Typography**: Playfair Display (portfolio voice, editorial, authoritative) + DM Sans (visitor voice, clear, geometric). Fluid clamp-based scale. JetBrains Mono for code.

**Motion**: Physical easing only (`cubic-bezier` — no `linear`). Five duration tokens. Every animation has a `prefers-reduced-motion` equivalent.

**Spacing**: Base-4 scale (4px → 128px). Consistent across all components.

**Originality markers**: The dual-voice typographic system is unique. The ambient undercurrent per topic is unique. The ratio-shifting split-screen is unique. No other portfolio uses this combination.

---

### 26.6 All 27 Deliverables — Status

| # | Deliverable | Document | Status |
|---|-------------|----------|--------|
| 1 | Top 15 concepts | [implementation_plan.md](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/implementation_plan.md) | ✅ |
| 2 | Scoring matrix | [implementation_plan.md](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/implementation_plan.md) | ✅ |
| 3 | Winning concept + justification | [implementation_plan.md](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/implementation_plan.md) | ✅ |
| 4 | Storytelling model | [deliverables_04-08](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_04-08_narrative_wireframes.md) | ✅ |
| 5 | User journey map | [deliverables_04-08](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_04-08_narrative_wireframes.md) | ✅ |
| 6 | Information architecture | [deliverables_04-08](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_04-08_narrative_wireframes.md) | ✅ |
| 7 | Sitemap | [deliverables_04-08](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_04-08_narrative_wireframes.md) | ✅ |
| 8 | Wireframes | [deliverables_04-08](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_04-08_narrative_wireframes.md) | ✅ |
| 9 | Visual design system | [deliverables_09-12](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_09-12_design_system.md) | ✅ |
| 10 | Design tokens | [deliverables_09-12](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_09-12_design_system.md) | ✅ |
| 11 | Typography system | [deliverables_09-12](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_09-12_design_system.md) | ✅ |
| 12 | Component inventory | [deliverables_09-12](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_09-12_design_system.md) | ✅ |
| 13 | Folder & file structure | [deliverables_13-18](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_13-18_technical_architecture.md) | ✅ |
| 14 | Content architecture | [deliverables_13-18](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_13-18_technical_architecture.md) | ✅ |
| 15 | SEO architecture | [deliverables_13-18](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_13-18_technical_architecture.md) | ✅ |
| 16 | Accessibility architecture | [deliverables_13-18](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_13-18_technical_architecture.md) | ✅ |
| 17 | Security architecture | [deliverables_13-18](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_13-18_technical_architecture.md) | ✅ |
| 18 | Performance architecture | [deliverables_13-18](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_13-18_technical_architecture.md) | ✅ |
| 19 | Dependency audit | [deliverables_19-25](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_19-25_operations.md) | ✅ |
| 20 | Supply chain audit | [deliverables_19-25](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_19-25_operations.md) | ✅ |
| 21 | Testing strategy | [deliverables_19-25](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_19-25_operations.md) | ✅ |
| 22 | CI/CD strategy | [deliverables_19-25](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_19-25_operations.md) | ✅ |
| 23 | Deployment architecture | [deliverables_19-25](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_19-25_operations.md) | ✅ |
| 24 | Maintenance strategy | [deliverables_19-25](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_19-25_operations.md) | ✅ |
| 25 | Scalability roadmap | [deliverables_19-25](file:///C:/Users/savio/.gemini/antigravity/brain/8c73c55d-8f8a-47a7-b3ae-b17acc7d26b1/deliverables_19-25_operations.md) | ✅ |
| 26 | Complete implementation plan | This document | ✅ |
| 27 | Step-by-step build roadmap | This document (below) | ✅ |

---

## Deliverable 27: Step-by-Step Build Roadmap

### Phase overview

| Phase | Focus | Est. Hours |
|-------|-------|-----------|
| 1 | Project scaffolding & config | 2–3h |
| 2 | Design foundation | 3–4h |
| 3 | Content layer | 3–4h |
| 4 | Dialogue engine | 4–5h |
| 5 | Atomic & compound components | 8–10h |
| 6 | Core pages | 6–8h |
| 7 | 3D & visual effects | 5–7h |
| 8 | SEO & accessibility | 3–4h |
| 9 | Testing & CI/CD | 4–6h |
| 10 | Documentation & launch | 2–3h |
| **Total** | | **40–54h** |

> [!NOTE]
> Build does not begin until you explicitly approve all 27 deliverables. The build roadmap below is the execution plan — awaiting your approval.

---

### Phase 1: Project Scaffolding & Configuration

**Goal**: Working Next.js 15 project with TypeScript, linting, formatting, and correct folder structure.

```bash
# Commands to execute (in order):
npx create-next-app@15.3.4 . \
  --typescript \
  --app \
  --no-tailwind \
  --no-src-dir \   # We'll create src/ manually for full control
  --import-alias "@/*"

# Then restructure to match deliverable 13 folder structure
```

- [ ] Initialize Next.js 15 with App Router and TypeScript strict
- [ ] Configure `tsconfig.json` (strict: true, paths alias `@/*`)
- [ ] Install all approved production dependencies (exact versions from Deliverable 20)
- [ ] Install all approved dev dependencies (exact versions)
- [ ] Configure `.npmrc` (`minimumReleaseAge=1440`)
- [ ] Configure ESLint (`eslint.config.mjs` with `@typescript-eslint`, `eslint-config-next`)
- [ ] Configure Prettier (`.prettierrc`)
- [ ] Create `.env.local.example` with all required variable names
- [ ] Create `.gitignore` (includes `.env.local`, `.next/`, `node_modules/`)
- [ ] Configure `next.config.ts` (security headers, bundle analyzer flag, MDX support)
- [ ] Create complete folder structure per Deliverable 13
- [ ] Create `.github/workflows/ci.yml` skeleton
- [ ] Create `.github/dependabot.yml` per Deliverable 20
- [ ] Create `vercel.json` per Deliverable 23

**Completion criteria**: `npm run dev` starts without errors. `npm run build` succeeds. `npm run typecheck` passes. `npm run lint` passes.

---

### Phase 2: Design Foundation

**Goal**: Complete design token system implemented in CSS. Typography loading. Global reset and base styles.

- [ ] Create `src/styles/reset.css` — modern CSS reset (box-sizing, margin: 0, font: inherit)
- [ ] Create `src/styles/tokens.css` — paste complete CSS custom properties from Deliverable 10
- [ ] Create `src/styles/typography.css` — base type styles using tokens
- [ ] Create `src/styles/globals.css` — imports above files; sets `body` background/color from tokens; sets `html` `data-theme="dark"` default
- [ ] Configure `next/font/google` for Playfair Display, DM Sans, JetBrains Mono in `src/app/layout.tsx`
- [ ] Implement `useTheme` hook — reads/writes `localStorage` + sets `data-theme` attribute on `<html>`
- [ ] Implement `useReducedMotion` hook — `window.matchMedia('(prefers-reduced-motion: reduce)')`
- [ ] Implement dark/light mode toggle (sets `data-theme` attribute; CSS custom properties switch via `[data-theme="light"]`)
- [ ] Verify fonts load correctly (check in browser — Playfair Display visible in serif context)
- [ ] Verify all CSS tokens resolve (check in DevTools)

**Completion criteria**: Fonts render correctly. Dark/light toggle works. CSS tokens visible in DevTools. No console errors.

---

### Phase 3: Content Layer

**Goal**: Complete MDX content pipeline. All content types parseable. Placeholder content files created.

- [ ] Create `src/types/content.ts` — all content type interfaces from Deliverable 14
- [ ] Create `src/content/loader.ts` — `fs.readFileSync` + `gray-matter` + `compileMDX` + `enrichMetadata`
- [ ] Create `src/content/projects.ts` — `getAllProjects()`, `getProject(slug)`, `getFeaturedProjects()`
- [ ] Create `src/content/blog.ts` — `getAllPosts()`, `getPost(slug)`
- [ ] Create `src/content/experiments.ts`
- [ ] Create `src/content/experience.ts`
- [ ] Create placeholder content files:
  - [ ] `content/projects/project-one.mdx` with `[REPLACE: ...]` frontmatter
  - [ ] `content/projects/project-two.mdx`
  - [ ] `content/projects/project-three.mdx`
  - [ ] `content/experience/experience.mdx`
  - [ ] `content/achievements/achievements.mdx`
- [ ] Write unit tests for content loader (`tests/unit/content-loader.test.ts`)
- [ ] Verify: `getAllProjects()` returns 3 projects. `getProject('project-one')` returns correct shape. Missing optional fields don't throw.

**Completion criteria**: All unit tests pass. Content loader handles missing optional fields gracefully. Frontmatter schema is validated at build time.

---

### Phase 4: Dialogue Engine

**Goal**: Complete dialogue state machine. Tree data defined. Memory system working.

- [ ] Create `src/dialogue/types.ts` — `DialogueNode`, `DialogueChoice`, `DialogueMemory`, `UndercurrentMode` interfaces
- [ ] Create `src/dialogue/tree.ts` — full dialogue tree with all branches (Recruiter A1/A2/A3, CTO B1/B2/B3, Founder C1/C2/C3, Explorer D1/D2, META, CONTACT, COVERAGE nodes) with placeholder text marked `[REPLACE: ...]`
- [ ] Create `src/dialogue/engine.ts` — `useReducer` state machine:
  - Actions: `NAVIGATE`, `REWIND`, `JUMP_TO`, `RESET`, `SET_CONTENT`
  - State: `{ currentNodeId, history, visitedNodes, contentCache }`
  - Selectors: `getCurrentNode()`, `getChoices()`, `canGoBack()`, `getCoveragePercent()`
- [ ] Create `src/dialogue/memory.ts` — `readMemory()`, `writeMemory()`, `clearMemory()` (all with `typeof window !== 'undefined'` SSR guard)
- [ ] Create `src/hooks/useDialogue.ts` — React wrapper around dialogue engine; exposes `currentNode`, `choices`, `navigate()`, `rewind()`, `startOver()`, `coveragePercent`
- [ ] Create `src/hooks/useDialogueMemory.ts` — reads/writes `localStorage.dialogue_memory`; provides `memory`, `isReturningVisitor`, `updateMemory()`, `clearMemory()`
- [ ] Write unit tests for dialogue engine (`tests/unit/dialogue-engine.test.ts`)
- [ ] Verify: navigate from ROOT → A → A1 produces correct history. Rewind restores previous state. Coverage percentage calculates correctly.

**Completion criteria**: All engine unit tests pass. TypeScript strict mode: no errors. Tree data is complete for all 4 primary branches.

---

### Phase 5: Atomic & Compound Components

**Goal**: All components from Deliverable 12 implemented, accessible, and styled.

**Atomic components** (each with `.tsx`, `.module.css`, `index.ts`):
- [ ] `Button` — all variants (primary, secondary, ghost, danger), sizes, loading state, icon support
- [ ] `Badge` — all variants, sizes
- [ ] `Tag` — default and clickable variant, active state
- [ ] `Input` — text, email, textarea, with label, error, and validation states
- [ ] `Icon` — Lucide wrapper with aria handling
- [ ] `PrivacyNotice` — one-line, first-visit only, fade-out timer

**Compound components**:
- [ ] `DialogueBlock` — portfolio voice. Entrance animation (y+16 → 0, opacity 0→1). Playfair Display. Reduced-motion: instant. `aria-live="polite"`.
- [ ] `ChoiceBlock` — visitor choices. Staggered entrance. Keyboard selection (1/2/3, Enter). `role="group"`. `aria-keyshortcuts`.
- [ ] `ProjectCard` — dialogue and listing variants. Graceful without coverImage/liveUrl. Hover scale on image. Focus ring.
- [ ] `CaseStudyView` — dialogue and standalone variants. All sections (Overview, Problem, Solution, Architecture, Challenges, Results, Metrics, Links). Portfolio commentary sidebar in dialogue variant.
- [ ] `ContactForm` — all fields, client validation, server submission to `/api/contact`, success/error states. `aria-invalid`, `aria-describedby` on errors.
- [ ] `ConversationHistory` — desktop sidebar + mobile bottom sheet. Jump-to with confirmation.
- [ ] `CoverageMap` — Canvas2D donut chart. Text summary alongside. Clickable segments.
- [ ] `DialogueNav` — persistent nav. Back button, Start Over, Meta link, theme toggle. `<nav>` with `aria-label`.
- [ ] `ReturnVisitorBanner` — replaces prism on return visits. Two choices. Personalized message.

**Layout components**:
- [ ] `RootLayout` — wraps app. Theme provider, font loading, DialogueNav, PrivacyNotice, UndercurrentCanvas.
- [ ] `DialogueLayout` — split-screen CSS Grid. Portfolio column (left, ratio variable) + Visitor column (right). Responsive: stacks on mobile.
- [ ] `ProseLayout` — single-column centered, max-width 720px, for traditional pages.

**Completion criteria**: All components render in Storybook or isolated test page. All keyboard navigable. No TypeScript errors. Accessibility: all interactive elements have accessible names.

---

### Phase 6: Core Pages

**Goal**: All pages from the sitemap implemented, connected to content and dialogue engine.

- [ ] `src/app/layout.tsx` — RootLayout with DialogueNav, PrivacyNotice, UndercurrentCanvas, theme system, font variables
- [ ] `src/app/page.tsx` — DialoguePage. Detects returning visitor → shows ReturnVisitorBanner or PrismScene. Mounts DialogueLayout. Reads `?path=` param for direct dialogue entry.
- [ ] `src/app/not-found.tsx` — Custom 404. Simple, on-brand. Links back to dialogue.
- [ ] `src/app/error.tsx` — Error boundary with recovery link.
- [ ] `src/app/projects/page.tsx` — ProjectsIndexPage. All projects listing. `generateMetadata()`. JSON-LD CreativeWork list.
- [ ] `src/app/projects/[slug]/page.tsx` — ProjectDetailPage. `generateStaticParams()`. `generateMetadata()`. CaseStudyView standalone. JSON-LD CreativeWork.
- [ ] `src/app/about/page.tsx` — AboutPage with experience, skills, achievements. CTA to dialogue. `generateMetadata()`. JSON-LD Person.
- [ ] `src/app/contact/page.tsx` — Direct ContactPage with ContactForm. `generateMetadata()`.
- [ ] `src/app/meta/page.tsx` — MetaPage self-documentation. Placeholder content. Links to GitHub.
- [ ] `src/app/blog/page.tsx` + `[slug]/page.tsx` — BlogIndexPage, BlogPostPage. (Pages exist but only linked if posts exist.)
- [ ] `src/app/sitemap.ts` — Auto-generated from content.
- [ ] `src/app/robots.ts` — Allow all, reference sitemap.
- [ ] `src/app/api/contact/route.ts` — Edge Runtime. Rate limiting, sanitization, validation, email sending.
- [ ] `src/app/api/og/[...params]/route.tsx` — Edge Runtime. Dynamic OG image generation.

**Completion criteria**: `npm run build` succeeds with no TypeScript errors. All pages accessible at their URLs in `npm run dev`. No `[REPLACE: ...]` accidentally left in rendered HTML (they should only appear in data/config files). `generateStaticParams` correctly enumerates all project slugs.

---

### Phase 7: 3D & Visual Effects

**Goal**: PrismScene working on desktop (R3F) with CSS fallback on mobile/reduced-motion. UndercurrentCanvas ambient layer working.

- [ ] Create `src/hooks/useWebGL.ts` — detects WebGL support, coarse pointer (touch), reduced-motion, deviceMemory. Returns `shouldUseFallback: boolean`.
- [ ] Create `PrismCSS` component — CSS `conic-gradient` + `linear-gradient` layers. Shimmer `@keyframes` animation. `animation-play-state: paused` at reduced-motion. Matches prism dimensions.
- [ ] Create `PrismR3F` component — R3F Canvas (220×220px, transparent, `frameloop="demand"`). `IcosahedronGeometry(1, 2)`. `MeshTransmissionMaterial` (Drei). Three lights (directional, ambient, violet point). Subtle auto-rotation. `dpr={[1, 1.5]}`. On choice: GSAP exit animation (scale 0.6, opacity 0).
- [ ] Create `PrismScene` wrapper — `dynamic()` imports `PrismR3F` with `PrismCSS` as loading fallback. Uses `useWebGL` to decide which to mount.
- [ ] Create `UndercurrentCanvas` — Canvas2D. 7 mode algorithms (neutral, frontend, architecture, ai, philosophy, contact, meta). Two canvases for cross-fade. 24fps target. `position: fixed`, `z-index: -1`, `pointer-events: none`, `aria-hidden`. Renders at 0.25× DPR.
- [ ] Wire undercurrent mode to dialogue state — `useDialogue` exposes `undercurrentMode`; `RootLayout` passes it to `UndercurrentCanvas`.
- [ ] Implement prism exit → dialogue entrance transition (GSAP timeline: prism exits, DialogueLayout enters with split-screen animation).
- [ ] Test prism on desktop (WebGL available) — confirm smooth rotation, glass material.
- [ ] Test prism CSS fallback on mobile (simulate coarse pointer) — confirm shimmer looks premium.
- [ ] Test reduced-motion — confirm static prism, instant content appearance.

**Completion criteria**: Prism renders on desktop. CSS fallback renders on mobile/reduced-motion. Undercurrent changes color when dialogue topic changes. No frame drops (60fps desktop, check via DevTools Performance tab). No console errors.

---

### Phase 8: SEO & Accessibility

**Goal**: All SEO metadata correct. Zero axe-core critical violations on all pages. Keyboard navigation fully working.

- [ ] Create `src/lib/seo.ts` — `generateBaseMetadata()`, `generateProjectMetadata()`, `generateBlogMetadata()`
- [ ] Create `src/lib/structured-data.ts` — `generatePersonLD()`, `generateWebSiteLD()`, `generateCreativeWorkLD()`, `generateArticleLD()`, `generateBreadcrumbLD()`
- [ ] Add `generateMetadata()` to every page file (see Deliverable 15)
- [ ] Add JSON-LD `<script>` tags to all pages
- [ ] Implement OG image generation in `/api/og/[...params]/route.tsx`
- [ ] Verify one `<h1>` per page (automated lint rule: `jsx-a11y/heading-has-content`)
- [ ] Run axe-core on homepage — fix all critical/serious violations
- [ ] Run axe-core on each dialogue path
- [ ] Run axe-core on contact page, project pages, about page
- [ ] Full keyboard walkthrough — navigate all 4 dialogue branches without touching mouse
- [ ] Test with screen reader (NVDA/Windows or VoiceOver/Mac) — all content accessible
- [ ] Verify `prefers-reduced-motion` — all animations disabled; content accessible
- [ ] Verify dark/light mode contrast ratios meet WCAG AA (use DevTools accessibility pane)
- [ ] Submit to Google Search Console (post-deploy) — verify no coverage errors

**Completion criteria**: Zero axe-core `critical` or `serious` violations. All dialogue paths keyboard-navigable. Screen reader can access all content. `generateMetadata()` returns correct values (verify via `curl` response headers on built site).

---

### Phase 9: Testing & CI/CD

**Goal**: Full test suite passing. CI pipeline operational. Preview deployments working.

- [ ] Write all unit tests (`tests/unit/`) per Deliverable 21
- [ ] Write all integration tests (`tests/integration/`) per Deliverable 21
- [ ] Write all E2E tests (`tests/e2e/dialogue-flow.spec.ts`) per Deliverable 21
- [ ] Write accessibility E2E tests (`tests/e2e/accessibility.spec.ts`) per Deliverable 21
- [ ] Configure Vitest (`vitest.config.ts`) with React Testing Library and jsdom
- [ ] Configure Playwright (`playwright.config.ts`) with Chromium target and `localhost:3000` base URL
- [ ] Configure `lighthouserc.json` with score thresholds from Deliverable 21
- [ ] Complete `.github/workflows/ci.yml` — all stages per Deliverable 22
- [ ] Add `.github/workflows/lighthouse.yml`
- [ ] Connect Vercel to GitHub repository (automatic via Vercel dashboard)
- [ ] Set environment variables in Vercel dashboard
- [ ] Open a test PR — verify CI pipeline runs all stages
- [ ] Verify Vercel preview deployment is created for the PR
- [ ] Merge test PR to `main` — verify production deployment

**Completion criteria**: All unit and integration tests pass. E2E tests pass. Lighthouse CI passes (performance ≥ 90, accessibility ≥ 95). CI pipeline completes without errors on PRs. Production deployment live.

---

### Phase 10: Documentation & Launch

**Goal**: Complete documentation. Pre-launch checklist done. Site live.

- [ ] Write `docs/README.md`:
  - Prerequisites (Node 22+, npm)
  - Install: `npm ci`
  - Dev: `npm run dev`
  - Build: `npm run build`
  - Test: `npm run test`, `npm run test:e2e`
  - Folder structure overview
  - Contributing guide

- [ ] Write `docs/CONTENT_GUIDE.md`:
  - How to add a project (step-by-step with frontmatter template)
  - How to add a blog post
  - How to add an experiment
  - How to update experience
  - Dialogue tree content reference (how `contentFilter` works)
  - Placeholder replacement guide (all `[REPLACE: ...]` locations)

- [ ] Write `docs/DEPLOY.md`:
  - Vercel setup instructions
  - Environment variables (what each does)
  - Custom domain setup
  - Rollback instructions

- [ ] Write `docs/CUSTOMISE.md`:
  - How to change colors (edit `tokens.css`)
  - How to change fonts (edit `next/font` config + `tokens.css`)
  - How to change the dialogue tree branches
  - How to add a new section to the portfolio
  - How to enable/disable the blog link

- [ ] Pre-launch checklist:
  - [ ] All `[REPLACE: ...]` placeholders replaced with real content
  - [ ] All 3 project case studies complete (Problem, Solution, Architecture, Results)
  - [ ] Contact form delivers to correct email
  - [ ] Custom domain configured in Vercel
  - [ ] `NEXT_PUBLIC_SITE_URL` set to production URL
  - [ ] `robots.txt` — verify all pages are indexable
  - [ ] `sitemap.xml` — verify all project and page URLs present
  - [ ] Google Search Console — submit sitemap
  - [ ] Run final Lighthouse audit on production URL (target: ≥95 all categories)
  - [ ] Run final axe-core audit on production URL
  - [ ] Test on real mobile device (iOS Safari + Android Chrome)
  - [ ] Test contact form on production
  - [ ] Test return visitor memory on production
  - [ ] Test keyboard navigation on production
  - [ ] Verify Vercel Analytics is receiving data

**Completion criteria**: All documentation written. All placeholders replaced. Lighthouse ≥ 95 on production. Contact form working. Site announced.

---

### Post-Launch

- Add to GitHub profile README
- Submit to Awwwards, CSS Design Awards, Muzli
- Share on Twitter/X, LinkedIn with a short thread about the concept
- Monitor Vercel Analytics for first 2 weeks — track which dialogue paths are most used
- Collect any contact form submissions — iterate on dialogue copy based on real visitor patterns
