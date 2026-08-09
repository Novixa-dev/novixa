import { Metadata } from 'next';

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
  const baseUrl = 'https://novixa.io';
  const canonicalUrl = `${baseUrl}/${lang}${path ? `/${path}` : ''}`;
  const alternateAr = `${baseUrl}/ar${path ? `/${path}` : ''}`;
  const alternateEn = `${baseUrl}/en${path ? `/${path}` : ''}`;

  return {
    title: `${title} | Novixa`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: alternateAr,
        en: alternateEn,
      },
    },
    openGraph: {
      title: `${title} | Novixa`,
      description,
      url: canonicalUrl,
      siteName: 'Novixa',
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Novixa`,
      description,
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Novixa',
    url: 'https://novixa.io',
    logo: 'https://novixa.io/assets/logo.png',
    description: 'Enterprise Software Architecture, POS Hospitality Tech, Booking Engines & Logistics Control Systems.',
    areaServed: ['Saudi Arabia', 'United Arab Emirates', 'GCC', 'Middle East'],
    knowsAbout: [
      'Enterprise Software Architecture',
      'Multi-tenant Cloud Systems',
      'Hospitality POS & KDS',
      'Booking Engines',
      'Real-time Logistics Control',
    ],
  };
}
