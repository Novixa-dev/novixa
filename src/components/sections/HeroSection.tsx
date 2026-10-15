'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, LayoutGrid } from 'lucide-react';

interface HeroSectionProps {
  servicesCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ servicesCount: _servicesCount }) => {
  const { language, t } = useLanguage();

  return (
    <section className="relative w-full aspect-auto min-h-[640px] md:min-h-0 md:aspect-[1024/414] overflow-hidden flex items-center bg-[#0B1726]">
      {/* 1. Full-Width Panoramic Background Image with Exact 1024x414 Proportions */}
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
      <div className="absolute inset-0 bg-gradient-to-l rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-black/50 via-black/25 to-transparent pointer-events-none" />

      {/* Main Structural Framing Container aligned to the reference composition */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-16 sm:pt-20 md:pt-14 lg:pt-16 xl:pt-20 pb-6 md:pb-0">
        <div className="flex justify-start">
          
          {/* Editorial Content Block on the right */}
          <div className="w-full sm:w-[480px] md:w-[460px] lg:w-[520px] xl:w-[580px] space-y-2 sm:space-y-2.5 lg:space-y-3.5 xl:space-y-4 text-right rtl:text-right ltr:text-left">
            
            {/* Eyebrow Label */}
            <div className="text-[#38BDF8] text-[10px] sm:text-[11px] lg:text-xs font-mono font-semibold tracking-[0.2em] uppercase">
              NOVIXA ENGINEERING
            </div>

            {/* Main Display Headline */}
            <h1 className="text-xl sm:text-2xl md:text-[26px] lg:text-[34px] xl:text-[42px] font-extrabold font-display leading-[1.16] tracking-normal text-white">
              <span>{t('حلول تقنية عملية للأعمال', 'Practical Tech Solutions for Business')}</span>
              <br />
              <span className="text-[#38BDF8]">
                {t('في اليمن والمنطقة', 'in Yemen & the Region')}
              </span>
            </h1>

            {/* Supporting Heading */}
            <h2 className="text-xs sm:text-xs md:text-[13px] lg:text-[15px] xl:text-[16.5px] font-bold font-display text-white/95 leading-snug whitespace-pre-line">
              {t(
                'نبني الأنظمة والمنتجات الرقمية\nالتي تجعل أعمالك تعمل بشكل أفضل.',
                'We build the software systems and digital products\nthat help businesses operate better.'
              )}
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-slate-200 text-[10px] sm:text-[10.5px] md:text-[11px] lg:text-[12px] xl:text-[13px] leading-relaxed font-arabic font-normal max-w-xl whitespace-pre-line">
              {t(
                'من تطوير الأنظمة المخصصة إلى الحلول الجاهزة والنشر والاستضافة والصيانة،\nنحول احتياجات الأعمال إلى برمجيات عملية قابلة للنمو.',
                'From custom software development to turnkey solutions, deployment, hosting and maintenance,\nwe turn business needs into scalable practical software.'
              )}
            </p>

            {/* Action Anchors: Dual Pill CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Primary CTA (Cyan Pill on the right with dark text and right arrow) */}
              <Link
                href={`/${language}/contact`}
                dir="ltr"
                className="group inline-flex items-center gap-2 bg-[#56CFE1] hover:bg-[#38BDF8] active:bg-[#00B4D8] text-[#0B1726] font-bold text-[11px] sm:text-xs lg:text-[13px] px-5 sm:px-6 lg:px-7 py-2 sm:py-2.5 lg:py-3 rounded-full shadow-lg shadow-[#56CFE1]/25 transition-all duration-150 cursor-pointer"
              >
                <span>{t('ابدأ مشروعك', 'Start Your Project')}</span>
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#0B1726] stroke-[2.4] transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>

              {/* Secondary CTA (Dark Pill on the left with white text and grid icon on the right) */}
              <Link
                href={`/${language}/solutions`}
                dir="ltr"
                className="inline-flex items-center gap-2 bg-[#0B1726]/80 hover:bg-[#13263B] border border-[#56CFE1]/40 hover:border-[#38BDF8] text-white font-semibold text-[11px] sm:text-xs lg:text-[13px] px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full transition-all duration-150 cursor-pointer"
              >
                <span>{t('استكشف الحلول الجاهزة', 'Explore Ready Solutions')}</span>
                <LayoutGrid className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" />
              </Link>
            </div>

            {/* Additional Custom System Link */}
            <div className="pt-1.5">
              <Link
                href={`/${language}/contact`}
                dir="ltr"
                className="group inline-flex items-center gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-slate-200 hover:text-white transition-colors"
              >
                <span>{t('أحتاج بناء نظام مخصص', 'I need a custom system built')}</span>
                <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-slate-400 group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all" />
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
