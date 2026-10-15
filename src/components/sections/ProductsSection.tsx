import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { PRODUCTS } from '../../content/data';
import {
  Activity,
  UtensilsCrossed,
  Calendar,
  Gamepad2,
  Sparkles,
  Building2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  UtensilsCrossed,
  Calendar,
  Gamepad2,
  Building2,
  Sparkles,
};

export const ProductsSection = ({ lang }: { lang: Language }) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'LIVE':
      case 'Available':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold';
      case 'DEMO':
      case 'Early Access':
        return 'bg-cyan-50 border-cyan-200 text-cyan-800 font-semibold';
      case 'IN DEVELOPMENT':
        return 'bg-amber-50 border-amber-200 text-amber-800 font-semibold';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>{t('منتجات وأنظمة نوڤيكسا الرقمية المستقلة', 'Novixa Proprietary Products')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {t('منتجات رقمية نبنيها لتصبح أصولاً تشغيلية.', 'Digital products engineered as scalable operational assets.')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'منصات سحابية متخصصة تم بناؤها واختبارها لحل مشاكل قطاعية حقيقية، مصنفة بشفافية تامة حسب حالة الجاهزية وإمكانية طلب العرض الحي.',
                'Enterprise multi-tenant platforms engineered for domain precision, labeled with absolute transparency regarding live deployment status and demo access.'
              )}
            </p>
          </div>

          <Link
            href={`/${language}/products`}
            className="inline-flex items-center gap-2 text-[#38BDF8] hover:text-cyan-400 font-semibold text-sm transition-colors group"
          >
            <span className="text-[#38BDF8]">{t('عرض كافة المنتجات والمنصات', 'View All Products & Systems')}</span>
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 text-[#38BDF8]" />
          </Link>
        </div>

        {/* Alternating Products Showcase List ("صور وبجنبها كتابه وتعكس") */}
        <div className="space-y-12">
          {PRODUCTS.map((prod, idx) => {
            const IconComp = iconMap[prod.iconName] || Sparkles;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={prod.id}
                className="rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-right rtl:text-right ltr:text-left">
                  
                  {/* Text / Info Column */}
                  <div className={`lg:col-span-6 xl:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    
                    {/* Header badge & status */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold">
                        <IconComp className="w-4 h-4 text-cyan-600" />
                        <span>{prod.category[isRtl ? 'ar' : 'en']}</span>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-[11px] font-mono border ${getStatusBadgeClass(prod.status)}`}>
                        {prod.statusLabel[isRtl ? 'ar' : 'en']}
                      </span>
                    </div>

                    {/* Product Name & Title */}
                    <div className="space-y-2">
                      <span className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 block tracking-tight">
                        {prod.name[isRtl ? 'ar' : 'en']}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 font-display leading-snug">
                        {prod.title[isRtl ? 'ar' : 'en']}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-arabic">
                        {prod.description[isRtl ? 'ar' : 'en']}
                      </p>
                    </div>

                    {/* Operational Features */}
                    <div className="space-y-2.5 pt-1">
                      <span className="text-[11px] font-mono text-cyan-700 uppercase tracking-wider block font-bold">
                        {t('الميزات التشغيلية الرئيسية:', 'Key Product Capabilities:')}
                      </span>
                      <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-arabic">
                        {prod.features[isRtl ? 'ar' : 'en'].slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics preview row */}
                    {prod.metrics && prod.metrics.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 gap-4 text-center">
                        {prod.metrics.map((m, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-base sm:text-lg font-bold font-display text-cyan-700">
                              {m.value[isRtl ? 'ar' : 'en']}
                            </div>
                            <div className="text-[11px] text-slate-500 font-arabic mt-0.5 font-medium">
                              {m.label[isRtl ? 'ar' : 'en']}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom CTA & Subtitle */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5 font-medium">
                        <Terminal className="w-3.5 h-3.5 text-cyan-600" />
                        <span>{prod.id === 'aqar' ? 'PropTech OS' : prod.id === 'pulse' ? 'Enterprise SaaS' : 'Business Platform'}</span>
                      </span>

                      <Link
                        href={`/${language}/products/${prod.id}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#38BDF8] bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] px-5 py-2.5 rounded-xl transition-all shadow-md shadow-cyan-950/20 cursor-pointer"
                      >
                        <span className="text-[#38BDF8]">{t('عرض تفاصيل المنتج والعرض التجريبي', 'Product Details & Demo')}</span>
                        <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
                      </Link>
                    </div>

                  </div>

                  {/* Visual Image Showcase Column */}
                  <div className={`lg:col-span-6 xl:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl group/img bg-slate-950">
                      <Image
                        src={`/images/products/${prod.id}-dashboard.png`}
                        alt={prod.name[isRtl ? 'ar' : 'en']}
                        width={900}
                        height={560}
                        className="w-full h-auto object-cover transform group-hover/img:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

