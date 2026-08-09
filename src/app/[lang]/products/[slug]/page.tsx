import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, productsCatalog } from '@/lib/content';
import { constructMetadata } from '@/lib/metadata';
import { CheckCircle2, ArrowLeft, ArrowRight, Sparkles, Shield, Layers } from 'lucide-react';
import { Language } from '@/types';

export function generateStaticParams() {
  const languages = ['ar', 'en'];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of languages) {
    for (const prod of productsCatalog) {
      params.push({ lang, slug: prod.id });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: paramLang, slug } = await params;
  const product = getProductBySlug(slug);
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  if (!product) {
    return constructMetadata({ title: 'Product Not Found', description: '', lang, path: `products/${slug}` });
  }

  const name = product.name[isAr ? 'ar' : 'en'];
  const desc = product.description[isAr ? 'ar' : 'en'];

  return constructMetadata({
    title: `${name} | ${isAr ? 'منتجات نوڤيكسا' : 'Novixa Products'}`,
    description: desc,
    lang,
    path: `products/${slug}`,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: paramLang, slug } = await params;
  const product = getProductBySlug(slug);
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  if (!product) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[isAr ? 'ar' : 'en'],
    description: product.description[isAr ? 'ar' : 'en'],
    brand: {
      '@type': 'Brand',
      name: 'Novixa',
    },
  };

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-right rtl:text-right ltr:text-left">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href={`/${lang}`} className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href={`/${lang}/products`} className="hover:text-white">Products</Link>
          <span>/</span>
          <span className="text-teal-400">{product.name[isAr ? 'ar' : 'en']}</span>
        </div>

        {/* Product Hero */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 bg-slate-900/90 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-800 text-teal-300 text-xs font-mono">
                <span>{product.category[isAr ? 'ar' : 'en']}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                {product.name[isAr ? 'ar' : 'en']}
              </h1>
            </div>

            <Link
              href={`/${lang}/start-project`}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center gap-2"
            >
              <span>{isAr ? 'طلب وصول للمنصة' : 'Request Product Demo'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-arabic">
            {product.description[isAr ? 'ar' : 'en']}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                {isAr ? 'الميزات التشغيلية والتقنية:' : 'Key Operational Features:'}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-arabic">
                {product.features[isAr ? 'ar' : 'en'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                {isAr ? 'القطاعات المستهدفة والأثر:' : 'Target Verticals & Impact:'}
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex flex-wrap gap-2">
                  {product.targetIndustries[isAr ? 'ar' : 'en'].map((ind, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200">
                      {ind}
                    </span>
                  ))}
                </div>
                {product.metrics && product.metrics.length > 0 && (
                  <div className="pt-3 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">{product.metrics[0].label[isAr ? 'ar' : 'en']}</span>
                    <span className="text-lg font-bold text-teal-300 font-display">{product.metrics[0].value}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href={`/${lang}/products`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لكتالوج المنتجات' : 'Back to Product Catalog'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
