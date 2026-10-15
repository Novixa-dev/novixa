'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { MAIN_NAV_ITEMS, SOCIAL_LINKS } from '../../data/navigation';
import {
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  Globe,
  Search,
  Linkedin,
  Github,
  Twitter,
  Activity,
} from 'lucide-react';
import { SystemStatusDialog } from './SystemStatusDialog';

const socialIconMap = {
  Linkedin: Linkedin,
  Github: Github,
  Twitter: Twitter,
};

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, isRtl, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [telemetryOpen, setTelemetryOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && telemetryOpen) {
        setTelemetryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [telemetryOpen]);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const triggerCommandMenu = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1726]/90 backdrop-blur-md border-b border-white/[0.08] py-2.5 shadow-lg shadow-black/40'
          : 'bg-[#0B1726]/40 backdrop-blur-sm border-b border-white/[0.05] py-3'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo at the right in RTL */}
          <Link
            href={`/${language}`}
            dir="ltr"
            className="flex items-center gap-2.5 focus:outline-none select-none group"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* 3D Folded Ribbon N Logo */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 relative flex items-center justify-center shrink-0">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="ribbonLeft" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </linearGradient>
                  <linearGradient id="ribbonDiag" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient id="ribbonRight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                </defs>
                <rect x="3" y="6" width="7" height="24" rx="3.5" fill="url(#ribbonLeft)" />
                <path d="M7 8 L29 28 L23 30 L5 12 Z" fill="url(#ribbonDiag)" />
                <rect x="23" y="6" width="7" height="24" rx="3.5" fill="url(#ribbonRight)" />
              </svg>
            </div>
            <div className="flex flex-col text-left leading-none">
              <span translate="no" className="font-display font-extrabold text-white text-base sm:text-lg tracking-wider">
                NOVIXA
              </span>
              <span translate="no" className="text-[8px] sm:text-[9px] font-mono text-slate-300 tracking-[0.25em] font-medium uppercase mt-0.5">
                ENGINEERING
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav
            aria-label={t('القائمة الرئيسية', 'Main Navigation')}
            className="hidden lg:flex items-center gap-3.5 xl:gap-6 2xl:gap-8"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const itemPath = `/${language}${item.slug ? `/${item.slug}` : ''}`;
              const isActive =
                pathname === itemPath ||
                (item.slug === '' && (pathname === `/${language}` || pathname === `/${language}/`));

              return (
                <Link
                  key={item.key}
                  href={itemPath}
                  className={`relative text-xs xl:text-[13px] font-medium transition-colors duration-150 py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-200/90 hover:text-white'
                  }`}
                >
                  <span>{t(item.labelAr, item.labelEn)}</span>
                  {isActive && (
                    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] rounded-full shadow-[0_0_8px_#38BDF8]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Left Actions: Language + CTA Pill Button */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {/* Primary CTA: Cyan Pill */}
            <Link
              href={`/${language}/contact`}
              dir="ltr"
              className="relative group inline-flex items-center gap-2 bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-white text-xs xl:text-[13px] font-bold px-4 xl:px-5 py-2 xl:py-2.5 rounded-full shadow-md shadow-[#38BDF8]/20 transition-all duration-150"
            >
              <ArrowRight className="w-3.5 h-3.5 text-white stroke-[2.2]" />
              <span>{t('ابدأ مشروعك', 'Start Your Project')}</span>
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              dir="ltr"
              className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white font-medium transition-colors cursor-pointer py-1"
              title={isRtl ? 'Switch to English' : 'التحويل للعربية'}
              aria-label={isRtl ? 'Switch to English' : 'التحويل للعربية'}
            >
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
              <Globe className="w-3.5 h-3.5 text-slate-200" />
            </button>
          </div>

          {/* Mobile Actions Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={triggerCommandMenu}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label={t('البحث في الموقع', 'Search the site')}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold"
              aria-label={isRtl ? 'Switch to English' : 'التحويل للعربية'}
            >
              {language === 'ar' ? 'EN' : 'ع'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? t('إغلاق القائمة', 'Close menu') : t('فتح القائمة', 'Open menu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden fixed inset-x-0 top-[65px] bg-[#0B1726]/98 backdrop-blur-xl border-b border-white/10 p-4 shadow-2xl transition-all duration-300"
        >
          <div className="flex flex-col gap-1.5">
            {MAIN_NAV_ITEMS.map((item) => {
              const itemPath = `/${language}${item.slug ? `/${item.slug}` : ''}`;
              const isActive = pathname === itemPath;
              return (
                <Link
                  key={item.key}
                  href={itemPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-right rtl:text-right ltr:text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#35C8F2]/15 text-[#35C8F2] border border-[#35C8F2]/25 font-semibold'
                      : 'text-[#C1D0DE] hover:bg-[#13263B] hover:text-white'
                  }`}
                >
                  {t(item.labelAr, item.labelEn)}
                </Link>
              );
            })}

            {/* Mobile Social Links */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIconMap[social.iconName] || Globe;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#13263B] border border-white/10 text-[#C1D0DE] hover:text-white hover:bg-[#1c3654] transition-colors"
                    aria-label={`Novixa on ${social.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Mobile system status trigger */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTelemetryOpen(true);
                }}
                className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-[#13263B] border border-white/10 text-xs text-[#C1D0DE] hover:text-white"
              >
                <Activity className="w-4 h-4 text-[#35C8F2]" aria-hidden="true" />
                <span>{t('حالة النظام', 'System status')}</span>
              </button>
            </div>

            <div className="pt-2">
              <Link
                href={`/${language}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#35C8F2] hover:bg-[#20b8e6] text-[#0B1726] font-bold py-2.5 px-4 rounded-xl shadow-md shadow-[#35C8F2]/20"
              >
                <span>{t('ابدأ مشروعك الآن', 'Start Your Project Now')}</span>
                <ArrowIcon className="w-4 h-4 text-[#0B1726]" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Public system status: a live check of /api/health from the visitor's browser */}
      <SystemStatusDialog open={telemetryOpen} onClose={() => setTelemetryOpen(false)} />
    </header>
  );
};
export default Navbar;
