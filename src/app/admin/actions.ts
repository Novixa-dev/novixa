'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getAdminConfig } from '@/lib/auth/config';
import { verifyPassword } from '@/lib/auth/password';
import { clearAttempts, recordFailedAttempt, tooManyAttempts } from '@/lib/auth/rate-limit';
import { createSessionToken, SESSION_COOKIE, SESSION_TTL_SECONDS } from '@/lib/auth/session';
import { clientIp, requireAdmin } from '@/lib/auth/admin';
import { getLeadStore, isLeadStatus } from '@/lib/leads';
import { ADMIN_LANG_COOKIE } from './i18n';

export interface LoginState {
  error: 'invalid' | 'locked' | 'unconfigured' | null;
}

/**
 * Secure unless explicitly disabled. The browser suite runs over plain HTTP on
 * 127.0.0.1 and sets ADMIN_COOKIE_SECURE=false; production never should.
 */
function secureCookies(): boolean {
  return process.env.ADMIN_COOKIE_SECURE !== 'false';
}

/** Only same-site relative paths under /admin may be a post-login destination. */
function safeNext(value: FormDataEntryValue | null): string {
  const next = typeof value === 'string' ? value : '';
  return next.startsWith('/admin') && !next.startsWith('//') ? next : '/admin';
}

export async function login(_previous: LoginState, form: FormData): Promise<LoginState> {
  const config = getAdminConfig();
  if (!config) return { error: 'unconfigured' };

  const ip = await clientIp();
  if (tooManyAttempts(ip)) return { error: 'locked' };

  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');

  // Always run the hash comparison, even for a wrong email, so response time
  // does not reveal which half of the credentials was wrong.
  const passwordOk = await verifyPassword(password, config.passwordHash);
  if (!passwordOk || email !== config.email) {
    recordFailedAttempt(ip);
    return { error: 'invalid' };
  }

  clearAttempts(ip);
  const token = await createSessionToken(config.sessionSecret, config.email);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: secureCookies(),
    sameSite: 'strict',
    path: '/admin',
    maxAge: SESSION_TTL_SECONDS,
  });
  redirect(safeNext(form.get('next')));
}

export async function logout(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, '', { httpOnly: true, secure: secureCookies(), sameSite: 'strict', path: '/admin', maxAge: 0 });
  redirect('/admin/login');
}

export async function setAdminLang(form: FormData): Promise<void> {
  const lang = form.get('lang') === 'en' ? 'en' : 'ar';
  (await cookies()).set(ADMIN_LANG_COOKIE, lang, { sameSite: 'strict', path: '/admin', maxAge: 60 * 60 * 24 * 365 });
  const back = (await headers()).get('referer');
  redirect(back && new URL(back).pathname.startsWith('/admin') ? new URL(back).pathname + new URL(back).search : '/admin');
}

function requireStore() {
  const store = getLeadStore();
  if (!store) throw new Error('No lead store configured.');
  return store;
}

export async function updateLeadStatus(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const status = form.get('status');
  if (!isLeadStatus(status)) return;
  await requireStore().updateStatus(id, status);
  revalidatePath('/admin');
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateLeadNotes(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const notes = String(form.get('notes') ?? '').slice(0, 10_000);
  await requireStore().updateNotes(id, notes);
  revalidatePath(`/admin/leads/${id}`);
}

/**
 * Permanent deletion — what the privacy policy promises on request. Requires an
 * explicit confirmation box so a stray click cannot erase a lead.
 */
export async function deleteLead(form: FormData): Promise<void> {
  await requireAdmin();
  if (form.get('confirm') !== 'yes') return;
  const id = String(form.get('id') ?? '');
  await requireStore().remove(id);
  revalidatePath('/admin');
  redirect('/admin/leads?deleted=1');
}
