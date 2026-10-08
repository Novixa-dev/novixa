import { STATUS_LABELS, type AdminLang } from '@/app/admin/i18n';
import type { LeadStatus } from '@/lib/leads';

/**
 * Neutral pill with the status written out. Status is a pipeline stage, not a
 * health signal, so it carries no traffic-light colour — except `new`, the one
 * state that asks for action, which gets the action colour.
 */
export function StatusBadge({ status, lang }: { status: LeadStatus; lang: AdminLang }) {
  const tone =
    status === 'new'
      ? 'border-blue-500/40 bg-blue-600/15 text-blue-200'
      : 'border-white/[0.1] bg-white/[0.03] text-slate-300';
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${tone}`}>
      {STATUS_LABELS[status][lang]}
    </span>
  );
}
