import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, insightsArticles } from '@/lib/content';
import { constructMetadata } from '@/lib/metadata';
import { BookOpen, ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';
import { Language } from '@/types';

export function generateStaticParams() {
  const languages = ['ar', 'en'];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of languages) {
    for (const art of insightsArticles) {
      params.push({ lang, slug: art.id });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: paramLang, slug } = await params;
  const article = getArticleBySlug(slug);
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  if (!article) {
    return constructMetadata({ title: 'Article Not Found', description: '', lang, path: `insights/${slug}` });
  }

  const title = article.title[isAr ? 'ar' : 'en'];
  const desc = article.excerpt[isAr ? 'ar' : 'en'];

  return constructMetadata({
    title: `${title} | ${isAr ? 'مختبر المعرفة نوڤيكسا' : 'Novixa Insights Lab'}`,
    description: desc,
    lang,
    path: `insights/${slug}`,
  });
}

export default async function InsightDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: paramLang, slug } = await params;
  const article = getArticleBySlug(slug);
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[isAr ? 'ar' : 'en'],
    description: article.excerpt[isAr ? 'ar' : 'en'],
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Novixa',
      logo: {
        '@type': 'ImageObject',
        url: 'https://novixa.io/assets/logo.png',
      },
    },
    datePublished: article.date,
  };

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-right rtl:text-right ltr:text-left">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href={`/${lang}`} className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href={`/${lang}/insights`} className="hover:text-white">Insights</Link>
          <span>/</span>
          <span className="text-teal-400">{article.title[isAr ? 'ar' : 'en']}</span>
        </div>

        {/* Article Header */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 bg-slate-900/90 shadow-2xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-teal-950 text-teal-300 border border-teal-800">
              {article.category[isAr ? 'ar' : 'en']}
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime[isAr ? 'ar' : 'en']}</span>
              </span>
              <span>{article.date}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
            {article.title[isAr ? 'ar' : 'en']}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base italic font-arabic border-r-2 border-teal-500 pr-4 rtl:pr-4 ltr:border-l-2 ltr:pl-4">
            {article.excerpt[isAr ? 'ar' : 'en']}
          </p>

          <div className="space-y-4 pt-4 text-sm text-slate-200 font-arabic leading-relaxed">
            {article.content[isAr ? 'ar' : 'en'].map((p, i) => (
              <p key={i} className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80">
                {p}
              </p>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>By {article.author.name} • {article.author.role[isAr ? 'ar' : 'en']}</span>
            <Link
              href={`/${lang}/start-project`}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all flex items-center gap-2"
            >
              <span>{isAr ? 'مناقشة أفكار المقال مع مهندس' : 'Discuss Architecture with an Architect'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href={`/${lang}/insights`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لمكتبة المقالات' : 'Back to Insights Library'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
