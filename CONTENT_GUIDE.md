# Content Guide

Welcome to the content guide for your portfolio! This document explains how to manage and update the content on your site.

## How to add a project
Projects live in the `src/content/projects/` directory as `.mdx` files.

**Exact Frontmatter Template:**
```mdx
---
title: "Your Project Title"
description: "A one-sentence summary of the project."
featured: true
publishedDate: "2024-01-01"
tags: ["React", "Typescript", "Frontend"]
tech: ["React", "Next.js", "TailwindCSS"]
problem: "The core problem this project solved."
solution: "How you solved the problem."
architecture: "Brief overview of the technical architecture."
results: "What was the outcome of this project."
metrics: "Key metrics (e.g., 50% faster load times)."
---

Your detailed case study goes here. You can write regular Markdown text, include code snippets, and use React components since this is MDX.
```

**Field Explanations:**
- `title` (Required): The name of your project.
- `description` (Required): A short, punchy summary.
- `featured` (Optional): Set to `true` to show this on the homepage/interactive dialogue.
- `publishedDate` (Optional): Used for sorting projects (YYYY-MM-DD).
- `tags` (Optional): High-level categories (e.g., "Frontend", "Design").
- `tech` (Optional): Specific technologies used (e.g., "React").
- `problem` (Optional): The challenge you faced.
- `solution` (Optional): Your approach to solving it.
- `architecture` (Optional): How it was built.
- `results` (Optional): The outcome.
- `metrics` (Optional): Quantifiable results.

## How to add an experience entry
Experience entries live in `src/content/experience/` as `.mdx` files.

**Template:**
```mdx
---
company: "Company Name"
role: "Job Title"
startDate: "2022-01-01"
endDate: "2024-01-01"
highlights:
  - "Key achievement or responsibility 1"
  - "Key achievement or responsibility 2"
---

Detailed description of your role, team, and the impact you made at this company.
```

## How to write a blog post
Blog posts live in `src/content/blog/` as `.mdx` files.

**Template:**
```mdx
---
title: "Sample Blog Post Title"
excerpt: "A short summary of the blog post."
publishedDate: "2024-02-15T10:00:00Z"
tags: ["engineering", "design"]
---

This is the body of the blog post. You can write your full article here.
```

## How to add an experiment
Experiments live in `src/content/experiments/` as `.mdx` files.

**Template:**
```mdx
---
title: "Sample Experiment Title"
description: "Short description of the experiment or prototype."
publishedDate: "2024-03-01"
tags: ["Three.js", "WebGL"]
---

Description, findings, and embedded visuals of the experiment.
```

## How to change availability status
Open `src/lib/config.ts` and modify the `AVAILABILITY_STATUS` constant:
```ts
export const AVAILABILITY_STATUS = 'open'; // Can be 'open', 'busy', or 'closed'
```

## How to update social links
Open `src/lib/config.ts` and modify the `SOCIAL_LINKS` object:
```ts
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  email: 'hello@yourdomain.com',
};
```

## How to swap accent color
Open `src/app/globals.css` and change the `--color-accent` variable under the `:root` and `[data-theme='light']` blocks:
```css
:root {
  --color-accent: #a855f7; /* Change this hex code */
}
```

## How to change fonts
Open `src/app/layout.tsx`. You will see font definitions at the top using `next/font/google`.
Swap out `Playfair_Display`, `DM_Sans`, or `JetBrains_Mono` with your desired fonts from Google Fonts:
```tsx
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
// Update the imports and the corresponding function calls
```

## Complete List of `[REPLACE: ...]` Placeholders

You need to replace these placeholders with your real content:

**Configuration (`src/lib/config.ts`)**
- `[REPLACE: Your Name]`
- `[REPLACE: https://yourdomain.com]`
- `[REPLACE: Your portfolio description]`
- `[REPLACE: https://github.com/yourusername]`
- `[REPLACE: https://linkedin.com/in/yourusername]`
- `[REPLACE: https://twitter.com/yourusername]`
- `[REPLACE: hello@yourdomain.com]`

**Pages & Components**
- `src/app/about/page.tsx`: `[REPLACE: I am a software engineer focused on bridging the gap...]`
- `src/app/meta/page.tsx`: `[REPLACE: https://github.com/yourusername/portfolio]`

**Dialogue Tree Text (`src/lib/dialogue/tree.ts`)**
- `[REPLACE: Good timing. What kind of role are you filling?]`
- `[REPLACE: That's where I'm sharpest. Here are three projects where the interface was everything:]`
- `[REPLACE: I build end to end. Here's what that looks like:]`
- `[REPLACE: Gladly. These three — and why they matter:]`
- `[REPLACE: Those are the highlights. Want more depth?]`
- `[REPLACE: Let's skip the surface. Pick your lens:]`
- `[REPLACE: Let me show you how I think about systems.]`
- `[REPLACE: Questions I had to answer on these projects:]`
- `[REPLACE: Code quality philosophy — 2 sentences]`
- `[REPLACE: That's the code craft.]`
- `[REPLACE: Scaling is mostly about...]`
- `[REPLACE: Building a team is about...]`
- `[REPLACE: Founder mode engaged. What's the goal?]`
- `[REPLACE: The MVP needs to be fast but not fragile. Here is how I build 0 to 1:]`
- `[REPLACE: Design is a differentiator. Here is how I merge aesthetics with product:]`
- `[REPLACE: These are the early stage wins.]`
- `[REPLACE: What catches your eye first?]`
- `[REPLACE: Here are some of my visual explorations:]`
- `[REPLACE: Here is how I set up my dev environment:]`
- `[REPLACE: Here is a deep dive into something technical:]`
- `[REPLACE: Just exploring the site.]`
- `[REPLACE: My background:]`
- `[REPLACE: Get in touch:]`
- `[REPLACE: You've seen practically everything here. What's next?]`

**Sample Content Files**
- `src/content/blog/sample-post.mdx`: `[REPLACE: Sample Blog Post Title]`, `[REPLACE: A short summary of the blog post]`, `[REPLACE: This is the body of the blog post...]`
- `src/content/experience/sample-job.mdx`: `[REPLACE: Company Name]`, `[REPLACE: Job Title]`, `[REPLACE: Key achievement...]`, `[REPLACE: Detailed description...]`
- `src/content/experiments/sample-experiment.mdx`: `[REPLACE: Sample Experiment Title]`, `[REPLACE: Short description...]`, `[REPLACE: Description, findings...]`
- `src/content/projects/sample-project.mdx`: `[REPLACE: Sample Project Title]`, `[REPLACE: One-sentence description...]`, `[REPLACE: The core problem...]`, `[REPLACE: How you solved the problem]`, `[REPLACE: Brief overview...]`, `[REPLACE: What was the outcome...]`, `[REPLACE: Key metrics...]`, `[REPLACE: This is the main body content...]`
