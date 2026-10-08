'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../ui/Logo';
import { BRAND_INFO } from '../../content/data';
import { CONTACT_EMAIL } from '@/lib/contact-channels';
import { SOCIAL_LINKS } from '../../data/navigation';
import {
  Shield,
  Terminal,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Lock,
  Cpu,
  Zap,
} from 'lucide-react';

const socialIconMap = {
  Linkedin: Linkedin,
  Github: Github,
  Twitter: Twitter,
};

export const Footer: React.FC = () => {
  const { language, t, toggleLanguage } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden text-slate-300 text-sm">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Col 1 & 2: Brand Info & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-md pt-2 font-arabic">
              {t(BRAND_INFO.subtagline.ar, BRAND_INFO.subtagline.en)}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t('متاح لاستقبال مشاريع واستشارات جديدة', 'Accepting New Projects & Inquiries')}</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 font-arabic pt-1">
              <span>📍 {t(BRAND_INFO.location.ar, BRAND_INFO.location.en)}</span>
            </div>

            {/* Social Links Row */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
                {t('قنوات التواصل والمتابعة', 'Connect with Us')}
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

          {/* Col 3: Core Engineering Services */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm font-display tracking-wide uppercase">
              {t('الخدمات الهندسية', 'Engineering Services')}
            </p>
            <nav aria-label={t('الخدمات الهندسية', 'Engineering Services')}>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href={`/${language}/services`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('تطوير البرمجيات المخصصة', 'Custom Software Development')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/services`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('حلول برمجيات الأعمال', 'Business Software Solutions')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/services`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('تحديث وترقية الأنظمة القديمة', 'System Modernization')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/services`} className="hover:text-blue-400 transition-colors text-slate-300 flex items-center gap-1.5">
                    <span>{t('النشر والبنية التحتية السحابية', 'Deployment & Cloud Infrastructure')}</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/services`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('الاستضافة المدارة للبرمجيات', 'Managed Software Hosting')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/services`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('الصيانة والدعم الفني (SLA)', 'Maintenance & SLA Support')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/services`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('الأتمتة وتكامل الـ APIs والواتساب', 'Automation & WhatsApp Integrations')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/services`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('حلول الذكاء الاصطناعي التطبيقي', 'Practical AI Solutions')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 4: Ready Solutions & Products */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm font-display tracking-wide uppercase">
              {t('الحلول الجاهزة والمنتجات', 'Solutions & Products')}
            </p>
            <nav aria-label={t('الحلول الجاهزة والمنتجات', 'Solutions & Products')}>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href={`/${language}/solutions`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('نظام إدارة المطاعم والمقاهي (5-14 يوماً)', 'Restaurant System (5–14d)')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/solutions`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('نظام حجز المواعيد والجدولة (5-10 أيام)', 'Booking & Scheduling Hub')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/solutions`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('نظام إدارة المخزون والمستودعات', 'Multi-Branch Inventory')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/solutions`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('نظام العيادات والملف الطبي', 'Medical Clinic & Patient Hub')}
                  </Link>
                </li>
                <li className="pt-2 border-t border-slate-800/80">
                  <Link href={`/${language}/products/aqar`} className="hover:text-blue-400 transition-colors text-slate-300 font-semibold flex items-center justify-between">
                    <span>Novixa Aqar (عقار)</span>
                    <span className="text-[10px] bg-teal-950 text-teal-300 px-1.5 py-0.5 rounded border border-teal-800">LIVE</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/products/pulse`} className="hover:text-blue-400 transition-colors text-slate-300 font-semibold flex items-center justify-between">
                    <span>Novixa Pulse (نبض)</span>
                    <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800">LIVE</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/products/restaurant`} className="hover:text-blue-400 transition-colors text-slate-300">
                    Novixa Restaurant POS
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/products/booking`} className="hover:text-blue-400 transition-colors text-slate-300">
                    Novixa Booking Engine
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 5: Company & Quick Actions */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm font-display tracking-wide uppercase">
              {t('الشركة والتواصل', 'Company & Connect')}
            </p>
            <nav aria-label={t('الشركة والتواصل', 'Company & Connect')}>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href={`/${language}/about`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('عن نوڤيكسا ومسار النمو', 'About Novixa & Methodology')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/work`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('نماذج الأعمال والعروض التجريبية', 'Selected Demos & Prototypes')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/industries`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('القطاعات التي نخدمها', 'Industries We Serve')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/insights`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('المقالات والرؤى الهندسية', 'Engineering Insights')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/dashboard`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('لوحة التشغيل التفاعلية', 'Interactive Operations Console')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/design-system`} className="hover:text-blue-400 transition-colors text-slate-300">
                    {t('نظام التصميم ومعايير الهندسة', 'Design System & Engineering Standards')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${language}/contact`} className="hover:text-blue-400 transition-colors text-blue-400 font-semibold">
                    {t('ابدأ مشروعك / طلب استشارة', 'Start Project / Consultation')}
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="hover:text-blue-400 transition-colors font-mono text-slate-400 block pt-1"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="pt-3">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 text-xs text-slate-200 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer transition-colors hover:border-slate-700"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                {/* The control names the language it switches *to*, in that
                    language, so a speaker of it recognises the label. The
                    `lang` attribute keeps screen-reader pronunciation correct
                    for whichever side is showing. */}
                {language === 'ar' ? (
                  <span lang="en">Switch to English</span>
                ) : (
                  <span lang="ar">التحويل للعربية</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise Trust, Regional Compliance & Data Residency Strip */}
        <div className="py-8 my-4 border-b border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right rtl:text-right ltr:text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white font-display">
                {t('طلباتك تبقى على خادمنا', 'Your enquiries stay on our server')}
              </p>
              <p className="text-[11px] text-slate-400 font-arabic mt-0.5 leading-relaxed">
                {t('نحفظ ما ترسله إلينا في قاعدة بيانات نديرها بأنفسنا، لا في خدمة طرف ثالث.', 'What you send us is stored in a database we run ourselves, not in a third-party service.')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white font-display">
                {t('حماية الملكية واتفاقيات السرية (NDA)', 'Mutual NDA & Code Ownership')}
              </p>
              <p className="text-[11px] text-slate-400 font-arabic mt-0.5 leading-relaxed">
                {t('عقود قانونية واضحة تضمن ملكيتك الكاملة للأصل البرمجي وسرية العمليات.', 'Clear contracts ensuring full proprietary ownership of delivered software.')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white font-display">
                {t('اتصال مشفّر دائماً', 'Always-encrypted connections')}
              </p>
              <p className="text-[11px] text-slate-400 font-arabic mt-0.5 leading-relaxed">
                {t('كل صفحات الموقع تعمل عبر HTTPS مع HSTS، ولا تُقبل اتصالات غير مشفّرة.', 'Every page is served over HTTPS with HSTS; unencrypted connections are refused.')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white font-display">
                {t('نسخ احتياطي ليلي', 'Nightly backups')}
              </p>
              <p className="text-[11px] text-slate-400 font-arabic mt-0.5 leading-relaxed">
                {t('تُنسخ قاعدة البيانات كل ليلة وقبل كل نشر، ويمكن استعادتها عند الحاجة.', 'The database is backed up every night and before every release, and can be restored when needed.')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>© {new Date().getFullYear()} {BRAND_INFO.name}. {t('جميع الحقوق محفوظة.', 'All rights reserved.')}</span>
              <Link href={`/${language}/legal/privacy`} className="hover:text-blue-400 transition-colors">
                {t('سياسة الخصوصية', 'Privacy')}
              </Link>
              <Link href={`/${language}/legal/terms`} className="hover:text-blue-400 transition-colors">
                {t('شروط الاستخدام', 'Terms')}
              </Link>
              <Link href={`/${language}/faq`} className="hover:text-blue-400 transition-colors">
                {t('الأسئلة الشائعة', 'FAQ')}
              </Link>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="inline-flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>{t('صُنعت بأعلى معايير هندسة البرمجيات للأعمال', 'Software Engineering & Digital Products · novixa.dev')}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
