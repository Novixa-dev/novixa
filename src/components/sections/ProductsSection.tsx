'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
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
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  UtensilsCrossed,
  Calendar,
  Gamepad2,
  Building2,
  Sparkles,
};

export const ProductsSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

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
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('منتجات وأنظمة نوڤيكسا الرقمية', 'Novixa Proprietary Products')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('منتجات رقمية نبنيها لتصبح أصولاً تشغيلية.', 'Digital products engineered as scalable operational assets.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'منصات سحابية متخصصة تم بناؤها واختبارها لحل مشاكل قطاعية حقيقية، مصنفة بشفافية تامة حسب حالة الجاهزية والعرض التجريبي.',
                'Enterprise multi-tenant platforms engineered for domain precision, labeled with absolute transparency regarding live deployment status and demo access.'
              )}
            </p>
          </div>

          <Link
            href={`/${language}/products`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto"
          >
            <span>{t('عرض كافة المنتجات والمنصات', 'View All Products & Systems')}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((prod) => {
            const IconComp = iconMap[prod.iconName] || Sparkles;
            return (
              <div
                key={prod.id}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-white/[0.08] bg-slate-900/60 flex flex-col justify-between gap-6 relative group hover:border-blue-500/40 transition-all duration-200"
              >
                <div className="space-y-4 text-right rtl:text-right ltr:text-left">
                  {/* Top Row: Category & Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-display font-bold text-white text-base sm:text-lg block">
                          {prod.name[isRtl ? 'ar' : 'en']}
                        </span>
                        <span className="text-xs text-slate-400 font-arabic">
                          {prod.category[isRtl ? 'ar' : 'en']}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border ${getStatusBadgeClass(
                        prod.status
                      )}`}
                    >
                      {prod.statusLabel[isRtl ? 'ar' : 'en']}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-semibold text-blue-300 font-display">
                      {prod.title[isRtl ? 'ar' : 'en']}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic">
                      {prod.description[isRtl ? 'ar' : 'en']}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="pt-1 space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      {t('الميزات التشغيلية الرئيسية:', 'Key Product Capabilities:')}
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-300 font-arabic">
                      {prod.features[isRtl ? 'ar' : 'en'].slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics if available */}
                  {prod.metrics && prod.metrics.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-around text-center">
                      {prod.metrics.map((m, idx) => (
                        <div key={idx}>
                          <div className="text-base sm:text-lg font-bold font-display text-blue-400">{m.value[isRtl ? 'ar' : 'en']}</div>
                          <div className="text-[10px] text-slate-400 font-arabic">{m.label[isRtl ? 'ar' : 'en']}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    {prod.id === 'aqar' ? 'PropTech Solution' : prod.id === 'pulse' ? 'Enterprise SaaS' : 'Business Platform'}
                  </span>

                  <Link
                    href={`/${language}/products/${prod.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-3.5 py-1.5 rounded-lg transition-all"
                  >
                    <span>{t('عرض تفاصيل المنتج والعرض التجريبي', 'Product Details & Demo')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
