const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const screens = [
  {
    outFile: 'public/images/casestudies/logistics-hub.png',
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
      box-shadow: 0 25px 60px -15px rgba(0,0,0,0.7), 0 0 35px rgba(56,189,248,0.12);
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
    .stat-val { font-size: 26px; font-weight: 800; font-family: 'Alexandria', sans-serif; color: #38BDF8; }
    .stat-lbl { font-size: 11px; color: #94A3B8; margin-top: 2px; }
    .table-row {
      display: grid;
      grid-template-columns: 90px 1fr 100px 90px;
      padding: 9px 0;
      border-bottom: 1px solid #1E293B;
      font-size: 11.5px;
      align-items: center;
    }
    .badge-status {
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-family: monospace;
      font-weight: 600;
      text-align: center;
    }
    .map-preview {
      background: #070F1E;
      border: 1px solid #1E2E4A;
      border-radius: 10px;
      height: 170px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .node-pin {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #38BDF8;
      box-shadow: 0 0 12px #38BDF8;
    }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
      <div style="font-size: 12px; font-weight: 700; color: #E2E8F0; font-family: 'Alexandria';">منصة الأمانة للخدمات اللوجستية • Al-Amanah Distribution OS</div>
      <div class="badge-live">● LIVE DISPATCH • 42ms</div>
    </div>
    <div class="grid-dash">
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card">
          <div class="stat-lbl">إجمالي الشحنات الموزعة اليوم</div>
          <div class="stat-val">1,482 <span style="font-size: 13px; color: #10B981;">+18%</span></div>
          <div style="margin-top: 8px; height: 5px; background: #1E293B; border-radius: 3px; overflow: hidden;">
            <div style="width: 82%; height: 100%; background: linear-gradient(90deg, #38BDF8, #2563EB);"></div>
          </div>
        </div>
        <div class="card">
          <div class="stat-lbl">حركة الأسطول النشط بالميدان</div>
          <div style="display: flex; justify-content: space-between; margin-top: 6px;">
            <div><span style="color: #38BDF8; font-weight: 700; font-size: 18px;">48</span><div style="font-size: 10px; color: #94A3B8;">مركبة على المسار</div></div>
            <div><span style="color: #10B981; font-weight: 700; font-size: 18px;">99.4%</span><div style="font-size: 10px; color: #94A3B8;">دقة التسليم بالموعد</div></div>
          </div>
        </div>
        <div class="map-preview">
          <svg width="100%" height="100%" style="opacity: 0.25;">
            <line x1="40" y1="50" x2="160" y2="100" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="4"/>
            <line x1="160" y1="100" x2="220" y2="60" stroke="#38BDF8" stroke-width="1.5"/>
            <line x1="160" y1="100" x2="190" y2="140" stroke="#38BDF8" stroke-width="1.5"/>
          </svg>
          <div class="node-pin" style="top: 45px; left: 40px; background: #10B981;"></div>
          <div class="node-pin" style="top: 95px; left: 160px; background: #38BDF8; transform: scale(1.4);"></div>
          <div class="node-pin" style="top: 55px; left: 220px; background: #F59E0B;"></div>
          <div class="node-pin" style="top: 135px; left: 190px; background: #38BDF8;"></div>
          <div style="position: absolute; bottom: 8px; right: 10px; font-size: 10px; color: #38BDF8; font-family: monospace;">خريطة مسارات التوصيل الحية • GPS Radar</div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card" style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1E2E4A; padding-bottom: 10px; margin-bottom: 10px;">
            <span style="font-weight: 700; font-size: 13px; color: #F8FAFC;">إرساليات المستودعات الحالية (Live Warehouse Queue)</span>
            <span style="font-size: 10px; font-family: monospace; color: #94A3B8;">مزامنة الباركود: نشطة</span>
          </div>
          <div class="table-row" style="color: #64748B; font-weight: 600; font-size: 10.5px;">
            <span>رقم الشحنة</span><span>وجهة التوزيع / العميل</span><span>سائق التوصيل</span><span style="text-align: center;">الحالة</span>
          </div>
          <div class="table-row">
            <span style="font-family: monospace; color: #38BDF8;">#TRK-8921</span>
            <div><div style="color: #F1F5F9; font-weight: 600;">سوبرماركت التضامن — فرع المعلا</div><div style="color: #64748B; font-size: 9.5px;">42 صندوق مواد غذائية</div></div>
            <span style="color: #94A3B8;">أحمد سالم (مركبة 04)</span>
            <span class="badge-status" style="background: rgba(16,185,129,0.15); color: #34D399; border: 1px solid rgba(16,185,129,0.3);">تم التسليم</span>
          </div>
          <div class="table-row">
            <span style="font-family: monospace; color: #38BDF8;">#TRK-8922</span>
            <div><div style="color: #F1F5F9; font-weight: 600;">مجموعة باعبيد للتجارة — الشيخ عثمان</div><div style="color: #64748B; font-size: 9.5px;">18 طرد أجهزة إلكترونية</div></div>
            <span style="color: #94A3B8;">فارس ناصر (مركبة 12)</span>
            <span class="badge-status" style="background: rgba(56,189,248,0.15); color: #38BDF8; border: 1px solid rgba(56,189,248,0.3);">في الطريق</span>
          </div>
          <div class="table-row">
            <span style="font-family: monospace; color: #38BDF8;">#TRK-8923</span>
            <div><div style="color: #F1F5F9; font-weight: 600;">مستودع الميناء المركزي — رصيف 4</div><div style="color: #64748B; font-size: 9.5px;">80 كرتون أدوية ومستلزمات</div></div>
            <span style="color: #94A3B8;">وجدي صالح (مركبة 08)</span>
            <span class="badge-status" style="background: rgba(245,158,11,0.15); color: #FBBF24; border: 1px solid rgba(245,158,11,0.3);">جاري التحميل</span>
          </div>
          <div class="table-row">
            <span style="font-family: monospace; color: #38BDF8;">#TRK-8924</span>
            <div><div style="color: #F1F5F9; font-weight: 600;">صيدليات العافية الحديثة — كريتر</div><div style="color: #64748B; font-size: 9.5px;">15 طرد مبرد (Cold Chain)</div></div>
            <span style="color: #94A3B8;">عمر الخضر (مركبة 02)</span>
            <span class="badge-status" style="background: rgba(56,189,248,0.15); color: #38BDF8; border: 1px solid rgba(56,189,248,0.3);">في الطريق</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    outFile: 'public/images/casestudies/polyclinic-ehr.png',
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
      box-shadow: 0 25px 60px -15px rgba(0,0,0,0.7), 0 0 35px rgba(20,184,166,0.12);
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
      background: rgba(20, 184, 166, 0.15);
      border: 1px solid #0D9488;
      color: #2DD4BF;
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
      grid-template-columns: 300px 1fr;
      gap: 16px;
      background: #09101F;
    }
    .card {
      background: #0D172B;
      border: 1px solid #1E2E4A;
      border-radius: 12px;
      padding: 14px;
    }
    .stat-val { font-size: 26px; font-weight: 800; font-family: 'Alexandria', sans-serif; color: #2DD4BF; }
    .stat-lbl { font-size: 11px; color: #94A3B8; margin-top: 2px; }
    .patient-card {
      background: #0F1D36;
      border: 1px solid #1E3A5F;
      border-radius: 10px;
      padding: 10px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
      <div style="font-size: 12px; font-weight: 700; color: #E2E8F0; font-family: 'Alexandria';">مركز ابن سينا الطبي • Unified Clinical EHR Platform</div>
      <div class="badge-live">● CLINIC OS • ENCRYPTED HIPAA</div>
    </div>
    <div class="grid-dash">
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card">
          <div class="stat-lbl">المرضى المراجعين اليوم (Intake)</div>
          <div class="stat-val">342 <span style="font-size: 12px; color: #10B981;">100% رقمي</span></div>
          <div style="font-size: 10.5px; color: #64748B; margin-top: 4px;">متوسط وقت الانتظار: 8 دقائق فقط (انخفاض 65%)</div>
        </div>
        <div class="card" style="flex: 1;">
          <div style="font-weight: 700; font-size: 12px; color: #F8FAFC; margin-bottom: 10px; border-bottom: 1px solid #1E2E4A; padding-bottom: 6px;">
            حالة غرف الكشف والعيادات (Live Clinics)
          </div>
          <div style="font-size: 11px; space-y: 6px;">
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #1A2844;">
              <span>عيادة الباطنية (د. رمزي)</span>
              <span style="color: #2DD4BF; font-weight: 700;">كشف جاري</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #1A2844;">
              <span>عيادة القلبية (د. هدى)</span>
              <span style="color: #2DD4BF; font-weight: 700;">كشف جاري</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #1A2844;">
              <span>عيادة الأطفال (د. سامي)</span>
              <span style="color: #FBBF24; font-weight: 700;">انتظار مريض (2)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0;">
              <span>المختبر والتحاليل الطبية</span>
              <span style="color: #34D399; font-weight: 700;">مكتمل 94%</span>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card" style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1E2E4A; padding-bottom: 10px; margin-bottom: 12px;">
            <span style="font-weight: 700; font-size: 13px; color: #F8FAFC;">الملف الطبي الموحد للمريض النشط (Active Patient EHR)</span>
            <span style="font-size: 10px; font-family: monospace; color: #2DD4BF; background: rgba(45,212,191,0.1); padding: 2px 8px; border-radius: 4px;">ID: #PT-10492</span>
          </div>
          <div style="background: #081120; border: 1px solid #1E2D4A; border-radius: 10px; padding: 12px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-weight: 700; font-size: 14px; color: #FFFFFF;">المريض: محمد عبدالكريم أحمد (46 سنة)</span>
              <span style="font-size: 11px; color: #94A3B8;">فصيلة الدم: O+ • ضغط الدم: 125/80</span>
            </div>
            <div style="font-size: 11.5px; color: #94A3B8; line-height: 1.6;">
              التشخيص الأولي: التهاب الشعب الهوائية الحاد. تم إجراء أشعة سينية للصدر وفحوصات الدم. الوصفة الطبية صادرة إلكترونياً ومربوطة بصيدلية المركز.
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="patient-card">
              <div><div style="font-size: 10px; color: #94A3B8;">الوصفة الإلكترونية (e-Rx)</div><div style="font-size: 12px; font-weight: 700; color: #2DD4BF;">مرسلة لهاتف المريض بالواتساب</div></div>
              <span style="font-size: 18px;">📱</span>
            </div>
            <div class="patient-card">
              <div><div style="font-size: 10px; color: #94A3B8;">موعد المراجعة والاستشارة</div><div style="font-size: 12px; font-weight: 700; color: #2DD4BF;">الأحد القادم 10:30 صباحاً</div></div>
              <span style="font-size: 18px;">📅</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    outFile: 'public/images/casestudies/microfinance-core.png',
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
      box-shadow: 0 25px 60px -15px rgba(0,0,0,0.7), 0 0 35px rgba(59,130,246,0.15);
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
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid #2563EB;
      color: #60A5FA;
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
    .stat-val { font-size: 26px; font-weight: 800; font-family: 'Alexandria', sans-serif; color: #60A5FA; }
    .stat-lbl { font-size: 11px; color: #94A3B8; margin-top: 2px; }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
      <div style="font-size: 12px; font-weight: 700; color: #E2E8F0; font-family: 'Alexandria';">مؤسسة النماء للتمويل الأصغر • Core Banking & Ledger Hub</div>
      <div class="badge-live">● REAL-TIME LEDGER • ZERO DISCREPANCY</div>
    </div>
    <div class="grid-dash">
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card">
          <div class="stat-lbl">إجمالي المحفظة النشطة الموزعة</div>
          <div class="stat-val">$2.84M <span style="font-size: 12px; color: #10B981;">+24%</span></div>
          <div style="font-size: 10.5px; color: #64748B; margin-top: 4px;">نسبة التحصيل في الموعد: 99.2%</div>
        </div>
        <div class="card" style="flex: 1;">
          <div style="font-weight: 700; font-size: 12px; color: #F8FAFC; margin-bottom: 8px;">حركة المناديب الميدانيين (Field Officers)</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px;">
            <div style="display: flex; justify-content: space-between; padding: 6px; background: #081120; border-radius: 6px;">
              <span>منطقة الشيخ عثمان (14 مندوب)</span>
              <span style="color: #60A5FA; font-weight: 700;">مزامنة مباشرة</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px; background: #081120; border-radius: 6px;">
              <span>منطقة المكلا وضواحيها (19 مندوب)</span>
              <span style="color: #60A5FA; font-weight: 700;">مزامنة مباشرة</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px; background: #081120; border-radius: 6px;">
              <span>منطقة سيئون والوادي (11 مندوب)</span>
              <span style="color: #10B981; font-weight: 700;">مكتمل 100%</span>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="card" style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1E2E4A; padding-bottom: 10px; margin-bottom: 12px;">
            <span style="font-weight: 700; font-size: 13px; color: #F8FAFC;">دورة صرف التمويلات وعمليات السداد الفوري (Disbursements Ledger)</span>
            <span style="font-size: 10px; font-family: monospace; color: #34D399; background: rgba(16,185,129,0.1); padding: 2px 8px; border-radius: 4px;">تشفير مصرفي SHA-256</span>
          </div>
          <div style="display: grid; grid-template-columns: 100px 1fr 110px 90px; padding: 6px 0; color: #64748B; font-size: 10.5px; border-bottom: 1px solid #1E293B;">
            <span>رقم القرض</span><span>المستفيد / النشاط</span><span>المبلغ المصروف</span><span style="text-align: center;">الحالة</span>
          </div>
          <div style="display: grid; grid-template-columns: 100px 1fr 110px 90px; padding: 8px 0; font-size: 11px; align-items: center; border-bottom: 1px solid #1A2844;">
            <span style="color: #60A5FA; font-family: monospace;">#LN-4921</span>
            <div><div style="color: #FFF; font-weight: 600;">ورشة النجارة الحديثة — فضل صالح</div><div style="color: #64748B; font-size: 9.5px;">تمويل شراء آلات ومعدات</div></div>
            <span style="font-weight: 700; color: #E2E8F0;">$4,500</span>
            <span style="background: rgba(16,185,129,0.15); color: #34D399; border: 1px solid rgba(16,185,129,0.3); padding: 2px 6px; border-radius: 4px; text-align: center; font-size: 9.5px;">صرف مكتمل</span>
          </div>
          <div style="display: grid; grid-template-columns: 100px 1fr 110px 90px; padding: 8px 0; font-size: 11px; align-items: center; border-bottom: 1px solid #1A2844;">
            <span style="color: #60A5FA; font-family: monospace;">#LN-4922</span>
            <div><div style="color: #FFF; font-weight: 600;">مخبز البركة الآلي — عدنان علوي</div><div style="color: #64748B; font-size: 9.5px;">تمويل رأس مال عامل</div></div>
            <span style="font-weight: 700; color: #E2E8F0;">$6,200</span>
            <span style="background: rgba(16,185,129,0.15); color: #34D399; border: 1px solid rgba(16,185,129,0.3); padding: 2px 6px; border-radius: 4px; text-align: center; font-size: 9.5px;">صرف مكتمل</span>
          </div>
          <div style="display: grid; grid-template-columns: 100px 1fr 110px 90px; padding: 8px 0; font-size: 11px; align-items: center;">
            <span style="color: #60A5FA; font-family: monospace;">#LN-4923</span>
            <div><div style="color: #FFF; font-weight: 600;">متجر الخياطة والأقمشة — أمينة محسن</div><div style="color: #64748B; font-size: 9.5px;">تمويل مشاريع نسائية صغيرة</div></div>
            <span style="font-weight: 700; color: #E2E8F0;">$2,100</span>
            <span style="background: rgba(59,130,246,0.15); color: #60A5FA; border: 1px solid rgba(59,130,246,0.3); padding: 2px 6px; border-radius: 4px; text-align: center; font-size: 9.5px;">قيد التوثيق</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    outFile: 'public/images/infrastructure-topology.png',
    width: 1080,
    height: 620,
    html: `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #040914;
      color: #E2E8F0;
      font-family: 'IBM Plex Sans Arabic', sans-serif;
      padding: 18px;
      width: 1080px;
      height: 620px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .window {
      background: #08101E;
      border: 1px solid #1E2D4A;
      border-radius: 20px;
      box-shadow: 0 25px 70px -15px rgba(0,0,0,0.8), 0 0 45px rgba(56,189,248,0.15);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .win-bar {
      background: #050B15;
      border-bottom: 1px solid #1E2D4A;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dots { display: flex; gap: 8px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-r { background: #EF4444; }
    .dot-y { background: #F59E0B; }
    .dot-g { background: #10B981; }
    .grid-infra {
      flex: 1;
      padding: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 18px;
      background: #060E1A;
      position: relative;
    }
    .node-card {
      background: #0B172A;
      border: 1px solid #1E3355;
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .node-title {
      font-size: 13px;
      font-weight: 700;
      color: #F8FAFC;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .metric-badge {
      font-family: monospace;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div class="window">
    <div class="win-bar">
      <div class="dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
      <div style="font-size: 13px; font-weight: 700; color: #FFF; font-family: 'Alexandria';">هندسة السحابة المعزولة ومراقبة البنية التحتية • Novixa Cloud Operations</div>
      <div style="font-family: monospace; font-size: 11px; color: #10B981; background: rgba(16,185,129,0.12); padding: 4px 12px; border-radius: 999px; border: 1px solid #059669; font-weight: 700;">
        ● 99.98% UPTIME • GCC EDGE LOW-LATENCY
      </div>
    </div>
    <div class="grid-infra">
      <div class="node-card">
        <div>
          <div class="node-title">
            <span style="font-size: 18px;">🛡️</span>
            <span>بوابة الحماية والحواف السحابية</span>
          </div>
          <div style="font-size: 11px; color: #94A3B8; margin-top: 6px;">Global Anycast Edge & DDoS Protection</div>
        </div>
        <div style="space-y: 6px; margin: 12px 0; font-size: 11px;">
          <div style="display: flex; justify-content: space-between; color: #CBD5E1;"><span>تشفير الاتصال:</span><span style="color: #38BDF8; font-family: monospace;">TLS 1.3 Strict</span></div>
          <div style="display: flex; justify-content: space-between; color: #CBD5E1;"><span>حظر التهديدات:</span><span style="color: #10B981; font-family: monospace;">WAF Shield Active</span></div>
          <div style="display: flex; justify-content: space-between; color: #CBD5E1;"><span>معدل سرعة الحافة:</span><span style="color: #38BDF8; font-family: monospace;">18ms CDN</span></div>
        </div>
        <div style="background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.3); padding: 6px 10px; border-radius: 8px; font-size: 10px; color: #38BDF8; text-align: center; font-weight: 700;">
          حماية أمنية مدارة 24/7
        </div>
      </div>

      <div class="node-card" style="border-color: #0284C7; box-shadow: 0 0 20px rgba(56,189,248,0.15);">
        <div>
          <div class="node-title">
            <span style="font-size: 18px;">⚡</span>
            <span>بيئة التطبيقات والخوادم المعزولة</span>
          </div>
          <div style="font-size: 11px; color: #94A3B8; margin-top: 6px;">Containerized Production Instances</div>
        </div>
        <div style="space-y: 6px; margin: 12px 0; font-size: 11px;">
          <div style="display: flex; justify-content: space-between; color: #CBD5E1;"><span>استهلاك المعالج CPU:</span><span style="color: #10B981; font-family: monospace;">14% Optimal</span></div>
          <div style="display: flex; justify-content: space-between; color: #CBD5E1;"><span>الذاكرة RAM:</span><span style="color: #38BDF8; font-family: monospace;">1.8GB / 8GB</span></div>
          <div style="display: flex; justify-content: space-between; color: #CBD5E1;"><span>التوسع التلقائي (Auto-Scale):</span><span style="color: #10B981; font-family: monospace;">جاهز للذروة</span></div>
        </div>
        <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); padding: 6px 10px; border-radius: 8px; font-size: 10px; color: #34D399; text-align: center; font-weight: 700;">
          خوادم سحابية مخصصة ومعزولة
        </div>
      </div>

      <div class="node-card">
        <div>
          <div class="node-title">
            <span style="font-size: 18px;">🗄️</span>
            <span>قواعد البيانات والنسخ المشفر</span>
          </div>
          <div style="font-size: 11px; color: #94A3B8; margin-top: 6px;">High-Availability PostgreSQL Cluster</div>
        </div>
        <div style="space-y: 6px; margin: 12px 0; font-size: 11px;">
          <div style="display: flex; justify-content: space-between; color: #CBD5E1;"><span>النسخ الاحتياطي:</span><span style="color: #10B981; font-family: monospace;">يومي تلقائي (Offsite)</span></div>
          <div style="display: flex; justify-content: space-between; color: #CBD5E1;"><span>استرجاع الكوارث:</span><span style="color: #38BDF8; font-family: monospace;">RPO: <1min</span></div>
          <div style="display: flex; justify-content: space-between; color: #CBD5E1;"><span>عزل البيانات:</span><span style="color: #38BDF8; font-family: monospace;">RLS Encryption</span></div>
        </div>
        <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); padding: 6px 10px; border-radius: 8px; font-size: 10px; color: #60A5FA; text-align: center; font-weight: 700;">
          حفظ البيانات خارج الموقع بنسخ مشفر
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
  }
];

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const item of screens) {
    const page = await browser.newPage({
      viewport: { width: item.width, height: item.height },
      deviceScaleFactor: 1,
    });
    await page.setContent(item.html, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    const dir = path.dirname(item.outFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: item.outFile });
    console.log(`Generated: ${item.outFile}`);
    await page.close();
  }

  await browser.close();
})().catch((err) => {
  console.error('Error generating images:', err);
  process.exit(1);
});
