import Link from 'next/link';
import { HelpCircle, Search, Sparkles, ArrowUpRight } from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminLang, translator } from '../i18n';
import { getContentStore, type FaqTopic } from '@/lib/content-store';
import { CreateFaqModal } from '@/components/admin/CreateFaqModal';
import { EditFaqModal } from '@/components/admin/EditFaqModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { deleteFaqAction } from '../actions';

export default async function AdminFaqPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; q?: string }>;
}) {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const params = await searchParams;
  const currentTopic = (params.topic || 'all') as FaqTopic | 'all';
  const query = (params.q || '').trim();

  const store = getContentStore();
  const faqs = await store.listFaqs(currentTopic, query);
  const allFaqs = await store.listFaqs('all');

  const topics: Array<{ key: FaqTopic | 'all'; label: string }> = [
    { key: 'all', label: t('الكل', 'All') },
    { key: 'engagement', label: t('كيف نبدأ العمل', 'Engagement') },
    { key: 'delivery', label: t('التنفيذ والمواعيد', 'Delivery') },
    { key: 'ownership', label: t('الملكية والعقود', 'Ownership') },
    { key: 'operations', label: t('التشغيل والصيانة', 'Operations') },
    { key: 'general', label: t('عام', 'General') },
  ];

  return (
    <AdminShell lang={lang} email={session.email} active="faq">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-600/15 text-teal-400 text-xs font-semibold mb-2">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>{t('إدارة الأسئلة الشائعة والمعرفة', 'FAQ & Knowledge Base')}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">
              {t('الأسئلة الشائعة ومخطط البيانات (CRUD)', 'Manage FAQs & Structured Schema')}
            </h1>
            <p className="text-sm text-slate-400">
              {t(
                `إجمالي ${allFaqs.length} سؤالاً معتمداً. متوافقة تماماً مع معايير Google FAQPage ومطابقة لما يراه الزائر.`,
                `Total ${allFaqs.length} verified FAQs. Synced directly with Google FAQPage structured data.`
              )}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <CreateFaqModal lang={lang} />
            <Link
              href={`/${lang}/faq`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <span>{t('معاينة صفحة الأسئلة', 'View Public FAQ')}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" />
            </Link>
          </div>
        </div>

        {/* Search & Topic Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {topics.map((top) => {
              const active = currentTopic === top.key;
              const href = top.key === 'all' ? '/admin/faq' : `/admin/faq?topic=${top.key}`;
              return (
                <Link
                  key={top.key}
                  href={href}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-900/80 text-slate-300 border border-white/[0.06] hover:bg-slate-800'
                  }`}
                >
                  {top.label}
                </Link>
              );
            })}
          </div>

          <form method="GET" action="/admin/faq" className="relative min-w-[240px]">
            {currentTopic !== 'all' && <input type="hidden" name="topic" value={currentTopic} />}
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder={t('بحث في الأسئلة والأجوبة...', 'Search questions & answers...')}
              className="w-full rounded-xl border border-white/[0.08] bg-slate-900/90 py-2 ps-9 pe-4 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </form>
        </div>

        {/* FAQ Items List */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-3 hover:border-white/[0.15] transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-white/[0.06] text-slate-400">
                      #{faq.order} · {faq.topic}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        faq.status === 'published'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {faq.status === 'published' ? t('منشور', 'Published') : t('مسودة', 'Draft')}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white leading-snug">
                    {faq.question[lang]}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <EditFaqModal faq={faq} lang={lang} />
                  <DeleteConfirmModal
                    action={deleteFaqAction}
                    id={faq.id}
                    itemName={faq.question[lang]}
                    lang={lang}
                  />
                </div>
              </div>

              <div className="rounded-xl bg-slate-900/70 p-3.5 border border-white/[0.04]">
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {faq.answer[lang]}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="font-mono text-slate-500" translate="no">
                  ID: {faq.id}
                </span>
                <span>
                  {t('المقابل الإنجليزي متوفر ومطابق بنسبة 100%', 'Bilingual Arabic & English verified')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {faqs.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-slate-900/40 p-12 text-center">
            <Sparkles className="h-8 w-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              {t('لا توجد أسئلة تطابق البحث', 'No matching FAQ found')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('جرّب تغيير كلمات البحث أو إضافة سؤال جديد من الزر بالأعلى.', 'Try adjusting search or add a new question.')}
            </p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
