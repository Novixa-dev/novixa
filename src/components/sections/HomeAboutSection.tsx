'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { Layers, Languages, MapPin } from 'lucide-react';
import { READY_SOLUTIONS } from '../../content/data';

import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';

export const HomeAboutSection: React.FC = () => {
  const { t } = useLanguage();

  // Facts a visitor can check on this site. Client, project and years-of-experience
  // counts were removed because none of them is documented (see AGENTS.md).
  const stats = [
    {
      id: 'solutions',
      value: String(READY_SOLUTIONS.length),
      labelAr: 'حلول جاهزة قابلة للتخصيص',
      labelEn: 'Ready-to-customize solutions',
      icon: Layers,
    },
    {
      id: 'languages',
      value: 'AR · EN',
      labelAr: 'واجهات عربية وإنجليزية',
      labelEn: 'Arabic & English interfaces',
      icon: Languages,
    },
    {
      id: 'base',
      value: t('المكلا', 'Mukalla'),
      labelAr: 'مقرّنا في حضرموت، اليمن',
      labelEn: 'Based in Hadramout, Yemen',
      icon: MapPin,
    },
  ];

  return (
    <section className="relative bg-white py-14 sm:py-20 lg:py-24 overflow-hidden z-20 border-b border-slate-200/80">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* 1. Text Content Column (In RTL, this renders on the RIGHT) */}
          <Reveal direction="start" className="lg:col-span-6 xl:col-span-7 space-y-4 sm:space-y-5 text-right rtl:text-right ltr:text-left">
            {/* Eyebrow */}
            <div className="text-[#35C8F2] text-xs sm:text-sm font-bold font-arabic">
              {t('من نحن', 'About Us')}
            </div>

            {/* Display Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-[#0B1726] tracking-tight leading-snug">
              {t('نوڤيكسا', 'Novixa')}
            </h2>

            {/* Body Description */}
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-arabic leading-relaxed max-w-2xl">
              {t(
                'نحن فريق من المطورين والمهندسين نؤمن بأن التقنية يمكن أن تصنع فرقاً حقيقياً. نقدم حلول برمجية مبتكرة تساعد الشركات والمؤسسات في اليمن والمنطقة على التحول الرقمي والنمو المستدام.',
                'We are a team of software developers and engineers who believe technology can make a real difference. We deliver innovative software solutions helping businesses and institutions in Yemen and the region achieve digital transformation and sustainable growth.'
              )}
            </p>

            {/* Stats Row with 3 Columns separated by thin vertical dividers */}
            <div className="pt-4 sm:pt-6">
              <RevealGroup className="grid grid-cols-3 divide-x rtl:divide-x-reverse divide-slate-200/80" stagger={0.08}>
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <RevealItem
                      key={stat.id}
                      hoverLift={true}
                      className="px-2 sm:px-4 py-1 flex items-center justify-start gap-2.5 sm:gap-3 text-right rtl:text-right ltr:text-left"
                    >
                      {/* Icon in subtle blue rounded square */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#35C8F2]/10 border border-[#35C8F2]/20 text-[#0B1726] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0B1726] stroke-[2]" />
                      </div>

                      {/* Value and Label */}
                      <div className="min-w-0">
                        <div dir="ltr" className="text-base sm:text-xl lg:text-2xl font-extrabold font-display text-[#0B1726] leading-none text-right rtl:text-right ltr:text-left">
                          {stat.value}
                        </div>
                        <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-arabic mt-1 leading-tight">
                          {t(stat.labelAr, stat.labelEn)}
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </Reveal>

          {/* 2. Rectangular Workspace Image Column (In RTL, this renders on the LEFT) */}
          <Reveal direction="scale" delay={0.1} className="lg:col-span-6 xl:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg shadow-slate-900/5 group">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src="/images/about-workspace-aden.jpg"
                  alt={t('بيئة عمل وهندسة البرمجيات في نوڤيكسا', 'Novixa Engineering and Software Development Workspace')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  priority={false}
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
export default HomeAboutSection;
