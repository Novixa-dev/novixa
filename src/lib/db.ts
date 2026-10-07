import { Pool } from 'pg';

/**
 * One connection pool per server process.
 *
 * Kept on `globalThis` so `next dev`'s hot reload does not open a fresh pool on
 * every edit and exhaust Postgres' connection limit. Returns null when no
 * database is configured — the site still runs (Vercel previews, local work)
 * and the parts that need persistence say so instead of crashing.
 */
const globalForPool = globalThis as unknown as { __novixaPool?: Pool };

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForPool.__novixaPool) {
    globalForPool.__novixaPool = new Pool({
      connectionString: url,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
    // An idle client erroring (Postgres restarted, network blip) must not take
    // the whole server process down with it.
    globalForPool.__novixaPool.on('error', (error) => {
      console.error('[db] idle client error:', error.message);
    });
  }
  return globalForPool.__novixaPool;
}
