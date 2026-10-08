/**
 * What the public status dialog shows, derived from `/api/health`.
 *
 * The dialog used to display regional "datacentres" with latencies, a 90-day
 * uptime figure and an incident count. None of it was measured: the site runs
 * on one VPS and had been live for hours. It now shows only what a visitor's
 * own browser can observe — the health endpoint's answer and how long it took.
 *
 * The endpoint's fields are mapped through closed sets rather than printed, so
 * whatever it returns, the dialog never renders text it did not choose.
 */

export type DatabaseState = 'connected' | 'unavailable' | 'not-configured' | 'unknown';

export type StatusView =
  | { state: 'checking' }
  | { state: 'unreachable' }
  | {
      state: 'operational' | 'degraded';
      /** Round trip from the visitor's browser, in milliseconds. */
      ms: number;
      /** Short commit id of the deployed release, or null when not reported. */
      version: string | null;
      database: DatabaseState;
    };

const DATABASE_STATES: Record<string, DatabaseState> = {
  ok: 'connected',
  unavailable: 'unavailable',
  'not-configured': 'not-configured',
};

export function interpretHealth(httpStatus: number, body: unknown, ms: number): StatusView {
  if (typeof body !== 'object' || body === null) return { state: 'unreachable' };
  const record = body as Record<string, unknown>;

  const reported = typeof record.status === 'string' ? record.status : '';
  if (reported !== 'ok' && reported !== 'degraded') return { state: 'unreachable' };

  const rawVersion = typeof record.version === 'string' ? record.version : '';
  const version = /^[0-9a-f]{7,40}$/.test(rawVersion) ? rawVersion : null;

  const database = typeof record.database === 'string' ? DATABASE_STATES[record.database] ?? 'unknown' : 'unknown';

  return {
    state: reported === 'ok' && httpStatus === 200 ? 'operational' : 'degraded',
    ms: Math.max(0, Math.round(ms)),
    version,
    database,
  };
}
