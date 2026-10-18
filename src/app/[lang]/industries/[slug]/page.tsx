import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, industriesCatalog } from '@/lib/content';
import { constructMetadata, generateBreadcrumbJsonLd } from '@/lib/metadata';
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
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

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'قطاعات الأعمال' : 'Industries', url: `/${lang}/industries` },
    { name: industry.name[isAr ? 'ar' : 'en'], url: `/${lang}/industries/${industry.id}` },
  ]);

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-right rtl:text-right ltr:text-left">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href={`/${lang}`} className="hover:text-slate-900 transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href={`/${lang}/industries`} className="hover:text-slate-900 transition-colors">{isAr ? 'القطاعات' : 'Industries'}</Link>
          <span>/</span>
          <span className="text-cyan-700 font-medium truncate">{industry.name[isAr ? 'ar' : 'en']}</span>
        </div>

        {/* Industry Card */}
        <div className="rounded-2xl p-6 sm:p-10 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                {industry.name[isAr ? 'ar' : 'en']}
              </h1>
            </div>

            <Link
              href={`/${lang}/start-project`}
              className="px-6 py-3 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-[#38BDF8]/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{isAr ? 'تخصيص حل لقطاعك' : 'Build for Your Industry'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-arabic">
            {industry.description[isAr ? 'ar' : 'en']}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider font-mono">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>{isAr ? 'التحديات التشغيلية:' : 'Industry Challenges:'}</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {industry.challenges[isAr ? 'ar' : 'en'].map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-cyan-50/50 border border-cyan-200/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-800 font-bold text-xs uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                <span>{isAr ? 'أنظمة نوڤيكسا المقدمة:' : 'Novixa Modules:'}</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {industry.solutions[isAr ? 'ar' : 'en'].map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-2">
          <Link
            href={`/${lang}/industries`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لجميع القطاعات' : 'Back to All Industries'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
