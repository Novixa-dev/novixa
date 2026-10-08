import { randomUUID } from 'node:crypto';
import {
  emptyDailySeries,
  emptySourceCounts,
  emptyStatusCounts,
  type Lead,
  type LeadInput,
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

  async create(input: LeadInput): Promise<Lead> {
    const now = new Date();
    const lead: Lead = {
      ...input,
      id: randomUUID(),
      status: 'new',
      notes: '',
      emailDelivered: false,
      createdAt: now,
      updatedAt: now,
    };
    this.leads.set(lead.id, lead);
    return lead;
  }

  async list(query: LeadQuery): Promise<{ rows: Lead[]; total: number }> {
    const needle = query.search?.trim().toLowerCase();
    const matching = [...this.leads.values()]
      .filter((lead) => !query.status || lead.status === query.status)
      .filter((lead) => !query.source || lead.source === query.source)
      .filter(
        (lead) =>
          !needle ||
          [lead.name, lead.email, lead.company ?? '', lead.receiptId].some((field) =>
            field.toLowerCase().includes(needle)
          )
      )
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
    return this.update(id, { status });
  }

  async updateNotes(id: string, notes: string): Promise<Lead | null> {
    return this.update(id, { notes });
  }

  async markDelivered(id: string, delivered: boolean): Promise<void> {
    this.update(id, { emailDelivered: delivered });
  }

  async remove(id: string): Promise<boolean> {
    return this.leads.delete(id);
  }

  async stats(now = new Date()): Promise<LeadStats> {
    const all = [...this.leads.values()];
    const day = 86_400_000;
    const byStatus = emptyStatusCounts();
    const bySource = emptySourceCounts();
    const daily = emptyDailySeries(now);
    const dayIndex = new Map(daily.map((bucket, index) => [bucket.date, index]));

    for (const lead of all) {
      byStatus[lead.status] += 1;
      bySource[lead.source] += 1;
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
      byStatus,
      bySource,
      daily,
      latestAt: latest,
    };
  }

  async health() {
    return { ok: true, detail: 'in-memory (not persistent)' };
  }
}
