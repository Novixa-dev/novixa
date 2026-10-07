import { getPool } from '@/lib/db';
import { MemoryLeadStore } from './memory-store';
import { PostgresLeadStore } from './postgres-store';
import type { LeadStore } from './types';

export * from './types';

const globalForStore = globalThis as unknown as { __novixaLeadStore?: LeadStore | null };

/**
 * The configured lead store, or null when none is.
 *
 *  - `DATABASE_URL` set → PostgreSQL (production).
 *  - `LEADS_STORE=memory` → in-process memory (browser tests, local work). Only
 *    ever by explicit opt-in; the admin warns while it is active.
 *  - neither → null. The contact API then behaves as it always did (email only),
 *    which is what a Vercel preview without a database should do.
 */
export function getLeadStore(): LeadStore | null {
  if (globalForStore.__novixaLeadStore !== undefined) return globalForStore.__novixaLeadStore;

  let store: LeadStore | null = null;
  const pool = getPool();
  if (pool) store = new PostgresLeadStore(pool);
  else if (process.env.LEADS_STORE === 'memory') store = new MemoryLeadStore();

  globalForStore.__novixaLeadStore = store;
  return store;
}
