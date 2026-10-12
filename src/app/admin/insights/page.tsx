import Link from 'next/link';
import { BookOpen, Search, Sparkles, ArrowUpRight, ExternalLink } from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminLang, translator } from '../i18n';
import { getContentStore } from '@/lib/content-store';
import { CreateInsightModal } from '@/components/admin/CreateInsightModal';
import { EditInsightModal } from '@/components/admin/EditInsightModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { deleteInsightAction } from '../actions';

export default async function AdminInsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const params = await searchParams;
  const query = (params.q || '').trim();

  const store = getContentStore();
  const articles = await store.listInsights(query);

  return (
    <AdminShell lang={lang} email={session.email} active="insights">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600/15 text-blue-400 text-xs font-semibold mb-2">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{t('إدارة المدونة والرؤى المعمارية', 'Engineering Insights & Blog')}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">
              {t('إدارة المقالات والرؤى الهندسية (CRUD)', 'Manage Technical Articles')}
            </h1>
            <p className="text-sm text-slate-400">
              {t(
                `إجمالي ${articles.length} مقالاً تقنياً. تحكم في النشر والأرشفة والمحتوى ثنائي اللغة.`,
                `Total ${articles.length} engineering insights. Full bilingual publishing control.`
              )}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <CreateInsightModal lang={lang} />
            <Link
              href={`/${lang}/insights`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <span>{t('معاينة صفحة المدونة', 'Public Insights')}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <form method="GET" action="/admin/insights" className="relative w-full max-w-md">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder={t('بحث في عناوين ومحتوى المقالات...', 'Search articles & excerpts...')}
              className="w-full rounded-xl border border-white/[0.08] bg-slate-900/90 py-2 ps-9 pe-4 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </form>
        </div>

        {/* Articles List */}
        <div className="space-y-3">
          {articles.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-3 hover:border-white/[0.15] transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {item.category[lang]}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {item.date} · {item.readTime[lang]}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        item.status === 'published'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.status === 'published' ? t('منشور', 'Published') : t('مسودة', 'Draft')}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white leading-snug">
                    {item.title[lang]}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <EditInsightModal insight={item} lang={lang} />
                  <DeleteConfirmModal
                    action={deleteInsightAction}
                    id={item.id}
                    itemName={item.title[lang]}
                    lang={lang}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.excerpt[lang]}
              </p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.05]">
                <span className="font-mono text-[11px] text-slate-400" translate="no">
                  /insights/{item.slug}
                </span>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/ar/insights/${item.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
                  >
                    <span>{t('عربي', 'AR')}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <span className="text-slate-600">·</span>
                  <Link
                    href={`/en/insights/${item.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
                  >
                    <span>{t('إنجليزي', 'EN')}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-slate-900/40 p-12 text-center">
            <Sparkles className="h-8 w-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              {t('لا توجد مقالات مطابقة', 'No matching articles found')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('جرّب تغيير كلمات البحث أو كتابة مقال جديد من الزر بالأعلى.', 'Try adjusting your search or write a new article.')}
            </p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
