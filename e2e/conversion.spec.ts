import { test, expect } from '@playwright/test';

/**
 * The conversion path is the one flow where a silent failure costs real money:
 * a visitor fills the form, sees nothing or a false success, and the enquiry
 * is lost. These tests assert the states a production form must have —
 * validation, loading, success, and a *truthful* failure.
 */

test('the contact form refuses to submit empty and names each problem', async ({ page }) => {
  await page.goto('/ar/contact');

  const submit = page.getByRole('button', { name: /أرسل|إرسال/ }).first();
  await submit.click();

  // Errors must be announced, not merely coloured red.
  const errors = page.locator('[role="alert"], [aria-invalid="true"]');
  await expect(errors.first()).toBeVisible();
});

test('a server failure is reported as a failure, never as success', async ({ page }) => {
  // The API previously returned success even when delivery had not happened.
  // Force a 502 and assert the UI tells the truth about it.
  await page.route('**/api/contact', (route) =>
    route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: JSON.stringify({ success: false, error: 'اختبار: تعذر الإرسال.' }),
    })
  );

  await page.goto('/ar/contact');
  await page.getByLabel(/الاسم/i).first().fill('اختبار آلي');
  await page.getByLabel(/البريد/i).first().fill('qa@example.com');
  await page.getByLabel(/الهاتف|الواتساب/i).first().fill('770000000');
  const message = page.getByLabel(/رسالتك|تفاصيل|وصف/i).first();
  if (await message.count()) await message.fill('رسالة اختبار آلي للتحقق من معالجة الأخطاء.');

  await page.getByRole('button', { name: /أرسل|إرسال/ }).first().click();

  await expect(page.getByText(/تعذر|فشل|حاول/).first()).toBeVisible({ timeout: 10_000 });
  await expect(page.getByText(/تم الإرسال بنجاح|شكراً لتواصلك/)).toHaveCount(0);
});

test('the honeypot field is hidden from real visitors', async ({ page }) => {
  await page.goto('/ar/contact');
  const honeypot = page.locator('input[name="website"]');
  if (!(await honeypot.count())) return;

  // Deliberately not `display: none` — bots skip those. It is visually
  // removed and hidden from assistive technology instead, which is what
  // actually needs asserting.
  const state = await honeypot.evaluate((el) => {
    // The wrapper is what removes the field from view — the input itself keeps
    // its intrinsic box and is simply clipped by it, so the wrapper is the
    // thing worth measuring.
    const wrapper = el.closest('[aria-hidden="true"]') as HTMLElement | null;
    const box = wrapper?.getBoundingClientRect();
    return {
      area: box ? box.width * box.height : Number.POSITIVE_INFINITY,
      opacity: wrapper ? Number(getComputedStyle(wrapper).opacity) : 1,
      ariaHidden: Boolean(wrapper),
      tabIndex: el.getAttribute('tabindex'),
    };
  });
  expect(state.area, 'honeypot must occupy no meaningful space').toBeLessThanOrEqual(4);
  expect(state.opacity).toBe(0);
  expect(state.ariaHidden, 'honeypot must be hidden from assistive tech').toBe(true);
  expect(state.tabIndex, 'honeypot must be out of the tab order').toBe('-1');
});

test('the dashboard states up front that its data is illustrative', async ({ page }) => {
  // A demo console that reads as real client results would be a credibility
  // problem, so the disclaimer is a tested requirement rather than a nicety.
  await page.goto('/ar/dashboard');
  const notice = page.getByText(/بيانات توضيحية/).first();
  await expect(notice).toBeVisible();

  // It must sit above the numbers, not below them.
  const noticeY = (await notice.boundingBox())!.y;
  const firstKpi = page.getByText('312').first();
  const kpiY = (await firstKpi.boundingBox())!.y;
  expect(noticeY).toBeLessThan(kpiY);
});

test('the dashboard switches modules and exposes a table view', async ({ page }) => {
  await page.goto('/en/dashboard');

  await page.getByRole('tab', { name: /Property & Portfolio/ }).click();
  await expect(page.getByRole('tab', { name: /Property & Portfolio/ })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await expect(page.getByText('Occupancy')).toBeVisible();

  await page.getByRole('button', { name: /View the data as a table/ }).click();
  await expect(page.locator('table').first()).toBeVisible();
});
