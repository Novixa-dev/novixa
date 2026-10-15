const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const products = [
  {
    id: 'aqar',
    title: 'Novixa Aqar — Real Estate & Property OS',
    html: `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0B132B;
      color: #E2E8F0;
      font-family: system-ui, -apple-system, sans-serif;
      padding: 24px;
      width: 900px;
      height: 560px;
      overflow: hidden;
    }
    .window {
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(6,182,212,0.15);
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .win-bar {
      background: #0B1222;
      border-bottom: 1px solid #1E293B;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dots { display: flex; gap: 8px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-r { background: #EF4444; }
    .dot-y { background: #F59E0B; }
    .dot-g { background: #10B981; }
    .win-title {
      font-size: 13px;
      font-weight: 600;
      color: #94A3B8;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .live-pill {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #059669;
      color: #34D399;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 9999px;
    }
    .main {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    .stat-card {
      background: #131E36;
      border: 1px solid #1E293B;
      border-radius: 12px;
      padding: 12px 14px;
    }
    .stat-label { font-size: 11px; color: #94A3B8; margin-bottom: 4px; }
    .stat-val { font-size: 18px; font-weight: 800; color: #FFFFFF; }
    .stat-sub { font-size: 10px; color: #06B6D4; margin-top: 2px; }
    .content-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 14px;
      flex: 1;
    }
    .panel {
      background: #131E36;
      border: 1px solid #1E293B;
      border-radius: 14px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .panel-hdr {
      font-size: 12px;
      font-weight: 700;
      color: #F8FAFC;
      border-bottom: 1px solid #1E293B;
      padding-bottom: 8px;
      display: flex;
      justify-content: space-between;
    }
    .unit-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 10px;
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 8px;
      font-size: 11px;
    }
    .badge {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 6px;
      font-weight: 600;
    }
    .badge-rented { background: rgba(6,182,212,0.15); color: #38BDF8; }
    .badge-avail { background: rgba(16,185,129,0.15); color: #34D399; }
    .badge-maint { background: rgba(245,158,11,0.15); color: #FBBF24; }
    .chart-mock {
      background: #0F172A;
      border-radius: 10px;
      padding: 12px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .bar-wrap { display: flex; align-items: flex-end; gap: 8px; height: 100px; padding-top: 10px; }
    .bar {
      flex: 1;
      background: linear-gradient(180deg, #06B6D4 0%, #2563EB 100%);
      border-radius: 4px 4px 0 0;
    }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots">
        <div class="dot dot-r"></div>
        <div class="dot dot-y"></div>
        <div class="dot dot-g"></div>
      </div>
      <div class="win-title">
        <span>Novixa Aqar • إدارة الأصول والمشاريع الاستثمارية</span>
      </div>
      <div class="live-pill">● متصل بالخادم سحابياً</div>
    </div>
    <div class="main">
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">إجمالي الوحدات المدارة</div>
          <div class="stat-val">128 وحدة</div>
          <div class="stat-sub">نسبة الإشغال 95.8%</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">التحصيل الشهري المتوقع</div>
          <div class="stat-val">$48,200</div>
          <div class="stat-sub">+14% عن الشهر السابق</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">عقود قيد التجديد</div>
          <div class="stat-val">6 عقود</div>
          <div class="stat-sub">تنبيهات تلقائية نشطة</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">بوابة الوسطاء</div>
          <div class="stat-val">14 وسيط</div>
          <div class="stat-sub">عمولات مؤتمتة آلياً</div>
        </div>
      </div>
      <div class="content-grid">
        <div class="panel">
          <div class="panel-hdr">
            <span>سجل الوحدات والعقود المباشرة</span>
            <span style="color:#38BDF8; font-size:11px;">عرض الكل (128)</span>
          </div>
          <div class="unit-row">
            <div><strong>شقة 104 — برج السلام</strong> <span style="color:#64748B;">• سكني 3 غرف</span></div>
            <span class="badge badge-rented">مؤجرة (حتى 2027)</span>
          </div>
          <div class="unit-row">
            <div><strong>مكتب 302 — مجمع الأعمال</strong> <span style="color:#64748B;">• تجاري إداري</span></div>
            <span class="badge badge-avail">متاح للحجز الفوري</span>
          </div>
          <div class="unit-row">
            <div><strong>معرض 12 — واجهة الساحل</strong> <span style="color:#64748B;">• مساحة 220م²</span></div>
            <span class="badge badge-rented">مؤجر (دفعة مكتملة)</span>
          </div>
          <div class="unit-row">
            <div><strong>فيلا 05 — حي الدبلوماسيين</strong> <span style="color:#64748B;">• خاص راقي</span></div>
            <span class="badge badge-maint">صيانة دورية</span>
          </div>
        </div>
        <div class="panel">
          <div class="panel-hdr">
            <span>منحنى التدفق المالي الشهري</span>
            <span style="color:#10B981; font-size:11px;">+18.4% نمو</span>
          </div>
          <div class="chart-mock">
            <div style="font-size:11px; color:#94A3B8;">التحصيلات النقدية والبنكية:</div>
            <div class="bar-wrap">
              <div class="bar" style="height:45%;"></div>
              <div class="bar" style="height:60%;"></div>
              <div class="bar" style="height:55%;"></div>
              <div class="bar" style="height:75%;"></div>
              <div class="bar" style="height:90%;"></div>
              <div class="bar" style="height:100%;"></div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#64748B; margin-top:6px;">
              <span>مايو</span><span>يونيو</span><span>يوليو</span><span>أغسطس</span><span>سبتمبر</span><span>أكتوبر</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `
  },
  {
    id: 'restaurant',
    title: 'Novixa Restaurant — Cloud POS & Kitchen OS',
    html: `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0B132B;
      color: #E2E8F0;
      font-family: system-ui, -apple-system, sans-serif;
      padding: 24px;
      width: 900px;
      height: 560px;
      overflow: hidden;
    }
    .window {
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(14,165,233,0.15);
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .win-bar {
      background: #0B1222;
      border-bottom: 1px solid #1E293B;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dots { display: flex; gap: 8px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-r { background: #EF4444; }
    .dot-y { background: #F59E0B; }
    .dot-g { background: #10B981; }
    .win-title { font-size: 13px; font-weight: 600; color: #94A3B8; }
    .live-pill {
      background: rgba(14,165,233,0.15);
      border: 1px solid #0284C7;
      color: #38BDF8;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 9999px;
    }
    .main { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 16px; }
    .kds-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      flex: 1;
    }
    .kds-col {
      background: #131E36;
      border: 1px solid #1E293B;
      border-radius: 14px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .col-hdr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid #1E293B;
      font-size: 12px;
      font-weight: 700;
    }
    .ticket {
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ticket-hdr { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; }
    .ticket-item { font-size: 11px; color: #CBD5E1; display: flex; justify-content: space-between; }
    .ticket-timer {
      font-size: 10px;
      font-family: monospace;
      color: #F59E0B;
      background: rgba(245,158,11,0.1);
      padding: 2px 6px;
      border-radius: 4px;
      align-self: flex-start;
    }
    .bottom-bar {
      background: #131E36;
      border: 1px solid #1E293B;
      border-radius: 12px;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots">
        <div class="dot dot-r"></div>
        <div class="dot dot-y"></div>
        <div class="dot dot-g"></div>
      </div>
      <div class="win-title">Novixa Restaurant — شاشة المطبخ ونقاط البيع المباشرة (KDS)</div>
      <div class="live-pill">● 22 طاولة نشطة • 8 طباخين متصلين</div>
    </div>
    <div class="main">
      <div class="kds-grid">
        <div class="kds-col">
          <div class="col-hdr" style="color:#F59E0B;">
            <span>طلبات جديدة (New)</span>
            <span style="background:rgba(245,158,11,0.2); padding:2px 8px; border-radius:99px; font-size:10px;">3 طلبات</span>
          </div>
          <div class="ticket" style="border-left: 3px solid #F59E0B;">
            <div class="ticket-hdr">
              <span>طاولة #08 (QR طلب ذاتي)</span>
              <span class="ticket-timer">02:14 د</span>
            </div>
            <div class="ticket-item"><span>2× برجر لحم واغيو أنجوس</span><span>خاص</span></div>
            <div class="ticket-item"><span>1× بطاطس مقلية بالكمأة</span><span>بدون ملح</span></div>
            <div class="ticket-item"><span>2× موهيتو توت أزرق</span><span>ثلج إضافي</span></div>
          </div>
          <div class="ticket" style="border-left: 3px solid #F59E0B;">
            <div class="ticket-hdr">
              <span>طلب خارجي #312 (سفري)</span>
              <span class="ticket-timer">00:45 د</span>
            </div>
            <div class="ticket-item"><span>1× بيتزا تروفل إيطالية</span><span>حجم كبير</span></div>
          </div>
        </div>

        <div class="kds-col">
          <div class="col-hdr" style="color:#38BDF8;">
            <span>قيد الطهي والتحضير (Cooking)</span>
            <span style="background:rgba(56,189,248,0.2); padding:2px 8px; border-radius:99px; font-size:10px;">2 طلب</span>
          </div>
          <div class="ticket" style="border-left: 3px solid #38BDF8;">
            <div class="ticket-hdr">
              <span>طاولة #14 (صالة العائلات)</span>
              <span class="ticket-timer" style="color:#38BDF8; background:rgba(56,189,248,0.1);">06:30 د</span>
            </div>
            <div class="ticket-item"><span>1× سمك سلمون مشوي بالليمون</span><span>استواء كامل</span></div>
            <div class="ticket-item"><span>1× سلطة كينوا بالأفوكادو</span><span>صلصة جانبية</span></div>
          </div>
          <div class="ticket" style="border-left: 3px solid #38BDF8;">
            <div class="ticket-hdr">
              <span>طاولة #03 (الشرفة البحرية)</span>
              <span class="ticket-timer" style="color:#38BDF8; background:rgba(56,189,248,0.1);">04:15 د</span>
            </div>
            <div class="ticket-item"><span>2× ستيك ريب آي أنجوس</span><span>Medium</span></div>
          </div>
        </div>

        <div class="kds-col">
          <div class="col-hdr" style="color:#10B981;">
            <span>جاهز للتسليم (Ready to Serve)</span>
            <span style="background:rgba(16,185,129,0.2); padding:2px 8px; border-radius:99px; font-size:10px;">مكتمل</span>
          </div>
          <div class="ticket" style="border-left: 3px solid #10B981; opacity:0.9;">
            <div class="ticket-hdr">
              <span>طاولة #05 (VIP جناح)</span>
              <span style="color:#10B981; font-size:10px; font-weight:700;">جاهز للنداء ✓</span>
            </div>
            <div class="ticket-item"><span>1× ريزوتو بالفطر البري</span><span>ساخن</span></div>
            <div class="ticket-item"><span>2× قهوة مختصة فلات وايت</span><span>حليب لوز</span></div>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <div><strong>إجمالي مبيعات اليوم:</strong> <span style="color:#34D399; font-weight:800;">1,840,000 ريال يمني</span></div>
        <div><strong>متوسط سرعة الإعداد:</strong> <span style="color:#38BDF8; font-weight:700;">8.2 دقيقة</span></div>
        <div><strong>حالة الطابعات الحرارية:</strong> <span style="color:#10B981;">متصلة ومزامنة (3 طابعات)</span></div>
      </div>
    </div>
  </div>
</body>
</html>
    `
  },
  {
    id: 'booking',
    title: 'Novixa Booking — Scheduling & Appointment Engine',
    html: `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0B132B;
      color: #E2E8F0;
      font-family: system-ui, -apple-system, sans-serif;
      padding: 24px;
      width: 900px;
      height: 560px;
      overflow: hidden;
    }
    .window {
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(20,184,166,0.15);
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .win-bar {
      background: #0B1222;
      border-bottom: 1px solid #1E293B;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dots { display: flex; gap: 8px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-r { background: #EF4444; }
    .dot-y { background: #F59E0B; }
    .dot-g { background: #10B981; }
    .win-title { font-size: 13px; font-weight: 600; color: #94A3B8; }
    .live-pill {
      background: rgba(20,184,166,0.15);
      border: 1px solid #0D9488;
      color: #2DD4BF;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 9999px;
    }
    .main { padding: 20px; flex: 1; display: flex; gap: 16px; }
    .cal-side {
      flex: 1.3;
      background: #131E36;
      border: 1px solid #1E293B;
      border-radius: 14px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .slot-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 10px;
      font-size: 12px;
    }
    .time-badge {
      font-family: monospace;
      font-weight: 700;
      color: #2DD4BF;
      background: rgba(45,212,191,0.1);
      padding: 3px 8px;
      border-radius: 6px;
    }
    .detail-side {
      flex: 0.9;
      background: #131E36;
      border: 1px solid #1E293B;
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .avatar-box {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #1E293B;
    }
    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0D9488, #2563EB);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 16px;
      color: white;
    }
    .wa-chip {
      background: rgba(34,197,94,0.15);
      border: 1px solid #16A34A;
      color: #4ADE80;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 11px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots">
        <div class="dot dot-r"></div>
        <div class="dot dot-y"></div>
        <div class="dot dot-g"></div>
      </div>
      <div class="win-title">Novixa Booking — إدارة جداول ومواعيد العيادات والمراكز</div>
      <div class="live-pill">● تأكيد فوري بالواتساب وعربون إلكتروني</div>
    </div>
    <div class="main">
      <div class="cal-side">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1E293B; padding-bottom:8px;">
          <strong>جدول مواعيد اليوم — الأربعاء 15 أكتوبر</strong>
          <span style="font-size:11px; color:#2DD4BF;">18 موعد مجدول</span>
        </div>
        <div class="slot-row" style="border-right: 3px solid #10B981;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="time-badge">09:00 ص</span>
            <div><strong>د. هيثم السقاف</strong> <span style="color:#64748B;">— فحص استشاري</span></div>
          </div>
          <span style="color:#34D399; font-size:11px;">مؤكد بالعربون ✓</span>
        </div>
        <div class="slot-row" style="border-right: 3px solid #10B981;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="time-badge">10:30 ص</span>
            <div><strong>مروان باحبيب</strong> <span style="color:#64748B;">— جلسة ليزر تجميلية</span></div>
          </div>
          <span style="color:#34D399; font-size:11px;">مؤكد بالعربون ✓</span>
        </div>
        <div class="slot-row" style="border-right: 3px solid #F59E0B;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="time-badge">12:00 م</span>
            <div><strong>سارة باوزير</strong> <span style="color:#64748B;">— استشارة جلدية</span></div>
          </div>
          <span style="color:#FBBF24; font-size:11px;">بانتظار الدفع (تذكير)</span>
        </div>
        <div class="slot-row" style="border-right: 3px solid #2DD4BF;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="time-badge">02:30 م</span>
            <div><strong>متاح للحجز الإلكتروني</strong> <span style="color:#64748B;">— 45 دقيقة</span></div>
          </div>
          <span style="color:#2DD4BF; font-size:11px;">شاغر بالرابط</span>
        </div>
      </div>
      <div class="detail-side">
        <div class="avatar-box">
          <div class="avatar">م.ب</div>
          <div>
            <div style="font-weight:700; font-size:13px;">مروان باحبيب</div>
            <div style="font-size:11px; color:#94A3B8;">عميل مميز • موعد #4982</div>
          </div>
        </div>
        <div style="font-size:12px; display:flex; flex-direction:column; gap:6px;">
          <div><span style="color:#64748B;">الخدمة:</span> <strong>جلسة تقنية متخصصة</strong></div>
          <div><span style="color:#64748B;">العربون:</span> <strong style="color:#34D399;">50$ مدفوعة عبر الكريمي</strong></div>
          <div><span style="color:#64748B;">الموقع:</span> <strong>الفرع الرئيسي — خور مكسر</strong></div>
        </div>
        <div class="wa-chip">
          <span>💬</span>
          <div>
            <div style="font-weight:700;">تم إرسال تذكير واتساب آلي</div>
            <div style="font-size:10px; color:#86EFAC;">تأكيد الحضور تم بنجاح من العميل</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `
  },
  {
    id: 'pulse',
    title: 'Novixa Pulse — Enterprise AI Sentiment & Operations Platform',
    html: `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0B132B;
      color: #E2E8F0;
      font-family: system-ui, -apple-system, sans-serif;
      padding: 24px;
      width: 900px;
      height: 560px;
      overflow: hidden;
    }
    .window {
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.15);
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .win-bar {
      background: #0B1222;
      border-bottom: 1px solid #1E293B;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dots { display: flex; gap: 8px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-r { background: #EF4444; }
    .dot-y { background: #F59E0B; }
    .dot-g { background: #10B981; }
    .win-title { font-size: 13px; font-weight: 600; color: #94A3B8; }
    .live-pill {
      background: rgba(59,130,246,0.15);
      border: 1px solid #2563EB;
      color: #60A5FA;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 9999px;
    }
    .main { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 16px; }
    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .stat-card {
      background: #131E36;
      border: 1px solid #1E293B;
      border-radius: 12px;
      padding: 12px 16px;
    }
    .feedback-list {
      background: #131E36;
      border: 1px solid #1E293B;
      border-radius: 14px;
      padding: 14px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .fb-item {
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 10px;
      padding: 10px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }
    .tag-ai {
      background: rgba(99,102,241,0.15);
      color: #A5B4FC;
      border: 1px solid #6366F1;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots">
        <div class="dot dot-r"></div>
        <div class="dot dot-y"></div>
        <div class="dot dot-g"></div>
      </div>
      <div class="win-title">Novixa Pulse — لوحة رصد صحة المنظمة واستطلاع الموظفين</div>
      <div class="live-pill">● استبانات سرية مشفرة وتحليل ذكاء اصطناعي</div>
    </div>
    <div class="main">
      <div class="stats-row">
        <div class="stat-card">
          <div style="font-size:11px; color:#94A3B8;">مؤشر نبض المنظمة (Pulse Score)</div>
          <div style="font-size:22px; font-weight:800; color:#34D399; margin-top:4px;">89 / 100</div>
          <div style="font-size:10px; color:#60A5FA;">+5 نقاط مقارنة بالربع السابق</div>
        </div>
        <div class="stat-card">
          <div style="font-size:11px; color:#94A3B8;">متوسط سرعة حل الملاحظات</div>
          <div style="font-size:22px; font-weight:800; color:#FFFFFF; margin-top:4px;">1.8 يوم</div>
          <div style="font-size:10px; color:#34D399;">88% إغلاق ناجح</div>
        </div>
        <div class="stat-card">
          <div style="font-size:11px; color:#94A3B8;">المشاركات السرية المسجلة</div>
          <div style="font-size:22px; font-weight:800; color:#FFFFFF; margin-top:4px;">146 مشاركة</div>
          <div style="font-size:10px; color:#A5B4FC;">حماية كاملة لهوية الموظفين</div>
        </div>
      </div>
      <div class="feedback-list">
        <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700; border-bottom:1px solid #1E293B; padding-bottom:8px;">
          <span>تدفق الملاحظات والمقترحات المصنفة بالذكاء الاصطناعي</span>
          <span style="color:#60A5FA; font-size:11px;">محللة آلياً</span>
        </div>
        <div class="fb-item">
          <div>
            <strong>اقتراح تحديث عتاد العمل وشاشات العرض المزدوجة</strong>
            <div style="font-size:11px; color:#64748B; margin-top:2px;">تم التقديم بسرية • قسم هندسة البرمجيات</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="tag-ai">AI: بيئة عمل وإنتاجية</span>
            <span style="color:#34D399; font-weight:700;">معتمد للتنفيذ ✓</span>
          </div>
        </div>
        <div class="fb-item">
          <div>
            <strong>تنسيق أوقات النوبات بين فروع صيرة والمنصورة</strong>
            <div style="font-size:11px; color:#64748B; margin-top:2px;">تم التقديم بمعرفة الهوية • العمليات التشغيلية</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="tag-ai">AI: لوجستيات وجداول</span>
            <span style="color:#38BDF8; font-weight:700;">تم إغلاق الملاحظة</span>
          </div>
        </div>
        <div class="fb-item">
          <div>
            <strong>جلسة تبادل خبرات أسبوعية لنقل المعرفة البرمجية</strong>
            <div style="font-size:11px; color:#64748B; margin-top:2px;">تم التقديم بسرية • فريق التصميم والواجهات</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="tag-ai">AI: ثقافة وتطوير</span>
            <span style="color:#FBBF24; font-weight:700;">قيد الدراسة</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `
  }
];

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const outDir = path.join(__dirname, '../public/images/products');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const prod of products) {
    const page = await browser.newPage({
      viewport: { width: 900, height: 560 },
      deviceScaleFactor: 2,
    });
    await page.setContent(prod.html, { waitUntil: 'load' });
    const imgPath = path.join(outDir, `${prod.id}-dashboard.png`);
    await page.screenshot({ path: imgPath, type: 'png' });
    console.log(`Generated: ${imgPath}`);
    await page.close();
  }

  await browser.close();
  console.log('All 4 product mockup images generated successfully!');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
