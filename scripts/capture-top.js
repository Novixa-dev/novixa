const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1600 },
    deviceScaleFactor: 1,
  });

  await page.goto('http://localhost:3001/ar', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'scripts/screenshot-hero-strip-about.png', clip: { x: 0, y: 0, width: 1440, height: 1400 } });
  console.log('Saved screenshot-hero-strip-about.png');

  // Also 1024x1000
  const page1024 = await browser.newPage({
    viewport: { width: 1024, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page1024.goto('http://localhost:3001/ar', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page1024.waitForTimeout(1000);
  await page1024.screenshot({ path: 'scripts/screenshot-1024-strip-about.png', clip: { x: 0, y: 0, width: 1024, height: 950 } });
  console.log('Saved screenshot-1024-strip-about.png');

  await browser.close();
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
