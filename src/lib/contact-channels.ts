/**
 * Public contact channels.
 *
 * These are read from `NEXT_PUBLIC_*` because they render inside client
 * components. Every value is optional on purpose: a channel that is not
 * configured is not rendered at all, rather than rendered against a
 * placeholder.
 *
 * That matters here. The contact page previously shipped a hardcoded
 * `https://wa.me/967770000000` "Chat on WhatsApp" link — a number nobody
 * owns. A visitor clicking it reaches a dead end and concludes the company
 * is not reachable, which is worse than showing one fewer channel. It also
 * contradicts the project's standing rule against presenting unverified
 * details as real (see AGENTS.md).
 *
 * Set the variables to switch the channels on.
 */

/** Digits only, in full international form without `+` — e.g. `967771234567`. */
const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, '') ?? '';

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@novixa.dev';

/** `undefined` when no number is configured, so callers can skip the block. */
export const WHATSAPP_NUMBER: string | undefined = rawWhatsApp || undefined;

export const WHATSAPP_URL: string | undefined = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}`
  : undefined;

/** Human-readable form of the configured number, e.g. `+967 77 123 4567`. */
export function formatWhatsAppNumber(): string | undefined {
  if (!WHATSAPP_NUMBER) return undefined;
  return `+${WHATSAPP_NUMBER}`;
}
