export type Language = 'ar' | 'en';

export type ProductStatus = 'Available' | 'In Development' | 'Early Access' | 'Coming Soon';

export interface Product {
  id: string;
  slug: string;
  name: { ar: string; en: string };
  tagline: { ar: string; en: string };
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  status: ProductStatus;
  statusLabel: { ar: string; en: string };
  category: { ar: string; en: string };
  features: { ar: string[]; en: string[] };
  targetIndustries: { ar: string[]; en: string[] };
  metrics?: { label: { ar: string; en: string }; value: string }[];
  accentColor: string;
  iconName: string;
}

export interface SolutionCategory {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  description: { ar: string; en: string };
  features: { ar: string[]; en: string[] };
  businessImpact: { ar: string; en: string };
  iconName: string;
  badge: { ar: string; en: string };
}

export interface Industry {
  id: string;
  slug: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  challenges: { ar: string[]; en: string[] };
  solutions: { ar: string[]; en: string[] };
  productModules: { ar: string[]; en: string[] };
  iconName: string;
  sampleStats: { label: { ar: string; en: string }; value: string }[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  title: { ar: string; en: string };
  industry: { ar: string; en: string };
  location: { ar: string; en: string };
  caseStudyType: 'Client Project' | 'Internal Product' | 'Prototype' | 'Concept' | 'Product Demonstration';
  caseStudyTypeLabel: { ar: string; en: string };
  challenge: { ar: string; en: string };
  strategy: { ar: string; en: string };
  solution: { ar: string; en: string };
  features: { ar: string[]; en: string[] };
  technologies: string[];
  metrics: { label: { ar: string; en: string }; value: string }[];
  heroImageTag: string;
  quote?: {
    text: { ar: string; en: string };
    author: string;
    role: { ar: string; en: string };
  };
}

export interface Testimonial {
  id: string;
  clientName: { ar: string; en: string };
  clientRole: { ar: string; en: string };
  company: { ar: string; en: string };
  industry: { ar: string; en: string };
  projectType: { ar: string; en: string };
  quote: { ar: string; en: string };
  outcome: { ar: string; en: string };
  metrics: { label: { ar: string; en: string }; value: string }[];
  rating: number;
  avatarInitials: string;
  verifiedProject: boolean;
  relatedCaseStudySlug?: string;
}

export interface ProcessStep {
  number: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  description: { ar: string; en: string };
  deliverable: { ar: string; en: string };
  customerBenefit: { ar: string; en: string };
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  category: { ar: string; en: string };
  readTime: { ar: string; en: string };
  date: string;
  excerpt: { ar: string; en: string };
  content: { ar: string[]; en: string[] };
  author: {
    name: string;
    role: { ar: string; en: string };
  };
}

export interface ProjectDiscoveryData {
  projectType: string;
  industry: string;
  problem: string;
  existingSystem: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  budgetRange: string;
  timeline: string;
  details: string;
}

export type ViewType = 
  | 'home'
  | 'services'
  | 'solutions'
  | 'industries'
  | 'products'
  | 'work'
  | 'case-study-detail'
  | 'about'
  | 'insights'
  | 'insight-detail'
  | 'start'
  | 'dev_integration';
