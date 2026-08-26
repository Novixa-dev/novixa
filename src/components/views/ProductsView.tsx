'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { PRODUCTS } from '../../content/data';
import { 
  Activity, UtensilsCrossed, Calendar, Gamepad2, Sparkles, 
  CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Zap, ArrowUpRight 
} from 'lucide-react';
import { PulseSection } from '../sections/PulseSection';

interface ProductsViewProps {
  selectedProductId?: string;
}

export const ProductsView: React.FC<ProductsViewProps> = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return Activity;
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'Calendar': return Calendar;
      case 'Gamepad2': return Gamepad2;
      default: return Sparkles;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950 border border-teal-800 text-teal-300 text-xs font-semibold">
            <span>{t('كتالوج المنتجات الرقمية (SaaS)', 'Digital Products Directory')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            {t('منصات برمجية جاهزة للخدمة والتوسع.', 'Multi-tenant Products Ready for Scale.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {t(
              'منتجات نوڤيكسا مصممة كحلول برمجية سحابية متكاملة تمنح الشركات كفاءة تشغيلية مباشرة وميزات تنافسية دائمًا.',
              'Designed as B2B SaaS engines, Novixa products empower businesses with direct operational advantage.'
            )}
          </p>
        </div>

        {/* Products List */}
        <div className="space-y-10">
          {PRODUCTS.map((prod) => {
            const IconComp = getProductIcon(prod.iconName);
            return (
              <div
                key={prod.id}
                id={`product-${prod.id}`}
                className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-slate-900/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-right rtl:text-right ltr:text-left"
              >
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg"
                      style={{ backgroundColor: prod.accentColor }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold font-display text-white">
                        <Link href={`/${language}/products/${prod.id}`} className="hover:text-teal-300 transition-colors">
                          {prod.name[isRtl ? 'ar' : 'en']}
                        </Link>
                      </h2>
                      <span className="text-xs text-slate-400 font-arabic">
                        {prod.category[isRtl ? 'ar' : 'en']} • {prod.statusLabel[isRtl ? 'ar' : 'en']}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 font-arabic leading-relaxed">
                    {prod.description[isRtl ? 'ar' : 'en']}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-mono text-slate-400 uppercase block">{t('الميزات الأساسية للمنصة:', 'Core Platform Features:')}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                      {prod.features[isRtl ? 'ar' : 'en'].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href={`/${language}/products/${prod.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      <span>{t('عرض صفحة المنتج بالتفصيل', 'View Full Product Details')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 text-center">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-slate-400 uppercase block">{t('الأثر المحقق', 'Product Impact')}</span>
                    {prod.metrics && prod.metrics.length > 0 && (
                      <div className="text-2xl font-extrabold font-display text-teal-400">
                        {prod.metrics[0].value}
                      </div>
                    )}
                    {prod.metrics && prod.metrics.length > 0 && (
                      <div className="text-xs text-slate-300 font-arabic">
                        {prod.metrics[0].label[isRtl ? 'ar' : 'en']}
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/${language}/start-project`}
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{t('طلب استشارة حول المنصة', 'Consult on This Platform')}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Embed Dedicated Interactive Pulse Showcase */}
      <PulseSection />
    </div>
  );
};
