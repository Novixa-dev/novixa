import { PRIORITY_LABELS, type AdminLang } from '@/app/admin/i18n';
import type { LeadPriority } from '@/lib/leads';

export function PriorityBadge({ priority, lang }: { priority: LeadPriority; lang: AdminLang }) {
  const tones: Record<LeadPriority, string> = {
    urgent: 'border-rose-500/40 bg-rose-600/15 text-rose-200 font-semibold',
    high: 'border-amber-500/40 bg-amber-600/15 text-amber-200',
    medium: 'border-blue-500/30 bg-blue-600/10 text-blue-300',
    low: 'border-white/[0.08] bg-white/[0.03] text-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${tones[priority] ?? tones.medium}`}
    >
      {PRIORITY_LABELS[priority]?.[lang] ?? priority}
    </span>
  );
}
