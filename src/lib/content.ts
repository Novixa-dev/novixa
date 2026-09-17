import {
  SERVICES,
  READY_SOLUTIONS,
  PRODUCTS,
  INDUSTRIES,
  CASE_STUDIES,
  INSIGHTS,
  SOLUTIONS,
} from '../content/data';
import {
  ServiceItem,
  ReadySolution,
  Product,
  Industry,
  CaseStudy,
  InsightArticle,
  SolutionCategory,
} from '../types';

export const servicesCatalog: ServiceItem[] = SERVICES;
export const readySolutionsCatalog: ReadySolution[] = READY_SOLUTIONS;
export const productsCatalog: Product[] = PRODUCTS;
export const industriesCatalog: Industry[] = INDUSTRIES;
export const caseStudiesCatalog: CaseStudy[] = CASE_STUDIES;
export const insightsArticles: InsightArticle[] = INSIGHTS;
export const solutionsCatalog: SolutionCategory[] = SOLUTIONS;

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug || s.id === slug);
}

export function getReadySolutionBySlug(slug: string): ReadySolution | undefined {
  return READY_SOLUTIONS.find((r) => r.slug === slug || r.id === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === slug || p.slug === slug);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.id === slug || i.slug === slug);
}

export function getWorkBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.id === slug || c.slug === slug);
}

export function getArticleBySlug(slug: string): InsightArticle | undefined {
  return INSIGHTS.find((a) => a.id === slug || a.slug === slug);
}
