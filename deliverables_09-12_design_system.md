# Deliverables 9–12: Design System

---

## Deliverable 9: Visual Design System

### 9.1 Premium Reference Analysis

Before defining the system, extract the principles that make reference products feel premium:

| Product | Core Principle | Applied Technique |
|---------|---------------|-------------------|
| **Apple** | Restraint as luxury | Maximum negative space; one focal point per view; motion that reveals, never decorates |
| **Stripe** | Trust through precision | Pixel-perfect grids; tabular figures; documentation-grade information density |
| **Linear** | Craft signals quality | Sub-pixel rendering care; easing curves that feel physical; dark mode done right |
| **Vercel** | Performance is aesthetic | Fast = beautiful; skeleton states as design elements; mono palette with surgical accent |
| **Notion** | Content is king | Typography as the entire UI; no chrome competing with content |
| **Framer** | Motion as meaning | Transitions that communicate hierarchy, not just decorate |
| **Figma** | Density without chaos | Complex tools feel simple through consistent spatial logic |

**Extracted principles for The Dialogue**:
1. **Typography does the heavy lifting.** Every surface decision serves readability.
2. **Motion reveals hierarchy.** Nothing animates without communicating something.
3. **One accent color, used sparingly.** The accent is precious — it marks what matters.
4. **Dark mode is native, not inverted.** Backgrounds are warm-dark (#0e0e10), not black.
5. **Negative space is structural.** Empty space creates tension that draws the eye to content.
6. **Depth through opacity, not shadow.** Layered translucency for glass; minimal box-shadow.

---

### 9.2 Color System

**Design decision**: Dark mode default. The portfolio is a late-night, focused experience — calm and premium. Light mode supported via CSS custom properties.

#### Dark Mode Palette (Default)

```
Background layer    #0e0e10   — Near-black with warm undertone (not pure black)
Surface level 1     #161618   — Card/panel base
Surface level 2     #1c1c1f   — Elevated surfaces, sidebar
Surface level 3     #242428   — Hover state surfaces, modals
Border subtle       #2a2a2f   — Dividers, borders
Border interactive  #3d3d45   — Focus rings base
```

**Semantic text tokens**:

```
Text primary        #f0f0f2   — Main content, high contrast (~15.5:1 on bg)
Text secondary      #9494a0   — Subtitles, captions (~5.5:1 on bg — AA)
Text tertiary       #5a5a68   — Placeholders, disabled (~3.1:1 — AA large)
Text accent         #c084fc   — Portfolio voice highlight, links
Text inverted       #0e0e10   — Text on light surfaces
```

**Accent color — Violet/Amethyst**:

```
Accent base         #a855f7   — Primary interactive, links
Accent bright       #c084fc   — Portfolio voice text accent
Accent dim          #7c3aed   — Pressed/active states
Accent surface      #2d1b4e   — Accent-tinted surface (e.g., choice block hover bg)
Accent glow         rgba(168, 85, 247, 0.15)  — Glow halos, focus rings
```

**Why violet?** It occupies a unique perceptual space — neither warm nor cold, associated with creativity and premium quality (Figma, Notion dark accent). It complements the AI/systems narrative without being neon.

**Semantic interactive tokens**:

```
Interactive default     #a855f7
Interactive hover       #c084fc
Interactive active      #7c3aed
Interactive disabled    #5a5a68
Focus ring              2px solid #a855f7, offset 2px
```

**Status colors**:

```
Success             #34d399   — Form success states
Warning             #fbbf24   — Optional alerts
Error               #f87171   — Form errors, warnings
Info                #60a5fa   — Informational
```

#### Light Mode Palette

```
Background          #fafaf8   — Warm off-white (not pure white)
Surface level 1     #ffffff
Surface level 2     #f4f4f0
Surface level 3     #ebebE6
Border subtle       #e0e0d8
Border interactive  #c4c4bc
Text primary        #111113
Text secondary      #55555f
Text tertiary       #9494a0
Accent base         #7c3aed   — Deeper violet for light mode contrast
```

#### Undercurrent Palette (Ambient Layer)

```
Neutral / Opening   rgba(148, 148, 160, 0.08)    — Slow drifting noise
Frontend / Warm     rgba(251, 146, 60, 0.08)     — Amber/coral flow
Architecture / Cool rgba(96, 165, 250, 0.08)     — Steel blue grid patterns
AI / Violet         rgba(168, 85, 247, 0.10)     — Neural branching
Philosophy / Gold   rgba(251, 191, 36, 0.07)     — Soft bloom
Contact / Warm      rgba(52, 211, 153, 0.07)     — Calm emerald
Meta / Teal         rgba(45, 212, 191, 0.07)     — Code-like patterns
```

All undercurrent colors are at opacity levels that ensure text contrast is never compromised.

---

### 9.3 Motion System

**Animation personality**: Physical, intentional, unhurried. Motions feel like objects with mass — they accelerate naturally and decelerate with conviction. Nothing bounces or springs unless there's a reason. The overall feeling is "a calm, intelligent system responding to you."

#### Easing Curve Library

```css
/* Entrance — content arriving into view */
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);

/* Exit — content leaving gracefully */
--ease-in-expo:     cubic-bezier(0.7, 0, 0.84, 0);

/* In-out — elements repositioning */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);

/* Overshoot — interactive confirmations only (button press) */
--ease-out-back:    cubic-bezier(0.34, 1.56, 0.64, 1);

/* Spring — choice block selections */
--ease-spring:      cubic-bezier(0.175, 0.885, 0.32, 1.1);

/* NO linear transitions anywhere — ever. */
```

#### Duration Tokens

```css
--duration-instant:   80ms;   /* State changes: hover color, focus ring */
--duration-fast:     150ms;   /* Micro-interactions: button press */
--duration-medium:   300ms;   /* UI transitions: panel open/close */
--duration-slow:     500ms;   /* Scene transitions: portfolio voice appears */
--duration-cinematic: 800ms;  /* Prism entrance, path transitions */
```

#### `prefers-reduced-motion` Rule

Every animation in the codebase is wrapped:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

For complex JS animations (GSAP, Framer Motion): check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before initiating. All content must be immediately accessible at final state.

---

### 9.4 Spacing System

**Base unit**: 4px. All spacing is a multiple of 4.

```css
--space-1:    4px;   /* Hairline: icon-to-label gaps */
--space-2:    8px;   /* Tight: inline padding, badge padding */
--space-3:   12px;   /* Compact: form element padding */
--space-4:   16px;   /* Default: standard padding */
--space-5:   20px;   /* Comfortable: section internal gaps */
--space-6:   24px;   /* Loose: card padding */
--space-8:   32px;   /* Relaxed: section spacing */
--space-10:  40px;   /* Open: major content gaps */
--space-12:  48px;   /* Generous: section padding (mobile) */
--space-16:  64px;   /* Spacious: section padding (desktop) */
--space-20:  80px;   /* Grand: hero padding */
--space-24:  96px;   /* Monumental: major section divisions */
--space-32: 128px;   /* Maximum: between major narrative beats */
```

**Layout tokens**:

```css
--layout-content-max:     1440px;  /* Max dialogue width */
--layout-prose-max:        720px;  /* Traditional pages, case studies */
--layout-portfolio-col:     40%;   /* Portfolio voice column (opening) */
--layout-visitor-col:       60%;   /* Visitor space column (opening) */
--layout-gap:              48px;   /* Column gap in split-screen */
--layout-nav-height:        64px;  /* Persistent nav height */
--layout-choice-max:       480px;  /* Max width for choice blocks */
```

---

### 9.5 Border & Radius System

```css
--radius-sm:    4px;   /* Inline elements, badges, tags */
--radius-md:    8px;   /* Cards, choice blocks, inputs */
--radius-lg:   12px;   /* Modals, panels */
--radius-xl:   20px;   /* Large containers */
--radius-full: 9999px; /* Pills, avatar, toggle */

--border-subtle:      1px solid var(--color-border-subtle);
--border-interactive: 1px solid var(--color-border-interactive);
--border-accent:      1px solid var(--color-accent-base);
```

---

### 9.6 Shadow & Elevation System

Minimal shadows — depth is achieved through surface color, not shadows. Shadows used only where physical depth is needed.

```css
--shadow-xs:  0 1px  2px rgba(0,0,0,0.2);   /* Subtle lift: choice blocks */
--shadow-sm:  0 2px  8px rgba(0,0,0,0.25);  /* Cards */
--shadow-md:  0 4px 16px rgba(0,0,0,0.3);   /* Modals, elevated panels */
--shadow-lg:  0 8px 32px rgba(0,0,0,0.35);  /* Prism container */
--shadow-accent: 0 0 24px var(--color-accent-glow); /* Focus/active accent glow */
```

---

### 9.7 Z-Index System

```css
--z-undercurrent:  -1;   /* Ambient canvas — behind all content */
--z-base:           0;   /* Default flow */
--z-dialogue:      10;   /* Dialogue content blocks */
--z-sticky:        20;   /* Sticky elements within scroll */
--z-nav:           50;   /* Persistent navigation */
--z-prism:         60;   /* Prism canvas */
--z-modal:        100;   /* Modals */
--z-toast:        200;   /* Toast notifications */
--z-cursor:       999;   /* Custom cursor (if implemented) */
```

---

### 9.8 Iconography System

**Icon style**: Line icons, 1.5px stroke weight, rounded line caps and joins. Square grid (24×24px optical sizing).

**Library**: Lucide React — actively maintained, TypeScript-first, MIT license, consistent stroke geometry. Custom icons only where Lucide doesn't have an appropriate glyph.

**Usage rules**:
- Decorative icons: `aria-hidden="true"`
- Interactive icons (buttons without visible label): `aria-label="[Action]"` on the button element
- Icons alongside text: `aria-hidden="true"` (text provides the label)
- Optical size adjustment: at 16px display, use `strokeWidth={2}`; at 24px, `strokeWidth={1.5}`; at 32px+, `strokeWidth={1}`

**Custom icons needed** (to be designed):
- Dialogue bubble (portfolio voice indicator) — custom to avoid chat-app associations
- Coverage map indicator — progress visualization
- Prism/refraction symbol — nav logo option

---

## Deliverable 10: Design Tokens (Complete CSS)

```css
/* ============================================================
   THE DIALOGUE — DESIGN TOKENS
   All values defined once here; never hard-coded elsewhere.
   ============================================================ */

:root {
  /* ── COLOR: BACKGROUNDS ─────────────────────────────────── */
  --color-bg-base:         #0e0e10;
  --color-bg-surface-1:    #161618;
  --color-bg-surface-2:    #1c1c1f;
  --color-bg-surface-3:    #242428;

  /* ── COLOR: BORDERS ─────────────────────────────────────── */
  --color-border-subtle:      #2a2a2f;
  --color-border-interactive: #3d3d45;
  --color-border-accent:      var(--color-accent-base);

  /* ── COLOR: TEXT ─────────────────────────────────────────── */
  --color-text-primary:   #f0f0f2;
  --color-text-secondary: #9494a0;
  --color-text-tertiary:  #5a5a68;
  --color-text-accent:    #c084fc;
  --color-text-inverted:  #0e0e10;

  /* ── COLOR: ACCENT (VIOLET) ──────────────────────────────── */
  --color-accent-base:    #a855f7;
  --color-accent-bright:  #c084fc;
  --color-accent-dim:     #7c3aed;
  --color-accent-surface: #2d1b4e;
  --color-accent-glow:    rgba(168, 85, 247, 0.15);

  /* ── COLOR: INTERACTIVE ──────────────────────────────────── */
  --color-interactive-default:  var(--color-accent-base);
  --color-interactive-hover:    var(--color-accent-bright);
  --color-interactive-active:   var(--color-accent-dim);
  --color-interactive-disabled: var(--color-text-tertiary);

  /* ── COLOR: STATUS ───────────────────────────────────────── */
  --color-success:  #34d399;
  --color-warning:  #fbbf24;
  --color-error:    #f87171;
  --color-info:     #60a5fa;

  /* ── COLOR: UNDERCURRENT ─────────────────────────────────── */
  --undercurrent-neutral:      rgba(148, 148, 160, 0.08);
  --undercurrent-frontend:     rgba(251, 146,  60, 0.08);
  --undercurrent-architecture: rgba( 96, 165, 250, 0.08);
  --undercurrent-ai:           rgba(168,  85, 247, 0.10);
  --undercurrent-philosophy:   rgba(251, 191,  36, 0.07);
  --undercurrent-contact:      rgba( 52, 211, 153, 0.07);
  --undercurrent-meta:         rgba( 45, 212, 191, 0.07);

  /* ── TYPOGRAPHY: FAMILIES ────────────────────────────────── */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-ui:      'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;

  /* ── TYPOGRAPHY: SCALE (fluid clamp) ─────────────────────── */
  --text-xs:     clamp(0.70rem, 0.65rem + 0.25vw, 0.75rem);
  --text-sm:     clamp(0.85rem, 0.80rem + 0.25vw, 0.875rem);
  --text-base:   clamp(1.00rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg:     clamp(1.15rem, 1.05rem + 0.50vw, 1.25rem);
  --text-xl:     clamp(1.25rem, 1.10rem + 0.75vw, 1.50rem);
  --text-2xl:    clamp(1.50rem, 1.25rem + 1.25vw, 2.00rem);
  --text-3xl:    clamp(1.85rem, 1.50rem + 1.75vw, 2.50rem);
  --text-4xl:    clamp(2.25rem, 1.75rem + 2.50vw, 3.25rem);
  --text-5xl:    clamp(2.75rem, 2.00rem + 3.75vw, 4.50rem);
  --text-display: clamp(3.50rem, 2.50rem + 5.00vw, 6.00rem);

  /* ── TYPOGRAPHY: WEIGHTS ─────────────────────────────────── */
  --weight-regular:   400;
  --weight-medium:    500;
  --weight-semibold:  600;
  --weight-bold:      700;
  --weight-black:     900;

  /* ── TYPOGRAPHY: LINE HEIGHTS ────────────────────────────── */
  --leading-none:     1;
  --leading-tight:    1.15;
  --leading-snug:     1.3;
  --leading-normal:   1.5;
  --leading-relaxed:  1.65;
  --leading-loose:    1.8;

  /* ── TYPOGRAPHY: LETTER SPACING ──────────────────────────── */
  --tracking-tight:   -0.03em;
  --tracking-snug:    -0.015em;
  --tracking-normal:   0em;
  --tracking-wide:     0.04em;
  --tracking-wider:    0.08em;
  --tracking-widest:   0.15em;

  /* ── SPACING ─────────────────────────────────────────────── */
  --space-1:    4px;
  --space-2:    8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
  --space-32: 128px;

  /* ── LAYOUT ──────────────────────────────────────────────── */
  --layout-content-max:    1440px;
  --layout-prose-max:       720px;
  --layout-gap:             48px;
  --layout-nav-height:      64px;
  --layout-choice-max:      480px;
  --layout-portfolio-ratio:  40%;
  --layout-visitor-ratio:    60%;

  /* ── MOTION: EASING ──────────────────────────────────────── */
  --ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-expo:      cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-out-back:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring:       cubic-bezier(0.175, 0.885, 0.32, 1.1);

  /* ── MOTION: DURATIONS ───────────────────────────────────── */
  --duration-instant:    80ms;
  --duration-fast:      150ms;
  --duration-medium:    300ms;
  --duration-slow:      500ms;
  --duration-cinematic: 800ms;

  /* ── BORDERS & RADII ─────────────────────────────────────── */
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:   12px;
  --radius-xl:   20px;
  --radius-full: 9999px;

  /* ── SHADOWS ─────────────────────────────────────────────── */
  --shadow-xs:     0 1px  2px rgba(0,0,0,0.2);
  --shadow-sm:     0 2px  8px rgba(0,0,0,0.25);
  --shadow-md:     0 4px 16px rgba(0,0,0,0.3);
  --shadow-lg:     0 8px 32px rgba(0,0,0,0.35);
  --shadow-accent: 0 0   24px var(--color-accent-glow);

  /* ── Z-INDEX ─────────────────────────────────────────────── */
  --z-undercurrent: -1;
  --z-base:          0;
  --z-dialogue:     10;
  --z-sticky:       20;
  --z-nav:          50;
  --z-prism:        60;
  --z-modal:       100;
  --z-toast:       200;
}

/* ── LIGHT MODE OVERRIDES ─────────────────────────────────── */
[data-theme="light"] {
  --color-bg-base:         #fafaf8;
  --color-bg-surface-1:    #ffffff;
  --color-bg-surface-2:    #f4f4f0;
  --color-bg-surface-3:    #ebebE6;
  --color-border-subtle:      #e0e0d8;
  --color-border-interactive: #c4c4bc;
  --color-text-primary:   #111113;
  --color-text-secondary: #55555f;
  --color-text-tertiary:  #9494a0;
  --color-text-accent:    #7c3aed;
  --color-accent-base:    #7c3aed;
  --color-accent-bright:  #9333ea;
  --color-accent-dim:     #6d28d9;
  --color-accent-surface: #ede9fe;
  --color-accent-glow:    rgba(124, 58, 237, 0.12);
}

/* ── REDUCED MOTION ───────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:        0.01ms !important;
    animation-iteration-count: 1      !important;
    transition-duration:       0.01ms !important;
  }
}
```

---

## Deliverable 11: Typography System

### 11.1 Font Selection

**Display typeface — Playfair Display** (Google Fonts)
- **Why**: Elegant high-contrast serif with strong editorial personality. Conveys authority and craft. The contrast between thick and thin strokes creates visual drama appropriate for the portfolio voice. Used by high-end editorial and luxury brands. Not overused in dev portfolios (most use Inter, Poppins, or monospace).
- **Weights used**: 400 (regular), 700 (bold), 900 (black)
- **Used for**: Portfolio voice text, section headings, the opening sequence, display-level statements

**UI typeface — DM Sans** (Google Fonts)
- **Why**: Geometric sans-serif with exceptional legibility at small sizes. Clean optical corrections make it easy to read in UI contexts. Pairs beautifully with Playfair Display — the contrast between serif/sans reinforces the dual-voice identity. More distinctive than Inter while remaining equally versatile.
- **Weights used**: 300 (light), 400 (regular), 500 (medium), 700 (bold)
- **Used for**: Visitor choices, body content, UI elements, labels, navigation, case study body text

**Monospace — JetBrains Mono** (Google Fonts)
- **Why**: Best-in-class developer monospace. Designed for code readability with ligature support. Only used for code samples and the meta/technical content sections.
- **Weights used**: 400 (regular), 500 (medium)

### 11.2 The Dual-Voice Type System

| Element | Voice | Font | Size | Weight | Leading | Tracking |
|---------|-------|------|------|--------|---------|----------|
| Opening statement | Portfolio | Playfair Display | `--text-4xl` | 700 | 1.15 | -0.02em |
| Portfolio dialogue | Portfolio | Playfair Display | `--text-2xl` | 400 | 1.3 | -0.01em |
| Portfolio aside | Portfolio | Playfair Display | `--text-lg` | 400 | 1.5 | 0em |
| Visitor choice | Visitor | DM Sans | `--text-base` | 500 | 1.5 | 0em |
| Visitor choice (hover) | Visitor | DM Sans | `--text-base` | 600 | 1.5 | 0em |
| Case study heading | Content | DM Sans | `--text-2xl` | 700 | 1.15 | -0.02em |
| Case study body | Content | DM Sans | `--text-base` | 400 | 1.65 | 0em |
| Code samples | Code | JetBrains Mono | `--text-sm` | 400 | 1.6 | 0em |
| Labels / overlines | UI | DM Sans | `--text-xs` | 600 | 1 | 0.1em |

### 11.3 Full Type Scale

```
--text-display: clamp(3.50rem, 2.50rem + 5.00vw, 6.00rem)
  → Used for: Maximum impact single-word or name displays

--text-5xl:    clamp(2.75rem, 2.00rem + 3.75vw, 4.50rem)
  → Used for: Opening "This isn't a typical portfolio." line

--text-4xl:    clamp(2.25rem, 1.75rem + 2.50vw, 3.25rem)
  → Used for: Developer name display, major section entries

--text-3xl:    clamp(1.85rem, 1.50rem + 1.75vw, 2.50rem)
  → Used for: Portfolio dialogue statements, project titles

--text-2xl:    clamp(1.50rem, 1.25rem + 1.25vw, 2.00rem)
  → Used for: Portfolio voice body, section headings

--text-xl:     clamp(1.25rem, 1.10rem + 0.75vw, 1.50rem)
  → Used for: Visitor choice text (desktop), sub-headings

--text-lg:     clamp(1.15rem, 1.05rem + 0.50vw, 1.25rem)
  → Used for: Portfolio asides, emphasized body text

--text-base:   clamp(1.00rem, 0.95rem + 0.25vw, 1.125rem)
  → Used for: Body text, visitor choices (mobile), case study body

--text-sm:     clamp(0.85rem, 0.80rem + 0.25vw, 0.875rem)
  → Used for: Captions, code, secondary labels, dates

--text-xs:     clamp(0.70rem, 0.65rem + 0.25vw, 0.75rem)
  → Used for: Overlines, badges, timestamps, tiny labels
```

### 11.4 Reading Rhythm

**Optimal measure (line length)**: 60–75 characters for body text. Portfolio voice column enforces `max-width: 55ch`. Case study body enforces `max-width: 70ch`.

**Paragraph spacing**: `margin-bottom: 1em` for adjacent paragraphs. No extra line between portfolio dialogue statements — their visual weight creates natural rhythm.

**Vertical rhythm**: All line heights resolve to multiples of 4px at each step to maintain a consistent grid baseline.

### 11.5 Google Fonts Import Strategy

```html
<!-- In <head> — preconnect first, then preload critical fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Display serif — subset to Latin, only used weights -->
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" />

<!-- UI sans — subset to Latin, all weights -->
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap" />

<!-- Mono — subset to Latin+code characters -->
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" />
```

**Performance note**: Fonts are loaded with `display=swap` for zero FOIT. Critical path renders with system fonts; Playfair Display and DM Sans swap in < 100ms on repeat visits (cached). Self-host via `next/font/google` for automatic optimization in Next.js.

---

## Deliverable 12: Component Inventory

### 12.1 Atomic Components

---

#### `Button`
**Purpose**: Primary interactive action trigger.

**Props**:
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}
```

**States**: Default → Hover (accent-bright, shadow-accent) → Active (accent-dim, scale 0.98) → Disabled (opacity 0.4, no-cursor) → Loading (spinner replaces icon)

**Accessibility**: `role="button"`, `aria-disabled` when disabled, `aria-busy` when loading. Focus ring using `--shadow-accent`.

**Animation**: Hover background transitions in `--duration-instant`. Active scale in `--duration-fast` with `--ease-out-back`. No animation at `prefers-reduced-motion`.

---

#### `Badge`
**Purpose**: Status indicator, tech tag, category label.

**Props**:
```typescript
interface BadgeProps {
  label: string;
  variant: 'default' | 'accent' | 'success' | 'warning' | 'error';
  size: 'sm' | 'md';
}
```

**States**: Default only (non-interactive). If inside a clickable element, inherits parent focus state.

**Accessibility**: `aria-label` if label alone is ambiguous. Otherwise content is sufficient.

---

#### `Tag`
**Purpose**: Technology/skill labels on project cards. Clickable variant for filtering.

**Props**:
```typescript
interface TagProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
  href?: string;
}
```

**States**: Default → Hover (accent-surface bg) → Active (accent-surface bg, accent border) → Focused (focus ring)

**Accessibility**: When `onClick` or `href` provided: `role="button"` or native `<a>`. `aria-pressed` when `active`.

---

#### `Input`
**Purpose**: Text input for contact form fields.

**Props**:
```typescript
interface InputProps {
  id: string;           // Required — always associated with a label
  label: string;
  type: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  rows?: number;        // textarea only
}
```

**States**: Default → Focus (accent border, accent glow shadow) → Error (error border, error message) → Disabled → Valid (success border)

**Accessibility**: `<label>` always rendered and associated via `htmlFor`/`id`. `aria-invalid` + `aria-describedby` on error. Never hide the label — use `--text-sm` if space is tight.

---

#### `Icon`
**Purpose**: Lucide React icon wrapper with standardized sizing and accessibility.

**Props**:
```typescript
interface IconProps {
  name: LucideIconName;     // Type-safe icon name
  size?: 16 | 20 | 24 | 32;
  label?: string;           // If provided: aria-label on wrapper. If absent: aria-hidden
  className?: string;
}
```

**Accessibility**: If `label` provided → `role="img"` + `aria-label`. If no `label` → `aria-hidden="true"`.

---

#### `PrivacyNotice`
**Purpose**: First-visit localStorage disclosure. One line only, never a banner.

**Props**:
```typescript
interface PrivacyNoticeProps {
  onDismiss: () => void;
  onClear: () => void;
}
```

**Render**: Fixed bottom-left, `--text-xs`, `--color-text-tertiary`. Text: "I remember returning visitors. [Clear anytime.](#)" Appears only on first visit. Fades out after 8 seconds or on dismiss. Does not block interaction.

**Accessibility**: `role="status"`, `aria-live="polite"`. Dismiss button has `aria-label="Dismiss privacy notice"`.

---

### 12.2 Compound Components

---

#### `DialogueBlock`
**Purpose**: The portfolio's "speaking" blocks — the portfolio's voice rendered in the left column.

**Props**:
```typescript
interface DialogueBlockProps {
  text: string;             // Portfolio voice text (may include inline emphasis)
  nodeId: string;           // Dialogue tree node ID
  isNew?: boolean;          // Triggers entrance animation
  undercurrentMode?: UndercurrentMode; // Controls ambient layer
}
```

**States**: Entering (opacity 0 → 1, y +16px → 0, `--duration-slow`, `--ease-out-expo`) → Settled → Previous (opacity reduced to 0.7, scrolled above current)

**Typography**: Playfair Display, `--text-2xl`, `--leading-snug`, `--tracking-snug`. Color `--color-text-primary`.

**Accessibility**: `role="article"`, `aria-label="Portfolio message"`. When new block appears: `aria-live="polite"` region announces it to screen readers.

**Reduced motion**: Block appears instantly at full opacity.

---

#### `ChoiceBlock`
**Purpose**: The visitor's available response choices in the right column.

**Props**:
```typescript
interface ChoiceBlockProps {
  choices: DialogueChoice[];
  onSelect: (choiceId: string) => void;
  isVisible: boolean;
}

interface DialogueChoice {
  id: string;
  text: string;
  leadsTo: string;
  shortcut?: string;    // Keyboard shortcut hint e.g., "1", "2", "3"
}
```

**States (per choice)**: Default → Hover (accent-surface bg, left accent border brightens, subtle x-translate +4px) → Active (scale 0.98) → Selected (choice selected, others fade out, accordion-close animation) → Disabled (during transition)

**Keyboard**: Tab moves between choices. Enter or Space selects. Number keys select by index (1, 2, 3).

**Accessibility**: `role="group"`, `aria-label="Choose your path"`. Each choice: `role="button"`, `aria-keyshortcuts` if shortcut defined. `aria-disabled` during transition.

**Animation**: Choices stagger in with 40ms delay between each (skipped at `prefers-reduced-motion`).

---

#### `ProjectCard`
**Purpose**: Preview card for a project within the dialogue or project listing.

**Props**:
```typescript
interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  tags: string[];
  coverImage?: string;    // next/image — optional, graceful without
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  variant: 'dialogue' | 'listing'; // dialogue = compact; listing = full
}
```

**States**: Default → Hover (surface-2 → surface-3 bg, shadow-sm → shadow-md, cover image subtle scale 1.02) → Focused (focus ring) → Active

**Accessibility**: Entire card is a single focusable link (`<article>` containing `<a>`). Tech tags are decorative inside the card (`aria-hidden`). External links (live, github) have `target="_blank"` with `aria-label="[Project] — opens in new tab"`.

**Resilience**: Renders correctly without `coverImage`, `liveUrl`, or `githubUrl`. Missing optional fields are simply absent, no broken layouts.

---

#### `CaseStudyView`
**Purpose**: Full project case study — rendered in the visitor column when a project is opened within the dialogue, or at `/projects/[slug]`.

**Props**:
```typescript
interface CaseStudyViewProps {
  project: Project;
  onBack?: () => void;           // Back to dialogue (dialogue context only)
  portfolioCommentary?: string;  // Portfolio voice sidebar text (dialogue context only)
  variant: 'dialogue' | 'standalone';
}
```

**Sections rendered**: Overview → Problem → Solution → Architecture → Challenges → Results → Metrics → Links

**Accessibility**: Single `<h1>` (project title). Heading hierarchy: `<h2>` per section. All images have `alt` text (required in frontmatter) or `aria-hidden` if decorative. Architecture diagrams: include text description alongside image.

---

#### `PrismScene`
**Purpose**: The opening 3D crystalline prism. R3F on capable desktop; CSS fallback on mobile/reduced-motion.

**Props**:
```typescript
interface PrismSceneProps {
  onChoiceSelected: (choiceId: string) => void;
  isReturningVisitor: boolean;
}
```

**Implementation strategy**:
1. Detect WebGL capability: `WebGLRenderingContext` available
2. Detect motion preference: `matchMedia('(prefers-reduced-motion: reduce)')`
3. Detect device: coarse pointer media query (touch device)
4. **Desktop + WebGL + no-reduced-motion** → R3F scene (Three.js IcosahedronGeometry, Drei `MeshTransmissionMaterial` for glass, dynamic lighting, subtle rotation)
5. **All others** → CSS fallback: `conic-gradient` + `linear-gradient` layers creating a prismatic shimmer effect; animated with `@keyframes` shimmer using `animation-play-state: paused` at reduced-motion

**R3F Prism specifics**:
- Geometry: `IcosahedronGeometry(1, 2)` — low-poly crystal form
- Material: `MeshTransmissionMaterial` (Drei) — physically-based glass/crystal
- Lighting: `<directionalLight>` (key), `<ambientLight>` (fill), `<pointLight>` (accent, violet)
- Canvas: 220×220px, transparent background, `dpr={[1, 1.5]}` (cap at 1.5 for performance)
- On first choice: GSAP timeline — prism scales to 0.6, opacity 0, canvas fades out over 600ms

**Accessibility**: `aria-hidden="true"` on canvas (purely visual). Text and choices are DOM elements, not canvas.

---

#### `UndercurrentCanvas`
**Purpose**: The ambient generative visual layer (10–15% opacity) beneath all content.

**Props**:
```typescript
interface UndercurrentCanvasProps {
  mode: UndercurrentMode;
}

type UndercurrentMode =
  | 'neutral'
  | 'frontend'
  | 'architecture'
  | 'ai'
  | 'philosophy'
  | 'contact'
  | 'meta';
```

**Implementation**: Canvas2D (not WebGL). Each mode has a simple generative algorithm:
- `neutral`: Perlin-noise-based slow drift of color stops on an offscreen canvas
- `frontend`: Flowing sine curves in warm tones
- `architecture`: Grid with subtle perspective warp
- `ai`: Branching lines (L-system inspired, simple iteration)
- `philosophy`: Radial gradient bloom, slowly expanding
- `contact`: Steady horizontal wave
- `meta`: Dot-grid pattern, slowly shifting

**Performance**: Renders at 0.25× device pixel ratio. `requestAnimationFrame` with 24fps target (not 60fps — smooth enough for a background, half the GPU cost). Canvas is `position: fixed`, `z-index: var(--z-undercurrent)`, `pointer-events: none`, `aria-hidden: true`.

**Mode transition**: Two canvases layered. When mode changes, cross-fade opacity of canvases over 2000ms.

**Reduced motion**: Single static canvas, no animation, just a CSS solid color at 5% opacity.

---

#### `DialogueNav`
**Purpose**: The persistent navigation bar present throughout the experience.

**Props**:
```typescript
interface DialogueNavProps {
  canGoBack: boolean;
  onBack: () => void;
  onStartOver: () => void;
  onThemeToggle: () => void;
  currentTheme: 'dark' | 'light';
  showBlogLink: boolean;    // Only true if blog content exists
}
```

**Layout**: Left: Name/Logo + Back arrow (when applicable). Right: Meta link, Settings, Theme toggle.

**Back behavior**: Pops last node from conversation history stack. Returns to previous dialogue node with reverse animation. Does NOT use browser history (to avoid conflicts with dialogue state).

**Accessibility**: `<nav>`, `aria-label="Main navigation"`. All buttons have visible labels or `aria-label`. Theme toggle: `aria-label="Switch to light/dark mode"`, `aria-pressed` for current state.

---

#### `ConversationHistory`
**Purpose**: Sidebar/panel showing the path taken through the dialogue.

**Props**:
```typescript
interface ConversationHistoryProps {
  history: DialogueNode[];
  onJumpTo: (nodeId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}
```

**Desktop**: Narrow collapsible sidebar on the left edge of the portfolio column. Shows node labels as a vertical list. Clicking jumps to that point (with confirmation: "Go back to this point? Your progress beyond here will be rewound.").

**Mobile**: Bottom sheet, triggered by history icon in nav. Full-width panel.

**Accessibility**: `role="navigation"`, `aria-label="Conversation history"`. Each history item: `role="link"`. `aria-current="true"` on current node.

---

#### `CoverageMap`
**Purpose**: Visual indicator of explored vs. unexplored dialogue content.

**Props**:
```typescript
interface CoverageMapProps {
  visitedNodes: string[];
  totalNodes: number;
  onNavigateTo: (nodeId: string) => void;
}
```

**Visual**: A circular donut chart (Canvas2D) with segments per dialogue branch. Filled segments = visited. Empty = not yet explored. Below: "You've seen [X]% of this portfolio." with suggested unvisited content.

**Accessibility**: Text summary always accompanies the chart. Clickable unvisited segments have `aria-label="Explore [branch name]"`.

---

#### `ContactForm`
**Purpose**: Contact form with server-side validation and rate limiting.

**Props**:
```typescript
interface ContactFormProps {
  prefilledContext?: string;  // Auto-filled from dialogue path
}
```

**Fields**: Name (required), Email (required, format validated), Context (pre-filled, editable), Message (required, min 20 chars).

**Validation**: Client-side for UX; server-side for security. Never trust client validation alone.

**Submission**: POST to `/api/contact` (Edge Route). Rate limit: 5 per IP per hour (enforced server-side). Response: success message or user-facing error (never expose server details).

**Accessibility**: All fields have associated `<label>`. Error messages use `role="alert"` and `aria-describedby`. Form has `aria-label="Contact form"`. Submit button shows `aria-busy` during submission.

---

#### `ReturnVisitorBanner`
**Purpose**: Personalized greeting for returning visitors (2nd visit onward).

**Props**:
```typescript
interface ReturnVisitorBannerProps {
  memory: DialogueMemory;
  onContinue: () => void;
  onStartFresh: () => void;
}
```

**Display**: Replaces prism opening on return visits. Short, personal, two choices: continue or start fresh.

**Accessibility**: `role="main"`, `aria-label="Welcome back"`. Choices follow same keyboard pattern as `ChoiceBlock`.

---

### 12.3 Page-Level Components

| Component | Purpose | Route |
|-----------|---------|-------|
| `DialoguePage` | Full dialogue experience container | `/` |
| `ProjectsIndexPage` | Traditional project listing | `/projects` |
| `ProjectDetailPage` | Full case study (standalone) | `/projects/[slug]` |
| `BlogIndexPage` | Blog post listing | `/blog` |
| `BlogPostPage` | Individual post | `/blog/[slug]` |
| `AboutPage` | Traditional about page | `/about` |
| `ContactPage` | Direct contact page | `/contact` |
| `MetaPage` | Self-documentation page | `/meta` |

---

### 12.4 Layout Components

| Component | Purpose |
|-----------|---------|
| `RootLayout` | App shell: theme provider, font loading, global styles, nav |
| `DialogueLayout` | Split-screen container with ratio management |
| `ProseLayout` | Single-column prose layout for traditional pages |
| `SplitLayout` | Generic two-column layout with configurable ratio |
