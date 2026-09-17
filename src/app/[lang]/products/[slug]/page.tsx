import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, productsCatalog } from '@/lib/content';
import { constructMetadata, generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/metadata';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  Server,
  Wrench,
  Cpu,
  Clock,
  Zap,
} from 'lucide-react';
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

  const jsonLd = generateProductJsonLd({
    name: product.name[isAr ? 'ar' : 'en'],
    description: product.description[isAr ? 'ar' : 'en'],
    category: product.category.en,
    url: `/${lang}/products/${product.id}`,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'المنتجات الرقمية' : 'Products', url: `/${lang}/products` },
    { name: product.name[isAr ? 'ar' : 'en'], url: `/${lang}/products/${product.id}` },
  ]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'LIVE':
      case 'Available':
        return 'bg-emerald-950 border-emerald-800 text-emerald-300';
      case 'DEMO':
      case 'Early Access':
        return 'bg-blue-950 border-blue-800 text-blue-300';
      case 'IN DEVELOPMENT':
        return 'bg-amber-950 border-amber-800 text-amber-300';
      default:
        return 'bg-slate-900 border-slate-700 text-slate-400';
    }
  };

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-right rtl:text-right ltr:text-left">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href={`/${lang}`} className="hover:text-white">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href={`/${lang}/products`} className="hover:text-white">{isAr ? 'المنتجات' : 'Products'}</Link>
          <span>/</span>
          <span className="text-blue-400">{product.name[isAr ? 'ar' : 'en']}</span>
        </div>

        {/* Product Hero & Specs */}
        <div className="glass-card rounded-3xl p-6 sm:p-12 border border-white/[0.08] bg-slate-900/90 shadow-2xl space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono">
                  {product.category[isAr ? 'ar' : 'en']}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-mono border ${getStatusBadgeClass(product.status)}`}>
                  {product.statusLabel[isAr ? 'ar' : 'en']}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                {product.name[isAr ? 'ar' : 'en']}
              </h1>
              <p className="text-xs sm:text-sm text-blue-300 font-arabic font-medium">
                {product.tagline[isAr ? 'ar' : 'en']}
              </p>
            </div>

            <Link
              href={`/${lang}/contact?product=${product.id}`}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>{isAr ? 'طلب عرض تجريبي واستشارة' : 'Request Product Demo'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Description */}
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-arabic">
            {product.description[isAr ? 'ar' : 'en']}
          </p>

          {/* Problem Solved & Target Audience Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-arabic text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="font-mono text-rose-400 font-bold block">{isAr ? 'المشكلة التي يعالجها المنتج:' : 'Operational Problem Solved:'}</span>
              <p className="text-slate-300 leading-relaxed">
                {product.problemSolved ? product.problemSolved[isAr ? 'ar' : 'en'] : product.description[isAr ? 'ar' : 'en']}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-950/20 border border-teal-900/40 space-y-2">
              <span className="font-mono text-teal-400 font-bold block">{isAr ? 'الأثر التجاري والقيمة المضافة:' : 'Business Value & Impact:'}</span>
              <p className="text-slate-300 leading-relaxed">
                {product.businessValue ? product.businessValue[isAr ? 'ar' : 'en'] : (product.metrics && product.metrics[0] ? product.metrics[0].value : '')}
              </p>
            </div>
          </div>

          {/* Features List & Verticals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                {isAr ? 'الميزات التشغيلية والتقنية للمنصة:' : 'Key Operational Capabilities:'}
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-arabic">
                {product.features[isAr ? 'ar' : 'en'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <h2 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                  {isAr ? 'القطاعات والأنشطة المستهدفة:' : 'Target Verticals:'}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {product.targetIndustries[isAr ? 'ar' : 'en'].map((ind, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200 font-arabic">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {product.metrics && product.metrics.length > 0 && (
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">{isAr ? 'مؤشرات الأداء المحققة:' : 'Performance Metrics:'}</span>
                  <div className="grid grid-cols-1 gap-2">
                    {product.metrics.map((metric, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-arabic">{metric.label[isAr ? 'ar' : 'en']}</span>
                        <span className="text-sm font-bold text-blue-400 font-display">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Deployment, Customization & Support Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 font-arabic text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-white/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white">
                <Server className="w-4 h-4 text-blue-400" />
                <span>{isAr ? 'خيارات النشر والاستضافة' : 'Deployment Options'}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {isAr ? 'استضافة سحابية مدارة من نوڤيكسا أو نشر خاص على خوادمك السحابية.' : 'Fully managed Novixa cloud hosting or on-premise cloud instances.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white">
                <Wrench className="w-4 h-4 text-teal-400" />
                <span>{isAr ? 'التخصيص والربط' : 'Customization & APIs'}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {isAr ? 'تهيئة العلامة التجارية، ربط بوابات الدفع، وتكامل الـ APIs والواتساب.' : 'Custom branding, payment gateways, and WhatsApp/ERP API sync.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'الدعم والصيانة (SLA)' : 'Continuous SLA'}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {isAr ? 'تحديثات أمنية دورية، نسخ احتياطي يومي، ودعم فني هندسي مباشر.' : 'Regular security patches, daily backups, and direct engineering support.'}
              </p>
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
