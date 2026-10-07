/**
 * Login attempt limiter: a sliding window per key (client IP).
 *
 * In-process, which is exactly right for a single-instance VPS deployment and a
 * speed bump anywhere else. Ten attempts per fifteen minutes stops online
 * guessing dead while leaving room for an owner who mistypes.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const attempts = new Map<string, number[]>();

export function tooManyAttempts(key: string, now = Date.now()): boolean {
  const recent = (attempts.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  attempts.set(key, recent);
  return recent.length >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(key: string, now = Date.now()): void {
  const recent = (attempts.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 10_000) attempts.clear();
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}

/** Test seam. */
export function resetRateLimit(): void {
  attempts.clear();
}
