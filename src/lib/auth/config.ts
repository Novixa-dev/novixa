/**
 * Admin configuration, read from the server environment.
 *
 * All three must be present for the admin to exist at all; with any missing
 * the login page says the admin is not configured rather than accepting
 * anything. `ADMIN_SESSION_SECRET` must be long enough that guessing it is not a
 * strategy — anything under 32 characters is refused.
 */
export interface AdminConfig {
  email: string;
  passwordHash: string;
  sessionSecret: string;
}

export const MIN_SESSION_SECRET_LENGTH = 32;

export function getAdminConfig(): AdminConfig | null {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!email || !passwordHash || !sessionSecret) return null;
  if (sessionSecret.length < MIN_SESSION_SECRET_LENGTH) return null;
  return { email, passwordHash, sessionSecret };
}
