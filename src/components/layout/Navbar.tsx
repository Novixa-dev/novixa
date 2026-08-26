'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../ui/Logo';
import { Menu, X, ArrowLeft, ArrowRight, Globe, Search, Command } from 'lucide-react';

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

  const navItems = [
    { path: `/${language}`, labelAr: 'الرئيسية', labelEn: 'Home' },
    { path: `/${language}/solutions`, labelAr: 'الحلول', labelEn: 'Solutions' },
    { path: `/${language}/products`, labelAr: 'المنتجات', labelEn: 'Products' },
    { path: `/${language}/industries`, labelAr: 'القطاعات', labelEn: 'Industries' },
    { path: `/${language}/work`, labelAr: 'أعمالنا', labelEn: 'Work' },
    { path: `/${language}/about`, labelAr: 'من نحن', labelEn: 'About' },
    { path: `/${language}/insights`, labelAr: 'المعرفة', labelEn: 'Insights' },
  ];

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const triggerCommandMenu = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-2xl shadow-slate-950/50'
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

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-full px-3 py-1 shadow-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path === `/${language}` && (pathname === `/${language}` || pathname === `/${language}/`));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 relative ${
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

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Search / Command Menu Trigger */}
            <button
              onClick={triggerCommandMenu}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px] font-mono">⌘K</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-all duration-200 font-medium cursor-pointer"
              title={isRtl ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Primary CTA */}
            <Link
              href={`/${language}/start-project`}
              className="relative group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs lg:text-sm font-semibold px-4 lg:px-5 py-2 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t('ابدأ مشروعك', 'Start Project')}</span>
              <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={triggerCommandMenu}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold"
            >
              {language === 'ar' ? 'EN' : 'ع'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 p-4 shadow-2xl transition-all duration-300">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
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

            <div className="pt-3 border-t border-slate-800 mt-2">
              <Link
                href={`/${language}/start-project`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm"
              >
                <span>{t('ابدأ مشروعك الآن', 'Start Your Project Now')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
