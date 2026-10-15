const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.defer-offscreen { content-visibility: visible !important; }' });
  await page.waitForTimeout(1000);

  // Scroll to ProblemTransformation section
  const heading = page.locator('h2', { hasText: 'الأعمال لا تحتاج مزيدًا من الأدوات' });
  await heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  await page.screenshot({ path: 'scripts/video-section-preview.png' });
  console.log('Saved video-section-preview.png successfully!');

  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
