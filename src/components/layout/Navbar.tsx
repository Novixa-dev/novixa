'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../ui/Logo';
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

const socialIconMap = {
  Linkedin: Linkedin,
  Github: Github,
  Twitter: Twitter,
};

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, isRtl, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const triggerCommandMenu = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-2xl shadow-slate-950/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${language}`}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links from Centralized Data Layer */}
          <nav
            aria-label={t('القائمة الرئيسية', 'Main Navigation')}
            className="hidden lg:flex items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-full px-3 py-1 shadow-sm"
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-blue-600 shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {t(item.labelAr, item.labelEn)}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Social Links + Search + Language + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Social Icons */}
            <div className="flex items-center gap-1 pl-1 rtl:pl-0 rtl:pr-1 border-e border-slate-800 pe-2">
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
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>

            {/* Search / Command Menu Trigger */}
            <button
              onClick={triggerCommandMenu}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Search (Cmd+K)"
              aria-label={t('البحث في الموقع', 'Search the site')}
            >
              <Search className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span className="hidden xl:inline text-[10px] font-mono text-slate-400">⌘K</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-all duration-200 font-medium cursor-pointer"
              title={isRtl ? 'Switch to English' : 'التحويل للعربية'}
              aria-label={isRtl ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Primary CTA */}
            <Link
              href={`/${language}/contact`}
              className="relative group inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t('تواصل معنا', 'Contact Us')}</span>
              <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
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
          className="lg:hidden fixed inset-x-0 top-[65px] bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 p-4 shadow-2xl transition-all duration-300"
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
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {t(item.labelAr, item.labelEn)}
                </Link>
              );
            })}

            {/* Mobile Social Links */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIconMap[social.iconName] || Globe;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label={`Novixa on ${social.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href={`/${language}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm"
              >
                <span>{t('تواصل معنا الآن', 'Contact Us Now')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
