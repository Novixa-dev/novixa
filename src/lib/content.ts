import { PRODUCTS, INDUSTRIES, CASE_STUDIES, INSIGHTS } from '../content/data';
import { Product, Industry, CaseStudy, InsightArticle } from '../types';

export const productsCatalog: Product[] = PRODUCTS;
export const industriesCatalog: Industry[] = INDUSTRIES;
export const caseStudiesCatalog: CaseStudy[] = CASE_STUDIES;
export const insightsArticles: InsightArticle[] = INSIGHTS;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === slug);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.id === slug);
}

export function getWorkBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.id === slug);
}

export function getArticleBySlug(slug: string): InsightArticle | undefined {
  return INSIGHTS.find((a) => a.id === slug);
}
