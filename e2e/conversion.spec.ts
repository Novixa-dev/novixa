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

test('the window selector changes how much history the table shows', async ({ page }) => {
  // The chart is an SVG, so the table is where "did the window actually
  // change?" can be asserted on something a reader can also verify.
  await page.goto('/en/dashboard');
  await page.getByRole('button', { name: /View the data as a table/ }).click();

  const dayRows = page.locator('table').first().locator('tbody tr');
  await expect(dayRows).toHaveCount(14);

  await page.getByRole('button', { name: '30 days' }).click();
  await expect(dayRows).toHaveCount(30);
  await expect(page.getByRole('button', { name: '30 days' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
});

test('widening the window keeps the most recent day unchanged', async ({ page }) => {
  // Generated data that reshuffles when the window changes reads as a bug.
  // The generator guarantees this; this asserts the page actually benefits.
  await page.goto('/en/dashboard');
  await page.getByRole('button', { name: /View the data as a table/ }).click();

  // The table runs oldest-first so it reads in the same direction as the
  // chart, which puts today in the last row — widening the window prepends
  // older history, so the first row is expected to change and the last is not.
  const rows = page.locator('table').first().locator('tbody tr');
  const before = await rows.last().locator('td').innerText();
  const oldestBefore = await rows.first().locator('td').innerText();

  await page.getByRole('button', { name: '90 days' }).click();
  await expect(rows).toHaveCount(90);

  expect(await rows.last().locator('td').innerText()).toBe(before);
  expect(await rows.first().locator('td').innerText()).not.toBe(oldestBefore);
});

test('the console view is shareable through the URL', async ({ page }) => {
  await page.goto('/en/dashboard');
  await page.getByRole('tab', { name: /Property & Portfolio/ }).click();
  await page.getByRole('button', { name: '30 days' }).click();

  await expect(page).toHaveURL(/module=aqar/);
  await expect(page).toHaveURL(/days=30/);

  // The URL has to restore the view, not merely record it.
  await page.goto('/en/dashboard?module=pulse&days=90&table=1');
  await expect(page.getByRole('tab', { name: /Workforce/ })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await expect(page.getByRole('button', { name: '90 days' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  await expect(page.locator('table').first()).toBeVisible();
});

test('arrow keys move between console tabs', async ({ page }) => {
  // role="tablist" promises arrow-key navigation. axe cannot tell whether the
  // promise is kept, so it is asserted here.
  await page.goto('/en/dashboard');

  const firstTab = page.getByRole('tab').first();
  await firstTab.focus();
  await page.keyboard.press('ArrowRight');

  await expect(page.getByRole('tab').nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tab').nth(1)).toBeFocused();

  // Wrapping backwards from the first tab lands on the last.
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab').last()).toHaveAttribute('aria-selected', 'true');
});

test('the exported CSV carries the illustrative-data notice', async ({ page }) => {
  // A spreadsheet of generated figures leaves the page's disclaimer behind.
  // If the file itself has no caveat it is exactly the artefact that could
  // later be mistaken for a client's real numbers.
  await page.goto('/en/dashboard');

  const download = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: /Download data \(CSV\)/ }).click(),
  ]).then(([event]) => event);

  expect(download.suggestedFilename()).toContain('illustrative');

  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(chunk as Buffer);
  const csv = Buffer.concat(chunks).toString('utf8');

  expect(csv.split('\r\n')[0]).toMatch(/Illustrative generated data/);
  expect(csv).toMatch(/Not any client/);
});
