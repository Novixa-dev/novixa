import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWorkBySlug, caseStudiesCatalog } from '@/lib/content';
import { constructMetadata, generateBreadcrumbJsonLd } from '@/lib/metadata';
import { CheckCircle2, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Language } from '@/types';

export function generateStaticParams() {
  const languages = ['ar', 'en'];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of languages) {
    for (const cs of caseStudiesCatalog) {
      params.push({ lang, slug: cs.id });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: paramLang, slug } = await params;
  const workItem = getWorkBySlug(slug);
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  if (!workItem) {
    return constructMetadata({ title: 'Work Not Found', description: '', lang, path: `work/${slug}` });
  }

  const title = workItem.title[isAr ? 'ar' : 'en'];
  const desc = workItem.challenge[isAr ? 'ar' : 'en'];

  return constructMetadata({
    title: `${title} | ${isAr ? 'أعمال نوڤيكسا' : 'Novixa Selected Work'}`,
    description: desc,
    lang,
    path: `work/${slug}`,
  });
}

export default async function WorkDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: paramLang, slug } = await params;
  const workItem = getWorkBySlug(slug);
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  if (!workItem) {
    notFound();
  }

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'أعمالنا المختارة' : 'Selected Work', url: `/${lang}/work` },
    { name: workItem.title[isAr ? 'ar' : 'en'], url: `/${lang}/work/${workItem.id}` },
  ]);

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-right rtl:text-right ltr:text-left">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href={`/${lang}`} className="hover:text-slate-900 transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href={`/${lang}/work`} className="hover:text-slate-900 transition-colors">{isAr ? 'أعمالنا' : 'Work'}</Link>
          <span>/</span>
          <span className="text-cyan-800 font-semibold">{workItem.title[isAr ? 'ar' : 'en']}</span>
        </div>

        {/* Article/Detail Card */}
        <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] space-y-8">
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {workItem.title[isAr ? 'ar' : 'en']}
            </h1>

            <div className="text-xs font-mono text-slate-500">
              Location: {workItem.location[isAr ? 'ar' : 'en']}
            </div>
          </div>

          {/* Metrics */}
          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wide font-semibold">
            {isAr
              ? 'أرقام توضيحية تصف السيناريو المعماري، وليست نتائج عميل مقاسة'
              : 'Modelled figures describing the architectural scenario — not measured client results'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {workItem.metrics.map((m, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-2xl font-bold font-display text-cyan-600">{m.value}</div>
                <div className="text-xs text-slate-600 font-arabic">{m.label[isAr ? 'ar' : 'en']}</div>
              </div>
            ))}
          </div>

          {/* Body Sections */}
          <div className="space-y-6 text-sm text-slate-600 font-arabic leading-relaxed">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display mb-2">{isAr ? 'التحدي التشغيلي والمعماري:' : 'Operational & Architecture Challenge:'}</h2>
              <p>{workItem.challenge[isAr ? 'ar' : 'en']}</p>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 font-display mb-2">{isAr ? 'الاستراتيجية البرمجية:' : 'Engineering Strategy:'}</h2>
              <p>{workItem.strategy[isAr ? 'ar' : 'en']}</p>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 font-display mb-2">{isAr ? 'الميزات والحلول المنفذة:' : 'Delivered Architectural Features:'}</h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-arabic">
                {workItem.features[isAr ? 'ar' : 'en'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {workItem.quote && (
              <div className="p-5 rounded-2xl bg-cyan-50/60 border border-cyan-200/80 space-y-2">
                <Quote className="w-6 h-6 text-cyan-600 opacity-60" />
                <p className="italic text-slate-800">{workItem.quote.text[isAr ? 'ar' : 'en']}</p>
                <div className="text-xs text-cyan-800 font-bold font-mono">
                  — {workItem.quote.author} ({workItem.quote.role[isAr ? 'ar' : 'en']})
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <Link
              href={`/${lang}/start-project`}
              className="px-6 py-3 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-[#38BDF8]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isAr ? 'طلب بناء نظام مشابه' : 'Build Similar System'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href={`/${lang}/work`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-cyan-700 transition-colors"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لجميع الأعمال' : 'Back to Selected Work'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
