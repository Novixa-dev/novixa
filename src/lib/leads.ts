export interface CreateLeadInput {
  projectType: string;
  industry: string;
  problem?: string;
  existingSystem?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  budgetRange?: string;
  timeline?: string;
  details?: string;
}

export interface LeadRecord extends CreateLeadInput {
  id: string;
  createdAt: string;
  status: string;
}

export interface LeadRepository {
  createLead(input: CreateLeadInput): Promise<LeadRecord>;
  getLeads(): Promise<LeadRecord[]>;
}

// In-Memory / Local Repository
class LocalLeadRepository implements LeadRepository {
  private leads: LeadRecord[] = [];

  async createLead(input: CreateLeadInput): Promise<LeadRecord> {
    const lead: LeadRecord = {
      ...input,
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: 'NEW_LEAD',
    };
    this.leads.push(lead);
    console.log('[Novixa LeadRepository] New Lead Registered:', lead);
    return lead;
  }

  async getLeads(): Promise<LeadRecord[]> {
    return this.leads;
  }
}

export const leadRepository: LeadRepository = new LocalLeadRepository();
