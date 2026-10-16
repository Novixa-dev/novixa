const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle' });

  // Scroll slowly to the bottom so every section mounts
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= bodyHeight; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(1500);

  // Find headings
  const h2s = await page.$$('h2');
  for (const h2 of h2s) {
    const text = await h2.innerText();
    const section = await h2.evaluateHandle((el) => el.closest('section'));
    if (!section || !section.asElement()) continue;

    if (text.includes('كيف نتعامل مع المشاكل التشغيلية')) {
      await section.asElement().screenshot({ path: 'scripts/real-casestudies.png' });
      console.log('Saved real-casestudies.png');
    } else if (text.includes('برمجياتك، منشورة ومدارة')) {
      await section.asElement().screenshot({ path: 'scripts/real-deployment.png' });
      console.log('Saved real-deployment.png');
    } else if (text.includes('شراكة هندسية مستمرة لحماية استثمارك')) {
      await section.asElement().screenshot({ path: 'scripts/real-maintenance.png' });
      console.log('Saved real-maintenance.png');
    }
  }

  await browser.close();
})();
