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

  console.log('Searching Unsplash for business-partnership...');
  await page.goto('https://unsplash.com/s/photos/business-partnership', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  const images = await page.$$eval('img[srcset]', (imgs) => {
    return imgs
      .map(img => img.src)
      .filter(src => src.includes('images.unsplash.com/photo-'))
      .slice(0, 10);
  });

  console.log('Found Unsplash images:');
  console.log(JSON.stringify(images, null, 2));

  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
