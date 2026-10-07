import React from 'react';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbJsonLd } from '@/lib/metadata';
import { DashboardConsole } from '@/components/dashboard/DashboardConsole';
import { LayoutDashboard } from 'lucide-react';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr
      ? 'لوحة التشغيل التفاعلية — عرض حي لمنتجات نوڤيكسا'
      : 'Interactive Operations Console — A Live Look at Novixa Products',
    description: isAr
      ? 'تصفّح لوحة التشغيل التي تُسلَّم مع منتجات نوڤيكسا: المطاعم، الحجوزات، العقارات، ونبض المؤسسة. مؤشرات حية، رسوم بيانية، وسجل عمليات — ببيانات توضيحية.'
      : 'Explore the operations console shipped with Novixa products — restaurants, bookings, property and workforce pulse. Live KPIs, charts and an operations feed, shown with illustrative data.',
    lang,
    path: 'dashboard',
    eyebrow: isAr ? 'عرض تفاعلي' : 'Interactive demo',
  });
}

export default async function DashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'لوحة التشغيل' : 'Operations Console', url: `/${lang}/dashboard` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="pt-32 pb-24 bg-slate-950 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <header className="max-w-3xl space-y-4 text-right rtl:text-right ltr:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAr ? 'لوحة التشغيل التفاعلية' : 'Interactive Operations Console'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white leading-snug">
              {isAr
                ? 'اللوحة التي يفتحها مديرك كل صباح.'
                : 'The console your manager opens every morning.'}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
              {isAr
                ? 'كل منتج من منتجات نوڤيكسا يُسلَّم مع لوحة تشغيل، لا مع تقارير تُصدَّر يدوياً. بدّل بين الوحدات الأربع أدناه لترى ما يراه المشغّل فعلياً: المؤشرات، الاتجاه اليومي، التوزيع، وسجل العمليات اللحظي.'
                : 'Every Novixa product ships with an operations console, not a report you export by hand. Switch between the four modules below to see what an operator actually sees: the indicators, the daily trend, the split, and the live operations feed.'}
            </p>
          </header>

          <DashboardConsole />

          <footer className="pt-6 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed text-right rtl:text-right ltr:text-left">
              {isAr
                ? 'تريد لوحة مبنية على بيانات نظامك أنت؟ نبدأ بجلسة نطاق قصيرة نحدد فيها المؤشرات التي تهم فعلاً في تشغيلك.'
                : 'Want a console built on your own system’s data? We start with a short scoping session to agree which indicators actually matter in your operation.'}
            </p>
            <Link
              href={`/${lang}/start-project`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-colors"
            >
              {isAr ? 'ابدأ جلسة النطاق' : 'Start a scoping session'}
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}
