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
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  UtensilsCrossed,
  Calendar,
  Gamepad2,
  Building2,
  Sparkles,
};

export const ProductsView: React.FC = () => {
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
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen space-y-16 relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('منتجات وأنظمة نوڤيكسا الرقمية', 'Novixa Proprietary Products')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('منتجات رقمية نبنيها لتصبح أصولاً تشغيلية.', 'Digital products engineered as scalable operational assets.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {t(
              'منصات سحابية متخصصة ومكتملة الميزات، مصممة لمعالجة أعمق التحديات التشغيلية في القطاعات التجارية المختلفة مع توضيح حالة كل منتج بشفافية تامة.',
              'Domain-specific SaaS platforms built to eliminate operational friction, clearly labeled with real product status, demo links, and deployment options.'
            )}
          </p>
        </div>

        {/* Products List */}
        <div className="space-y-10">
          {PRODUCTS.map((prod) => {
            const IconComp = iconMap[prod.iconName] || Sparkles;
            return (
              <div
                key={prod.id}
                id={`product-${prod.id}`}
                className="glass-card rounded-3xl p-6 sm:p-10 border border-white/[0.08] bg-slate-900/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-right rtl:text-right ltr:text-left"
              >
                {/* Left (Main Info) */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400 shadow-lg">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold font-display text-white">
                          <Link href={`/${language}/products/${prod.id}`} className="hover:text-blue-300 transition-colors">
                            {prod.name[isRtl ? 'ar' : 'en']}
                          </Link>
                        </h2>
                        <span className="text-xs text-slate-400 font-arabic">
                          {prod.category[isRtl ? 'ar' : 'en']}
                        </span>
                      </div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${getStatusBadgeClass(prod.status)}`}>
                      {prod.statusLabel[isRtl ? 'ar' : 'en']}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 font-arabic leading-relaxed">
                    {prod.description[isRtl ? 'ar' : 'en']}
                  </p>

                  {/* Problem & Value Box */}
                  {prod.problemSolved && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-arabic">
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.04] space-y-1">
                        <span className="text-rose-400 font-mono font-bold block">{t('المشكلة المحلولة:', 'Problem Solved:')}</span>
                        <span className="text-slate-300">{t(prod.problemSolved.ar, prod.problemSolved.en)}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.04] space-y-1">
                        <span className="text-teal-400 font-mono font-bold block">{t('الأثر التجاري:', 'Business Value:')}</span>
                        <span className="text-slate-300">{t(prod.businessValue?.ar || '', prod.businessValue?.en || '')}</span>
                      </div>
                    </div>
                  )}

                  {/* Core Features */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      {t('الميزات التشغيلية للمنصة:', 'Core Platform Capabilities:')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200 font-arabic">
                      {prod.features[isRtl ? 'ar' : 'en'].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/40">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right (Actions & Deployment) */}
                <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-white/[0.06] space-y-5 text-right rtl:text-right ltr:text-left">
                  <div className="space-y-2 border-b border-slate-800 pb-4">
                    <span className="text-xs font-mono text-slate-400 uppercase block">{t('القطاعات المستهدفة:', 'Target Verticals:')}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {prod.targetIndustries[isRtl ? 'ar' : 'en'].map((ind, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-arabic">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  {prod.metrics && prod.metrics.length > 0 && (
                    <div className="space-y-1 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">{prod.metrics[0].label[isRtl ? 'ar' : 'en']}</span>
                      <span className="text-xl font-extrabold font-display text-blue-400 block">{prod.metrics[0].value[isRtl ? 'ar' : 'en']}</span>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <Link
                      href={`/${language}/contact?product=${prod.id}`}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      <span>{t('طلب عرض تجريبي واستشارة', 'Request Demo & Pricing')}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/${language}/products/${prod.id}`}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{t('صفحة المنتج والمواصفات الكاملة', 'Full Product Specifications')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
