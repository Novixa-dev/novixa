import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { PRODUCTS } from '../../content/data';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Reveal, RevealCard, HoverLift } from '@/components/ui/Reveal';

export const ProductsSection = ({ lang }: { lang: Language }) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* Section Header */}
        <Reveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                {t('منتجات رقمية نبنيها لتصبح أصولاً تشغيلية.', 'Digital products engineered as scalable operational assets.')}
              </h2>
            </div>

            <Link
              href={`/${language}/products`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group"
            >
              <span>{t('عرض كافة المنتجات والمنصات', 'View All Products & Systems')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 text-blue-600" />
            </Link>
          </div>
        </Reveal>

        {/* Alternating Products Showcase List ("صور وبجنبها كتابه وتعكس") */}
        <div className="space-y-12">
          {PRODUCTS.map((prod, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <RevealCard
                key={prod.id}
                delay={idx * 0.08}
                className="rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-right rtl:text-right ltr:text-left">
                  
                  {/* Text / Info Column */}
                  <div className={`lg:col-span-6 xl:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    

                    {/* Product Name & Title */}
                    <div className="space-y-2">
                      <span className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 block tracking-tight">
                        {prod.name[isRtl ? 'ar' : 'en']}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 font-display leading-snug">
                        {prod.title[isRtl ? 'ar' : 'en']}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-arabic">
                        {prod.description[isRtl ? 'ar' : 'en']}
                      </p>
                    </div>

                    {/* Operational Features */}
                    <div className="space-y-2.5 pt-1">
                      <span className="text-[11px] font-mono text-cyan-700 uppercase tracking-wider block font-bold">
                        {t('الميزات التشغيلية الرئيسية:', 'Key Product Capabilities:')}
                      </span>
                      <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-arabic">
                        {prod.features[isRtl ? 'ar' : 'en'].slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics preview row */}
                    {prod.metrics && prod.metrics.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 gap-4 text-center">
                        {prod.metrics.map((m, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-base sm:text-lg font-bold font-display text-cyan-700">
                              {m.value[isRtl ? 'ar' : 'en']}
                            </div>
                            <div className="text-[11px] text-slate-500 font-arabic mt-0.5 font-medium">
                              {m.label[isRtl ? 'ar' : 'en']}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom CTA */}
                    <div className="pt-2 flex flex-wrap items-center justify-end">

                      <HoverLift scale={1.03}>
                        <Link
                          href={`/${language}/products/${prod.id}`}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#38BDF8] bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] px-5 py-2.5 rounded-xl transition-all shadow-md shadow-cyan-950/20 cursor-pointer"
                        >
                          <span className="text-[#38BDF8]">{t('عرض تفاصيل المنتج والعرض التجريبي', 'Product Details & Demo')}</span>
                          <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
                        </Link>
                      </HoverLift>
                    </div>

                  </div>

                  {/* Visual Image Showcase Column */}
                  <div className={`lg:col-span-6 xl:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl group/img bg-slate-950 aspect-[16/10]">
                      <Image
                        src={`/images/products/${prod.id}-preview.jpg`}
                        alt={prod.name[isRtl ? 'ar' : 'en']}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transform group-hover/img:scale-105 transition-transform duration-700 ease-out"
                        priority={idx === 0}
                      />
                      {/* Subtle Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />


                    </div>
                  </div>

                </div>
              </RevealCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

