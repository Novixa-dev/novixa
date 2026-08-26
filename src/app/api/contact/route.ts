import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getServerEnv } from '@/lib/env';

interface ContactPayload {
  projectType?: string;
  industry?: string;
  problem?: string;
  existingSystem?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  budgetRange?: string;
  timeline?: string;
  details?: string;
  language?: 'ar' | 'en';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: 'A valid name and email are required.' },
      { status: 400 }
    );
  }

  const receiptId = `NVX-${Date.now().toString(36).toUpperCase()}`;
  const env = getServerEnv();

  const fields: Array<[string, string | undefined]> = [
    ['Project type', payload.projectType],
    ['Industry', payload.industry],
    ['Operational problem', payload.problem],
    ['Existing setup', payload.existingSystem],
    ['Company', payload.company],
    ['Phone / WhatsApp', payload.phone],
    ['Budget range', payload.budgetRange],
    ['Timeline', payload.timeline],
    ['Additional details', payload.details],
  ];

  const rowsHtml = fields
    .filter(([, value]) => !!value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;">${label}</td><td style="padding:6px 0;color:#e2e8f0;font-size:13px;">${escapeHtml(String(value))}</td></tr>`
    )
    .join('');

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#0f172a;padding:32px;">
      <div style="max-width:560px;margin:0 auto;background:#0b1120;border:1px solid #1e293b;border-radius:16px;padding:28px;">
        <div style="font-size:12px;letter-spacing:0.08em;color:#2563eb;font-weight:700;text-transform:uppercase;">New project inquiry</div>
        <h1 style="color:#fff;font-size:20px;margin:8px 0 20px;">${escapeHtml(name)}${payload.company ? ` — ${escapeHtml(payload.company)}` : ''}</h1>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:6px 0;color:#e2e8f0;font-size:13px;">${escapeHtml(email)}</td></tr>
          ${rowsHtml}
        </table>
        <div style="margin-top:20px;padding-top:16px;border-top:1px dashed #1e293b;color:#475569;font-size:11px;">Receipt ${receiptId}</div>
      </div>
    </div>
  `;

  if (!env.resendApiKey) {
    // No email provider configured (e.g. local development) — log instead of failing.
    console.warn(`[contact] RESEND_API_KEY not set — logging submission ${receiptId} instead of sending email.`, {
      receiptId,
      ...payload,
    });
    return NextResponse.json({ success: true, receiptId, delivered: false });
  }

  try {
    const resend = new Resend(env.resendApiKey);
    const { error } = await resend.emails.send({
      from: env.resendFromEmail,
      to: [env.novixaContactEmail],
      replyTo: email,
      subject: `New project inquiry — ${name}${payload.company ? ` (${payload.company})` : ''}`,
      html,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Could not send your message right now. Please try again shortly.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, receiptId, delivered: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Could not send your message right now. Please try again shortly.' },
      { status: 500 }
    );
  }
}
