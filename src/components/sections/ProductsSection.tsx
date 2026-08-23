'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PRODUCTS } from '../../content/data';
import { ViewType } from '../../types';
import { 
  Activity, UtensilsCrossed, Calendar, Building, Sparkles, 
  ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck 
} from 'lucide-react';
import { ProductCardSkeleton } from '../ui/Skeleton';
import { usePerceivedLoading } from '../../hooks/usePerceivedLoading';

interface ProductsSectionProps {
  onNavigate?: (view: ViewType) => void;
  onSelectProduct?: (productId: string) => void;
  isLoading?: boolean;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ 
  onNavigate, 
  onSelectProduct,
  isLoading: controlledLoading
}) => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const { isLoading } = usePerceivedLoading([], { initialDelay: 320, controlledLoading });

    const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return Activity;
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'Calendar': return Calendar;
      case 'Building': return Building;
      default: return Sparkles;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-800 text-teal-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('منتجات نوڤيكسا الرقمية (SaaS)', 'Novixa Digital Products')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {t('منتجات نبنيها لتصبح أنظمة تشغيل حقيقية.', 'Products engineered as scalable operating systems.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t(
                'منصات سحابية حديثة متعددة المستأجرين (Multi-Tenant) مصممة لحل مشكلات قطاعية محددة.',
                'Enterprise multi-tenant SaaS products engineered for high concurrency and domain precision.'
              )}
            </p>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto"
            >
              <span>{t('عرض جميع المنتجات والمنصات', 'View All Products & Systems')}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Products Grid / Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <ProductCardSkeleton count={4} />
          ) : (
            PRODUCTS.map((prod) => {
              const IconComp = getProductIcon(prod.iconName);
              return (
                <div
                  key={prod.id}
                  className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between gap-6 relative group animate-fadeIn"
                >
                  <div className="space-y-4 text-right rtl:text-right ltr:text-left">
                    {/* Top Row: Category & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400">
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

                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-950 border border-slate-800 text-slate-300">
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
                        {t('الميزات التشغيلية الرئيسية:', 'Key Product Features:')}
                      </span>
                      <div className="space-y-1.5 text-xs text-slate-300">
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
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-around text-center">
                        {prod.metrics.map((m, idx) => (
                          <div key={idx}>
                            <div className="text-base sm:text-lg font-bold font-display text-blue-400">{m.value}</div>
                            <div className="text-[10px] text-slate-400 font-arabic">{m.label[isRtl ? 'ar' : 'en']}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">
                      {prod.id === 'pulse' ? 'Spotlight Product' : 'SaaS System'}
                    </span>

                    <button
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(prod.id);
                        if (onNavigate) onNavigate('products');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-3.5 py-1.5 rounded-lg transition-all"
                    >
                      <span>{t('تفاصيل المنتج بالكامل', 'View Full Specifications')}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
