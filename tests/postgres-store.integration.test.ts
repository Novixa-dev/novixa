import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { PostgresLeadStore } from '@/lib/leads/postgres-store';
import { runMigrations } from '@/lib/leads/migrations';
import type { LeadInput } from '@/lib/leads';

/**
 * The Postgres store against a real PostgreSQL.
 *
 * Skipped unless TEST_DATABASE_URL is set: CI provides one through a service
 * container, and it can be run locally against any throwaway database. Never
 * point it at production — it creates and drops a schema of its own.
 */
const url = process.env.TEST_DATABASE_URL;
const schema = `it_${Date.now()}`;

describe.skipIf(!url)('PostgresLeadStore (integration)', () => {
  let pool: Pool;
  let store: PostgresLeadStore;

  const input = (overrides: Partial<LeadInput> = {}): LeadInput => ({
    receiptId: `NVX-${Math.random().toString(36).slice(2).toUpperCase()}`,
    source: 'contact',
    locale: 'ar',
    name: 'Integration Lead',
    email: 'it@example.com',
    ...overrides,
  });

  beforeAll(async () => {
    const admin = new Pool({ connectionString: url });
    await admin.query(`CREATE SCHEMA ${schema}`);
    await admin.end();
    // Every connection in this pool works inside the throwaway schema.
    pool = new Pool({ connectionString: url, options: `-c search_path=${schema},public` });
    store = new PostgresLeadStore(pool);
  });

  afterAll(async () => {
    await pool?.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
    await pool?.end();
  });

  it('migrates once, and a second run applies nothing', async () => {
    expect(await runMigrations(pool)).toEqual([1]);
    expect(await runMigrations(pool)).toEqual([]);
  });

  it('round-trips a lead with Arabic text and optional fields', async () => {
    const created = await store.create(input({ name: 'مطعم الليوان', company: 'Alliwan', details: 'نريد نظام طلبات' }));
    expect(created.status).toBe('new');
    expect(created.emailDelivered).toBe(false);
    const fetched = await store.get(created.id);
    expect(fetched?.name).toBe('مطعم الليوان');
    expect(fetched?.phone).toBeUndefined();
  });

  it('rejects a duplicate receipt id', async () => {
    const lead = input();
    await store.create(lead);
    await expect(store.create(lead)).rejects.toThrow();
  });

  it('filters, searches and escapes LIKE metacharacters', async () => {
    await store.create(input({ name: 'Discount 50% Clinic', source: 'start-project' }));
    await store.create(input({ name: 'Discount 500 Clinic' }));
    const percent = await store.list({ search: '50%', limit: 10, offset: 0 });
    expect(percent.rows.map((lead) => lead.name)).toEqual(['Discount 50% Clinic']);
    const bySource = await store.list({ source: 'start-project', limit: 10, offset: 0 });
    expect(bySource.rows.every((lead) => lead.source === 'start-project')).toBe(true);
  });

  it('updates status and notes, marks delivery, and deletes', async () => {
    const lead = await store.create(input());
    expect((await store.updateStatus(lead.id, 'qualified'))?.status).toBe('qualified');
    expect((await store.updateNotes(lead.id, 'call Sunday'))?.notes).toBe('call Sunday');
    await store.markDelivered(lead.id, true);
    expect((await store.get(lead.id))?.emailDelivered).toBe(true);
    expect(await store.remove(lead.id)).toBe(true);
    expect(await store.get(lead.id)).toBeNull();
  });

  it('treats a malformed id as not found instead of erroring', async () => {
    expect(await store.get('not-a-uuid')).toBeNull();
    expect(await store.updateStatus("1'; DROP TABLE leads; --", 'won')).toBeNull();
    expect(await store.remove('')).toBe(false);
  });

  it('computes stats that agree with the rows', async () => {
    const stats = await store.stats();
    const { total } = await store.list({ limit: 1, offset: 0 });
    expect(stats.total).toBe(total);
    expect(stats.daily).toHaveLength(30);
    expect(stats.daily.at(-1)!.count).toBeGreaterThan(0);
    expect(Object.values(stats.byStatus).reduce((sum, count) => sum + count, 0)).toBe(total);
  });

  it('reports itself healthy', async () => {
    expect((await store.health()).ok).toBe(true);
  });
});
