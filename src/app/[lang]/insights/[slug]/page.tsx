import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, insightsArticles } from '@/lib/content';
import { constructMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/metadata';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Language } from '@/types';
import { AdrSnippetCard } from '@/components/ui/AdrSnippetCard';

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

  const jsonLd = generateArticleJsonLd({
    title: article.title[isAr ? 'ar' : 'en'],
    description: article.excerpt[isAr ? 'ar' : 'en'],
    author: article.author.name[isAr ? 'ar' : 'en'],
    datePublished: article.date,
    url: `/${lang}/insights/${article.id}`,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'مختبر المعرفة' : 'Insights Lab', url: `/${lang}/insights` },
    { name: article.title[isAr ? 'ar' : 'en'], url: `/${lang}/insights/${article.id}` },
  ]);

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-right rtl:text-right ltr:text-left">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href={`/${lang}`} className="hover:text-slate-900 transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href={`/${lang}/insights`} className="hover:text-slate-900 transition-colors">{isAr ? 'المعرفة' : 'Insights'}</Link>
          <span>/</span>
          <span className="text-cyan-700 font-medium truncate">{article.title[isAr ? 'ar' : 'en']}</span>
        </div>

        {/* Article Header Card */}
        <article className="rounded-2xl p-6 sm:p-10 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 border border-cyan-200 text-cyan-800">
              {article.category[isAr ? 'ar' : 'en']}
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.readTime[isAr ? 'ar' : 'en']}</span>
              </span>
              <span>{article.date}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {article.title[isAr ? 'ar' : 'en']}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base italic font-arabic border-r-2 border-cyan-500 pr-4 rtl:pr-4 ltr:border-l-2 ltr:pl-4">
            {article.excerpt[isAr ? 'ar' : 'en']}
          </p>

          <div className="space-y-4 pt-2 text-sm sm:text-base text-slate-700 font-arabic leading-relaxed">
            {article.content[isAr ? 'ar' : 'en'].map((p, i) => (
              <p key={i} className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80">
                {p}
              </p>
            ))}
          </div>

          {/* Architecture Decision Record (ADR) Interactive Card */}
          <AdrSnippetCard slug={slug} isAr={isAr} />

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 font-mono">
            <span>{article.author.name[isAr ? 'ar' : 'en']} • {article.author.role[isAr ? 'ar' : 'en']}</span>
            <Link
              href={`/${lang}/start-project`}
              className="px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold transition-all shadow-md shadow-[#38BDF8]/20 flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <span>{isAr ? 'مناقشة أفكار المقال مع مهندس' : 'Discuss Architecture with an Architect'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* Back Link */}
        <div className="pt-2">
          <Link
            href={`/${lang}/insights`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لمكتبة المقالات' : 'Back to Insights Library'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
