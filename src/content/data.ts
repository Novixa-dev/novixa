import {
  Product,
  ServiceItem,
  ReadySolution,
  SolutionCategory,
  Industry,
  CaseStudy,
  ProcessStep,
  InsightArticle,
} from '../types';

export const BRAND_INFO = {
  name: 'Novixa',
  nameArabic: 'نوڤيكسا',
  tagline: {
    ar: 'نبني الأنظمة والمنتجات الرقمية التي تجعل أعمالك تعمل بشكل أفضل.',
    en: 'We build the software systems and digital products that help businesses operate better.',
  },
  subtagline: {
    ar: 'من تطوير الأنظمة المخصصة إلى الحلول الجاهزة والنشر والاستضافة والصيانة، نحول احتياجات الأعمال إلى برمجيات عملية قابلة للنمو.',
    en: 'From custom software and reusable business solutions to deployment, hosting, integrations and ongoing maintenance, Novixa turns real business needs into practical software.',
  },
  positioning: {
    ar: 'شركة هندسة البرمجيات والمنتجات الرقمية وحلول الأعمال',
    en: 'Software Engineering, Digital Products & Business Software Solutions',
  },
  marketScope: {
    ar: 'حلول تقنية عملية للأعمال في اليمن والمنطقة.',
    en: 'Practical business software for Yemen, the GCC and beyond.',
  },
  email: 'hello@novixa.dev',
  whatsappUrl: 'https://wa.me/967770000000',
  location: {
    ar: 'اليمن • المملكة العربية السعودية • الخليج العربي',
    en: 'Yemen • Saudi Arabia • GCC & Beyond',
  },
  cta: {
    primary: { ar: 'ابدأ مشروعك', en: 'Start Your Project' },
    secondary: { ar: 'استكشف الحلول الجاهزة', en: 'Explore Ready Solutions' },
  },
};

/**
 * 9 Core Customer-Facing Services
 */
export const SERVICES: ServiceItem[] = [
  {
    id: 'custom-software',
    slug: 'custom-software',
    title: { ar: 'تطوير البرمجيات المخصصة', en: 'Custom Software Development' },
    subtitle: {
      ar: 'هندسة منصات ويب، أنظمة أعمال، لوحات قيادة، وواجهات خلفية مصممة خصيصاً لاحتياجاتك',
      en: 'Bespoke web applications, internal business systems, dashboards, and scalable APIs',
    },
    description: {
      ar: 'عندما تفشل البرامج الجاهزة في تلبية متطلبات نموذج عملك المعقد، نبني لك نظاماً برمجياً متكاملاً من الصفر وفق معمارية برمجية حديثة وقابلة للتوسع.',
      en: 'When generic off-the-shelf software falls short, we engineer tailor-made systems strictly around your proprietary business workflows, security rules, and growth targets.',
    },
    scopeTitle: { ar: 'ما يشمله التطوير المخصص:', en: 'What We Build:' },
    capabilities: {
      ar: [
        'تطبيقات الويب والمنصات التفاعلية (Web Applications)',
        'أنظمة الأعمال وإدارة العمليات الداخلية (Internal Business Systems)',
        'لوحات القيادة والتحليلات المباشرة (Operational Dashboards)',
        'الواجهات البرمجية والأنظمة الخلفية (APIs & High-Performance Backends)',
        'بوابات العملاء والموردين المخصصة (Customer & Vendor Portals)',
        'معمارية سحابية موثوقة وقواعد بيانات مشفرة',
      ],
      en: [
        'Modern High-Performance Web Applications',
        'Internal Business & Operations Management Systems',
        'Executive & Real-Time Operational Dashboards',
        'Robust APIs & High-Throughput Backend Architectures',
        'Custom Customer, Vendor & Broker Portals',
        'Secure Multi-Tenant Cloud Databases',
      ],
    },
    deliverables: {
      ar: ['كود مصدري مملوك بالكامل', 'توثيق تقني ومعماري شامل', 'اختبارات جودة وأمان مؤتمتة', 'بيئة إنتاج مهيأة بالكامل'],
      en: ['100% Proprietary Code Ownership', 'Complete Architecture & API Documentation', 'Automated QA & Security Test Suites', 'Production-Ready Cloud Release'],
    },
    businessValue: {
      ar: 'امتلاك أصل تقني ملك لشركتك بالكامل يمنحك ميزة تنافسية مستدامة.',
      en: 'Full proprietary ownership of your core technology asset with zero vendor lock-in.',
    },
    iconName: 'Code2',
    category: 'engineering',
    categoryBadge: { ar: 'هندسة مخصصة', en: 'Custom Engineering' },
  },
  {
    id: 'business-solutions',
    slug: 'business-solutions',
    title: { ar: 'حلول برمجيات الأعمال الجاهزة للتخصيص', en: 'Business Software Solutions' },
    subtitle: {
      ar: 'أنظمة متكاملة ومجربة جاهزة للتهيئة والتخصيص السريع للقطاعات المختلفة',
      en: 'Proven, ready-to-customize operational systems for commercial verticals',
    },
    description: {
      ar: 'بدلاً من البدء من الصفر وتحمل تكاليف وأوقات طويلة، نوفر قواعد برمجية مجربة ومكتملة الميزات للمطاعم، الحجوزات، العيادات، المتاجر، المخازن، وإدارة العقارات.',
      en: 'Instead of starting from zero, Novixa provides proven, production-tested software foundations configured, branded, localized, and deployed in days.',
    },
    scopeTitle: { ar: 'القطاعات والأنظمة المغطاة:', en: 'Target Verticals:' },
    capabilities: {
      ar: [
        'أنظمة تشغيل ونقاط بيع المطاعم والمقاهي (Restaurant POS & KDS)',
        'منصات حجز المواعيد والجدولة للعيادات والصالونات (Booking & Scheduling)',
        'أنظمة إدارة علاقات العملاء وفرق المبيعات (CRM & Sales Pipeline)',
        'إدارة المخزون وتتبع حركة المستودعات والفروع (Inventory & Stock Control)',
        'أنظمة إدارة الأملاك والمحافظ العقارية (Real Estate & Property Management)',
        'منصات المعاهد والمراكز التعليمية والتدريبية (Education & Training Hubs)',
      ],
      en: [
        'Restaurant POS, QR Ordering & Kitchen Display Systems',
        'Appointment Booking & Staff Scheduling Platforms',
        'B2B CRM & Customer Pipeline Automation',
        'Multi-Branch Inventory & Stock Movement Engines',
        'Property Portfolio & Real Estate Operations Hubs',
        'Training Institutes & Academy Management Systems',
      ],
    },
    deliverables: {
      ar: ['نظام مكتمل ومخصص بهوية شركتك', 'تدريب الفريق على التشغيل', 'إطلاق سريع خلال 5-14 يوماً', 'استضافة سحابية مدارة'],
      en: ['Branded & Localized Turnkey System', 'Staff Onboarding & Workflow Training', 'Fast Deployment within 5–14 Days', 'Managed Production Cloud Hosting'],
    },
    businessValue: {
      ar: 'سرعة نزول للسوق وتوفير أكثر من 60% من تكاليف التطوير التقليدي.',
      en: 'Fast time-to-market saving over 60% of traditional custom development costs.',
    },
    iconName: 'LayoutGrid',
    category: 'engineering',
    categoryBadge: { ar: 'حلول سريعة الإطلاق', en: 'Fast Turnaround' },
  },
  {
    id: 'product-development',
    slug: 'product-development',
    title: { ar: 'تطوير المنتجات الرقمية (SaaS)', en: 'Digital Product Development' },
    subtitle: {
      ar: 'من فكرة المنتج المعماري وتجربة المستخدم حتى الإطلاق والنمو المستدام',
      en: 'End-to-end digital product design, multi-tenant engineering, and launch',
    },
    description: {
      ar: 'نساعد رواد الأعمال والشركات على تحويل الأفكار البرمجية إلى منتجات SaaS قابلة للتوسع تجارياً، مع تصميم تجربة مستخدم فائقة الدقة وبنية تحتية مرنة.',
      en: 'We partner with visionary founders and enterprises to engineer scalable SaaS products, balancing modern UX craft with multi-tenant architecture.',
    },
    scopeTitle: { ar: 'دورة بناء المنتج:', en: 'Product Lifecycle:' },
    capabilities: {
      ar: [
        'استكشاف المنتج وتحديد متطلبات السوق (Product Discovery)',
        'تصميم معمارية الأنظمة السحابية (Cloud Architecture & Schema Design)',
        'تصميم واجهات وتجربة المستخدم فائقة السلاسة (UX/UI Engineering)',
        'التطوير البرمجي الكامل للواجهات والخلفيات (Full-Stack Build)',
        'اختبارات الجودة ومطابقة الأداء (Rigorous Testing & Benchmarking)',
        'إطلاق المنتج والتطوير التكراري (Continuous Iteration & Growth)',
      ],
      en: [
        'Product Discovery & Requirements Scoping (PRD)',
        'Multi-Tenant Cloud & Schema Architecture Design',
        'RTL-First High-Contrast UI/UX Design Systems',
        'Type-Safe Full-Stack Full Implementation',
        'Automated Stress Testing & Edge-Case QA',
        'Staged Production Release & Feature Iteration',
      ],
    },
    deliverables: {
      ar: ['نموذج تفاعلي عالي الدقة', 'نظام برمجي سحابي متكامل', 'بنية دفع واشتراكات دورية', 'لوحات تحكم إدارية'],
      en: ['Interactive High-Fidelity Prototype', 'Multi-Tenant Cloud Platform', 'Subscription & Billing Engine', 'Executive Admin Dashboards'],
    },
    businessValue: {
      ar: 'بناء منتج رقمي بقيمة استثمارية حقيقية وتجربة مستخدم عالمية.',
      en: 'Engineering an investment-grade digital product built for recurring growth.',
    },
    iconName: 'Layers',
    category: 'engineering',
    categoryBadge: { ar: 'هندسة منتجات', en: 'Product Engineering' },
  },
  {
    id: 'system-modernization',
    slug: 'system-modernization',
    title: { ar: 'تحديث وتطوير الأنظمة القديمة', en: 'System Modernization' },
    subtitle: {
      ar: 'ترقية الأنظمة المتقادمة، تسريع الأداء، وإعادة بناء قواعد البيانات دون توقف الأعمال',
      en: 'Legacy modernization, database optimization, and zero-downtime migration',
    },
    description: {
      ar: 'إذا كان نظامك الحالي يعاني من البطء، كثرة الأعطال، أو صعوبة التوسع، نقوم بفحص معمارية الكود وإعادة بنائه بتقنيات سحابية حديثة وآمنة مع الحفاظ على بياناتك التاريخية.',
      en: 'If your existing software suffers from slowdowns, crashes, or legacy bottlenecks, we audit and modernize your tech stack without disrupting daily operations.',
    },
    scopeTitle: { ar: 'خدمات التحديث تشمل:', en: 'Modernization Scope:' },
    capabilities: {
      ar: [
        'فحص المعمارية والأداء واكتشاف الثغرات (Architecture & Code Audit)',
        'تحسين وهيكلة قواعد البيانات وتسريع الاستعلامات (Database Tuning)',
        'تحديث وبناء واجهات برمجية حديثة (API Modernization & REST/GraphQL)',
        'ترحيل البيانات والأنظمة إلى السحابة دون انقطاع (Zero-Downtime Migration)',
        'إعادة تصميم تجربة وواجهة المستخدم (Modern UI/UX Redesign)',
        'تعزيز معايير الأمان ومقاومة الأعطال (Hardening & Resilience)',
      ],
      en: [
        'Comprehensive Code & Infrastructure Architecture Audit',
        'Database Optimization, Indexing & Query Acceleration',
        'API Re-architecting (REST, GraphQL & Webhooks)',
        'Zero-Downtime Cloud Migration & Historical Data Transfer',
        'Complete UI/UX Overhaul for Modern Devices',
        'Security Hardening & Fault-Tolerance Engineering',
      ],
    },
    deliverables: {
      ar: ['تقرير تدقيق فني شامل', 'بيئة حديثة أسرع بمرات', 'بيانات مرحلة ومحققة بالكامل', 'توثيق محدث للنظام'],
      en: ['Technical Audit & Optimization Report', 'Sub-second Modern Stack', 'Validated Migrated Database', 'Up-to-date System Specs'],
    },
    businessValue: {
      ar: 'إطالة عمر استثماراتك التقنية وخفض تكاليف الصيانة بنسبة تصل إلى 50%.',
      en: 'Extending software lifespan while drastically slashing maintenance overhead.',
    },
    iconName: 'RefreshCw',
    category: 'modernization',
    categoryBadge: { ar: 'تحديث وترقية', en: 'Modernization' },
  },
  {
    id: 'deployment-infrastructure',
    slug: 'deployment-infrastructure',
    title: { ar: 'النشر والبنية التحتية السحابية', en: 'Deployment & Cloud Infrastructure' },
    subtitle: {
      ar: 'إعداد الخوادم السحابية، تهيئة النطاقات، شهادات الأمان، وقواعد البيانات المجهزة للإنتاج',
      en: 'Production server setup, domain routing, SSL, backups, and security hardening',
    },
    description: {
      ar: 'خدمة أساسية مرئية نأخذ فيها برمجياتك من مرحلة الكود إلى التشغيل الفعلي المستقر، مع تهيئة الخوادم، بيئات الإنتاج، جدران الحماية، والنسخ الاحتياطي التلقائي.',
      en: 'A first-class, customer-facing service taking your software from repository to rock-solid production deployment, domain routing, SSL, and hardened cloud configurations.',
    },
    scopeTitle: { ar: 'ما نقدمه في النشر والبنية التحتية:', en: 'Infrastructure Scope:' },
    capabilities: {
      ar: [
        'إعداد الخوادم السحابية (VPS / Cloud Instances / Containers)',
        'نشر التطبيقات وإعداد بيئات الإنتاج والتطوير (Staging & Production)',
        'تهيئة أسماء النطاقات والـ DNS وشهادات الأمان (Domain & SSL Setup)',
        'تهيئة وحماية قواعد البيانات السحابية (PostgreSQL / MySQL / Redis)',
        'إعداد خدمات التخزين السحابي والملفات (S3 / Cloud Storage)',
        'تهيئة خوادم البريد الإلكتروني الرسمي والإشعارات (SMTP / Mail Setup)',
        'جدولة النسخ الاحتياطي التلقائي المشفر (Automated Backups)',
        'مراقبة الخوادم وحمايتها من الاختراق والضغط (Monitoring & Hardening)',
      ],
      en: [
        'Cloud Server Provisioning (VPS / Dedicated / Containers)',
        'Staging & High-Availability Production Environments',
        'DNS Configuration, Custom Domains & SSL Encryption',
        'Secure Production Database Provisioning (Postgres / Redis)',
        'Encrypted Object Storage & Media Pipelines (S3-Compatible)',
        'Transactional SMTP & Business Mail Setup',
        'Automated Off-site Daily Encrypted Backups',
        'Security Hardening, Firewalls & 24/7 Uptime Monitoring',
      ],
    },
    deliverables: {
      ar: ['بيئة إنتاج مباشرة ومحصنة', 'شهادات SSL ونطاقات مفعلة', 'لوحة مراقبة للأداء', 'خطة تعافي ونسخ احتياطي'],
      en: ['Live Production Deployment', 'Configured SSL & Domains', 'Uptime & Resource Dashboard', 'Disaster Recovery Plan'],
    },
    businessValue: {
      ar: 'راحة بال تامة وإطلاق خالي من المشاكل التقنية وتوقف الخوادم.',
      en: 'Zero deployment headaches and guaranteed production-grade stability.',
    },
    iconName: 'Server',
    category: 'infrastructure',
    categoryBadge: { ar: 'بنية تحتية ونشر', en: 'Core Infrastructure' },
  },
  {
    id: 'managed-hosting',
    slug: 'managed-hosting',
    title: { ar: 'الاستضافة المدارة لبرمجيات الأعمال', en: 'Managed Business Software Hosting' },
    subtitle: {
      ar: 'استضافة مخصصة ومراقبة للأنظمة المؤسسية تضمن استقرارك التشغيلي وسرعة استجابة فائقة',
      en: 'Dedicated high-performance cloud hosting engineered for business-critical software',
    },
    description: {
      ar: 'ليست استضافة مشتركة رخيصة للمواقع البسيطة، بل بيئة سحابية مدارة مخصصة لبرمجيات الأعمال الحساسة، مدعومة بمراقبة دورية وتحديثات أمنية ونسخ احتياطي دائم.',
      en: 'Not cheap generic shared web hosting. We provide enterprise-grade managed cloud environments engineered specifically for transactional business applications and SaaS products.',
    },
    scopeTitle: { ar: 'مميزات الاستضافة المدارة:', en: 'Hosting Features:' },
    capabilities: {
      ar: [
        'خوادم سحابية مخصصة وعزل كامل للموارد (Dedicated Resources)',
        'مراقبة حية لجاهزية النظام على مدار الساعة (Uptime & Health Monitoring)',
        'نسخ احتياطي يومي مشفر خارج الموقع (Daily Offsite Backups)',
        'تحديثات أمنية دورية لنظام التشغيل وحزم البرامج (Security Patching)',
        'دعم فني هندسي مباشر لحل المشكلات التقنية (Direct Technical Support)',
        'تهيئة آمنة ممتثلة لسياسات الخصوصية والبيانات (Secure Configuration)',
      ],
      en: [
        'Dedicated Cloud Resources with Zero Cross-Contamination',
        'Proactive Uptime & Application Health Telemetry',
        'Automated Daily Off-Site Encrypted Backups',
        'Routine OS & Runtime Security Vulnerability Patching',
        'Direct Engineering Support for Critical Operational Incidents',
        'GCC & Regional Data Sovereignty Compliance',
      ],
    },
    deliverables: {
      ar: ['اتفاقية مستوى الخدمة (SLA)', 'تقارير دورية عن استقرار الخادم', 'نسخ احتياطية قابلة للاستعادة الفورية', 'دعم تقني مستمر'],
      en: ['Uptime SLA Commitment', 'Monthly Infrastructure Health Reports', 'One-Click Backup Restores', 'Dedicated Engineering Support'],
    },
    businessValue: {
      ar: 'برمجياتك تعمل بكفاءة مستمرة دون الحاجة لتوظيف مهندس بنية تحتية مفرغ.',
      en: 'Enterprise-grade cloud operations without the high cost of a dedicated DevOps hire.',
    },
    iconName: 'CloudCheck',
    category: 'infrastructure',
    categoryBadge: { ar: 'استضافة مدارة', en: 'Managed Hosting' },
  },
  {
    id: 'maintenance-support',
    slug: 'maintenance-support',
    title: { ar: 'الصيانة والدعم الفني المستمر', en: 'Maintenance & Ongoing Support' },
    subtitle: {
      ar: 'معالجة الأخطاء، التحديثات الأمنية، مراقبة الاستقرار، وإضافة التحسينات الدورية',
      en: 'Proactive bug fixes, security patches, dependency upgrades, and iterative enhancements',
    },
    description: {
      ar: 'البرمجيات كائن حي يحتاج لرعاية دائمة. نقدم عقود صيانة ودعم فني مرنة تضمن بقاء نظامك سريعاً، آمناً، ومتوافقاً مع أحدث معايير التكنولوجيا.',
      en: 'Software is a living operational asset. Our structured maintenance contracts ensure your platform remains lightning-fast, bug-free, and ahead of security vulnerabilities.',
    },
    scopeTitle: { ar: 'ما تتضمنه خطة الصيانة:', en: 'Maintenance Coverage:' },
    capabilities: {
      ar: [
        'إصلاح الأخطاء البرمجية ومعالجة الاستثناءات (Bug Fixes & Patching)',
        'تطبيق التحديثات الأمنية وسد الثغرات (Security Updates)',
        'تحديث الحزم والمكتبات البرمجية دورياً (Dependency Maintenance)',
        'مراقبة الأداء وتحسين سرعة استجابة الصفحات (Performance Tuning)',
        'التحقق الدوري من سلامة النسخ الاحتياطية وقواعد البيانات (Integrity Checks)',
        'إضافة ميزات وتعديلات تشغيلية صغيرة مستمرة (Minor Continuous Enhancements)',
      ],
      en: [
        'Priority Bug Resolution & Crash Diagnostics',
        'Immediate Critical Security Patches',
        'Regular Library & Runtime Dependency Updates',
        'Database Query & Frontend Performance Tuning',
        'Disaster Recovery Testing & Backup Validation',
        'Ongoing Minor Feature Tweaks & UI Improvements',
      ],
    },
    deliverables: {
      ar: ['قناة تواصل وتذاكر دعم سريعة', 'سجل أسبوعي بالتحسينات المنجزة', 'ضمان استجابة للحالات الطارئة', 'مراجعة أداء ربع سنوية'],
      en: ['Direct Ticketing & Communication Channel', 'Changelog of Shipped Patches & Fixes', 'SLA Response Guarantee for Urgent Issues', 'Quarterly System Health Review'],
    },
    businessValue: {
      ar: 'حماية استثمارك البرمجي من التقادم والأعطال المفاجئة التي تعطل أعمالك.',
      en: 'Preventing operational downtime and keeping your software continually modern.',
    },
    iconName: 'ShieldAlert',
    category: 'operations',
    categoryBadge: { ar: 'دعم وصيانة', en: 'Continuous SLA' },
  },
  {
    id: 'automation-integrations',
    slug: 'automation-integrations',
    title: { ar: 'الأتمتة والربط والتكامل (APIs)', en: 'Automation & Integrations' },
    subtitle: {
      ar: 'ربط بوابات الدفع، مسارات الواتساب، شركات الشحن، وأتمتة مسارات العمل بين الأنظمة',
      en: 'Custom API development, payment gateway integration, and WhatsApp automation',
    },
    description: {
      ar: 'نوحّد أنظمتك المعزولة ونلغي الإدخال اليدوي المكرر. نربط برمجياتك ببوابات الدفع الإلكتروني، خدمات الرسائل والواتساب، أنظمة المحاسبة، ومنصات الشحن.',
      en: 'Eliminate manual data entry and fragmented tools. We build secure bridges connecting your software with payment processors, WhatsApp flows, ERPs, and delivery networks.',
    },
    scopeTitle: { ar: 'قدرات الربط والأتمتة:', en: 'Integration Capabilities:' },
    capabilities: {
      ar: [
        'ربط بوابات الدفع الإلكتروني والبطاقات البنكية (Payment Gateways)',
        'أتمتة مسارات وتنبيهات الواتساب الرسمية (WhatsApp Business Workflows)',
        'الربط مع شركات التوصيل والشحن وخرائط التتبع (Logistics & GPS APIs)',
        'تكامل البيانات مع أنظمة المحاسبة وERP (Accounting & ERP Sync)',
        'أتمتة دورة الموافقات والمهام الداخلية (Automated Business Workflows)',
        'بناء وتوثيق واجهات برمجية API خاصة بشركتك (Custom REST & Webhooks)',
      ],
      en: [
        'Payment Gateway Integration (Regional & International)',
        'Official WhatsApp Business Automation & Transactional Alerts',
        'Logistics, Delivery Dispatch & GPS Tracking Integration',
        'ERP & Accounting System Synchronization',
        'Custom Workflow Automation & Multi-Step Trigger Logic',
        'Proprietary REST & Webhook APIs with Full Swagger Docs',
      ],
    },
    deliverables: {
      ar: ['ربط متكامل ومختبر أمنياً', 'مسارات إشعار لحظية', 'لوحة مراقبة العمليات المؤتمتة', 'توثيق تقني للواجهات'],
      en: ['Production-Tested Integration Pipelines', 'Real-time Event Notifications', 'Transaction Audit Dashboard', 'Complete API Specifications'],
    },
    businessValue: {
      ar: 'توفير مئات الساعات البشرية شهرياً والقضاء على أخطاء النقل اليدوي.',
      en: 'Saving hundreds of manual hours every month while eliminating data-entry errors.',
    },
    iconName: 'Workflow',
    category: 'operations',
    categoryBadge: { ar: 'أتمتة وتكامل', en: 'Workflow Automation' },
  },
  {
    id: 'ai-solutions',
    slug: 'ai-solutions',
    title: { ar: 'حلول الذكاء الاصطناعي التطبيقي', en: 'Practical AI & Intelligence' },
    subtitle: {
      ar: 'دمج نماذج الذكاء الاصطناعي لاستخراج البيانات من المستندات وأتمتة خدمة العملاء',
      en: 'Applied AI integration for business automation, document parsing, and RAG',
    },
    description: {
      ar: 'نقدم الذكاء الاصطناعي كقدرة هندسية عملية لحل مشاكل تجارية حقيقية، بعيداً عن البهرجة التسويقية: استخراج البيانات من العقود والفواتير، المساعدات الذكية المدربة على بيانات شركتك، وتصنيف المهام تلقائياً.',
      en: 'We implement AI as a disciplined engineering capability to solve concrete operational problems: parsing invoices, domain-specific RAG assistants trained on company docs, and smart ticket routing.',
    },
    scopeTitle: { ar: 'الحلول العملية التي نبنيها:', en: 'Applied AI Scope:' },
    capabilities: {
      ar: [
        'مساعدات ذكية مدربة على مستندات وسياسات شركتك (Custom RAG Systems)',
        'استخراج البيانات التلقائي من الفواتير والعقود (Document Intelligence & OCR)',
        'تصنيف وفرز المحادثات والتذاكر التشغيلية آلياً (Smart Ticket Routing)',
        'تحليل انطباعات وتقييمات العملاء والموظفين (Sentiment & Pulse Analytics)',
        'محركات البحث الذكي في قواعد البيانات الضخمة (Semantic Vector Search)',
        'حماية سرية البيانات وعزل النماذج داخل بيئتك السحابية',
      ],
      en: [
        'Enterprise RAG Assistants Trained on Proprietary Internal Docs',
        'Automated Invoice, Receipt & Contract Document Parsing',
        'Intelligent Customer Request & Operational Ticket Classification',
        'Employee Feedback & Customer Sentiment Analytics',
        'Semantic Vector Search Across Massive Knowledge Bases',
        'Private & Secure Model Inference with Zero Data Leakage',
      ],
    },
    deliverables: {
      ar: ['نموذج ذكاء اصطناعي مدمج في نظامك', 'واجهة استخدام بسيطة للموظفين', 'ضمان كامل لخصوصية البيانات', 'توثيق وتدريب للفريق'],
      en: ['Embedded Production AI Pipeline', 'Intuitive Staff UI Interface', 'Strict Data Privacy Architecture', 'Team Training & Runbook'],
    },
    businessValue: {
      ar: 'تسريع معالجة المعاملات بنسبة تصل إلى 80% مع دقة فائقة.',
      en: 'Accelerating routine document and query processing by up to 80%.',
    },
    iconName: 'Sparkles',
    category: 'ai',
    categoryBadge: { ar: 'ذكاء اصطناعي عملي', en: 'Practical AI' },
  },
];

/**
 * 8 Ready-Made Productized Business Software Solutions (Turnkey Foundations)
 */
export const READY_SOLUTIONS: ReadySolution[] = [
  {
    id: 'restaurant-solution',
    slug: 'restaurant-system',
    name: { ar: 'نظام تشغيل وإدارة المطاعم والمقاهي', en: 'Restaurant & Cafe Operating System' },
    tagline: {
      ar: 'قائمة رقمية تفاعلية + شاشات مطبخ KDS + نقاط بيع ومخزون مباشر',
      en: 'Digital QR menu + Kitchen Display (KDS) + POS & live ingredient tracking',
    },
    category: { ar: 'حلول المطاعم والضيافة', en: 'Hospitality Tech' },
    targetAudience: {
      ar: 'المطاعم، المقاهي المختصة، المطابخ السحابية، وسلاسل الوجبات السريعة',
      en: 'Restaurants, specialty cafes, cloud kitchens, and multi-branch fast-food chains',
    },
    problem: {
      ar: 'الاعتماد على النماذج الورقية والواتساب، بطء وصول الطلبات للمطبخ في ساعات الذروة، وصعوبة تتبع هدر المخزون بين الفروع.',
      en: 'Manual order handling, WhatsApp chaos, peak-hour kitchen delays, and untracked ingredient waste across branches.',
    },
    solutionSummary: {
      ar: 'نظام متكامل يربط طلبات الطاولات والسفري بشاشات المطبخ، مع ربط بوابات الدفع وطباعة الفواتير وتحديث المخزون لحظياً.',
      en: 'Complete operational hub routing customer orders directly to kitchen displays with integrated POS, payments, and live stock sync.',
    },
    deliveryDays: { ar: '5 إلى 14 يوماً', en: '5 to 14 Days' },
    deliveryTimelineBadge: { ar: 'جاهز للإطلاق خلال 5-14 يوماً', en: 'Ready in 5–14 Days' },
    features: {
      ar: [
        'قائمة طعام تفاعلية بالكيو آر كود (QR Menu) مع خيارات الإضافات والتعديل',
        'شاشة المطبخ الذكية (KDS) لتنظيم وتحضير الطلبات حسب وقت الورود',
        'نقطة بيع سحابية (Cloud POS) تعمل على الأجهزة اللوحية وأجهزة الكمبيوتر',
        'تتبع مباشر لمخزون المكونات وهدر المواد مع تنبيهات انخفاض الكمية',
        'تقارير مبيعات تفصيلية وأداء الأصناف الأكثر طلباً وساعات الذروة',
        'دعم الفروع المتعددة بنظام صلاحيات متقدم للكاشير والمدراء',
      ],
      en: [
        'Interactive QR Digital Menu with Add-ons & Customization',
        'Real-Time Kitchen Display System (KDS) with Order Routing',
        'Multi-Platform Cloud POS for Tablets and Desktop Terminals',
        'Ingredient-Level Inventory Tracking & Low Stock Notifications',
        'Comprehensive Sales Analytics, Peak Hour & Item Reports',
        'Multi-Branch Architecture with Role-Based Staff Permissions',
      ],
    },
    businessImpact: {
      ar: 'تسريع دورة تحضير الطلبات بنسبة 50% وخفض الهدر التشغيلي للمواد.',
      en: '50% faster order preparation cycle and drastic reduction in kitchen food waste.',
    },
    packages: [
      {
        id: 'starter',
        name: { ar: 'الباقة الأساسية', en: 'Starter' },
        tagline: { ar: 'للمقاهي والمطاعم المستقلة (فرع واحد)', en: 'For single-branch cafes & bistros' },
        priceBadge: { ar: 'تسعير ميسر يبدأ من باقة الإطلاق', en: 'Starting from Launch Tier' },
        features: {
          ar: ['قائمة QR تفاعلية', 'شاشة مطبخ KDS واحدة', 'نقطة بيع سحابية', 'استضافة سحابية مدارة', 'تهيئة النطاق والهوية'],
          en: ['QR Digital Menu', 'Single KDS Display', 'Cloud POS Module', 'Managed Cloud Hosting', 'Custom Branding Setup'],
        },
        idealFor: { ar: 'المشاريع الناشئة والفرع الأول', en: 'New openings & single locations' },
      },
      {
        id: 'business',
        name: { ar: 'باقة الأعمال', en: 'Business' },
        tagline: { ar: 'للمطاعم المزدحمة وفروع متعددة', en: 'For high-volume & multi-branch restaurants' },
        priceBadge: { ar: 'الأكثر طلباً للنمو', en: 'Most Popular for Growth' },
        isPopular: true,
        features: {
          ar: [
            'كافة ميزات الباقة الأساسية',
            'دعم حتى 3 فروع',
            'ربط بوابات الدفع الإلكتروني',
            'تتبع مخزون المكونات والهدر',
            'تقارير مبيعات متقدمة وتصدير مالي',
            'دعم فني وصيانة مستمرة',
          ],
          en: [
            'All Starter Features Included',
            'Up to 3 Branches Supported',
            'Payment Gateway Integration',
            'Ingredient Inventory & Waste Logs',
            'Advanced Sales & Financial Reports',
            'Continuous SLA Support & Backups',
          ],
        },
        idealFor: { ar: 'المطاعم المتوسعة وسلاسل المقاهي', en: 'Growing restaurants and cafe brands' },
      },
      {
        id: 'professional',
        name: { ar: 'باقة المؤسسات', en: 'Enterprise' },
        tagline: { ar: 'للسلاسل الكبرى والمطابخ السحابية', en: 'For large franchises & cloud kitchen hubs' },
        priceBadge: { ar: 'عرض مخصص حسب المتطلبات', en: 'Custom Architecture Quote' },
        features: {
          ar: [
            'فروع غير محدودة',
            'ربط مخصص مع أنظمة ERP والمحاسبة',
            'بوابة ولاء وتطبيق عملاء خاص',
            'خوادم سحابية مخصصة وعزل تام',
            'مهندس صيانة مخصص ودعم عالي الأولوية',
          ],
          en: [
            'Unlimited Branch Support',
            'Custom ERP & Accounting Sync',
            'Custom Loyalty Program & Client App',
            'Dedicated Cloud Infrastructure',
            'Dedicated Engineering Lead & Top-Tier SLA',
          ],
        },
        idealFor: { ar: 'الشركات الكبرى وسلاسل الفرانشايز', en: 'Franchise operators and enterprise groups' },
      },
    ],
    iconName: 'UtensilsCrossed',
    badge: { ar: 'جاهز للنشر', en: 'Turnkey Solution' },
    demoAvailable: true,
  },
  {
    id: 'booking-solution',
    slug: 'booking-system',
    name: { ar: 'نظام حجز المواعيد والجدولة الذكية', en: 'Appointment Booking & Scheduling Hub' },
    tagline: {
      ar: 'حجز فوري للعملاء + دفع العربون + تنبيهات واتساب التلقائية',
      en: 'Real-time calendar booking + deposit lock + automated WhatsApp alerts',
    },
    category: { ar: 'حلول الخدمات والمواعيد', en: 'Service Automation' },
    targetAudience: {
      ar: 'العيادات الطبية، صالونات ومراكز التجميل، الاستشارات المهنية، واستوديوهات التصوير والفعاليات',
      en: 'Medical clinics, beauty salons, professional consulting, photography studios, and event venues',
    },
    problem: {
      ar: 'نسبة عالية لتخلف العملاء عن المواعيد (No-Show)، تداخل الجداول، واستهلاك ساعات طويلة في التنسيق والمراسلة اليدوية عبر الواتساب.',
      en: 'High no-show rates, double bookings, and dozens of lost hours manually chatting on WhatsApp to coordinate time slots.',
    },
    solutionSummary: {
      ar: 'بوابة حجز رقمية تسمح للعميل باختيار الخدمة والموظف والوقت المتاح بدقة، مع دفع عربون إلكتروني وتأكيد الحجز آلياً عبر الواتساب.',
      en: 'Self-service scheduling portal allowing clients to select service, provider, and time slot, with deposit payments and automated reminders.',
    },
    deliveryDays: { ar: '5 إلى 10 أيام', en: '5 to 10 Days' },
    deliveryTimelineBadge: { ar: 'جاهز للإطلاق خلال 5-10 أيام', en: 'Ready in 5–10 Days' },
    features: {
      ar: [
        'تقويم حجز تفاعلي يمنع تضارب المواعيد نهائياً',
        'ربط دفع العربون أو القيمة كاملة لتأكيد جدية الحجز',
        'إرسال رسائل التذكير وتأكيد الحضور عبر الواتساب آلياً',
        'لوحة تحكم للموظفين لإدارة أوقات العمل والإجازات والخدمات',
        'سجل شامل لبيانات العملاء وتاريخ الزيارات السابقة',
        'دعم الحجوزات الفردية والجماعية وحجز المرافق والغرف',
      ],
      en: [
        'Live Conflict-Free Calendar Slot Allocation',
        'Online Deposit Collection to Eliminate No-Shows',
        'Automated WhatsApp Confirmation & Reminder Broadcasts',
        'Staff Availability, Service Duration & Shift Management',
        'Unified Client History, Notes & Previous Visits Log',
        'Flexible Booking for Individual Staff, Rooms, or Venues',
      ],
    },
    businessImpact: {
      ar: 'تقليل نسبة التخلف عن المواعيد بنسبة 80% وتوفير وقت موظف الاستقبال.',
      en: '80% reduction in appointment no-shows and complete elimination of manual scheduling calls.',
    },
    iconName: 'CalendarCheck',
    badge: { ar: 'أتمتة المواعيد', en: 'Automated Scheduling' },
    demoAvailable: true,
  },
  {
    id: 'crm-solution',
    slug: 'crm-system',
    name: { ar: 'نظام إدارة علاقات العملاء والمبيعات (CRM)', en: 'B2B CRM & Sales Pipeline Hub' },
    tagline: {
      ar: 'تتبع الفرص البيعية + إدارة جهات الاتصال + عروض الأسعار والواتساب',
      en: 'Lead pipeline management + customer timelines + quotes & WhatsApp sync',
    },
    category: { ar: 'حلول المبيعات والشركات', en: 'Sales & CRM' },
    targetAudience: {
      ar: 'الشركات التجارية، مكاتب الخدمات، الموزعين، والشركات التي تعتمد على مسارات المبيعات',
      en: 'B2B service firms, distributors, trading companies, and outbound sales teams',
    },
    problem: {
      ar: 'ضياع الفرص البيعية، تشتت المحادثات بين هواتف المناديب، وغياب الرؤية الإدارية عن مراحل إغلاق الصفقات.',
      en: 'Lost leads, scattered client conversations across personal phones, and zero executive visibility into deals.',
    },
    solutionSummary: {
      ar: 'لوحة مركزية تدير رحلة العميل من أول استفسار وحتى إصدار الفاتورة، مع متابعة أداء المناديب وتنبيهات المتابعة التلقائية.',
      en: 'Centralized sales pipeline tracking leads from discovery to quotation, with automated reminders and team activity monitoring.',
    },
    deliveryDays: { ar: '7 إلى 14 يوماً', en: '7 to 14 Days' },
    deliveryTimelineBadge: { ar: 'جاهز للإطلاق خلال 7-14 يوماً', en: 'Ready in 7–14 Days' },
    features: {
      ar: [
        'لوحة مسارات المبيعات المرئية (Visual Sales Pipeline Kanban)',
        'ملف موحد لكل عميل يتضمن المحادثات والعروض والفواتير',
        'إنشاء عروض الأسعار بصيغة PDF وإرسالها مباشرة عبر الواتساب',
        'توزيع العملاء والفرص تلقائياً على فريق المبيعات',
        'تقارير أداء المناديب ومعدلات التحويل والإيرادات المتوقعة',
        'نظام تنبيهات للمتابعة في المواعيد المحددة لمنع ضياع الصفقات',
      ],
      en: [
        'Visual Deal Pipeline with Drag-and-Drop Stages',
        'Unified Customer Record with Notes, Quotes & Attachments',
        'One-Click PDF Quotation Generator & Direct WhatsApp Dispatch',
        'Automated Lead Assignment & Round-Robin Routing',
        'Sales Rep Performance, Deal Velocity & Forecast Analytics',
        'Follow-Up Reminders Ensuring Zero Deals Fall Through Cracks',
      ],
    },
    businessImpact: {
      ar: 'زيادة معدل إغلاق الصفقات بنسبة 35% وتنظيم فريق المبيعات بالكامل.',
      en: '35% higher deal closing rate and total team accountability.',
    },
    iconName: 'Users',
    badge: { ar: 'نمو المبيعات', en: 'Sales Accelerator' },
    demoAvailable: true,
  },
  {
    id: 'inventory-solution',
    slug: 'inventory-system',
    name: { ar: 'نظام إدارة المخزون والمستودعات متعددة الفروع', en: 'Multi-Branch Inventory & Stock Engine' },
    tagline: {
      ar: 'تتبع كميات المخزون + قراءة الباركود + أذونات النقل والجرد الدوري',
      en: 'Real-time stock tracking + barcode support + inter-branch transfers & audit logs',
    },
    category: { ar: 'حلول التجارة والمخازن', en: 'Supply Chain & Stock' },
    targetAudience: {
      ar: 'محلات التجزئة، تجار الجملة، الموزعين، وسلاسل المعارض والمستودعات',
      en: 'Retail stores, wholesalers, distributors, and multi-warehouse operators',
    },
    problem: {
      ar: 'فروقات الجرد المستمرة، عدم معرفة الكميات الفعلية بالفروع، وعمليات نقل المواد غير الموثقة في الإكسل.',
      en: 'Stock discrepancies, untracked branch transfers, manual spreadsheet stockouts, and inventory shrinkage.',
    },
    solutionSummary: {
      ar: 'محرك مخزون سحابي لحظي يسجل حركات الإدخال والإخراج والتحويل بين الفروع بدقة الباركود مع تنبيهات عند اقتراب النفاد.',
      en: 'Real-time multi-location inventory engine recording inbound/outbound items, transfers, and barcode scanning with automated reorder alerts.',
    },
    deliveryDays: { ar: '7 إلى 14 يوماً', en: '7 to 14 Days' },
    deliveryTimelineBadge: { ar: 'جاهز للإطلاق خلال 7-14 يوماً', en: 'Ready in 7–14 Days' },
    features: {
      ar: [
        'مزامنة لحظية للكميات بين جميع الفروع والمستودعات',
        'دعم قراءة وطباعة الباركود والـ SKU لسرعة الاستلام والصرف',
        'أذونات نقل رقمية تتطلب موافقة الفرع المستلم لضبط العهد',
        'تنبيهات تلقائية عند وصول الأصناف للحد الأدنى من المخزون',
        'حساب تكلفة المخزون (FIFO / Weighted Average) وتقارير الأرباح',
        'نظام جرد دوري سريع يقارن الفعلي بالمسجل ويكتشف الفروقات',
      ],
      en: [
        'Real-Time Multi-Warehouse & Branch Stock Synchronization',
        'Barcode / SKU Label Generation and Fast Scanner Support',
        'Digital Inter-Branch Transfer Requests & Receiving Verifications',
        'Automated Reorder Level & Safety Stock Threshold Warnings',
        'Valuation Engines (FIFO / Average Cost) & Profit Margins',
        'Audit & Periodic Stocktaking Module with Discrepancy Heatmaps',
      ],
    },
    businessImpact: {
      ar: 'القضاء على عجز المخزون بنسبة 95% وضبط أصول الشركة بدقة.',
      en: '95% reduction in inventory variances and complete operational transparency.',
    },
    iconName: 'PackageCheck',
    badge: { ar: 'ضبط العمليات', en: 'Stock Precision' },
    demoAvailable: true,
  },
  {
    id: 'clinic-solution',
    slug: 'clinic-system',
    name: { ar: 'نظام إدارة العيادات والمراكز الطبية', en: 'Medical Clinic & Patient Management System' },
    tagline: {
      ar: 'ملفات المرضى الإلكترونية + جدول الأطباء + الفواتير والتنبيهات',
      en: 'Digital EHR patient records + doctor schedules + billing & care reminders',
    },
    category: { ar: 'حلول الرعاية الصحية', en: 'Healthcare Tech' },
    targetAudience: {
      ar: 'العيادات التخصصية، المجمعات الطبية، عيادات الأسنان، ومراكز العلاج الطبيعي',
      en: 'Specialized polyclinics, dental centers, physiotherapy clinics, and medical practices',
    },
    problem: {
      ar: 'تكدس الملفات الورقية، ضياع التاريخ المرضي، وتأخير مواعيد الانتظار في صالة الاستقبال.',
      en: 'Bulky paper files, scattered medical histories, long patient reception queues, and billing delays.',
    },
    solutionSummary: {
      ar: 'نظام سحابي آمن ومشفر لإدارة ملف المريض الرقمي، التشخيصات، الروشتات، وجدول مواعيد الأطباء مع فوترة سريعة.',
      en: 'Encrypted cloud clinic software managing electronic health records (EHR), prescriptions, doctor schedules, and instant billing.',
    },
    deliveryDays: { ar: '7 إلى 14 يوماً', en: '7 to 14 Days' },
    deliveryTimelineBadge: { ar: 'جاهز للإطلاق خلال 7-14 يوماً', en: 'Ready in 7–14 Days' },
    features: {
      ar: [
        'سجل طبي إلكتروني موحد للمريض يشمل الفحوصات والتشخيص والوصفات',
        'جدول مواعيد الأطباء الذكي مع أوقات الكشف والاستشارات',
        'إرسال مواعيد المراجعة وتنبيهات الفحوصات للواتساب تلقائياً',
        'نظام الفواتير الطبية وسندات القبض وحسابات الأطباء والعمولات',
        'أرشفة نتائج التحاليل والتقارير الطبية بصيغة آمنة',
        'صلاحيات محكمة تضمن سرية بيانات المرضى وفق المعايير الطبية',
      ],
      en: [
        'Unified Electronic Patient Health Record (EHR) with History',
        'Doctor Shift, Consultation & Appointment Scheduler',
        'Automated WhatsApp Follow-Up & Appointment Confirmations',
        'Medical Invoicing, Insurance Claims & Doctor Commission Tracking',
        'Secure Lab Result & Medical Imaging Attachment Vault',
        'Role-Based Medical Access Ensuring Strict Patient Confidentiality',
      ],
    },
    businessImpact: {
      ar: 'تقليل وقت خدمة المريض بنسبة 60% وأرشفة طبية محكمة 100%.',
      en: '60% faster patient intake and 100% compliant digital medical records.',
    },
    iconName: 'HeartPulse',
    badge: { ar: 'رعاية صحية', en: 'Clinical Grade' },
    demoAvailable: true,
  },
  {
    id: 'school-solution',
    slug: 'school-system',
    name: { ar: 'نظام إدارة المعاهد والمدارس والمراكز التعليمية', en: 'School & Academy Management Hub' },
    tagline: {
      ar: 'بوابة الطلاب + تسجيل الدورات + تتبع الحضور والرسوم الدراسية',
      en: 'Student portal + course enrollment + attendance & fee tracking',
    },
    category: { ar: 'حلول التعليم والتدريب', en: 'EdTech Solutions' },
    targetAudience: {
      ar: 'المعاهد التدريبية، المراكز التعليمية، المدارس الخاصة، وأكاديميات اللغات',
      en: 'Training institutes, language academies, private schools, and educational centers',
    },
    problem: {
      ar: 'تسجيل الطلاب يدوياً، صعوبة تتبع تحصيل الأقساط والرسوم، وعدم وجود وسيلة سريعة لإشعار أولياء الأمور والطلاب.',
      en: 'Manual student paperwork, messy tuition fee tracking on paper, and lack of automated parent communication.',
    },
    solutionSummary: {
      ar: 'منصة متكاملة تدير تسجيل الطلاب، الجداول الدراسية، الحضور والغياب، الأقساط المالية، وإصدار الشهادات والتقارير.',
      en: 'Unified educational hub managing admissions, class schedules, daily attendance, tuition installments, and certificate issuance.',
    },
    deliveryDays: { ar: '7 إلى 14 يوماً', en: '7 to 14 Days' },
    deliveryTimelineBadge: { ar: 'جاهز للإطلاق خلال 7-14 يوماً', en: 'Ready in 7–14 Days' },
    features: {
      ar: [
        'بوابة تسجيل وقبول الطلاب إلكترونياً وتوزيعهم على الفصول والقاعات',
        'جدولة الحصص والدورات وتوزيع الكادر التعليمي والمدرسين',
        'تتبع دفع الأقساط والرسوم الدراسية مع إشعارات السداد التلقائية',
        'تسجيل الحضور والغياب اليومي وإرسال إشعارات فورية لأولياء الأمور',
        'إصدار الشهادات وبطاقات الطلاب وتقارير الدرجات',
        'لوحة تحكم إدارية للإيرادات ونسب النجاح والامتلاء للقاعات',
      ],
      en: [
        'Online Student Admissions & Classroom Allocation Module',
        'Course & Lecture Timetable Management for Instructors',
        'Tuition Installment Tracking & Automated Payment Reminders',
        'Daily Attendance Registry with Instant WhatsApp Notifications',
        'Automated Certificate Generation & Grade Card Issuance',
        'Executive Analytics on Enrollment Numbers, Capacity & Revenue',
      ],
    },
    businessImpact: {
      ar: 'أتمتة العمليات الإدارية بنسبة 70% وزيادة سرعة تحصيل الرسوم.',
      en: '70% reduction in administrative overhead and faster fee collection.',
    },
    iconName: 'GraduationCap',
    badge: { ar: 'إدارة تعليمية', en: 'Education Core' },
    demoAvailable: true,
  },
  {
    id: 'property-solution',
    slug: 'property-system',
    name: { ar: 'نظام إدارة المحافظ والأصول العقارية (Novixa Aqar)', en: 'Real Estate Portfolio & Property Engine' },
    tagline: {
      ar: 'إدارة الوحدات والمجمعات + عقود الإيجار + التحصيل وبوابة الوسطاء',
      en: 'Property unit portfolios + lease contracts + rent collection & broker portal',
    },
    category: { ar: 'حلول العقار والاستثمار', en: 'PropTech Solution' },
    targetAudience: {
      ar: 'شركات التطوير العقاري، مكاتب إدارة الأملاك، الملاك، والمجمعات السكنية والتجارية',
      en: 'Property developers, real estate management offices, and commercial asset managers',
    },
    problem: {
      ar: 'تأخر تحصيل الإيجارات، نسيان مواعيد تجديد العقود، تشتت بيانات المستأجرين، وصعوبة تنظيم عمولات الوسطاء.',
      en: 'Delayed rent collections, missed contract renewals, scattered tenant documents, and unmanaged broker commissions.',
    },
    solutionSummary: {
      ar: 'منصة سحابية متخصصة لإدارة الأصول العقارية، تتبع عقود الإيجار والتحصيل، أرشفة بيانات المستأجرين، وبوابة مخصصة للوسطاء مع تكامل الخرائط.',
      en: 'Enterprise property management platform tracking lease lifecycle, automated rent collection alerts, tenant archives, and broker commission portals.',
    },
    deliveryDays: { ar: '7 إلى 14 يوماً', en: '7 to 14 Days' },
    deliveryTimelineBadge: { ar: 'جاهز للإطلاق خلال 7-14 يوماً', en: 'Ready in 7–14 Days' },
    features: {
      ar: [
        'إدارة الوحدات السكنية والتجارية وعرض الشواغر على الخرائط التفاعلية',
        'تتبع عقود الإيجار، وتواريخ الدفعات، مع تنبيهات التجديد الآلية',
        'بوابة مخصصة للمستأجرين لمتابعة الإيجارات وتقديم طلبات الصيانة',
        'بوابة الوسطاء العقاريين مع تتبع العمولات والصفقات المحققة',
        'أرشفة إلكترونية كاملة للوثائق وعقود الإيجار وسندات القبض',
        'تقارير الإشغال والعائد الاستثماري على العقارات والمجمعات',
      ],
      en: [
        'Commercial & Residential Unit Catalog with Interactive Map Pins',
        'Lease Lifecycle Tracker with Automated Due Date & Renewal Alerts',
        'Tenant Portal for Digital Rent Receipts & Maintenance Requests',
        'Dedicated Broker Portal with Automated Commission Statements',
        'Digital Document & Lease Vault with Signed Contract Archiving',
        'Occupancy Rates, Yield Calculations & Portfolio Financial Reports',
      ],
    },
    businessImpact: {
      ar: 'رفع كفاءة تحصيل الإيجارات بنسبة 40% وإدارة مئات الوحدات دون فوضى.',
      en: '40% boost in on-time rent collections and centralized management of hundreds of units.',
    },
    iconName: 'Building2',
    badge: { ar: 'حل عقاري جاهز', en: 'PropTech Solution' },
    demoAvailable: true,
  },
  {
    id: 'operations-solution',
    slug: 'operations-hub',
    name: { ar: 'منصة إدارة العمليات والمهام المؤسسية (Operations Hub)', en: 'Central Business Operations Hub' },
    tagline: {
      ar: 'توحيد الفروع والمهام + دورة الموافقات + لوحات القيادة التنفيذية',
      en: 'Multi-branch operations + approval workflows + executive decision dashboards',
    },
    category: { ar: 'حلول الإدارة والتشغيل', en: 'Enterprise Operations' },
    targetAudience: {
      ar: 'الشركات متنامية الحجم، المنشآت الخدمية، والمؤسسات التي تحتاج لتوحيد عملياتها المشتتة',
      en: 'Growing companies, service enterprises, and multi-department organizations',
    },
    problem: {
      ar: 'تشتت العمليات بين جداول الإكسل ومجموعات الواتساب، بطء الحصول على موافقات الإدارة، وغياب البيانات اللحظية.',
      en: 'Fragmented operations across spreadsheets and WhatsApp groups, stalled approvals, and stale business metrics.',
    },
    solutionSummary: {
      ar: 'نظام تشغيل داخلي يوحد المهام الميدانية، طلبات الصرف والموافقات، والتقارير التنفيذية في واجهة واحدة آمنة وسريعة.',
      en: 'A unified operational dashboard connecting field tasks, expense approvals, inter-department requests, and executive KPIs.',
    },
    deliveryDays: { ar: '7 إلى 14 يوماً', en: '7 to 14 Days' },
    deliveryTimelineBadge: { ar: 'جاهز للإطلاق خلال 7-14 يوماً', en: 'Ready in 7–14 Days' },
    features: {
      ar: [
        'نظام تذاكر ومهام تشغيلية داخلية مع تتبع زمن الإنجاز (SLA)',
        'دورة موافقات رقمية مرنة (طلبات الصرف، الإجازات، المشتريات)',
        'لوحة تحكم تنفيذية تعرض مؤشرات الأداء الحية للشركة',
        'نظام إشعارات ذكي وتنبيهات فورية على الجوال والبريد',
        'سجل تدقيق أمني مشفر لجميع الإجراءات والتعديلات (Audit Log)',
        'إمكانية الربط مع أي أنظمة فرعية حالية عبر الـ API',
      ],
      en: [
        'Internal Operational Ticket Routing with SLA Resolution Tracking',
        'Custom Multi-Stage Approval Flows (Expenses, Leaves, Procurement)',
        'Executive Real-Time KPI Dashboards & Department Performance',
        'Instant Mobile & Email Notification Dispatch',
        'Encrypted Audit Logs for Strict Operational Accountability',
        'Modular REST API Hooks for Seamless Legacy Software Sync',
      ],
    },
    businessImpact: {
      ar: 'تسريع دورة اتخاذ القرار وتقليل وقت الموافقات اليدوية بنسبة 70%.',
      en: '70% reduction in approval bottlenecks and total operational visibility.',
    },
    iconName: 'ShieldCheck',
    badge: { ar: 'تشغيل مؤسسي', en: 'Operations Engine' },
    demoAvailable: true,
  },
];

/**
 * 4 Dedicated Products with Honest Statuses
 */
export const PRODUCTS: Product[] = [
  {
    id: 'aqar',
    slug: 'aqar',
    name: { ar: 'Novixa Aqar', en: 'Novixa Aqar' },
    tagline: {
      ar: 'منصة إدارة الأصول العقارية، بوابات الوسطاء، وأتمتة عقود الإيجار والتحصيل',
      en: 'Real estate portfolio, broker orchestration & property engine',
    },
    title: {
      ar: 'نظام إدارة العقارات والمشاريع الاستثمارية وبوابات الوسطاء',
      en: 'Modern Real Estate Operations & Broker Platform',
    },
    description: {
      ar: 'منصة سحابية متخصصة لإدارة الأصول العقارية، تتبع عقود الإيجار والتحصيل، أرشفة بيانات المستأجرين، وبوابة مخصصة للوسطاء مع تكامل الخرائط.',
      en: 'Specialized property management engine for real estate portfolios, lease contracts, tenant records, and multi-broker lead routing.',
    },
    status: 'LIVE',
    statusLabel: { ar: 'متاح للطلب والعرض (LIVE)', en: 'Live & Available' },
    category: { ar: 'حلول العقار والاستثمار', en: 'PropTech Engine' },
    targetAudience: {
      ar: 'شركات التطوير العقاري، مكاتب إدارة الأملاك، المجمعات السكنية والتجارية',
      en: 'Real estate developers, property management companies, commercial complexes',
    },
    problemSolved: {
      ar: 'القضاء على تأخر تحصيل الإيجارات ونسيان مواعيد تجديد العقود وضياع سجلات المستأجرين.',
      en: 'Eliminating overdue rent collections, expired contracts, and uncoordinated broker records.',
    },
    businessValue: {
      ar: 'تحسين كفاءة التحصيل وتنظيم مئات الوحدات في شاشة واحدة دون فوضى.',
      en: 'Boosting collection speed by 40% and unifying property management.',
    },
    features: {
      ar: [
        'إدارة الوحدات السكنية والتجارية وتتبع عقود الإيجار والتحصيل',
        'بوابة مخصصة للوسطاء العقاريين مع نظام إدارة العمولات',
        'أرشفة إلكترونية للوثائق وتنبيهات مواعيد تجديد العقود',
        'خرائط تفاعلية للوحدات المتاحة والمحجوزة والمباعة',
        'إصدار سندات القبض وتقارير الدخل والصيانة الدورية',
      ],
      en: [
        'Commercial & residential unit leasing and automated payment tracking',
        'Dedicated broker portal with automated commission calculations',
        'Digital document archive with automated contract renewal alerts',
        'Interactive geographic map for available and reserved units',
        'Automated rent receipts, revenue analytics, and maintenance logs',
      ],
    },
    targetIndustries: {
      ar: ['شركات التطوير العقاري', 'مكاتب إدارة الأملاك والأصول', 'المجمعات السكنية والتجارية'],
      en: ['Real Estate Developers', 'Property Management Firms', 'Commercial & Residential Complexes'],
    },
    metrics: [
      { label: { ar: 'كفاءة تحصيل الإيجارات', en: 'Collection Efficiency' }, value: 'أتمتة دورة التحصيل والتنبيهات' },
      { label: { ar: 'تنظيم المستندات', en: 'Document Archiving' }, value: '100% رقمي ومشفر' },
    ],
    deploymentOptions: {
      ar: ['استضافة سحابية مدارة بالكامل من نوڤيكسا', 'أو نشر على خوادمك السحابية الخاصة'],
      en: ['Fully Managed Novixa Cloud Hosting', 'Or Private On-Premise / Cloud Deployment'],
    },
    customizationOptions: {
      ar: ['تهيئة الهوية والألوان والشعار', 'ربط بوابات الدفع المحلية والخليجية', 'تخصيص نماذج العقود والسندات'],
      en: ['Custom Branding & Local Language', 'Regional Payment Gateway Integrations', 'Custom Contract Templates & Receipts'],
    },
    supportIncluded: {
      ar: ['دعم فني هندسي مستمر', 'نسخ احتياطي يومي مشفر', 'تحديثات أمنية دورية'],
      en: ['Continuous Engineering SLA', 'Automated Daily Backups', 'Routine Security Upgrades'],
    },
    demoUrl: '/contact',
    accentColor: '#0D9488',
    iconName: 'Building2',
  },
  {
    id: 'restaurant',
    slug: 'restaurant',
    name: { ar: 'Novixa Restaurant', en: 'Novixa Restaurant' },
    tagline: {
      ar: 'منصة تشغيل وإدارة المبيعات للمطاعم والمقاهي متعددة الفروع',
      en: 'Multi-branch cloud POS & order orchestration platform',
    },
    title: {
      ar: 'نظام تشغيل المطاعم الحديث: قائمة رقمية، طلبات طاولات، ومزامنة مطبخ',
      en: 'Cloud POS & KDS System for High-Volume Restaurants & Cafes',
    },
    description: {
      ar: 'نظام رقمي شامل يربط شاشات المطبخ، طلبات الكيو آر (QR)، بوابات الدفع السريعة، والمخزون المباشر دون الحاجة لأجهزة معقدة.',
      en: 'An end-to-end restaurant operating system connecting Kitchen Display Systems (KDS), QR table orders, loyalty, and inventory in real time.',
    },
    status: 'LIVE',
    statusLabel: { ar: 'متاح للطلب والعرض (LIVE)', en: 'Live & Available' },
    category: { ar: 'حلول الضيافة والمطاعم', en: 'Hospitality Tech' },
    targetAudience: {
      ar: 'المطاعم الفاخرة، سلاسل الوجبات السريعة، المقاهي المختصة، والمطابخ السحابية',
      en: 'Fine dining, fast food chains, specialty cafes, and cloud kitchens',
    },
    problemSolved: {
      ar: 'تأخر وصول الطلبات للمطبخ في الذروة، ضياع تتبع هدر المكونات، وبطء دورة الدفع.',
      en: 'Kitchen order delays, untracked ingredient waste, and slow checkout lines.',
    },
    businessValue: {
      ar: 'تسريع خدمة الطاولات بنسبة 50% وضبط دقيق للمخزون لمنع هدر الأرباح.',
      en: '50% faster table turnover and precision inventory tracking.',
    },
    features: {
      ar: [
        'قائمة طعام رقمية تفاعلية تفهم اختيارات الزبون وتسمح بالدفع المباشر',
        'شاشة المطبخ KDS المباشرة لتنفيذ الطلبات بحسب وقت الورود والأولوية',
        'ربط نقاط البيع الدفع المباشر والطباعة اللاسلكية للفواتير',
        'تقارير أصناف المبيعات والهدر اليومي وتنبيهات نواقص المكونات',
        'إدارة الفروع المتعددة بنظام سحابي موحد',
      ],
      en: [
        'Dynamic QR digital menu with customization add-ons and instant checkout',
        'Real-time Kitchen Display System (KDS) order routing and prep timers',
        'Integrated cloud POS and wireless receipt printing',
        'Ingredient-level inventory tracking and waste alerts',
        'Multi-branch cloud management from a single master dashboard',
      ],
    },
    targetIndustries: {
      ar: ['المطاعم الفاخرة', 'سلاسل الوجبات السريعة', 'المقاهي المختصة', 'سلاسل المطابخ السحابية'],
      en: ['Fine Dining', 'Fast Food Chains', 'Specialty Coffee', 'Cloud Kitchens'],
    },
    metrics: [
      { label: { ar: 'كفاءة تقديم ومعالجة الطلبات', en: 'Fulfillment Operation Speed' }, value: '2.5x أسرع في الذروة' },
      { label: { ar: 'تقليل هدر المواد', en: 'Waste Reduction' }, value: '-30% هدر مواد' },
    ],
    deploymentOptions: {
      ar: ['استضافة سحابية مخصصة وعزل للمؤسسات', 'دعم العمل دون إنترنت محلياً مع المزامنة'],
      en: ['Managed Cloud Environment', 'Offline-First Local Sync Capability'],
    },
    customizationOptions: {
      ar: ['قوائم مخصصة وتصميم علامة تجارية', 'ربط طابعات المطبخ وشبكات الدفع'],
      en: ['Custom Menu Hierarchy & Branding', 'Kitchen Hardware & Payment Integrations'],
    },
    supportIncluded: {
      ar: ['تدريب كامل لطاقم الكاشير والمطبخ', 'دعم فني مستمر وتحديثات أسبوعية'],
      en: ['Staff & Kitchen Training Onboarding', 'Continuous Technical SLA & Upgrades'],
    },
    demoUrl: '/contact',
    accentColor: '#2563EB',
    iconName: 'UtensilsCrossed',
  },
  {
    id: 'booking',
    slug: 'booking',
    name: { ar: 'Novixa Booking', en: 'Novixa Booking' },
    tagline: {
      ar: 'نظام أتمتة المواعيد والحجوزات الذكي للخدمات والفعاليات',
      en: 'Intelligent appointment scheduling & venue booking engine',
    },
    title: {
      ar: 'منصة الحجوزات وإدارة الجداول والمواعيد ذاتية التشغيل',
      en: 'Automated Booking & Schedule Management System',
    },
    description: {
      ar: 'حل مخصص للعيادات، الصالونات، الفنادق والمراكز التي تعتمد على الجدولة. يتيح للعميل اختيار الوقت والدفع وتلقي التذكير تلقائياً.',
      en: 'Engineered for service businesses, clinics, and venues to handle seamless calendar bookings, deposit payments, and WhatsApp status alerts.',
    },
    status: 'DEMO',
    statusLabel: { ar: 'عرض تجريبي متاح (DEMO)', en: 'Demo Available' },
    category: { ar: 'منصات التشغيل والخدمات', en: 'Service Automation' },
    targetAudience: {
      ar: 'المراكز الطبية والعيادات، مراكز التجميل والاسترخاء، المعاهد، واستوديوهات التصوير',
      en: 'Medical clinics, wellness & beauty centers, academies, and photo studios',
    },
    problemSolved: {
      ar: 'القضاء على تضارب المواعيد والغياب المفاجئ للعملاء والتنسيق اليدوي المرهق.',
      en: 'Ending double-bookings, customer no-shows, and manual scheduling chats.',
    },
    businessValue: {
      ar: 'خفض نسبة الغياب بـ 80% وتأكيد الحجوزات بعربون فوري دون تدخل بشري.',
      en: '80% no-show drop with automated deposits and WhatsApp sync.',
    },
    features: {
      ar: [
        'مزامنة فورية للتقويم مع تحديد أوقات العمل والراحة للموظفين',
        'دفع العربون الإلكتروني لتأكيد جدية الحجز ومنع الإلغاء المفاجئ',
        'إرسال رسائل التذكير وتأكيد الحضور عبر الواتساب آلياً',
        'لوحة تحكم لإدارة مقدمي الخدمة والأقسام والصالات',
        'سجل كامل لبيانات العملاء وحساب العائد على كل موظف',
      ],
      en: [
        'Live calendar synchronization with custom working slots and breaks',
        'Upfront online deposit locks to prevent cancellations',
        'Automated WhatsApp & SMS appointment reminders',
        'Multi-staff & resource availability allocation',
        'Client profile management and revenue tracking per service provider',
      ],
    },
    targetIndustries: {
      ar: ['المراكز الطبية والعيادات', 'الفنادق ومنتجعات الضيافة', 'مراكز التجميل والاسترخاء', 'المعاهد والمراكز التدريبية'],
      en: ['Medical Clinics', 'Hotels & Resorts', 'Beauty & Wellness', 'Training Centers'],
    },
    metrics: [
      { label: { ar: 'تأكيد الحضور والمواعيد', en: 'No-Show Reduction' }, value: 'انخفاض الغياب بـ 85%' },
    ],
    demoUrl: '/contact',
    accentColor: '#0EA5E9',
    iconName: 'Calendar',
  },
  {
    id: 'pulse',
    slug: 'pulse',
    name: { ar: 'Novixa Pulse', en: 'Novixa Pulse' },
    tagline: {
      ar: 'نبض — صوت الموظفين، أصبح جزءاً من القرار الإداري',
      en: 'Pulse — Employee feedback transformed into actionable strategy',
    },
    title: {
      ar: 'منصة قياس نبض المؤسسة واستطلاع آراء الموظفين الذكية',
      en: 'Enterprise Employee Sentiment & Operational Intelligence Platform',
    },
    description: {
      ar: 'منصة سحابية مخصصة للشركات تحول الملاحظات والمقترحات والشكاوى اليومية للموظفين إلى مؤشرات قياس أداء واضحة وتوصيات قابلة للتنفيذ.',
      en: 'A modern B2B SaaS platform that captures real-time employee feedback, anonymizes concerns, and categorizes operational gaps into actionable dashboards.',
    },
    status: 'LIVE',
    statusLabel: { ar: 'متاح للشركات (LIVE)', en: 'Live for B2B' },
    category: { ar: 'منصات SaaS الإدارية', en: 'Enterprise SaaS' },
    targetAudience: {
      ar: 'الشركات والمؤسسات الكبرى، المستشفيات، سلاسل الفروع، والشركات التقنية',
      en: 'Enterprises, hospital chains, retail networks, and technology firms',
    },
    problemSolved: {
      ar: 'غياب الشفافية وصعوبة وصول صوت الموظفين الميدانيين للإدارة العليا وتأخر حل المشاكل.',
      en: 'Delayed feedback loops, executive blindspots, and untracked workplace friction.',
    },
    businessValue: {
      ar: 'اكتشاف التحديات التشغيلية قبل تحولها لأزمات ورفع ولاء وإنتاجية الفرق.',
      en: 'Proactive detection of operational bottlenecks with AI classification.',
    },
    features: {
      ar: [
        'جمع الآراء والحلول بسرية تامة أو بهوية معلنة مع حماية الهوية',
        'تصنيف الملاحظات بالذكاء الاصطناعي (تشغيلي، بيئة عمل، مقترحات نمو)',
        'لوحة قيادة للإدارة مع مؤشر صحة بيئة العمل (Pulse Score)',
        'نظام التصويت والتعليقات التفاعلية ومتابعة حالة معالجة المشكلات',
      ],
      en: [
        'Anonymized & attributed employee feedback channels',
        'AI classification of topics (Operations, Culture, Growth Ideas)',
        'Executive Pulse Score dashboard and sentiment trends',
        'Internal upvoting and priority resolution tracking',
      ],
    },
    targetIndustries: {
      ar: ['الشركات والمؤسسات', 'المستشفيات والمراكز الطبية', 'سلاسل المطاعم والضيافة', 'الشركات التقنية'],
      en: ['Enterprises', 'Healthcare Chains', 'Hospitality Groups', 'Tech Companies'],
    },
    metrics: [
      { label: { ar: 'مشاركة الموظفين', en: 'Employee Engagement' }, value: 'رفع المشاركة 3x' },
      { label: { ar: 'سرعة الاستجابة للمشاكل', en: 'Resolution Speed' }, value: 'حل أسرع بـ 60%' },
    ],
    demoUrl: '/contact',
    accentColor: '#14B8A6',
    iconName: 'Activity',
  },
];

/**
 * Legacy SolutionCategory for backward compatibility
 */
export const SOLUTIONS: SolutionCategory[] = [
  {
    id: 'platforms',
    slug: 'business-platforms',
    title: { ar: 'منصات الأعمال والأنظمة المخصصة', en: 'Business Platforms' },
    subtitle: { ar: 'أنظمة تشغيلية متكاملة تدمج الفروع والمبيعات والمخزون والعُملاء في شاشة واحدة', en: 'Integrated operational engines unifying branches, inventory, and analytics' },
    description: { ar: 'نبني أنظمة إدارة مركزية مخصصة للشركات متنامية الحجم. نوحّد العمليات المشتتة بين الإكسل والواتساب والأنظمة القديمة في منصة واحدة آمنة وسريعة.', en: 'Custom centralized management engines built for growth. Eliminate fragmented spreadsheets and legacy gaps with unified operational hubs.' },
    features: {
      ar: ['إدارة الفروع المتعددة والمستودعات', 'ربط الدفع الإلكتروني والفوترة الذكية', 'تحليلات تشغيلية مباشرة ولوحات قيادة', 'نظام صلاحيات متقدم وإدارة الموظفين'],
      en: ['Multi-branch & inventory sync', 'Smart billing & payment gateway integration', 'Live operational metrics & dashboards', 'Role-based access & staff workflows'],
    },
    businessImpact: { ar: 'تقليل الأخطاء التشغيلية بنسبة 65% وتسريع تنفيذ الطلبات', en: '65% reduction in operational friction & accelerated fulfillment' },
    iconName: 'Building2',
    badge: { ar: 'الأكثر طلباً للشركات', en: 'Enterprise Grade' },
  },
  {
    id: 'saas',
    slug: 'saas',
    title: { ar: 'منتجات SaaS السحابية', en: 'Cloud SaaS Products' },
    subtitle: { ar: 'تطوير منصات سحابية متكاملة متعددة المستأجرين (Multi-Tenant Architecture)', en: 'Multi-tenant cloud architectures designed for recurring revenue scale' },
    description: { ar: 'نساعد الشركات والمبتكرين على تحويل الأفكار البرمجية إلى منتجات SaaS قابلة للتوسع، مع إدارة الاشتراك والتحليلات والعزل الأمني الكامل للبيانات.', en: 'We engineer multi-tenant SaaS products with robust subscription management, secure data isolation, and low-latency global edge deployment.' },
    features: {
      ar: ['بنية سحابية متعددة المشتركين (Multi-Tenant)', 'إدارة الاشتراكات والتجديد التلقائي', 'بوابات دفع واشتراكات دورية', 'واجهات برمجية API للتكامل المباشر'],
      en: ['Multi-tenant isolated data stores', 'Automated recurring billing & tiers', 'API-first design for seamless integrations', 'Global low-latency serverless edge'],
    },
    businessImpact: { ar: 'بناء منتج رقمي بقيمة استثمارية ومقاييس نمو مستدامة', en: 'Scalable asset foundation with predictable recurring revenue' },
    iconName: 'Cloud',
    badge: { ar: 'بنية هندسية مرنة', en: 'Multi-Tenant' },
  },
  {
    id: 'commerce',
    slug: 'digital-commerce',
    title: { ar: 'التجارة الرقمية والمتاجر', en: 'Digital Commerce' },
    subtitle: { ar: 'متاجر ومنصات بيع مخصصة عالية السرعة ومصممة لزيادة المبيعات', en: 'Bespoke, high-converting digital storefronts and B2B ordering systems' },
    description: { ar: 'أكثر من مجرد متجر إلكتروني؛ نبني تجارب شراء فائقة السرعة مع ربط معقد لمخزون الفروع، حلول توصيل، وأنظمة ولاء مخصصة.', en: 'Beyond basic shopping carts—we build lightning-fast commerce engines synced with ERP inventory, logistics providers, and loyalty programs.' },
    features: {
      ar: ['تجربة تسوق فائقة السرعة وشاشات سلسة', 'تكامل مباشر مع شركات الشحن والربط البنكي', 'إدارة سلة المشتريات المعقدة والخصومات', 'نظام إدارة العروض والولاء المتقدم'],
      en: ['Sub-second load speeds & seamless checkout', 'Logistics API & ERP inventory sync', 'Dynamic discounting & promotional engine', 'Custom loyalty & rewards programs'],
    },
    businessImpact: { ar: 'زيادة معدل التحويل وسرعة إتمام الشراء دون انقطاع', en: 'Higher conversion rates and zero checkout downtime' },
    iconName: 'ShoppingCart',
    badge: { ar: 'نمو المبيعات', en: 'High Conversion' },
  },
  {
    id: 'booking',
    slug: 'booking-systems',
    title: { ar: 'أنظمة الحجوزات والجدولة', en: 'Booking & Scheduling' },
    subtitle: { ar: 'منصات حجز المواعيد والجداول الزمنية وإدارة الصالات والخدمات', en: 'Smart reservation, scheduling, and resource allocation platforms' },
    description: { ar: 'حلول حجز ذكية للصالات الرياضية، مراكز الألعاب، العيادات، والفنادق. تجربة حجز سلسة للعملاء مع لوحة تحكم تشغيلية لمنع التضارب.', en: 'Custom booking hubs for gaming arenas, healthcare clinics, hospitality, and venues with real-time slot lock and automated customer reminders.' },
    features: {
      ar: ['حجز فوري مع منع التعارض الزمني', 'إشعارات واتساب وتنبيهات تأكيد المواعيد', 'إدارة الموارد والصالات والموظفين', 'دفع عربون وإدارة الإلغاء الذكية'],
      en: ['Real-time slot locking with zero conflicts', 'Automated WhatsApp & SMS reminders', 'Resource & staff scheduling dashboard', 'Deposit locks & cancellation logic'],
    },
    businessImpact: { ar: 'القضاء على تداخل المواعيد وتقليل نسبة عدم الحضور بـ 80%', en: '80% drop in no-shows and complete schedule clarity' },
    iconName: 'CalendarCheck',
    badge: { ar: 'أتمتة التشغيل', en: 'Automated Flow' },
  },
  {
    id: 'ai',
    slug: 'ai-solutions',
    title: { ar: 'حلول الذكاء الاصطناعي التطبيقي', en: 'Practical AI Solutions' },
    subtitle: { ar: 'دمج نماذج الذكاء الاصطناعي لأتمتة خدمة العملاء واستخراج البيانات', en: 'Applied AI integration for business automation and document intelligence' },
    description: { ar: 'نطوع الذكاء الاصطناعي لخدمة أهداف عملك الحقيقية: المساعدات الذكية، تحليل المستندات تلقائياً، والتنبؤ بالطلب بناءً على البيانات.', en: 'We integrate production-ready AI models directly into your business logic to process documents, answer customer queries, and surface insights.' },
    features: {
      ar: ['مساعدات ذكية مُدربة على بيانات شركتك (RAG)', 'استخراج البيانات الآلي من الفواتير والعقود', 'تحليل انطباعات الموظفين والعملاء تلقائياً', 'تصنيف المراسلات والمهام الذكي'],
      en: ['Custom RAG assistants trained on company docs', 'Automated invoice & document extraction', 'Sentiment analytics for feedback loops', 'Smart ticket classification & routing'],
    },
    businessImpact: { ar: 'توفير مئات الساعات التشغيلية شهرياً في المهام المكررة', en: 'Saves hundreds of manual hours every month' },
    iconName: 'Sparkles',
    badge: { ar: 'قيمة عملية', en: 'Practical AI' },
  },
  {
    id: 'custom',
    slug: 'custom-software',
    title: { ar: 'البرمجيات المخصصة والبنية التحتية', en: 'Custom Software & Infrastructure' },
    subtitle: { ar: 'هندسة نظم معقدة تناسب متطلبات أعمالك الفريدة من الصفر', en: 'Tailor-made software architectures for complex, proprietary domain needs' },
    description: { ar: 'عندما لا تكفي الحلول الجاهزة، نبني أنظمة برمجية مخصصة بالكامل من القواعد الأمنية وحتى الواجهات التفاعلية بما يطابق نموذج عملك الفريد.', en: 'When off-the-shelf software falls short, we design custom systems engineered strictly around your proprietary workflows and security standards.' },
    features: {
      ar: ['تصميم بنية تحتية مخصصة وحماية فائقة', 'واجهات برمجة التطبيقات APIs متطورة', 'تراسل فوري ومزامنة للبيانات', 'توثيق تقني كامل واختبارات مؤتمتة'],
      en: ['Custom architecture built for high concurrency', 'REST & GraphQL API design', 'Real-time WebSocket data pipelines', 'Comprehensive specs & automated tests'],
    },
    businessImpact: { ar: 'امتلاك أصل تقني ملك لشركتك بالكامل ودائم التطور', en: 'Full proprietary ownership of your core technology asset' },
    iconName: 'Cpu',
    badge: { ar: 'أصل تقني مخصص', en: 'Bespoke Asset' },
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'restaurants',
    slug: 'restaurants',
    name: { ar: 'المطاعم والمقاهي', en: 'Restaurants & Cafes' },
    description: { ar: 'حلول تشغيلية ترفع سرعة الخدمة، توحد طلبات التوصيل والدفع، وتمنع هدر المواد المطبخية.', en: 'Operational software designed to accelerate table turnover, streamline KDS routing, and optimize inventory.' },
    challenges: {
      ar: ['بطء وصول الطلبات للمطبخ في أوقات الذروة', 'ضياع تتبع مخزون المواد المباشرة بين الفروع', 'اعتماد كلي على شاشات مجزأة ورسائل الواتساب'],
      en: ['Kitchen bottlenecks during peak rush hours', 'Inaccurate ingredient inventory across multi-branches', 'Reliance on disconnected POS and manual messaging'],
    },
    solutions: {
      ar: ['نظام KDS موحد للمطبخ والصالة', 'منصة طلبات الكيو آر التفاعلية', 'ربط تلقائي بين المبيعات والمخزون المتبقي'],
      en: ['Unified Kitchen Display System (KDS)', 'Self-service QR ordering & instant payment', 'Automated ingredient depletion tracking'],
    },
    productModules: {
      ar: ['Novixa Restaurant POS', 'QR Menu Engine', 'Multi-Branch Inventory Sync'],
      en: ['Novixa Restaurant POS', 'QR Menu Engine', 'Multi-Branch Inventory Sync'],
    },
    iconName: 'Utensils',
    sampleStats: [
      { label: { ar: 'تقليل زحام الطلبات', en: 'Rush Queue Speed' }, value: '2.5x' },
      { label: { ar: 'تقليل دقة الهدر', en: 'Waste Precision' }, value: '-30%' },
    ],
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    name: { ar: 'الرعاية الصحية والعيادات', en: 'Healthcare & Clinics' },
    description: { ar: 'أنظمة إدارة المواعيد، ملفات المرضى الإلكترونية، والتنبيهات المباشرة مع الحفاظ على سرية البيانات.', en: 'Patient record systems, appointment booking, and automated WhatsApp reminders.' },
    challenges: {
      ar: ['نسبة عالية لتخلف المرضى عن المواعيد المحجوزة', 'صعوبة مشاركة السجل الطبي بين الأطباء والفروع', 'المتابعة اليدوية المعقدة للفحوصات والنتائج'],
      en: ['High patient no-show rates without deposit verification', 'Fragmented medical history files across branches', 'Time-consuming manual WhatsApp appointment updates'],
    },
    solutions: {
      ar: ['تأكيد المواعيد بالدفع الجزئي والتنبيه التلقائي', 'سجل طبي رقمي موحد وآمن للغاية', 'بوابة العميل لمراجعة النتائج والوصفات'],
      en: ['Automated deposit verify & SMS/WhatsApp sync', 'Unified encrypted electronic patient record (EHR)', 'Patient portal for lab results and prescription access'],
    },
    productModules: {
      ar: ['Novixa Medical Booking', 'Patient File Manager', 'WhatsApp Health Bot'],
      en: ['Novixa Medical Booking', 'Patient File Manager', 'WhatsApp Health Bot'],
    },
    iconName: 'HeartPulse',
    sampleStats: [
      { label: { ar: 'انخفاض الغياب عن المواعيد', en: 'No-Show Reduction' }, value: '80%' },
      { label: { ar: 'سرعة استرجاع السجل', en: 'File Access Time' }, value: 'Sub-second' },
    ],
  },
  {
    id: 'commerce',
    slug: 'commerce',
    name: { ar: 'التجارة والمتاجر', en: 'Commerce & Retail' },
    description: { ar: 'منصات بيع رقمية مخصصة تجمع بين المتجر الإلكتروني، نقاط البيع في المعارض، وإدارة المستودعات.', en: 'Omnichannel retail engines unifying physical store POS with high-volume online storefronts.' },
    challenges: {
      ar: ['تعارض كميات المتجر الإلكتروني مع المبيعات المباشرة', 'بطء تحميل صفحات المنتجات وتخارج المشترين', 'عدم وجود برنامج ولاء يربط العميل بمعارض الفروع'],
      en: ['Stockouts caused by delayed store vs online inventory sync', 'Slow page rendering leading to high shopping cart bounce', 'Lack of unified loyalty points between retail and web'],
    },
    solutions: {
      ar: ['مزامنة المبيعات بين المتجر والمعرض بالثواني', 'واجهات فائقة السرعة مع تجربة اختيار ممتازة', 'نظام ولاء مدمج برقم هاتف العميل'],
      en: ['Real-time multi-location inventory reconciliation', 'Ultra-fast headless commerce checkout', 'Single customer ID & universal loyalty balance'],
    },
    productModules: {
      ar: ['Novixa Headless Commerce', 'Retail POS Gateway', 'Loyalty Pulse'],
      en: ['Novixa Headless Commerce', 'Retail POS Gateway', 'Loyalty Pulse'],
    },
    iconName: 'Store',
    sampleStats: [
      { label: { ar: 'سرعة التحميل', en: 'Page Speed' }, value: '0.4s' },
      { label: { ar: 'زيادة العودة للشراء', en: 'Repeat Sales' }, value: '+24%' },
    ],
  },
  {
    id: 'property-ind',
    slug: 'property',
    name: { ar: 'العقارات والمشاريع', en: 'Real Estate & Properties' },
    description: { ar: 'منصات إدارة المحافظ العقارية، تتبع الإيجارات، وبوابات الوسطاء التفاعلية.', en: 'Real estate portfolio management, lease tracking, and broker interactive portals.' },
    challenges: {
      ar: ['تأخر تحصيل الإيجارات ونسيان مواعيد التجديد', 'تشتت عروض الوحدات بين المكاتب والوسطاء', 'صعوبة استخراج تقارير الإشغال'],
      en: ['Overdue lease payments and untracked renewals', 'Scattered unit listings across independent brokers', 'Manual occupancy calculations'],
    },
    solutions: {
      ar: ['لوحة تحكم مركزية للوحدات والعقود', 'تنبيهات تلقائية للمستأجرين عبر الواتساب', 'بوابة وسطاء بعمولات محوسبة'],
      en: ['Central property dashboard with live occupancy maps', 'Automated rent reminders via WhatsApp', 'Dedicated broker portal with commission logic'],
    },
    productModules: {
      ar: ['Novixa Aqar', 'Broker Hub', 'Rent Collection Engine'],
      en: ['Novixa Aqar', 'Broker Hub', 'Rent Collection Engine'],
    },
    iconName: 'Building2',
    sampleStats: [
      { label: { ar: 'سرعة التحصيل', en: 'Collection Speed' }, value: '+40%' },
      { label: { ar: 'أرشفة العقود', en: 'Document Accuracy' }, value: '100%' },
    ],
  },
];

/**
 * Case Studies honestly labeled as Demonstrations, Concepts, and Prototypes
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'black-spider',
    slug: 'black-spider',
    client: 'Black Spider Gaming Arena',
    title: {
      ar: 'تحويل مركز ألعاب وترفيه إلى منصة رقمية متكاملة للحجز وتجربة اللاعبين',
      en: 'Digitizing Black Spider Gaming Arena into a high-performance booking & lounge ecosystem',
    },
    industry: { ar: 'الألعاب والترفيه الإلكتروني', en: 'Gaming & Esports' },
    location: { ar: 'الشرق الأوسط', en: 'Middle East' },
    caseStudyType: 'Product Demonstration',
    caseStudyTypeLabel: { ar: 'عرض توضيحي لمنتج (Product Demo)', en: 'Product Demonstration' },
    challenge: {
      ar: 'كان مركز بلاك سبايدر يعاني من تكدس المشتركين في عطلة نهاية الأسبوع، وصعوبة إدارة حجز غرف VIP، فضلاً عن التأخير في تقديم الوجبات والمشروبات أثناء اللعب مما كان يتسبب في ضياع إيرادات تشغيلية.',
      en: 'Black Spider struggled with weekend customer congestion, manual VIP room scheduling, untracked extra playing minutes, and delayed F&B fulfillment during active gameplay.',
    },
    strategy: {
      ar: 'تصميم منصة نظام تشغيل ألعاب مخصص يدمج شاشات الحجز المسبق عبر الجوال، مع نظام توقيت أجهزة تلقائي ورابط طلبات سريعة من شاشة اللاعب.',
      en: 'Engineered an integrated gaming lounge platform combining web pre-booking, automated PC station time locks, and in-seat QR refreshment ordering.',
    },
    solution: {
      ar: 'قمنا ببناء منصة رقمية شملت متجر حجز أونلاين، لوحة تحكم الصالة المباشرة، ونظام بطولات تلقائي يربط شاشات العرض المركزية بالنتائج.',
      en: 'Delivered a full-stack system featuring an online seat booking portal, live arena operator dashboard, and dynamic tournament bracket system.',
    },
    features: {
      ar: [
        'حجز أجهزة الكمبيوتر وغرف VIP واختيار المواصفات مسبقاً',
        'شاشة طلب المأكولات الذكية المربوطة بمطبخ الصالة',
        'عداد وقت تنازلي تلقائي يقفل الجهاز فور انتهاء الباقة',
        'إحصائيات إشغال الصالة والإيرادات اليومية',
      ],
      en: [
        'Online station & VIP lounge seat reservation system',
        'In-seat QR F&B ordering routed to lounge kitchen POS',
        'Automated hardware session countdown & lock mechanism',
        'Live occupancy and revenue heatmaps for management',
      ],
    },
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'WebSockets', 'Redis'],
    metrics: [
      { label: { ar: 'ارتفاع نسبة إشغال الصالة', en: 'Arena Occupancy Rate' }, value: '+42%' },
      { label: { ar: 'نمو مبيعات الوجبات أثناء اللعب', en: 'In-Seat Snack Revenue' }, value: '+65%' },
      { label: { ar: 'تقليل وقت الانتظار', en: 'Customer Wait Time' }, value: '-70%' },
    ],
    heroImageTag: 'BLACK_SPIDER_SCREENSHOT',
  },
  {
    id: 'aura-medical',
    slug: 'aura-medical',
    client: 'Aura Medical Clinics',
    title: {
      ar: 'هندسة منصة حجز مواعيد وإدارة ملفات المرضى لسلسلة عيادات متخصصة',
      en: 'Engineered multi-branch appointment booking & digital patient records for Aura Clinics',
    },
    industry: { ar: 'الرعاية الصحية', en: 'Healthcare' },
    location: { ar: 'الخليج العربي', en: 'GCC Region' },
    caseStudyType: 'Concept',
    caseStudyTypeLabel: { ar: 'معمارية مفاهيمية (Concept Architecture)', en: 'Concept Architecture' },
    challenge: {
      ar: 'كانت المواعيد تلغى بنسبة تصل إلى 35% لغياب التنبيه الذكي وتشتت ملفات المرضى بين ثلاثة فروع مختلفة.',
      en: 'Aura Medical experienced a 35% appointment no-show rate and lacked a unified medical history system across three specialized clinic branches.',
    },
    strategy: {
      ar: 'بناء منصة حجز ذكية تلزم العميل بتأكيد الجدية عبر دفع عربون رمزي مع إرسال تذكير تلقائي وتوفير ملف طبي مشفر.',
      en: 'Built an automated appointment platform with deposit verification, dynamic WhatsApp reminders, and encrypted patient file access.',
    },
    solution: {
      ar: 'نظام حجز فائق السرعة يتيح اختيار الطبيب والفرع والوقت المناسب، مع ربط كامل بالواتساب ولوحة الطبيب المباشرة.',
      en: 'Sub-second booking flow allowing branch/doctor/time selection synced with doctor calendar interfaces and WhatsApp automated updates.',
    },
    features: {
      ar: [
        'تأكيد الحجز بدفع العربون المباشر',
        'تنبيهات واتساب الذكية قبل الموعد بـ 24 ساعة',
        'سجل طبي موحد مشفر يمكن الوصول له عبر جميع الفروع',
      ],
      en: [
        'Instant deposit payment lock at booking',
        '24h automated WhatsApp appointment confirmation',
        'Encrypted multi-branch electronic medical record access',
      ],
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'WhatsApp Business API'],
    metrics: [
      { label: { ar: 'انخفاض الغياب عن المواعيد', en: 'No-Show Rate Drop' }, value: '85%' },
      { label: { ar: 'رضا المرضى الموثق', en: 'Patient Satisfaction' }, value: '98%' },
    ],
    heroImageTag: 'AURA_MEDICAL_SCREENSHOT',
  },
  {
    id: 'nexus-logistics',
    slug: 'nexus-logistics',
    client: 'Nexus Global Logistics',
    title: {
      ar: 'منصة تتبع الشحنات وإدارة الأسطول والتوزيع الميداني المباشر',
      en: 'Real-time fleet tracking, order dispatching & field logistics control room',
    },
    industry: { ar: 'الخدمات اللوجستية والإمداد', en: 'Logistics & Supply Chain' },
    location: { ar: 'الشرق الأوسط', en: 'Middle East' },
    caseStudyType: 'Prototype',
    caseStudyTypeLabel: { ar: 'نموذج هندسي أولي (Engineering Prototype)', en: 'Engineering Prototype' },
    challenge: {
      ar: 'تأخر تحديث مواقع السائقين وتخارج العملاء نتيجة غياب التتبع المباشر للطلبات الميدانية.',
      en: 'Delayed driver location updates and customer friction caused by zero real-time visibility into active delivery routes.',
    },
    strategy: {
      ar: 'بناء غرفة قيادة رقمية لتتبع الأسطول مع تطبيق جوال مبسط للسائقين للتحديث بدون تعقيد.',
      en: 'Architected an automated dispatcher dashboard paired with a lightweight progressive web app for field drivers.',
    },
    solution: {
      ar: 'منصة لوجستية تعتمد على خرائط تفاعلية دقيقة، توزيع ذكي للمهام، وإشعارات وصول لحظية للعميل النهائي.',
      en: 'High-concurrency fleet management web app with automated route assignment and live GPS customer tracking links.',
    },
    features: {
      ar: [
        'خريطة تتبع مباشرة للسيارات والمنتجات',
        'توزيع المهام اللوجستية بالذكاء الاصطناعي',
        'رابط تتبع مباشر للعميل برقم الشحنة',
      ],
      en: [
        'Live fleet GPS tracking map interface',
        'Smart route distribution and load balancing',
        'Customer SMS live map tracking link',
      ],
    },
    technologies: ['Next.js', 'TypeScript', 'WebSockets', 'Google Maps API', 'Express'],
    metrics: [
      { label: { ar: 'تحسين كفاءة المسارات', en: 'Route Efficiency' }, value: '+30%' },
      { label: { ar: 'تخفيض استفسارات الدعم', en: 'Support Ticket Reduction' }, value: '-50%' },
    ],
    heroImageTag: 'NEXUS_LOGISTICS_SCREENSHOT',
  },
];

/**
 * 6-Stage Transparent Engagement Lifecycle
 */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: { ar: 'نفهم المشكلة ونحدد النطاق', en: 'Understand & Scope' },
    subtitle: { ar: 'تحليل نموذج العمل والعمليات الحالية', en: 'Deep dive into operational friction' },
    description: {
      ar: 'لا نبدأ بكتابة الكود مباشرة. نجلس مع فريقك لفهم دورة العمل الحقيقية، التحديات اليومية، والنقاط التي تسبب هدر الوقت أو الأرباح، سواء كنت تريد بناء نظام مخصص أو تهيئة حل جاهز.',
      en: 'We never write code before understanding your business reality. We audit your workflows, team friction, and where revenue leaks occur—determining whether you need custom engineering or a configured ready solution.',
    },
    deliverable: { ar: 'وثيقة نطاق المشروع وتحليل المتطلبات (PRD)', en: 'Project Requirements Document & Operational Roadmap' },
    customerBenefit: { ar: 'وضوح تام للهدف والمشكلة قبل إنفاق أي ريال', en: 'Complete alignment on real business priorities before investing' },
  },
  {
    number: '02',
    title: { ar: 'نخطط المعمارية وقواعد البيانات', en: 'Plan Architecture' },
    subtitle: { ar: 'رسم هندسة النظام وتدفق البيانات', en: 'Blueprint data structures & backend stack' },
    description: {
      ar: 'نصمم المعمارية الهندسية للنظام لضمان الأمان، السرعة، وإمكانية التوسع دون الحاجة لإعادة البناء عند نمو شركتك أو زيادة عدد الفروع والمستخدمين.',
      en: 'We map data schemas, security bounds, and cloud endpoints to ensure sub-second response times and effortless future scaling.',
    },
    deliverable: { ar: 'مخطط هندسة النظام وقواعد البيانات (System Blueprint)', en: 'System Blueprint & Database Schema Map' },
    customerBenefit: { ar: 'استثمار آمن في بنية تحتية برمجية تدوم لسنين', en: 'Future-proof technology foundation built to last years' },
  },
  {
    number: '03',
    title: { ar: 'نصمم التجربة والواجهات (UX/UI)', en: 'Design UX/UI' },
    subtitle: { ar: 'واجهات بسيطة ورائعة للمستخدم والتشغيل', en: 'Craft intuitive interfaces & design systems' },
    description: {
      ar: 'نصمم واجهات فائقة الدقة والوضوح (RTL-First). نهتم بأن تكون الواجهة سهلة الاستخدام لموظفيك وسريعة التصفح لعملائك لتقليل وقت إنجاز المعاملات.',
      en: 'We design modern, high-contrast, RTL-first interfaces. Every button, table, and screen is optimized for clarity and rapid operational execution.',
    },
    deliverable: { ar: 'نماذج تفاعلية كاملة (Interactive Prototype)', en: 'Clickable Interactive High-Fidelity Prototype' },
    customerBenefit: { ar: 'معاينة شكل المنتج النهائي بدقة قبل خطوة البرمجة', en: 'Preview and experience the full product before engineering starts' },
  },
  {
    number: '04',
    title: { ar: 'نبني النظام ونختبر الجودة', en: 'Engineer & Quality Test' },
    subtitle: { ar: 'برمجة نظيفة واختبارات أمان صارمة', en: 'Clean, type-safe full-stack implementation & QA' },
    description: {
      ar: 'نكتب برمجيات نظيفة ومعتمدة على أفضل الممارسات عالمياً باستخدام TypeScript مع اختبارات ضغط الأداء، وفحص الأمان لضمان استقراره تحت الضغط العالي.',
      en: 'We build with modern TypeScript and modular architectures. Strict type safety, clean code patterns, automated test suites, and stress testing.',
    },
    deliverable: { ar: 'نسخة تجريبية حية (Staging Build)', en: 'Staging Environment & Weekly Demo Cycles' },
    customerBenefit: { ar: 'تتبع تقدم العمل أسبوعياً ورؤية النظام يتكون أمامك', en: 'Full visibility with active weekly demos and live staging links' },
  },
  {
    number: '05',
    title: { ar: 'ننشر ونهيئ الاستضافة السحابية', en: 'Deploy & Setup Infrastructure' },
    subtitle: { ar: 'نشر آمن على السحابة وتدريب الفريق', en: 'Seamless cloud production release & onboarding' },
    description: {
      ar: 'نرفع النظام على خوادم سحابية مهيأة ومراقبة، ونشرف على ربط النطاقات وبوابات الدفع، مع تقديم جلسات تدريبية لفريقك لبدء العمل بسلاسة.',
      en: 'Zero-downtime deployment to cloud servers, production domain linking, payment gateway activation, and staff onboarding sessions.',
    },
    deliverable: { ar: 'المنتج الحي المباشر (Production Release)', en: 'Production System Live & Fully Configured' },
    customerBenefit: { ar: 'بدء استقبال العمليات والمبيعات دون مشاكل تقنية', en: 'Immediate operational go-live with complete confidence' },
  },
  {
    number: '06',
    title: { ar: 'نساند ونطور باستمرار (SLA)', en: 'Maintain & Continuous SLA' },
    subtitle: { ar: 'شراكة دائمة ومتابعة مؤشرات النمو', en: 'Long-term partnership & continuous upgrades' },
    description: {
      ar: 'علاقتنا لا تنتهي عند الإطلاق. نواصل مراقبة الأداء، وعمل النسخ الاحتياطي، وإصلاح الأخطاء، وإضافة التحسينات مع توسع أعمالك.',
      en: 'Launch is just the start. We continuously monitor server response, maintain daily backups, apply security patches, and ship feature enhancements.',
    },
    deliverable: { ar: 'عقد الصيانة والدعم المستمر (SLA Support)', en: 'SLA Support Agreement & Feature Expansion Roadmap' },
    customerBenefit: { ar: 'فريق تقني متكامل يقف خلف نجاح واستقرار شركتك', en: 'A dedicated, elite engineering team backing your business long term' },
  },
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'custom-vs-ready',
    slug: 'custom-vs-ready',
    title: {
      ar: 'كيف تختار بين بناء نظام مخصص أو تهيئة حل برمجي جاهز لأعمالك؟',
      en: 'Custom Software vs. Ready-Made Solutions: How to choose the right path for your business?',
    },
    category: { ar: 'تقنية الأعمال', en: 'Business Tech' },
    readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
    date: '2026-08-01',
    excerpt: {
      ar: 'دليل عملي للمدراء والمؤسسين للمقارنة بين تكلفة ووقت البناء المخصص وسرعة انطلاق الحلول الجاهزة القابلة للتخصيص.',
      en: 'A practical guide for executives comparing the ROI, timeline, and capabilities of bespoke engineering versus configurable turnkey software.',
    },
    author: {
      name: { ar: 'فريق هندسة نوڤيكسا', en: 'Novixa Engineering Team' },
      role: { ar: 'استشارات الهندسة البرمجية', en: 'Software Engineering Practice' },
    },
    content: {
      ar: [
        'في بداية نمو الأعمال، قد تكون الأنظمة الجاهزة الخيار الأسرع للبدء بتكلفة منخفضة. ولكن عندما تمتلك الشركة متطلبات تشغيلية فريدة أو فروعاً متعددة، يظهر السؤال: هل نبني من الصفر أم نهيئ حلاً جاهزاً؟',
        'في نوڤيكسا، نقدم كلا الخيارين: إذا كانت حاجتك ضمن الأنشطة الشائعة (مطاعم، حجوزات، عقارات، مخازن)، فإن حلولنا الجاهزة توفر 60% من التكلفة وتطلق في أيام. أما إذا كان نموذج عملك ابتكارياً ومعقداً، فإن البناء المخصص يمنحك أصلاً تقنياً تمتلكه بالكامل.',
      ],
      en: [
        'In early business stages, off-the-shelf software offers fast onboarding. However, as operations scale, businesses face the choice between custom development and configurable ready software.',
        'At Novixa, we offer both: our ready-made foundations get you live in 5–14 days for standard verticals (restaurants, bookings, real estate, inventory), while our custom engineering delivers proprietary assets for unique workflows.',
      ],
    },
  },
  {
    id: 'multi-tenant-saas',
    slug: 'multi-tenant-saas',
    title: {
      ar: 'هندسة منصات SaaS متعددة المستأجرين (Multi-Tenant): كيف تبني منتجاً يتوسع إقليمياً وعالمياً؟',
      en: 'Multi-Tenant SaaS Architecture: How to build software engineered for regional and global scale?',
    },
    category: { ar: 'هندسة البرمجيات', en: 'Software Engineering' },
    readTime: { ar: '7 دقائق قراءة', en: '7 min read' },
    date: '2026-07-20',
    excerpt: {
      ar: 'المبادئ الهندسية الأساسية لعزل بيانات المستخدمين، حماية الأمان، وضمان سرعة الاستجابة الفائقة عند خدمة آلاف الشركات.',
      en: 'Core engineering principles for tenant isolation, data privacy, and sub-second performance when serving thousands of B2B accounts.',
    },
    author: {
      name: { ar: 'فريق المعمارية السحابية', en: 'Cloud Architecture Team' },
      role: { ar: 'هندسة البرمجيات السحابية', en: 'Cloud Software Engineering' },
    },
    content: {
      ar: [
        'تصميم منصات Multi-Tenant يتطلب تفكيراً مختلفاً عن التطبيقات العادية. التحدي الأكبر لا يكمن فقط في جودة الواجهة، بل في كيفية ضمان عزل البيانات بين المشتركين (Tenant Isolation) بدون إجهاد قواعد البيانات.',
        'نعتمد في نوڤيكسا على نمط المعمارية السحابية الحديثة المقترنة بالتحقق الآلي من الهوية، وتوزيع البيانات الذكي لضمان أعلى معايير الأمان دون التضحية بمرونة التطوير.',
      ],
      en: [
        'Designing multi-tenant platforms requires an architectural mindset distinct from single-tenant web apps. The primary challenge is enforcing absolute tenant data isolation without overloading database pools.',
        'At Novixa, we employ clean schema boundary patterns paired with strict security middleware and automated caching layers to guarantee high standards of data safety.',
      ],
    },
  },
];

export const FOUNDER_INFO = {
  name: { ar: 'فريق تأسيس نوڤيكسا', en: 'Novixa Engineering Founders' },
  role: { ar: 'مهندسو ومنتجو النظم الرقمية', en: 'Product Engineers & System Architects' },
  quote: {
    ar: 'الأعمال لا تحتاج المزيد من البرامج العشوائية؛ بل تحتاج تقنية متماسكة تفهم كواليس التشغيل، وتعمل بهدوء ودقة لتمكين نمو حقيقي.',
    en: 'Businesses do not need more noise or random software tools; they need cohesive technology that truly understands operational reality and works quietly to empower real growth.',
  },
  story: {
    ar: 'تأسست نوڤيكسا بناءً على ملاحظة جليّة: العديد من الشركات الواعدة في اليمن والخليج تمتلك نموذج عمل ممتاز، ولكنها تعاني من بطء التوسع وتكرار الأخطاء بسبب اعتمادها على أدوات مجزأة ورسائل الواتساب. أتت نوڤيكسا لسد هذه الفجوة عبر تقديم هندسة برمجية رفيعة المستوى تجمع بين البرمجيات المخصصة والحلول الجاهزة سريعة الإطلاق والنشر السحابي المدار.',
    en: 'Novixa was founded on a clear realization: many ambitious companies across Yemen and the GCC have great business models but stall due to fragmented spreadsheets and manual WhatsApp messaging. Novixa bridges this gap by engineering robust software—delivering both bespoke systems, ready-to-deploy productized solutions, and managed cloud operations.',
  },
};
