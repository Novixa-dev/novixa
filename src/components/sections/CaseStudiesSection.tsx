'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { CASE_STUDIES } from '../../content/data';
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Quote,
  ShieldCheck,
  UserCheck,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CASE_STUDY_IMAGES: Record<string, { src: string; altAr: string; altEn: string; badgeAr: string; badgeEn: string }> = {
  'black-spider': {
    src: '/images/casestudies/gaming-arena.png',
    altAr: 'واجهة تشغيل صالة بلاك سبايدر للألعاب وإدارة أجهزة اللعب',
    altEn: 'Black Spider Gaming Arena Stations & Lounge OS Interface',
    badgeAr: 'محاكاة حية لنظام التشغيل وقفل المحطات المؤتمت',
    badgeEn: 'Live Station Automation & Lounge OS Mockup',
  },
  'aura-medical': {
    src: '/images/casestudies/polyclinic-ehr.png',
    altAr: 'شاشة السجل الطبي المشفر ومنصة عيادات أورا الطبية',
    altEn: 'Aura Medical Encrypted Clinical EHR & Intake Platform',
    badgeAr: 'واجهة السجل الطبي والملف الموحد المشفر',
    badgeEn: 'Encrypted Clinical EHR & Patient Intake Interface',
  },
  'nexus-logistics': {
    src: '/images/casestudies/logistics-hub.png',
    altAr: 'غرفة تحكم التوزيع اللوجستي وتتبع الأسطول المباشر',
    altEn: 'Nexus Logistics Fleet Radar & Live Order Dispatch Interface',
    badgeAr: 'غرفة قيادة وتوزيع الشحنات وإرساليات المستودعات',
    badgeEn: 'Fleet Tracking & Live Warehouse Dispatch Console',
  },
};

interface CaseStudiesSectionProps {
  lang: Language;
  /** The /work page renders its own page-level H1 and intro (with a
   * link back to itself that would be redundant here), so it passes
   * false to skip this section's homepage-teaser header entirely. */
  showHeader?: boolean;
}

interface HumanPerspectiveData {
  humanFrictionAr: string;
  humanFrictionEn: string;
  humanResolutionAr: string;
  humanResolutionEn: string;
  architectNoteAr: string;
  architectNoteEn: string;
  primaryBeneficiaryAr: string;
  primaryBeneficiaryEn: string;
  engineeringPhilosophyAr: string;
  engineeringPhilosophyEn: string;
}

const HUMAN_PERSPECTIVES: Record<string, HumanPerspectiveData> = {
  'black-spider': {
    primaryBeneficiaryAr: 'كاشير الصالة واللاعبون في ساعات الذروة',
    primaryBeneficiaryEn: 'Frontline Cashiers & Weekend Gamers',
    engineeringPhilosophyAr: 'هندسة ذاتية تلغي طوابير الانتظار وتحمي تركيز الطاقم',
    engineeringPhilosophyEn: 'Self-service flows that eliminate queues and protect staff focus',
    humanFrictionAr:
      'طوابير خانقة في عطلات نهاية الأسبوع، موظف كاشير متوتر يتشتت بين حساب الدقائق المتبقية يدويًا وتدوين طلبات المشروبات في دفاتر ورقية، مما يتسبب في مشاحنات مستمرة مع الزبائن وتأخر بدء المباريات.',
    humanFrictionEn:
      'Weekend customer congestion with an overwhelmed cashier juggling manual station timers, handwritten drink tickets, and frequent disputes over remaining playtime.',
    humanResolutionAr:
      'تحويل الحجز والطلب إلى تجربة ذاتية بالكامل عبر الجوال وشاشات الأجهزة: عداد وقت تنازلي يقفل المحطة تلقائيًا دون إحراج، ورمز QR في المقعد يرسل الطلب مباشرة إلى المطبخ بنقرة واحدة، ليتفرغ الموظف للترحيب باللاعبين وتأمين الأجواء الحماسية.',
    humanResolutionEn:
      'Automated in-seat QR ordering and hardware countdown locks resolved the friction: zero cashier timer tracking, direct kitchen fulfillment, and calm, self-managed player sessions.',
    architectNoteAr:
      'في بيئة الألعاب التنافسية، أي تأخير في الاستجابة يولد إحباطًا فوريًا لدى اللاعب وتوترًا لدى الموظف. لم نرد بناء لوحة تحكم معقدة للموظف، بل أعدنا هندسة العملية لتصبح ذاتية بالكامل: الحجز مسبق من الهاتف، والطلب بنقرة واحدة من مقعد اللاعب. رفعنا العبء النفسي والتشغيلي عن الكاشير ليتفرغ لخدمة المجتمع وبناء الأجواء التنافسية الممتعة.',
    architectNoteEn:
      'In high-energy gaming environments, friction translates immediately into customer frustration and staff burnout. We didn’t burden cashiers with another dashboard; we engineered the experience to be self-service from seat to kitchen, freeing staff to elevate the gaming community.',
  },
  'aura-medical': {
    primaryBeneficiaryAr: 'المرضى القلقون وطواقم الاستقبال الطبية',
    primaryBeneficiaryEn: 'Anxious Patients & Medical Front Desk Staff',
    engineeringPhilosophyAr: 'الرعاية تبدأ بالوضوح والاطمئنان والخصوصية المشفرة',
    engineeringPhilosophyEn: 'Care begins with clarity, empathy, and encrypted privacy',
    humanFrictionAr:
      'مريض قلق ينتظر في ردهة العيادة دون وضوح، وموظفة استقبال تتلقى مئات الاتصالات اليدوية يوميًا لتأكيد الحضور، مع نسبة إلغاء مفاجئ تصل إلى 35% وتشتت السجلات الطبية الورقية بين ثلاثة فروع مختلفة.',
    humanFrictionEn:
      'Anxious patients waiting in crowded lobbies while receptionists endure hundreds of repetitive reminder phone calls daily, facing a 35% no-show rate and fragmented paper charts.',
    humanResolutionAr:
      'نظام حجز فائق السرعة عبر الواتساب والجوال مع دفع عربون جدية، وتذكير لطيف تلقائي بالموعد والفرع قبل 24 ساعة، مع سجل طبي سحابي مشفر يظهر أمام الطبيب بمجرد دخول المريض في أي فرع لتوفير وقت الاستماع والتشخيص.',
    humanResolutionEn:
      'Sub-second booking with gentle automated WhatsApp reminders, deposit locks, and an encrypted digital patient record accessible across all clinic branches in real-time.',
    architectNoteAr:
      'الرعاية الصحية تبدأ من لحظة شعور المريض بالاهتمام والوضوح قبل أن تطأ قدماه العيادة. استبدلنا الاتصالات اليدوية المزعجة بتذكير لطيف ومؤتمت عبر الواتساب يمنح المريض تفاصيل موعده وطبيبه باطمئنان، وجعلنا السجل الطبي متاحًا بلمسة واحدة أمام الطبيب في أي فرع، لنمنح الطبيب وقتًا أطول للاستماع الإنساني لمريضه.',
    architectNoteEn:
      'Healthcare begins the moment a patient seeks clarity and reassurance. We replaced stressful phone tag with empathetic WhatsApp reminders and gave doctors instant, encrypted access to patient histories across branches—giving physicians more face-to-face time to listen and heal.',
  },
  'nexus-logistics': {
    primaryBeneficiaryAr: 'سائقو الشاحنات الميدانيون والعميل المنتظر',
    primaryBeneficiaryEn: 'Field Logistics Drivers & Awaiting End Customers',
    engineeringPhilosophyAr: 'حماية تركيز السائق على الطريق وإنهاء قلق الانتظار',
    engineeringPhilosophyEn: 'Protecting driver road focus while eliminating delivery anxiety',
    humanFrictionAr:
      'سائق شاحنة يقود لساعات في الزحام تحت وابل من الاتصالات المتكررة على هاتفه من الإدارة والعملاء: "أين أنت؟ متى تصل؟"، وعميل ينتظر بقلق في منزله، ومدير حركة يوزع الشحنات بحدس يدوي غير دقيق.',
    humanFrictionEn:
      'Drivers navigating congested routes under constant distracting phone calls from dispatchers and anxious customers, while dispatchers guess vehicle locations with zero live telemetry.',
    humanResolutionAr:
      'تطبيق سائق خفيف ومبسط بأزرار كبيرة وخريطة مسار مخصصة تعمل حتى مع انقطاع الشبكة المؤقت، مع رابط تتبع مباشر للعميل برقم الشحنة على خريطة حية لتفادي أي اتصالات، وتوزيع ذكي مؤتمت للمسارات.',
    humanResolutionEn:
      'A one-thumb driver app functioning through offline drops, paired with customer live map tracking links that automatically eliminated inbound "Where is my order?" calls.',
    architectNoteAr:
      'السائق على الطريق يحتاج إلى أدوات تضمن سلامته وتقلل تشتته، لا برمجيات معقدة تتطلب قراءة نصوص طويلة أثناء القيادة. صممنا واجهة السائق بأزرار واضحة تعمل بيد واحدة وتعمل حتى مع انقطاع الإنترنت المؤقت، مع منح العميل شاشة تتبع حية لإنهاء قلق الانتظار تمامًا دون إزعاج السائق.',
    architectNoteEn:
      'Drivers on the road need software that protects their safety and attention, not cluttered text fields. We built an offline-tolerant, one-thumb driver interface paired with live customer GPS tracking, completely removing the anxiety of the wait without distracting the driver.',
  },
};

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  lang,
  showHeader = true,
}) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeId, setActiveId] = useState<string>(CASE_STUDIES[0]?.id || 'black-spider');
  const [viewMode, setViewMode] = useState<'resolution' | 'friction'>('resolution');

  const activeCase = CASE_STUDIES.find((c) => c.id === activeId) || CASE_STUDIES[0];
  const activeHuman = HUMAN_PERSPECTIVES[activeCase.id] || HUMAN_PERSPECTIVES['black-spider'];

  const CardTitle = showHeader ? 'h3' : 'h2';

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background subtle architectural grid & ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                {t('كيف نتعامل مع المشاكل التشغيلية المعقدة.', 'How we engineer solutions for real operational hurdles.')}
              </h2>
            </div>

            <div className="shrink-0">
              <Link
                href={`/${language}/work`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group"
              >
                <span>{t('عرض جميع الأعمال المختارة', 'Explore All Selected Work')}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 text-blue-600" />
              </Link>
            </div>
          </div>
        )}

        {/* 1. Interactive Scenario Switcher Bar (3 Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CASE_STUDIES.map((cs, idx) => {
            const isActive = cs.id === activeId;
            return (
              <button
                key={cs.id}
                type="button"
                onClick={() => setActiveId(cs.id)}
                className={`p-4 rounded-2xl border text-right rtl:text-right ltr:text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                  isActive
                    ? 'bg-slate-900 border-[#38BDF8] text-white shadow-xl shadow-cyan-950/20 ring-1 ring-[#38BDF8]'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:border-cyan-300 hover:bg-slate-50/80 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md ${
                    isActive ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40' : 'bg-slate-100 text-slate-700'
                  }`}>
                    ARCH-0{idx + 1}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isActive ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-50 text-slate-500 border border-slate-200'
                  }`}>
                    {cs.caseStudyTypeLabel[isRtl ? 'ar' : 'en']}
                  </span>
                </div>

                <div>
                  <h3 className={`text-sm sm:text-base font-bold font-display leading-snug line-clamp-1 ${
                    isActive ? 'text-[#38BDF8]' : 'text-slate-900'
                  }`}>
                    {cs.client}
                  </h3>
                  <p className={`text-xs mt-0.5 font-arabic truncate ${
                    isActive ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {cs.industry[isRtl ? 'ar' : 'en']}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100/10 flex items-center justify-between text-[11px]">
                  <span className={`font-mono flex items-center gap-1.5 ${
                    isActive ? 'text-cyan-300' : 'text-cyan-700'
                  }`}>
                    <Zap className="w-3 h-3" />
                    <span>{t(cs.metrics[0]?.value + ' ' + cs.metrics[0]?.label[isRtl ? 'ar' : 'en'], cs.metrics[0]?.value + ' ' + cs.metrics[0]?.label.en)}</span>
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. Interactive Showcase Card with Human Touch & Architectural Depth */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-slate-200/90 bg-white shadow-[0_12px_40px_-10px_rgba(15,23,42,0.08)] overflow-hidden"
          >
            {/* Top Interactive Status & Perspective Switcher Bar */}
            <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center gap-3 text-right rtl:text-right ltr:text-left w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-[#38BDF8] shrink-0">
                  <UserCheck className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">
                    {t('المستفيد الميداني الأول من الحل:', 'Primary Frontline Beneficiary:')}
                  </div>
                  <div className="text-sm font-bold text-[#38BDF8] font-display">
                    {t(activeHuman.primaryBeneficiaryAr, activeHuman.primaryBeneficiaryEn)}
                  </div>
                </div>
              </div>

              {/* View Toggle: Human Friction vs Architecture Resolution */}
              <div className="inline-flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode('friction')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'friction'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t('المعاناة والضغط السابق', 'Operational Friction')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('resolution')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'resolution'
                      ? 'bg-slate-900 border border-[#38BDF8] text-[#38BDF8] shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span className={viewMode === 'resolution' ? 'text-[#38BDF8]' : ''}>
                    {t('الحل المعماري وراحة العمليات', 'Engineering Resolution')}
                  </span>
                </button>
              </div>
            </div>

            {/* Core Showcase Body */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-8 text-right rtl:text-right ltr:text-left">
              
              {/* Dynamic State Banner: Friction vs Resolution */}
              <AnimatePresence mode="wait">
                {viewMode === 'friction' ? (
                  <motion.div
                    key="friction-box"
                    initial={{ opacity: 0, x: isRtl ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 10 : -10 }}
                    transition={{ duration: 0.15 }}
                    className="p-5 sm:p-6 rounded-2xl bg-rose-50/80 border border-rose-200/90 text-rose-950 space-y-2.5 font-arabic"
                  >
                    <div className="flex items-center gap-2 text-rose-800 font-bold text-sm font-display">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{t('الواقع اليومي قبل التدخل الهندسي لنوڤيكسا:', 'The Frontline Reality Before Novixa:')}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-medium">
                      {t(activeHuman.humanFrictionAr, activeHuman.humanFrictionEn)}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="resolution-box"
                    initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? -10 : 10 }}
                    transition={{ duration: 0.15 }}
                    className="p-5 sm:p-6 rounded-2xl bg-cyan-50/80 border border-cyan-200/90 text-cyan-950 space-y-2.5 font-arabic"
                  >
                    <div className="flex items-center gap-2 text-cyan-900 font-bold text-sm font-display">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span>{t('راحة العمليات بعد بناء المنظومة البرمجية الموحدة:', 'Frontline Peace of Mind After Novixa Software:')}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {t(activeHuman.humanResolutionAr, activeHuman.humanResolutionEn)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Title & Core Scope */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{t(activeHuman.engineeringPhilosophyAr, activeHuman.engineeringPhilosophyEn)}</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 font-display leading-snug">
                  {t(activeCase.title.ar, activeCase.title.en)}
                </CardTitle>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-arabic">
                  {t(activeCase.solution.ar, activeCase.solution.en)}
                </p>
              </div>

              {/* High-Fidelity System Interface Mockup Image */}
              {CASE_STUDY_IMAGES[activeCase.id] && (
                <div className="rounded-2xl p-2.5 sm:p-4 bg-slate-950 border border-slate-800 shadow-xl overflow-hidden group">
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800/80 px-2 flex-wrap gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse" />
                      <span className="text-slate-200 font-bold">
                        {t(CASE_STUDY_IMAGES[activeCase.id].badgeAr, CASE_STUDY_IMAGES[activeCase.id].badgeEn)}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#38BDF8] bg-cyan-950/80 border border-cyan-800 px-2.5 py-0.5 rounded font-bold">
                      Live Operations Mockup
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-slate-800/90 bg-[#060D1A]">
                    <Image
                      src={CASE_STUDY_IMAGES[activeCase.id].src}
                      alt={t(CASE_STUDY_IMAGES[activeCase.id].altAr, CASE_STUDY_IMAGES[activeCase.id].altEn)}
                      width={960}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                </div>
              )}

              {/* The Human Touch: Architect's Field Note Callout */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-950 text-white border border-slate-800 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 end-0 p-4 opacity-10 pointer-events-none">
                  <Quote className="w-20 h-20 text-cyan-400" />
                </div>
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8]">
                      <Terminal className="w-4 h-4 text-[#38BDF8]" />
                      <span>{t('ملاحظة المهندس المعماري الميدانية (Architect’s Field Note)', 'Lead Architect’s Field Note')}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                      Human-Centric Engineering
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed italic">
                    {t('«', '"')}
                    {t(activeHuman.architectNoteAr, activeHuman.architectNoteEn)}
                    {t('»', '"')}
                  </p>
                </div>
              </div>

              {/* 2 Columns: Features Implemented & Modeled Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
                
                {/* Left 7 Cols: Features checklist */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs font-mono text-slate-900 font-bold uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                    <span>{t('الميزات المعمارية والتشغيلية المنجزة:', 'Operational Capabilities Delivered:')}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 font-arabic">
                    {activeCase.features[isRtl ? 'ar' : 'en'].map((feat, fIdx) => (
                      <div key={fIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 5 Cols: Modeled metrics + Tech Stack */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono text-slate-900 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-600" />
                    <span>{t('الأثر المقاس على العمليات والعملاء:', 'Operational Impact Metrics:')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {activeCase.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-md text-center">
                        <div className="text-xl sm:text-2xl font-extrabold font-display text-[#38BDF8]">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-slate-300 font-arabic truncate mt-1 font-medium">
                          {m.label[isRtl ? 'ar' : 'en']}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack pills */}
                  <div className="pt-2">
                    <div className="text-[11px] font-mono text-slate-500 mb-1.5 font-medium">
                      {t('البنية التقنية الخالية من الديون:', 'Engineered Tech Stack:')}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCase.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Action Footer of the Showcase */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Layers className="w-4 h-4 text-cyan-600" />
                  <span>{t('الموقع والنطاق:', 'Scope & Location:')}</span>
                  <span className="text-slate-900 font-bold">{activeCase.location[isRtl ? 'ar' : 'en']}</span>
                </div>

                <Link
                  href={`/${language}/work/${activeCase.id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-xs sm:text-sm font-bold text-[#38BDF8] transition-all cursor-pointer shadow-md shadow-cyan-950/20"
                >
                  <span className="text-[#38BDF8]">{t('عرض التفاصيل المعمارية الكاملة', 'View Full Architecture Specifications')}</span>
                  <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
                </Link>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
