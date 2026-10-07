import { test, expect, type Page } from '@playwright/test';

/**
 * The admin, end to end, against the in-memory store the server runs with in
 * this suite (playwright.config.ts). Every test creates its own uniquely named
 * lead and asserts on that, because the three viewport projects share one
 * server and one store.
 */
const EMAIL = 'e2e-admin@novixa.test';
const PASSWORD = 'e2e-admin-password-not-a-secret';

async function signIn(page: Page) {
  await page.goto('/admin/login');
  await page.getByLabel(/Email|البريد الإلكتروني/).fill(EMAIL);
  await page.getByLabel(/Password|كلمة المرور/).fill(PASSWORD);
  await page.getByRole('button', { name: /Sign in|دخول/ }).click();
  await expect(page).toHaveURL(/\/admin$/);
}

async function submitLead(page: Page, name: string, source: 'contact' | 'start-project' = 'contact') {
  // Each simulated visitor gets its own address: the contact API allows five
  // submissions a minute per client, and three viewports submitting from
  // 127.0.0.1 in parallel trip it — which is the limiter working, not a bug.
  const visitor = `198.51.100.${Math.floor(Math.random() * 250) + 1}`;
  const response = await page.request.post('/api/contact', {
    headers: { 'x-forwarded-for': visitor },
    data: { name, email: 'lead@example.com', company: 'Acme Clinic', phone: '+967 777 000 000', details: 'Bookings by phone today.', language: 'ar', source },
  });
  expect(response.ok()).toBe(true);
  const body = await response.json();
  // No email provider in this suite: the lead must be stored, and the API must
  // say plainly that no email went out.
  expect(body).toMatchObject({ success: true, stored: true, delivered: false });
  return body.receiptId as string;
}

test('signed-out visitors are sent to the login page', async ({ page }) => {
  for (const path of ['/admin', '/admin/leads', '/admin/leads/00000000-0000-0000-0000-000000000000']) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/admin\/login/);
  }
  const csv = await page.request.get('/admin/leads/export', { maxRedirects: 0 });
  expect([302, 303, 307, 308]).toContain(csv.status());
});

test('the admin is never indexed', async ({ page }) => {
  await page.goto('/admin/login');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  const robots = await (await page.request.get('/robots.txt')).text();
  expect(robots).toMatch(/Disallow: \/admin/);
});

test('a wrong password is refused with a message, not a crash', async ({ page }) => {
  await page.goto('/admin/login');
  await page.getByLabel(/Email|البريد الإلكتروني/).fill(EMAIL);
  await page.getByLabel(/Password|كلمة المرور/).fill('definitely-wrong');
  await page.getByRole('button', { name: /Sign in|دخول/ }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/login/);
});

test('an enquiry from the site appears in the admin and can be worked', async ({ page }, testInfo) => {
  const name = `Lead ${testInfo.project.name} ${Date.now()}`;
  const receipt = await submitLead(page, name);

  await signIn(page);
  await expect(page.getByText(name)).toBeVisible();

  // Find it through search, open it.
  await page.goto(`/admin/leads?q=${encodeURIComponent(receipt)}`);
  await page.getByRole('link', { name }).click();
  await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
  await expect(page.getByText('Acme Clinic')).toBeVisible();

  // Move it along the pipeline and leave a note.
  await page.locator('#lead-status').selectOption('contacted');
  await page.getByRole('button', { name: /^(Save|حفظ)$/ }).click();
  await expect(page.locator('#lead-status')).toHaveValue('contacted');
  await page.locator('#lead-notes').fill('Called, sent the console link.');
  await page.getByRole('button', { name: /Save notes|حفظ الملاحظات/ }).click();
  await page.reload();
  await expect(page.locator('#lead-notes')).toHaveValue('Called, sent the console link.');
  await expect(page.locator('#lead-status')).toHaveValue('contacted');
});

test('the CSV export contains the lead and is safe to open', async ({ page }, testInfo) => {
  const name = `=HYPERLINK("http://evil.test") ${testInfo.project.name} ${Date.now()}`;
  const receipt = await submitLead(page, name);
  await signIn(page);

  const response = await page.request.get(`/admin/leads/export?q=${encodeURIComponent(receipt)}`);
  expect(response.headers()['content-type']).toContain('text/csv');
  const csv = await response.text();
  expect(csv.charCodeAt(0)).toBe(0xfeff);
  expect(csv).toContain(receipt);
  // The formula a stranger typed is neutralised, not executed.
  expect(csv).toContain(`"'=HYPERLINK(`);
});

test('a lead can be deleted on request, and only with confirmation', async ({ page }, testInfo) => {
  const name = `Delete me ${testInfo.project.name} ${Date.now()}`;
  const receipt = await submitLead(page, name);
  await signIn(page);
  await page.goto(`/admin/leads?q=${encodeURIComponent(receipt)}`);
  await page.getByRole('link', { name }).click();
  // Wait for the detail page before recording where we are — reading the URL
  // straight after the click captured the list page mid-navigation.
  await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();

  const url = page.url();
  // Without the confirmation box the browser refuses to submit.
  await page.getByRole('button', { name: /^(Delete|حذف)$/ }).click();
  await expect(page).toHaveURL(url);

  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: /^(Delete|حذف)$/ }).click();
  await expect(page).toHaveURL(/\/admin\/leads\?deleted=1/);
  await page.goto(`/admin/leads?q=${encodeURIComponent(receipt)}`);
  await expect(page.getByRole('link', { name })).toHaveCount(0);
});

test('signing out ends the session', async ({ page }) => {
  await signIn(page);
  await page.getByRole('button', { name: /Sign out|خروج/ }).click();
  await expect(page).toHaveURL(/\/admin\/login/);
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login/);
});

test('the admin switches between Arabic and English', async ({ page }) => {
  await signIn(page);
  await expect(page.locator('div[dir]').first()).toHaveAttribute('dir', 'rtl');
  await page.getByRole('button', { name: 'English' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Overview' })).toBeVisible();
  await expect(page.locator('div[dir]').first()).toHaveAttribute('dir', 'ltr');
});
