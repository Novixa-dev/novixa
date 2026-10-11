import Link from 'next/link';
import {
  Sliders,
  Phone,
  Mail,
  Scale,
  Share2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminLang, translator } from '../i18n';
import {
  WHATSAPP_NUMBER,
  CONTACT_EMAIL,
  formatWhatsAppNumber,
} from '@/lib/contact-channels';
import { LEGAL_REVIEW_PENDING } from '@/content/legal';
import { SOCIAL_LINKS } from '@/data/navigation';

export default async function AdminSettingsPage() {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);

  const formattedWa = formatWhatsAppNumber();

  return (
    <AdminShell lang={lang} email={session.email} active="settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600/15 text-blue-400 text-xs font-semibold mb-2">
              <Sliders className="h-3.5 w-3.5" />
              <span>{t('إعدادات وقنوات التشغيل', 'Site Operations & Channel Config')}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">
              {t('إعدادات الموقع والقنوات المعتمدة', 'Operational Channels & Platform Settings')}
            </h1>
            <p className="text-sm text-slate-400">
              {t(
                'مراجعة قنوات التواصل المعتمدة، إشعارات البريد، حالة التدقيق القانوني، وروابط الشبكات الاجتماعية.',
                'Review active communication channels, dispatch addresses, legal audit flags, and verified brand profiles.'
              )}
            </p>
          </div>
        </div>

        {/* Channels Configuration Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* WhatsApp Channel Status */}
          <div className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/20">
                <Phone className="h-5 w-5" />
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  WHATSAPP_NUMBER
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-white/[0.06]'
                }`}
              >
                {WHATSAPP_NUMBER ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                <span>{WHATSAPP_NUMBER ? t('مضبوط ونشط', 'Live & Active') : t('مخفي بأمان', 'Safely Hidden')}</span>
              </span>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-white leading-snug">
                {t('قناة واتساب للأعمال (WhatsApp Channel)', 'WhatsApp Business Hotline')}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {WHATSAPP_NUMBER
                  ? t(`الرقم النشط حالياً في الموقع: ${formattedWa}`, `Active number on site: ${formattedWa}`)
                  : t(
                      'مخفي في الواجهة العامة لمنع ظهور أرقام وهمية غير حقيقية وفق قواعد نوڤيكسا.',
                      'Hidden on the visitor UI to avoid showing fake/placeholder numbers, adhering to anti-fabrication rules.'
                    )}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900/80 p-3 text-xs text-slate-300 border border-white/[0.05] space-y-1">
              <div className="font-medium text-slate-400 text-[11px]">{t('كيفية التفعيل:', 'How to configure:')}</div>
              <p className="text-[11px] font-mono text-slate-400" translate="no">
                NEXT_PUBLIC_WHATSAPP_NUMBER=96777XXXXXXX
              </p>
            </div>
          </div>

          {/* Email Channel Dispatch */}
          <div className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20">
                <Mail className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{t('معتمد', 'Verified')}</span>
              </span>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-white leading-snug">
                {t('عنوان البريد الرسمي المعتمد', 'Official Dispatch Email')}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t(
                  'البريد المستلم لكافة استفسارات ونماذج الموقع، والمرسل لإشعارات التأكيد للعملاء.',
                  'Target inbox receiving all client enquiries, and source of acknowledgement auto-responders.'
                )}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900/80 p-3 text-xs font-mono text-white border border-white/[0.05] flex justify-between items-center" translate="no">
              <span>{CONTACT_EMAIL}</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                Primary
              </span>
            </div>
          </div>
        </div>

        {/* Legal & Governance Status */}
        <section className="glass-card rounded-2xl border border-white/[0.08] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-white leading-snug flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-400" />
              {t('حالة التدقيق القانوني والشروط (Legal Governance)', 'Legal Compliance & Terms Audit')}
            </h2>
            <span
              className={`text-xs font-mono px-2.5 py-0.5 rounded-lg border ${
                LEGAL_REVIEW_PENDING
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {LEGAL_REVIEW_PENDING ? 'LEGAL_REVIEW_PENDING = true' : 'REVIEWED = true'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              'صفحات الشروط والخصوصية (/legal/terms و /legal/privacy) مكتوبة هندسياً لتعكس بدقة ما يقوم به النظام فقط (حفظ بيانات نموذج التواصل محلياً). لا تدّعي شهادات أو معايير غير مثبتة.',
              'Privacy and terms policies accurately describe actual system behaviour (storing form submissions). No unverified certifications or claims are fabricated.'
            )}
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-xs">
            <Link
              href={`/${lang}/legal/privacy`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.06] text-slate-200 hover:text-white"
            >
              <span>{t('سياسة الخصوصية', 'Privacy Policy')}</span>
              <ExternalLink className="h-3 w-3 text-blue-400" />
            </Link>
            <Link
              href={`/${lang}/legal/terms`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.06] text-slate-200 hover:text-white"
            >
              <span>{t('الشروط والأحكام', 'Terms of Service')}</span>
              <ExternalLink className="h-3 w-3 text-blue-400" />
            </Link>
          </div>
        </section>

        {/* Social Profiles Registry */}
        <section className="glass-card rounded-2xl border border-white/[0.08] p-6 space-y-4">
          <h2 className="font-display text-base font-bold text-white leading-snug flex items-center gap-2">
            <Share2 className="h-4 w-4 text-blue-400" />
            {t('سجل الروابط والشبكات الرسمية (Brand Social Profiles)', 'Official Social Profiles & Schema sameAs')}
          </h2>
          <p className="text-xs text-slate-400">
            {t(
              'الروابط المسجلة في بيانات المنظمة (JSON-LD Organization schema) لتأكيد الهوية الرقمية لدى محركات البحث.',
              'Registered brand profiles feeding the Schema.org Organization sameAs array for search engine entity recognition.'
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06] hover:border-blue-500/30 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{link.name}</div>
                  <div className="font-mono text-[11px] text-slate-400 truncate max-w-[180px]" translate="no">
                    {link.url}
                  </div>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
              </a>
            ))}
          </div>
        </section>

        {/* Quick Operational Shortcuts */}
        <section className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-3">
          <h2 className="font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
            <Compass className="h-4 w-4 text-teal-400" />
            {t('اختصارات الأدوات والتوثيق المباشر', 'Quick Administrative Shortcuts')}
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href={`/${lang}/design-system`}
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/[0.06] text-slate-300 hover:text-white inline-flex items-center gap-1.5"
            >
              <span>{t('نظام التصميم المعتمد', 'Design System')}</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              href={`/${lang}/dashboard`}
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/[0.06] text-slate-300 hover:text-white inline-flex items-center gap-1.5"
            >
              <span>{t('لوحة التشغيل التفاعلية للزوار', 'Public Operations Demo')}</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              href={`/${lang}/start-project`}
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/[0.06] text-slate-300 hover:text-white inline-flex items-center gap-1.5"
            >
              <span>{t('حاسبة النطاق والمعمارية', 'Scope Estimator')}</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <a
              href="/admin/leads/export"
              download
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/[0.06] text-slate-300 hover:text-white inline-flex items-center gap-1.5"
            >
              <span>{t('تصدير كل الطلبات CSV', 'Export All Leads CSV')}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
