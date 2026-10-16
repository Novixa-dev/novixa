const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3001/ar', { waitUntil: 'networkidle' });

  // Make all offscreen deferred sections visible
  await page.addStyleTag({ content: '.defer-offscreen { content-visibility: visible !important; }' });
  await page.waitForTimeout(1500);

  const sections = await page.$$('section');
  console.log(`Found ${sections.length} sections`);

  for (let i = 0; i < sections.length; i++) {
    const text = await sections[i].innerText();
    if (text.includes('الأعمال لا تحتاج مزيدًا من الأدوات المتفرقة') || text.includes('novixa-cloud-stream.mp4')) {
      await sections[i].screenshot({ path: 'scripts/verify-video-section.png' });
      console.log('Saved verify-video-section.png');
    }
    if (text.includes('لماذا تختار نوڤيكسا لشراكتك التقنية')) {
      await sections[i].screenshot({ path: 'scripts/verify-partnership-section.png' });
      console.log('Saved verify-partnership-section.png');
    }
    if (text.includes('من فهم التحدي إلى الإطلاق المستقر والمساندة')) {
      await sections[i].screenshot({ path: 'scripts/verify-process-section.png' });
      console.log('Saved verify-process-section.png');
    }
  }

  await browser.close();
})();
