import {
  Handshake,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
  TrendingUp,
  Search,
  Building,
} from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminLang, translator } from '../i18n';
import { getContentStore } from '@/lib/content-store';
import { CreatePartnerModal } from '@/components/admin/CreatePartnerModal';
import { RecordCommissionModal } from '@/components/admin/RecordCommissionModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { deletePartnerAction, updateCommissionStatusAction } from '../actions';

export default async function AdminAffiliatesPage({
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
  const allPartners = await store.listPartners(query);
  const allCommissions = await store.listCommissions();

  // Metrics
  const totalSales = allCommissions.reduce((sum, c) => sum + c.saleAmountUsd, 0);
  const totalCommissionsEarned = allCommissions.reduce((sum, c) => sum + c.commissionAmountUsd, 0);
  const paidCommissions = allCommissions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + c.commissionAmountUsd, 0);
  const pendingCommissions = allCommissions
    .filter((c) => c.status === 'pending_review' || c.status === 'approved')
    .reduce((sum, c) => sum + c.commissionAmountUsd, 0);

  return (
    <AdminShell lang={lang} email={session.email} active="affiliates">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-600/15 text-emerald-400 text-xs font-semibold mb-2">
              <Handshake className="h-3.5 w-3.5" />
              <span>{t('برنامج الشركاء والعمولات (30%)', 'Partner Program & Commissions (30%)')}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">
              {t('إدارة الشركاء وسجل مستحقات العمولات (CRUD)', 'Manage Affiliates & Commission Ledger')}
            </h1>
            <p className="text-sm text-slate-400">
              {t(
                'برنامج الشراكة المعتمد لنوڤيكسا: عمولة أساسية 30% على كل عقد منصة أو حل برمجي يتم إحالته بنجاح.',
                'Official Novixa Partner Program: 30% baseline commission on referred platforms and software contracts.'
              )}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <RecordCommissionModal partners={allPartners} lang={lang} />
            <CreatePartnerModal lang={lang} />
          </div>
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t('إجمالي الشركاء المعتمدين', 'Total Partners')}</span>
              <Handshake className="h-4 w-4 text-blue-400" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-white">
              {allPartners.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {t('نسبة الأساس الافتراضية 30%', '30% baseline commission')}
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t('إجمالي الصفقات المحالة', 'Total Attributed Sales')}</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-emerald-400 font-mono">
              ${totalSales.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              ${totalCommissionsEarned.toLocaleString()} {t('عمولات مولدة', 'commissions earned')} ({allCommissions.length} {t('صفقة', 'deals')})
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t('عمولات قيد الصرف', 'Pending Payout')}</span>
              <Clock className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-amber-400 font-mono">
              ${pendingCommissions.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {t('بانتظار التحويل المالي', 'Awaiting disbursement')}
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t('عمولات مسددة بالكامل', 'Paid Commissions')}</span>
              <ShieldCheck className="h-4 w-4 text-blue-400" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-white font-mono">
              ${paidCommissions.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {t('تمت تسويتها بنجاح', 'Settled successfully')}
            </div>
          </div>
        </div>

        {/* Partners Directory */}
        <div className="glass-card rounded-2xl border border-white/[0.08] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-base font-bold text-white">
                {t('دليل الشركاء وأكواد الإحالة', 'Partners Directory & Referral Codes')}
              </h2>
              <p className="text-xs text-slate-400">
                {t('إدارة بيانات الشركاء وتعيين نسب العمولات وحذف أو تعديل السجلات.', 'Manage partners, commissions rates, and referral codes.')}
              </p>
            </div>
            <form method="GET" action="/admin/affiliates" className="relative min-w-[240px]">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder={t('بحث بالاسم، الكود، أو البريد...', 'Search by name, code, email...')}
                className="w-full rounded-xl border border-white/[0.08] bg-slate-900/90 py-2 ps-9 pe-4 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {allPartners.map((partner) => (
              <div
                key={partner.id}
                className="rounded-xl border border-white/[0.06] bg-slate-900/70 p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-white">
                      {partner.name}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        partner.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {partner.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>{partner.email}</span>
                  </div>

                  {partner.company && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Building className="h-3 w-3 text-slate-400" />
                      <span>{partner.company}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-white/[0.04] text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">{t('كود الإحالة', 'Referral Code')}</div>
                      <div className="font-mono font-bold text-blue-400 uppercase tracking-wider">
                        {partner.referralCode}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="text-[10px] text-slate-400">{t('النسبة', 'Rate')}</div>
                      <div className="font-mono font-bold text-emerald-400">
                        {partner.defaultCommissionRate}%
                      </div>
                    </div>
                  </div>

                  {partner.agreementNotes && (
                    <p className="text-[11px] text-slate-400 italic">
                      "{partner.agreementNotes}"
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {partner.createdAt.slice(0, 10)}
                  </span>
                  <DeleteConfirmModal
                    action={deletePartnerAction}
                    id={partner.id}
                    itemName={partner.name}
                    lang={lang}
                  />
                </div>
              </div>
            ))}
          </div>

          {allPartners.length === 0 && (
            <div className="text-center py-10 space-y-2">
              <Handshake className="h-8 w-8 text-slate-500 mx-auto" />
              <div className="text-xs text-slate-400">
                {t('لا يوجد شركاء مسجلون حالياً.', 'No partners registered yet.')}
              </div>
            </div>
          )}
        </div>

        {/* Commissions Ledger */}
        <div className="glass-card rounded-2xl border border-white/[0.08] p-6 space-y-4">
          <div>
            <h2 className="font-display text-base font-bold text-white">
              {t('سجل العمولات والصفقات المحالة', 'Commission Ledger & Attributed Transactions')}
            </h2>
            <p className="text-xs text-slate-400">
              {t('متابعة مستحقات العمولات واعتمادها وتحديث حالة الصرف والتسوية المالية.', 'Track commissions, approve payouts, and mark disbursements.')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 text-start">
                  <th className="pb-3 font-medium text-start">{t('الشريك', 'Partner')}</th>
                  <th className="pb-3 font-medium text-start">{t('قيمة الصفقة', 'Sale Amount')}</th>
                  <th className="pb-3 font-medium text-start">{t('النسبة', 'Rate')}</th>
                  <th className="pb-3 font-medium text-start">{t('مبلغ العمولة', 'Commission')}</th>
                  <th className="pb-3 font-medium text-start">{t('الحالة', 'Status')}</th>
                  <th className="pb-3 font-medium text-start">{t('التاريخ', 'Date')}</th>
                  <th className="pb-3 font-medium text-end">{t('الإجراءات', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {allCommissions.map((comm) => (
                  <tr key={comm.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-medium text-white">
                      {comm.partnerName}
                      {comm.leadId && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          Ref: {comm.leadId}
                        </div>
                      )}
                    </td>
                    <td className="py-3 font-mono text-slate-300">
                      ${comm.saleAmountUsd.toLocaleString()}
                    </td>
                    <td className="py-3 font-mono text-blue-400">
                      {comm.commissionRate}%
                    </td>
                    <td className="py-3 font-mono font-bold text-emerald-400">
                      ${comm.commissionAmountUsd.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          comm.status === 'paid'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : comm.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : comm.status === 'pending_review'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {comm.status === 'paid' && <CheckCircle2 className="h-3 w-3" />}
                        {comm.status === 'approved' && <CheckCircle2 className="h-3 w-3" />}
                        {comm.status === 'pending_review' && <Clock className="h-3 w-3" />}
                        {(comm.status === 'disputed' || comm.status === 'reversed') && <XCircle className="h-3 w-3" />}
                        <span>{comm.status}</span>
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 font-mono text-[11px]">
                      {comm.recordedAt.slice(0, 10)}
                    </td>
                    <td className="py-3 text-end">
                      <div className="inline-flex items-center gap-1.5">
                        {comm.status !== 'paid' && (
                          <form action={updateCommissionStatusAction}>
                            <input type="hidden" name="id" value={comm.id} />
                            <input type="hidden" name="status" value="paid" />
                            <button
                              type="submit"
                              className="px-2 py-1 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[11px] font-medium hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              {t('تسجيل السداد', 'Mark Paid')}
                            </button>
                          </form>
                        )}
                        {comm.status === 'pending_review' && (
                          <form action={updateCommissionStatusAction}>
                            <input type="hidden" name="id" value={comm.id} />
                            <input type="hidden" name="status" value="approved" />
                            <button
                              type="submit"
                              className="px-2 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                              {t('اعتماد', 'Approve')}
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {allCommissions.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400">
                {t('لا توجد صفقات أو عمولات مسجلة حتى الآن.', 'No commission entries recorded yet.')}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
