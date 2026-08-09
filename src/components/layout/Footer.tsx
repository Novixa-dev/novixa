'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../ui/Logo';
import { ViewType } from '../../types';
import { BRAND_INFO } from '../../content/data';
import { ArrowLeft, ArrowRight, Shield, Terminal, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, isRtl, t, toggleLanguage } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden text-slate-400 text-sm">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-600/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-md pt-2">
              {t(BRAND_INFO.subtagline.ar, BRAND_INFO.subtagline.en)}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{t('متاح لاستقبال مشاريع جديدة', 'Accepting New Projects')}</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-slate-400 font-mono">GCC & ME</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm font-display tracking-wide uppercase">
              {t('التنقل الرئيسية', 'Navigation')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${language}`} className="hover:text-blue-400 transition-colors">
                  {t('الرئيسية', 'Home')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/solutions`} className="hover:text-blue-400 transition-colors">
                  {t('الحلول البرمجية', 'Solutions')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/products`} className="hover:text-blue-400 transition-colors">
                  {t('المنتجات (SaaS)', 'Products')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/industries`} className="hover:text-blue-400 transition-colors">
                  {t('القطاعات المستهدفة', 'Industries')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/work`} className="hover:text-blue-400 transition-colors">
                  {t('أعمالنا المختارة والمعمارية', 'Selected Work')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Products */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm font-display tracking-wide uppercase">
              {t('المنتجات الرقمية', 'Products')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Link href={`/${language}/products/pulse-ai`} className="hover:text-blue-400 transition-colors">
                  Novixa Pulse (نبض)
                </Link>
                <span className="text-[10px] bg-teal-950 text-teal-400 px-1.5 py-0.5 rounded border border-teal-800/50">
                  SaaS
                </span>
              </li>
              <li>
                <Link href={`/${language}/products/restaurant-pos`} className="hover:text-blue-400 transition-colors">
                  Novixa Restaurant
                </Link>
              </li>
              <li>
                <Link href={`/${language}/products/booking-engine`} className="hover:text-blue-400 transition-colors">
                  Novixa Booking
                </Link>
              </li>
              <li>
                <Link href={`/${language}/products/gaming-arena`} className="hover:text-blue-400 transition-colors">
                  Novixa Gaming
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm font-display tracking-wide uppercase">
              {t('عن الشركة', 'Company')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${language}/about`} className="hover:text-blue-400 transition-colors">
                  {t('من نحن والفلسفة', 'About Us')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/insights`} className="hover:text-blue-400 transition-colors">
                  {t('مختبر المعرفة (Insights)', 'Insights Lab')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/start-project`} className="hover:text-blue-400 transition-colors text-blue-400 font-semibold">
                  {t('ابدأ مشروعك معنا', 'Start a Project')}
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>{t('English Version', 'النسخة العربية')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {BRAND_INFO.name}. {t('جميع الحقوق محفوظة.', 'All rights reserved.')}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>{t('صُنعت معايير الهندسة العالية', 'Engineered for Growth')}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
