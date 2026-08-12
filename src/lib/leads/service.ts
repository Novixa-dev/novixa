import { CreateLeadInput, LeadRecord, LeadRepository, LeadStatus } from './types';
import { FirestoreLeadRepository } from './firestore-repository';
import { notificationService, NotificationService } from '../notifications/service';

export class LeadService {
  constructor(
    private repository: LeadRepository = new FirestoreLeadRepository(),
    private notifications: NotificationService = notificationService
  ) {}

  async submitLead(input: CreateLeadInput): Promise<{ success: true; lead: LeadRecord } | { success: false; error: string }> {
    // 1. Strict Validation
    if (!input.name || !input.name.trim()) {
      return { success: false, error: 'Contact name is required.' };
    }

    const email = input.email ? input.email.trim().toLowerCase() : '';
    if (!email || !email.includes('@') || !email.includes('.')) {
      return { success: false, error: 'A valid corporate email address is required.' };
    }

    if (!input.projectType || !input.projectType.trim()) {
      return { success: false, error: 'Project category selection is required.' };
    }

    if (!input.industry || !input.industry.trim()) {
      return { success: false, error: 'Industry sector is required.' };
    }

    // 2. Input Sanitization
    const sanitizedInput: CreateLeadInput = {
      name: input.name.trim().slice(0, 100),
      email,
      phone: input.phone ? input.phone.trim().slice(0, 50) : undefined,
      company: input.company ? input.company.trim().slice(0, 100) : undefined,
      projectType: input.projectType.trim().slice(0, 100),
      industry: input.industry.trim().slice(0, 100),
      operationalProblem: input.operationalProblem ? input.operationalProblem.trim().slice(0, 1000) : undefined,
      currentSetup: input.currentSetup ? input.currentSetup.trim().slice(0, 200) : undefined,
      budgetRange: input.budgetRange ? input.budgetRange.trim().slice(0, 50) : '$10k - $25k',
      timeline: input.timeline ? input.timeline.trim().slice(0, 50) : 'Asap',
      message: input.message ? input.message.trim().slice(0, 1000) : undefined,
      language: input.language ? input.language.trim().slice(0, 10) : 'ar',
      source: input.source ? input.source.trim().slice(0, 50) : 'web_wizard',
    };

    // 3. Persist in Database
    const lead = await this.repository.create(sanitizedInput);

    // 4. Notify async (non-blocking for UI response speed)
    this.notifications.notifyNewLead(lead).catch(err => {
      console.error('[Novixa LeadService] Non-blocking Notification Dispatch Error:', err);
    });

    return { success: true, lead };
  }

  async getLeadById(id: string): Promise<LeadRecord | null> {
    return this.repository.findById(id);
  }

  async getAllLeads(): Promise<LeadRecord[]> {
    return this.repository.list();
  }

  async updateLeadStatus(id: string, status: LeadStatus): Promise<LeadRecord | null> {
    return this.repository.updateStatus(id, status);
  }
}

export const leadService = new LeadService();
