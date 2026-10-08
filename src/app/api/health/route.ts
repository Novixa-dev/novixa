import { NextResponse } from 'next/server';
import { getLeadStore } from '@/lib/leads';
import { getMailer } from '@/lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Liveness + readiness for the deploy pipeline and uptime monitors.
 *
 * 200 when the app is serving and, if a database is configured, reachable
 * with its migrations applied (the store's health check runs them, so the
 * first probe after a deploy is also what migrates the schema). 503 when a
 * configured database is not reachable — a deploy that cannot store leads is a
 * failed deploy and gets rolled back.
 *
 * Public, so it reports states, never error text: a driver message can carry a
 * hostname or a user name.
 */
export async function GET() {
  const store = getLeadStore();
  const database = store ? ((await store.health()).ok ? 'ok' : 'unavailable') : 'not-configured';
  const mailer = getMailer();
  const healthy = database !== 'unavailable';

  return NextResponse.json(
    {
      status: healthy ? 'ok' : 'degraded',
      version: (process.env.BUILD_SHA || '').slice(0, 12) || 'dev',
      database,
      store: store?.kind ?? 'none',
      mail: mailer?.kind ?? 'none',
    },
    { status: healthy ? 200 : 503, headers: { 'Cache-Control': 'no-store' } }
  );
}
