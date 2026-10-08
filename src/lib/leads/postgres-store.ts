import type { Pool } from 'pg';
import { runMigrations } from './migrations';
import {
  emptyDailySeries,
  emptySourceCounts,
  emptyStatusCounts,
  isLeadSource,
  isLeadStatus,
  type Lead,
  type LeadInput,
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
  notes: string;
  email_delivered: boolean;
  created_at: Date;
  updated_at: Date;
}

const optional = (value: string | null): string | undefined => value ?? undefined;

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
    notes: row.notes,
    emailDelivered: row.email_delivered,
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
         service_needed, industry, problem, existing_system, budget_range, timeline, details
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
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
      ]
    );
    return toLead(rows[0]);
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
    const needle = query.search?.trim();
    if (needle) {
      // Escape LIKE metacharacters so a search for "50%" means fifty percent.
      params.push(`%${needle.replace(/[\\%_]/g, (char) => `\\${char}`)}%`);
      const p = `$${params.length}`;
      where.push(
        `(name ILIKE ${p} OR email ILIKE ${p} OR coalesce(company,'') ILIKE ${p} OR receipt_id ILIKE ${p})`
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

  private async patch(id: string, column: 'status' | 'notes', value: string): Promise<Lead | null> {
    if (!UUID_RE.test(id)) return null;
    await this.ready();
    const { rows } = await this.pool.query<LeadRow>(
      `UPDATE leads SET ${column} = $2, updated_at = now() WHERE id = $1 RETURNING *`,
      [id, value]
    );
    return rows[0] ? toLead(rows[0]) : null;
  }

  updateStatus(id: string, status: LeadStatus) {
    return this.patch(id, 'status', status);
  }

  updateNotes(id: string, notes: string) {
    return this.patch(id, 'notes', notes);
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
    const [totals, byStatus, bySource, daily] = await Promise.all([
      this.pool.query<{ total: string; d7: string; d30: string; latest: Date | null }>(
        `SELECT count(*) AS total,
                count(*) FILTER (WHERE created_at > $1::timestamptz - interval '7 days')  AS d7,
                count(*) FILTER (WHERE created_at > $1::timestamptz - interval '30 days') AS d30,
                max(created_at) AS latest
           FROM leads`,
        [now]
      ),
      this.pool.query<{ status: string; count: string }>('SELECT status, count(*) FROM leads GROUP BY status'),
      this.pool.query<{ source: string; count: string }>('SELECT source, count(*) FROM leads GROUP BY source'),
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
    const series = emptyDailySeries(now);
    const perDay = new Map(daily.rows.map((row) => [row.day, Number(row.count)]));
    for (const bucket of series) bucket.count = perDay.get(bucket.date) ?? 0;

    const head = totals.rows[0];
    return {
      total: Number(head.total),
      last7Days: Number(head.d7),
      last30Days: Number(head.d30),
      awaitingFirstResponse: statusCounts.new,
      byStatus: statusCounts,
      bySource: sourceCounts,
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
