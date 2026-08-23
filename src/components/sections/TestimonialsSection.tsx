'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Pause,
  Play
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TESTIMONIALS } from '../../content/data';
import { Testimonial, ViewType } from '../../types';
import { usePerceivedLoading } from '../../hooks/usePerceivedLoading';
import { trackEvent } from '../../lib/analytics';

interface TestimonialsSectionProps {
  onNavigate?: (view: ViewType) => void;
}

export function TestimonialsSection({ onNavigate }: TestimonialsSectionProps) {
  const { isRtl, t, language } = useLanguage();
  const { isLoading } = usePerceivedLoading([], { initialDelay: 150 });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [direction, setDirection] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter testimonials based on selected industry tab
  const filteredTestimonials = React.useMemo(() => {
    if (selectedIndustry === 'all') return TESTIMONIALS;
    return TESTIMONIALS.filter((item) => {
      const ind = item.industry.en.toLowerCase();
      if (selectedIndustry === 'platforms' && (ind.includes('logistics') || ind.includes('supply'))) return true;
      if (selectedIndustry === 'hospitality' && (ind.includes('restaurant') || ind.includes('hospitality'))) return true;
      if (selectedIndustry === 'healthcare' && (ind.includes('health') || ind.includes('clinic'))) return true;
      if (selectedIndustry === 'saas' && (ind.includes('saas') || ind.includes('cloud'))) return true;
      if (selectedIndustry === 'commerce' && (ind.includes('commerce') || ind.includes('wholesale') || ind.includes('entertainment'))) return true;
      return false;
    });
  }, [selectedIndustry]);

  // Ensure current index is within bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedIndustry]);

  const activeTestimonial: Testimonial = filteredTestimonials[currentIndex] || filteredTestimonials[0] || TESTIMONIALS[0];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    trackEvent('testimonial_carousel_next', { index: (currentIndex + 1) % filteredTestimonials.length });
  }, [filteredTestimonials.length, currentIndex]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
    trackEvent('testimonial_carousel_prev', { index: (currentIndex - 1 + filteredTestimonials.length) % filteredTestimonials.length });
  }, [filteredTestimonials.length, currentIndex]);

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    trackEvent('testimonial_select', { index: idx });
  };

  // Autoplay management
  useEffect(() => {
    if (!isAutoPlaying || filteredTestimonials.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, filteredTestimonials.length, handleNext]);

  const handleActionClick = (targetView: ViewType) => {
    if (onNavigate) {
      onNavigate(targetView);
    } else {
      window.location.href = `/${language}/${targetView === 'start' ? 'start-project' : targetView}`;
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      if (isRtl) handlePrev();
      else handleNext();
    } else if (e.key === 'ArrowLeft') {
      if (isRtl) handleNext();
      else handlePrev();
    }
  };

  const industriesTabs = [
    { id: 'all', label: { ar: 'كافة قصص النجاح', en: 'All Stories' } },
    { id: 'platforms', label: { ar: 'اللوجستيات والمنصات', en: 'Platforms & Logistics' } },
    { id: 'hospitality', label: { ar: 'المطاعم والضيافة', en: 'Hospitality & POS' } },
    { id: 'healthcare', label: { ar: 'الرعاية الصحية', en: 'Healthcare' } },
    { id: 'saas', label: { ar: 'المنتجات السحابية SaaS', en: 'Cloud SaaS' } },
    { id: 'commerce', label: { ar: 'التجارة والحجوزات', en: 'Commerce & Venues' } },
  ];

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section 
      id="testimonials-section" 
      className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Client Testimonials and Success Stories Carousel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('شهادات الشركاء والعملاء', 'Client Feedback & Verified Outcomes')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('نتائج حقيقية لشركات وثقت في هندسة نوڤيكسا.', 'Real operational results from enterprise partners.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t(
                'آراء قادة العمليات والمدراء التنفيذيين بعد نشر أنظمتهم الرقمية في بيئة التشغيل الحية.',
                'Direct feedback from operational leaders and founders who scaled their core systems with Novixa.'
              )}
            </p>
          </div>

          {/* Carousel Navigation Buttons & Autoplay Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isAutoPlaying ? t('إيقاف التبديل التلقائي', 'Pause Autoplay') : t('تشغيل التبديل التلقائي', 'Start Autoplay')}
              aria-label="Toggle Autoplay"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="h-4 w-px bg-slate-800 mx-0.5" />

            <button
              onClick={handlePrev}
              disabled={filteredTestimonials.length <= 1}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous Testimonial"
              id="prev-testimonial-btn"
            >
              <PrevIcon className="w-4 h-4" />
            </button>

            <span className="px-2 text-xs font-mono text-slate-400 select-none">
              {currentIndex + 1} / {filteredTestimonials.length}
            </span>

            <button
              onClick={handleNext}
              disabled={filteredTestimonials.length <= 1}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next Testimonial"
              id="next-testimonial-btn"
            >
              <NextIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Industry Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {industriesTabs.map((tab) => {
            const isSelected = selectedIndustry === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedIndustry(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {t(tab.label.ar, tab.label.en)}
              </button>
            );
          })}
        </div>

        {/* Main Carousel Presentation Card */}
        {isLoading ? (
          <div className="glass-card rounded-2xl p-8 sm:p-12 border border-slate-800 bg-slate-900/60 animate-pulse space-y-6">
            <div className="h-6 bg-slate-800 rounded w-1/4" />
            <div className="h-20 bg-slate-800 rounded w-full" />
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="h-14 bg-slate-800 rounded" />
              <div className="h-14 bg-slate-800 rounded" />
              <div className="h-14 bg-slate-800 rounded" />
            </div>
          </div>
        ) : (
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTestimonial.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="glass-card rounded-2xl p-6 sm:p-10 lg:p-12 border border-slate-800 bg-slate-900/70 shadow-xl relative overflow-hidden"
              >
                {/* Background Watermark Quote Icon */}
                <Quote className="w-32 h-32 text-slate-800/30 absolute -top-4 left-4 rtl:left-4 ltr:right-4 pointer-events-none select-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  
                  {/* Testimonial Core Content (Left in LTR, Right in RTL) */}
                  <div className="lg:col-span-8 space-y-6 text-right rtl:text-right ltr:text-left">
                    
                    {/* Meta Badge & Project Type */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-md text-xs font-mono bg-slate-950 text-blue-400 border border-slate-800">
                        {t(activeTestimonial.industry.ar, activeTestimonial.industry.en)}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                        {t(activeTestimonial.projectType.ar, activeTestimonial.projectType.en)}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 rtl:mr-auto ltr:ml-auto">
                        {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* The Quote */}
                    <p className="text-lg sm:text-xl lg:text-2xl text-slate-100 font-display font-medium leading-relaxed">
                      "{t(activeTestimonial.quote.ar, activeTestimonial.quote.en)}"
                    </p>

                    {/* Operational Outcome */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                      <div className="text-[11px] font-mono font-semibold text-blue-400 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{t('الأثر التشغيلي المحقق', 'Operational Outcome & Impact')}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-normal">
                        {t(activeTestimonial.outcome.ar, activeTestimonial.outcome.en)}
                      </p>
                    </div>

                    {/* Client Identity & Signature */}
                    <div className="flex items-center gap-4 pt-2 border-t border-slate-800/80">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400 font-bold font-display text-base shadow-sm">
                        {activeTestimonial.avatarInitials}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-white text-base">
                            {t(activeTestimonial.clientName.ar, activeTestimonial.clientName.en)}
                          </h4>
                          {activeTestimonial.verifiedProject && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{t('مشروع معتمد', 'Verified')}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">
                          {t(activeTestimonial.clientRole.ar, activeTestimonial.clientRole.en)} • <span className="text-slate-300 font-medium">{t(activeTestimonial.company.ar, activeTestimonial.company.en)}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Metrics & Architecture Sidebar Card */}
                  <div className="lg:col-span-4 bg-slate-950/90 rounded-xl p-6 border border-slate-800 space-y-5 text-right rtl:text-right ltr:text-left">
                    <div className="text-xs font-mono font-semibold text-slate-400 border-b border-slate-800 pb-3 flex items-center justify-between">
                      <span>{t('مؤشرات أداء النظام', 'Verified System Metrics')}</span>
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    </div>

                    {/* Metrics Grid */}
                    <div className="space-y-3">
                      {activeTestimonial.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx}
                          className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                        >
                          <div className="text-xs text-slate-400 font-arabic truncate">
                            {t(metric.label.ar, metric.label.en)}
                          </div>
                          <div className="text-lg font-bold font-display text-blue-400 font-mono">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Call to Action Inside Card */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleActionClick('start')}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-sm group"
                      >
                        <span>{t('ابنِ نظامك المشابه', 'Engineer Similar System')}</span>
                        <ForwardArrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Preview Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
              {filteredTestimonials.map((item, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(idx)}
                    className={`p-3 rounded-xl border text-right rtl:text-right ltr:text-left transition-all relative ${
                      isCurrent
                        ? 'bg-slate-900 border-blue-500 shadow-sm ring-1 ring-blue-500/40'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="w-6 h-6 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-bold text-blue-400 font-display">
                        {item.avatarInitials}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        0{idx + 1}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {t(item.clientName.ar, item.clientName.en)}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {t(item.company.ar, item.company.en)}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dot Pagination Progress Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-blue-500'
                      : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
