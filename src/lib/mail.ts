import 'server-only';
import { Resend } from 'resend';
import nodemailer, { type Transporter } from 'nodemailer';

/**
 * One way to send email, whichever provider is configured.
 *
 * Two transports, chosen by environment, Resend first:
 *
 *  - Resend (RESEND_API_KEY) — a hosted API with its own sending reputation.
 *  - SMTP (SMTP_HOST, …) — any authenticated submission server. On the
 *    production VPS this is the mailcow instance already serving novixa.dev, so
 *    the site sends from a real mailbox on its own domain with no third party.
 *
 * Neither configured → `getMailer()` returns null and callers say plainly that
 * no email went out (leads are still stored). Nothing here ever pretends a
 * message was delivered.
 */

export interface MailMessage {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}

export interface Mailer {
  readonly kind: 'resend' | 'smtp';
  /** The From header every message carries. */
  readonly from: string;
  /** Resolves on acceptance by the provider; throws with the provider's reason otherwise. */
  send(message: MailMessage): Promise<void>;
}

export interface MailConfig {
  from: string;
  resendApiKey: string;
  smtp: { host: string; port: number; secure: boolean; user: string; password: string } | null;
}

export function readMailConfig(env: NodeJS.ProcessEnv = process.env): MailConfig {
  const host = (env.SMTP_HOST || '').trim();
  const port = Number.parseInt(env.SMTP_PORT || '', 10) || 587;
  return {
    // MAIL_FROM is the transport-neutral name; RESEND_FROM_EMAIL is kept so
    // existing deployments do not change behaviour.
    from: env.MAIL_FROM || env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    resendApiKey: env.RESEND_API_KEY || '',
    smtp: host
      ? {
          host,
          port,
          // 465 is implicit TLS; 587 upgrades with STARTTLS, which nodemailer
          // requires (requireTLS below) so credentials never cross in clear.
          secure: env.SMTP_SECURE ? env.SMTP_SECURE === 'true' : port === 465,
          user: env.SMTP_USER || '',
          password: env.SMTP_PASSWORD || '',
        }
      : null,
  };
}

class ResendMailer implements Mailer {
  readonly kind = 'resend' as const;
  private readonly client: Resend;

  constructor(apiKey: string, readonly from: string) {
    this.client = new Resend(apiKey);
  }

  async send(message: MailMessage): Promise<void> {
    const { error } = await this.client.emails.send({
      from: this.from,
      to: [message.to],
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
    if (error) throw new Error(`Resend: ${error.name}: ${error.message}`);
  }
}

class SmtpMailer implements Mailer {
  readonly kind = 'smtp' as const;
  private readonly transport: Transporter;

  constructor(smtp: NonNullable<MailConfig['smtp']>, readonly from: string) {
    this.transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      requireTLS: !smtp.secure,
      auth: smtp.user ? { user: smtp.user, pass: smtp.password } : undefined,
      // The message is built from strings this app controls; never let a
      // field be read as a file path or fetched as a URL.
      disableFileAccess: true,
      disableUrlAccess: true,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }

  async send(message: MailMessage): Promise<void> {
    await this.transport.sendMail({
      from: this.from,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
  }
}

const cache = globalThis as typeof globalThis & { __novixaMailer?: { key: string; mailer: Mailer | null } };

export function getMailer(): Mailer | null {
  const config = readMailConfig();
  const key = JSON.stringify(config);
  if (cache.__novixaMailer?.key === key) return cache.__novixaMailer.mailer;

  const mailer = config.resendApiKey
    ? new ResendMailer(config.resendApiKey, config.from)
    : config.smtp
      ? new SmtpMailer(config.smtp, config.from)
      : null;
  cache.__novixaMailer = { key, mailer };
  return mailer;
}
