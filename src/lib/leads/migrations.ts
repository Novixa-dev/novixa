import type { Pool } from 'pg';

/**
 * Schema migrations, applied in order, each exactly once.
 *
 * Append only. A migration that has run in production is never edited — write
 * a new one. Applied under a Postgres advisory lock, so two app instances
 * starting together cannot race each other through the same migration.
 */
export const MIGRATIONS: Array<{ id: number; name: string; sql: string }> = [
  {
    id: 1,
    name: 'create_leads',
    sql: `
      CREATE EXTENSION IF NOT EXISTS pgcrypto;

      CREATE TABLE leads (
        id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        receipt_id       text NOT NULL UNIQUE,
        source           text NOT NULL CHECK (source IN ('contact', 'start-project')),
        locale           text NOT NULL CHECK (locale IN ('ar', 'en')),
        name             text NOT NULL,
        email            text NOT NULL,
        company          text,
        phone            text,
        project_type     text,
        service_needed   text,
        industry         text,
        problem          text,
        existing_system  text,
        budget_range     text,
        timeline         text,
        details          text,
        status           text NOT NULL DEFAULT 'new'
                         CHECK (status IN ('new','contacted','qualified','proposal','won','lost','spam')),
        notes            text NOT NULL DEFAULT '',
        email_delivered  boolean NOT NULL DEFAULT false,
        created_at       timestamptz NOT NULL DEFAULT now(),
        updated_at       timestamptz NOT NULL DEFAULT now()
      );

      CREATE INDEX leads_created_at_idx ON leads (created_at DESC);
      CREATE INDEX leads_status_idx ON leads (status);
    `,
  },
  {
    id: 2,
    name: 'enhance_leads_ops',
    sql: `
      ALTER TABLE leads
        ADD COLUMN IF NOT EXISTS priority text NOT NULL DEFAULT 'medium'
          CHECK (priority IN ('urgent', 'high', 'medium', 'low')),
        ADD COLUMN IF NOT EXISTS follow_up_date date,
        ADD COLUMN IF NOT EXISTS assignee text,
        ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
        ADD COLUMN IF NOT EXISTS utm_source text,
        ADD COLUMN IF NOT EXISTS utm_medium text,
        ADD COLUMN IF NOT EXISTS utm_campaign text,
        ADD COLUMN IF NOT EXISTS referrer text;

      CREATE INDEX IF NOT EXISTS leads_priority_idx ON leads (priority);
      CREATE INDEX IF NOT EXISTS leads_follow_up_date_idx ON leads (follow_up_date);

      CREATE TABLE IF NOT EXISTS lead_activities (
        id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        lead_id    uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
        author     text NOT NULL,
        action     text NOT NULL,
        details    text,
        created_at timestamptz NOT NULL DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS lead_activities_lead_id_idx ON lead_activities (lead_id, created_at DESC);
    `,
  },
];

const LOCK_KEY = 7_041_771; // arbitrary, stable: "novixa migrations"

export async function runMigrations(pool: Pool): Promise<number[]> {
  const client = await pool.connect();
  const applied: number[] = [];
  try {
    await client.query('SELECT pg_advisory_lock($1)', [LOCK_KEY]);
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id         integer PRIMARY KEY,
        name       text NOT NULL,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    const { rows } = await client.query<{ id: number }>('SELECT id FROM schema_migrations');
    const done = new Set(rows.map((row) => row.id));

    for (const migration of MIGRATIONS) {
      if (done.has(migration.id)) continue;
      await client.query('BEGIN');
      try {
        await client.query(migration.sql);
        await client.query('INSERT INTO schema_migrations (id, name) VALUES ($1, $2)', [
          migration.id,
          migration.name,
        ]);
        await client.query('COMMIT');
        applied.push(migration.id);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }
  } finally {
    await client.query('SELECT pg_advisory_unlock($1)', [LOCK_KEY]).catch(() => {});
    client.release();
  }
  return applied;
}
