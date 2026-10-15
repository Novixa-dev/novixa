const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.defer-offscreen { content-visibility: visible !important; }' });
  await page.waitForTimeout(1000);

  // Scroll to Case Studies section showcase card
  const showcase = page.locator('text=المستفيد الميداني الأول من الحل:');
  await showcase.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scripts/casestudy-showcase-resolution.png' });

  // Click on "المعاناة والضغط السابق"
  const frictionBtn = page.locator('button', { hasText: 'المعاناة والضغط' });
  await frictionBtn.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'scripts/casestudy-showcase-friction.png' });

  // Click on ARCH-02 (Aura Medical)
  const tab2 = page.locator('button', { hasText: 'ARCH-02' });
  await tab2.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'scripts/casestudy-showcase-aura.png' });

  // Click on ARCH-03 (Nexus Logistics)
  const tab3 = page.locator('button', { hasText: 'ARCH-03' });
  await tab3.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'scripts/casestudy-showcase-nexus.png' });

  console.log('Detailed showcase screenshots captured!');
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
