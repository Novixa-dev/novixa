/**
 * Novixa Centralized Services Data
 * قائمة الخدمات الهندسية والبرمجية المقدمة من شركة نوڤيكسا
 */

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  shortDescEn: string;
  featuresAr: string[];
  featuresEn: string[];
  icon: string;
  slug: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'web-platforms',
    slug: 'business-platforms',
    titleAr: 'تطوير منصات الويب السحابية',
    titleEn: 'Enterprise Web & Cloud Platforms',
    shortDescAr: 'هندسة منصات تشغيلية مركزية فائقة السرعة تدمج العمليات، المخزون، والبيانات في لوحة قيادة واحدة.',
    shortDescEn: 'High-performance centralized operational hubs unifying workflows, branches, and live telemetry.',
    featuresAr: ['معمارية موزعة عالية التوافر', 'لوحات تحكم تشغيلية فورية', 'تكاملات API وأنظمة الفوترة'],
    featuresEn: ['High-availability distributed engines', 'Real-time operational dashboards', 'Seamless ERP & billing sync'],
    icon: 'Layout',
  },
  {
    id: 'saas-products',
    slug: 'saas',
    titleAr: 'تطوير منتجات SaaS السحابية',
    titleEn: 'Multi-Tenant Cloud SaaS Products',
    shortDescAr: 'بناء منصات سحابية متعددة المستأجرين من الصفر، مع إدارة الاشتراكات، العزل الأمني، وقابلية التوسع الأفقي.',
    shortDescEn: 'Production-ready multi-tenant architectures engineered for predictable recurring revenue and massive scale.',
    featuresAr: ['عزل آمن لبيانات المشتركين', 'إدارة الاشتراكات والتجديد التلقائي', 'بنية سحابية خفيفة على الـ Edge'],
    featuresEn: ['Tenant-level data isolation', 'Automated recurring billing cycles', 'Global serverless edge latency'],
    icon: 'Cloud',
  },
  {
    id: 'mobile-pos',
    slug: 'digital-commerce',
    titleAr: 'تطبيقات الجوال والأنظمة التشغيلية',
    titleEn: 'Mobile Apps & POS Systems',
    shortDescAr: 'تطبيقات جوال سريعة وأنظمة نقاط بيع متطورة تعمل بسلاسة حتى في أوقات الذروة وانقطاع الاتصال.',
    shortDescEn: 'Sub-second mobile applications and resilient POS/KDS systems built for high-stress operational peaks.',
    featuresAr: ['دعم العمل دون اتصال بالإنترنت', 'مزامنة فورية متعددة الفروع', 'تجربة مستخدم تفاعلية وسريعة'],
    featuresEn: ['Offline-first local cache resilience', 'Instant multi-branch sync', 'Frictionless checkout interactions'],
    icon: 'Smartphone',
  },
  {
    id: 'practical-ai',
    slug: 'ai-solutions',
    titleAr: 'حلول الذكاء الاصطناعي التطبيقي',
    titleEn: 'Practical Applied AI Solutions',
    shortDescAr: 'أتمتة الأعمال ومعالجة المستندات والبيانات بدقة، مع بناء مساعدات ذكية مدربة على معرفة شركتك الداخلية.',
    shortDescEn: 'Integrating domain-specific LLM models, RAG pipelines, and automated document extraction into core business logic.',
    featuresAr: ['استخراج البيانات الآلي من الفواتير', 'مساعدات أعمال ذكية بنظام RAG', 'تصنيف المراسلات والمهام تلقائياً'],
    featuresEn: ['Automated invoice & contract OCR', 'Enterprise RAG knowledge assistants', 'Intelligent routing & classification'],
    icon: 'Sparkles',
  },
  {
    id: 'tech-consulting',
    slug: 'custom-software',
    titleAr: 'الاستشارات التقنية والمعمارية',
    titleEn: 'Architectural & Tech Advisory',
    shortDescAr: 'تقييم شامل للبنى التحتية، فحص أمان النظم، وتحسين أداء قواعد البيانات وتقليل تكاليف السحابة.',
    shortDescEn: 'Deep-dive architectural code audits, database optimization, cloud cost containment, and security hardeners.',
    featuresAr: ['مراجعة وتدقيق جودة الأكواد', 'تحسين زمن الاستجابة والأداء', 'خطط التوسع وموثوقية النظم 99.9%'],
    featuresEn: ['Comprehensive code health audits', 'Low-latency query optimization', 'Zero-downtime scaling roadmaps'],
    icon: 'Code2',
  },
  {
    id: 'booking-systems',
    slug: 'booking-systems',
    titleAr: 'أنظمة الجدولة والحجوزات الذكية',
    titleEn: 'Smart Booking & Scheduling Engines',
    shortDescAr: 'منصات حجز موارد وصالات متقدمة تمنع التعارض الزمني وتوفر إشعارات آلية وإدارة عربون ودفع ذكية.',
    shortDescEn: 'Intelligent reservation systems eliminating double-bookings with automated notifications and deposit locks.',
    featuresAr: ['منع التعارض اللحظي للمواعيد', 'إشعارات آلية عبر واتساب والرسائل', 'إدارة الموارد والصالات والموظفين'],
    featuresEn: ['Zero-conflict slot allocation', 'Automated WhatsApp & SMS updates', 'Staff & venue resource allocation'],
    icon: 'CalendarCheck',
  },
];
