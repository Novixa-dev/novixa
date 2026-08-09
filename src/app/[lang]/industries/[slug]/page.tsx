import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, industriesCatalog } from '@/lib/content';
import { constructMetadata } from '@/lib/metadata';
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Building } from 'lucide-react';
import { Language } from '@/types';

export function generateStaticParams() {
  const languages = ['ar', 'en'];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of languages) {
    for (const ind of industriesCatalog) {
      params.push({ lang, slug: ind.id });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: paramLang, slug } = await params;
  const industry = getIndustryBySlug(slug);
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  if (!industry) {
    return constructMetadata({ title: 'Industry Not Found', description: '', lang, path: `industries/${slug}` });
  }

  const name = industry.name[isAr ? 'ar' : 'en'];
  const desc = industry.description[isAr ? 'ar' : 'en'];

  return constructMetadata({
    title: `${name} | ${isAr ? 'قطاعات نوڤيكسا' : 'Novixa Industries'}`,
    description: desc,
    lang,
    path: `industries/${slug}`,
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: paramLang, slug } = await params;
  const industry = getIndustryBySlug(slug);
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  if (!industry) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-right rtl:text-right ltr:text-left">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href={`/${lang}`} className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href={`/${lang}/industries`} className="hover:text-white">Industries</Link>
          <span>/</span>
          <span className="text-teal-400">{industry.name[isAr ? 'ar' : 'en']}</span>
        </div>

        {/* Industry Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 bg-slate-900/90 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">
                <Building className="w-3.5 h-3.5" />
                <span>{isAr ? 'حلول القطاع المخصصة' : 'Domain Solution'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                {industry.name[isAr ? 'ar' : 'en']}
              </h1>
            </div>

            <Link
              href={`/${lang}/start-project`}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center gap-2"
            >
              <span>{isAr ? 'تخصيص حل لقطاعك' : 'Build for Your Industry'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-arabic">
            {industry.description[isAr ? 'ar' : 'en']}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-slate-950 border border-rose-950 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
                <AlertCircle className="w-4 h-4" />
                <span>{isAr ? 'التحديات التشغيلية:' : 'Industry Challenges:'}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {industry.challenges[isAr ? 'ar' : 'en'].map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-teal-950 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'أنظمة نوڤيكسا المقدمة:' : 'Novixa Modules:'}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {industry.solutions[isAr ? 'ar' : 'en'].map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href={`/${lang}/industries`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لجميع القطاعات' : 'Back to All Industries'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
