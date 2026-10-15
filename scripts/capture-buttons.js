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

  // Dual engine bottom buttons
  await page.evaluate(() => window.scrollTo(0, 2150));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'scripts/btn-dual-engine-bottom.png' });

  // Services summary buttons
  await page.evaluate(() => window.scrollTo(0, 3600));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'scripts/btn-services-active.png' });

  // Ready solutions & Case studies
  await page.evaluate(() => window.scrollTo(0, 4800));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'scripts/btn-solutions-cards.png' });

  // Final CTA
  await page.evaluate(() => window.scrollTo(0, 10800));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'scripts/btn-final-cta.png' });

  console.log('Detailed buttons screenshots saved!');
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
