import { Metadata } from 'next';

export function getSiteUrl(): string {
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
    if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  }
  return 'https://novixa.dev';
}

export function constructMetadata({
  title,
  description,
  lang,
  path = '',
}: {
  title: string;
  description: string;
  lang: 'ar' | 'en';
  path?: string;
}): Metadata {
  const baseUrl = getSiteUrl();
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalUrl = `${baseUrl}/${lang}${cleanPath}`;
  const alternateAr = `${baseUrl}/ar${cleanPath}`;
  const alternateEn = `${baseUrl}/en${cleanPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: alternateAr,
        en: alternateEn,
        'x-default': `${baseUrl}/ar${cleanPath}`,
      },
    },
    openGraph: {
      title: `${title} | Novixa`,
      description,
      url: canonicalUrl,
      siteName: 'Novixa | نوڤيكسا',
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Novixa`,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateOrganizationJsonLd() {
  const baseUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Novixa',
    alternateName: 'نوڤيكسا',
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    description:
      'Novixa is a software engineering and digital products company: custom business platforms, SaaS products, and system modernization for the Middle East and GCC.',
    areaServed: ['Yemen', 'Saudi Arabia', 'GCC', 'Middle East'],
    email: 'hello@novixa.dev',
    sameAs: [
      'https://linkedin.com/company/novixa',
      'https://github.com/novixa',
      'https://x.com/novixa',
    ],
    knowsAbout: [
      'Enterprise Software Architecture',
      'Multi-tenant Cloud Systems',
      'Hospitality POS & KDS',
      'Booking Engines',
      'Real-time Logistics Control',
      'B2B SaaS Engineering',
      'Practical AI & RAG Solutions',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical advisory and customer support',
      email: 'hello@novixa.dev',
      availableLanguage: ['Arabic', 'English'],
    },
  };
}

export function generateWebSiteJsonLd() {
  const baseUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Novixa',
    alternateName: 'نوڤيكسا للبرمجيات',
    url: baseUrl,
    inLanguage: ['ar', 'en'],
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  const baseUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

export function generateProductJsonLd({
  name,
  description,
  category,
  url,
}: {
  name: string;
  description: string;
  category?: string;
  url: string;
}) {
  const baseUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: category || 'BusinessApplication',
    operatingSystem: 'Web, Cloud, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
    },
    brand: {
      '@type': 'Brand',
      name: 'Novixa',
    },
    url: url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`,
  };
}

export function generateArticleJsonLd({
  title,
  description,
  author,
  datePublished,
  url,
}: {
  title: string;
  description: string;
  /** Novixa insights are written by internal practice teams, not named
   * individuals — model the author as an Organization to stay accurate. */
  author: string;
  datePublished: string;
  url: string;
}) {
  const baseUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Novixa',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.svg`,
      },
    },
    datePublished,
    mainEntityOfPage: url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`,
  };
}

