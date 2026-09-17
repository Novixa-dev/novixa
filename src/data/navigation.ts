/**
 * Novixa Centralized Navigation Data
 * روابط التنقل الرئيسية وقنوات التواصل لشركة نوڤيكسا
 */

export interface NavItem {
  key: string;
  slug: string;
  labelAr: string;
  labelEn: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  iconName: 'Linkedin' | 'Github' | 'Twitter';
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { key: 'home', slug: '', labelAr: 'الرئيسية', labelEn: 'Home' },
  { key: 'services', slug: 'services', labelAr: 'الخدمات', labelEn: 'Services' },
  { key: 'solutions', slug: 'solutions', labelAr: 'الحلول الجاهزة', labelEn: 'Solutions' },
  { key: 'products', slug: 'products', labelAr: 'المنتجات', labelEn: 'Products' },
  { key: 'work', slug: 'work', labelAr: 'الأعمال', labelEn: 'Work' },
  { key: 'about', slug: 'about', labelAr: 'عن نوڤيكسا', labelEn: 'About' },
  { key: 'contact', slug: 'contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/novixa',
    iconName: 'Linkedin',
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/novixa',
    iconName: 'Github',
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    url: 'https://x.com/novixa',
    iconName: 'Twitter',
  },
];
