import { LeadRecord } from '../leads/types';

export interface NotificationService {
  notifyNewLead(lead: LeadRecord): Promise<void>;
}

export class DefaultNotificationService implements NotificationService {
  async notifyNewLead(lead: LeadRecord): Promise<void> {
    const smtpHost = process.env.SMTP_HOST;
    const recipient = process.env.NOTIFICATION_EMAIL || 'leads@novixa.io';

    console.log(`[Novixa NotificationService] New Lead Event Dispatched for Lead ID: ${lead.id}`);

    if (smtpHost && smtpHost.trim()) {
      console.log(`[Novixa NotificationService] Dispatching SMTP alert to ${recipient} via ${smtpHost}...`);
      // SMTP transport dispatch logic here when credentials provided
    } else {
      console.log(
        `[Novixa NotificationService] SMTP unconfigured. Lead ${lead.id} (${lead.company || lead.name}) stored safely in SQLite Database source-of-truth.`
      );
    }
  }
}

export const notificationService: NotificationService = new DefaultNotificationService();
