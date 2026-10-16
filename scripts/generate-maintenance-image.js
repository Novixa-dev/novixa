const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const screen = {
  outFile: 'public/images/maintenance-cockpit.png',
  width: 960,
  height: 520,
  html: `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #060D1A;
      color: #E2E8F0;
      font-family: 'IBM Plex Sans Arabic', sans-serif;
      padding: 16px;
      width: 960px;
      height: 520px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .window {
      background: #0B1324;
      border: 1px solid #1E293B;
      border-radius: 18px;
      box-shadow: 0 25px 60px -15px rgba(0,0,0,0.7), 0 0 35px rgba(16,185,129,0.12);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .win-bar {
      background: #070D18;
      border-bottom: 1px solid #1E293B;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dots { display: flex; gap: 7px; }
    .dot { width: 9px; height: 9px; border-radius: 50%; }
    .dot-r { background: #EF4444; }
    .dot-y { background: #F59E0B; }
    .dot-g { background: #10B981; }
    .badge-live {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #059669;
      color: #34D399;
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 999px;
      font-family: monospace;
      font-weight: 700;
    }
    .grid-dash {
      flex: 1;
      padding: 18px;
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 16px;
      background: #09101F;
    }
    .card {
      background: #0D172B;
      border: 1px solid #1E2E4A;
      border-radius: 12px;
      padding: 14px;
    }
    .stat-val { font-size: 24px; font-weight: 800; font-family: 'Alexandria', sans-serif; color: #34D399; }
    .stat-lbl { font-size: 11px; color: #94A3B8; margin-top: 2px; }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
      <div style="font-size: 12px; font-weight: 700; color: #E2E8F0; font-family: 'Alexandria';">مركز عمليات الدعم والصيانة الهندسية المستمرة • Novixa SLA Control</div>
      <div class="badge-live">● SLA COMPLIANT • 14m MTTR</div>
    </div>
    <div class="grid-dash">
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card">
          <div class="stat-lbl">متوسط سرعة الاستجابة الهندسية (MTTA)</div>
          <div class="stat-val">14 دقيقة <span style="font-size: 12px; color: #38BDF8;">مباشرة</span></div>
          <div style="font-size: 10px; color: #64748B; margin-top: 4px;">الهدف التعاقدي: أقل من 120 دقيقة (متحقق 100%)</div>
        </div>
        <div class="card" style="flex: 1;">
          <div style="font-weight: 700; font-size: 12px; color: #F8FAFC; margin-bottom: 8px;">مؤشرات السلامة البرمجية (Health Matrix)</div>
          <div style="display: flex; flex-direction: column; gap: 7px; font-size: 11px;">
            <div style="display: flex; justify-content: space-between; padding: 6px; background: #081120; border-radius: 6px;">
              <span>أخطاء الاستثناءات (Sentry)</span>
              <span style="color: #34D399; font-family: monospace; font-weight: 700;">0 أخطاء حرجة</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px; background: #081120; border-radius: 6px;">
              <span>تحديثات الأمان التلقائية</span>
              <span style="color: #38BDF8; font-family: monospace; font-weight: 700;">محدثة بالكامل</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px; background: #081120; border-radius: 6px;">
              <span>فحص سرعة الاستعلامات</span>
              <span style="color: #34D399; font-family: monospace; font-weight: 700;">4.2ms avg</span>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card" style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1E2E4A; padding-bottom: 10px; margin-bottom: 12px;">
            <span style="font-weight: 700; font-size: 13px; color: #F8FAFC;">سجل التدخلات والتحسينات التشغيلية المجدولة (Engineering Activity)</span>
            <span style="font-size: 10px; font-family: monospace; color: #34D399; background: rgba(16,185,129,0.1); padding: 2px 8px; border-radius: 4px;">فريق النظم جاهز</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #081120; border: 1px solid #1A2844; border-radius: 8px;">
              <div>
                <div style="color: #FFF; font-weight: 600; font-size: 12px;">تحسين فهارس جداول المبيعات السريعة (PostgreSQL Indexing)</div>
                <div style="color: #64748B; font-size: 10px;">تسريع استعلامات تقرير الإيرادات بنسبة 48% خلال الذروة</div>
              </div>
              <span style="background: rgba(16,185,129,0.15); color: #34D399; border: 1px solid rgba(16,185,129,0.3); padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700;">تم التحسين</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #081120; border: 1px solid #1A2844; border-radius: 8px;">
              <div>
                <div style="color: #FFF; font-weight: 600; font-size: 12px;">ترقية حزمة تشفير الجلسات والمصادقة (JWT Security Patch)</div>
                <div style="color: #64748B; font-size: 10px;">إغلاق ثغرة محتملة وتأمين جلسات الأجهزة المحمولة</div>
              </div>
              <span style="background: rgba(56,189,248,0.15); color: #38BDF8; border: 1px solid rgba(56,189,248,0.3); padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700;">مطبق بنجاح</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #081120; border: 1px solid #1A2844; border-radius: 8px;">
              <div>
                <div style="color: #FFF; font-weight: 600; font-size: 12px;">اختبار استعادة النسخة الاحتياطية الشهرية (Disaster Recovery Drill)</div>
                <div style="color: #64748B; font-size: 10px;">استرجاع كامل قاعدة البيانات على خادم بديل خلال 3.5 دقائق فقط</div>
              </div>
              <span style="background: rgba(16,185,129,0.15); color: #34D399; border: 1px solid rgba(16,185,129,0.3); padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700;">تم التحقق 100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
};

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage({
    viewport: { width: screen.width, height: screen.height },
    deviceScaleFactor: 1,
  });
  await page.setContent(screen.html, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const dir = path.dirname(screen.outFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: screen.outFile });
  console.log(`Generated: ${screen.outFile}`);
  await page.close();
  await browser.close();
})().catch((err) => {
  console.error('Error generating image:', err);
  process.exit(1);
});
