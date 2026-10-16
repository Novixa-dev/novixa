const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const screen = {
  outFile: 'public/images/casestudies/gaming-arena.png',
  width: 960,
  height: 600,
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
      height: 600px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .window {
      background: #0B1324;
      border: 1px solid #1E293B;
      border-radius: 18px;
      box-shadow: 0 25px 60px -15px rgba(0,0,0,0.7), 0 0 35px rgba(56,189,248,0.15);
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
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid #0284C7;
      color: #38BDF8;
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
      grid-template-columns: 290px 1fr;
      gap: 16px;
      background: #09101F;
    }
    .card {
      background: #0D172B;
      border: 1px solid #1E2E4A;
      border-radius: 12px;
      padding: 14px;
    }
    .stat-val { font-size: 26px; font-weight: 800; font-family: 'Alexandria', sans-serif; color: #38BDF8; }
    .stat-lbl { font-size: 11px; color: #94A3B8; margin-top: 2px; }
    .station-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-top: 8px;
    }
    .station-node {
      background: #081120;
      border: 1px solid #1A2844;
      border-radius: 8px;
      padding: 8px 6px;
      text-align: center;
    }
    .station-name { font-size: 10px; font-family: monospace; font-weight: 700; }
    .station-timer { font-size: 11px; font-weight: 700; color: #38BDF8; margin-top: 2px; font-family: monospace; }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
      <div style="font-size: 12px; font-weight: 700; color: #E2E8F0; font-family: 'Alexandria';">صالة بلاك سبايدر للألعاب • Black Spider Arena OS</div>
      <div class="badge-live">● REAL-TIME STATIONS • 0 WAIT QUEUE</div>
    </div>
    <div class="grid-dash">
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card">
          <div class="stat-lbl">نسبة إشغال أجهزة الصالة الحالية</div>
          <div class="stat-val">94% <span style="font-size: 12px; color: #10B981;">32/34 جهاز نشط</span></div>
          <div style="margin-top: 8px; height: 5px; background: #1E293B; border-radius: 3px; overflow: hidden;">
            <div style="width: 94%; height: 100%; background: linear-gradient(90deg, #38BDF8, #2563EB);"></div>
          </div>
        </div>
        <div class="card" style="flex: 1;">
          <div style="font-weight: 700; font-size: 12px; color: #F8FAFC; margin-bottom: 8px; display: flex; justify-content: space-between;">
            <span>أجهزة الصالة الرئيسية (Gaming Rig Status)</span>
            <span style="color: #10B981; font-size: 10px; font-family: monospace;">قفل تلقائي نشط</span>
          </div>
          <div class="station-grid">
            <div class="station-node" style="border-color: rgba(56,189,248,0.4);">
              <div class="station-name" style="color: #38BDF8;">PC-01</div>
              <div class="station-timer">01:42:15</div>
            </div>
            <div class="station-node" style="border-color: rgba(56,189,248,0.4);">
              <div class="station-name" style="color: #38BDF8;">PC-02</div>
              <div class="station-timer">00:28:40</div>
            </div>
            <div class="station-node" style="border-color: rgba(16,185,129,0.4);">
              <div class="station-name" style="color: #34D399;">VIP-1</div>
              <div class="station-timer">02:15:00</div>
            </div>
            <div class="station-node" style="border-color: rgba(245,158,11,0.4);">
              <div class="station-name" style="color: #FBBF24;">VIP-2</div>
              <div class="station-timer" style="color: #FBBF24;">00:04:12</div>
            </div>
            <div class="station-node">
              <div class="station-name" style="color: #CBD5E1;">PC-05</div>
              <div class="station-timer">00:52:10</div>
            </div>
            <div class="station-node">
              <div class="station-name" style="color: #CBD5E1;">PC-06</div>
              <div class="station-timer">01:10:00</div>
            </div>
            <div class="station-node">
              <div class="station-name" style="color: #CBD5E1;">PC-07</div>
              <div class="station-timer">00:45:30</div>
            </div>
            <div class="station-node" style="background: rgba(16,185,129,0.1); border-color: #059669;">
              <div class="station-name" style="color: #34D399;">PC-08</div>
              <div class="station-timer" style="color: #34D399; font-size: 10px;">شاغر ومتاح</div>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card" style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1E2E4A; padding-bottom: 10px; margin-bottom: 12px;">
            <span style="font-weight: 700; font-size: 13px; color: #F8FAFC;">طلبات المأكولات والمشروبات الذاتية من المقاعد (In-Seat QR Orders)</span>
            <span style="font-size: 10px; font-family: monospace; color: #38BDF8; background: rgba(56,189,248,0.1); padding: 2px 8px; border-radius: 4px;">طابور المطبخ: 3 دقائق</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #081120; border: 1px solid #1A2844; border-radius: 8px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-family: monospace; color: #38BDF8; font-weight: 700; font-size: 11px;">#ORD-719</span>
                <div>
                  <div style="color: #FFF; font-weight: 600; font-size: 12px;">وجبة برجر دبل + بطاطس + ريدبول كولد</div>
                  <div style="color: #64748B; font-size: 10px;">المقعد: VIP Lounge 01 • كابتن الفريق: حسام</div>
                </div>
              </div>
              <span style="background: rgba(16,185,129,0.15); color: #34D399; border: 1px solid rgba(16,185,129,0.3); padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700;">جاهز للتسليم</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #081120; border: 1px solid #1A2844; border-radius: 8px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-family: monospace; color: #38BDF8; font-weight: 700; font-size: 11px;">#ORD-720</span>
                <div>
                  <div style="color: #FFF; font-weight: 600; font-size: 12px;">2 موهيتو توت أزرق مثلج + ناتشوز جبن</div>
                  <div style="color: #64748B; font-size: 10px;">المقعد: PC-14 (بطولة فالف)</div>
                </div>
              </div>
              <span style="background: rgba(56,189,248,0.15); color: #38BDF8; border: 1px solid rgba(56,189,248,0.3); padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700;">قيد التحضير</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #081120; border: 1px solid #1A2844; border-radius: 8px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-family: monospace; color: #38BDF8; font-weight: 700; font-size: 11px;">#ORD-721</span>
                <div>
                  <div style="color: #FFF; font-weight: 600; font-size: 12px;">تمديد باقة لعب VIP (ساعتان إضافية)</div>
                  <div style="color: #64748B; font-size: 10px;">المقعد: VIP Lounge 02 • دفع إلكتروني مباشر</div>
                </div>
              </div>
              <span style="background: rgba(56,189,248,0.15); color: #38BDF8; border: 1px solid rgba(56,189,248,0.3); padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700;">تم التجديد آلياً</span>
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
