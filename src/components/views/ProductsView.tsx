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
  Layers,
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
  Layers,
};

export const ProductsView = ({ lang }: { lang: Language }) => {
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
        return 'bg-slate-100 border-slate-200 text-slate-700 font-semibold';
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Page Hero */}
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('منتجات رقمية نبنيها لتصبح أصولاً تشغيلية.', 'Digital products engineered as scalable operational assets.')}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
            {t(
              'منصات سحابية متخصصة ومكتملة الميزات، مصممة لمعالجة أعمق التحديات التشغيلية في القطاعات التجارية المختلفة مع توضيح حالة كل منتج بشفافية تامة.',
              'Domain-specific SaaS platforms built to eliminate operational friction, clearly labeled with real product status, demo links, and deployment options.'
            )}
          </p>
        </div>

        {/* Products List */}
        <div className="space-y-10">
          {PRODUCTS.map((prod) => {
            const IconComp = iconMap[prod.iconName] || Layers;
            return (
              <div
                key={prod.id}
                id={`product-${prod.id}`}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-right rtl:text-right ltr:text-left"
              >
                {/* Left (Main Info) */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 shadow-sm">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold font-display text-slate-900">
                          <Link href={`/${language}/products/${prod.id}`} className="hover:text-cyan-700 transition-colors">
                            {prod.name[isRtl ? 'ar' : 'en']}
                          </Link>
                        </h2>
                        <span className="text-xs text-cyan-700 font-semibold font-arabic">
                          {prod.category[isRtl ? 'ar' : 'en']}
                        </span>
                      </div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${getStatusBadgeClass(prod.status)}`}>
                      {prod.statusLabel[isRtl ? 'ar' : 'en']}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 font-arabic leading-relaxed">
                    {prod.description[isRtl ? 'ar' : 'en']}
                  </p>

                  {/* Problem & Value Box */}
                  {prod.problemSolved && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-arabic">
                      <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-1">
                        <span className="text-rose-700 font-mono font-bold block">{t('المشكلة المحلولة:', 'Problem Solved:')}</span>
                        <span className="text-slate-700">{t(prod.problemSolved.ar, prod.problemSolved.en)}</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/80 space-y-1">
                        <span className="text-teal-700 font-mono font-bold block">{t('الأثر التجاري:', 'Business Value:')}</span>
                        <span className="text-slate-700">{t(prod.businessValue?.ar || '', prod.businessValue?.en || '')}</span>
                      </div>
                    </div>
                  )}

                  {/* Core Features */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                      {t('الميزات التشغيلية للمنصة:', 'Core Platform Capabilities:')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 font-arabic">
                      {prod.features[isRtl ? 'ar' : 'en'].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right (Actions & Deployment) */}
                <div className="lg:col-span-4 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/90 space-y-5 text-right rtl:text-right ltr:text-left">
                  {/* Product Preview Image */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-slate-200 shadow-md bg-slate-100">
                    <Image
                      src={`/images/products/${prod.id}-preview.jpg`}
                      alt={prod.name[isRtl ? 'ar' : 'en']}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="space-y-2 border-b border-slate-200/80 pb-4">
                    <span className="text-xs font-mono text-slate-500 uppercase block font-semibold">{t('القطاعات المستهدفة:', 'Target Verticals:')}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {prod.targetIndustries[isRtl ? 'ar' : 'en'].map((ind, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 font-arabic font-medium shadow-2xs">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  {prod.metrics && prod.metrics.length > 0 && (
                    <div className="space-y-1 p-3.5 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
                      <span className="text-[10px] text-slate-500 font-mono uppercase block font-semibold">{prod.metrics[0].label[isRtl ? 'ar' : 'en']}</span>
                      <span className="text-xl font-extrabold font-display text-cyan-700 block">{prod.metrics[0].value[isRtl ? 'ar' : 'en']}</span>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <Link
                      href={`/${language}/contact?product=${prod.id}`}
                      className="w-full py-3 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-[#38BDF8]/20 cursor-pointer"
                    >
                      <span>{t('طلب عرض تجريبي واستشارة', 'Request Demo & Pricing')}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/${language}/products/${prod.id}`}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>{t('صفحة المنتج والمواصفات الكاملة', 'Full Product Specifications')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-cyan-600" />
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
