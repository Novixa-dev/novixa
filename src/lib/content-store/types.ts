/**
 * Novixa Content & Catalog Store Type Definitions
 * Supports full CRUD operations across all business verticals, CMS entities,
 * partner management, and community initiatives.
 */

export type BilingualString = {
  ar: string;
  en: string;
};

/* =========================================================================
   1. Catalog Items (Services, Turnkey Solutions, SaaS Products, Industries)
   ========================================================================= */

export type CatalogKind = 'service' | 'solution' | 'product' | 'industry';

export interface CatalogItem {
  id: string;
  kind: CatalogKind;
  slug: string;
  title: BilingualString;
  description: BilingualString;
  categoryBadge?: BilingualString;
  tags: string[];
  features: string[];
  deliveryTimelineBadge?: BilingualString;
  publicRoute: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export type CatalogInput = Omit<CatalogItem, 'id' | 'createdAt' | 'updatedAt'>;

/* =========================================================================
   2. FAQ Items
   ========================================================================= */

export type FaqTopic = 'engagement' | 'delivery' | 'ownership' | 'operations' | 'general';

export interface FaqItem {
  id: string;
  topic: FaqTopic;
  question: BilingualString;
  answer: BilingualString;
  order: number;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export type FaqInput = Omit<FaqItem, 'id' | 'createdAt' | 'updatedAt'>;

/* =========================================================================
   3. Insights & Technical Articles
   ========================================================================= */

export interface InsightItem {
  id: string;
  slug: string;
  title: BilingualString;
  excerpt: BilingualString;
  category: BilingualString;
  readTime: BilingualString;
  date: string;
  authorName: BilingualString;
  authorRole: BilingualString;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export type InsightInput = Omit<InsightItem, 'id' | 'createdAt' | 'updatedAt'>;

/* =========================================================================
   4. Case Studies & Architecture Prototypes
   ========================================================================= */

export interface CaseStudyItem {
  id: string;
  slug: string;
  client: string;
  title: BilingualString;
  industry: BilingualString;
  location: BilingualString;
  caseStudyTypeLabel: BilingualString;
  challenge: BilingualString;
  solution: BilingualString;
  technologies: string[];
  statusLabel: BilingualString;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export type CaseStudyInput = Omit<CaseStudyItem, 'id' | 'createdAt' | 'updatedAt'>;

/* =========================================================================
   5. Affiliate / Partner Program & Commissions Ledger
   ========================================================================= */

export type PartnerStatus = 'active' | 'pending' | 'suspended';

export interface PartnerItem {
  id: string;
  name: string;
  email: string;
  company?: string;
  referralCode: string;
  defaultCommissionRate: number; // e.g. 30 for 30%
  status: PartnerStatus;
  agreementNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type PartnerInput = Omit<PartnerItem, 'id' | 'createdAt' | 'updatedAt'>;

export type CommissionStatus = 'pending_review' | 'approved' | 'paid' | 'disputed' | 'reversed';

export interface CommissionItem {
  id: string;
  partnerId: string;
  partnerName: string;
  leadId?: string;
  saleAmountUsd: number;
  commissionRate: number; // percentage, e.g. 30
  commissionAmountUsd: number;
  status: CommissionStatus;
  notes?: string;
  recordedAt: string;
  paidAt?: string;
}

export type CommissionInput = Omit<CommissionItem, 'id' | 'recordedAt'>;

/* =========================================================================
   6. Community Initiatives & Campaigns
   ========================================================================= */

export type CampaignStatus = 'active' | 'closed' | 'draft';

export interface CampaignItem {
  id: string;
  slug: string;
  title: BilingualString;
  description: BilingualString;
  eligibility: BilingualString;
  quotaLimit?: number;
  status: CampaignStatus;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type CampaignInput = Omit<CampaignItem, 'id' | 'createdAt' | 'updatedAt'>;

export type ApplicationStatus = 'new' | 'in_review' | 'accepted' | 'waitlisted' | 'rejected';

export interface CampaignApplicationItem {
  id: string;
  campaignId: string;
  campaignTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  organizationOrProject: string;
  details: string;
  status: ApplicationStatus;
  internalNotes?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export type CampaignApplicationInput = Omit<CampaignApplicationItem, 'id' | 'submittedAt'>;

/* =========================================================================
   7. ContentStore Master Interface
   ========================================================================= */

export interface ContentStore {
  readonly kind: 'postgres' | 'memory';

  // Catalog (Services, Solutions, Products, Industries)
  listCatalog(kind?: CatalogKind | 'all', search?: string): Promise<CatalogItem[]>;
  getCatalog(id: string): Promise<CatalogItem | null>;
  createCatalog(input: CatalogInput): Promise<CatalogItem>;
  updateCatalog(id: string, patch: Partial<CatalogInput>): Promise<CatalogItem | null>;
  deleteCatalog(id: string): Promise<boolean>;

  // FAQ
  listFaqs(topic?: FaqTopic | 'all', search?: string): Promise<FaqItem[]>;
  getFaq(id: string): Promise<FaqItem | null>;
  createFaq(input: FaqInput): Promise<FaqItem>;
  updateFaq(id: string, patch: Partial<FaqInput>): Promise<FaqItem | null>;
  deleteFaq(id: string): Promise<boolean>;

  // Insights
  listInsights(search?: string): Promise<InsightItem[]>;
  getInsight(id: string): Promise<InsightItem | null>;
  createInsight(input: InsightInput): Promise<InsightItem>;
  updateInsight(id: string, patch: Partial<InsightInput>): Promise<InsightItem | null>;
  deleteInsight(id: string): Promise<boolean>;

  // Case Studies
  listCaseStudies(search?: string): Promise<CaseStudyItem[]>;
  getCaseStudy(id: string): Promise<CaseStudyItem | null>;
  createCaseStudy(input: CaseStudyInput): Promise<CaseStudyItem>;
  updateCaseStudy(id: string, patch: Partial<CaseStudyInput>): Promise<CaseStudyItem | null>;
  deleteCaseStudy(id: string): Promise<boolean>;

  // Partners & Commissions
  listPartners(search?: string): Promise<PartnerItem[]>;
  getPartner(id: string): Promise<PartnerItem | null>;
  createPartner(input: PartnerInput): Promise<PartnerItem>;
  updatePartner(id: string, patch: Partial<PartnerInput>): Promise<PartnerItem | null>;
  deletePartner(id: string): Promise<boolean>;

  listCommissions(partnerId?: string): Promise<CommissionItem[]>;
  recordCommission(input: CommissionInput): Promise<CommissionItem>;
  updateCommissionStatus(id: string, status: CommissionStatus, notes?: string): Promise<CommissionItem | null>;

  // Community Campaigns & Applications
  listCampaigns(status?: CampaignStatus | 'all'): Promise<CampaignItem[]>;
  getCampaign(id: string): Promise<CampaignItem | null>;
  createCampaign(input: CampaignInput): Promise<CampaignItem>;
  updateCampaign(id: string, patch: Partial<CampaignInput>): Promise<CampaignItem | null>;
  deleteCampaign(id: string): Promise<boolean>;

  listApplications(campaignId?: string): Promise<CampaignApplicationItem[]>;
  createApplication(input: CampaignApplicationInput): Promise<CampaignApplicationItem>;
  updateApplicationStatus(id: string, status: ApplicationStatus, internalNotes?: string): Promise<CampaignApplicationItem | null>;
}
