import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { ProductsView } from '@/components/views/ProductsView';
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
  return <ProductsView lang={lang} />;
}
