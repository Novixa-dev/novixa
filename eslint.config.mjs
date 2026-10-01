import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

/**
 * ESLint 9 flat config.
 *
 * `next lint` is deprecated (removed in Next.js 16) and this repository had no
 * ESLint configuration at all, so nothing was ever linted. `eslint-config-next`
 * still ships an eslintrc-style config, hence FlatCompat.
 *
 * Deliberately pinned to ESLint 9: ESLint 10 removed legacy config support and
 * `eslint-config-next` does not yet support it, so bumping would break the
 * bridge below.
 */
const config = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'next-env.d.ts',
      '.claude/**',
      'novixa-images-to-use/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // Build/ops scripts are plain CommonJS run by node directly, not through
    // the bundler, so `require()` is correct there.
    files: ['scripts/**/*.js', '*.config.js', '*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    rules: {
      // Every user-facing string goes through `t(ar, en)`, so apostrophes and
      // quotes live inside JS string literals, not JSX text. The default
      // `react/no-unescaped-entities` therefore only fires on the rare literal
      // JSX punctuation and is noise here.
      'react/no-unescaped-entities': 'off',

      // Unused variables are a real signal, but the leading-underscore escape
      // hatch keeps intentionally-ignored destructured values readable.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
];

export default config;
