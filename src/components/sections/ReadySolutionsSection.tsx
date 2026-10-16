'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '@/types';
import { READY_SOLUTIONS } from '../../content/data';
import {
  UtensilsCrossed,
  CalendarCheck,
  Users,
  PackageCheck,
  HeartPulse,
  GraduationCap,
  Building2,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  Zap,
  AlertTriangle,
  UserCheck,
  Headphones,
  Laptop,
  Check,
  Quote,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UtensilsCrossed,
  CalendarCheck,
  Users,
  PackageCheck,
  HeartPulse,
  GraduationCap,
  Building2,
  ShieldCheck,
};

// Rich frontline human context for each ready solution
interface SolutionHumanMeta {
  beneficiaryRole: { ar: string; en: string };
  humanFriction: { ar: string; en: string };
  humanEase: { ar: string; en: string };
  operatorQuote: { ar: string; en: string };
  operatorRole: { ar: string; en: string };
  highlightMetric: { value: string; label: { ar: string; en: string } };
  tagCode: string;
}

const HUMAN_META_MAP: Record<string, SolutionHumanMeta> = {
  'restaurant-solution': {
    beneficiaryRole: {
      ar: 'مشرف الصالة، كاشير نقطة البيع، ورئيس طهاة المطبخ',
      en: 'Floor Supervisor, Cashier & Head Kitchen Chef',
    },
    humanFriction: {
      ar: 'صراخ وارتباك في ساعات الذروة، تذاكر ورقية تضيع بين الأطباق، وزبائن غاضبون بسبب تأخر أو خلط الطلبات.',
      en: 'Peak-hour shouting, paper order chits lost near cooking stations, and frustrated guests waiting on mixed-up tickets.',
    },
    humanEase: {
      ar: 'تصل طلبات الطاولات والـ QR لشاشات المطبخ فوراً بترتيب الورود، الكاشير يتحكم بالمخزون، والعمل يجري بهدوء تام.',
      en: 'Table and QR orders route instantly to kitchen displays by exact arrival time, the cashier stays in control, and the floor operates in total calm.',
    },
    operatorQuote: {
      ar: '«ساعات الذروة في المساء كانت كابوساً يومياً بالنسبة لنا. بعد تشغيل شاشات المطبخ ونقاط البيع السحابية، اختفى التوتر والارتباك تماماً، وأصبح كل طلب يخرج بدقة وسرعة قياسية.»',
      en: '"Evening dinner rushes used to be our daily nightmare. Since deploying the KDS and cloud POS, the yelling stopped and every ticket comes out with military precision."',
    },
    operatorRole: {
      ar: 'صوت من الميدان • إدارة العمليات والضيافة',
      en: 'Frontline Voice • Hospitality Operations',
    },
    highlightMetric: {
      value: '-50%',
      label: { ar: 'وقت انتظار الزبائن في ساعات الذروة', en: 'Customer peak-rush wait time' },
    },
    tagCode: 'SOL-RES',
  },
  'booking-solution': {
    beneficiaryRole: {
      ar: 'مسؤولة الاستقبال والجدولة، الأطباء والمختصون، والمراجعون',
      en: 'Reception Coordinator, Doctors & Patients',
    },
    humanFriction: {
      ar: 'قضاء ساعات طويلة يومياً في محادثات الواتساب لتنسيق موعد، وتخلف ثلث العملاء دون سابق إنذار مما يترك الطبيب بلا عمل.',
      en: 'Spending half the workday chatting on WhatsApp to coordinate time slots, only for 35% of clients to no-show without notice.',
    },
    humanEase: {
      ar: 'بوابة حجز تفاعلية تتيح للعميل اختيار وقته ودفع العربون، مع تذكير آلي بالواتساب يضمن امتلاء الجدول بالكامل.',
      en: 'Self-serve booking portal with deposit lock and automatic WhatsApp reminders keeping practitioner calendars 100% full.',
    },
    operatorQuote: {
      ar: '«كنا نخسر آلاف الساعات شهرياً في متابعة المواعيد بالهاتف. الآن العميل يحجز وقته ويدفع العربون بنفسه، ونسبة التخلف عن الحضور انخفضت إلى شبه الصفر.»',
      en: '"We used to waste dozens of hours calling patients. Now clients pick their time and lock in deposits themselves, cutting no-shows to near zero."',
    },
    operatorRole: {
      ar: 'صوت من الميدان • قسم الاستقبال والمواعيد',
      en: 'Frontline Voice • Reception & Scheduling Lead',
    },
    highlightMetric: {
      value: '80%',
      label: { ar: 'انخفاض في نسبة التخلف عن المواعيد (No-Show)', en: 'Drop in appointment no-shows' },
    },
    tagCode: 'SOL-BOOK',
  },
  'crm-solution': {
    beneficiaryRole: {
      ar: 'مدير المبيعات، مسؤولو الصفقات الميدانيون، وفريق المتابعة',
      en: 'Sales Director, Field Closers & Follow-Up Team',
    },
    humanFriction: {
      ar: 'جهات الاتصال مبعثرة في هواتف المناديب الشخصية، عملاء يتم نسيانهم لأسابيع، والإدارة لا تعرف حجم الصفقات المتوقعة.',
      en: 'Customer contacts trapped in sales reps personal phones, leads forgotten for weeks, and management guessing at quarterly revenue.',
    },
    humanEase: {
      ar: 'لوحة صفقات بصرية تعرض مسار كل عميل من الاستفسار إلى العقد، مع تنبيهات متابعة آلية وعروض أسعار فورية بـ PDF.',
      en: 'Visual deal pipeline showing every prospect from inquiry to contract, with automated follow-up triggers and 1-click PDF quotations.',
    },
    operatorQuote: {
      ar: '«عندما كان يغادر أي مندوب كان يأخذ تاريخ عملائه معه. اليوم لدينا سجل مؤسسي دائم لكل مكالمة وعرض، ونعرف بالضبط أين تقف كل صفقة في كل لحظة.»',
      en: '"When a sales rep left, our customer history left with them. Today we have an institutional record of every deal and know exactly where our pipeline stands."',
    },
    operatorRole: {
      ar: 'صوت من الميدان • إدارة المبيعات والتطوير التجاري',
      en: 'Frontline Voice • Commercial Sales Lead',
    },
    highlightMetric: {
      value: '+35%',
      label: { ar: 'زيادة في معدل إغلاق الصفقات وتحويل الفرص', en: 'Increase in deal win rates' },
    },
    tagCode: 'SOL-CRM',
  },
  'inventory-solution': {
    beneficiaryRole: {
      ar: 'مشرف المستودع المركزي، أمناء العهد في الفروع، ومدير المشتريات',
      en: 'Central Warehouse Head, Branch Stock Keepers & Procurement',
    },
    humanFriction: {
      ar: 'فروقات جرد شهرية تسبب نزاعات مستمرة، بضائع تضيع أثناء النقل بين الفروع دون إيصالات، ونفاد مفاجئ لأصناف حيوية.',
      en: 'Monthly inventory variances causing constant friction, items lost in inter-branch transit without proof, and unexpected stockouts.',
    },
    humanEase: {
      ar: 'مزامنة لحظية عبر الباركود، طلبات تحويل رقمية تتطلب موافقة المستلم، وتنبيهات مبكرة قبل وصول الكميات للحد الأدنى.',
      en: 'Real-time barcode scanning, digital transfer requests requiring dual-party signoff, and proactive replenishment warnings.',
    },
    operatorQuote: {
      ar: '«كان الجرد نهاية كل شهر كابوساً يستمر لثلاثة أيام من الحسابات اليدوية المرهقة. الآن بمسحة باركود واحدة نعرف رصيد كل فرع بالقطعة وتطابقت دفاترنا 100%.»',
      en: '"Month-end stocktakes used to take three sleepless days of manual counting. Now with barcode verification, our branch balances match physical inventory down to the unit."',
    },
    operatorRole: {
      ar: 'صوت من الميدان • سلاسل الإمداد والمستودعات',
      en: 'Frontline Voice • Warehouse & Logistics Supervisor',
    },
    highlightMetric: {
      value: '95%',
      label: { ar: 'القضاء على عجز وفروقات الجرد الدورية', en: 'Elimination of stock reconciliation errors' },
    },
    tagCode: 'SOL-INV',
  },
  'clinic-solution': {
    beneficiaryRole: {
      ar: 'الأطباء، كادر التمريض، مسؤول السجلات الطبية، والمرضى',
      en: 'Attending Physicians, Nurses, Medical Records Staff & Patients',
    },
    humanFriction: {
      ar: 'تكدس ملفات ورقية قديمة وصعوبة قراءة خط الروشتات، وضياع نتائج الفحوصات السابقة للمريض عند مراجعة عيادة أخرى.',
      en: 'Piles of worn paper folders, illegible handwriting, and misplaced diagnostic labs when patients visit multiple clinics.',
    },
    humanEase: {
      ar: 'ملف طبي إلكتروني موحد يفتحه الطبيب بثوانٍ، كتابة وصفات إلكترونية واضحة، وإرسال تنبيهات المراجعة للواتساب.',
      en: 'Unified EHR opened in seconds, clear digital e-prescriptions, and automated WhatsApp follow-up schedules sent straight to the patient.',
    },
    operatorQuote: {
      ar: '«راحة الطبيب في أن يجد التاريخ المرضي والفحوصات مرتبة أمامه بضغطة زر لا تقدر بثمن. توقفنا عن إضاعة وقت المرضى في صالة الانتظار وتفرغنا للرعاية الفعلية.»',
      en: '"Having a patients complete medical history and lab trends at your fingertips in seconds transforms the entire consultation. Waiting times vanished."',
    },
    operatorRole: {
      ar: 'صوت من الميدان • الكادر الطبي والإداري',
      en: 'Frontline Voice • Clinic Medical Director',
    },
    highlightMetric: {
      value: '60%',
      label: { ar: 'تسريع دورة فحص المريض وإصدار الوصفات', en: 'Faster patient intake and prescription speed' },
    },
    tagCode: 'SOL-MED',
  },
  'property-solution': {
    beneficiaryRole: {
      ar: 'مدير الأصول العقارية، الملاك، المستأجرون، والوسطاء',
      en: 'Asset Manager, Property Owners, Tenants & Brokers',
    },
    humanFriction: {
      ar: 'تأخر دفعات الإيجار بسبب نسيان المواعيد، شكاوى المستأجرين من الصيانة التي تضيع في رسائل الواتساب، ونزاعات عمولات الوسطاء.',
      en: 'Missed rent payment dates, maintenance complaints buried in personal chats, and chaotic broker commission tracking.',
    },
    humanEase: {
      ar: 'تنبيهات استحقاق آلية للمستأجرين، بوابة طلبات صيانة رقمية موثقة، وبوابة خاصة للوسطاء مع خريطة الوحدات الشاغرة.',
      en: 'Automated rent due reminders, logged maintenance ticket workflow, and a dedicated broker portal with live unit map availability.',
    },
    operatorQuote: {
      ar: '«إدارة 120 شقة ومحل تجاري بالإكسل كانت تسبب ضياع إيجارات ومشاكل صيانة لا تنتهي. اليوم نتحكم في المحفظة بالكامل بنقرة واحدة ونسبة التحصيل ارتفعت بشكل ملحوظ.»',
      en: '"Managing 120 residential and retail units on spreadsheets was a constant nightmare. Today our entire portfolio is on autopilot and collections jumped 40%."',
    },
    operatorRole: {
      ar: 'صوت من الميدان • إدارة المحافظ والأملاك',
      en: 'Frontline Voice • Real Estate Portfolio Manager',
    },
    highlightMetric: {
      value: '+40%',
      label: { ar: 'تحسن في دقة وسرعة تحصيل الإيجارات في موعدها', en: 'On-time rent collection rate boost' },
    },
    tagCode: 'SOL-PROP',
  },
  'school-solution': {
    beneficiaryRole: {
      ar: 'مدير المركز، المعلمون والمدربون، الطلاب وأولياء الأمور',
      en: 'Academy Director, Instructors, Students & Parents',
    },
    humanFriction: {
      ar: 'دفاتر حضور ورقية متهالكة، صعوبة متابعة سداد أقساط الدورات، وطباعة الشهادات واحدة تلو الأخرى يدوياً.',
      en: 'Worn paper attendance logs, manual tuition fee follow-ups, and hours spent manually formatting and signing certificates.',
    },
    humanEase: {
      ar: 'تسجيل إلكتروني للدورات، إشعار فوري لولي الأمر عند الغياب، إصدار جماعي للشهادات المعتمدة بـ QR، وتتبع مالي دقيق.',
      en: 'Online course enrollment, instant absence alerts to parents, 1-click batch certificate issuing with QR verification, and clear ledger.',
    },
    operatorQuote: {
      ar: '«كنا نقضي أسابيع كاملة في نهاية كل دورة تدريبية لتجهيز الشهادات وتدقيق الرسوم. النظام وفر علينا مئات الساعات وأعطى مركزنا واجهة احترافية يثق بها الطلاب.»',
      en: '"We used to spend weeks at the end of every term checking tuition balances and printing certificates. The system saved hundreds of hours."',
    },
    operatorRole: {
      ar: 'صوت من الميدان • الإدارة الأكاديمية والتدريب',
      en: 'Frontline Voice • Academy Operations Coordinator',
    },
    highlightMetric: {
      value: '70%',
      label: { ar: 'توفير في ساعات العمل الإداري والتسجيل اليدوي', en: 'Reduction in manual administrative work' },
    },
    tagCode: 'SOL-EDU',
  },
  'operations-solution': {
    beneficiaryRole: {
      ar: 'الرئيس التنفيذي، مديرو الفروع والأقسام، وفرق العمل الميدانية',
      en: 'CEO, Branch Managers & Field Execution Teams',
    },
    humanFriction: {
      ar: 'طلبات صرف وموافقات تتعطل لأيام في رسائل الواتساب، والمدير لا يملك صورة واضحة عما إذا كانت المهام تنجز أم لا.',
      en: 'Expense approvals stalled in WhatsApp threads, zero SLA accountability, and executives operating without visibility into branch status.',
    },
    humanEase: {
      ar: 'دورة موافقات رقمية بمراحل محددة وزمن إنجاز واضح، لوحة تحكم تعرض مؤشرات الفروع الحية، وسجل تدقيق لكل إجراء.',
      en: 'Structured approval ladder with clear SLA countdowns, live multi-branch health radar, and transparent audit logs for all decisions.',
    },
    operatorQuote: {
      ar: '«قبل نوڤيكسا كانت الموافقات تستغرق 5 أيام وتضيع في البريد. اليوم تتم الموافقة على طلبات الصرف الميدانية في أقل من 30 دقيقة والجميع يخضع لمؤشرات إنجاز واضحة.»',
      en: '"Approvals used to take 5 days and vanish in inboxes. Today field requests clear in under 30 minutes with full accountability."',
    },
    operatorRole: {
      ar: 'صوت من الميدان • الإدارة التنفيذية والعمليات',
      en: 'Frontline Voice • Chief Operating Officer',
    },
    highlightMetric: {
      value: '30 min',
      label: { ar: 'متوسط زمن اعتماد الطلبات التشغيلية بدل 5 أيام', en: 'Average approval turnaround vs 5 days' },
    },
    tagCode: 'SOL-OPS',
  },
};

export const ReadySolutionsSection = ({ lang: _lang }: { lang?: Language }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeId, setActiveId] = useState<string>(READY_SOLUTIONS[0].id);

  const activeSolution = READY_SOLUTIONS.find((s) => s.id === activeId) || READY_SOLUTIONS[0];
  const activeHuman = HUMAN_META_MAP[activeSolution.id] || HUMAN_META_MAP['restaurant-solution'];
  const ActiveIcon = iconMap[activeSolution.iconName] || Zap;

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {t('أنظمة تشغيل مجربة ومكتملة الميزات.', 'Proven software foundations, ready to deploy.')}
            </h2>
          </div>

          <div className="shrink-0">
            <Link
              href={`/${language}/solutions`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group"
            >
              <span>{t('استكشف كتالوج الحلول بالكامل والباقات', 'Explore All Ready Solutions & Tiers')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 text-blue-600" />
            </Link>
          </div>
        </div>

        {/* 1. Horizontal Interactive Solution Navigator (Pill Switcher) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none text-right rtl:text-right ltr:text-left">
          {READY_SOLUTIONS.map((sol) => {
            const IconCmp = iconMap[sol.iconName] || Zap;
            const isSelected = sol.id === activeId;
            return (
              <button
                key={sol.id}
                type="button"
                onClick={() => setActiveId(sol.id)}
                className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 border-[#38BDF8] text-white shadow-lg shadow-cyan-950/20 ring-1 ring-[#38BDF8]'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:border-cyan-300 hover:bg-slate-50'
                }`}
              >
                <IconCmp className={`w-4 h-4 ${isSelected ? 'text-[#38BDF8]' : 'text-slate-500'}`} />
                <span className={isSelected ? 'text-white' : 'text-slate-800'}>
                  {t(sol.name.ar, sol.name.en)}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {t(sol.deliveryDays.ar, sol.deliveryDays.en)}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Main Interactive Showcase Stage (The Featured System) */}
        <div className="rounded-3xl border border-slate-200/90 bg-white shadow-[0_12px_40px_-10px_rgba(15,23,42,0.08)] overflow-hidden text-right rtl:text-right ltr:text-left">
          
          {/* Header Bar of the Active System */}
          <div className="p-6 sm:p-8 bg-slate-900 text-white border-b border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-[#38BDF8] shrink-0 shadow-inner">
                <ActiveIcon className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-[#38BDF8] bg-cyan-950/80 px-2.5 py-0.5 rounded-md border border-cyan-800 font-bold">
                    {activeHuman.tagCode}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {t(activeSolution.category.ar, activeSolution.category.en)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t('متاح للتهيئة الفورية', 'Ready for Setup')}</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-white">
                  {t(activeSolution.name.ar, activeSolution.name.en)}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-200/80 font-arabic">
                  {t(activeSolution.tagline.ar, activeSolution.tagline.en)}
                </p>
              </div>
            </div>

            {/* Quick Timing & Metric Badge */}
            <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-right rtl:text-right ltr:text-left">
                <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#38BDF8]" />
                  <span>{t('زمن الإطلاق والاستقرار', 'Time to Launch')}</span>
                </div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">
                  {t(activeSolution.deliveryDays.ar, activeSolution.deliveryDays.en)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-800/80 text-right rtl:text-right ltr:text-left">
                <div className="text-[10px] font-mono text-cyan-300">
                  {t('الأثر التشغيلي المحقق', 'Operational Impact')}
                </div>
                <div className="text-sm font-bold text-[#38BDF8] font-mono mt-0.5">
                  {activeHuman.highlightMetric.value}
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            
            {/* 1. The Frontline Human Beneficiary & Comparison (Real Operational Shift) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 font-semibold">
                <UserCheck className="w-4 h-4 text-cyan-600" />
                <span>
                  {t('المستفيد الميداني المباشر:', 'Primary Frontline Beneficiary:')}{' '}
                  <span className="text-slate-900 font-bold">{t(activeHuman.beneficiaryRole.ar, activeHuman.beneficiaryRole.en)}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Friction Card (Before Novixa) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-rose-950 space-y-2.5 font-arabic">
                  <div className="flex items-center gap-2 text-rose-700 text-xs font-mono font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{t('الواقع التشغيلي المجهد (الوضع التقليدي):', 'Manual Frontline Friction (Status Quo):')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-normal">
                    {t(activeHuman.humanFriction.ar, activeHuman.humanFriction.en)}
                  </p>
                </div>

                {/* Resolution Card (With Novixa Ready Solution) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 text-cyan-950 space-y-2.5 font-arabic">
                  <div className="flex items-center gap-2 text-cyan-800 text-xs font-mono font-bold">
                    <Zap className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>{t('الاستقرار التشغيلي مع نظام نوڤيكسا:', 'Operational Ease with Novixa Platform:')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-cyan-900 leading-relaxed font-normal">
                    {t(activeHuman.humanEase.ar, activeHuman.humanEase.en)}
                  </p>
                </div>

              </div>
            </div>

            {/* 2. Frontline Operator Voice (Human Quote) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 relative overflow-hidden shadow-lg">
              <div className="absolute top-3 left-4 opacity-10 pointer-events-none">
                <Quote className="w-20 h-20 text-cyan-400" />
              </div>
              
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 font-semibold">
                    <Headphones className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>{t(activeHuman.operatorRole.ar, activeHuman.operatorRole.en)}</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
                    {t('تجربة تشغيل حقيقية', 'Verified Operations')}
                  </span>
                </div>

                <p className="text-xs sm:text-sm lg:text-base text-slate-200 font-arabic italic leading-relaxed">
                  {t(activeHuman.operatorQuote.ar, activeHuman.operatorQuote.en)}
                </p>
              </div>
            </div>

            {/* 3. Core System Capabilities Grid (4 Columns) */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-700 font-bold uppercase tracking-wider">
                {t('أهم القدرات والميزات الجاهزة في النظام:', 'Core Operational Capabilities Included:')}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {activeSolution.features[isRtl ? 'ar' : 'en'].slice(0, 6).map((featureText, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 hover:bg-slate-100/70 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-xs text-slate-800 font-arabic font-medium leading-relaxed">
                      {featureText}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Bottom Action Bar */}
            <div className="pt-4 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 font-arabic">
                <span className="font-bold text-slate-900">{t('جاهز للتخصيص الكامل:', 'Fully Configurable:')}</span>{' '}
                {t('يتضمن ربط هويتك، النطاق، بوابات الدفع، والتدريب الميداني.', 'Includes custom domain, visual branding, payment gateway & staff training.')}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <Link
                  href={`/${language}/contact`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-xs sm:text-sm font-bold text-[#38BDF8] transition-all cursor-pointer shadow-md shadow-cyan-950/20"
                >
                  <span className="text-[#38BDF8]">{t('طلب استشارة وعرض تجريبي للنظام', 'Request Live Demo & Scope')}</span>
                  <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
                </Link>

                <Link
                  href={`/${language}/solutions`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  <span>{t('معاينة كافة الباقات والأسعار', 'View Packages & Pricing')}</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* 3. The Novixa Human Onboarding Protocol (How we deliver in 5-14 days) */}
        <div className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-slate-900 text-white border border-slate-800 relative overflow-hidden space-y-8 text-right rtl:text-right ltr:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-semibold">
              <Laptop className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{t('بروتوكول التسليم والمرافقة البشرية', 'The Human Onboarding Protocol')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              {t('كيف نحوّل الحل الجاهز إلى نظام يعمل في منشأتك خلال 5 إلى 14 يوماً؟', 'How we turn a turnkey solution into your live operations within 5–14 days?')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
              {t(
                'نحن لا نبيع برمجيات معلبة ونتركك تواجه التعقيد وحدك. يرافقك فريقنا الهندسي عبر 4 مراحل دقيقة لضمان انتقال سلس دون تعطيل عملك اليومي.',
                'We do not hand over software and leave you alone. Our engineering team accompanies you across 4 structured steps ensuring a zero-downtime transition.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
            {[
              {
                step: '01',
                time: { ar: 'الأيام 1–2', en: 'Days 1–2' },
                title: { ar: 'دراسة نموذج العمل وتخصيص الهوية', en: 'Scope & Visual Branding' },
                desc: {
                  ar: 'جلسة هندسية مباشرة لفهم دورة العمل، وتهيئة السيرفر السحابي المعزول، وربط هويتك البصرية وألوانك ونطاقك الخاص.',
                  en: 'Direct consultation to align workflows, provision isolated cloud server, and bind your brand identity and custom domain.',
                },
              },
              {
                step: '02',
                time: { ar: 'الأيام 3–6', en: 'Days 3–6' },
                title: { ar: 'رفع البيانات وتكامل الأجهزة', en: 'Data Ingestion & Hardware Sync' },
                desc: {
                  ar: 'إدخال قوائم الأصناف والأسعار أو سجلات المرضى والعقارات، وربط الطابعات الحرارية وبوابات الدفع الإلكتروني.',
                  en: 'Importing catalogs, price lists, patient files or unit databases, and configuring thermal receipt printers and payment gateways.',
                },
              },
              {
                step: '03',
                time: { ar: 'الأيام 7–10', en: 'Days 7–10' },
                title: { ar: 'التدريب البشري الميداني للموظفين', en: 'Frontline Staff Hands-on Training' },
                desc: {
                  ar: 'جلسات تدريب عملية مباشرة للكاشير وموظف الاستقبال وفريق العمل على أجهزتهم الفعلية لضمان ثقتهم الكاملة.',
                  en: 'Direct practical workshops for cashiers, receptionists, and supervisors on their actual devices until 100% confidence.',
                },
              },
              {
                step: '04',
                time: { ar: 'الأيام 11–14', en: 'Days 11–14' },
                title: { ar: 'يوم المحاكاة والإطلاق الرسمي', en: 'Dry-Run Simulation & Go-Live' },
                desc: {
                  ar: 'محاكاة تشغيلية شاملة بدون زبائن للتأكد من انعدام الأخطاء، ثم فتح النظام للجمهور مع دعم هندسي فوري.',
                  en: 'Full end-to-end dry-run rehearsal before customer launch, followed by live production deployment with priority SLA support.',
                },
              },
            ].map((st, sIdx) => (
              <div
                key={sIdx}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 relative group hover:border-[#38BDF8]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#38BDF8] bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    STEP {st.step}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {t(st.time.ar, st.time.en)}
                  </span>
                </div>
                <h4 className="text-sm font-bold font-display text-white group-hover:text-[#38BDF8] transition-colors">
                  {t(st.title.ar, st.title.en)}
                </h4>
                <p className="text-xs text-slate-400 font-arabic leading-relaxed">
                  {t(st.desc.ar, st.desc.en)}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-arabic text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
              <span>{t('ضمان الاستقرار الفني: مهندس صيانة مخصص لكل عميل ونسخ احتياطي يومي مشفر.', 'Stability Guarantee: Dedicated engineer assigned to every client with encrypted daily backups.')}</span>
            </div>
            <Link
              href={`/${language}/contact`}
              className="text-[#38BDF8] hover:text-cyan-300 font-semibold inline-flex items-center gap-1 group"
            >
              <span className="text-[#38BDF8]">{t('تحدث مع مهندس الآن لتقييم حل مناسب لنشاطك', 'Talk to an Engineer Now')}</span>
              <ArrowIcon className="w-3.5 h-3.5 text-[#38BDF8] transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* 4. Complete Catalog Quick Cards (Browse all 8 ready foundations) */}
        <div className="space-y-6 text-right rtl:text-right ltr:text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
              {t('تصفح بقية الحلول الجاهزة المتاحة للطلب الفوري', 'Explore Other Ready Business Systems')}
            </h3>
            <span className="text-xs font-mono text-slate-500">
              {READY_SOLUTIONS.length} {t('حلول مكتملة', 'Foundations')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {READY_SOLUTIONS.map((sol) => {
              const IconCmp = iconMap[sol.iconName] || Zap;
              const isCurrent = sol.id === activeId;
              return (
                <div
                  key={sol.id}
                  onClick={() => setActiveId(sol.id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 ${
                    isCurrent
                      ? 'bg-slate-900 border-[#38BDF8] text-white shadow-xl shadow-cyan-950/20 ring-1 ring-[#38BDF8]'
                      : 'bg-white border-slate-200/90 text-slate-800 hover:border-cyan-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isCurrent ? 'bg-cyan-950 border border-cyan-800 text-[#38BDF8]' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <IconCmp className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                        isCurrent ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {t(sol.deliveryDays.ar, sol.deliveryDays.en)}
                      </span>
                    </div>

                    <div>
                      <h4 className={`text-sm font-bold font-display line-clamp-1 ${
                        isCurrent ? 'text-white' : 'text-slate-900'
                      }`}>
                        {t(sol.name.ar, sol.name.en)}
                      </h4>
                      <p className={`text-xs mt-1 font-arabic line-clamp-2 ${
                        isCurrent ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {t(sol.tagline.ar, sol.tagline.en)}
                      </p>
                    </div>
                  </div>

                  <div className={`pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                    isCurrent ? 'border-slate-800 text-[#38BDF8]' : 'border-slate-100 text-cyan-700'
                  }`}>
                    <span>{isCurrent ? t('معروض حالياً في المنصة ↑', 'Currently Active ↑') : t('معاينة النظام والواقع', 'Inspect Solution')}</span>
                    <ArrowIcon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#38BDF8]' : 'text-cyan-700'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
