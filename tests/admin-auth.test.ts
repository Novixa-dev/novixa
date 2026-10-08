import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { createSessionToken, verifySessionToken } from '@/lib/auth/session';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { getAdminConfig, MIN_SESSION_SECRET_LENGTH } from '@/lib/auth/config';
import { clearAttempts, recordFailedAttempt, resetRateLimit, tooManyAttempts } from '@/lib/auth/rate-limit';

const SECRET = 'x'.repeat(MIN_SESSION_SECRET_LENGTH);

describe('session tokens', () => {
  it('round-trips a valid token', async () => {
    const token = await createSessionToken(SECRET, 'owner@novixa.dev', 1_000);
    const payload = await verifySessionToken(SECRET, token, 1_001);
    expect(payload?.sub).toBe('owner@novixa.dev');
  });

  it('rejects an expired token', async () => {
    const token = await createSessionToken(SECRET, 'owner@novixa.dev', 1_000, 60);
    expect(await verifySessionToken(SECRET, token, 1_060)).toBeNull();
  });

  it('rejects a token signed with another secret', async () => {
    const token = await createSessionToken('y'.repeat(40), 'owner@novixa.dev', 1_000);
    expect(await verifySessionToken(SECRET, token, 1_001)).toBeNull();
  });

  it('rejects a payload edited after signing', async () => {
    // The classic attack: keep the signature, change who the token is for.
    const token = await createSessionToken(SECRET, 'owner@novixa.dev', 1_000);
    const [, signature] = token.split('.');
    const forged = Buffer.from(JSON.stringify({ sub: 'attacker@evil.test', iat: 1_000, exp: 9_999_999_999, v: 1 }))
      .toString('base64url');
    expect(await verifySessionToken(SECRET, `${forged}.${signature}`, 1_001)).toBeNull();
  });

  it('rejects malformed input without throwing', async () => {
    for (const junk of [undefined, null, '', 'abc', 'a.b.c', '.', 'not-base64!.???']) {
      expect(await verifySessionToken(SECRET, junk as string, 1)).toBeNull();
    }
  });
});

describe('password hashing', () => {
  it('verifies the right password and rejects the wrong one', async () => {
    const hash = await hashPassword('correct horse battery staple');
    expect(hash.startsWith('scrypt$')).toBe(true);
    expect(await verifyPassword('correct horse battery staple', hash)).toBe(true);
    expect(await verifyPassword('correct horse battery stapl', hash)).toBe(false);
  });

  it('salts: the same password hashes differently each time', async () => {
    expect(await hashPassword('same-password-123')).not.toBe(await hashPassword('same-password-123'));
  });

  it('rejects a malformed stored hash instead of throwing', async () => {
    for (const stored of ['', 'plaintext', 'scrypt$1$2$3', 'bcrypt$x$y$z$a$b', 'scrypt$0$8$1$AAAA$BBBB']) {
      expect(await verifyPassword('anything', stored)).toBe(false);
    }
  });
});

describe('admin configuration', () => {
  const keys = ['ADMIN_EMAIL', 'ADMIN_PASSWORD_HASH', 'ADMIN_SESSION_SECRET'] as const;
  let saved: Record<string, string | undefined>;
  beforeEach(() => {
    saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  });
  afterEach(() => {
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  });

  it('is disabled unless all three values are present', () => {
    process.env.ADMIN_EMAIL = 'Owner@Novixa.dev';
    process.env.ADMIN_PASSWORD_HASH = 'scrypt$…';
    delete process.env.ADMIN_SESSION_SECRET;
    expect(getAdminConfig()).toBeNull();
    process.env.ADMIN_SESSION_SECRET = SECRET;
    expect(getAdminConfig()?.email).toBe('owner@novixa.dev');
  });

  it('refuses a session secret that is too short to be safe', () => {
    process.env.ADMIN_EMAIL = 'owner@novixa.dev';
    process.env.ADMIN_PASSWORD_HASH = 'scrypt$…';
    process.env.ADMIN_SESSION_SECRET = 'short';
    expect(getAdminConfig()).toBeNull();
  });
});

describe('login rate limit', () => {
  beforeEach(() => resetRateLimit());

  it('locks after ten failures within the window and recovers after it', () => {
    for (let index = 0; index < 10; index += 1) recordFailedAttempt('1.2.3.4', 1_000);
    expect(tooManyAttempts('1.2.3.4', 1_000)).toBe(true);
    expect(tooManyAttempts('5.6.7.8', 1_000)).toBe(false);
    expect(tooManyAttempts('1.2.3.4', 1_000 + 15 * 60 * 1000 + 1)).toBe(false);
  });

  it('clears on a successful sign-in', () => {
    for (let index = 0; index < 10; index += 1) recordFailedAttempt('1.2.3.4', 1_000);
    clearAttempts('1.2.3.4');
    expect(tooManyAttempts('1.2.3.4', 1_000)).toBe(false);
  });
});
