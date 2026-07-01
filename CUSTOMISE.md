# Customisation Guide

A quick reference for customizing the core aesthetics and behaviors of your portfolio.

## Change color palette
All colors are defined as CSS variables in `src/app/globals.css`.

To change the primary accent color or background colors, update the `:root` and `[data-theme='light']` blocks:
```css
:root {
  --color-base: #0e0e10;
  --color-surface: #18181b;
  --color-accent: #a855f7; /* Violet accent - change this! */
  --color-text-primary: #f4f4f5;
  --color-text-secondary: #a1a1aa;
}
```

## Change fonts
To swap fonts, open `src/app/layout.tsx`. The site uses `next/font/google`.

Change the imports to your desired fonts:
```tsx
import { Inter, Space_Grotesk, Fira_Code } from 'next/font/google';

const displayFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const uiFont = Inter({ subsets: ['latin'], variable: '--font-ui' });
const monoFont = Fira_Code({ subsets: ['latin'], variable: '--font-mono' });
```

## Add a new dialogue branch
1. Open `src/lib/dialogue/tree.ts`.
2. Find the node where you want to add a choice (e.g., `ROOT`).
3. Add a new object to the `choices` array:
   ```ts
   { id: 'c_E', text: 'I am a designer', leadsTo: 'E' }
   ```
4. Define the new node `E` in the `DIALOGUE_TREE` object:
   ```ts
   E: {
     id: 'E',
     speaker: 'system',
     type: 'branch',
     text: "Let's talk about pixels and flows.",
     choices: [
       { id: 'c_E1', text: 'View design projects', leadsTo: 'E_AFTER_PROJ' }
     ]
   },
   E_AFTER_PROJ: {
     id: 'E_AFTER_PROJ',
     speaker: 'system',
     type: 'branch',
     text: "Here is my design portfolio.",
     contentFilter: { type: 'project', tags: ['Design'] },
     choices: [
       { id: 'c_E_Contact', text: 'Let’s talk', leadsTo: 'CONTACT' }
     ]
   }
   ```
5. Open `src/lib/dialogue/topics.ts` and map your new node IDs to topics:
   ```ts
   'E': 'Design',
   'E_AFTER_PROJ': 'Design',
   ```

## Add/remove a nav link
Open `src/components/layout/Header.tsx`. You will find the `<nav>` elements in both the desktop header and the mobile menu. Add or remove `<Link>` tags as needed.

## Disable the 3D prism
Open `src/components/dialogue/PrismOpening.tsx`. 
To disable the 3D canvas entirely, remove or comment out the `<PrismScene />` component in the render block.

## Enable/disable blog section
Currently, the blog section only renders if there are files in `src/content/blog`. If you delete the `sample-post.mdx` and keep the directory empty, the `/blog` route will just show an empty list. To remove the blog entirely, delete `src/app/blog/` and remove any links to it in `Header.tsx`.

## Change rate limit threshold
Open `src/app/api/contact/route.ts`. Modify the `RATE_LIMIT_MAX` constant at the top of the file:
```ts
const RATE_LIMIT_MAX = 5; // Change this number
```
