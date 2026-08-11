export type LeadStatus = 'NEW' | 'REVIEWING' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'LOST';

export interface LeadRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  industry: string;
  operationalProblem?: string;
  currentSetup?: string;
  budgetRange?: string;
  timeline?: string;
  message?: string;
  language?: string;
  source?: string;
  status: LeadStatus;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  industry: string;
  operationalProblem?: string;
  currentSetup?: string;
  budgetRange?: string;
  timeline?: string;
  message?: string;
  language?: string;
  source?: string;
}

export interface LeadRepository {
  create(input: CreateLeadInput): Promise<LeadRecord>;
  findById(id: string): Promise<LeadRecord | null>;
  list(): Promise<LeadRecord[]>;
  updateStatus(id: string, status: LeadStatus): Promise<LeadRecord | null>;
}
