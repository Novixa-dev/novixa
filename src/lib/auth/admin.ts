import 'server-only';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminConfig } from './config';
import { SESSION_COOKIE, verifySessionToken } from './session';

/**
 * Server-side admin guard.
 *
 * Every admin page, server action and route handler calls `requireAdmin()`
 * itself. There is deliberately no middleware doing it on their behalf: a
 * layout-level or middleware-only check is one refactor away from leaving a
 * page or an action unguarded, and Server Actions are reachable by direct POST
 * regardless of which page rendered them.
 */
export async function getAdminSession(): Promise<{ email: string } | null> {
  const config = getAdminConfig();
  if (!config) return null;
  const store = await cookies();
  const payload = await verifySessionToken(config.sessionSecret, store.get(SESSION_COOKIE)?.value);
  if (!payload || payload.sub !== config.email) return null;
  return { email: payload.sub };
}

export async function requireAdmin(): Promise<{ email: string }> {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return session;
}

/** First hop of X-Forwarded-For as set by the reverse proxy, else the socket address. */
export async function clientIp(): Promise<string> {
  const list = await headers();
  const forwarded = list.get('x-forwarded-for');
  return (forwarded ? forwarded.split(',')[0].trim() : '') || list.get('x-real-ip') || 'unknown';
}
