'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Rocket, Box, Cloud, ShieldCheck } from 'lucide-react';

import { RevealGroup, RevealItem } from '../ui/Reveal';

export const ServicesStrip: React.FC = () => {
  const { language, t } = useLanguage();

  const services = [
    {
      id: 'custom-software',
      titleAr: 'تطوير الأنظمة المخصصة',
      titleEn: 'Custom Software Development',
      descAr: 'حلول مصممة خصيصاً لاحتياجاتك',
      descEn: 'Tailored solutions built for your exact needs',
      icon: Rocket,
      href: `/${language}/services`,
    },
    {
      id: 'ready-solutions',
      titleAr: 'الحلول الجاهزة',
      titleEn: 'Ready Solutions',
      descAr: 'منتجات رقمية جاهزة للاستخدام',
      descEn: 'Turnkey digital products ready to deploy',
      icon: Box,
      href: `/${language}/solutions`,
    },
    {
      id: 'deployment-hosting',
      titleAr: 'النشر والاستضافة',
      titleEn: 'Cloud & Hosting',
      descAr: 'بنية تحتية آمنة وموثوقة',
      descEn: 'Secure, resilient cloud infrastructure',
      icon: Cloud,
      href: `/${language}/services`,
    },
    {
      id: 'maintenance-support',
      titleAr: 'الصيانة والدعم',
      titleEn: 'Maintenance & Support',
      descAr: 'دعم مستمر لنمو أعمالك',
      descEn: 'Continuous SLA support for business growth',
      icon: ShieldCheck,
      href: `/${language}/services`,
    },
  ];

  return (
    <section className="relative bg-white border-y border-slate-200/80 shadow-sm z-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-0 py-3 sm:py-0 sm:divide-x rtl:sm:divide-x-reverse divide-slate-200/80" stagger={0.06}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem key={service.id} hoverLift={true} className="h-full">
                <Link
                  href={service.href}
                  className="group h-full p-3 sm:py-5 sm:px-5 flex flex-col sm:flex-row items-center sm:items-center justify-start sm:justify-center gap-2 sm:gap-3.5 transition-all duration-150 bg-slate-50/60 sm:bg-transparent hover:bg-slate-100/80 sm:hover:bg-slate-50/80 border sm:border-0 border-slate-200/70 rounded-xl sm:rounded-none text-center sm:text-right rtl:sm:text-right ltr:sm:text-left cursor-pointer shadow-xs sm:shadow-none"
                >
                  {/* 1. Outline Navy Icon */}
                  <div className="shrink-0 text-cyan-600 sm:text-[#0B1726] transition-transform duration-200 group-hover:scale-110 p-1.5 sm:p-0 rounded-lg bg-cyan-50 sm:bg-transparent">
                    <Icon className="w-5 h-5 sm:w-8 sm:h-8 stroke-[2] sm:stroke-[1.8]" />
                  </div>

                  {/* 2. Text Content */}
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm xl:text-[14.5px] font-bold font-display text-[#0B1726] leading-snug group-hover:text-blue-600 transition-colors">
                      {t(service.titleAr, service.titleEn)}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] xl:text-[11.5px] text-slate-500 font-arabic font-normal mt-0.5 leading-tight line-clamp-1 sm:line-clamp-none">
                      {t(service.descAr, service.descEn)}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
};
