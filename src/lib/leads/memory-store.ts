import { randomUUID } from 'node:crypto';
import {
  emptyDailySeries,
  emptyPriorityCounts,
  emptySourceCounts,
  emptyStatusCounts,
  type Lead,
  type LeadActivity,
  type LeadInput,
  type LeadPriority,
  type LeadQuery,
  type LeadStats,
  type LeadStatus,
  type LeadStore,
} from './types';

/**
 * An in-process store for the browser suite and local development.
 *
 * Never selected implicitly: it is used only when `LEADS_STORE=memory` is set,
 * and the admin shows a standing warning while it is active, because everything
 * in it disappears on restart. Behaviour mirrors the Postgres store so the same
 * admin and the same tests exercise both.
 */
export class MemoryLeadStore implements LeadStore {
  readonly kind = 'memory' as const;
  private readonly leads = new Map<string, Lead>();
  private readonly activities = new Map<string, LeadActivity[]>();

  async create(input: LeadInput): Promise<Lead> {
    const now = new Date();
    const lead: Lead = {
      ...input,
      id: randomUUID(),
      status: 'new',
      priority: input.priority ?? 'medium',
      followUpDate: null,
      assignee: undefined,
      tags: input.tags ?? [],
      notes: '',
      emailDelivered: false,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      referrer: input.referrer,
      createdAt: now,
      updatedAt: now,
    };
    this.leads.set(lead.id, lead);

    // Initial creation activity
    await this.logActivity(lead.id, 'System', 'created', 'Enquiry received');
    return lead;
  }

  async list(query: LeadQuery): Promise<{ rows: Lead[]; total: number }> {
    const needle = query.search?.trim().toLowerCase();
    const matching = [...this.leads.values()]
      .filter((lead) => !query.status || lead.status === query.status)
      .filter((lead) => !query.source || lead.source === query.source)
      .filter((lead) => !query.priority || lead.priority === query.priority)
      .filter((lead) => {
        if (!needle) return true;
        const tagMatch = lead.tags.some((t) => t.toLowerCase().includes(needle));
        const assigneeMatch = lead.assignee?.toLowerCase().includes(needle);
        const utmMatch = lead.utmSource?.toLowerCase().includes(needle);
        return (
          tagMatch ||
          Boolean(assigneeMatch) ||
          Boolean(utmMatch) ||
          [lead.name, lead.email, lead.company ?? '', lead.receiptId].some((field) =>
            field.toLowerCase().includes(needle)
          )
        );
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return { rows: matching.slice(query.offset, query.offset + query.limit), total: matching.length };
  }

  async get(id: string): Promise<Lead | null> {
    return this.leads.get(id) ?? null;
  }

  private update(id: string, patch: Partial<Lead>): Lead | null {
    const lead = this.leads.get(id);
    if (!lead) return null;
    const next = { ...lead, ...patch, updatedAt: new Date() };
    this.leads.set(id, next);
    return next;
  }

  async updateStatus(id: string, status: LeadStatus): Promise<Lead | null> {
    const prev = this.leads.get(id);
    const updated = this.update(id, { status });
    if (updated && prev && prev.status !== status) {
      await this.logActivity(id, 'Admin', 'status_changed', `Status changed from ${prev.status} to ${status}`);
    }
    return updated;
  }

  async updatePriority(id: string, priority: LeadPriority): Promise<Lead | null> {
    const prev = this.leads.get(id);
    const updated = this.update(id, { priority });
    if (updated && prev && prev.priority !== priority) {
      await this.logActivity(id, 'Admin', 'priority_changed', `Priority changed from ${prev.priority} to ${priority}`);
    }
    return updated;
  }

  async updateFollowUp(id: string, date: Date | null): Promise<Lead | null> {
    const updated = this.update(id, { followUpDate: date });
    if (updated) {
      const formatted = date ? date.toISOString().slice(0, 10) : 'cleared';
      await this.logActivity(id, 'Admin', 'follow_up_set', `Follow-up date set to ${formatted}`);
    }
    return updated;
  }

  async updateAssignee(id: string, assignee: string | null): Promise<Lead | null> {
    const updated = this.update(id, { assignee: assignee || undefined });
    if (updated) {
      await this.logActivity(id, 'Admin', 'assignee_changed', `Assigned to ${assignee || 'Unassigned'}`);
    }
    return updated;
  }

  async updateTags(id: string, tags: string[]): Promise<Lead | null> {
    const updated = this.update(id, { tags });
    if (updated) {
      await this.logActivity(id, 'Admin', 'tags_updated', `Tags updated: ${tags.join(', ')}`);
    }
    return updated;
  }

  async updateNotes(id: string, notes: string): Promise<Lead | null> {
    const updated = this.update(id, { notes });
    if (updated) {
      await this.logActivity(id, 'Admin', 'note_updated', 'Internal notes updated');
    }
    return updated;
  }

  async logActivity(leadId: string, author: string, action: string, details?: string): Promise<LeadActivity> {
    const activity: LeadActivity = {
      id: randomUUID(),
      leadId,
      author,
      action,
      details,
      createdAt: new Date(),
    };
    const list = this.activities.get(leadId) || [];
    list.unshift(activity);
    this.activities.set(leadId, list);
    return activity;
  }

  async getActivities(leadId: string): Promise<LeadActivity[]> {
    return this.activities.get(leadId) || [];
  }

  async markDelivered(id: string, delivered: boolean): Promise<void> {
    this.update(id, { emailDelivered: delivered });
  }

  async remove(id: string): Promise<boolean> {
    this.activities.delete(id);
    return this.leads.delete(id);
  }

  async stats(now = new Date()): Promise<LeadStats> {
    const all = [...this.leads.values()];
    const day = 86_400_000;
    const byStatus = emptyStatusCounts();
    const bySource = emptySourceCounts();
    const byPriority = emptyPriorityCounts();
    const daily = emptyDailySeries(now);
    const dayIndex = new Map(daily.map((bucket, index) => [bucket.date, index]));
    const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).getTime();

    let followUpDue = 0;

    for (const lead of all) {
      byStatus[lead.status] += 1;
      bySource[lead.source] += 1;
      byPriority[lead.priority] += 1;

      if (lead.followUpDate && !['won', 'lost', 'spam'].includes(lead.status)) {
        if (lead.followUpDate.getTime() <= startOfToday + day) {
          followUpDue += 1;
        }
      }

      const index = dayIndex.get(lead.createdAt.toISOString().slice(0, 10));
      if (index !== undefined) daily[index].count += 1;
    }

    const latest = all.reduce<Date | null>(
      (max, lead) => (!max || lead.createdAt > max ? lead.createdAt : max),
      null
    );

    return {
      total: all.length,
      last7Days: all.filter((lead) => now.getTime() - lead.createdAt.getTime() < 7 * day).length,
      last30Days: all.filter((lead) => now.getTime() - lead.createdAt.getTime() < 30 * day).length,
      awaitingFirstResponse: byStatus.new,
      followUpDue,
      byStatus,
      bySource,
      byPriority,
      daily,
      latestAt: latest,
    };
  }

  async health() {
    return { ok: true, detail: 'in-memory (not persistent)' };
  }
}
