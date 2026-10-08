import { afterEach, describe, expect, it, vi } from 'vitest';
import { getMailer, readMailConfig } from '@/lib/mail';

const env = (vars: Record<string, string>) => vars as unknown as NodeJS.ProcessEnv;

describe('readMailConfig', () => {
  it('prefers MAIL_FROM and falls back to RESEND_FROM_EMAIL', () => {
    expect(
      readMailConfig(env({ MAIL_FROM: 'a@novixa.dev', RESEND_FROM_EMAIL: 'b@novixa.dev' })).from
    ).toBe('a@novixa.dev');
    expect(readMailConfig(env({ RESEND_FROM_EMAIL: 'b@novixa.dev' })).from).toBe('b@novixa.dev');
  });

  it('has no SMTP transport without SMTP_HOST', () => {
    expect(readMailConfig(env({})).smtp).toBeNull();
  });

  it('uses STARTTLS on 587 by default and implicit TLS on 465', () => {
    const submission = readMailConfig(env({ SMTP_HOST: 'mail.novixa.dev' })).smtp;
    expect(submission).toMatchObject({ host: 'mail.novixa.dev', port: 587, secure: false });
    const smtps = readMailConfig(env({ SMTP_HOST: 'mail.novixa.dev', SMTP_PORT: '465' })).smtp;
    expect(smtps).toMatchObject({ port: 465, secure: true });
  });

  it('lets SMTP_SECURE override the port default', () => {
    const smtp = readMailConfig(
      env({ SMTP_HOST: 'h', SMTP_PORT: '2525', SMTP_SECURE: 'true' })
    ).smtp;
    expect(smtp).toMatchObject({ port: 2525, secure: true });
  });
});

describe('getMailer', () => {
  afterEach(() => vi.unstubAllEnvs());

  const clear = () => {
    for (const name of [
      'RESEND_API_KEY',
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_USER',
      'SMTP_PASSWORD',
      'MAIL_FROM',
    ]) {
      vi.stubEnv(name, '');
    }
  };

  it('returns null when nothing is configured, so callers report delivered:false', () => {
    clear();
    expect(getMailer()).toBeNull();
  });

  it('chooses SMTP when only SMTP is configured', () => {
    clear();
    vi.stubEnv('SMTP_HOST', 'mail.novixa.dev');
    vi.stubEnv('MAIL_FROM', 'Novixa <no-reply@novixa.dev>');
    const mailer = getMailer();
    expect(mailer?.kind).toBe('smtp');
    expect(mailer?.from).toBe('Novixa <no-reply@novixa.dev>');
  });

  it('prefers Resend when both are configured', () => {
    clear();
    vi.stubEnv('SMTP_HOST', 'mail.novixa.dev');
    vi.stubEnv('RESEND_API_KEY', 're_test_not_a_key');
    expect(getMailer()?.kind).toBe('resend');
  });
});
