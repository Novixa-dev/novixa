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
  Activity,
  ShieldCheck,
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-xl border-white/[0.09] py-3 shadow-xl shadow-black/50'
          : 'bg-slate-950/80 backdrop-blur-md border-white/[0.05] py-4'
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
            className="hidden lg:flex items-center gap-1 bg-slate-900/50 border border-white/[0.07] rounded-xl px-2 py-1"
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 relative ${
                    isActive
                      ? 'text-white bg-blue-600/90 shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {t(item.labelAr, item.labelEn)}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: System Status + Social Links + Search + Language + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Architectural System Status Indicator (Interactive) */}
            <button
              onClick={() => setTelemetryOpen(true)}
              className="hidden xl:inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-white/[0.07] hover:border-emerald-500/40 text-[11px] font-mono text-slate-300 transition-all cursor-pointer group"
              title={t('عرض فاحص كفاءة السحابة والمناطق', 'Inspect Edge Telemetry & SLA')}
              aria-haspopup="dialog"
              aria-expanded={telemetryOpen}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse group-hover:scale-125 transition-transform" />
              <span>SLA 99.99%</span>
            </button>

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
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>

            {/* Search / Command Menu Trigger */}
            <button
              onClick={triggerCommandMenu}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.08] text-xs text-slate-300 hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
              title="Search (Cmd+K)"
              aria-label={t('البحث في الموقع', 'Search the site')}
            >
              <Search className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span className="hidden xl:inline text-[10px] font-mono text-slate-400">⌘K</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.08] text-xs text-slate-300 hover:text-white hover:border-slate-600 transition-colors font-medium cursor-pointer"
              title={isRtl ? 'Switch to English' : 'التحويل للعربية'}
              aria-label={isRtl ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Primary CTA */}
            <Link
              href={`/${language}/contact`}
              className="relative group inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-150"
            >
              <span>{t('ابدأ مشروعك', 'Start Your Project')}</span>
              <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
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

            {/* Mobile Telemetry Trigger */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTelemetryOpen(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t('فاحص كفاءة السحابة', 'Edge Telemetry')}</span>
                </div>
                <span className="text-emerald-400 font-bold">SLA 99.99%</span>
              </button>
            </div>

            <div className="pt-2">
              <Link
                href={`/${language}/contact`}
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

      {/* Edge Telemetry & SLA Inspector Modal */}
      {telemetryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="telemetry-modal-title"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setTelemetryOpen(false)}
        >
          <div
            className="glass-card border border-white/[0.12] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-right rtl:text-right ltr:text-left relative bg-slate-900/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 id="telemetry-modal-title" className="text-sm font-bold text-white font-display">
                    {t('فاحص كفاءة السحابة والمناطق', 'Edge Telemetry & Region Health')}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {t('رصد فوري لزمن الاستجابة والتوافر', 'Live latency and availability telemetry')}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setTelemetryOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label={t('إغلاق', 'Close')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Edge Clusters */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">
                {t('حالة مراكز البيانات الإقليمية:', 'Regional Edge Datacenters:')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-200">{t('الرياض (me-central1)', 'Riyadh (me-central1)')}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">12ms</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-200">{t('دبي (me-central2)', 'Dubai (me-central2)')}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">16ms</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-200">{t('جدة (Edge Cache)', 'Jeddah (Edge Cache)')}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">14ms</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-200">{t('فرانكفورت (eu-central1)', 'Frankfurt (Core)')}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">32ms</span>
                </div>
              </div>
            </div>

            {/* Metric Stats */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">{t('التوافر (90 يومًا)', '90d Uptime')}</span>
                <span className="text-xs font-bold text-white font-mono">99.99%</span>
              </div>
              <div className="border-x border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">{t('الحوادث النشطة', 'Active Incidents')}</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">0 {t('حوادث', 'Incidents')}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">{t('بروتوكول الأمان', 'Security')}</span>
                <span className="text-xs font-bold text-teal-400 font-mono">TLS 1.3</span>
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/40 flex items-start gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="font-arabic leading-relaxed">
                {t(
                  'كافة الحلول البرمجية والسحابية لنوڤيكسا تدعم استضافة البيانات محليًا داخل مراكز بيانات الخليج لضمان أعلى معايير الخصوصية وسيادة البيانات.',
                  'All Novixa cloud architectures support sovereign GCC data residency ensuring full compliance with local regulatory governance.'
                )}
              </p>
            </div>

            {/* Footer action */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setTelemetryOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {t('إغلاق الفاحص', 'Close Inspector')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
