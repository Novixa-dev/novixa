import { existsSync } from 'node:fs';
import { join } from 'node:path';

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
 * Which Chromium the suite launches.
 *
 * Playwright bundles a browser revision per release and refuses to start if
 * that exact revision is missing. Some environments (CI images, this project's
 * container) provision Chromium themselves under `PLAYWRIGHT_BROWSERS_PATH`
 * instead, and that build is pinned to whichever Playwright version the image
 * was made for. A caret range on `@playwright/test` then breaks the suite
 * without any code changing: 1.63 looked for revision 1243 while the image
 * provided 1194, and all 105 browser tests failed at launch with "Executable
 * doesn't exist" — a toolchain failure that reads exactly like a product one.
 *
 * So resolve an executable explicitly, in order of how specific it is:
 *   1. `PLAYWRIGHT_CHROMIUM_PATH` — an operator saying which binary to use.
 *   2. `<PLAYWRIGHT_BROWSERS_PATH>/chromium` — the provisioned build.
 *   3. nothing, and Playwright uses its own download as normal.
 *
 * Passing `executablePath` also sidesteps the separate `chrome-headless-shell`
 * binary that headless mode would otherwise look for, which the image does not
 * always carry in a matching revision.
 */
function resolveChromium(): string | undefined {
  const explicit = process.env.PLAYWRIGHT_CHROMIUM_PATH;
  if (explicit && existsSync(explicit)) return explicit;

  const provisioned = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (provisioned) {
    const candidate = join(provisioned, 'chromium');
    if (existsSync(candidate)) return candidate;
  }

  return undefined;
}

const executablePath = resolveChromium();

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
