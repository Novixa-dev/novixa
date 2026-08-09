import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { ProductsView } from '@/components/views/ProductsView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'كتالوج المنتجات البرمجية الرقمية' : 'Digital Product Catalog (SaaS)',
    description: isAr
      ? 'اكتشف منصات نوڤيكسا الرقمية: Novixa Pulse لنبض التشغيل والذكاء الاصطناعي، Novixa Restaurant لكيو آر نقاط البيع والمطبخ، وNovixa Booking.'
      : 'Explore Novixa SaaS products: Novixa Pulse for operational analytics, Novixa Restaurant POS/KDS, and Novixa Booking Engine.',
    lang,
    path: 'products',
  });
}

export default async function ProductsPage() {
  return <ProductsView />;
}
