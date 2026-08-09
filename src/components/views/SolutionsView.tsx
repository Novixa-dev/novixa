'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { SOLUTIONS } from '../../content/data';
import { ViewType } from '../../types';
import { 
  Building2, Cloud, ShoppingCart, CalendarCheck, Sparkles, Cpu, 
  CheckCircle2, ArrowLeft, ArrowRight, Zap, Shield, ArrowUpRight 
} from 'lucide-react';

interface SolutionsViewProps {
  onNavigate?: (view: ViewType) => void;
}

export const SolutionsView: React.FC<SolutionsViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSolutions = selectedCategory === 'all'
    ? SOLUTIONS
    : SOLUTIONS.filter((s) => s.id === selectedCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return Building2;
      case 'Cloud': return Cloud;
      case 'ShoppingCart': return ShoppingCart;
      case 'CalendarCheck': return CalendarCheck;
      case 'Sparkles': return Sparkles;
      case 'Cpu': return Cpu;
      default: return Cpu;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
            <span>{t('منظومة الحلول الهندسية', 'Engineering Solutions Catalogue')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            {t('حلول برمجية مخصصة للتحول الرقمي والنمو.', 'Custom Software Solutions Engineered for Scale.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {t(
              'نحن لا نكتفي بإنشاء الواجهات؛ بل نبني المحرك التشغيلي الذي يدير مبيعاتك، مخزونك، وعلاقاتك مع العملاء بكفاءة مطلقة.',
              'Beyond simple websites: we engineer operational backbones unifying orders, multi-branch inventory, and automated workflows.'
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t('جميع الحلول', 'All Solutions')}
          </button>
          {SOLUTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedCategory(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === s.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {t(s.title.ar, s.title.en)}
            </button>
          ))}
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((sol) => {
            const IconComp = getIcon(sol.iconName);
            return (
              <div
                key={sol.id}
                className="glass-card glass-card-hover rounded-2xl p-7 border border-slate-800 flex flex-col justify-between gap-6 text-right rtl:text-right ltr:text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/80 flex items-center justify-center text-blue-400 font-bold">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-teal-400">
                      {t(sol.badge.ar, sol.badge.en)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white">
                    {t(sol.title.ar, sol.title.en)}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
                    {t(sol.description.ar, sol.description.en)}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">{t('المواصفات التقنية:', 'Technical Specs:')}</span>
                    <ul className="space-y-1.5 text-xs text-slate-200 font-arabic">
                      {sol.features[isRtl ? 'ar' : 'en'].map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-teal-300 font-arabic">{t(sol.businessImpact.ar, sol.businessImpact.en)}</span>
                  <Link
                    href={`/${language}/start-project`}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              {t('هل تحتاج معمارية خاصة بنموذج عملك؟', 'Need a tailored architecture for your domain?')}
            </h3>
            <p className="text-xs text-slate-300 font-arabic mt-1">
              {t('مهندسو نوڤيكسا جاهزون لمراجعة المتطلبات وتقديم مخطط الملاءمة الهندسية.', 'Our architects are ready to review your requirements.')}
            </p>
          </div>
          <Link
            href={`/${language}/start-project`}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all shrink-0"
          >
            {t('طلب مخطط المعمارية', 'Request Specs Consultation')}
          </Link>
        </div>

      </div>
    </div>
  );
};
