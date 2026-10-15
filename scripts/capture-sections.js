const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle' });
  
  // Disable content-visibility during screenshot so all sections render in fullPage
  await page.addStyleTag({ content: '.defer-offscreen { content-visibility: visible !important; }' });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'scripts/fullpage-rendered-1440.png', fullPage: true });
  console.log('Saved fullpage-rendered-1440.png successfully!');

  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
