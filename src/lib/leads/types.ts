/**
 * Leads — every enquiry submitted through the site's two forms.
 *
 * Before this existed an enquiry lived only as an email. If Resend was down, a
 * key had expired, or the message landed in spam, the lead was simply gone, and
 * the privacy policy's promise to "keep enquiry correspondence" and "delete it on
 * request" had nothing behind it. A lead is now written to the database first and
 * emailed second; the email is a notification, the row is the record.
 */

/** Pipeline order. The admin renders statuses in exactly this sequence. */
export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'spam'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_SOURCES = ['contact', 'start-project'] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === 'string' && (LEAD_STATUSES as readonly string[]).includes(value);
}

export function isLeadSource(value: unknown): value is LeadSource {
  return typeof value === 'string' && (LEAD_SOURCES as readonly string[]).includes(value);
}

/** What the public form contributes. Everything optional is free text, already trimmed and capped. */
export interface LeadInput {
  receiptId: string;
  source: LeadSource;
  locale: 'ar' | 'en';
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  serviceNeeded?: string;
  industry?: string;
  problem?: string;
  existingSystem?: string;
  budgetRange?: string;
  timeline?: string;
  details?: string;
}

export interface Lead extends LeadInput {
  id: string;
  status: LeadStatus;
  notes: string;
  /** Whether the notification email to Novixa was accepted by the provider. */
  emailDelivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadQuery {
  status?: LeadStatus;
  source?: LeadSource;
  /** Matched case-insensitively against name, email, company and receipt id. */
  search?: string;
  limit: number;
  offset: number;
}

export interface LeadStats {
  total: number;
  last7Days: number;
  last30Days: number;
  /** Status `new` — nobody has replied yet. The number that most needs to be zero. */
  awaitingFirstResponse: number;
  byStatus: Record<LeadStatus, number>;
  bySource: Record<LeadSource, number>;
  /** Daily counts for the last 30 days, oldest first, zero-filled. */
  daily: Array<{ date: string; count: number }>;
  latestAt: Date | null;
}

export interface LeadStore {
  readonly kind: 'postgres' | 'memory';
  create(input: LeadInput): Promise<Lead>;
  list(query: LeadQuery): Promise<{ rows: Lead[]; total: number }>;
  get(id: string): Promise<Lead | null>;
  updateStatus(id: string, status: LeadStatus): Promise<Lead | null>;
  updateNotes(id: string, notes: string): Promise<Lead | null>;
  markDelivered(id: string, delivered: boolean): Promise<void>;
  remove(id: string): Promise<boolean>;
  stats(now?: Date): Promise<LeadStats>;
  health(): Promise<{ ok: boolean; detail: string }>;
}

/** Zero-filled day buckets, oldest first, as YYYY-MM-DD in UTC. */
export function emptyDailySeries(now: Date, days = 30): Array<{ date: string; count: number }> {
  const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Array.from({ length: days }, (_, index) => {
    const day = new Date(end - (days - 1 - index) * 86_400_000);
    return { date: day.toISOString().slice(0, 10), count: 0 };
  });
}

export function emptyStatusCounts(): Record<LeadStatus, number> {
  return Object.fromEntries(LEAD_STATUSES.map((status) => [status, 0])) as Record<LeadStatus, number>;
}

export function emptySourceCounts(): Record<LeadSource, number> {
  return Object.fromEntries(LEAD_SOURCES.map((source) => [source, 0])) as Record<LeadSource, number>;
}
