import React from 'react';
import Link from 'next/link';
import { Lead, LeadStatus } from '@/lib/leads';
import { PriorityBadge } from './PriorityBadge';
import { formatDate, STATUS_LABELS, AdminLang, translator } from '@/app/admin/i18n';
import { Calendar, Tag, ArrowUpRight, Inbox } from 'lucide-react';

interface LeadsPipelineViewProps {
  leads: Lead[];
  lang: AdminLang;
}

const PIPELINE_STAGES: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'won'];

const STAGE_ACCENTS: Record<LeadStatus, { border: string; bg: string; dot: string }> = {
  new: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', dot: 'bg-blue-400' },
  contacted: { border: 'border-slate-500/30', bg: 'bg-slate-500/10', dot: 'bg-slate-400' },
  qualified: { border: 'border-teal-500/30', bg: 'bg-teal-500/10', dot: 'bg-teal-400' },
  proposal: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', dot: 'bg-amber-400' },
  won: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400' },
  lost: { border: 'border-rose-500/30', bg: 'bg-rose-500/10', dot: 'bg-rose-400' },
  spam: { border: 'border-zinc-500/30', bg: 'bg-zinc-500/10', dot: 'bg-zinc-400' },
};

export const LeadsPipelineView: React.FC<LeadsPipelineViewProps> = ({ leads, lang }) => {
  const t = translator(lang);

  // Group leads by stage
  const columns = PIPELINE_STAGES.map((stage) => {
    const stageLeads = leads.filter((lead) => lead.status === stage);
    return {
      stage,
      label: STATUS_LABELS[stage][lang],
      leads: stageLeads,
      accent: STAGE_ACCENTS[stage],
    };
  });

  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex gap-4 min-w-[1100px] items-start">
        {columns.map(({ stage, label, leads: columnLeads, accent }) => (
          <div
            key={stage}
            className="flex-1 min-w-[220px] rounded-2xl border border-white/[0.08] bg-slate-900/40 p-3 space-y-3"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-1 pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
                <h3 className="text-xs font-semibold text-white">{label}</h3>
              </div>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-300">
                {columnLeads.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="space-y-2.5 min-h-[300px]">
              {columnLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center text-xs text-slate-400 border border-dashed border-white/[0.06] rounded-xl p-3">
                  <Inbox className="h-4 w-4 mb-1 text-slate-400" />
                  <span>{t('لا توجد طلبات', 'No leads')}</span>
                </div>
              ) : (
                columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="group glass-card rounded-xl border border-white/[0.08] p-3 space-y-2 hover:border-white/[0.18] transition-all bg-slate-950/70"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-medium text-xs text-white group-hover:text-blue-300 transition-colors line-clamp-1"
                      >
                        {lead.name}
                      </Link>
                      <PriorityBadge priority={lead.priority} lang={lang} />
                    </div>

                    {lead.company && (
                      <div className="text-[11px] text-slate-300 truncate">{lead.company}</div>
                    )}

                    {lead.tags && lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {lead.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.2 text-[9px] text-teal-300 bg-teal-950/40 border border-teal-500/20"
                          >
                            <Tag className="h-2 w-2" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-white/[0.04]">
                      <span className="font-mono">{formatDate(lead.createdAt, lang)}</span>
                      {lead.followUpDate ? (
                        <span className="inline-flex items-center gap-1 text-amber-300 font-mono">
                          <Calendar className="h-2.5 w-2.5" />
                          {formatDate(lead.followUpDate, lang)}
                        </span>
                      ) : (
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-300 flex items-center gap-0.5 transition-opacity"
                        >
                          <span>{t('تفاصيل', 'View')}</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
