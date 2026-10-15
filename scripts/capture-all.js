const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const targets = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'desktop-1920', width: 1920, height: 1080 },
    { name: 'mobile-390', width: 390, height: 844, isMobile: true },
  ];

  for (const t of targets) {
    const page = await browser.newPage({
      viewport: { width: t.width, height: t.height },
      isMobile: t.isMobile || false,
    });
    await page.goto('http://localhost:3001/ar', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `scripts/screenshot-${t.name}.png` });
    console.log(`Saved screenshot-${t.name}.png`);
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
