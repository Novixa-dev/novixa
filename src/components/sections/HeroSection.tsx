'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';

interface HeroSectionProps {
  servicesCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ servicesCount: _servicesCount }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative w-full flex-1 min-h-[560px] lg:min-h-0 overflow-hidden flex items-center bg-[#0B1726]">
      {/* 1. Full-Width Panoramic Background Image scaled to cover full taller hero height */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[position:left_center] md:bg-center transition-all duration-500"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        role="img"
        aria-label={t(
          'بيئة عمل برمجية احترافية مع إطلالة بانورامية على مدينة وميناء عدن عند الغروب',
          'Professional software workspace overlooking coastal city skyline at sunset'
        )}
      />

      {/* 2. Directional Ambient Tint to make text 100% crisp while keeping sunset & city luminous */}
      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-l rtl:sm:bg-gradient-to-l ltr:sm:bg-gradient-to-r from-[#0B1726]/95 via-[#0B1726]/60 to-transparent sm:from-black/60 sm:via-black/30 sm:to-transparent pointer-events-none" />

      {/* Main Structural Framing Container aligned to the reference composition */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-28 sm:pt-28 md:pt-24 lg:pt-28 xl:pt-32 pb-8 sm:pb-6 md:pb-0">
        <div className="flex justify-start">
          
          {/* Editorial Content Block on the right */}
          <div className="w-full sm:w-[480px] md:w-[460px] lg:w-[520px] xl:w-[580px] space-y-3 sm:space-y-3.5 lg:space-y-4 text-right rtl:text-right ltr:text-left">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-[11px] sm:text-xs font-mono font-semibold tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>NOVIXA ENGINEERING</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-[28px] lg:text-[36px] xl:text-[42px] font-extrabold font-display leading-[1.2] tracking-normal text-white">
              <span>{t('حلول تقنية عملية للأعمال', 'Practical Tech Solutions for Business')}</span>
              <br />
              <span className="text-[#38BDF8]">
                {t('في اليمن والمنطقة', 'in Yemen & the Region')}
              </span>
            </h1>

            {/* Supporting Heading */}
            <h2 className="text-sm sm:text-base lg:text-[16.5px] font-bold font-display text-white/95 leading-snug whitespace-pre-line">
              {t(
                'نبني الأنظمة والمنتجات الرقمية\nالتي تجعل أعمالك تعمل بشكل أفضل.',
                'We build the software systems and digital products\nthat help businesses operate better.'
              )}
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-slate-200/90 text-xs sm:text-sm leading-relaxed font-arabic font-normal max-w-xl">
              {t(
                'من تطوير الأنظمة المخصصة إلى الحلول الجاهزة والنشر والاستضافة والصيانة، نحول احتياجات الأعمال إلى برمجيات عملية قابلة للنمو.',
                'From custom software development to turnkey solutions, deployment, hosting and maintenance, we turn business needs into scalable practical software.'
              )}
            </p>

            {/* Action Anchors: Dual Pill CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              {/* Primary CTA */}
              <Link
                href={`/${language}/contact`}
                className="group inline-flex items-center justify-center gap-2 bg-[#56CFE1] hover:bg-[#38BDF8] active:bg-[#00B4D8] text-[#0B1726] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl sm:rounded-full shadow-lg shadow-[#56CFE1]/25 transition-all duration-150 cursor-pointer min-h-[44px]"
              >
                <span>{t('ابدأ مشروعك الآن', 'Start Your Project')}</span>
                <ArrowIcon className="w-4 h-4 text-[#0B1726] stroke-[2.4] transition-transform duration-150 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href={`/${language}/solutions`}
                className="inline-flex items-center justify-center gap-2 bg-[#0B1726]/80 hover:bg-[#13263B] border border-[#56CFE1]/40 hover:border-[#38BDF8] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl sm:rounded-full transition-all duration-150 cursor-pointer min-h-[44px]"
              >
                <span>{t('استكشف الحلول الجاهزة', 'Explore Ready Solutions')}</span>
                <LayoutGrid className="w-4 h-4 text-white" />
              </Link>
            </div>

            {/* Additional Custom System Link */}
            <div className="pt-1.5">
              <Link
                href={`/${language}/contact`}
                className="group inline-flex items-center gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-slate-200 hover:text-white transition-colors"
              >
                <span>{t('أحتاج بناء نظام مخصص', 'I need a custom system built')}</span>
                <ArrowIcon className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-slate-400 group-hover:text-[#38BDF8] rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5 transition-all" />
              </Link>
              <div className="text-[9.5px] sm:text-[10px] lg:text-[11px] text-slate-400 font-arabic mt-0.5">
                {t('هندسة معمارية خاصة لنموذج عملك الفريد من الصفر.', 'Custom architecture for your unique business model from scratch.')}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
