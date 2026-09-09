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
  { key: 'about', slug: 'about', labelAr: 'عن الشركة', labelEn: 'About' },
  { key: 'services', slug: 'solutions', labelAr: 'الخدمات', labelEn: 'Services' },
  { key: 'work', slug: 'work', labelAr: 'الأعمال', labelEn: 'Work' },
  { key: 'insights', slug: 'insights', labelAr: 'المدونة', labelEn: 'Insights' },
  { key: 'team', slug: 'team', labelAr: 'الفريق', labelEn: 'Team' },
  { key: 'contact', slug: 'contact', labelAr: 'الاتصال', labelEn: 'Contact' },
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
