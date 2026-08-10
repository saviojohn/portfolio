import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: ['.next/', 'out/', 'coverage/', 'playwright-report/', 'test-results/', 'next-env.d.ts', 'node_modules/', 'scratch/'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Enforce no implicit any
      '@typescript-eslint/no-explicit-any': 'error',
      // Prevent unused variables (allow _ prefix for intentional ignores)
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Enforce consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      // Accessibility: require alt text
      'jsx-a11y/alt-text': 'error',
      // Accessibility: require labels on form inputs
      'jsx-a11y/label-has-associated-control': 'error',
      // No console.log in production code (use console.error/warn only)
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
];

export default eslintConfig;
