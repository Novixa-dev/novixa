'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../ui/Logo';
import { BRAND_INFO } from '../../content/data';
import { SOCIAL_LINKS } from '../../data/navigation';
import { ArrowLeft, ArrowRight, Shield, Terminal, Globe, Linkedin, Github, Twitter } from 'lucide-react';

const socialIconMap = {
  Linkedin: Linkedin,
  Github: Github,
  Twitter: Twitter,
};

export const Footer: React.FC = () => {
  const { language, isRtl, t, toggleLanguage } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden text-slate-300 text-sm">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-600/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Col 1 & 2: Brand Info & Social Links */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-md pt-2 font-arabic">
              {t(BRAND_INFO.subtagline.ar, BRAND_INFO.subtagline.en)}
            </p>

            <div className="pt-1 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{t('متاح لاستقبال مشاريع جديدة', 'Accepting New Projects')}</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-slate-300 font-mono">GCC & Global</span>
            </div>

            {/* Social Links Row in Footer */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
                {t('تابع منصاتنا التقنية', 'Connect with Us')}
              </div>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = socialIconMap[social.iconName] || Globe;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      aria-label={`Novixa on ${social.name}`}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm font-display tracking-wide uppercase">
              {t('التنقل الرئيسي', 'Navigation')}
            </p>
            <nav aria-label={t('التنقل الرئيسي', 'Navigation')}>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href={`/${language}`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('الرئيسية', 'Home')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/about`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('عن الشركة', 'About Novixa')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/solutions`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('الحلول والخدمات', 'Solutions & Services')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/work`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('أعمالنا المختارة', 'Selected Work')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/team`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('فريق العمل', 'Engineering Team')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/contact`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('الاتصال والتواصل', 'Contact')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 4: Products */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm font-display tracking-wide uppercase">
              {t('المنتجات الرقمية', 'Products')}
            </p>
            <nav aria-label={t('المنتجات الرقمية', 'Products')}>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <Link href={`/${language}/products/pulse`} className="hover:text-blue-400 transition-colors text-slate-300">
                    Novixa Pulse (نبض)
                  </Link>
                  <span className="text-[10px] bg-teal-950 text-teal-400 px-1.5 py-0.5 rounded border border-teal-800/50">
                    SaaS
                  </span>
                </li>
                <li>
                  <Link href={`/${language}/products/restaurant`} className="hover:text-blue-400 transition-colors text-slate-300">
                    Novixa Restaurant
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/products/booking`} className="hover:text-blue-400 transition-colors text-slate-300">
                    Novixa Booking
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/products/gaming`} className="hover:text-blue-400 transition-colors text-slate-300">
                    Novixa Gaming
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 5: Company & Contact */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm font-display tracking-wide uppercase">
              {t('المعرفة والتواصل', 'Company & Labs')}
            </p>
            <nav aria-label={t('المعرفة والتواصل', 'Company & Labs')}>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href={`/${language}/insights`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('مختبر المعرفة (Insights)', 'Insights Lab')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/contact`} className="hover:text-blue-400 transition-colors text-blue-400 font-semibold">
                    {t('طلب استشارة وتواصل', 'Contact & Advisory')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/start-project`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('معالج التقييم المعماري', 'Discovery Wizard')}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="pt-3">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 text-xs text-slate-200 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>{t('English Version', 'النسخة العربية')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {BRAND_INFO.name}. {t('جميع الحقوق محفوظة.', 'All rights reserved.')}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="inline-flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>{t('صُنعت بأعلى معايير هندسة البرمجيات', 'Engineered for Growth · novixa.dev')}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
