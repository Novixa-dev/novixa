import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getServiceBySlug, servicesCatalog } from '@/lib/content';
import {
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateServiceJsonLd,
} from '@/lib/metadata';
import { resolveIcon } from '@/lib/icon-map';
import { ArrowLeft, ArrowRight, CheckCircle2, Package, Target } from 'lucide-react';
import { Language } from '@/types';

export function generateStaticParams() {
  return ['ar', 'en'].flatMap((lang) =>
    servicesCatalog.map((service) => ({ lang, slug: service.slug }))
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
  const service = getServiceBySlug(slug);

  if (!service) {
    return constructMetadata({
      title: isAr ? 'الخدمة غير موجودة' : 'Service Not Found',
      description: '',
      lang,
      path: `services/${slug}`,
    });
  }

  return constructMetadata({
    title: `${service.title[isAr ? 'ar' : 'en']} | ${isAr ? 'خدمات نوڤيكسا' : 'Novixa Services'}`,
    description: service.description[isAr ? 'ar' : 'en'],
    lang,
    path: `services/${service.slug}`,
    eyebrow: service.categoryBadge[isAr ? 'ar' : 'en'],
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: paramLang, slug } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const Icon = resolveIcon(service.iconName);
  const locale = isAr ? 'ar' : 'en';

  const serviceJsonLd = generateServiceJsonLd({
    name: service.title[locale],
    description: service.description[locale],
    serviceType: service.categoryBadge.en,
    url: `/${lang}/services/${service.slug}`,
    lang,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'الخدمات الهندسية' : 'Services', url: `/${lang}/services` },
    { name: service.title[locale], url: `/${lang}/services/${service.slug}` },
  ]);

  // Sibling services in the same category, for onward navigation.
  const related = servicesCatalog
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

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
              <Link href={`/${lang}/services`} className="hover:text-slate-900 transition-colors">
                {isAr ? 'الخدمات' : 'Services'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-cyan-800 font-semibold">{service.title[locale]}</li>
          </ol>
        </nav>

        <article className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] space-y-8">
          <header className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-2 min-w-0">
                <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                  {service.title[locale]}
                </h1>
                <p className="text-sm text-cyan-700 font-arabic font-medium">
                  {service.subtitle[locale]}
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-arabic">
              {service.description[locale]}
            </p>
          </header>

          {/* Visual Showcase Banner */}
          {service.image && (
            <div className="relative w-full aspect-[16/8] sm:aspect-[21/8] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-lg group">
              <Image
                src={service.image}
                alt={service.title[locale]}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 start-4 end-4 z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 px-3.5 py-1.5 rounded-xl text-cyan-300 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  {isAr ? 'معمارية سحابية موثوقة وكود نظيف' : 'Enterprise Cloud Architecture'}
                </span>
                <span className="hidden sm:inline-block bg-slate-950/90 backdrop-blur-md border border-slate-700/80 px-3.5 py-1.5 rounded-xl text-slate-300 shadow-md">
                  {isAr ? 'ملكية برمجية كاملة 100%' : '100% Full IP Ownership'}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-3">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
                <Target className="w-4 h-4 text-cyan-600" />
                {service.scopeTitle[locale]}
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-arabic">
                {service.capabilities[locale].map((capability, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{capability}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 self-start">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
                <Package className="w-4 h-4 text-cyan-600" />
                {isAr ? 'المخرجات المسلّمة' : 'What you receive'}
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-arabic">
                {service.deliverables[locale].map((deliverable, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="p-5 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 space-y-2">
            <h2 className="font-mono text-cyan-800 font-bold text-xs uppercase tracking-wider">
              {isAr ? 'القيمة التي تعود على عملك' : 'The business case'}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-arabic">
              {service.businessValue[locale]}
            </p>
          </section>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
            <Link
              href={`/${lang}/start-project?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-sm shadow-md shadow-[#38BDF8]/20 transition-all cursor-pointer"
            >
              <span>{isAr ? 'اطلب استشارة لهذه الخدمة' : 'Request a consultation'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm transition-colors cursor-pointer"
            >
              <span>{isAr ? 'كل الخدمات' : 'All services'}</span>
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
              {isAr ? 'خدمات في نفس المسار' : 'Related services'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((item) => {
                const RelatedIcon = resolveIcon(item.iconName);
                return (
                  <Link
                    key={item.id}
                    href={`/${lang}/services/${item.slug}`}
                    className="rounded-2xl p-5 border border-slate-200/90 bg-white shadow-xs hover:shadow-md hover:border-cyan-500/40 space-y-2.5 group transition-all"
                  >
                    <RelatedIcon className="w-4 h-4 text-cyan-600" />
                    <h3 className="text-sm font-bold text-slate-900 font-display leading-snug group-hover:text-cyan-700 transition-colors">
                      {item.title[locale]}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {item.subtitle[locale]}
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
