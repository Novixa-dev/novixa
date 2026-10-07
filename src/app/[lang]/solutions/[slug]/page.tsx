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
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none -z-10" />
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
          <ol className="flex items-center gap-2 text-xs text-slate-400 font-mono flex-wrap">
            <li>
              <Link href={`/${lang}`} className="hover:text-white transition-colors">
                {isAr ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/${lang}/solutions`} className="hover:text-white transition-colors">
                {isAr ? 'الحلول الجاهزة' : 'Solutions'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-blue-400">{solution.name[locale]}</li>
          </ol>
        </nav>

        <article className="glass-card rounded-3xl p-6 sm:p-10 border border-white/[0.08] bg-slate-900/90 shadow-2xl space-y-8">
          <header className="space-y-4 border-b border-slate-800 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-950/80 border border-teal-800/70 text-teal-400 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-2 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-teal-950 border border-teal-800 text-teal-300 text-xs font-mono">
                    {solution.category[locale]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono">
                    <Clock className="w-3 h-3" />
                    {solution.deliveryTimelineBadge[locale]}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-snug">
                  {solution.name[locale]}
                </h1>
                <p className="text-sm text-teal-300 font-arabic font-medium">
                  {solution.tagline[locale]}
                </p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <section className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <h2 className="flex items-center gap-2 font-mono text-rose-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                {isAr ? 'المشكلة التي يحلها' : 'The problem it solves'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-arabic">
                {solution.problem[locale]}
              </p>
            </section>

            <section className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h2 className="flex items-center gap-2 font-mono text-blue-400 font-bold text-xs uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                {isAr ? 'لمن هذا النظام' : 'Who it is for'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-arabic">
                {solution.targetAudience[locale]}
              </p>
            </section>
          </div>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              {isAr ? 'كيف يعمل النظام' : 'How the system works'}
            </h2>
            <p className="text-base text-slate-200 leading-relaxed font-arabic">
              {solution.solutionSummary[locale]}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              {isAr ? 'الميزات المتضمنة' : 'What is included'}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-300 font-arabic">
              {solution.features[locale].map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {solution.packages && solution.packages.length > 0 && (
            <section className="space-y-4 pt-2 border-t border-slate-800">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  {isAr ? 'باقات التهيئة والإطلاق' : 'Configuration tiers'}
                </h2>
                {/* Scope, not price. Novixa does not publish figures, so the
                    tiers describe what each includes and the conversation
                    settles the number. */}
                <p className="text-xs text-slate-400">
                  {isAr
                    ? 'الباقات تصف نطاق التهيئة والتسليم. السعر النهائي يُحدد بعد جلسة نطاق قصيرة.'
                    : 'Tiers describe delivery scope. The final figure is agreed after a short scoping session.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {solution.packages.map((tier) => (
                  <div
                    key={tier.id}
                    className={`rounded-2xl p-5 space-y-3 border ${
                      tier.isPopular
                        ? 'border-blue-500/60 bg-blue-950/20'
                        : 'border-white/[0.07] bg-slate-950'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-white font-display">
                          {tier.name[locale]}
                        </h3>
                        {tier.isPopular && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-semibold">
                            <Star className="w-2.5 h-2.5" />
                            {isAr ? 'الأكثر طلباً' : 'Most chosen'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {tier.tagline[locale]}
                      </p>
                      <p className="text-[11px] font-mono text-blue-300">{tier.priceBadge[locale]}</p>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-300 font-arabic border-t border-slate-800 pt-3">
                      {tier.features[locale].map((feature, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-2.5">
                      <span className="text-slate-300 font-semibold">
                        {isAr ? 'مناسبة لـ: ' : 'Suits: '}
                      </span>
                      {tier.idealFor[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="p-5 rounded-2xl bg-teal-950/20 border border-teal-900/40 space-y-2">
            <h2 className="font-mono text-teal-400 font-bold text-xs uppercase tracking-wider">
              {isAr ? 'الأثر التشغيلي المتوقع' : 'Expected operational impact'}
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed font-arabic">
              {solution.businessImpact[locale]}
            </p>
          </section>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800">
            <Link
              href={`/${lang}/start-project?solution=${solution.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-colors"
            >
              <span>{isAr ? 'اطلب تهيئة هذا النظام' : 'Request this system'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href={`/${lang}/dashboard`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/[0.08] bg-slate-900/70 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-colors"
            >
              <span>{isAr ? 'شاهد لوحة التشغيل' : 'See the console'}</span>
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              {isAr ? 'حلول جاهزة أخرى' : 'Other ready solutions'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((item) => {
                const RelatedIcon = resolveIcon(item.iconName);
                return (
                  <Link
                    key={item.id}
                    href={`/${lang}/solutions/${item.slug}`}
                    className="glass-card glass-card-hover rounded-2xl p-5 border border-white/[0.07] space-y-2.5"
                  >
                    <RelatedIcon className="w-4 h-4 text-teal-400" />
                    <h3 className="text-sm font-bold text-white font-display leading-snug">
                      {item.name[locale]}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {item.tagline[locale]}
                    </p>
                    <p className="text-[11px] font-mono text-blue-300">
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
