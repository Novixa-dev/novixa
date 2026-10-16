const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle' });

  // Scroll smoothly down the page to trigger all defer-offscreen intersections
  for (let y = 0; y <= 6000; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(1000);

  const sections = await page.$$('section');
  console.log(`Found ${sections.length} sections after scroll`);

  for (let i = 0; i < sections.length; i++) {
    const text = await sections[i].innerText();
    if (text.includes('النشر والاستضافة وإدارة الأنظمة')) {
      await sections[i].screenshot({ path: 'scripts/screenshot-deployment.png' });
      console.log('Captured: screenshot-deployment.png');
    } else if (text.includes('كيف نتعامل مع المشاكل التشغيلية')) {
      await sections[i].screenshot({ path: 'scripts/screenshot-casestudies.png' });
      console.log('Captured: screenshot-casestudies.png');
    } else if (text.includes('الصيانة والدعم الفني المستمر')) {
      await sections[i].screenshot({ path: 'scripts/screenshot-maintenance.png' });
      console.log('Captured: screenshot-maintenance.png');
    }
  }

  await browser.close();
})();
