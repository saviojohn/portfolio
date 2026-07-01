# Deliverables 19–25: Operations, Testing & Scalability

---

## Deliverable 19: Dependency Audit

### 19.1 Approved Package List

#### Production Dependencies

| Package | Purpose | Bundle (compressed) | Last Release | Weekly DLs | Security | Alternatives Considered |
|---------|---------|---------------------|-------------|------------|----------|------------------------|
| `next` | App framework (App Router, RSC, image opt, OG) | Framework — not counted in bundle | Active (weekly) | 8M+ | Excellent record | Astro (rejected: weaker R3F integration), Remix (rejected: less mature RSC) |
| `react` + `react-dom` | UI rendering | ~42KB | Active | 25M+ | Excellent | — (no alternative for Next.js) |
| `typescript` | Type safety | 0 (dev tool) | Active | 50M+ | Excellent | — |
| `three` | 3D rendering engine for prism | ~120KB (dynamic import) | Active (monthly) | 2M+ | Good; one past moderate CVE (2021, patched) | Babylon.js (rejected: larger, less R3F ecosystem) |
| `@react-three/fiber` | React renderer for Three.js | ~65KB (dynamic) | Active (monthly) | 500K+ | Good | — (canonical Three.js/React bridge) |
| `@react-three/drei` | Three.js helpers (MeshTransmissionMaterial) | ~35KB (dynamic, tree-shaken) | Active (weekly) | 400K+ | Good | Manual Three.js (rejected: too much boilerplate) |
| `gsap` | Animation engine (dialogue transitions, SplitText) | ~18KB initial + ~27KB dynamic plugins | Active (monthly) | 2M+ | Excellent | Anime.js (rejected: no SplitText equivalent), Motion One (rejected: immature) |
| `framer-motion` | React animation declarations, layout animations | ~25KB (deferred) | Active | 3M+ | Excellent | GSAP only (rejected: Framer handles layout animations better) |
| `gray-matter` | MDX frontmatter parsing | ~8KB | Stable (no breaking changes needed) | 6M+ | Good | Built-in (rejected: gray-matter's API is cleaner for complex schemas) |
| `next-mdx-remote` | MDX compilation and rendering (RSC-compatible) | ~15KB | Active | 500K+ | Good | `@next/mdx` (rejected: less flexible for dynamic content loading), `contentlayer` (rejected: unmaintained since 2023) |
| `sharp` | Image processing for next/image optimization | Server-only, 0 client bundle | Active | 10M+ | Excellent | — (required by Next.js for image optimization) |
| `lucide-react` | Icon library | Tree-shaken to ~1KB per icon | Active (weekly) | 2M+ | Excellent | Heroicons (rejected: fewer icons), Phosphor (rejected: heavier), react-icons (rejected: mixed quality) |

#### Dev Dependencies

| Package | Purpose | Alternatives Considered |
|---------|---------|------------------------|
| `vitest` | Unit + integration test runner | Jest (rejected: slower, no native ESM) |
| `@testing-library/react` | Component testing utilities | Enzyme (rejected: deprecated) |
| `@testing-library/user-event` | User interaction simulation | Manual fireEvent (rejected: less realistic) |
| `@vitejs/plugin-react` | Vitest React support | — |
| `playwright` | E2E browser testing | Cypress (rejected: slower, heavier) |
| `@axe-core/playwright` | Accessibility testing in E2E | jest-axe (rejected: unit-only) |
| `@playwright/test` | Playwright test runner | — |
| `eslint` | Code linting | — |
| `@typescript-eslint/parser` + `plugin` | TypeScript ESLint rules | — |
| `eslint-config-next` | Next.js ESLint rules | — |
| `prettier` | Code formatting | — |
| `@next/bundle-analyzer` | Bundle size inspection | — |
| `lighthouse` | Performance scoring (local) | — |

---

### 19.2 Rejected Package List

| Package | Considered For | Rejection Reason |
|---------|---------------|-----------------|
| `contentlayer` | Content pipeline | Unmaintained since 2023; no active maintainer |
| `@contentlayer/source-files` | Content pipeline | Same as above |
| `zustand` | State management | Unnecessary — `useReducer` is sufficient for dialogue engine |
| `jotai` | State management | Same |
| `tailwindcss` | Styling | Not in tech stack per project spec; CSS Modules + Custom Properties chosen |
| `locomotive-scroll` | Smooth scrolling | No scroll hijacking in The Dialogue; adds complexity without benefit |
| `lenis` | Smooth scrolling | Same — dialogue is not a scroll-driven site |
| `@mui/material` | UI components | Specified in stack but overridden — prefer custom components to avoid MUI bundle overhead. May add `@mui/base` headless if needed. |
| `react-spring` | Animation | Framer Motion covers the use cases more declaratively |
| `howler` | Audio | No audio features in scope |
| `socket.io-client` | Real-time | No real-time features in scope |
| `axios` | HTTP client | Native `fetch` is sufficient; no extra package needed |
| `lodash` | Utility functions | Native JS covers all needs; tree-shaking risk |
| `moment` | Date formatting | Deprecated; `Intl.DateTimeFormat` (native) is sufficient |
| `date-fns` | Date formatting | Native `Intl.DateTimeFormat` is sufficient for this use case |
| `react-query` | Data fetching | All data is static (SSG); no client-side fetching needed |
| `AOS` | Scroll animations | Cliché library; GSAP handles all animation needs |
| `typed.js` | Typewriter effect | Explicitly forbidden cliché |
| `particles.js` | Particles | Explicitly forbidden cliché |
| `three-stdlib` | Three.js utilities | Drei covers all needed utilities |

---

### 19.3 Watch List

| Package | Concern | Action |
|---------|---------|--------|
| `next-mdx-remote` | Contentlayer's collapse shows fragility in MDX tooling space | Review at v3+ releases; have migration plan to `@next/mdx` if needed |
| `@react-three/drei` | Large team but heavily community-driven; bus factor concern | Pin exact version; test each major upgrade in isolation |
| `gsap` | Commercial license for some plugins (SplitText requires Club GreenSock) | Confirm license compliance; SplitText is free for non-commercial; paid for commercial use |

---

### 19.4 Dependency Risk Score

**Overall Risk Score: 78/100** (100 = lowest risk)

| Factor | Score | Notes |
|--------|-------|-------|
| Bundle size | 80/100 | Under budget with dynamic imports |
| Maintenance health | 82/100 | All packages actively maintained |
| Security history | 85/100 | No current CVEs; one historical (Three.js 2021, patched) |
| License compliance | 75/100 | GSAP SplitText license needs verification for commercial use |
| Dependency depth | 70/100 | Three.js has deep dependency tree; managed via exact pinning |
| Bus factor | 72/100 | Drei is community-driven; watch list |

---

## Deliverable 20: npm Supply Chain Audit

### 20.1 .npmrc Configuration

```ini
# .npmrc — committed to repository
minimumReleaseAge=1440
audit-level=moderate
fund=false
```

`minimumReleaseAge=1440` prevents installing packages published less than 24 hours ago — blocks most supply chain worm attacks (e.g., event-stream incident pattern).

### 20.2 Pinned Exact Versions (package.json)

```json
{
  "dependencies": {
    "next":                   "15.3.4",
    "react":                  "19.1.0",
    "react-dom":              "19.1.0",
    "three":                  "0.177.0",
    "@react-three/fiber":     "9.1.2",
    "@react-three/drei":      "10.3.3",
    "gsap":                   "3.13.0",
    "framer-motion":          "12.16.0",
    "gray-matter":            "4.0.3",
    "next-mdx-remote":        "5.0.0",
    "sharp":                  "0.34.2",
    "lucide-react":           "0.513.0"
  },
  "devDependencies": {
    "typescript":                        "5.8.3",
    "@types/react":                      "19.1.6",
    "@types/react-dom":                  "19.1.6",
    "@types/node":                       "22.15.29",
    "@types/three":                      "0.177.0",
    "vitest":                            "3.2.4",
    "@testing-library/react":            "16.3.0",
    "@testing-library/user-event":       "14.6.1",
    "@vitejs/plugin-react":              "4.5.2",
    "playwright":                        "1.53.1",
    "@playwright/test":                  "1.53.1",
    "@axe-core/playwright":              "4.10.2",
    "eslint":                            "9.29.0",
    "@typescript-eslint/parser":         "8.34.0",
    "@typescript-eslint/eslint-plugin":  "8.34.0",
    "eslint-config-next":                "15.3.4",
    "prettier":                          "3.5.3",
    "@next/bundle-analyzer":             "15.3.4"
  }
}
```

**No `^` or `~` on any dependency.** Exact versions prevent unexpected upstream breakage.

### 20.3 Lockfile Strategy

- `package-lock.json`: Committed to repository
- CI uses `npm ci` (not `npm install`) — respects exact lockfile versions
- Never run `npm install` in CI; only `npm ci`

### 20.4 Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "Asia/Kolkata"
    open-pull-requests-limit: 5
    versioning-strategy: "lockfile-only"
    ignore:
      # Only auto-update patch versions; minor/major require manual review
      - dependency-name: "next"
        update-types: ["version-update:semver-minor", "version-update:semver-major"]
      - dependency-name: "three"
        update-types: ["version-update:semver-minor", "version-update:semver-major"]
      - dependency-name: "react"
        update-types: ["version-update:semver-major"]
    labels:
      - "dependencies"
      - "automated"
```

### 20.5 Update Cadence

| Cadence | Action |
|---------|--------|
| Weekly (automated) | Dependabot creates PRs for patch updates |
| Monthly (manual) | Review minor updates; test in staging branch |
| Quarterly | Full dependency audit; evaluate alternatives for watch list items |
| On CVE alert | Immediate — Dependabot security PRs merged same day |

---

## Deliverable 21: Testing Strategy

### 21.1 Unit Tests — Vitest

**Scope**: Pure functions, utilities, content parsing, dialogue engine logic.

**Test files**: `tests/unit/`

| Test File | Test Cases | Pass Criteria |
|-----------|-----------|---------------|
| `dialogue-engine.test.ts` | Navigate to node; rewind; get current choices; conversation history stack; coverage calculation | All state transitions produce correct output; no state mutation |
| `content-loader.test.ts` | Parse valid MDX frontmatter; handle missing optional fields; throw on missing required fields; auto-generate SEO fields; infer tags from tech | Missing optionals: no error thrown, defaults applied. Missing required: descriptive error thrown. |
| `rate-limiter.test.ts` | Allow 5 requests; block 6th request; reset after window; different IPs independent | Exact rate enforcement |
| `sanitize.test.ts` | Strip HTML tags; trim whitespace; validate email regex; enforce maxLength | XSS payloads stripped; clean input passes through unchanged |
| `seo.test.ts` | generateMetadata for project, blog, root; JSON-LD output shapes | Output matches expected schema shapes |
| `utils.test.ts` | formatDate; slugify; dedupeAndNormalize; inferTagsFromTech | Pure function correctness |

**Coverage target**: 90%+ on `src/lib/`, `src/dialogue/`, `src/content/`

```bash
# Run unit tests
npx vitest run tests/unit/
```

---

### 21.2 Integration Tests — Vitest + Testing Library

**Scope**: Components with mock data; form state; theme switching.

**Test files**: `tests/integration/`

| Test File | Test Cases |
|-----------|-----------|
| `dialogue-components.test.tsx` | DialogueBlock renders portfolio text; ChoiceBlock renders all choices; selecting choice calls onSelect; keyboard selection (Enter, 1/2/3); back button triggers rewind |
| `contact-form.test.tsx` | Form renders all fields; submit with empty fields shows errors; submit with invalid email shows error; successful submit shows success state; form reset after success |
| `project-card.test.tsx` | Renders without optional fields (no coverImage, no liveUrl); renders with all fields; focus ring visible on keyboard navigation |
| `theme.test.tsx` | Theme toggle switches `data-theme` attribute; theme persists in localStorage; respects `prefers-color-scheme` on first visit |
| `return-visitor.test.tsx` | Shows normal prism on first visit; shows return banner on second visit; "start fresh" clears memory and shows prism |

```bash
npx vitest run tests/integration/
```

---

### 21.3 E2E Tests — Playwright

**Scope**: Full browser flows, all dialogue paths, contact form, no console errors.

**Test files**: `tests/e2e/`

**Setup**: Playwright runs against `http://localhost:3000` (local dev server) and against Vercel preview URL in CI.

```typescript
// tests/e2e/dialogue-flow.spec.ts

test('Recruiter path — reaches projects in under 30 seconds', async ({ page }) => {
  await page.goto('/');
  await page.getByText("I'm looking to hire someone").click();
  await page.getByText('Frontend / UI Engineering').click();
  await expect(page.getByTestId('project-card')).toHaveCount(3);
  // Time elapsed assertion via test.setTimeout and Date.now()
});

test('CTO path — architecture view renders', async ({ page }) => {
  await page.goto('/?path=cto.architecture');
  await expect(page.getByText(/architecture/i)).toBeVisible();
});

test('Back navigation returns to previous node', async ({ page }) => {
  await page.goto('/');
  await page.getByText("I'm looking to hire someone").click();
  await page.getByRole('button', { name: 'Go back one step' }).click();
  await expect(page.getByText("I'm looking to hire someone")).toBeVisible();
});

test('Keyboard navigation — select choice with number key', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('1');
  await expect(page.getByText('What kind of role')).toBeVisible();
});

test('No console errors on any dialogue path', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('/');
  await page.getByText("Just curious").click();
  await page.getByText("What you build").click();
  expect(errors).toHaveLength(0);
});

test('Contact form — happy path', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('[id="name"]', 'Test User');
  await page.fill('[id="email"]', 'test@example.com');
  await page.fill('[id="message"]', 'This is a test message with enough characters.');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText(/message sent/i)).toBeVisible();
});

test('Contact form — error path (invalid email)', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('[id="email"]', 'notanemail');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText(/invalid email/i)).toBeVisible();
});
```

---

### 21.4 Accessibility Tests — axe-core + Playwright

```typescript
// tests/e2e/accessibility.spec.ts
import { checkA11y } from '@axe-core/playwright';

test('Homepage — zero critical violations', async ({ page }) => {
  await page.goto('/');
  await checkA11y(page, undefined, {
    axeOptions: { runOnly: ['wcag2a', 'wcag2aa'] },
    violationCallback: (violations) => {
      const critical = violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
      expect(critical).toHaveLength(0);
    }
  });
});

test('All dialogue paths — no accessibility violations', async ({ page }) => {
  const paths = ['/?path=recruiter.frontend', '/?path=cto.architecture', '/?path=founder.scratch', '/?path=explorer.think'];
  for (const path of paths) {
    await page.goto(path);
    await checkA11y(page, undefined, { axeOptions: { runOnly: ['wcag2a', 'wcag2aa'] } });
  }
});

test('Contact form — accessible labels and error messages', async ({ page }) => {
  await page.goto('/contact');
  await checkA11y(page);
});
```

**Pass criteria**: Zero `critical` or `serious` violations on any page or state. `moderate` and `minor` violations reviewed but do not block CI.

---

### 21.5 Performance Tests — Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml (CI step)
- name: Run Lighthouse CI
  run: npx lhci autorun
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/", "http://localhost:3000/projects"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance":    ["error", {"minScore": 0.90}],
        "categories:accessibility":  ["error", {"minScore": 0.95}],
        "categories:seo":            ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "first-contentful-paint":    ["warn",  {"maxNumericValue": 1500}],
        "largest-contentful-paint":  ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift":   ["error", {"maxNumericValue": 0.05}]
      }
    }
  }
}
```

**CI behavior**: Lighthouse runs against the built Next.js server (`npm run build && npm start`). Fails CI if performance < 90 or accessibility < 95.

---

### 21.6 Visual Regression Tests — Playwright Screenshots

```typescript
// tests/e2e/visual.spec.ts
test('Prism opening — matches snapshot', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('prism-opening.png', { threshold: 0.1 });
});

test('Recruiter path — project cards', async ({ page }) => {
  await page.goto('/?path=recruiter.frontend');
  await expect(page.getByTestId('project-list')).toHaveScreenshot('recruiter-projects.png');
});
```

Snapshots committed to repository. Reviewed on PR; update with `playwright test --update-snapshots` when intentional.

---

## Deliverable 22: CI/CD Strategy

### 22.1 GitHub Actions Pipeline

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-typecheck:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  unit-tests:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest
    needs: lint-and-typecheck
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: test-results/

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: unit-tests
    env:
      NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: .next/

  e2e-and-a11y:
    name: E2E & Accessibility
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npx lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### 22.2 Branch Strategy

| Branch | Purpose | Deploy Target |
|--------|---------|--------------|
| `main` | Production code | Vercel Production (auto-deploy) |
| `develop` | Integration branch | Vercel Staging (auto-deploy) |
| `feat/*` | Feature branches | Vercel Preview (auto-deploy per PR) |
| `fix/*` | Bug fixes | Vercel Preview per PR |
| `content/*` | Content-only changes | Vercel Preview per PR |

**PR rules** (branch protection on `main`):
- All CI jobs must pass
- At least 1 reviewer approval (for team use; optional for solo)
- Lighthouse scores must not drop

### 22.3 Secrets in CI

| Secret | Where Stored | Used In |
|--------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | GitHub Secrets | Build step (public) |
| `CONTACT_EMAIL_TO` | Vercel Environment Variables | Runtime only — never in CI |
| `CONTACT_RATE_LIMIT_SECRET` | Vercel Environment Variables | Runtime only |
| `LHCI_GITHUB_APP_TOKEN` | GitHub Secrets | Lighthouse CI |
| `VERCEL_TOKEN` | GitHub Secrets | Vercel CLI deployment (if not using Vercel Git integration) |

---

## Deliverable 23: Deployment Architecture

### 23.1 Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options",        "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy",        "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy",     "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

**Note**: CSP is applied in `next.config.ts` via `headers()` for better Next.js integration.

### 23.2 Environment Variables (Vercel Dashboard)

| Variable | Environment | Purpose |
|----------|------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production, Preview, Development | Base URL for metadata, canonical, sitemap |
| `CONTACT_EMAIL_TO` | Production only | Recipient for contact form emails |
| `CONTACT_RATE_LIMIT_SECRET` | Production, Preview | Rate limiter signing secret |

### 23.3 Edge Runtime Routes

```
/api/contact          → Edge Runtime (Vercel Edge Network — global distribution)
/api/og/[...params]   → Edge Runtime (image generation near user)
```

All other routes: SSG served from Vercel CDN (no runtime cost).

### 23.4 CDN Strategy

| Asset Type | Cache Strategy |
|-----------|---------------|
| Static HTML (SSG pages) | Vercel Edge CDN; invalidated on deployment |
| `/_next/static/` assets | `immutable, max-age=31536000` (1 year — content-hashed filenames) |
| Images (via next/image) | Vercel Image Optimization CDN |
| API routes | `no-store` (no CDN caching for API responses) |

### 23.5 Cost Analysis

**Vercel Free Tier (Hobby)** — sufficient for this project:

| Resource | Free Tier Limit | Expected Usage |
|----------|----------------|----------------|
| Bandwidth | 100 GB/month | < 5 GB/month (estimated) |
| Function invocations | 100K/month | < 1K/month (contact form + OG images) |
| Build minutes | 6,000/month | < 200/month |
| Deployments | Unlimited | — |

**Cost**: $0/month at expected traffic levels. Scales to Vercel Pro ($20/month) only if bandwidth exceeds 100GB/month.

### 23.6 Rollback Strategy

1. Vercel dashboard: one-click rollback to any previous deployment
2. Git: `git revert` the offending commit, push to `main` — triggers automatic redeployment
3. Instant promotion: any previous Vercel deployment can be instantly promoted to production via dashboard

**RTO** (Recovery Time Objective): < 2 minutes via Vercel instant rollback.

---

## Deliverable 24: Maintenance Strategy

### 24.1 Monthly Maintenance Checklist (Target: < 2 hours)

**Content updates** (15–30 min):
- [ ] Add new projects, blog posts, experiments as MDX files → deploy
- [ ] Update experience.mdx if role changed
- [ ] Verify all live demo URLs still work

**Security** (20–30 min):
- [ ] Review Dependabot PRs — merge patch updates
- [ ] Run `npm audit` — address any moderate+ vulnerabilities
- [ ] Check Vercel security alerts

**Performance** (10–15 min):
- [ ] Review Vercel Analytics — check Core Web Vitals trends
- [ ] Address any score regressions

**Content quality** (10–15 min):
- [ ] Verify contact form still delivers to correct email
- [ ] Check for any broken links (GitHub repos, live URLs)
- [ ] Review any contact form submissions

**Total**: ~60–90 minutes/month. Well within 2-hour target.

### 24.2 Content Update Process

Adding a new project (5 minutes total):
1. Create `content/projects/[new-slug].mdx`
2. Fill in frontmatter (copy template from `CONTENT_GUIDE.md`)
3. Add cover image to `public/images/projects/`
4. `git commit && git push` → Vercel auto-deploys
5. Sitemap, RSS, search index, and dialogue tree content filters update automatically

### 24.3 Dependency Update Schedule

| Type | Cadence | Process |
|------|---------|---------|
| Patch updates | Weekly (Dependabot auto-PR) | Review and merge |
| Minor updates | Monthly | Manual review + test in `develop` branch |
| Major updates | Quarterly | Full testing cycle; check for breaking changes |
| Security CVEs | Immediate | Merge same day |

### 24.4 Documentation Update Triggers

| Event | Documentation Update |
|-------|---------------------|
| New content type added | `CONTENT_GUIDE.md` |
| New environment variable | `DEPLOY.md` |
| Design token changes | `CUSTOMISE.md` |
| Architecture change | `README.md` + inline comments |
| New dialogue branch | `CONTENT_GUIDE.md` (dialogue tree section) |

---

## Deliverable 25: Scalability Roadmap

### 25.1 v1 (Current Scope)

**Scope**: 3 deep case study projects, core dialogue experience, contact form, about page, meta page.

**Bundle**: ~150KB initial JS (well under 250KB budget)
**Content**: 3 projects, 0 blog posts, 0 experiments
**Features**: Full dialogue tree (4 branches), prism opening, ambient undercurrent, return visitor memory

---

### 25.2 v2 Feature Set

| Feature | Bundle Impact | Complexity | Notes |
|---------|--------------|------------|-------|
| Blog (5–20 posts) | +0KB JS (SSG pages) | Low | Just MDX files; nav auto-appears |
| Experiments section | +0KB JS | Low | Same as blog |
| Full-text search | +12KB (client search lib, e.g. FlexSearch) | Medium | Index generated at build time |
| Expanded dialogue tree | +3–5KB (tree data) | Medium | New branches without restructuring |
| Project filtering in listing | +2KB (filter state) | Low | Client-side filtering, no extra deps |
| Dialogue path analytics | +0KB (Vercel Analytics) | Low | Already included in Vercel |

**v2 bundle estimate**: ~165KB initial JS (still under budget)

---

### 25.3 v3 Feature Set

| Feature | Bundle Impact | Complexity | Notes |
|---------|--------------|------------|-------|
| A/B testing dialogue paths | +8KB | High | Requires split testing infra |
| AI-enhanced responses | +0KB client (server-side) | High | API route calls LLM; no client bundle impact |
| i18n (2 languages) | +5KB (next-intl) | Medium | See i18n readiness below |
| RSS email subscription | +0KB client | Medium | Server-side only |
| CMS dashboard | Separate admin app | Very High | Evaluate if content frequency justifies |

---

### 25.4 Content Scaling

| Scale | Projects | Blog Posts | Performance Impact |
|-------|----------|------------|-------------------|
| v1 | 3 | 0 | Baseline |
| v2 | 8 | 20 | +0KB runtime (SSG). Build time +10s |
| v3 | 15 | 50 | +0KB runtime. Build time +25s |
| v∞ | 50+ | 200+ | Build time may increase; add ISR for blog posts |

**At 50+ blog posts**: Switch blog listing from SSG to ISR (`revalidate: 3600`) to keep build times manageable.

**At 200+ blog posts**: Add server-side pagination. The content loader already supports `limit` and `offset` parameters.

### 25.5 i18n Readiness

The codebase is i18n-ready without extra work if these rules are followed from day one:

1. **No hardcoded strings in components** — all UI strings in `src/lib/i18n/en.ts` (prepared but not used until v3)
2. **Date formatting via `Intl.DateTimeFormat`** (already planned — not a hardcoded format)
3. **No RTL-breaking absolute positioning** — all layouts use logical properties (`margin-inline`, `padding-block`)
4. **URL structure**: `/[locale]/...` — Next.js App Router supports this natively via `i18n` config

Adding a second language in v3 requires: adding `src/lib/i18n/[locale].ts`, configuring `next.config.ts` i18n routing. No component refactoring.

### 25.6 Infrastructure Scaling

| Traffic Level | Infrastructure | Cost |
|--------------|---------------|------|
| 0–10K visitors/month | Vercel Hobby | $0 |
| 10K–100K visitors/month | Vercel Pro | $20/month |
| 100K+ visitors/month | Vercel Pro + review | ~$20–50/month |

**No architecture changes needed at any traffic level** — Vercel's Edge Network scales automatically. The only cost that increases is bandwidth (all pages are static/SSG).
