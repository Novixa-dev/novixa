import { describe, expect, it } from 'vitest';
import { MemoryLeadStore } from '@/lib/leads/memory-store';
import { csvCell, leadsToCsv } from '@/lib/leads/csv';
import { emptyDailySeries, LEAD_STATUSES, type LeadInput } from '@/lib/leads';
import { MIGRATIONS } from '@/lib/leads/migrations';

const input = (overrides: Partial<LeadInput> = {}): LeadInput => ({
  receiptId: `NVX-${Math.random().toString(36).slice(2)}`,
  source: 'contact',
  locale: 'ar',
  name: 'Test Person',
  email: 'test@example.com',
  ...overrides,
});

describe('memory lead store', () => {
  it('creates leads as new and lists newest first', async () => {
    const store = new MemoryLeadStore();
    const first = await store.create(input({ name: 'First' }));
    await new Promise((resolve) => setTimeout(resolve, 5));
    await store.create(input({ name: 'Second' }));
    expect(first.status).toBe('new');
    const { rows, total } = await store.list({ limit: 10, offset: 0 });
    expect(total).toBe(2);
    expect(rows.map((lead) => lead.name)).toEqual(['Second', 'First']);
  });

  it('filters by status, source and case-insensitive search', async () => {
    const store = new MemoryLeadStore();
    const a = await store.create(input({ name: 'Aqar Holdings', company: 'Aqar', source: 'start-project' }));
    await store.create(input({ name: 'Clinic One' }));
    await store.updateStatus(a.id, 'qualified');
    expect((await store.list({ status: 'qualified', limit: 10, offset: 0 })).total).toBe(1);
    expect((await store.list({ source: 'start-project', limit: 10, offset: 0 })).total).toBe(1);
    expect((await store.list({ search: 'aqar', limit: 10, offset: 0 })).rows[0].id).toBe(a.id);
  });

  it('updates notes and deletes for real', async () => {
    const store = new MemoryLeadStore();
    const lead = await store.create(input());
    expect((await store.updateNotes(lead.id, 'Called on Sunday'))?.notes).toBe('Called on Sunday');
    expect(await store.remove(lead.id)).toBe(true);
    expect(await store.get(lead.id)).toBeNull();
    expect(await store.remove(lead.id)).toBe(false);
  });

  it('computes stats from the leads it holds, not from anything else', async () => {
    const store = new MemoryLeadStore();
    const won = await store.create(input());
    await store.create(input({ source: 'start-project' }));
    await store.updateStatus(won.id, 'won');
    const stats = await store.stats();
    expect(stats.total).toBe(2);
    expect(stats.awaitingFirstResponse).toBe(1);
    expect(stats.byStatus.won).toBe(1);
    expect(stats.bySource['start-project']).toBe(1);
    expect(stats.daily).toHaveLength(30);
    expect(stats.daily.at(-1)?.count).toBe(2);
  });
});

describe('daily series', () => {
  it('is thirty zero-filled UTC days ending today', () => {
    const series = emptyDailySeries(new Date('2026-10-07T23:30:00Z'));
    expect(series).toHaveLength(30);
    expect(series.at(-1)?.date).toBe('2026-10-07');
    expect(series[0].date).toBe('2026-09-08');
    expect(series.every((point) => point.count === 0)).toBe(true);
  });
});

describe('CSV export', () => {
  it('neutralises spreadsheet formulas typed into a form', () => {
    // A lead named =HYPERLINK(...) must open as text, not execute.
    for (const payload of ['=1+1', '+1', '-1', '@SUM(A1)', '\t=x', '\r=x']) {
      expect(csvCell(payload).startsWith(`"'`)).toBe(true);
    }
    expect(csvCell('normal text')).toBe('"normal text"');
  });

  it('escapes quotes and keeps Arabic readable in Excel', async () => {
    expect(csvCell('say "hi"')).toBe('"say ""hi"""');
    const store = new MemoryLeadStore();
    await store.create(input({ name: 'مطعم الليوان' }));
    const csv = leadsToCsv((await store.list({ limit: 10, offset: 0 })).rows);
    expect(csv.startsWith('﻿')).toBe(true);
    expect(csv).toContain('مطعم الليوان');
    expect(csv.split('\r\n')).toHaveLength(2);
  });
});

describe('schema migrations', () => {
  it('are numbered uniquely and in ascending order', () => {
    const ids = MIGRATIONS.map((migration) => migration.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort((a, b) => a - b)).toEqual(ids);
  });

  it('constrain status to exactly the statuses the code knows', () => {
    // If a status is added in code but not in the CHECK constraint, every update
    // to it fails in production and nowhere else.
    const sql = MIGRATIONS.map((migration) => migration.sql).join('\n');
    for (const status of LEAD_STATUSES) expect(sql).toContain(`'${status}'`);
  });
});
