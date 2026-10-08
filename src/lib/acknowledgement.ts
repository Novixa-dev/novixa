import { escapeHtml } from '@/lib/html';

export interface AcknowledgementInput {
  name: string;
  lang: 'ar' | 'en';
  receiptId: string;
  siteUrl: string;
  contactEmail: string;
}

export interface Acknowledgement {
  subject: string;
  text: string;
  html: string;
}

/**
 * The email a visitor gets after sending a form.
 *
 * Its wording is shaped by a measured spam score, not taste. The first live
 * test through mail-tester.com scored 8.3/10 with SPF, DKIM and DMARC all
 * passing; SpamAssassin took 1.29 points off for two rules that misfire on
 * Arabic text:
 *
 *   SUBJ_ALL_CAPS    -0.50  the only Latin letters in the subject were the
 *                           receipt id (NVX-…), which is upper case, so the
 *                           filter judged the whole subject to be shouting;
 *   UPPERCASE_50_75  -0.79  the same for the body: the only Latin letters
 *                           were the NOVIXA wordmark and the receipt id.
 *
 * Arabic has no case, so a message that is mostly Arabic is judged by its few
 * Latin tokens. The subject therefore carries the brand in mixed case, and the
 * footer carries the site and the contact address, which the visitor needs
 * anyway. `tests/acknowledgement.test.ts` pins both properties.
 */
export function buildAcknowledgement({
  name,
  lang,
  receiptId,
  siteUrl,
  contactEmail,
}: AcknowledgementInput): Acknowledgement {
  const isAr = lang === 'ar';
  const subject = isAr
    ? `استلمنا طلبك — نوڤيكسا (Novixa ${receiptId})`
    : `We received your request — Novixa (${receiptId})`;
  const heading = isAr ? `شكراً لك، ${name}` : `Thank you, ${name}`;
  const body = isAr
    ? 'وصلنا طلبك وسيراجعه أحد مهندسينا. سنعود إليك على هذا البريد خلال يوم عمل واحد. إن كان لديك أي تفاصيل إضافية، يمكنك الرد على هذه الرسالة مباشرة.'
    : 'Your request reached us and one of our engineers will review it. We will reply to this address within one business day. If you have anything to add, just reply to this email.';
  const cta = isAr ? 'تصفّح حلول نوڤيكسا' : 'Browse Novixa solutions';
  const refLabel = isAr ? 'رقم الطلب' : 'Reference';
  const site = siteUrl.replace(/^https?:\/\//, '');

  const text = `${heading}\n\n${body}\n\n${refLabel}: ${receiptId}\n${siteUrl}/${lang}\n${contactEmail}`;

  const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#0f172a;padding:32px;" dir="${isAr ? 'rtl' : 'ltr'}">
        <div style="max-width:520px;margin:0 auto;background:#0b1120;border:1px solid #1e293b;border-radius:16px;padding:28px;text-align:${isAr ? 'right' : 'left'};">
          <div style="font-size:13px;letter-spacing:0.08em;color:#2563eb;font-weight:700;">NOVIXA</div>
          <h1 style="color:#fff;font-size:20px;margin:12px 0;">${escapeHtml(heading)}</h1>
          <p style="color:#cbd5e1;font-size:14px;line-height:1.7;margin:0 0 20px;">${escapeHtml(body)}</p>
          <a href="${siteUrl}/${lang}/solutions" style="display:inline-block;background:#2563eb;color:#fff;font-size:13px;font-weight:600;text-decoration:none;padding:10px 18px;border-radius:10px;">${escapeHtml(cta)}</a>
          <div style="margin-top:22px;padding-top:16px;border-top:1px dashed #1e293b;color:#475569;font-size:11px;">
            ${refLabel}: ${escapeHtml(receiptId)}
          </div>
          <div style="margin-top:6px;color:#94a3b8;font-size:12px;"><span dir="ltr">${escapeHtml(site)} · ${escapeHtml(contactEmail)}</span></div>
        </div>
      </div>
    `;

  return { subject, text, html };
}
