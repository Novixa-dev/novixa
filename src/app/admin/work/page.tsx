import Link from 'next/link';
import {
  Briefcase,
  Search,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminLang, translator } from '../i18n';
import { getContentStore } from '@/lib/content-store';
import { CreateCaseStudyModal } from '@/components/admin/CreateCaseStudyModal';
import { EditCaseStudyModal } from '@/components/admin/EditCaseStudyModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { deleteCaseStudyAction } from '../actions';

export default async function AdminWorkPage({
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
  const allCaseStudies = await store.listCaseStudies(query);

  const publishedCount = allCaseStudies.filter((cs) => cs.status === 'published').length;
  const draftCount = allCaseStudies.filter((cs) => cs.status !== 'published').length;

  return (
    <AdminShell lang={lang} email={session.email} active="work">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600/15 text-blue-400 text-xs font-semibold mb-2">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{t('إدارة نماذج الأعمال وحالات الدراسة', 'Work & Case Studies Management')}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">
              {t('إدارة معرض الأعمال والنماذج الهندسية (CRUD)', 'Manage Case Studies & Prototypes')}
            </h1>
            <p className="text-sm text-slate-400">
              {t(
                `إجمالي ${allCaseStudies.length} نماذج وحالات دراسة. تُصنف بشفافية (عرض توضيحي، نموذج هندسي، أو بنية معمارية) التزاماً بمبدأ النزاهة الهندسية.`,
                `Total ${allCaseStudies.length} case studies. Labeled transparently (Demo, Prototype, Concept Architecture) adhering to integrity guidelines.`
              )}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <CreateCaseStudyModal lang={lang} />
            <Link
              href={`/${lang}/work`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <span>{t('معاينة صفحة الأعمال', 'Live Work Page')}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" />
            </Link>
          </div>
        </div>

        {/* Stats & Search */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="glass-card rounded-xl border border-white/[0.08] p-4">
            <div className="text-xs text-slate-400">{t('إجمالي النماذج', 'Total Prototypes')}</div>
            <div className="mt-1 font-display text-2xl font-bold text-white">
              {allCaseStudies.length}
            </div>
          </div>
          <div className="glass-card rounded-xl border border-white/[0.08] p-4">
            <div className="text-xs text-slate-400">{t('نماذج منشورة', 'Published')}</div>
            <div className="mt-1 font-display text-2xl font-bold text-emerald-400">
              {publishedCount}
            </div>
          </div>
          <div className="glass-card rounded-xl border border-white/[0.08] p-4">
            <div className="text-xs text-slate-400">{t('مسودات', 'Drafts')}</div>
            <div className="mt-1 font-display text-2xl font-bold text-amber-400">
              {draftCount}
            </div>
          </div>
          <div className="glass-card rounded-xl border border-white/[0.08] p-4">
            <div className="text-xs text-slate-400">{t('معايير النزاهة', 'Integrity Standard')}</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-blue-400">
              <Sparkles className="h-4 w-4" />
              <span>{t('خالٍ من التلفيق 100%', '100% Verified')}</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <form method="GET" action="/admin/work" className="relative flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder={t('بحث بالعنوان، التصنيف، أو التقنيات...', 'Search case studies, tags, stack...')}
              className="w-full rounded-xl border border-white/[0.08] bg-slate-900/90 py-2 ps-9 pe-4 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </form>
          {query && (
            <Link
              href="/admin/work"
              className="text-xs text-blue-400 hover:text-blue-300 underline"
            >
              {t('إعادة تعيين البحث', 'Reset search')}
            </Link>
          )}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCaseStudies.map((cs) => {
            const isPublished = cs.status === 'published';
            return (
              <div
                key={cs.id}
                className="glass-card rounded-2xl border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/[0.15] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-600/15 text-blue-400 border border-blue-500/20">
                      <Briefcase className="h-3 w-3" />
                      <span>{lang === 'ar' ? cs.caseStudyTypeLabel.ar : cs.caseStudyTypeLabel.en}</span>
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {isPublished ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{t('منشور', 'Published')}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3" />
                          <span>{t('مسودة', 'Draft')}</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-white line-clamp-1">
                      {lang === 'ar' ? cs.title.ar : cs.title.en}
                    </h3>
                    <div className="text-[11px] text-blue-400 font-medium mt-0.5">
                      {lang === 'ar' ? cs.industry.ar : cs.industry.en} • {lang === 'ar' ? cs.location.ar : cs.location.en}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {lang === 'ar' ? cs.solution.ar : cs.solution.en}
                    </p>
                  </div>

                  {/* Tech Stack Tags */}
                  {cs.technologies && cs.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {cs.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono"
                          translate="no"
                        >
                          {tech}
                        </span>
                      ))}
                      {cs.technologies.length > 4 && (
                        <span className="text-[10px] px-1 py-0.5 text-slate-400">
                          +{cs.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <div className="text-[10px] text-slate-400 font-mono" translate="no">
                    /{cs.slug}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <EditCaseStudyModal caseStudy={cs} lang={lang} />
                    <DeleteConfirmModal
                      action={deleteCaseStudyAction}
                      id={cs.id}
                      itemName={lang === 'ar' ? cs.title.ar : cs.title.en}
                      lang={lang}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {allCaseStudies.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl border border-white/[0.08] space-y-3">
            <Briefcase className="h-10 w-10 text-slate-500 mx-auto" />
            <h3 className="font-display text-base font-semibold text-white">
              {t('لا توجد نماذج أعمال مطابقة', 'No Case Studies Found')}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {query
                ? t('جرّب البحث بمصطلح آخر أو إعادة ضبط الفلتر.', 'Try a different search query.')
                : t('ابدأ بإضافة أول نموذج عمل أو نموذج هندسي لنوڤيكسا.', 'Start by adding your first case study or prototype.')}
            </p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
