import React from 'react';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { FounderSection } from '../sections/FounderSection';
import {
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

export const AboutView = ({ lang }: { lang: Language }) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const values = [
    {
      titleAr: 'الإتقان والحرَفية (Craft)',
      titleEn: 'Craft & Precision',
      descAr: 'نصمم ونكتب البرمجيات بعناية فائقة، بدءاً من سرعة الاستجابة وحتى جودة خطوط الكود.',
      descEn: 'Obsessive attention to UI polish, clean architecture, and sub-second performance.',
    },
    {
      titleAr: 'الوضوح والشفافية (Clarity)',
      titleEn: 'Clarity & Honesty',
      descAr: 'تواصل مباشر وصريح دون مصطلحات هلامية أو وعود تسويقية غير واقعية.',
      descEn: 'Transparent updates, weekly demos, and honest engineering consultations.',
    },
    {
      titleAr: 'روح الملكية (Ownership)',
      titleEn: 'Product Ownership',
      descAr: 'نتعامل مع مشروعك كأصل تقني دائم؛ نهتم بالأرباح وسلاسة العمليات للمستخدمين.',
      descEn: 'We treat your product as our own asset, prioritizing real business outcomes.',
    },
    {
      titleAr: 'الاستدامة والاعتمادية (Reliability)',
      titleEn: 'High Reliability',
      descAr: 'أنظمتنا مصممة لتعمل باستقرار تام دون توقف مفاجئ في أوقات الذروة مع حماية أمنية مشددة.',
      descEn: 'Zero-downtime architecture built to handle peak traffic and high concurrency.',
    },
    {
      titleAr: 'التطوير المستمر (Continuous SLA)',
      titleEn: 'Continuous Improvement',
      descAr: 'نرافق نمو أعمالك بالصيانة، اتفاقيات مستوى الخدمة (SLA)، والتحديثات الدورية بعد الإطلاق.',
      descEn: 'Active SLAs, daily backups, and continuous enhancements matching your evolving strategy.',
    },
  ];

  const growthStages = [
    { number: '01', titleAr: 'حلول العملاء (Client Solutions)', titleEn: 'Client Solutions', descAr: 'فهم عميق للاحتياجات وحل المشكلات التشغيلية المعقدة بأكواد نظيفة.', descEn: 'Solving real-world business bottlenecks with bespoke architectures.' },
    { number: '02', titleAr: 'بناء القدرات القابلة لإعادة الاستخدام', titleEn: 'Reusable Capabilities', descAr: 'استخلاص محركات برمجية معيارية للفوترة والحجوزات والمخزون.', descEn: 'Extracting modular engines for billing, inventory, and scheduling.' },
    { number: '03', titleAr: 'الحلول البرمجية الجاهزة للتخصيص', titleEn: 'Productized Solutions', descAr: 'توفير قواعد برمجية سريعة الإطلاق (5-14 يوماً) توفر تكلفة التطوير.', descEn: 'Turnkey foundations deployed in 5–14 days saving time & capital.' },
    { number: '04', titleAr: 'المنتجات والمنصات الملكية', titleEn: 'Proprietary Products', descAr: 'بناء منتجات سحابية مستقلة مثل Novixa Aqar وNovixa Pulse.', descEn: 'Engineering independent SaaS engines with high domain value.' },
    { number: '05', titleAr: 'منصات SaaS السحابية متعددة المشتركين', titleEn: 'Scalable Cloud SaaS', descAr: 'التوسع بنماذج الاشتراكات الشهرية والبنية التحتية العالمية.', descEn: 'Scaling multi-tenant architectures across recurring revenue models.' },
    { number: '06', titleAr: 'التوسع الإقليمي والعالمي (GCC & Global)', titleEn: 'GCC & Global Reach', descAr: 'خدمة أسواق اليمن والسعودية والخليج والتوسع عالمياً.', descEn: 'Serving Yemen, Saudi Arabia, GCC, and global Arab enterprises.' },
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen space-y-16 relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
            <span>{t('عن نوڤيكسا ومسار النمو', 'About Novixa & Methodology')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('شركة هندسة برمجيات ومنتجات رقمية تصنع الفارق.', 'A software engineering company built for real business impact.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {t(
              'نوڤيكسا ليست وكالة تصميم عامة ولا متجر قوالب. نحن شركة هندسة برمجيات تجمع بين البرمجيات المخصصة، والحلول الجاهزة سريعة الإطلاق، والنشر السحابي المدار لدعم نمو الأعمال في اليمن والخليج والمنطقة.',
              'Novixa is a software engineering and digital products firm. We bridge the gap between custom bespoke software, productized turnkey solutions, and managed cloud infrastructure for ambitious companies across Yemen, the GCC, and beyond.'
            )}
          </p>
        </div>

        {/* Growth Sequence Roadmap */}
        <div className="space-y-6">
          <div className="text-right rtl:text-right ltr:text-left space-y-2">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
              {t('خارطة ومنهجية النمو المؤسسي', 'Novixa Strategic Growth Sequence')}
            </span>
            <h2 className="text-2xl font-bold font-display text-white">
              {t('مسار بناء القيمة وتطوير القدرات الهندسية:', 'Our Capability Progression Framework:')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-right rtl:text-right ltr:text-left">
            {growthStages.map((stg, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/60 space-y-3 relative group hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center font-bold text-xs font-mono">
                    {stg.number}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">STAGE {stg.number}</span>
                </div>
                <h3 className="text-base font-bold font-display text-white">{t(stg.titleAr, stg.titleEn)}</h3>
                <p className="text-xs text-slate-300 font-arabic leading-relaxed">{t(stg.descAr, stg.descEn)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founding Philosophy & Quote Section */}
        <FounderSection lang={lang} />

        {/* Core Values Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-display text-white text-right rtl:text-right ltr:text-left">
            {t('قيمنا الهندسية الراسخة:', 'Our Core Engineering Values:')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-right rtl:text-right ltr:text-left">
            {values.map((v, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center font-bold text-xs font-mono">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold font-display text-white">{t(v.titleAr, v.titleEn)}</h3>
                <p className="text-xs text-slate-300 font-arabic leading-relaxed">{t(v.descAr, v.descEn)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Focus & Data Sovereignty */}
        <div className="glass-card rounded-3xl p-8 border border-slate-800/80 bg-slate-900/60 space-y-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-2">
            <span className="text-xs font-mono text-teal-400 uppercase block tracking-wider">
              {t('الحوكمة والأمان وسيادة البيانات', 'Governance & Data Sovereignty')}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              {t('كيف نتعامل مع الأمان وملكية البيانات لشركائنا في اليمن والخليج؟', 'How we approach security and data ownership for our regional partners')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-white block">
                {t('استضافة نختارها معك', 'Hosting chosen with you')}
              </span>
              <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                {t('نحدد مع العميل مكان الاستضافة ونوثّق أين تُخزَّن بياناته.', 'We choose the hosting location with the client and document where their data is stored.')}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-white block">
                {t('حماية الملكية الفكرية (NDA)', 'Mutual NDA & Code IP')}
              </span>
              <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                {t('اتفاقيات عدم إفصاح صارمة وضمان التملّك الحصري للأصل البرمجي والشيفرة وقواعد البيانات لشركتك.', 'Binding NDAs ensuring full ownership of software assets, schemas, and source code.')}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-white block">
                {t('اتصالات مشفّرة', 'Encrypted connections')}
              </span>
              <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                {t('نقدّم المواقع عبر HTTPS مع HSTS، ونبقي قاعدة البيانات خارج الإنترنت العام.', 'We serve sites over HTTPS with HSTS and keep the database off the public internet.')}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-white block">
                {t('الصيانة والدعم', 'Maintenance & support')}
              </span>
              <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                {t('عقود صيانة تشمل النسخ الاحتياطي والمتابعة والدعم الهندسي، وتُحدَّد شروطها مع كل عميل.', 'Maintenance contracts covering backups, follow-up and engineering support, with terms agreed per client.')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 text-center">
          <Link
            href={`/${language}/contact`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
          >
            <span>{t('ابدأ مشروعك مع نوڤيكسا', 'Start Your Project with Novixa')}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
