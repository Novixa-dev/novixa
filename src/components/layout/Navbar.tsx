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

  const cleanPath = (pathname || '').replace(/\/+$/, '');
  const isHomePage = cleanPath === `/${language}` || cleanPath === '/ar' || cleanPath === '/en' || cleanPath === '';

  return (
    <header
      style={
        !isHomePage
          ? { backgroundColor: 'oklab(0.201944 -0.00921407 -0.0336143 / 0.95)' }
          : undefined
      }
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? scrolled
            ? 'bg-[#0B1726]/95 backdrop-blur-xl border-b border-white/[0.08] py-3.5 sm:py-4 shadow-xl shadow-black/40'
            : 'bg-[#0B1726]/60 backdrop-blur-md border-b border-white/[0.06] py-5 sm:py-6'
          : scrolled
          ? 'backdrop-blur-xl border-b border-white/[0.08] py-3.5 sm:py-4 shadow-xl shadow-black/40'
          : 'backdrop-blur-xl border-b border-white/[0.08] py-4 sm:py-5 shadow-lg shadow-black/20'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo at the right in RTL */}
          <Link
            href={`/${language}`}
            dir="ltr"
            className="flex items-center gap-3 focus:outline-none select-none group"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* 3D Folded Ribbon N Logo */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 relative flex items-center justify-center shrink-0">
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
              <span translate="no" className="font-display font-black text-white text-lg sm:text-xl lg:text-2xl tracking-wider">
                NOVIXA
              </span>
              <span translate="no" className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono text-cyan-300/80 tracking-[0.25em] font-bold uppercase mt-1">
                ENGINEERING
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav
            aria-label={t('القائمة الرئيسية', 'Main Navigation')}
            className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-9"
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
                  className={`relative text-sm xl:text-[15.5px] font-semibold transition-all duration-150 py-1.5 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{t(item.labelAr, item.labelEn)}</span>
                  {isActive && (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-9 h-[3px] bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] rounded-full shadow-[0_0_10px_#38BDF8]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Left Actions: Language + CTA Pill Button */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5">
            {/* Primary CTA: Cyan Pill */}
            <Link
              href={`/${language}/contact`}
              className="relative group inline-flex items-center gap-2 bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 text-sm xl:text-[14.5px] font-bold px-5 xl:px-6 py-2.5 xl:py-3 rounded-full shadow-lg shadow-[#38BDF8]/25 transition-all duration-150 cursor-pointer"
            >
              <ArrowIcon className="w-4 h-4 text-slate-950 stroke-[2.4] transition-transform rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
              <span>{t('ابدأ مشروعك', 'Start Your Project')}</span>
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              dir="ltr"
              className="flex items-center gap-2 text-sm xl:text-[14.5px] text-slate-200 hover:text-white font-semibold transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
              title={isRtl ? 'Switch to English' : 'التحويل للعربية'}
              aria-label={isRtl ? 'Switch to English' : 'التحويل للعربية'}
            >
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
              <Globe className="w-4 h-4 text-slate-300" />
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
          className="lg:hidden fixed inset-x-0 top-[65px] max-h-[calc(100dvh-70px)] overflow-y-auto bg-[#0B1726]/98 backdrop-blur-2xl border-b border-cyan-500/20 p-5 shadow-2xl transition-all duration-300 z-50 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex flex-col gap-2">
            {/* Quick Header inside drawer with language & search */}
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLanguage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#13263B] border border-white/10 text-cyan-300 font-bold text-xs"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerCommandMenu();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#13263B] border border-white/10 text-slate-300 text-xs"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('بحث سريع', 'Quick Search')}</span>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const itemPath = `/${language}${item.slug ? `/${item.slug}` : ''}`;
                const isActive = pathname === itemPath || (item.slug === '' && (pathname === `/${language}` || pathname === `/${language}/`));
                return (
                  <Link
                    key={item.key}
                    href={itemPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between text-right rtl:text-right ltr:text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold'
                        : 'text-slate-200 hover:bg-[#13263B] hover:text-white'
                    }`}
                  >
                    <span>{t(item.labelAr, item.labelEn)}</span>
                    <ArrowIcon className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-cyan-400 rtl:-translate-x-1 ltr:translate-x-1' : 'text-slate-500'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile CTAs */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <Link
                href={`/${language}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-extrabold py-3 px-5 rounded-xl shadow-lg shadow-[#38BDF8]/25 text-sm min-h-[46px]"
              >
                <span className="text-[#0B1726]">{t('ابدأ مشروعك الآن', 'Start Your Project Now')}</span>
                <ArrowIcon className="w-4 h-4 text-[#0B1726] stroke-[2.5]" />
              </Link>

              <Link
                href={`/${language}/start-project`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#13263B] hover:bg-[#1c3654] border border-white/10 text-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs min-h-[42px]"
              >
                <span>{t('حاسبة النطاق وتكلفة النظام', 'Scope & Architecture Estimator')}</span>
              </Link>
            </div>

            {/* Mobile system status trigger & Socials */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTelemetryOpen(true);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#13263B] border border-white/10 text-xs text-slate-300 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t('حالة الأنظمة: 100% مستقر', 'System Status: Operational')}</span>
              </button>

              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = socialIconMap[social.iconName] || Globe;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#13263B] border border-white/10 text-slate-300 hover:text-white hover:bg-[#1c3654] transition-colors"
                      aria-label={`Novixa on ${social.name}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  );
                })}
              </div>
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
