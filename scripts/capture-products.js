const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.defer-offscreen { content-visibility: visible !important; }' });
  await page.waitForTimeout(1000);

  // Scroll to products
  await page.evaluate(() => {
    window.scrollTo(0, 7600);
  });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'scripts/products-viewport-1440.png' });
  console.log('Saved products-viewport-1440.png');
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
