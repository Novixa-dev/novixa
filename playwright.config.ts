import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end configuration.
 *
 * Tests run against a real production build (`next build` + `next start`),
 * not the dev server: dev mode skips the static prerendering, bundling and
 * minification that the defects we care about actually live in. A locale
 * leak or an RTL regression that only appears in the prerendered HTML would
 * pass against `next dev`.
 */

const PORT = Number(process.env.E2E_PORT ?? 3100);
const baseURL = `http://127.0.0.1:${PORT}`;

/**
 * Browsers are provisioned by the environment rather than downloaded by
 * Playwright (`PLAYWRIGHT_BROWSERS_PATH`). When that path is set we point at
 * the Chromium already on disk instead of a per-install copy.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: './e2e',
  // A locale leak is a content bug, not a timing bug: retrying hides nothing
  // useful locally, but CI runners are noisy enough to warrant one retry.
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  timeout: 30_000,
  expect: { timeout: 7_000 },

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: executablePath ? { executablePath } : {},
  },

  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      // The navbar breakpoint has broken twice at tablet width (md:→lg:→xl:),
      // so that width gets its own project rather than an occasional check.
      name: 'tablet',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 900 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
    },
  ],

  webServer: {
    command: `npx next start --port ${PORT}`,
    url: baseURL,
    // Never reuse a server that is already listening. A stale `next start`
    // from an earlier build silently answered an entire debugging session
    // here, making every measurement describe a build that no longer existed.
    // Always starting a fresh server against the current build costs a few
    // seconds and removes a whole class of false results.
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_SITE_URL: baseURL,
    },
  },
});
