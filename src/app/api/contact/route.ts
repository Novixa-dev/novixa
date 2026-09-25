import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getServerEnv, getSiteUrl } from '@/lib/env';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ContactPayload {
  projectType?: string;
  industry?: string;
  problem?: string;
  existingSystem?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  budgetRange?: string;
  timeline?: string;
  businessType?: string;
  serviceNeeded?: string;
  details?: string;
  language?: 'ar' | 'en';
  /** Honeypot — always empty for a real visitor. */
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Rejects bodies far larger than the longest legitimate submission. */
const MAX_BODY_BYTES = 24_000;
const MAX_FIELD_CHARS = 4_000;

/**
 * In-process rate limit: one instance's memory, so it is a speed bump against
 * casual form-spam bursts, not a distributed quota. Swap in a shared store
 * (Upstash/Redis) if submission volume ever justifies it.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const submissionLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(key) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  submissionLog.set(key, recent);

  if (submissionLog.size > 5_000) submissionLog.clear();
  return recent.length > RATE_LIMIT_MAX;
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded ? forwarded.split(',')[0].trim() : '';
  return first || request.headers.get('x-real-ip') || 'unknown';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_FIELD_CHARS) : '';
}

function localized(lang: 'ar' | 'en', ar: string, en: string): string {
  return lang === 'ar' ? ar : en;
}

const SEND_FAILED = {
  ar: 'تعذر إرسال رسالتك الآن. يرجى المحاولة مرة أخرى أو مراسلتنا على hello@novixa.dev.',
  en: 'Could not send your message right now. Please try again, or email hello@novixa.dev.',
};

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: 'Request body too large.' }, { status: 413 });
  }

  let payload: ContactPayload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const lang: 'ar' | 'en' = payload.language === 'en' ? 'en' : 'ar';

  // Honeypot: accept and discard, so the bot gets no signal to adapt to.
  if (clean(payload.website)) {
    return NextResponse.json({ success: true, receiptId: 'NVX-OK', delivered: false });
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      {
        success: false,
        error: localized(
          lang,
          'تم استلام عدة طلبات خلال وقت قصير. يرجى الانتظار دقيقة ثم المحاولة مجدداً.',
          'Too many submissions in a short period. Please wait a minute and try again.'
        ),
      },
      { status: 429 }
    );
  }

  const name = clean(payload.name);
  const email = clean(payload.email);

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      {
        success: false,
        error: localized(
          lang,
          'يرجى إدخال اسم وبريد إلكتروني صحيحين.',
          'A valid name and email address are required.'
        ),
      },
      { status: 400 }
    );
  }

  const receiptId = `NVX-${Date.now().toString(36).toUpperCase()}`;
  const env = getServerEnv();
  const company = clean(payload.company);

  const fields = (
    [
      ['Project type', clean(payload.projectType)],
      ['Service needed', clean(payload.serviceNeeded)],
      ['Industry', clean(payload.industry) || clean(payload.businessType)],
      ['Operational problem', clean(payload.problem)],
      ['Existing setup', clean(payload.existingSystem)],
      ['Company', company],
      ['Phone / WhatsApp', clean(payload.phone)],
      ['Budget range', clean(payload.budgetRange)],
      ['Timeline', clean(payload.timeline)],
      ['Language', lang === 'ar' ? 'Arabic' : 'English'],
      ['Additional details', clean(payload.details)],
    ] as Array<[string, string]>
  ).filter(([, value]) => !!value);

  const rowsHtml = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 0;color:#e2e8f0;font-size:13px;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#0f172a;padding:32px;">
      <div style="max-width:560px;margin:0 auto;background:#0b1120;border:1px solid #1e293b;border-radius:16px;padding:28px;">
        <div style="font-size:12px;letter-spacing:0.08em;color:#2563eb;font-weight:700;text-transform:uppercase;">New project inquiry</div>
        <h1 style="color:#fff;font-size:20px;margin:8px 0 20px;">${escapeHtml(name)}${company ? ` — ${escapeHtml(company)}` : ''}</h1>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:6px 0;color:#e2e8f0;font-size:13px;">${escapeHtml(email)}</td></tr>
          ${rowsHtml}
        </table>
        <div style="margin-top:20px;padding-top:16px;border-top:1px dashed #1e293b;color:#475569;font-size:11px;">Receipt ${receiptId}</div>
      </div>
    </div>
  `;

  // A text/plain alternative materially improves inbox placement — an
  // HTML-only message is a well-known spam-filter signal.
  const text = [
    'New project inquiry',
    `Name: ${name}`,
    `Email: ${email}`,
    ...fields.map(([label, value]) => `${label}: ${value}`),
    `Receipt: ${receiptId}`,
  ].join('\n');

  if (!env.resendApiKey) {
    // No email provider configured (e.g. local development) — log instead of
    // failing, and tell the caller delivery did not actually happen.
    console.warn(
      `[contact] RESEND_API_KEY not set — logging submission ${receiptId} instead of sending email.`,
      { receiptId, name, email, company }
    );
    return NextResponse.json({ success: true, receiptId, delivered: false });
  }

  try {
    const resend = new Resend(env.resendApiKey);
    const { error } = await resend.emails.send({
      from: env.resendFromEmail,
      to: [env.novixaContactEmail],
      replyTo: email,
      subject: `New project inquiry — ${name}${company ? ` (${company})` : ''}`,
      html,
      text,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { success: false, error: localized(lang, SEND_FAILED.ar, SEND_FAILED.en) },
        { status: 502 }
      );
    }

    // Acknowledgement to the person who filled the form. A failure here must
    // not fail the request — the inquiry itself already reached Novixa.
    void sendAcknowledgement({ resend, env, to: email, name, lang, receiptId }).catch((err) =>
      console.error('[contact] acknowledgement send failed:', err)
    );

    return NextResponse.json({ success: true, receiptId, delivered: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: localized(lang, SEND_FAILED.ar, SEND_FAILED.en) },
      { status: 500 }
    );
  }
}

async function sendAcknowledgement({
  resend,
  env,
  to,
  name,
  lang,
  receiptId,
}: {
  resend: Resend;
  env: ReturnType<typeof getServerEnv>;
  to: string;
  name: string;
  lang: 'ar' | 'en';
  receiptId: string;
}) {
  const isAr = lang === 'ar';
  const siteUrl = getSiteUrl();
  const subject = isAr
    ? `استلمنا طلبك — نوڤيكسا (${receiptId})`
    : `We received your request — Novixa (${receiptId})`;
  const heading = isAr ? `شكراً لك، ${name}` : `Thank you, ${name}`;
  const body = isAr
    ? 'وصلنا طلبك وسيراجعه أحد مهندسينا. سنعود إليك على هذا البريد خلال يوم عمل واحد. إن كان لديك أي تفاصيل إضافية، يمكنك الرد على هذه الرسالة مباشرة.'
    : 'Your request reached us and one of our engineers will review it. We will reply to this address within one business day. If you have anything to add, just reply to this email.';
  const cta = isAr ? 'تصفّح حلول نوڤيكسا' : 'Browse Novixa solutions';
  const refLabel = isAr ? 'رقم الطلب' : 'Reference';

  await resend.emails.send({
    from: env.resendFromEmail,
    to: [to],
    replyTo: env.novixaContactEmail,
    subject,
    text: `${heading}\n\n${body}\n\n${refLabel}: ${receiptId}\n${siteUrl}/${lang}`,
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#0f172a;padding:32px;" dir="${isAr ? 'rtl' : 'ltr'}">
        <div style="max-width:520px;margin:0 auto;background:#0b1120;border:1px solid #1e293b;border-radius:16px;padding:28px;text-align:${isAr ? 'right' : 'left'};">
          <div style="font-size:13px;letter-spacing:0.08em;color:#2563eb;font-weight:700;">NOVIXA</div>
          <h1 style="color:#fff;font-size:20px;margin:12px 0;">${escapeHtml(heading)}</h1>
          <p style="color:#cbd5e1;font-size:14px;line-height:1.7;margin:0 0 20px;">${escapeHtml(body)}</p>
          <a href="${siteUrl}/${lang}/solutions" style="display:inline-block;background:#2563eb;color:#fff;font-size:13px;font-weight:600;text-decoration:none;padding:10px 18px;border-radius:10px;">${escapeHtml(cta)}</a>
          <div style="margin-top:22px;padding-top:16px;border-top:1px dashed #1e293b;color:#475569;font-size:11px;">
            ${refLabel}: ${receiptId}
          </div>
        </div>
      </div>
    `,
  });
}
