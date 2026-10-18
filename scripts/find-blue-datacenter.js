const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 }
  });

  const url = 'https://unsplash.com/s/photos/data-center-blue-lights?orientation=landscape';
  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  const images = await page.$$eval('figure img', (imgs) => {
    return imgs
      .map(img => ({ alt: img.alt, src: img.src }))
      .filter(i => i.src && i.src.includes('images.unsplash.com/photo-'))
      .slice(0, 15);
  });

  console.log('Results:', JSON.stringify(images, null, 2));
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
