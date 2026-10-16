import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReadySolutionBySlug, readySolutionsCatalog } from '@/lib/content';
import {
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateServiceJsonLd,
} from '@/lib/metadata';
import { resolveIcon } from '@/lib/icon-map';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
  Users,
} from 'lucide-react';
import { Language } from '@/types';

export function generateStaticParams() {
  return ['ar', 'en'].flatMap((lang) =>
    readySolutionsCatalog.map((solution) => ({ lang, slug: solution.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: paramLang, slug } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const solution = getReadySolutionBySlug(slug);

  if (!solution) {
    return constructMetadata({
      title: isAr ? 'الحل غير موجود' : 'Solution Not Found',
      description: '',
      lang,
      path: `solutions/${slug}`,
    });
  }

  const locale = isAr ? 'ar' : 'en';
  return constructMetadata({
    title: `${solution.name[locale]} | ${isAr ? 'الحلول الجاهزة' : 'Ready Solutions'}`,
    description: `${solution.solutionSummary[locale]} ${solution.deliveryTimelineBadge[locale]}`,
    lang,
    path: `solutions/${solution.slug}`,
    eyebrow: solution.category[locale],
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: paramLang, slug } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const solution = getReadySolutionBySlug(slug);

  if (!solution) notFound();

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const Icon = resolveIcon(solution.iconName);
  const locale = isAr ? 'ar' : 'en';

  const serviceJsonLd = generateServiceJsonLd({
    name: solution.name[locale],
    description: solution.solutionSummary[locale],
    serviceType: solution.category.en,
    url: `/${lang}/solutions/${solution.slug}`,
    lang,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'الحلول الجاهزة' : 'Ready Solutions', url: `/${lang}/solutions` },
    { name: solution.name[locale], url: `/${lang}/solutions/${solution.slug}` },
  ]);

  const related = readySolutionsCatalog.filter((s) => s.id !== solution.id).slice(0, 3);

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-right rtl:text-right ltr:text-left">
        <nav aria-label={isAr ? 'مسار التنقل' : 'Breadcrumb'}>
          <ol className="flex items-center gap-2 text-xs text-slate-500 font-mono flex-wrap">
            <li>
              <Link href={`/${lang}`} className="hover:text-slate-900 transition-colors">
                {isAr ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/${lang}/solutions`} className="hover:text-slate-900 transition-colors">
                {isAr ? 'الحلول الجاهزة' : 'Solutions'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-cyan-800 font-semibold">{solution.name[locale]}</li>
          </ol>
        </nav>

        <article className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] space-y-8">
          <header className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-2 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold">
                    {solution.category[locale]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-semibold">
                    <Clock className="w-3 h-3 text-cyan-600" />
                    {solution.deliveryTimelineBadge[locale]}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                  {solution.name[locale]}
                </h1>
                <p className="text-sm text-cyan-700 font-arabic font-medium">
                  {solution.tagline[locale]}
                </p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <section className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
              <h2 className="flex items-center gap-2 font-mono text-rose-700 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                {isAr ? 'المشكلة التي يحلها' : 'The problem it solves'}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-arabic">
                {solution.problem[locale]}
              </p>
            </section>

            <section className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h2 className="flex items-center gap-2 font-mono text-cyan-800 font-bold text-xs uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                {isAr ? 'لمن هذا النظام' : 'Who it is for'}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-arabic">
                {solution.targetAudience[locale]}
              </p>
            </section>
          </div>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
              {isAr ? 'كيف يعمل النظام' : 'How the system works'}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-arabic">
              {solution.solutionSummary[locale]}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
              {isAr ? 'الميزات المتضمنة' : 'What is included'}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-600 font-arabic">
              {solution.features[locale].map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {solution.packages && solution.packages.length > 0 && (
            <section className="space-y-4 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
                  {isAr ? 'باقات التهيئة والإطلاق' : 'Configuration tiers'}
                </h2>
                <p className="text-xs text-slate-500 font-arabic">
                  {isAr
                    ? 'الباقات تصف نطاق التهيئة والتسليم. السعر النهائي يُحدد بعد جلسة نطاق قصيرة.'
                    : 'Tiers describe delivery scope. The final figure is agreed after a short scoping session.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {solution.packages.map((tier) => (
                  <div
                    key={tier.id}
                    className={`rounded-2xl p-5 space-y-3 border transition-all ${
                      tier.isPopular
                        ? 'border-cyan-500/60 bg-cyan-50/30 shadow-sm ring-1 ring-cyan-500/20'
                        : 'border-slate-200/90 bg-white shadow-xs'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-slate-900 font-display">
                          {tier.name[locale]}
                        </h3>
                        {tier.isPopular && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#38BDF8] text-slate-950 text-[10px] font-bold shadow-xs">
                            <Star className="w-2.5 h-2.5" />
                            {isAr ? 'الأكثر طلباً' : 'Most chosen'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-arabic">
                        {tier.tagline[locale]}
                      </p>
                      <p className="text-[11px] font-mono text-cyan-700 font-semibold">{tier.priceBadge[locale]}</p>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-600 font-arabic border-t border-slate-100 pt-3">
                      {tier.features[locale].map((feature, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 font-arabic">
                      <span className="text-slate-800 font-semibold">
                        {isAr ? 'مناسبة لـ: ' : 'Suits: '}
                      </span>
                      {tier.idealFor[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="p-5 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 space-y-2">
            <h2 className="font-mono text-cyan-800 font-bold text-xs uppercase tracking-wider">
              {isAr ? 'الأثر التشغيلي المتوقع' : 'Expected operational impact'}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-arabic">
              {solution.businessImpact[locale]}
            </p>
          </section>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
            <Link
              href={`/${lang}/start-project?solution=${solution.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-sm shadow-md shadow-[#38BDF8]/20 transition-all cursor-pointer"
            >
              <span>{isAr ? 'اطلب تهيئة هذا النظام' : 'Request this system'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href={`/${lang}/dashboard`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm transition-colors cursor-pointer"
            >
              <span>{isAr ? 'شاهد لوحة التشغيل' : 'See the console'}</span>
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
              {isAr ? 'حلول جاهزة أخرى' : 'Other ready solutions'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((item) => {
                const RelatedIcon = resolveIcon(item.iconName);
                return (
                  <Link
                    key={item.id}
                    href={`/${lang}/solutions/${item.slug}`}
                    className="rounded-2xl p-5 border border-slate-200/90 bg-white shadow-xs hover:shadow-md hover:border-cyan-500/40 space-y-2.5 group transition-all"
                  >
                    <RelatedIcon className="w-4 h-4 text-cyan-600" />
                    <h3 className="text-sm font-bold text-slate-900 font-display leading-snug group-hover:text-cyan-700 transition-colors">
                      {item.name[locale]}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {item.tagline[locale]}
                    </p>
                    <p className="text-[11px] font-mono text-cyan-700 font-semibold">
                      {item.deliveryDays[locale]}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
