/**
 * Novixa Team Data Layer
 * بيانات فريق العمل الأساسي في شركة نوڤيكسا
 */

export interface TeamMember {
  id: string;
  name: string;
  nameEn?: string;
  role: string;
  roleEn?: string;
  bio: string;
  bioEn?: string;
  image: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ahmed-al-farsi',
    name: 'م. أحمد الفارسي',
    nameEn: 'Eng. Ahmed Al-Farsi',
    role: 'المدير التقني (CTO)',
    roleEn: 'Chief Technology Officer',
    bio: 'يقود التوجه المعماري والابتكار البرمجي للمنصات السحابية والنظم الموزعة في نوڤيكسا.',
    bioEn: 'Architecting distributed enterprise platforms and high-throughput cloud engines.',
    image: 'https://i.pravatar.cc/300?img=11',
    linkedin: 'https://linkedin.com/company/novixa',
    github: 'https://github.com/novixa',
    twitter: 'https://x.com/novixa',
  },
  {
    id: 'sara-al-khoury',
    name: 'سارة الخوري',
    nameEn: 'Sara Al-Khoury',
    role: 'مهندسة برمجيات أولى (Lead Full Stack)',
    roleEn: 'Lead Full Stack Engineer',
    bio: 'متخصصة في هندسة الواجهات التفاعلية فائقة الأداء وبناء النظم البرمجية السحابية.',
    bioEn: 'Specialized in sub-second interactive frontends and resilient cloud systems.',
    image: 'https://i.pravatar.cc/300?img=32',
    linkedin: 'https://linkedin.com/company/novixa',
    github: 'https://github.com/novixa',
    twitter: 'https://x.com/novixa',
  },
  {
    id: 'omar-al-saeed',
    name: 'عمر السعيد',
    nameEn: 'Omar Al-Saeed',
    role: 'مهندس معمارية السحابة (Cloud Solutions Architect)',
    roleEn: 'Cloud Solutions Architect',
    bio: 'خبير في بناء وتوسيع البنى السحابية متعددة المستأجرين مع جاهزية تشغيلية 99.99%.',
    bioEn: 'Expert in multi-tenant architectures, Kubernetes orchestration, and 99.99% uptime SLAs.',
    image: 'https://i.pravatar.cc/300?img=12',
    linkedin: 'https://linkedin.com/company/novixa',
    github: 'https://github.com/novixa',
    twitter: 'https://x.com/novixa',
  },
  {
    id: 'layla-al-mansoori',
    name: 'ليلى المنصوري',
    nameEn: 'Layla Al-Mansoori',
    role: 'مديرة تصميم الواجهات وتجربة المستخدم (Lead UI/UX)',
    roleEn: 'Lead UI/UX Designer',
    bio: 'تصمم تجارب ومنتجات رقمية تركز على سهولة الاستخدام والدقة البصرية العالية.',
    bioEn: 'Crafting intuitive digital experiences with architectural precision and restraint.',
    image: 'https://i.pravatar.cc/300?img=47',
    linkedin: 'https://linkedin.com/company/novixa',
    github: 'https://github.com/novixa',
    twitter: 'https://x.com/novixa',
  },
  {
    id: 'dr-karim-abdelaziz',
    name: 'د. كريم عبد العزيز',
    nameEn: 'Dr. Karim Abdelaziz',
    role: 'خبير الذكاء الاصطناعي وهندسة البيانات (AI & Data Architect)',
    roleEn: 'AI & Data Solutions Architect',
    bio: 'متخصص في دمج نماذج الذكاء الاصطناعي التطبيقية وتحليل البيانات الضخمة للشركات.',
    bioEn: 'Pioneering practical generative AI integrations, RAG pipelines, and enterprise data models.',
    image: 'https://i.pravatar.cc/300?img=60',
    linkedin: 'https://linkedin.com/company/novixa',
    github: 'https://github.com/novixa',
    twitter: 'https://x.com/novixa',
  },
  {
    id: 'mariam-al-shamsi',
    name: 'مريم الشامسي',
    nameEn: 'Mariam Al-Shamsi',
    role: 'مديرة المنتجات الرقمية (Digital Product Lead)',
    roleEn: 'Digital Product Lead',
    bio: 'تقود استراتيجيات إطلاق منتجات SaaS وتنسيق المتطلبات التقنية مع أهداف الأعمال.',
    bioEn: 'Driving B2B SaaS product roadmaps and aligning technical execution with business metrics.',
    image: 'https://i.pravatar.cc/300?img=45',
    linkedin: 'https://linkedin.com/company/novixa',
    github: 'https://github.com/novixa',
    twitter: 'https://x.com/novixa',
  },
  {
    id: 'tariq-al-haddad',
    name: 'طارق الحداد',
    nameEn: 'Tariq Al-Haddad',
    role: 'مهندس أمن المعلومات والأنظمة (DevSecOps Engineer)',
    roleEn: 'DevSecOps & Systems Engineer',
    bio: 'يحرص على تطبيق أعلى معايير الحماية والتشفير وأتمتة خطوط النشر الآمن.',
    bioEn: 'Enforcing zero-trust security topologies, encryption protocols, and automated CI/CD.',
    image: 'https://i.pravatar.cc/300?img=59',
    linkedin: 'https://linkedin.com/company/novixa',
    github: 'https://github.com/novixa',
    twitter: 'https://x.com/novixa',
  },
  {
    id: 'david-miller',
    name: 'ديفيد ميلر',
    nameEn: 'David Miller',
    role: 'مهندس أداء ونظم موزعة (Distributed Systems Engineer)',
    roleEn: 'Distributed Systems Engineer',
    bio: 'يركز على تسريع زمن الاستجابة وتقليل الإبطاء ومعالجة الطلبات المتزامنة الضخمة.',
    bioEn: 'Optimizing high-concurrency systems, edge compute caches, and low-latency database queries.',
    image: 'https://i.pravatar.cc/300?img=33',
    linkedin: 'https://linkedin.com/company/novixa',
    github: 'https://github.com/novixa',
    twitter: 'https://x.com/novixa',
  },
];
