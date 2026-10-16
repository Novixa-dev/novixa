import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { constructMetadata, generateBreadcrumbJsonLd } from '@/lib/metadata';
import { LEGAL_DOCUMENTS, getLegalDocument } from '@/content/legal';
import { CONTACT_EMAIL } from '@/lib/contact-channels';
import { FileText, ScrollText } from 'lucide-react';
import { Language } from '@/types';

export function generateStaticParams() {
  return ['ar', 'en'].flatMap((lang) => LEGAL_DOCUMENTS.map((doc) => ({ lang, slug: doc.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: paramLang, slug } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const doc = getLegalDocument(slug);

  if (!doc) {
    return constructMetadata({
      title: isAr ? 'الصفحة غير موجودة' : 'Not Found',
      description: '',
      lang,
      path: `legal/${slug}`,
    });
  }

  return constructMetadata({
    title: doc.title[isAr ? 'ar' : 'en'],
    description: doc.description[isAr ? 'ar' : 'en'],
    lang,
    path: `legal/${doc.slug}`,
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: paramLang, slug } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const doc = getLegalDocument(slug);

  if (!doc) notFound();

  const locale = isAr ? 'ar' : 'en';
  const Icon = doc.slug === 'privacy' ? FileText : ScrollText;

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: doc.title[locale], url: `/${lang}/legal/${doc.slug}` },
  ]);

  const updatedLabel = new Date(doc.updated).toLocaleDateString(
    isAr ? 'ar' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-right rtl:text-right ltr:text-left">
        <header className="space-y-4 border-b border-slate-200/80 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
            <Icon className="w-3.5 h-3.5 text-cyan-700" />
            <span>{isAr ? 'وثائق قانونية' : 'Legal'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {doc.title[locale]}
          </h1>
          <p className="text-slate-600 text-base font-arabic leading-relaxed">
            {doc.description[locale]}
          </p>
          <p className="text-xs font-mono text-slate-500">
            {isAr ? 'آخر تحديث: ' : 'Last updated: '}
            <time dateTime={doc.updated}>{updatedLabel}</time>
          </p>
        </header>

        <div className="space-y-8">
          {doc.sections.map((section, i) => (
            <section key={i} className="space-y-3">
              <h2 className="text-lg font-bold font-display text-slate-900">
                {section.heading[locale]}
              </h2>
              <div className="space-y-3">
                {section.body[locale].map((paragraph, j) => (
                  <p key={j} className="text-sm sm:text-base text-slate-600 leading-relaxed font-arabic">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] p-6 space-y-2">
          <h2 className="text-sm font-bold text-slate-900 font-display">
            {isAr ? 'أسئلة حول هذه الصفحة' : 'Questions about this page'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-arabic">
            {isAr ? 'راسلنا على ' : 'Write to '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-blue-600 hover:text-blue-700 font-mono transition-colors font-semibold"
            >
              {CONTACT_EMAIL}
            </a>
            {isAr
              ? ' لطلب نسخة من بياناتك أو تصحيحها أو حذفها.'
              : ' to request a copy of your data, a correction, or deletion.'}
          </p>
        </aside>

        <nav className="flex flex-wrap gap-4 pt-4 border-t border-slate-200/80 text-xs">
          {LEGAL_DOCUMENTS.filter((other) => other.slug !== doc.slug).map((other) => (
            <Link
              key={other.slug}
              href={`/${lang}/legal/${other.slug}`}
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              {other.title[locale]}
            </Link>
          ))}
          <Link href={`/${lang}`} className="text-slate-500 hover:text-slate-900 transition-colors">
            {isAr ? 'العودة للرئيسية' : 'Back to home'}
          </Link>
        </nav>
      </div>
    </div>
  );
}
