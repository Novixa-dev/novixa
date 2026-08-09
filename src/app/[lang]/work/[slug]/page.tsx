import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWorkBySlug, caseStudiesCatalog } from '@/lib/content';
import { constructMetadata } from '@/lib/metadata';
import { CheckCircle2, ArrowLeft, ArrowRight, Quote, Briefcase } from 'lucide-react';
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

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-right rtl:text-right ltr:text-left">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href={`/${lang}`} className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href={`/${lang}/work`} className="hover:text-white">Work</Link>
          <span>/</span>
          <span className="text-teal-400">{workItem.title[isAr ? 'ar' : 'en']}</span>
        </div>

        {/* Article/Detail Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 bg-slate-900/90 shadow-2xl space-y-8">
          <div className="space-y-4 border-b border-slate-800 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-950 text-blue-300 border border-blue-800">
                {workItem.industry[isAr ? 'ar' : 'en']}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-950 text-teal-300 border border-teal-800">
                {workItem.caseStudyTypeLabel[isAr ? 'ar' : 'en']}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              {workItem.title[isAr ? 'ar' : 'en']}
            </h1>

            <div className="text-xs font-mono text-slate-400">
              Location: {workItem.location[isAr ? 'ar' : 'en']}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {workItem.metrics.map((m, i) => (
              <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-2xl font-bold font-display text-teal-400">{m.value}</div>
                <div className="text-xs text-slate-300 font-arabic">{m.label[isAr ? 'ar' : 'en']}</div>
              </div>
            ))}
          </div>

          {/* Body Sections */}
          <div className="space-y-6 text-sm text-slate-200 font-arabic leading-relaxed">
            <div>
              <h3 className="text-base font-bold text-white font-display mb-2">{isAr ? 'التحدي التشغيلي والمعماري:' : 'Operational & Architecture Challenge:'}</h3>
              <p>{workItem.challenge[isAr ? 'ar' : 'en']}</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-display mb-2">{isAr ? 'الاستراتيجية البرمجية:' : 'Engineering Strategy:'}</h3>
              <p>{workItem.strategy[isAr ? 'ar' : 'en']}</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-display mb-2">{isAr ? 'الميزات والحلول المنفذة:' : 'Delivered Architectural Features:'}</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-arabic">
                {workItem.features[isAr ? 'ar' : 'en'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {workItem.quote && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-blue-900/50 space-y-2">
                <Quote className="w-6 h-6 text-blue-400 opacity-60" />
                <p className="italic text-slate-100">{workItem.quote.text[isAr ? 'ar' : 'en']}</p>
                <div className="text-xs text-blue-400 font-bold font-mono">
                  — {workItem.quote.author} ({workItem.quote.role[isAr ? 'ar' : 'en']})
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
            <Link
              href={`/${lang}/start-project`}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
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
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لجميع الأعمال' : 'Back to Selected Work'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
