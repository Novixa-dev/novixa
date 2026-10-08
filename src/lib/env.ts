/**
 * Centralized, server-only environment access.
 * Client code must never import this module.
 */

// Re-exported so existing server imports keep working, but the resolution
// logic lives in one place (see lib/site.ts for why the old hardcoded
// novixa.dev fallback broke canonicals and OG cards in production).
export { getSiteUrl, absoluteUrl } from './site';

export function getServerEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('SECURITY VIOLATION: getServerEnv() called in the browser.');
  }

  return {
    novixaContactEmail: process.env.NOVIXA_CONTACT_EMAIL || 'hello@novixa.dev',
  };
}
