import type { Lead } from './types';

/**
 * CSV export of leads.
 *
 * Two hazards handled, both specific to a file that will be opened in Excel:
 *  - **Formula injection.** A cell that begins with `=`, `+`, `-`, `@`, tab or
 *    carriage return is executed as a formula by spreadsheet software. Lead
 *    fields are typed by strangers on the internet, so any such cell is prefixed
 *    with an apostrophe, which Excel and Sheets treat as "this is text".
 *  - **Arabic in Excel.** Without a byte-order mark Excel reads UTF-8 as the
 *    system code page and every Arabic name turns to mojibake.
 */
const FORMULA_TRIGGER = /^[=+\-@\t\r]/;

export function csvCell(value: unknown): string {
  let text = value === null || value === undefined ? '' : value instanceof Date ? value.toISOString() : String(value);
  if (FORMULA_TRIGGER.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export const CSV_COLUMNS: Array<[header: string, pick: (lead: Lead) => unknown]> = [
  ['receipt_id', (l) => l.receiptId],
  ['created_at', (l) => l.createdAt],
  ['status', (l) => l.status],
  ['priority', (l) => l.priority],
  ['assignee', (l) => l.assignee ?? ''],
  ['follow_up_date', (l) => (l.followUpDate ? l.followUpDate.toISOString().slice(0, 10) : '')],
  ['tags', (l) => l.tags.join('; ')],
  ['source', (l) => l.source],
  ['locale', (l) => l.locale],
  ['name', (l) => l.name],
  ['email', (l) => l.email],
  ['phone', (l) => l.phone],
  ['company', (l) => l.company],
  ['project_type', (l) => l.projectType],
  ['service_needed', (l) => l.serviceNeeded],
  ['industry', (l) => l.industry],
  ['problem', (l) => l.problem],
  ['existing_system', (l) => l.existingSystem],
  ['budget_range', (l) => l.budgetRange],
  ['timeline', (l) => l.timeline],
  ['details', (l) => l.details],
  ['notes', (l) => l.notes],
  ['utm_source', (l) => l.utmSource ?? ''],
  ['utm_medium', (l) => l.utmMedium ?? ''],
  ['utm_campaign', (l) => l.utmCampaign ?? ''],
  ['referrer', (l) => l.referrer ?? ''],
  ['email_delivered', (l) => (l.emailDelivered ? 'yes' : 'no')],
];

export function leadsToCsv(leads: Lead[]): string {
  const header = CSV_COLUMNS.map(([name]) => csvCell(name)).join(',');
  const rows = leads.map((lead) => CSV_COLUMNS.map(([, pick]) => csvCell(pick(lead))).join(','));
  return `﻿${[header, ...rows].join('\r\n')}`;
}
