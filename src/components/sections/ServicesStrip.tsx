'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Rocket, Box, Cloud, ShieldCheck } from 'lucide-react';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-slate-200/80">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group py-5 px-3 sm:px-5 flex items-center justify-center gap-3.5 transition-colors duration-150 hover:bg-slate-50/80 text-right rtl:text-right ltr:text-left cursor-pointer"
              >
                {/* 1. Outline Navy Icon (renders on the right in RTL) */}
                <div className="shrink-0 text-[#0B1726] transition-transform duration-200 group-hover:scale-105">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                </div>

                {/* 2. Text Content */}
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm xl:text-[14.5px] font-bold font-display text-[#0B1726] leading-snug group-hover:text-blue-600 transition-colors">
                    {t(service.titleAr, service.titleEn)}
                  </h3>
                  <p className="text-[10.5px] sm:text-[11px] xl:text-[11.5px] text-slate-500 font-arabic font-normal mt-0.5 leading-tight">
                    {t(service.descAr, service.descEn)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
