import { randomUUID } from 'node:crypto';
import {
  SERVICES,
  READY_SOLUTIONS,
  PRODUCTS,
  INDUSTRIES,
  CASE_STUDIES,
  INSIGHTS,
} from '@/content/data';
import { FAQ_ITEMS } from '@/content/faq';
import type {
  CatalogInput,
  CatalogItem,
  CatalogKind,
  FaqInput,
  FaqItem,
  FaqTopic,
  InsightInput,
  InsightItem,
  CaseStudyInput,
  CaseStudyItem,
  PartnerInput,
  PartnerItem,
  CommissionInput,
  CommissionItem,
  CommissionStatus,
  CampaignInput,
  CampaignItem,
  CampaignStatus,
  CampaignApplicationInput,
  CampaignApplicationItem,
  ApplicationStatus,
  ContentStore,
} from './types';

/**
 * MemoryContentStore
 * Idempotently seeds initial content from data.ts and faq.ts.
 * Supports full CRUD in-memory, mirroring persistent database interfaces.
 */
export class MemoryContentStore implements ContentStore {
  readonly kind = 'memory' as const;

  private readonly catalog = new Map<string, CatalogItem>();
  private readonly faqs = new Map<string, FaqItem>();
  private readonly insights = new Map<string, InsightItem>();
  private readonly caseStudies = new Map<string, CaseStudyItem>();
  private readonly partners = new Map<string, PartnerItem>();
  private readonly commissions = new Map<string, CommissionItem>();
  private readonly campaigns = new Map<string, CampaignItem>();
  private readonly applications = new Map<string, CampaignApplicationItem>();

  constructor() {
    this.seed();
  }

  private seed(): void {
    const now = new Date().toISOString();

    // 1. Seed Services
    SERVICES.forEach((s) => {
      const id = `service-${s.id}`;
      this.catalog.set(id, {
        id,
        kind: 'service',
        slug: s.slug,
        title: s.title,
        description: s.subtitle,
        categoryBadge: s.categoryBadge,
        tags: s.deliverables.ar || [],
        features: s.capabilities.ar || [],
        publicRoute: `/services/${s.slug}`,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      });
    });

    // 2. Seed Solutions
    READY_SOLUTIONS.forEach((s) => {
      const id = `solution-${s.id}`;
      this.catalog.set(id, {
        id,
        kind: 'solution',
        slug: s.slug,
        title: s.name,
        description: s.tagline,
        categoryBadge: s.badge,
        tags: [s.deliveryTimelineBadge.ar],
        features: s.features.ar || [],
        deliveryTimelineBadge: s.deliveryTimelineBadge,
        publicRoute: `/solutions/${s.slug}`,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      });
    });

    // 3. Seed Products
    PRODUCTS.forEach((p) => {
      const id = `product-${p.id}`;
      this.catalog.set(id, {
        id,
        kind: 'product',
        slug: p.slug,
        title: p.name,
        description: p.tagline,
        categoryBadge: p.statusLabel,
        tags: [p.category.ar],
        features: p.features?.ar || [],
        publicRoute: `/products/${p.slug}`,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      });
    });

    // 4. Seed Industries
    INDUSTRIES.forEach((ind) => {
      const id = `industry-${ind.id}`;
      this.catalog.set(id, {
        id,
        kind: 'industry',
        slug: ind.slug,
        title: ind.name,
        description: ind.description,
        categoryBadge: { ar: 'قطاع متخصص', en: 'Industry Vertical' },
        tags: ind.productModules.ar || [],
        features: ind.solutions.ar || [],
        publicRoute: `/industries/${ind.slug}`,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      });
    });

    // 5. Seed FAQs
    FAQ_ITEMS.forEach((faq, index) => {
      this.faqs.set(faq.id, {
        id: faq.id,
        topic: faq.topic,
        question: faq.question,
        answer: faq.answer,
        order: index + 1,
        status: 'published',
        createdAt: now,
        updatedAt: now,
      });
    });

    // 6. Seed Insights
    INSIGHTS.forEach((ins) => {
      this.insights.set(ins.id, {
        id: ins.id,
        slug: ins.slug,
        title: ins.title,
        excerpt: ins.excerpt,
        category: ins.category,
        readTime: ins.readTime,
        date: ins.date,
        authorName: ins.author.name,
        authorRole: ins.author.role,
        status: 'published',
        createdAt: now,
        updatedAt: now,
      });
    });

    // 7. Seed Case Studies
    CASE_STUDIES.forEach((cs) => {
      this.caseStudies.set(cs.id, {
        id: cs.id,
        slug: cs.slug,
        client: cs.client,
        title: cs.title,
        industry: cs.industry,
        location: cs.location,
        caseStudyTypeLabel: cs.caseStudyTypeLabel,
        challenge: cs.challenge,
        solution: cs.solution,
        technologies: cs.technologies,
        statusLabel: cs.caseStudyTypeLabel,
        status: 'published',
        createdAt: now,
        updatedAt: now,
      });
    });

    // 8. Seed Default Approved Community Campaigns (Master Prompt §13)
    const eventCampaign: CampaignItem = {
      id: 'campaign-events',
      slug: 'community-events-websites',
      title: {
        ar: 'مواقع مجانية للفعاليات والمبادرات المعرفية والشبابية',
        en: 'Free Websites for Community & Scientific Events',
      },
      description: {
        ar: 'مبادرة نوڤيكسا لتطوير منصات ويب احترافية مخصصة للفعاليات والمؤتمرات غير الربحية في حضرموت واليمن.',
        en: 'Novixa initiative granting custom event landing pages to non-profit scientific and cultural youth events.',
      },
      eligibility: {
        ar: 'فعاليات ومؤتمرات علمية وثقافية ومبادرات شبابية غير ربحية ذات أثر مجتمعي واضح.',
        en: 'Non-profit academic, cultural, or youth initiatives with verified community impact.',
      },
      quotaLimit: 5,
      status: 'active',
      startDate: '2026-10-01',
      endDate: '2026-12-31',
      createdAt: now,
      updatedAt: now,
    };
    this.campaigns.set(eventCampaign.id, eventCampaign);

    const devGiftCampaign: CampaignItem = {
      id: 'campaign-dev-gifts',
      slug: 'developer-gifts-portfolio',
      title: {
        ar: 'هدية نوڤيكسا التقنية — مواقع شخصية للمطورين والطلاب المتميزين',
        en: 'A Technical Gift from Novixa — Personal Websites for Developers',
      },
      description: {
        ar: 'مساعدة مطوري البرمجيات والطلاب الواعدين في بناء ملف أعمال رقمي (Portfolio) احترافي يدعم انطلاقتهم المهنية.',
        en: 'Helping promising software developers and students craft verified portfolio websites.',
      },
      eligibility: {
        ar: 'مطورون وطلاب علوم حاسوب يمتلكون مشاريع برمجية حقيقية ويرغبون في بوابة عرض احترافية.',
        en: 'Developers and CS students with active repositories seeking professional career portfolios.',
      },
      quotaLimit: 10,
      status: 'active',
      startDate: '2026-10-01',
      endDate: '2026-11-30',
      createdAt: now,
      updatedAt: now,
    };
    this.campaigns.set(devGiftCampaign.id, devGiftCampaign);

    // 9. Seed Default Partner Reference (Master Prompt §12 - 30% baseline)
    const initialPartner: PartnerItem = {
      id: 'partner-default',
      name: 'شريك استشاري معتمد',
      email: 'partners@novixa.dev',
      company: 'شبكة شركاء الأعمال',
      referralCode: 'NVX-PARTNER-30',
      defaultCommissionRate: 30,
      status: 'active',
      agreementNotes: 'الاتفاقية الافتراضية المعتمدة بنسبة عمولة 30% على صفقات التراخيص والحلول المؤهلة',
      createdAt: now,
      updatedAt: now,
    };
    this.partners.set(initialPartner.id, initialPartner);
  }

  /* ================= CATALOG CRUD ================= */

  async listCatalog(kind?: CatalogKind | 'all', search?: string): Promise<CatalogItem[]> {
    let items = Array.from(this.catalog.values());
    if (kind && kind !== 'all') {
      items = items.filter((i) => i.kind === kind);
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (i) =>
          i.title.ar.toLowerCase().includes(q) ||
          i.title.en.toLowerCase().includes(q) ||
          i.slug.toLowerCase().includes(q) ||
          i.description.ar.toLowerCase().includes(q)
      );
    }
    return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async getCatalog(id: string): Promise<CatalogItem | null> {
    return this.catalog.get(id) || null;
  }

  async createCatalog(input: CatalogInput): Promise<CatalogItem> {
    const now = new Date().toISOString();
    const id = `${input.kind}-${input.slug || randomUUID().slice(0, 8)}`;
    const item: CatalogItem = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.catalog.set(id, item);
    return item;
  }

  async updateCatalog(id: string, patch: Partial<CatalogInput>): Promise<CatalogItem | null> {
    const existing = this.catalog.get(id);
    if (!existing) return null;
    const updated: CatalogItem = {
      ...existing,
      ...patch,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };
    this.catalog.set(id, updated);
    return updated;
  }

  async deleteCatalog(id: string): Promise<boolean> {
    return this.catalog.delete(id);
  }

  /* ================= FAQ CRUD ================= */

  async listFaqs(topic?: FaqTopic | 'all', search?: string): Promise<FaqItem[]> {
    let items = Array.from(this.faqs.values());
    if (topic && topic !== 'all') {
      items = items.filter((f) => f.topic === topic);
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (f) =>
          f.question.ar.toLowerCase().includes(q) ||
          f.question.en.toLowerCase().includes(q) ||
          f.answer.ar.toLowerCase().includes(q)
      );
    }
    return items.sort((a, b) => a.order - b.order);
  }

  async getFaq(id: string): Promise<FaqItem | null> {
    return this.faqs.get(id) || null;
  }

  async createFaq(input: FaqInput): Promise<FaqItem> {
    const now = new Date().toISOString();
    const id = `faq-${randomUUID().slice(0, 8)}`;
    const item: FaqItem = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.faqs.set(id, item);
    return item;
  }

  async updateFaq(id: string, patch: Partial<FaqInput>): Promise<FaqItem | null> {
    const existing = this.faqs.get(id);
    if (!existing) return null;
    const updated: FaqItem = {
      ...existing,
      ...patch,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };
    this.faqs.set(id, updated);
    return updated;
  }

  async deleteFaq(id: string): Promise<boolean> {
    return this.faqs.delete(id);
  }

  /* ================= INSIGHTS CRUD ================= */

  async listInsights(search?: string): Promise<InsightItem[]> {
    let items = Array.from(this.insights.values());
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (i) =>
          i.title.ar.toLowerCase().includes(q) ||
          i.title.en.toLowerCase().includes(q) ||
          i.excerpt.ar.toLowerCase().includes(q)
      );
    }
    return items.sort((a, b) => b.date.localeCompare(a.date));
  }

  async getInsight(id: string): Promise<InsightItem | null> {
    return this.insights.get(id) || null;
  }

  async createInsight(input: InsightInput): Promise<InsightItem> {
    const now = new Date().toISOString();
    const id = `insight-${input.slug || randomUUID().slice(0, 8)}`;
    const item: InsightItem = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.insights.set(id, item);
    return item;
  }

  async updateInsight(id: string, patch: Partial<InsightInput>): Promise<InsightItem | null> {
    const existing = this.insights.get(id);
    if (!existing) return null;
    const updated: InsightItem = {
      ...existing,
      ...patch,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };
    this.insights.set(id, updated);
    return updated;
  }

  async deleteInsight(id: string): Promise<boolean> {
    return this.insights.delete(id);
  }

  /* ================= CASE STUDIES CRUD ================= */

  async listCaseStudies(search?: string): Promise<CaseStudyItem[]> {
    let items = Array.from(this.caseStudies.values());
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (c) =>
          c.title.ar.toLowerCase().includes(q) ||
          c.title.en.toLowerCase().includes(q) ||
          c.client.toLowerCase().includes(q)
      );
    }
    return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async getCaseStudy(id: string): Promise<CaseStudyItem | null> {
    return this.caseStudies.get(id) || null;
  }

  async createCaseStudy(input: CaseStudyInput): Promise<CaseStudyItem> {
    const now = new Date().toISOString();
    const id = `case-study-${input.slug || randomUUID().slice(0, 8)}`;
    const item: CaseStudyItem = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.caseStudies.set(id, item);
    return item;
  }

  async updateCaseStudy(id: string, patch: Partial<CaseStudyInput>): Promise<CaseStudyItem | null> {
    const existing = this.caseStudies.get(id);
    if (!existing) return null;
    const updated: CaseStudyItem = {
      ...existing,
      ...patch,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };
    this.caseStudies.set(id, updated);
    return updated;
  }

  async deleteCaseStudy(id: string): Promise<boolean> {
    return this.caseStudies.delete(id);
  }

  /* ================= PARTNERS & COMMISSIONS CRUD ================= */

  async listPartners(search?: string): Promise<PartnerItem[]> {
    let items = Array.from(this.partners.values());
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.referralCode.toLowerCase().includes(q)
      );
    }
    return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async getPartner(id: string): Promise<PartnerItem | null> {
    return this.partners.get(id) || null;
  }

  async createPartner(input: PartnerInput): Promise<PartnerItem> {
    const now = new Date().toISOString();
    const id = `partner-${randomUUID().slice(0, 8)}`;
    const item: PartnerItem = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.partners.set(id, item);
    return item;
  }

  async updatePartner(id: string, patch: Partial<PartnerInput>): Promise<PartnerItem | null> {
    const existing = this.partners.get(id);
    if (!existing) return null;
    const updated: PartnerItem = {
      ...existing,
      ...patch,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };
    this.partners.set(id, updated);
    return updated;
  }

  async deletePartner(id: string): Promise<boolean> {
    return this.partners.delete(id);
  }

  async listCommissions(partnerId?: string): Promise<CommissionItem[]> {
    let items = Array.from(this.commissions.values());
    if (partnerId) {
      items = items.filter((c) => c.partnerId === partnerId);
    }
    return items.sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
  }

  async recordCommission(input: CommissionInput): Promise<CommissionItem> {
    const now = new Date().toISOString();
    const id = `comm-${randomUUID().slice(0, 8)}`;
    const item: CommissionItem = {
      ...input,
      id,
      recordedAt: now,
    };
    this.commissions.set(id, item);
    return item;
  }

  async updateCommissionStatus(id: string, status: CommissionStatus, notes?: string): Promise<CommissionItem | null> {
    const existing = this.commissions.get(id);
    if (!existing) return null;
    const updated: CommissionItem = {
      ...existing,
      status,
      notes: notes !== undefined ? notes : existing.notes,
      paidAt: status === 'paid' ? new Date().toISOString() : existing.paidAt,
    };
    this.commissions.set(id, updated);
    return updated;
  }

  /* ================= CAMPAIGNS & APPLICATIONS CRUD ================= */

  async listCampaigns(status?: CampaignStatus | 'all'): Promise<CampaignItem[]> {
    let items = Array.from(this.campaigns.values());
    if (status && status !== 'all') {
      items = items.filter((c) => c.status === status);
    }
    return items.sort((a, b) => b.startDate.localeCompare(a.startDate));
  }

  async getCampaign(id: string): Promise<CampaignItem | null> {
    return this.campaigns.get(id) || null;
  }

  async createCampaign(input: CampaignInput): Promise<CampaignItem> {
    const now = new Date().toISOString();
    const id = `campaign-${input.slug || randomUUID().slice(0, 8)}`;
    const item: CampaignItem = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.campaigns.set(id, item);
    return item;
  }

  async updateCampaign(id: string, patch: Partial<CampaignInput>): Promise<CampaignItem | null> {
    const existing = this.campaigns.get(id);
    if (!existing) return null;
    const updated: CampaignItem = {
      ...existing,
      ...patch,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };
    this.campaigns.set(id, updated);
    return updated;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  async listApplications(campaignId?: string): Promise<CampaignApplicationItem[]> {
    let items = Array.from(this.applications.values());
    if (campaignId) {
      items = items.filter((a) => a.campaignId === campaignId);
    }
    return items.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  }

  async createApplication(input: CampaignApplicationInput): Promise<CampaignApplicationItem> {
    const now = new Date().toISOString();
    const id = `app-${randomUUID().slice(0, 8)}`;
    const item: CampaignApplicationItem = {
      ...input,
      id,
      submittedAt: now,
    };
    this.applications.set(id, item);
    return item;
  }

  async updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
    internalNotes?: string
  ): Promise<CampaignApplicationItem | null> {
    const existing = this.applications.get(id);
    if (!existing) return null;
    const updated: CampaignApplicationItem = {
      ...existing,
      status,
      internalNotes: internalNotes !== undefined ? internalNotes : existing.internalNotes,
      reviewedAt: new Date().toISOString(),
    };
    this.applications.set(id, updated);
    return updated;
  }
}
