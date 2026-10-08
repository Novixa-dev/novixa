import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';

/**
 * Password hashing with scrypt (memory-hard, in Node's standard library — no
 * native dependency to compile into the container).
 *
 * Stored format: `scrypt$N$r$p$<salt base64>$<hash base64>`. Parameters travel
 * with the hash, so they can be raised later without invalidating old hashes.
 * The plaintext password never reaches the server's environment — only this
 * string does, generated with `node scripts/hash-password.mjs`.
 */

const KEY_LENGTH = 64;
const DEFAULT_PARAMS = { N: 16_384, r: 8, p: 1 };

function scrypt(password: string, salt: Buffer, N: number, r: number, p: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, KEY_LENGTH, { N, r, p, maxmem: 64 * 1024 * 1024 }, (error, derived) =>
      error ? reject(error) : resolve(derived)
    );
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const { N, r, p } = DEFAULT_PARAMS;
  const derived = await scrypt(password, salt, N, r, p);
  return `scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${derived.toString('base64')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [, n, r, p, saltB64, hashB64] = parts;
  const N = Number(n);
  const R = Number(r);
  const P = Number(p);
  if (![N, R, P].every((value) => Number.isInteger(value) && value > 0)) return false;

  const expected = Buffer.from(hashB64, 'base64');
  if (expected.length !== KEY_LENGTH) return false;

  try {
    const derived = await scrypt(password, Buffer.from(saltB64, 'base64'), N, R, P);
    return timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}
