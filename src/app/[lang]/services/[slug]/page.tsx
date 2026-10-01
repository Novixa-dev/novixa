import React from 'react';
import Link from 'next/link';
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
              <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                {isAr ? 'الخدمات' : 'Services'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-blue-400">{service.title[locale]}</li>
          </ol>
        </nav>

        <article className="glass-card rounded-3xl p-6 sm:p-10 border border-white/[0.08] bg-slate-900/90 shadow-2xl space-y-8">
          <header className="space-y-4 border-b border-slate-800 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-800/70 text-blue-400 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-2 min-w-0">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono">
                  {service.categoryBadge[locale]}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-snug">
                  {service.title[locale]}
                </h1>
                <p className="text-sm text-blue-300 font-arabic font-medium">
                  {service.subtitle[locale]}
                </p>
              </div>
            </div>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-arabic">
              {service.description[locale]}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-3">
              <h2 className="flex items-center gap-2 text-sm font-bold text-white font-display uppercase tracking-wider">
                <Target className="w-4 h-4 text-blue-400" />
                {service.scopeTitle[locale]}
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-arabic">
                {service.capabilities[locale].map((capability, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{capability}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800 self-start">
              <h2 className="flex items-center gap-2 text-sm font-bold text-white font-display uppercase tracking-wider">
                <Package className="w-4 h-4 text-teal-400" />
                {isAr ? 'المخرجات المسلّمة' : 'What you receive'}
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-arabic">
                {service.deliverables[locale].map((deliverable, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="p-5 rounded-2xl bg-teal-950/20 border border-teal-900/40 space-y-2">
            <h2 className="font-mono text-teal-400 font-bold text-xs uppercase tracking-wider">
              {isAr ? 'القيمة التي تعود على عملك' : 'The business case'}
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed font-arabic">
              {service.businessValue[locale]}
            </p>
          </section>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800">
            <Link
              href={`/${lang}/start-project?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-colors"
            >
              <span>{isAr ? 'اطلب استشارة لهذه الخدمة' : 'Request a consultation'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/[0.08] bg-slate-900/70 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-colors"
            >
              <span>{isAr ? 'كل الخدمات' : 'All services'}</span>
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              {isAr ? 'خدمات في نفس المسار' : 'Related services'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((item) => {
                const RelatedIcon = resolveIcon(item.iconName);
                return (
                  <Link
                    key={item.id}
                    href={`/${lang}/services/${item.slug}`}
                    className="glass-card glass-card-hover rounded-2xl p-5 border border-white/[0.07] space-y-2.5 group"
                  >
                    <RelatedIcon className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-bold text-white font-display leading-snug">
                      {item.title[locale]}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
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
