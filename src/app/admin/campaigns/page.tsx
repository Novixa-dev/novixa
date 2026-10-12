import {
  HeartHandshake,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Award,
  Sparkles,
} from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminLang, translator } from '../i18n';
import { getContentStore } from '@/lib/content-store';
import { CreateCampaignModal } from '@/components/admin/CreateCampaignModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { deleteCampaignAction, updateApplicationStatusAction } from '../actions';

export default async function AdminCampaignsPage() {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);

  const store = getContentStore();
  const allCampaigns = await store.listCampaigns();
  const allApplications = await store.listApplications();

  const acceptedApps = allApplications.filter((a) => a.status === 'accepted');
  const pendingApps = allApplications.filter((a) => a.status === 'new' || a.status === 'in_review');

  return (
    <AdminShell lang={lang} email={session.email} active="campaigns">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600/15 text-blue-400 text-xs font-semibold mb-2">
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>{t('المبادرات المجتمعية والمنح (CRUD)', 'Community Initiatives & Pro-Bono (CRUD)')}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">
              {t('إدارة مبادرات المجتمع وفرز طلبات الدعم', 'Manage Campaigns & Review Applications')}
            </h1>
            <p className="text-sm text-slate-400">
              {t(
                'برامج نوڤيكسا للمسؤولية المجتمعية: دعم الفعاليات التقنية وبناء مواقع الهاكاثونات ودعم المطورين غير الربحيين.',
                'Novixa CSR programs: supporting tech conferences, building hackathon sites, and gifting dev licenses pro-bono.'
              )}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <CreateCampaignModal lang={lang} />
          </div>
        </div>

        {/* CSR Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t('المبادرات النشطة', 'Active Campaigns')}</span>
              <HeartHandshake className="h-4 w-4 text-blue-400" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-white">
              {allCampaigns.filter((c) => c.status === 'active').length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {allCampaigns.length} {t('إجمالي البرامج', 'total programs')}
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t('طلبات الدعم المستلمة', 'Applications Received')}</span>
              <Users className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-emerald-400 font-mono">
              {allApplications.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {t('من مجتمعات تقنية وطلابية', 'from dev communities')}
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t('طلبات بانتظار المراجعة', 'Pending Triage')}</span>
              <Clock className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-amber-400 font-mono">
              {pendingApps.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {t('تتطلب قرار القبول أو التوجيه', 'Action needed')}
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t('مبادرات تم دعمها بنجاح', 'Granted / Pro-Bono')}</span>
              <Award className="h-4 w-4 text-blue-400" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-white font-mono">
              {acceptedApps.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {t('مشاريع معتمدة', 'Beneficiaries awarded')}
            </div>
          </div>
        </div>

        {/* Active Campaigns Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-white">
              {t('برامج الدعم والمبادرات المعمارية', 'Active Community Initiatives')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-blue-600/15 text-blue-400 border border-blue-500/20">
                      /{camp.slug}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        camp.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {camp.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      {lang === 'ar' ? camp.title.ar : camp.title.en}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {lang === 'ar' ? camp.description.ar : camp.description.en}
                    </p>
                  </div>

                  {camp.eligibility && (
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.04] text-xs">
                      <div className="text-slate-400 text-[10px] font-medium">
                        {t('معايير الأهلية والقبول:', 'Eligibility Criteria:')}
                      </div>
                      <div className="text-slate-300 mt-0.5">
                        {lang === 'ar' ? camp.eligibility.ar : camp.eligibility.en}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>
                      {t('الحد الأقصى:', 'Quota limit:')}{' '}
                      <strong className="text-white font-mono">{camp.quotaLimit ?? '∞'}</strong> {t('مشاريع', 'projects')}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {t('البدء:', 'Started:')} {camp.startDate}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {camp.startDate}
                  </span>
                  <DeleteConfirmModal
                    action={deleteCampaignAction}
                    id={camp.id}
                    itemName={lang === 'ar' ? camp.title.ar : camp.title.en}
                    lang={lang}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Review & Triage Table */}
        <div className="glass-card rounded-2xl border border-white/[0.08] p-6 space-y-4">
          <div>
            <h2 className="font-display text-base font-bold text-white">
              {t('سجل طلبات الدعم والفرز (Triage)', 'Community Applications & Triage')}
            </h2>
            <p className="text-xs text-slate-400">
              {t('مراجعة طلبات استضافة الفعاليات والتراخيص المجانية واعتمادها وتغيير حالتها فورياً.', 'Review pro-bono requests, approve grants, and track delivery.')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 text-start">
                  <th className="pb-3 font-medium text-start">{t('مقدم الطلب', 'Applicant')}</th>
                  <th className="pb-3 font-medium text-start">{t('الجهة / المنظمة', 'Organization')}</th>
                  <th className="pb-3 font-medium text-start">{t('المبادرة المعنية', 'Campaign')}</th>
                  <th className="pb-3 font-medium text-start">{t('تفاصيل الطلب', 'Details')}</th>
                  <th className="pb-3 font-medium text-start">{t('الحالة', 'Status')}</th>
                  <th className="pb-3 font-medium text-start">{t('التاريخ', 'Date')}</th>
                  <th className="pb-3 font-medium text-end">{t('الفرز والإجراء', 'Triage Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {allApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-medium text-white">
                      <div>{app.applicantName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{app.applicantEmail}</div>
                    </td>
                    <td className="py-3 text-slate-300">
                      {app.organizationOrProject || '—'}
                    </td>
                    <td className="py-3 text-blue-400 text-[11px] font-medium">
                      {app.campaignTitle}
                    </td>
                    <td className="py-3 text-slate-300 max-w-xs truncate" title={app.details}>
                      {app.details}
                      {app.internalNotes && (
                        <div className="text-[10px] text-amber-400 italic">
                          Note: {app.internalNotes}
                        </div>
                      )}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          app.status === 'accepted'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : app.status === 'in_review'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : app.status === 'rejected'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {app.status === 'accepted' && <CheckCircle2 className="h-3 w-3" />}
                        {app.status === 'rejected' && <XCircle className="h-3 w-3" />}
                        {app.status === 'in_review' && <Clock className="h-3 w-3" />}
                        {app.status === 'new' && <Sparkles className="h-3 w-3" />}
                        <span>{app.status}</span>
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 font-mono text-[11px]">
                      {app.submittedAt.slice(0, 10)}
                    </td>
                    <td className="py-3 text-end">
                      <div className="inline-flex items-center gap-1.5">
                        {app.status !== 'accepted' && (
                          <form action={updateApplicationStatusAction}>
                            <input type="hidden" name="id" value={app.id} />
                            <input type="hidden" name="status" value="accepted" />
                            <button
                              type="submit"
                              className="px-2 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                              {t('قبول المنحة', 'Accept')}
                            </button>
                          </form>
                        )}
                        {app.status === 'new' && (
                          <form action={updateApplicationStatusAction}>
                            <input type="hidden" name="id" value={app.id} />
                            <input type="hidden" name="status" value="in_review" />
                            <button
                              type="submit"
                              className="px-2 py-1 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[11px] font-medium hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              {t('قيد المراجعة', 'Review')}
                            </button>
                          </form>
                        )}
                        {app.status !== 'rejected' && (
                          <form action={updateApplicationStatusAction}>
                            <input type="hidden" name="id" value={app.id} />
                            <input type="hidden" name="status" value="rejected" />
                            <button
                              type="submit"
                              className="px-2 py-1 rounded-lg bg-red-600/20 text-red-300 border border-red-500/30 text-[11px] font-medium hover:bg-red-600 hover:text-white transition-colors"
                            >
                              {t('رفض', 'Reject')}
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {allApplications.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400">
                {t('لا توجد طلبات دعم مستلمة حالياً.', 'No applications received yet.')}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
