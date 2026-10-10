import type { Pool } from 'pg';
import { runMigrations } from './migrations';
import {
  emptyDailySeries,
  emptyPriorityCounts,
  emptySourceCounts,
  emptyStatusCounts,
  isLeadPriority,
  isLeadSource,
  isLeadStatus,
  type Lead,
  type LeadActivity,
  type LeadInput,
  type LeadPriority,
  type LeadQuery,
  type LeadStats,
  type LeadStatus,
  type LeadStore,
} from './types';

interface LeadRow {
  id: string;
  receipt_id: string;
  source: string;
  locale: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  project_type: string | null;
  service_needed: string | null;
  industry: string | null;
  problem: string | null;
  existing_system: string | null;
  budget_range: string | null;
  timeline: string | null;
  details: string | null;
  status: string;
  priority?: string | null;
  follow_up_date?: Date | string | null;
  assignee?: string | null;
  tags?: string[] | null;
  notes: string;
  email_delivered: boolean;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  referrer?: string | null;
  created_at: Date;
  updated_at: Date;
}

interface LeadActivityRow {
  id: string;
  lead_id: string;
  author: string;
  action: string;
  details: string | null;
  created_at: Date;
}

const optional = (value: string | null | undefined): string | undefined => value ?? undefined;

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    receiptId: row.receipt_id,
    source: isLeadSource(row.source) ? row.source : 'contact',
    locale: row.locale === 'en' ? 'en' : 'ar',
    name: row.name,
    email: row.email,
    company: optional(row.company),
    phone: optional(row.phone),
    projectType: optional(row.project_type),
    serviceNeeded: optional(row.service_needed),
    industry: optional(row.industry),
    problem: optional(row.problem),
    existingSystem: optional(row.existing_system),
    budgetRange: optional(row.budget_range),
    timeline: optional(row.timeline),
    details: optional(row.details),
    status: isLeadStatus(row.status) ? row.status : 'new',
    priority: isLeadPriority(row.priority) ? row.priority : 'medium',
    followUpDate: row.follow_up_date ? new Date(row.follow_up_date) : null,
    assignee: optional(row.assignee),
    tags: Array.isArray(row.tags) ? row.tags : [],
    notes: row.notes,
    emailDelivered: row.email_delivered,
    utmSource: optional(row.utm_source),
    utmMedium: optional(row.utm_medium),
    utmCampaign: optional(row.utm_campaign),
    referrer: optional(row.referrer),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** A UUID check before a query, so a garbage id is a clean "not found" rather than a 22P02 error. */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class PostgresLeadStore implements LeadStore {
  readonly kind = 'postgres' as const;
  private schemaReady: Promise<unknown> | null = null;

  constructor(private readonly pool: Pool) {}

  /** Migrations run once per process, lazily, on first use. */
  private ready(): Promise<unknown> {
    if (!this.schemaReady) {
      this.schemaReady = runMigrations(this.pool).catch((error) => {
        // Let the next call retry rather than caching a failure forever.
        this.schemaReady = null;
        throw error;
      });
    }
    return this.schemaReady;
  }

  async create(input: LeadInput): Promise<Lead> {
    await this.ready();
    const { rows } = await this.pool.query<LeadRow>(
      `INSERT INTO leads (
         receipt_id, source, locale, name, email, company, phone, project_type,
         service_needed, industry, problem, existing_system, budget_range, timeline, details,
         priority, tags, utm_source, utm_medium, utm_campaign, referrer
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
       RETURNING *`,
      [
        input.receiptId,
        input.source,
        input.locale,
        input.name,
        input.email,
        input.company || null,
        input.phone || null,
        input.projectType || null,
        input.serviceNeeded || null,
        input.industry || null,
        input.problem || null,
        input.existingSystem || null,
        input.budgetRange || null,
        input.timeline || null,
        input.details || null,
        input.priority || 'medium',
        input.tags || [],
        input.utmSource || null,
        input.utmMedium || null,
        input.utmCampaign || null,
        input.referrer || null,
      ]
    );
    const lead = toLead(rows[0]);
    await this.logActivity(lead.id, 'System', 'created', 'Enquiry received');
    return lead;
  }

  async list(query: LeadQuery): Promise<{ rows: Lead[]; total: number }> {
    await this.ready();
    const where: string[] = [];
    const params: unknown[] = [];
    if (query.status) {
      params.push(query.status);
      where.push(`status = $${params.length}`);
    }
    if (query.source) {
      params.push(query.source);
      where.push(`source = $${params.length}`);
    }
    if (query.priority) {
      params.push(query.priority);
      where.push(`priority = $${params.length}`);
    }
    const needle = query.search?.trim();
    if (needle) {
      // Escape LIKE metacharacters so a search for "50%" means fifty percent.
      params.push(`%${needle.replace(/[\\%_]/g, (char) => `\\${char}`)}%`);
      const p = `$${params.length}`;
      where.push(
        `(name ILIKE ${p} OR email ILIKE ${p} OR coalesce(company,'') ILIKE ${p} OR receipt_id ILIKE ${p} OR coalesce(assignee,'') ILIKE ${p} OR coalesce(utm_source,'') ILIKE ${p})`
      );
    }
    const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const total = await this.pool.query<{ count: string }>(`SELECT count(*) FROM leads ${clause}`, params);
    const { rows } = await this.pool.query<LeadRow>(
      `SELECT * FROM leads ${clause} ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, query.limit, query.offset]
    );
    return { rows: rows.map(toLead), total: Number(total.rows[0].count) };
  }

  async get(id: string): Promise<Lead | null> {
    if (!UUID_RE.test(id)) return null;
    await this.ready();
    const { rows } = await this.pool.query<LeadRow>('SELECT * FROM leads WHERE id = $1', [id]);
    return rows[0] ? toLead(rows[0]) : null;
  }

  private async patch(id: string, column: 'status' | 'priority' | 'notes', value: string): Promise<Lead | null> {
    if (!UUID_RE.test(id)) return null;
    await this.ready();
    const { rows } = await this.pool.query<LeadRow>(
      `UPDATE leads SET ${column} = $2, updated_at = now() WHERE id = $1 RETURNING *`,
      [id, value]
    );
    return rows[0] ? toLead(rows[0]) : null;
  }

  async updateStatus(id: string, status: LeadStatus) {
    const prev = await this.get(id);
    const updated = await this.patch(id, 'status', status);
    if (updated && prev && prev.status !== status) {
      await this.logActivity(id, 'Admin', 'status_changed', `Status changed from ${prev.status} to ${status}`);
    }
    return updated;
  }

  async updatePriority(id: string, priority: LeadPriority) {
    const prev = await this.get(id);
    const updated = await this.patch(id, 'priority', priority);
    if (updated && prev && prev.priority !== priority) {
      await this.logActivity(id, 'Admin', 'priority_changed', `Priority changed from ${prev.priority} to ${priority}`);
    }
    return updated;
  }

  async updateFollowUp(id: string, date: Date | null): Promise<Lead | null> {
    if (!UUID_RE.test(id)) return null;
    await this.ready();
    const { rows } = await this.pool.query<LeadRow>(
      `UPDATE leads SET follow_up_date = $2, updated_at = now() WHERE id = $1 RETURNING *`,
      [id, date]
    );
    const updated = rows[0] ? toLead(rows[0]) : null;
    if (updated) {
      const formatted = date ? date.toISOString().slice(0, 10) : 'cleared';
      await this.logActivity(id, 'Admin', 'follow_up_set', `Follow-up date set to ${formatted}`);
    }
    return updated;
  }

  async updateAssignee(id: string, assignee: string | null): Promise<Lead | null> {
    if (!UUID_RE.test(id)) return null;
    await this.ready();
    const { rows } = await this.pool.query<LeadRow>(
      `UPDATE leads SET assignee = $2, updated_at = now() WHERE id = $1 RETURNING *`,
      [id, assignee || null]
    );
    const updated = rows[0] ? toLead(rows[0]) : null;
    if (updated) {
      await this.logActivity(id, 'Admin', 'assignee_changed', `Assigned to ${assignee || 'Unassigned'}`);
    }
    return updated;
  }

  async updateTags(id: string, tags: string[]): Promise<Lead | null> {
    if (!UUID_RE.test(id)) return null;
    await this.ready();
    const { rows } = await this.pool.query<LeadRow>(
      `UPDATE leads SET tags = $2, updated_at = now() WHERE id = $1 RETURNING *`,
      [id, tags]
    );
    const updated = rows[0] ? toLead(rows[0]) : null;
    if (updated) {
      await this.logActivity(id, 'Admin', 'tags_updated', `Tags updated: ${tags.join(', ')}`);
    }
    return updated;
  }

  async updateNotes(id: string, notes: string): Promise<Lead | null> {
    const updated = await this.patch(id, 'notes', notes);
    if (updated) {
      await this.logActivity(id, 'Admin', 'note_updated', 'Internal notes updated');
    }
    return updated;
  }

  async logActivity(leadId: string, author: string, action: string, details?: string): Promise<LeadActivity> {
    if (!UUID_RE.test(leadId)) {
      throw new Error(`Invalid lead UUID: ${leadId}`);
    }
    await this.ready();
    const { rows } = await this.pool.query<LeadActivityRow>(
      `INSERT INTO lead_activities (lead_id, author, action, details)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [leadId, author, action, details || null]
    );
    const r = rows[0];
    return {
      id: r.id,
      leadId: r.lead_id,
      author: r.author,
      action: r.action,
      details: r.details ?? undefined,
      createdAt: r.created_at,
    };
  }

  async getActivities(leadId: string): Promise<LeadActivity[]> {
    if (!UUID_RE.test(leadId)) return [];
    await this.ready();
    const { rows } = await this.pool.query<LeadActivityRow>(
      `SELECT * FROM lead_activities WHERE lead_id = $1 ORDER BY created_at DESC`,
      [leadId]
    );
    return rows.map((r) => ({
      id: r.id,
      leadId: r.lead_id,
      author: r.author,
      action: r.action,
      details: r.details ?? undefined,
      createdAt: r.created_at,
    }));
  }

  async markDelivered(id: string, delivered: boolean): Promise<void> {
    if (!UUID_RE.test(id)) return;
    await this.ready();
    await this.pool.query('UPDATE leads SET email_delivered = $2 WHERE id = $1', [id, delivered]);
  }

  async remove(id: string): Promise<boolean> {
    if (!UUID_RE.test(id)) return false;
    await this.ready();
    const result = await this.pool.query('DELETE FROM leads WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async stats(now = new Date()): Promise<LeadStats> {
    await this.ready();
    const [totals, byStatus, bySource, byPriorityQuery, daily] = await Promise.all([
      this.pool.query<{ total: string; d7: string; d30: string; latest: Date | null; follow_up_due: string }>(
        `SELECT count(*) AS total,
                count(*) FILTER (WHERE created_at > $1::timestamptz - interval '7 days')  AS d7,
                count(*) FILTER (WHERE created_at > $1::timestamptz - interval '30 days') AS d30,
                count(*) FILTER (WHERE follow_up_date <= ($1::timestamptz)::date AND status NOT IN ('won', 'lost', 'spam')) AS follow_up_due,
                max(created_at) AS latest
           FROM leads`,
        [now]
      ),
      this.pool.query<{ status: string; count: string }>('SELECT status, count(*) FROM leads GROUP BY status'),
      this.pool.query<{ source: string; count: string }>('SELECT source, count(*) FROM leads GROUP BY source'),
      this.pool.query<{ priority: string; count: string }>('SELECT priority, count(*) FROM leads GROUP BY priority'),
      this.pool.query<{ day: string; count: string }>(
        `SELECT to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS day, count(*)
           FROM leads
          WHERE created_at > $1::timestamptz - interval '31 days'
          GROUP BY 1`,
        [now]
      ),
    ]);

    const statusCounts = emptyStatusCounts();
    for (const row of byStatus.rows) if (isLeadStatus(row.status)) statusCounts[row.status] = Number(row.count);
    const sourceCounts = emptySourceCounts();
    for (const row of bySource.rows) if (isLeadSource(row.source)) sourceCounts[row.source] = Number(row.count);
    const priorityCounts = emptyPriorityCounts();
    for (const row of byPriorityQuery.rows) if (isLeadPriority(row.priority)) priorityCounts[row.priority] = Number(row.count);
    const series = emptyDailySeries(now);
    const perDay = new Map(daily.rows.map((row) => [row.day, Number(row.count)]));
    for (const bucket of series) bucket.count = perDay.get(bucket.date) ?? 0;

    const head = totals.rows[0];
    return {
      total: Number(head.total),
      last7Days: Number(head.d7),
      last30Days: Number(head.d30),
      awaitingFirstResponse: statusCounts.new,
      followUpDue: Number(head.follow_up_due || '0'),
      byStatus: statusCounts,
      bySource: sourceCounts,
      byPriority: priorityCounts,
      daily: series,
      latestAt: head.latest,
    };
  }

  async health() {
    try {
      await this.ready();
      await this.pool.query('SELECT 1');
      return { ok: true, detail: 'PostgreSQL connected' };
    } catch (error) {
      return { ok: false, detail: error instanceof Error ? error.message : 'unreachable' };
    }
  }
}
