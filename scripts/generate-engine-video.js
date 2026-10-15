const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');
const { execSync } = require('child_process');

// 1. Create the HTML animation page
const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>Novixa Unified Engine</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #060d1a;
      color: #e2e8f0;
      font-family: 'IBM Plex Sans Arabic', sans-serif;
      width: 1280px;
      height: 720px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    
    /* Background grid and glows */
    .bg-grid {
      position: absolute;
      inset: 0;
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px);
      pointer-events: none;
    }
    .glow-cyan {
      position: absolute;
      top: 15%;
      left: 20%;
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .glow-blue {
      position: absolute;
      bottom: 10%;
      right: 25%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
      pointer-events: none;
    }

    /* Container */
    .app-container {
      position: relative;
      z-index: 10;
      padding: 32px 48px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Top Bar */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(51, 65, 85, 0.6);
      padding-bottom: 20px;
    }
    .brand-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .logo-badge {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #020617;
      font-size: 24px;
      font-weight: 800;
      font-family: 'Alexandria', sans-serif;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.4);
    }
    .brand-text h1 {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      font-family: 'Alexandria', sans-serif;
      letter-spacing: -0.5px;
    }
    .brand-text p {
      font-size: 13px;
      color: #38bdf8;
      font-family: monospace;
      margin-top: 2px;
    }
    .status-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(6, 78, 59, 0.4);
      border: 1px solid rgba(16, 185, 129, 0.4);
      padding: 8px 18px;
      border-radius: 9999px;
      color: #34d399;
      font-size: 13px;
      font-family: monospace;
      font-weight: 600;
    }
    .pulse-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 12px #10b981;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.6; }
    }

    /* Pipeline Stages */
    .pipeline-wrapper {
      position: relative;
      margin: 20px 0;
    }
    .pipeline-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      font-size: 13px;
      color: #94a3b8;
      font-family: monospace;
    }
    .pipeline-title span.accent {
      color: #38bdf8;
      font-weight: 700;
    }

    .stages-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      position: relative;
    }

    .stage-card {
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 18px;
      padding: 22px 18px;
      position: relative;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    .stage-card.active {
      border-color: #38bdf8;
      box-shadow: 0 0 30px rgba(56, 189, 248, 0.25);
    }
    .stage-card .stage-num {
      position: absolute;
      top: 14px;
      left: 14px;
      font-size: 10px;
      font-family: monospace;
      color: #64748b;
      background: rgba(30, 41, 59, 0.8);
      padding: 2px 8px;
      border-radius: 6px;
    }
    .stage-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin-bottom: 14px;
    }
    .stage-name {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      font-family: 'Alexandria', sans-serif;
      margin-bottom: 6px;
    }
    .stage-desc {
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.5;
      margin-bottom: 14px;
    }
    .stage-stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      border-top: 1px solid rgba(51, 65, 85, 0.5);
      font-size: 11px;
      font-family: monospace;
    }
    .stage-stat .label {
      color: #64748b;
    }
    .stage-stat .val {
      color: #38bdf8;
      font-weight: bold;
    }

    /* Live Canvas for animated laser particles connecting cards */
    #connector-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 5;
    }

    /* Live Activity Stream Terminal & Realtime Telemetry */
    .bottom-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }
    .terminal-box {
      background: #040914;
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 16px;
      padding: 16px 20px;
      font-family: monospace;
      font-size: 12px;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.6);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 140px;
    }
    .terminal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #64748b;
      font-size: 11px;
      border-bottom: 1px solid rgba(30, 41, 59, 0.8);
      padding-bottom: 8px;
      margin-bottom: 8px;
    }
    .terminal-logs {
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow: hidden;
    }
    .log-line {
      display: flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
      animation: fadeIn 0.3s ease;
    }
    .log-time { color: #38bdf8; }
    .log-tag { 
      padding: 1px 6px; 
      border-radius: 4px; 
      font-size: 10px; 
      font-weight: bold; 
    }
    .log-tag.order { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
    .log-tag.sync { background: rgba(16, 185, 129, 0.15); color: #34d399; }
    .log-tag.bill { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .log-tag.dash { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
    .log-msg { color: #cbd5e1; }

    /* Telemetry KPI Cards */
    .kpi-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }
    .kpi-card {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(51, 65, 85, 0.6);
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    .kpi-val {
      font-size: 22px;
      font-weight: 800;
      color: #38bdf8;
      font-family: 'Alexandria', sans-serif;
    }
    .kpi-val.green { color: #34d399; }
    .kpi-label {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 4px;
      font-family: 'IBM Plex Sans Arabic', sans-serif;
    }
  </style>
</head>
<body>
  <div class="bg-grid"></div>
  <div class="glow-cyan"></div>
  <div class="glow-blue"></div>

  <div class="app-container">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="brand-section">
        <div class="logo-badge">N</div>
        <div class="brand-text">
          <h1>منظومة نوڤيكسا البرمجية الموحدة</h1>
          <p>NOVIXA UNIFIED SOFTWARE ENGINE • ZERO HANDOFFS</p>
        </div>
      </div>
      <div class="status-badge">
        <div class="pulse-dot"></div>
        <span>مزامنة فورية حية: 0.12 ثانية (Realtime Sync)</span>
      </div>
    </div>

    <!-- Pipeline 4 Stages -->
    <div class="pipeline-wrapper">
      <div class="pipeline-title">
        <span>مسار تدفق البيانات التلقائي: <span class="accent">4 مراحل متزامنة لحظياً</span></span>
        <span class="accent">Architecture: Clean & Automated</span>
      </div>

      <div class="stages-grid">
        <!-- Stage 1 -->
        <div class="stage-card active" id="card-1">
          <span class="stage-num">01 / STAGE</span>
          <div class="stage-icon">📱</div>
          <div class="stage-name">قنوات الطلب الموحدة</div>
          <div class="stage-desc">تطبيق جوال، متجر ويب، بوت واتساب، ونقاط البيع السحابية.</div>
          <div class="stage-stat">
            <span class="label">حجم الطلبات:</span>
            <span class="val" id="stat-req">342 طلب/ساعة</span>
          </div>
        </div>

        <!-- Stage 2 -->
        <div class="stage-card" id="card-2">
          <span class="stage-num">02 / STAGE</span>
          <div class="stage-icon">📦</div>
          <div class="stage-name">المستودع الذكي والعمليات</div>
          <div class="stage-desc">خصم فوري للمكونات والكميات عبر جميع الفروع دون أخطاء.</div>
          <div class="stage-stat">
            <span class="label">سرعة الخصم:</span>
            <span class="val">42 ميلي ثانية</span>
          </div>
        </div>

        <!-- Stage 3 -->
        <div class="stage-card" id="card-3">
          <span class="stage-num">03 / STAGE</span>
          <div class="stage-icon">🧾</div>
          <div class="stage-name">الفوترة والمدفوعات</div>
          <div class="stage-desc">إصدار فواتير إلكترونية ضريبية وإشعارات دفع آلية بالواتساب.</div>
          <div class="stage-stat">
            <span class="label">الدقة المحاسبية:</span>
            <span class="val">100% مؤتمت</span>
          </div>
        </div>

        <!-- Stage 4 -->
        <div class="stage-card" id="card-4">
          <span class="stage-num">04 / STAGE</span>
          <div class="stage-icon">📊</div>
          <div class="stage-name">لوحة الإدارة التنفيذية</div>
          <div class="stage-desc">تقارير مالية وتحليلات حية لحظة بلحظة على هاتفك من أي مكان.</div>
          <div class="stage-stat">
            <span class="label">التحديث:</span>
            <span class="val">مباشر (Live)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Event Stream & Metrics -->
    <div class="bottom-section">
      <!-- Terminal Activity Log -->
      <div class="terminal-box">
        <div class="terminal-header">
          <span>>_ سجل الأحداث والعمليات اللحظية (Live Event Stream)</span>
          <span style="color: #10b981;">CONNECTED • TLS 1.3</span>
        </div>
        <div class="terminal-logs" id="terminal-logs">
          <!-- Dynamic logs will be appended here -->
        </div>
      </div>

      <!-- Live KPI Tiles -->
      <div class="kpi-cards">
        <div class="kpi-card">
          <div class="kpi-val" id="kpi-speed">+65%</div>
          <div class="kpi-label">سرعة إنجاز العمليات اليومية</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val green" id="kpi-error">0.00%</div>
          <div class="kpi-label">نسبة الخطأ البشري في الإدخال</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Live simulation script
    const logsContainer = document.getElementById('terminal-logs');
    const cards = [
      document.getElementById('card-1'),
      document.getElementById('card-2'),
      document.getElementById('card-3'),
      document.getElementById('card-4')
    ];

    const sampleEvents = [
      { tag: 'ORDER', class: 'order', msg: 'طلب جديد عبر تطبيق الجوال #10842 بقيمة 450 ر.س' },
      { tag: 'SYNC', class: 'sync', msg: 'مزامنة فورية للمخزون: خصم 3 عناصر من مستودع الفرع الرئيسي' },
      { tag: 'BILL', class: 'bill', msg: 'إصدار فاتورة إلكترونية معتمدة وإرسال الإشعار بالواتساب' },
      { tag: 'DASH', class: 'dash', msg: 'تحديث مؤشرات الإيراد والأرباح في لوحة الإدارة التنفيذية' },
      { tag: 'ORDER', class: 'order', msg: 'طلب حجز طاولة VIP عبر الويب لرقم الهاتف +96650***' },
      { tag: 'SYNC', class: 'sync', msg: 'جدولة المقعد في شاشة الكاشير وتثبيت وقت البداية' },
      { tag: 'BILL', class: 'bill', msg: 'تسوية الدفع المباشر عبر بوابة الدفع السحابية المشفرة' },
      { tag: 'DASH', class: 'dash', msg: 'إشعار فوري لمالك المنشأة: اكتمال الهدف اليومي للمبيعات' }
    ];

    let eventIdx = 0;
    let activeCardIdx = 0;

    function addLog() {
      const now = new Date();
      const timeStr = String(now.getHours()).padStart(2, '0') + ':' +
                      String(now.getMinutes()).padStart(2, '0') + ':' +
                      String(now.getSeconds()).padStart(2, '0') + '.' +
                      String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');

      const ev = sampleEvents[eventIdx % sampleEvents.length];
      eventIdx++;

      const logRow = document.createElement('div');
      logRow.className = 'log-line';
      logRow.innerHTML = '<span class="log-time">[' + timeStr + ']</span>' +
                         '<span class="log-tag ' + ev.class + '">' + ev.tag + '</span>' +
                         '<span class="log-msg">' + ev.msg + '</span>';

      logsContainer.appendChild(logRow);
      if (logsContainer.children.length > 3) {
        logsContainer.removeChild(logsContainer.children[0]);
      }

      // Highlight corresponding stage card
      cards.forEach((c, idx) => {
        if (idx === (eventIdx % 4)) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });
    }

    // Run initial logs
    addLog();
    addLog();
    addLog();

    // Pulse logs every 700ms
    setInterval(addLog, 750);
  </script>
</body>
</html>`;

const htmlPath = path.join(__dirname, 'engine-animation.html');
fs.writeFileSync(htmlPath, htmlContent);

(async () => {
  console.log('Launching browser to record video...');
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const videoDir = path.join(__dirname, 'temp_video');
  if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  await page.goto('file://' + htmlPath);
  
  // Record for 8 seconds
  console.log('Recording 8-second animated sequence...');
  await page.waitForTimeout(8000);

  // Take a high-res poster snapshot too!
  const posterPath = path.join(__dirname, '../public/videos/unified-engine-poster.jpg');
  await page.screenshot({ path: posterPath });
  console.log('Saved poster image to ' + posterPath);

  await page.close();
  await context.close();
  await browser.close();

  // Find the recorded webm file in videoDir
  const files = fs.readdirSync(videoDir);
  const webmFile = files.find(f => f.endsWith('.webm'));
  if (!webmFile) {
    throw new Error('No webm video recorded!');
  }

  const inputWebm = path.join(videoDir, webmFile);
  const outputMp4 = path.join(__dirname, '../public/videos/unified-engine.mp4');

  console.log('Converting ' + inputWebm + ' to ' + outputMp4 + ' with ffmpeg...');
  execSync('ffmpeg -y -i "' + inputWebm + '" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 22 -an "' + outputMp4 + '"');
  console.log('Successfully generated public/videos/unified-engine.mp4!');

  // Clean up temp
  fs.rmSync(videoDir, { recursive: true, force: true });
  fs.unlinkSync(htmlPath);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
