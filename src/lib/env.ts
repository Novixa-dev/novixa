/**
 * Centralized, server-only environment access.
 * Client code must never import this module.
 */

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://novixa.dev').replace(/\/$/, '');
}

export function getServerEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('SECURITY VIOLATION: getServerEnv() called in the browser.');
  }

  return {
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    novixaContactEmail: process.env.NOVIXA_CONTACT_EMAIL || 'hello@novixa.dev',
  };
}
