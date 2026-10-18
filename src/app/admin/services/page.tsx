import Link from 'next/link';
import {
  Layers,
  Search,
  ExternalLink,
  Code2,
  Box,
  Cpu,
  Building,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminLang, translator } from '../i18n';
import { getContentStore, type CatalogKind } from '@/lib/content-store';
import { CreateCatalogModal } from '@/components/admin/CreateCatalogModal';
import { EditCatalogModal } from '@/components/admin/EditCatalogModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { deleteCatalogItemAction } from '../actions';

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; q?: string }>;
}) {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const params = await searchParams;
  const currentKind = (params.kind || 'all') as CatalogKind | 'all';
  const query = (params.q || '').trim();

  const store = getContentStore();
  const items = await store.listCatalog(currentKind, query);
  const allItems = await store.listCatalog('all');

  const countByKind = (k: CatalogKind) => allItems.filter((i) => i.kind === k).length;

  const kinds = [
    { key: 'all', label: t('الكل', 'All'), count: allItems.length },
    { key: 'service', label: t('خدمات هندسية', 'Services'), count: countByKind('service') },
    { key: 'solution', label: t('حلول جاهزة', 'Solutions'), count: countByKind('solution') },
    { key: 'product', label: t('منتجات رقمية', 'Products'), count: countByKind('product') },
    { key: 'industry', label: t('قطاعات الأعمال', 'Industries'), count: countByKind('industry') },
  ];

  const getKindIcon = (kind: CatalogKind) => {
    switch (kind) {
      case 'service':
        return Code2;
      case 'solution':
        return Box;
      case 'product':
        return Cpu;
      case 'industry':
        return Building;
    }
  };

  const getKindLabel = (kind: CatalogKind) => {
    switch (kind) {
      case 'service':
        return { ar: 'خدمة هندسية', en: 'Engineering Service' };
      case 'solution':
        return { ar: 'حل برمجي تشغيلي', en: 'Turnkey Solution' };
      case 'product':
        return { ar: 'منتج سحابي', en: 'SaaS Product' };
      case 'industry':
        return { ar: 'قطاع أعمال', en: 'Industry Vertical' };
    }
  };

  return (
    <AdminShell lang={lang} email={session.email} active="services">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600/15 text-blue-400 text-xs font-semibold mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>{t('إدارة الكتالوج والخدمات', 'Catalog & Services Management')}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">
              {t('إدارة عروض وحلول نوڤيكسا (CRUD)', 'Manage Offerings & Solutions')}
            </h1>
            <p className="text-sm text-slate-400">
              {t(
                `إجمالي ${allItems.length} عنصراً معمارياً في الكتالوج. يمكنك الإضافة والتعديل والحذف وتغيير حالات النشر فورياً.`,
                `Total ${allItems.length} offerings in catalog. Full CRUD: create, edit, delete, and manage publishing.`
              )}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <CreateCatalogModal lang={lang} />
            <Link
              href={`/${lang}/start-project`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <span>{t('حاسبة النطاق', 'Estimator')}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" />
            </Link>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {kinds.map((k) => {
              const active = currentKind === k.key;
              const href = k.key === 'all' ? '/admin/services' : `/admin/services?kind=${k.key}`;
              return (
                <Link
                  key={k.key}
                  href={href}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    active
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-900/80 text-slate-300 border border-white/[0.06] hover:bg-slate-800'
                  }`}
                >
                  <span>{k.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      active ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {k.count}
                  </span>
                </Link>
              );
            })}
          </div>

          <form method="GET" action="/admin/services" className="relative min-w-[240px]">
            {currentKind !== 'all' && <input type="hidden" name="kind" value={currentKind} />}
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder={t('بحث بالاسم أو المعمارية...', 'Search offerings & stack...')}
              className="w-full rounded-xl border border-white/[0.08] bg-slate-900/90 py-2 ps-9 pe-4 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </form>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const Icon = getKindIcon(item.kind);
            const kindLabel = getKindLabel(item.kind);
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/[0.15] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/20 text-blue-400">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-900 border border-white/[0.06] text-slate-300">
                        {kindLabel[lang]}
                      </span>
                      {item.categoryBadge && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300">
                          {item.categoryBadge[lang]}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          item.status === 'active'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : item.status === 'draft'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400 border border-white/[0.06]'
                        }`}
                      >
                        {item.status === 'active'
                          ? t('نشط', 'Active')
                          : item.status === 'draft'
                          ? t('مسودة', 'Draft')
                          : t('مؤرشف', 'Archived')}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-white leading-snug">
                      {item.title[lang]}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.description[lang]}
                    </p>
                  </div>

                  {item.features && item.features.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {item.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                      {item.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-white/[0.05]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2">
                    <EditCatalogModal item={item} lang={lang} />
                    <DeleteConfirmModal
                      action={deleteCatalogItemAction}
                      id={item.id}
                      itemName={item.title[lang]}
                      lang={lang}
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/ar${item.publicRoute}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
                    >
                      <span>{t('عربي', 'AR')}</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <span className="text-slate-600">·</span>
                    <Link
                      href={`/en${item.publicRoute}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
                    >
                      <span>{t('إنجليزي', 'EN')}</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-slate-900/40 p-12 text-center">
            <Search className="h-8 w-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              {t('لم يتم العثور على عناصر مطابقة', 'No matching offerings found')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('جرّب تعديل كلمات البحث أو إضافة عنصر جديد من الزر بالأعلى.', 'Try adjusting your search or add a new offering.')}
            </p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
