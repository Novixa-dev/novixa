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
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-right rtl:text-right ltr:text-left">
        <header className="space-y-4 border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
            <Icon className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'وثائق قانونية' : 'Legal'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-snug">
            {doc.title[locale]}
          </h1>
          <p className="text-slate-300 text-base font-arabic leading-relaxed">
            {doc.description[locale]}
          </p>
          <p className="text-xs font-mono text-slate-400">
            {isAr ? 'آخر تحديث: ' : 'Last updated: '}
            <time dateTime={doc.updated}>{updatedLabel}</time>
          </p>
        </header>

        <div className="space-y-8">
          {doc.sections.map((section, i) => (
            <section key={i} className="space-y-3">
              <h2 className="text-lg font-bold font-display text-white">
                {section.heading[locale]}
              </h2>
              <div className="space-y-3">
                {section.body[locale].map((paragraph, j) => (
                  <p key={j} className="text-sm text-slate-300 leading-relaxed font-arabic">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="glass-card rounded-2xl border border-white/[0.07] p-5 space-y-2">
          <h2 className="text-sm font-bold text-white font-display">
            {isAr ? 'أسئلة حول هذه الصفحة' : 'Questions about this page'}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-arabic">
            {isAr ? 'راسلنا على ' : 'Write to '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-blue-400 hover:text-blue-300 font-mono transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            {isAr
              ? ' لطلب نسخة من بياناتك أو تصحيحها أو حذفها.'
              : ' to request a copy of your data, a correction, or deletion.'}
          </p>
        </aside>

        <nav className="flex flex-wrap gap-4 pt-4 border-t border-slate-800 text-xs">
          {LEGAL_DOCUMENTS.filter((other) => other.slug !== doc.slug).map((other) => (
            <Link
              key={other.slug}
              href={`/${lang}/legal/${other.slug}`}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {other.title[locale]}
            </Link>
          ))}
          <Link href={`/${lang}`} className="text-slate-400 hover:text-white transition-colors">
            {isAr ? 'العودة للرئيسية' : 'Back to home'}
          </Link>
        </nav>
      </div>
    </div>
  );
}
