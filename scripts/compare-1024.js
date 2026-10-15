const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage({
    viewport: { width: 1024, height: 414 },
    deviceScaleFactor: 1,
  });

  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/screenshot-1024x414.png' });
  console.log('Saved screenshot-1024x414.png');

  await browser.close();
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
