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
      'تصميم وبناء البنى التحتية السحابية القابلة للتوسع الأفقي، مع عزل أمني صارم لبيانات العملاء وإدارة التوجيه عند الـ Edge وزمن استجابة أقل من 30ms.',
    descriptionEn:
      'Engineering horizontal scale cloud infrastructures with strict multi-tenant isolation, edge routing topologies, and predictable sub-30ms latencies.',
    techStack: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Docker / K8s', 'Kafka'],
    keyDeliverablesAr: [
      'عزل قواعد البيانات على مستوى المستأجر (Tenant Data Isolation)',
      'توزيع الأحمال وموازنة الطلبات المتزامنة الضخمة',
      'توفير استمرارية تشغيلية معتمدة بنسبة 99.99%',
    ],
    keyDeliverablesEn: [
      'Strict tenant data partitioning & encryption',
      'Dynamic high-concurrency request routing',
      'SLA-backed 99.99% operational uptime',
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
      'تطبيق مبادئ انعدام الثقة (Zero-Trust)، وتشفير البيانات في وضع السكون وأثناء النقل، وأتمتة خطوط الاختبار والنشر الآمن (CI/CD) دون انقطاع.',
    descriptionEn:
      'Enforcing zero-trust security postures, end-to-end encryption at rest and in transit, and immutable automated CI/CD pipelines with zero-downtime rollouts.',
    techStack: ['Terraform', 'GitHub Actions', 'Vault', 'Cloudflare Zero Trust', 'Prometheus / Grafana', 'OpenTelemetry'],
    keyDeliverablesAr: [
      'تشفير صارم (AES-256 / TLS 1.3) لجميع نقاط الاتصال',
      'نشر تلقائي آمن مع اختبارات ضغط وحقن أخطاء مستمرة',
      'مراقبة تشغيلية فورية وتنبيهات استباقية قبل حدوث الأعطال',
    ],
    keyDeliverablesEn: [
      'Bank-grade AES-256 and TLS 1.3 encryption standards',
      'Automated load-testing and zero-downtime deployments',
      'Real-time OpenTelemetry observability and proactive alerting',
    ],
  },
];

export const GOVERNANCE_STANDARDS: GovernanceStandard[] = [
  {
    step: '01',
    titleAr: 'التوثيق المعماري الصارم (ADR & RFC)',
    titleEn: 'Architectural Decision Records (ADRs)',
    descAr: 'لا يتم كتابة سطر برمجي واحد دون وثيقة معمارية تحدد نموذج البيانات، متطلبات الأمان، وسيناريوهات التوسع.',
    descEn: 'Every system is preceded by comprehensive RFCs outlining data models, threat vectors, and scale projections.',
    metric: '100% Spec-First',
  },
  {
    step: '02',
    titleAr: 'اختبارات الإجهاد والتحمل (Stress Testing)',
    titleEn: 'High-Concurrency Stress Testing',
    descAr: 'محاكاة أحمال ذروة تفوق 10,000 طلب بالثانية لقياس زمن الاستجابة P99 قبل إطلاق أي نظام للإنتاج الفعلي.',
    descEn: 'Simulating loads exceeding 10,000 concurrent RPS to measure P99 latency before greenlighting production.',
    metric: 'P99 < 35ms',
  },
  {
    step: '03',
    titleAr: 'مراجعة الأكواد والفحص الأمني التلقائي',
    titleEn: 'Static Analysis & Peer Reviews',
    descAr: 'فحص دوري صارم يشمل التحليل الساكن للأكواد (SAST)، اكتشاف الاعتماديات الضعيفة، ومراجعات ثنائية للسلامة.',
    descEn: 'Mandatory peer reviews, automated vulnerability scanning, and strict dependency audits on every commit.',
    metric: 'Zero Critical Vulns',
  },
  {
    step: '04',
    titleAr: 'المراقبة المستمرة واتفاقيات الخدمة (SLAs)',
    titleEn: 'Continuous Telemetry & SLA Guarantees',
    descAr: 'تتبع مقاييس الأداء والأخطاء لحظياً مع توفير دعم هندسي مباشر واستجابة للأعطال خلال دقائق معدودة.',
    descEn: 'Real-time telemetry, automated error triaging, and dedicated architectural incident response.',
    metric: '99.99% Uptime SLA',
  },
];
