import { test, expect } from '@playwright/test';

/**
 * The nav bar's status dialog used to show regional datacentres with latencies,
 * a 90-day uptime figure and "0 incidents" — none of it measured. It now runs a
 * real check of `/api/health` from the visitor's browser. These tests pin that
 * it reports what the endpoint says, including when the endpoint says the site
 * is unwell, and that none of the old invented figures come back.
 *
 * The chip is hidden below the `2xl` breakpoint, so the suite widens the
 * viewport; the logic under test does not depend on the device.
 */

const COPY = {
  '/ar': { open: 'حالة النظام', operational: 'يعمل بشكل طبيعي', degraded: 'الأداء متدهور', unavailable: 'غير متاحة', unreachable: 'تعذّر الوصول إلى فحص الحالة' },
  '/en': { open: 'System status', operational: 'Operational', degraded: 'Degraded', unavailable: 'Unavailable', unreachable: 'Could not reach the status check' },
} as const;

for (const path of ['/ar', '/en'] as const) {
  const copy = COPY[path];

  test.describe(`${path} status dialog`, () => {
    test.beforeEach(async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'one viewport is enough; the chip needs a very wide one');
      await page.setViewportSize({ width: 1600, height: 900 });
    });

    test('reports the live health check and nothing invented', async ({ page }) => {
      await page.goto(path);
      await page.getByRole('button', { name: copy.open }).first().click();

      const dialog = page.getByRole('dialog', { name: copy.open });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByText(copy.operational)).toBeVisible();
      await expect(dialog.getByText(/\d+ ms/)).toBeVisible();

      for (const invented of [/99\.99/, /me-central/, /Riyadh|الرياض|Dubai|دبي|Jeddah|جدة|Frankfurt|فرانكفورت/, /Incidents|حوادث/, /SLA/]) {
        await expect(dialog).not.toContainText(invented);
      }

      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
    });

    test('says so when the health check reports a problem', async ({ page }) => {
      await page.route('**/api/health', (route) =>
        route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'degraded', version: 'abcdef123456', database: 'unavailable' }),
        })
      );
      await page.goto(path);
      await page.getByRole('button', { name: copy.open }).first().click();

      const dialog = page.getByRole('dialog', { name: copy.open });
      await expect(dialog.getByText(copy.degraded)).toBeVisible();
      await expect(dialog.getByText(copy.unavailable)).toBeVisible();
      await expect(dialog.getByText(copy.operational)).toHaveCount(0);
    });

    test('says so when the health check cannot be reached', async ({ page }) => {
      await page.route('**/api/health', (route) => route.abort());
      await page.goto(path);
      await page.getByRole('button', { name: copy.open }).first().click();

      const dialog = page.getByRole('dialog', { name: copy.open });
      await expect(dialog.getByText(copy.unreachable)).toBeVisible();
      await expect(dialog.getByText(copy.operational)).toHaveCount(0);
    });
  });
}
