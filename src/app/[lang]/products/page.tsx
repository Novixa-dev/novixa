import React from 'react';
import { constructMetadata, generateBreadcrumbJsonLd, generateItemListJsonLd } from '@/lib/metadata';
import { ProductsView } from '@/components/views/ProductsView';
import { productsCatalog } from '@/lib/content';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'كتالوج المنتجات والمنصات البرمجية' : 'Digital Software Products & Platforms',
    description: isAr
      ? 'استكشف منصات نوڤيكسا البرمجية: منصة إدارة العقارات Novixa Aqar، منصة إدارة البطولات الرياضية مهاجم Muhajim، أنظمة نقاط البيع للمطاعم، وأنظمة الحجز والجدولة.'
      : 'Explore Novixa digital products: Novixa Aqar PropTech engine, Muhajim sports platform, restaurant POS/KDS, booking & scheduling hubs, and operational intelligence.',
    lang,
    path: 'products',
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'المنتجات الرقمية' : 'Products', url: `/${lang}/products` },
  ]);

  const itemListJsonLd = generateItemListJsonLd(
    productsCatalog.map((p) => ({
      name: p.name[isAr ? 'ar' : 'en'],
      url: `/${lang}/products/${p.id}`,
    })),
    isAr ? 'منتجات نوڤيكسا الرقمية' : 'Novixa Digital Products'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ProductsView lang={lang} />
    </>
  );
}
