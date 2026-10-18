'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';

interface HeroSectionProps {
  servicesCount?: number;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

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
          'بيئة عمل برمجية احترافية وشاشة تطوير مع إطلالة بانورامية ساحرة على ميناء وجبال عدن عند الغروب',
          'Professional software engineering workspace overlooking a panoramic sunset view of Aden harbor and mountains'
        )}
      />

      {/* 2. Directional Ambient Tint to make text 100% crisp while keeping city luminous */}
      <div className="absolute inset-0 bg-[#0B1726]/40 sm:bg-transparent bg-gradient-to-t sm:bg-gradient-to-l rtl:sm:bg-gradient-to-l ltr:sm:bg-gradient-to-r from-[#0B1726]/95 via-[#0B1726]/60 to-transparent sm:from-black/60 sm:via-black/30 sm:to-transparent pointer-events-none" />

      {/* Main Structural Framing Container aligned to the reference composition */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-28 sm:pt-28 md:pt-24 lg:pt-28 xl:pt-32 pb-8 sm:pb-6 md:pb-0">
        <div className="flex justify-start">
          
          {/* Editorial Content Block on the right with staggered entrance */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
            className="w-full sm:w-[480px] md:w-[460px] lg:w-[520px] xl:w-[580px] space-y-3 sm:space-y-3.5 lg:space-y-4 text-right rtl:text-right ltr:text-left"
          >
            

            {/* Main Display Headline */}
            <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl md:text-[28px] lg:text-[36px] xl:text-[42px] font-extrabold font-display leading-[1.2] tracking-normal text-white">
              <span>{t('حلول تقنية عملية للأعمال', 'Practical Tech Solutions for Business')}</span>
              <br />
              <span className="text-[#38BDF8]">
                {t('في اليمن والمنطقة', 'in Yemen & the Region')}
              </span>
            </motion.h1>

            {/* Supporting Heading */}
            <motion.h2 variants={itemVariants} className="text-sm sm:text-base lg:text-[16.5px] font-bold font-display text-white/95 leading-snug whitespace-pre-line">
              {t(
                'نبني الأنظمة والمنتجات الرقمية\nالتي تجعل أعمالك تعمل بشكل أفضل.',
                'We build the software systems and digital products\nthat help businesses operate better.'
              )}
            </motion.h2>

            {/* Supporting Paragraph */}
            <motion.p variants={itemVariants} className="text-slate-200/90 text-xs sm:text-sm leading-relaxed font-arabic font-normal max-w-xl">
              {t(
                'من تطوير الأنظمة المخصصة إلى الحلول الجاهزة والنشر والاستضافة والصيانة، نحول احتياجات الأعمال إلى برمجيات عملية قابلة للنمو.',
                'From custom software development to turnkey solutions, deployment, hosting and maintenance, we turn business needs into scalable practical software.'
              )}
            </motion.p>

            {/* Action Anchors: Dual Pill CTAs */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              {/* Primary CTA */}
              <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href={`/${language}/contact`}
                  className="w-full group inline-flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-[#0B1726] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl sm:rounded-full shadow-lg shadow-[#38BDF8]/25 transition-all duration-150 cursor-pointer min-h-[44px]"
                >
                  <span>{t('ابدأ مشروعك الآن', 'Start Your Project')}</span>
                  <ArrowIcon className="w-4 h-4 text-[#0B1726] stroke-[2.4] transition-transform duration-150 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href={`/${language}/solutions`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1726]/80 hover:bg-[#13263B] border border-[#38BDF8]/40 hover:border-[#38BDF8] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl sm:rounded-full transition-all duration-150 cursor-pointer min-h-[44px]"
                >
                  <span>{t('استكشف الحلول الجاهزة', 'Explore Ready Solutions')}</span>
                  <LayoutGrid className="w-4 h-4 text-white" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Additional Custom System Link */}
            <motion.div variants={itemVariants} className="pt-1.5">
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
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
