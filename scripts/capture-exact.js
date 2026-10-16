const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle' });

  // Force all offscreen deferred content to be visible for screenshot verification
  await page.addStyleTag({ content: '.defer-offscreen { content-visibility: visible !important; }' });
  await page.waitForTimeout(1000);

  const sections = await page.$$('section');
  console.log(`Found ${sections.length} sections`);

  for (let i = 0; i < sections.length; i++) {
    const text = await sections[i].innerText();
    if (text.includes('مخطط المعمارية السحابية')) {
      await sections[i].screenshot({ path: 'scripts/real-deployment-full.png' });
      console.log('Saved real-deployment-full.png');
    }
    if (text.includes('لوحة تحكم الصيانة الهندسية')) {
      await sections[i].screenshot({ path: 'scripts/real-maintenance-full.png' });
      console.log('Saved real-maintenance-full.png');
    }
  }

  await browser.close();
})();
