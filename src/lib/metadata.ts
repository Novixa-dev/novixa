import { Metadata } from 'next';
import { getSiteUrl } from './site';

export { getSiteUrl };

/**
 * Builds the URL of the generated social card for a page.
 *
 * A page that returns its own `openGraph` object from `generateMetadata`
 * replaces the inherited one wholesale, which is why the file-based
 * `app/opengraph-image.tsx` never reached any page here and every share
 * rendered as a bare text card. Setting `images` explicitly on both
 * `openGraph` and `twitter` is what actually puts a card on the page.
 */
export function buildOgImageUrl({
  title,
  description,
  lang,
  eyebrow,
}: {
  title: string;
  description: string;
  lang: 'ar' | 'en';
  eyebrow?: string;
}): string {
  const params = new URLSearchParams({ t: title, d: description, l: lang });
  if (eyebrow) params.set('k', eyebrow);
  return `${getSiteUrl()}/og?${params.toString()}`;
}

export function constructMetadata({
  title,
  description,
  lang,
  path = '',
  eyebrow,
}: {
  title: string;
  description: string;
  lang: 'ar' | 'en';
  path?: string;
  /** Short pill label on the generated social card (e.g. a section name). */
  eyebrow?: string;
}): Metadata {
  const baseUrl = getSiteUrl();
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalUrl = `${baseUrl}/${lang}${cleanPath}`;
  const alternateAr = `${baseUrl}/ar${cleanPath}`;
  const alternateEn = `${baseUrl}/en${cleanPath}`;
  const ogImageUrl = buildOgImageUrl({ title, description, lang, eyebrow });
  const ogImage = {
    url: ogImageUrl,
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/png',
  };

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
      alternateLocale: lang === 'ar' ? ['en_US'] : ['ar_SA'],
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Novixa`,
      description,
      images: [ogImageUrl],
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
    // No `offers` block: Novixa does not publish a price for these products,
    // and the previous `price: '0'` told search engines they were free.
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

export function generateContactPageJsonLd(lang: 'ar' | 'en') {
  const baseUrl = getSiteUrl();
  const isAr = lang === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${baseUrl}/${lang}/contact`,
    url: `${baseUrl}/${lang}/contact`,
    inLanguage: lang,
    name: isAr ? 'تواصل مع نوڤيكسا' : 'Contact Novixa',
    mainEntity: {
      '@type': 'Organization',
      name: 'Novixa',
      alternateName: 'نوڤيكسا',
      url: baseUrl,
      email: 'hello@novixa.dev',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'hello@novixa.dev',
          availableLanguage: ['Arabic', 'English'],
          areaServed: ['YE', 'SA', 'AE', 'QA', 'KW', 'OM', 'BH'],
        },
      ],
    },
  };
}

export function generateServiceJsonLd({
  name,
  description,
  serviceType,
  url,
  lang,
}: {
  name: string;
  description: string;
  serviceType?: string;
  url: string;
  lang: 'ar' | 'en';
}) {
  const baseUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    inLanguage: lang,
    // No `offers` block: Novixa does not publish prices for these engagements,
    // and an invented or zero price would be a false claim to search engines.
    provider: {
      '@type': 'Organization',
      name: 'Novixa',
      url: baseUrl,
    },
    areaServed: ['YE', 'SA', 'AE', 'QA', 'KW', 'OM', 'BH'],
    availableLanguage: ['Arabic', 'English'],
    url: url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`,
  };
}

/**
 * Marks up a question list as a rich result.
 *
 * Only for questions that are genuinely answered on the page — Google treats
 * FAQPage markup that does not match visible content as a policy violation,
 * and it is the kind of shortcut that costs a site its rich results entirely.
 */
export function generateFaqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** A catalog listing — helps search engines understand a hub page's children. */
export function generateItemListJsonLd(
  items: Array<{ name: string; url: string }>,
  listName: string
) {
  const baseUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http')
        ? item.url
        : `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}
