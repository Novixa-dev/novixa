import Link from 'next/link';
import {
  LayoutDashboard,
  Inbox,
  LogOut,
  Languages,
  Database,
  AlertTriangle,
  CircleDot,
} from 'lucide-react';
import { logout, setAdminLang } from '@/app/admin/actions';
import { translator, type AdminLang } from '@/app/admin/i18n';
import { getLeadStore } from '@/lib/leads';

type NavKey = 'overview' | 'leads';

/**
 * Chrome for every authenticated admin page.
 *
 * Two nav surfaces share one item list: a persistent sidebar from `lg:` up,
 * and a horizontally scrollable bar inside the header below it. They are not
 * a duplicate to be trimmed — the sidebar is what makes a wide screen usable,
 * and the header bar is the only navigation a 360px phone can reach without
 * a drawer. Both render the same links; only one is visible per breakpoint,
 * so neither is ever a second copy in the accessibility tree.
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
  active: NavKey;
  children: React.ReactNode;
}) {
  const t = translator(lang);
  const store = getLeadStore();

  const items: Array<{ key: NavKey; href: string; label: string; Icon: typeof Inbox }> = [
    { key: 'overview', href: '/admin', label: t('نظرة عامة', 'Overview'), Icon: LayoutDashboard },
    { key: 'leads', href: '/admin/leads', label: t('الطلبات', 'Leads'), Icon: Inbox },
  ];

  const sidebarLink = (key: NavKey) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
      active === key
        ? 'bg-blue-600/15 text-white ring-1 ring-inset ring-blue-500/30'
        : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
    }`;

  const barLink = (key: NavKey) =>
    `inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active === key ? 'bg-blue-600/15 text-white' : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
    }`;

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      lang={lang}
      className={`min-h-screen bg-slate-950 ${lang === 'ar' ? 'font-arabic' : 'font-latin'}`}
    >
      <div className="flex min-h-screen w-full">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-e border-white/[0.06] bg-slate-950/70 px-4 py-5 lg:flex">
          <Link href="/admin" className="flex items-center gap-2.5 px-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/15 ring-1 ring-inset ring-blue-500/30">
              <CircleDot className="h-4 w-4 text-blue-400" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold tracking-wide text-white" translate="no">
                NOVIXA
              </span>
              <span className="text-[11px] text-slate-400">{t('لوحة الإدارة', 'Admin console')}</span>
            </span>
          </Link>

          <nav aria-label={t('أقسام الإدارة', 'Admin sections')} className="mt-6 flex flex-col gap-1">
            {items.map(({ key, href, label, Icon }) => (
              <Link key={key} href={href} className={sidebarLink(key)} aria-current={active === key ? 'page' : undefined}>
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Database className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span translate="no">{store ? (store.kind === 'postgres' ? 'PostgreSQL' : 'in-memory') : t('غير مضبوطة', 'not configured')}</span>
            </div>
            <p className="break-all text-[11px] text-slate-400" translate="no">{email}</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/[0.06] glass-overlay">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              {/* Brand + inline nav for narrow screens */}
              <div className="flex min-w-0 items-center gap-2 lg:hidden">
                <Link href="/admin" className="font-display text-sm font-bold tracking-wide text-white" translate="no">
                  NOVIXA
                </Link>
                <nav
                  aria-label={t('أقسام الإدارة', 'Admin sections')}
                  className="flex items-center gap-1 overflow-x-auto"
                >
                  {items.map(({ key, href, label, Icon }) => (
                    <Link
                      key={key}
                      href={href}
                      className={barLink(key)}
                      aria-current={active === key ? 'page' : undefined}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">{label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="ms-auto flex items-center gap-2">
                <span className="hidden max-w-[16rem] truncate text-xs text-slate-400 sm:inline" translate="no">
                  {email}
                </span>
                <form action={setAdminLang}>
                  <input type="hidden" name="lang" value={lang === 'ar' ? 'en' : 'ar'} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs text-slate-300 hover:text-white"
                  >
                    <Languages className="h-3.5 w-3.5" aria-hidden="true" />
                    <span lang={lang === 'ar' ? 'en' : 'ar'}>{lang === 'ar' ? 'English' : 'العربية'}</span>
                  </button>
                </form>
                <form action={logout}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs text-slate-300 hover:text-white"
                  >
                    <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('خروج', 'Sign out')}
                  </button>
                </form>
              </div>
            </div>
          </header>

          {!store && (
            <div
              role="alert"
              className="mx-4 mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-950/30 px-4 py-3 text-sm text-rose-100 sm:mx-6"
            >
              <Database className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
              {t(
                'لا توجد قاعدة بيانات مضبوطة (DATABASE_URL). الطلبات الجديدة تُرسَل بالبريد فقط ولا تُحفظ هنا.',
                'No database is configured (DATABASE_URL). New enquiries are emailed only and are not stored here.'
              )}
            </div>
          )}
          {store?.kind === 'memory' && (
            <div
              role="alert"
              className="mx-4 mt-4 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-950/30 px-4 py-3 text-sm text-amber-100 sm:mx-6"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
              {t(
                'وضع الذاكرة المؤقتة: كل ما يظهر هنا يُمحى عند إعادة تشغيل الخادم. للاختبار والتطوير فقط.',
                'In-memory mode: everything here is erased when the server restarts. For testing and development only.'
              )}
            </div>
          )}

          <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
