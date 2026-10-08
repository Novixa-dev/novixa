import Link from 'next/link';
import { LayoutDashboard, Inbox, LogOut, Languages, Database, AlertTriangle } from 'lucide-react';
import { logout, setAdminLang } from '@/app/admin/actions';
import { translator, type AdminLang } from '@/app/admin/i18n';
import { getLeadStore } from '@/lib/leads';

/**
 * Chrome for every authenticated admin page.
 *
 * A standing warning appears whenever leads are not being persisted for real —
 * no database at all, or the in-memory store a restart wipes. Neither should
 * be silently mistakable for production.
 */
export function AdminShell({
  lang,
  email,
  active,
  children,
}: {
  lang: AdminLang;
  email: string;
  active: 'overview' | 'leads';
  children: React.ReactNode;
}) {
  const t = translator(lang);
  const store = getLeadStore();

  const navClass = (key: 'overview' | 'leads') =>
    `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active === key ? 'bg-blue-600/15 text-white' : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
    }`;

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} className={`min-h-screen bg-slate-950 ${lang === 'ar' ? 'font-arabic' : 'font-latin'}`}>
      <header className="sticky top-0 z-30 border-b border-white/[0.06] glass-overlay">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-display text-sm font-bold tracking-wide text-white" translate="no">
              NOVIXA <span className="text-slate-400 font-normal">· {t('لوحة الإدارة', 'Admin')}</span>
            </Link>
            <nav aria-label={t('أقسام الإدارة', 'Admin sections')} className="flex items-center gap-1">
              <Link href="/admin" className={navClass('overview')} aria-current={active === 'overview' ? 'page' : undefined}>
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                {t('نظرة عامة', 'Overview')}
              </Link>
              <Link href="/admin/leads" className={navClass('leads')} aria-current={active === 'leads' ? 'page' : undefined}>
                <Inbox className="h-4 w-4" aria-hidden="true" />
                {t('الطلبات', 'Leads')}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-slate-400 sm:inline" translate="no">{email}</span>
            <form action={setAdminLang}>
              <input type="hidden" name="lang" value={lang === 'ar' ? 'en' : 'ar'} />
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs text-slate-300 hover:text-white">
                <Languages className="h-3.5 w-3.5" aria-hidden="true" />
                <span lang={lang === 'ar' ? 'en' : 'ar'}>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>
            </form>
            <form action={logout}>
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs text-slate-300 hover:text-white">
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                {t('خروج', 'Sign out')}
              </button>
            </form>
          </div>
        </div>
      </header>

      {!store && (
        <div role="alert" className="mx-auto mt-4 flex max-w-7xl items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-950/30 px-4 py-3 text-sm text-rose-100 sm:mx-6">
          <Database className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
          {t(
            'لا توجد قاعدة بيانات مضبوطة (DATABASE_URL). الطلبات الجديدة تُرسَل بالبريد فقط ولا تُحفظ هنا.',
            'No database is configured (DATABASE_URL). New enquiries are emailed only and are not stored here.'
          )}
        </div>
      )}
      {store?.kind === 'memory' && (
        <div role="alert" className="mx-auto mt-4 flex max-w-7xl items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-950/30 px-4 py-3 text-sm text-amber-100 sm:mx-6">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
          {t(
            'وضع الذاكرة المؤقتة: كل ما يظهر هنا يُمحى عند إعادة تشغيل الخادم. للاختبار والتطوير فقط.',
            'In-memory mode: everything here is erased when the server restarts. For testing and development only.'
          )}
        </div>
      )}

      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
