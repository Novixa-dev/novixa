/**
 * Novixa Engineering Disciplines & Methodology Data Layer
 * هيكل التخصصات الهندسية، معايير المعمارية، ونموذج تسليم البرمجيات في نوڤيكسا
 * Note: Adheres strictly to AGENTS.md anti-fabrication mandate (no fake stock avatars or invented individuals).
 */

export interface EngineeringDiscipline {
  id: string;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
  descriptionAr: string;
  descriptionEn: string;
  techStack: string[];
  keyDeliverablesAr: string[];
  keyDeliverablesEn: string[];
  icon: 'Server' | 'Layers' | 'Cpu' | 'ShieldCheck';
}

export interface GovernanceStandard {
  step: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  metric: string;
}

export const ENGINEERING_DISCIPLINES: EngineeringDiscipline[] = [
  {
    id: 'distributed-systems',
    icon: 'Server',
    titleAr: 'هندسة النظم الموزعة والسحابة متعددة المستأجرين',
    titleEn: 'Distributed Cloud & Multi-Tenant Systems',
    badgeAr: 'معمارية النظم الأساسية',
    badgeEn: 'Core Systems Architecture',
    descriptionAr:
      'تصميم وبناء البنى التحتية السحابية القابلة للتوسع الأفقي، مع عزل أمني صارم لبيانات العملاء وإدارة التوجيه عند الـ Edge.',
    descriptionEn:
      'Engineering horizontal scale cloud infrastructures with strict multi-tenant isolation and edge routing topologies.',
    techStack: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Docker / K8s', 'Kafka'],
    keyDeliverablesAr: [
      'عزل قواعد البيانات على مستوى المستأجر (Tenant Data Isolation)',
      'توزيع الأحمال وموازنة الطلبات المتزامنة الضخمة',
      'تصميم البنية لتحمّل الأعطال وفق هدف توافر يُتفق عليه مع العميل',
    ],
    keyDeliverablesEn: [
      'Strict tenant data partitioning & encryption',
      'Dynamic high-concurrency request routing',
      'Availability target agreed with the client per project',
    ],
  },
  {
    id: 'frontend-systems',
    icon: 'Layers',
    titleAr: 'هندسة الواجهات التفاعلية والأنظمة الميدانية',
    titleEn: 'High-Performance Client & Offline Systems',
    badgeAr: 'هندسة واجهات النظم',
    badgeEn: 'Client-Side Systems',
    descriptionAr:
      'تطوير واجهات مستخدم معقدة وأنظمة نقاط بيع (POS) وتطبيقات جوال تعمل بنمط Offline-First مع مزامنة فورية دون تعارض ومعدل 60 إطاراً في الثانية.',
    descriptionEn:
      'Building responsive operational dashboards, offline-resilient POS clients, and sub-second web applications optimized for instantaneous interaction.',
    techStack: ['Next.js 15', 'TypeScript', 'React Native', 'Tailwind CSS', 'IndexedDB', 'WebSockets'],
    keyDeliverablesAr: [
      'مرونة العمل دون اتصال (Offline-First Architecture)',
      'مزامنة البيانات الحية وتحديث الشاشات لحظياً',
      'تصميم معماري يضمن سرعة التحميل وتوافق الهواتف والأجهزة اللوحية',
    ],
    keyDeliverablesEn: [
      'Zero-drop local caching & offline continuity',
      'Sub-second real-time state synchronization',
      'Enterprise design systems built for tablet and desktop scale',
    ],
  },
  {
    id: 'applied-ai',
    icon: 'Cpu',
    titleAr: 'الذكاء الاصطناعي التطبيقي وهندسة المعرفة (RAG)',
    titleEn: 'Applied AI & Enterprise Knowledge Engineering',
    badgeAr: 'الذكاء الاصطناعي المؤسسي',
    badgeEn: 'Enterprise RAG & AI',
    descriptionAr:
      'دمج نماذج الذكاء الاصطناعي الكبيرة (LLMs) داخل العمليات التشغيلية، وبناء خطوط معالجة واستخراج المستندات (OCR) ومساعدات أعمال آمنة تماماً.',
    descriptionEn:
      'Embedding private LLM workflows, automated document processing (OCR), and enterprise retrieval-augmented generation (RAG) into proprietary business logic.',
    techStack: ['Python', 'LangChain', 'pgvector / Qdrant', 'FastAPI', 'OpenAI / Claude APIs', 'Tesseract'],
    keyDeliverablesAr: [
      'استخراج وفهرسة بيانات الفواتير والعقود بدقة تفوق 99%',
      'مساعدات بحث واستعلام آمنة تعتمد على وثائق المؤسسة الداخلية',
      'حوكمة تامة وحماية مطلقة للبيانات الحساسة من التسريب',
    ],
    keyDeliverablesEn: [
      '99%+ accurate automated document & invoice extraction',
      'Private enterprise knowledge search with zero leakage',
      'Strict corporate data privacy & air-gapped options',
    ],
  },
  {
    id: 'devsecops',
    icon: 'ShieldCheck',
    titleAr: 'أمن المعلومات والحوكمة السحابية (DevSecOps)',
    titleEn: 'DevSecOps & Zero-Trust Infrastructure',
    badgeAr: 'الأمان والموثوقية',
    badgeEn: 'Security & Reliability',
    descriptionAr:
      'تطبيق ممارسات أمان صارمة، وتشفير الاتصالات، وأتمتة خطوط الاختبار والنشر (CI/CD) مع رجوع تلقائي عند فشل الإصدار.',
    descriptionEn:
      'Applying disciplined security practice, encrypted connections, and automated CI/CD pipelines with automatic rollback when a release fails.',
    techStack: ['Terraform', 'GitHub Actions', 'Vault', 'Cloudflare Zero Trust', 'Prometheus / Grafana', 'OpenTelemetry'],
    keyDeliverablesAr: [
      'تشفير الاتصالات عبر TLS على كل نقطة وصول',
      'نسخ احتياطي قبل كل إصدار ورجوع تلقائي إن فشل',
      'فحوص صحة آلية بعد كل إصدار',
    ],
    keyDeliverablesEn: [
      'TLS-encrypted connections on every endpoint',
      'A backup before every release and automatic rollback on failure',
      'Automated health checks after every release',
    ],
  },
];

export const GOVERNANCE_STANDARDS: GovernanceStandard[] = [
  {
    step: '01',
    titleAr: 'التوثيق المعماري الصارم (ADR & RFC)',
    titleEn: 'Architectural Decision Records (ADRs)',
    descAr: 'نبدأ كل نظام بوثيقة معمارية تحدد نموذج البيانات ومتطلبات الأمان وسيناريوهات التوسع.',
    descEn: 'Every system starts with a written architecture record covering data models, security requirements and scale scenarios.',
    metric: 'Spec-first',
  },
  {
    step: '02',
    titleAr: 'اختبارات الإجهاد والتحمل (Stress Testing)',
    titleEn: 'High-Concurrency Stress Testing',
    descAr: 'نختبر الأحمال على سيناريوهات الاستخدام المتوقعة ونقيس زمن الاستجابة قبل الإطلاق.',
    descEn: 'We load-test the expected usage scenarios and measure response times before launch.',
    metric: 'Measured before launch',
  },
  {
    step: '03',
    titleAr: 'مراجعة الأكواد والفحص الأمني التلقائي',
    titleEn: 'Static Analysis & Peer Reviews',
    descAr: 'كل تغيير يمرّ بفحص الأنواع والتحليل الساكن والاختبارات الآلية قبل دمجه، وتُراجَع الاعتماديات دورياً بحثاً عن الثغرات.',
    descEn: 'Every change passes type-checking, static analysis and automated tests before it is merged, and dependencies are audited regularly for known vulnerabilities.',
    metric: 'Checked on every change',
  },
  {
    step: '04',
    titleAr: 'المراقبة والدعم',
    titleEn: 'Monitoring & Support',
    descAr: 'فحص صحة بعد كل إصدار، ونسخ احتياطي ليلي، ورجوع تلقائي إن فشل الإصدار، ودعم هندسي مباشر عند الأعطال.',
    descEn: 'A health check after every release, nightly backups, automatic rollback if a release fails, and direct engineering support when something breaks.',
    metric: 'Nightly backups',
  },
];
