import { describe, it, expect } from 'vitest';
import { buildAcknowledgement } from '@/lib/acknowledgement';

/**
 * Measured, not assumed: the first live message through mail-tester.com scored
 * 8.3/10. SpamAssassin took 1.29 points off for SUBJ_ALL_CAPS (-0.50) and
 * UPPERCASE_50_75 (-0.79), because an Arabic message has no case and its few
 * Latin tokens (the receipt id, the NOVIXA wordmark) were all upper case.
 * These tests pin the two properties that remove those penalties.
 */

const INPUT = {
  name: 'أحمد',
  receiptId: 'NVX-MV00L6JL',
  siteUrl: 'https://novixa.dev',
  contactEmail: 'hello@novixa.dev',
};

const letters = (value: string) => value.match(/[A-Za-z]/g) ?? [];
const upperRatio = (value: string) => {
  const all = letters(value);
  return all.length === 0 ? 0 : all.filter((c) => c === c.toUpperCase()).length / all.length;
};

/** What a filter reads out of the HTML part: text nodes only, not markup. */
const visibleText = (html: string) =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, ' ');

describe.each(['ar', 'en'] as const)('acknowledgement email (%s)', (lang) => {
  const mail = buildAcknowledgement({ ...INPUT, lang });

  it('has a subject that is not all capitals', () => {
    expect(/[a-z]/.test(mail.subject), 'at least one lower-case Latin letter').toBe(true);
    expect(mail.subject).toContain(INPUT.receiptId);
  });

  it('keeps upper-case letters under half of the Latin letters, in both parts', () => {
    expect(upperRatio(visibleText(mail.html))).toBeLessThan(0.5);
    expect(upperRatio(mail.text)).toBeLessThan(0.5);
  });

  it('tells the visitor where to reach the company', () => {
    expect(mail.text).toContain(INPUT.contactEmail);
    expect(mail.html).toContain(INPUT.contactEmail);
    expect(mail.html).toContain('novixa.dev');
  });
});

describe('acknowledgement email safety', () => {
  it('escapes the visitor-supplied name in the HTML part', () => {
    const mail = buildAcknowledgement({ ...INPUT, lang: 'en', name: '<script>alert(1)</script>' });
    expect(mail.html).not.toContain('<script>');
    expect(mail.html).toContain('&lt;script&gt;');
  });
});

describe('why the old Arabic subject was penalised', () => {
  it('had no lower-case Latin letter at all, so every cased letter was a capital', () => {
    const old = 'استلمنا طلبك — نوڤيكسا (NVX-MV00L6JL)';
    expect(/[a-z]/.test(old)).toBe(false);
    expect(buildAcknowledgement({ ...INPUT, lang: 'ar' }).subject).not.toBe(old);
  });
});
