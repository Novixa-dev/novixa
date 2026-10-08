/**
 * Admin session tokens: `base64url(payload).base64url(HMAC-SHA256(payload))`.
 *
 * Web Crypto only, so the same code verifies in Node and in an edge runtime.
 * Verification goes through `crypto.subtle.verify`, which compares in constant
 * time — a hand-rolled `===` on signatures leaks timing.
 *
 * Stateless by design: there is one admin and no session table. The trade-off is
 * that a token cannot be revoked before it expires except by rotating
 * `ADMIN_SESSION_SECRET`, which signs every existing session out. With a 12-hour
 * lifetime that is the right trade for a single-operator back office.
 */

export const SESSION_COOKIE = 'nvx_admin';
export const SESSION_TTL_SECONDS = 12 * 60 * 60;

export interface SessionPayload {
  /** The admin's email. */
  sub: string;
  /** Issued-at, seconds since epoch. */
  iat: number;
  /** Expiry, seconds since epoch. */
  exp: number;
  v: 1;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

async function key(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

export async function createSessionToken(
  secret: string,
  email: string,
  now = Math.floor(Date.now() / 1000),
  ttl = SESSION_TTL_SECONDS
): Promise<string> {
  const payload: SessionPayload = { sub: email, iat: now, exp: now + ttl, v: 1 };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', await key(secret), encoder.encode(body)));
  return `${body}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(
  secret: string,
  token: string | undefined | null,
  now = Math.floor(Date.now() / 1000)
): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const [body, signature] = parts;

  let valid = false;
  try {
    valid = await crypto.subtle.verify('HMAC', await key(secret), fromBase64Url(signature), encoder.encode(body));
  } catch {
    return null;
  }
  if (!valid) return null;

  try {
    const payload = JSON.parse(decoder.decode(fromBase64Url(body))) as SessionPayload;
    if (payload.v !== 1 || typeof payload.sub !== 'string' || typeof payload.exp !== 'number') return null;
    if (payload.exp <= now) return null;
    return payload;
  } catch {
    return null;
  }
}
