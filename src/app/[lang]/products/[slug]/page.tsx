import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, productsCatalog } from '@/lib/content';
import { constructMetadata, generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/metadata';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Shield,
  Server,
  Wrench,
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
        return 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold';
      case 'DEMO':
      case 'Early Access':
        return 'bg-blue-50 border-blue-200 text-blue-700 font-semibold';
      case 'IN DEVELOPMENT':
        return 'bg-amber-50 border-amber-200 text-amber-700 font-semibold';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-600 font-semibold';
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

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
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href={`/${lang}`} className="hover:text-slate-900 transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href={`/${lang}/products`} className="hover:text-slate-900 transition-colors">{isAr ? 'المنتجات' : 'Products'}</Link>
          <span>/</span>
          <span className="text-cyan-800 font-semibold">{product.name[isAr ? 'ar' : 'en']}</span>
        </div>

        {/* Product Hero & Specs */}
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold">
                  {product.category[isAr ? 'ar' : 'en']}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-mono border ${getStatusBadgeClass(product.status)}`}>
                  {product.statusLabel[isAr ? 'ar' : 'en']}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                {product.name[isAr ? 'ar' : 'en']}
              </h1>
              <p className="text-xs sm:text-sm text-cyan-700 font-arabic font-medium">
                {product.tagline[isAr ? 'ar' : 'en']}
              </p>
            </div>

            <Link
              href={`/${lang}/contact?product=${product.id}`}
              className="px-6 py-3.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-[#38BDF8]/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>{isAr ? 'طلب عرض تجريبي واستشارة' : 'Request Product Demo'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Showcase Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[2.4/1] border border-slate-200 shadow-lg bg-slate-950">
            <Image
              src={`/images/products/${product.id}-preview.jpg`}
              alt={product.name[isAr ? 'ar' : 'en']}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
          </div>

          {/* Description */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-arabic">
            {product.description[isAr ? 'ar' : 'en']}
          </p>

          {/* Problem Solved & Target Audience Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-arabic text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
              <span className="font-mono text-rose-700 font-bold block">{isAr ? 'المشكلة التي يعالجها المنتج:' : 'Operational Problem Solved:'}</span>
              <p className="text-slate-700 leading-relaxed">
                {product.problemSolved ? product.problemSolved[isAr ? 'ar' : 'en'] : product.description[isAr ? 'ar' : 'en']}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 space-y-2">
              <span className="font-mono text-cyan-800 font-bold block">{isAr ? 'الأثر التجاري والقيمة المضافة:' : 'Business Value & Impact:'}</span>
              <p className="text-slate-700 leading-relaxed">
                {product.businessValue ? product.businessValue[isAr ? 'ar' : 'en'] : (product.metrics?.[0] ? product.metrics[0].value[isAr ? 'ar' : 'en'] : '')}
              </p>
            </div>
          </div>

          {/* Features List & Verticals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
                {isAr ? 'الميزات التشغيلية والتقنية للمنصة:' : 'Key Operational Capabilities:'}
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-arabic">
                {product.features[isAr ? 'ar' : 'en'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="space-y-2">
                <h2 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider">
                  {isAr ? 'القطاعات والأنشطة المستهدفة:' : 'Target Verticals:'}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {product.targetIndustries[isAr ? 'ar' : 'en'].map((ind, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-arabic shadow-xs">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {product.metrics && product.metrics.length > 0 && (
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold block">{isAr ? 'قدرات تشغيلية بارزة:' : 'Operational highlights:'}</span>
                  <div className="grid grid-cols-1 gap-2">
                    {product.metrics.map((metric, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                        <span className="text-xs text-slate-600 font-arabic">{metric.label[isAr ? 'ar' : 'en']}</span>
                        <span className="text-sm font-bold text-cyan-600 font-display">{metric.value[isAr ? 'ar' : 'en']}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Deployment, Customization & Support Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 font-arabic text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Server className="w-4 h-4 text-cyan-600" />
                <span>{isAr ? 'خيارات النشر والاستضافة' : 'Deployment Options'}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isAr ? 'استضافة سحابية مدارة من نوڤيكسا أو نشر خاص على خوادمك السحابية.' : 'Fully managed Novixa cloud hosting or on-premise cloud instances.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Wrench className="w-4 h-4 text-cyan-600" />
                <span>{isAr ? 'التخصيص والربط' : 'Customization & APIs'}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isAr ? 'تهيئة العلامة التجارية، ربط بوابات الدفع، وتكامل الـ APIs والواتساب.' : 'Custom branding, payment gateways, and WhatsApp/ERP API sync.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Shield className="w-4 h-4 text-cyan-600" />
                <span>{isAr ? 'الدعم والصيانة (SLA)' : 'Continuous SLA'}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isAr ? 'تحديثات أمنية دورية، نسخ احتياطي يومي، ودعم فني هندسي مباشر.' : 'Regular security patches, daily backups, and direct engineering support.'}
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href={`/${lang}/products`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-cyan-700 transition-colors"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لكتالوج المنتجات' : 'Back to Product Catalog'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
