const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle' });

  // Scroll down to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  const sections = await page.$$('section');
  for (let i = 0; i < sections.length; i++) {
    const text = await sections[i].innerText();
    if (text.includes('النشر والاستضافة') || text.includes('برمجياتك')) {
      await sections[i].screenshot({ path: 'scripts/real-deployment.png' });
      console.log('Saved real-deployment.png');
    }
    if (text.includes('شراكة هندسية مستمرة') || text.includes('اتفاقية صيانة ودعم')) {
      await sections[i].screenshot({ path: 'scripts/real-maintenance.png' });
      console.log('Saved real-maintenance.png');
    }
  }

  await browser.close();
})();
