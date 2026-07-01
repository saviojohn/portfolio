# The Dialogue Portfolio

A category-defining digital experience. This is an interactive, conversational portfolio designed for software engineers and designers who want to present their work through dynamic dialogue rather than static scrolling.

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Components) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Vanilla CSS Modules (No Tailwind) |
| **Content** | MDX with `gray-matter` |
| **3D / Canvas** | React Three Fiber, Three.js, Canvas 2D |
| **Testing** | Vitest, Playwright, axe-core |
| **CI/CD** | GitHub Actions |

## Local Dev Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Script Commands

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the Next.js production server (run build first).
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors without emitting files.
- `npm run lint`: Runs ESLint to find code quality issues.
- `npm run test`: Runs the Vitest unit test suite once.
- `npm run test:watch`: Runs Vitest in watch mode (reruns tests on file change).
- `npm run test:coverage`: Runs Vitest and generates a coverage report.
- `npm run test:e2e`: Runs Playwright end-to-end tests in headless mode.
- `npm run test:e2e:ui`: Opens the Playwright UI mode for interactive E2E testing.
- `npm run analyze`: Runs the Next.js bundle analyzer.

## Folder Structure

```
├── .github/          # CI/CD workflows
├── public/           # Static assets (images, fonts, [SCREENSHOT_PLACEHOLDERS])
├── src/
│   ├── app/          # Next.js App Router pages and API routes
│   ├── components/   # React components (layout, dialogue, ui, three, canvas)
│   ├── content/      # MDX files (projects, blog, experience, experiments)
│   ├── context/      # React Context providers (DialogueContext)
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utilities, configs, dialogue engine, content parser
└── tests/
    ├── e2e/          # Playwright end-to-end tests
    └── unit/         # Vitest unit tests
```

*(Note: Ensure you replace screenshot placeholders located in the `public` directory when deploying your actual project.)*

## Guides

- Need to add a new project or blog post? Read the [Content Guide](CONTENT_GUIDE.md).
- Ready to go live? Follow the [Deployment Guide](DEPLOY.md).
- Want to tweak colors or logic? Check the [Customisation Guide](CUSTOMISE.md).
