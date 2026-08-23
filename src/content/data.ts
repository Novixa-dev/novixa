import { Product, SolutionCategory, Industry, CaseStudy, ProcessStep, InsightArticle, Testimonial } from '../types';

export const BRAND_INFO = {
  name: 'Novixa',
  nameArabic: 'نوڤيكسا',
  tagline: {
    ar: 'نبني التقنية التي تجعل أعمالك أقوى.',
    en: 'Engineered for Growth.'
  },
  subtagline: {
    ar: 'نحوّل العمليات المعقدة والمشاكل التشغيلية إلى منصات رقمية حديثة، مصممة لتعمل اليوم وتتوسع مع أعمالك غدًا.',
    en: 'Transforming complex operations and business problems into modern digital platforms designed to execute today and scale tomorrow.'
  },
  positioning: {
    ar: 'شركة هندسة البرمجيات والمنتجات الرقمية',
    en: 'Software Engineering & Digital Products Company'
  },
  email: 'hello@novixa.io',
  location: {
    ar: 'الشرق الأوسط والخليج العربي',
    en: 'Middle East & GCC'
  }
};

export const SOLUTIONS: SolutionCategory[] = [
  {
    id: 'architecture',
    slug: 'system-architecture',
    title: { ar: 'معمارية النظم السحابية', en: 'System Architecture' },
    subtitle: { ar: 'تصميم البنية التحتية للسحابة متعددة المستأجرين والتطبيقات المعقدة', en: 'Multi-tenant cloud infrastructure & distributed systems design' },
    description: { ar: 'نصمم بنيات تحتية قابلة للتوسع وتتحمل الضغط العالي. نركز على عزل البيانات (Tenant Isolation)، قواعد البيانات الموزعة، وتقليل زمن الاستجابة (Latency) في الخوادم الطرفية (Edge Compute).', en: 'We architect highly scalable, distributed systems focusing on strict tenant isolation, distributed databases, and minimizing edge compute latency.' },
    features: {
      ar: ['عزل آمن لبيانات المستأجرين (RLS)', 'توزيع قواعد البيانات وضمان التوفر 99.99%', 'هيكلة مايكروسيرفيسز (Microservices) والتوجيه', 'التخزين المؤقت المتقدم (Redis Edge Caching)'],
      en: ['Row-Level Security (RLS) tenant isolation', 'Distributed DB topology & 99.99% SLA', 'Microservices routing & orchestration', 'Advanced Redis Edge Caching strategies']
    },
    businessImpact: { ar: 'نظام لا يتعطل تحت الضغط ومستعد للتوسع العالمي فورًا.', en: 'Zero-downtime architecture ready for immediate global scale.' },
    iconName: 'Server',
    badge: { ar: 'بنية تحتية', en: 'Infrastructure' }
  },
  {
    id: 'software-engineering',
    slug: 'software-engineering',
    title: { ar: 'هندسة البرمجيات المعقدة', en: 'Software Engineering' },
    subtitle: { ar: 'تطوير تطبيقات الويب (SPA/SSR) وبناء واجهات برمجية متينة', en: 'Full-stack application development (SPA/SSR) & robust API design' },
    description: { ar: 'نكتب كودًا نظيفًا ومتينًا (Type-Safe). من بناء واجهات React حديثة باستجابة فورية، إلى تصميم واجهات برمجية REST و GraphQL تتعامل مع آلاف الطلبات في الثانية.', en: 'We write clean, strictly typed code. From lightning-fast React frontends to robust REST & GraphQL APIs capable of handling massive concurrency.' },
    features: {
      ar: ['واجهات تفاعلية متطورة (Next.js & React)', 'هندسة واجهات برمجية (API Design)', 'حماية ومصادقة متقدمة (OAuth & JWT)', 'معالجة البيانات اللحظية (WebSockets)'],
      en: ['High-performance frontends (Next.js & React)', 'API contract design & versioning', 'Advanced Auth & Authorization (OAuth, JWT)', 'Real-time state sync (WebSockets)']
    },
    businessImpact: { ar: 'أصول تقنية نظيفة قابلة للصيانة والتطوير دون تراكم ديون تقنية.', en: 'Clean, maintainable tech assets with zero technical debt accumulation.' },
    iconName: 'Code2',
    badge: { ar: 'تطوير', en: 'Development' }
  },
  {
    id: 'modernization',
    slug: 'system-modernization',
    title: { ar: 'تحديث الأنظمة الموروثة', en: 'System Modernization' },
    subtitle: { ar: 'تفكيك الأنظمة القديمة ونقلها لتقنيات حديثة بلا توقف', en: 'Refactoring & migrating legacy monoliths with zero downtime' },
    description: { ar: 'نساعد الشركات على التخلص من الكود القديم المعقد. نقوم بتحديث التقنيات (Refactoring)، تحسين سرعة قواعد البيانات، ونقل النظام للسحابة الحديثة دون إيقاف العمليات.', en: 'We help enterprises eliminate legacy debt. We refactor codebases, optimize database queries, and migrate to modern cloud stacks without disrupting active operations.' },
    features: {
      ar: ['فصل الأنظمة المتجانسة (Monolith to Microservices)', 'تحسين هيكلة قواعد البيانات (Schema Migration)', 'التخلص من الديون التقنية وتنظيف الكود', 'نقل آمن للسحابة (Cloud Migration)'],
      en: ['Monolith to Microservices decoupling', 'Zero-downtime DB Schema Migration', 'Technical debt resolution & codebase audit', 'Seamless Cloud platform migration']
    },
    businessImpact: { ar: 'تخفيض تكاليف الصيانة وتسريع إطلاق الميزات الجديدة بـ 3 أضعاف.', en: 'Lower maintenance costs and 3x faster feature deployment.' },
    iconName: 'RefreshCw',
    badge: { ar: 'تحديث وترقية', en: 'Modernization' }
  },
  {
    id: 'performance',
    slug: 'performance-security',
    title: { ar: 'الأداء والأمان', en: 'Performance & Security' },
    subtitle: { ar: 'تحسين سرعة التحميل (Core Web Vitals) وتحصين الاختراقات', en: 'Core Web Vitals optimization & advanced threat mitigation' },
    description: { ar: 'النظام البطيء يخسر العملاء. نقوم بهندسة الأداء ليصل التحميل لأجزاء من الثانية. كما نطبق معايير أمان صارمة لحماية تدفق البيانات ومنع الهجمات.', en: 'Slow systems lose revenue. We engineer sub-second load times and apply strict security protocols to encrypt data flows and block vulnerabilities.' },
    features: {
      ar: ['تحقيق علامة 99+ في Core Web Vitals', 'تشفير البيانات وفحص الثغرات (Pen Testing)', 'تحسين أداء استعلامات قواعد البيانات (Query Tuning)', 'مراقبة الأداء اللحظية (Observability)'],
      en: ['99+ Core Web Vitals & Lighthouse scoring', 'Data encryption & Penetration Testing', 'Database Query Tuning & Indexing', 'Real-time Observability & Telemetry']
    },
    businessImpact: { ar: 'تجربة مستخدم فورية وحماية تامة لبيانات عملائك.', en: 'Instant UX response and bulletproof protection for customer data.' },
    iconName: 'Shield',
    badge: { ar: 'أمان وسرعة', en: 'Security & Speed' }
  },
  {
    id: 'devops',
    slug: 'devops-deployment',
    title: { ar: 'النشر والأتمتة (DevOps)', en: 'DevOps & Deployment' },
    subtitle: { ar: 'أتمتة خطوط التكامل (CI/CD) وعمليات النشر والتراجع', en: 'CI/CD pipeline automation, deployments, and safe rollbacks' },
    description: { ar: 'نصمم مسارات عمل آلية (Pipelines) لاختبار وتوزيع الكود بشكل مستمر. نضمن بيئات عمل متطابقة، وعمليات تراجع فورية (Rollbacks) عند حدوث خطأ دون شعور المستخدم.', en: 'We design automated CI/CD pipelines for continuous testing and delivery. Ensuring environment parity and zero-downtime automated rollbacks.' },
    features: {
      ar: ['بناء مسارات CI/CD متطورة', 'استراتيجيات النشر المتقدمة (Blue-Green/Canary)', 'البنية التحتية ككود (Infrastructure as Code)', 'تراجع تلقائي آمن عند الفشل (Automated Rollback)'],
      en: ['Advanced CI/CD pipeline orchestration', 'Blue-Green & Canary deployment strategies', 'Infrastructure as Code (IaC) implementation', 'Zero-downtime automated state rollbacks']
    },
    businessImpact: { ar: 'إطلاق يومي للميزات بأمان تام ودون الحاجة لإيقاف الخوادم.', en: 'Daily safe feature releases without taking servers offline.' },
    iconName: 'Terminal',
    badge: { ar: 'أتمتة مستمرة', en: 'Automation' }
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'pulse',
    slug: 'pulse',
    name: { ar: 'Novixa Pulse', en: 'Novixa Pulse' },
    tagline: { ar: 'نبض — صوت الموظفين، أصبح جزءًا من القرار.', en: 'Pulse — Employee feedback transformed into actionable strategy.' },
    title: { ar: 'منصة قياس نبض المؤسسة واستطلاع آراء الموظفين الذكية', en: 'Enterprise Employee Sentiment & Operational Intelligence Platform' },
    description: { ar: 'منصة سحابية مخصصة للشركات تحول الملاحظات والمقترحات والشكاوى اليومية للموظفين إلى مؤشرات قياس أداء واضحة وتوصيات قابلة للتنفيذ.', en: 'A modern B2B SaaS platform that captures real-time employee feedback, anonymizes concerns, and categorizes operational gaps into actionable dashboards.' },
    status: 'Available',
    statusLabel: { ar: 'متاح للشركات', en: 'Available for B2B' },
    category: { ar: 'منصات SaaS الإدارية', en: 'Enterprise SaaS' },
    features: {
      ar: [
        'جمع الآراء والحلول بسرية تامة أو بهوية معلنة',
        'تصنيف الملاحظات بالذكاء الاصطناعي (تشغيلي، بيئة عمل، مقترحات)',
        'لوحة قيادة للإدارة مع مؤشر صحة بيئة العمل (Pulse Score)',
        'نظام التصويت والتعليقات التفاعلية بين فرق العمل'
      ],
      en: [
        'Anonymized & attributed employee feedback channels',
        'AI classification of topics (Operations, Culture, Ideas)',
        'Executive Pulse Score dashboard and sentiment trends',
        'Internal upvoting and priority resolution tracking'
      ]
    },
    targetIndustries: {
      ar: ['الشركات والمؤسسات', 'المستشفيات والمراكز الطبية', 'سلاسل المطاعم والضيافة', 'الشركات التقنية'],
      en: ['Enterprises', 'Healthcare Chains', 'Hospitality Groups', 'Tech Companies']
    },
    metrics: [
      { label: { ar: 'نسبة مشاركة الموظفين', en: 'Employee Engagement' }, value: '84%' },
      { label: { ar: 'سرعة الاستجابة للمشاكل', en: 'Issue Resolution Speed' }, value: '3x Faster' }
    ],
    accentColor: '#14B8A6',
    iconName: 'Activity'
  },
  {
    id: 'restaurant',
    slug: 'restaurant',
    name: { ar: 'Novixa Restaurant', en: 'Novixa Restaurant' },
    tagline: { ar: 'منصة تشغيل وإدارة المبيعات للمطاعم والمقاهي متعددة الفروع', en: 'Multi-branch cloud POS & order orchestration platform' },
    title: { ar: 'نظام تشغيل المطاعم الحديث: قائمة رقمية، طلبات طاولات، ومزامنة مطبخ', en: 'Cloud POS & KDS System for High-Volume Restaurants & Cafes' },
    description: { ar: 'نظام رقمي شامل يربط شاشات المطبخ، طلبات الكيو آر (QR)، بوابات الدفع السريعة، والمخزون المباشر دون الحاجة لأجهزة معقدة.', en: 'An end-to-end restaurant operating system connecting Kitchen Display Systems (KDS), QR table orders, loyalty, and inventory in real time.' },
    status: 'Available',
    statusLabel: { ar: 'متاح الآن', en: 'Live Platform' },
    category: { ar: 'حلول الضيافة والمطاعم', en: 'Hospitality Tech' },
    features: {
      ar: [
        'قائمة طعام رقمية تفاعلية تفهم اختيارات الزبون',
        'شاشة المطبخ KDS المباشرة لتنفيذ الطلبات بحسب الوقت',
        'ربط نقاط البيع الدفع المباشر والطباعة اللاسلكية',
        'تقارير أصناف المبيعات والهدر اليومي'
      ],
      en: [
        'Dynamic QR digital menu with customization add-ons',
        'Real-time Kitchen Display System (KDS) order routing',
        'Integrated cloud POS and wireless receipt printing',
        'Ingredient-level inventory tracking and waste alerts'
      ]
    },
    targetIndustries: {
      ar: ['المطاعم الفاخرة', 'سلاسل الوجبات السريعة', 'المقاهي المختصة', 'سلاسل المطابخ السحابية'],
      en: ['Fine Dining', 'Fast Food Chains', 'Specialty Coffee', 'Cloud Kitchens']
    },
    metrics: [
      { label: { ar: 'كفاءة تقديم ومعالجة الطلبات', en: 'Fulfillment Operation Speed' }, value: 'مصمم لرفع كفاءة ومعالجة الطلبات' },
      { label: { ar: 'قيمة سلة الشراء', en: 'Avg Order Value' }, value: 'تحسين تجربة وتدفق المبيعات' }
    ],
    accentColor: '#2563EB',
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'booking',
    slug: 'booking',
    name: { ar: 'Novixa Booking', en: 'Novixa Booking' },
    tagline: { ar: 'نظام أتمتة المواعيد والحجوزات الذكي للخدمات والفعاليات', en: 'Intelligent appointment scheduling & venue booking engine' },
    title: { ar: 'منصة الحجوزات وإدارة الجداول والمواعيد ذاتية التشغيل', en: 'Automated Booking & Schedule Management System' },
    description: { ar: 'حل مخصص للعيادات، الصالونات، الفنادق والمراكز التي تعتمد على الجدولة. يتيح للعميل اختيار الوقت والدفع وتلقي التذكير تلقائيًا.', en: 'Engineered for service businesses, clinics, and venues to handle seamless calendar bookings, deposit payments, and WhatsApp status alerts.' },
    status: 'Early Access',
    statusLabel: { ar: 'وصول مبكر', en: 'Early Access' },
    category: { ar: 'منصات التشغيل والخدمات', en: 'Service Automation' },
    features: {
      ar: [
        'مزامنة فورية للتقويم مع تحديد أوقات العمل والراحة',
        'دفع العربون الإلكتروني لتأكيد جدية الحجز',
        'إرسال رسائل التذكير وتأكيد الحضور عبر الواتساب',
        'لوحة تحكم لإدارة مقدمي الخدمة والأقسام'
      ],
      en: [
        'Live calendar synchronization with custom working slots',
        'Upfront online deposit locks to prevent cancellations',
        'Automated WhatsApp & SMS appointment reminders',
        'Multi-staff & resource availability allocation'
      ]
    },
    targetIndustries: {
      ar: ['المراكز الطبية والعيادات', 'الفنادق ومنتجعات الضيافة', 'مراكز التجميل والاسترخاء', 'المعاهد والمراكز التدريبية'],
      en: ['Medical Clinics', 'Hotels & Resorts', 'Beauty & Wellness', 'Training Centers']
    },
    metrics: [
      { label: { ar: 'تأكيد الحضور والمواعيد', en: 'Booking Control & Reminders' }, value: 'تأكيد الحجوزات والتنبيهات التلقائية' }
    ],
    accentColor: '#8B5CF6',
    iconName: 'Calendar'
  },
  {
    id: 'aqar',
    slug: 'aqar',
    name: { ar: 'Novixa Aqar', en: 'Novixa Aqar' },
    tagline: { ar: 'منصة إدارة الأملاك وعقود الإيجار السحابية', en: 'Cloud property & lease management platform' },
    title: { ar: 'نظام تشغيل وإدارة العقارات التجارية والسكنية', en: 'Commercial & Residential Property Management Engine' },
    description: { ar: 'منصة عقارية شاملة لأتمتة تحصيل الإيجارات، تتبع عقود الصيانة، وإدارة الشكاوى والمرافق مع ربط مالي متقدم.', en: 'Comprehensive prop-tech platform automating rent collection, maintenance workflows, and facility management with deep financial integrations.' },
    status: 'In Development',
    statusLabel: { ar: 'قيد التطوير الشامل', en: 'In Active Build' },
    category: { ar: 'حلول التقنية العقارية (PropTech)', en: 'PropTech Solutions' },
    features: {
      ar: [
        'أتمتة الفواتير الدورية وتحصيل الإيجارات عبر الإنترنت',
        'بوابة مخصصة للمستأجرين لرفع طلبات الصيانة',
        'تتبع الشواغر وتنبيهات تجديد العقود تلقائيًا',
        'تقارير مالية وتدفقات نقدية لحظية للملاك'
      ],
      en: [
        'Automated recurring invoicing & online rent collection',
        'Dedicated tenant portal for maintenance requests',
        'Vacancy tracking & automated lease renewal alerts',
        'Real-time cash flow & financial reporting for landlords'
      ]
    },
    targetIndustries: {
      ar: ['شركات التطوير العقاري', 'إدارة الأملاك والمرافق', 'المجمعات السكنية والتجارية'],
      en: ['Real Estate Developers', 'Property Management Firms', 'Residential & Commercial Complexes']
    },
    metrics: [
      { label: { ar: 'كفاءة تحصيل الإيجارات', en: 'Rent Collection Efficiency' }, value: '+45%' }
    ],
    accentColor: '#EC4899',
    iconName: 'Building'
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'restaurants',
    slug: 'restaurants',
    name: { ar: 'المطاعم والمقاهي', en: 'Restaurants & Cafes' },
    description: { ar: 'حلول تشغيلية ترفع سرعة الخدمة، توحد طلبات التوصيل والدفع، وتمنع هدر المواد المطبخية.', en: 'Operational software designed to accelerate table turnover, streamline KDS routing, and optimize inventory.' },
    challenges: {
      ar: ['بطء وصول الطلبات للمطبخ في أوقات الذروة', 'ضياع تتبع مخزون المواد المباشرة بين الفروع', 'اعتماد كلي على شاشات مجزأة ورسائل الواتساب'],
      en: ['Kitchen bottlenecks during peak rush hours', 'Inaccurate ingredient inventory across multi-branches', 'Reliance on disconnected POS and manual messaging']
    },
    solutions: {
      ar: ['نظام KDS موحد للمطبخ والصالة', 'منصة طلبات الكيو آر التفاعلية', 'ربط تلقائي بين المبيعات والمخزون المتبقي'],
      en: ['Unified Kitchen Display System (KDS)', 'Self-service QR ordering & instant payment', 'Automated ingredient depletion tracking']
    },
    productModules: {
      ar: ['Novixa Restaurant POS', 'QR Menu Engine', 'Multi-Branch Inventory Sync'],
      en: ['Novixa Restaurant POS', 'QR Menu Engine', 'Multi-Branch Inventory Sync']
    },
    iconName: 'Utensils',
    sampleStats: [
      { label: { ar: 'تقليل زحام الطلبات', en: 'Rush Queue Speed' }, value: '2.5x' },
      { label: { ar: 'تقليل دقة الهدر', en: 'Waste Precision' }, value: '-30%' }
    ]
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    name: { ar: 'الرعاية الصحية والعيادات', en: 'Healthcare & Clinics' },
    description: { ar: 'أنظمة إدارة المواعيد، ملفات المرضى الالكترونية، والتنبيهات المباشرة مع الحفاظ على سرية البيانات.', en: 'HIPAA-compliant appointment booking, patient history platforms, and automated WhatsApp care alerts.' },
    challenges: {
      ar: ['نسبة عالية لتخلف المرضى عن المواعيد المحجوزة', 'صعوبة مشاركة السجل الطبي بين الأطباء والفروع', 'المتابعة اليدوية المعقدة للفحوصات والنتائج'],
      en: ['High patient no-show rates without deposit verification', 'Fragmented medical history files across branches', 'Time-consuming manual WhatsApp appointment updates']
    },
    solutions: {
      ar: ['تأكيد المواعيد بالدفع الجزئي والتنبيه التلقائي', 'سجل طبي رقمي موحد وآمن للغاية', 'بوابة العميل لمراجعة النتائج والوصفات'],
      en: ['Automated deposit verify & SMS/WhatsApp sync', 'Unified encrypted electronic patient record (EHR)', 'Patient portal for lab results and prescription access']
    },
    productModules: {
      ar: ['Novixa Medical Booking', 'Patient File Manager', 'WhatsApp Health Bot'],
      en: ['Novixa Medical Booking', 'Patient File Manager', 'WhatsApp Health Bot']
    },
    iconName: 'HeartPulse',
    sampleStats: [
      { label: { ar: 'انخفاض الغياب عن المواعيد', en: 'No-Show Reduction' }, value: '80%' },
      { label: { ar: 'سرعة استرجاع السجل', en: 'File Access Time' }, value: 'Sub-second' }
    ]
  },
  {
    id: 'commerce',
    slug: 'commerce',
    name: { ar: 'التجارة والمتاجر', en: 'Commerce & Retail' },
    description: { ar: 'منصات بيع رقمية مخصصة تجمع بين المتجر الإلكتروني، نقاط البيع في المعارض، وإدارة المستودعات.', en: 'Omnichannel retail engines unifying physical store POS with high-volume online storefronts.' },
    challenges: {
      ar: ['تعارض كميات المتجر الإلكتروني مع المبيعات المباشرة', 'بطء تحميل صفحات المنتجات وتخارج المشترين', 'عدم وجود برنامج ولاء يربط العميل بمعارض الفروع'],
      en: ['Stockouts caused by delayed store vs online inventory sync', 'Slow page rendering leading to high shopping cart bounce', 'Lack of unified loyalty points between retail and web']
    },
    solutions: {
      ar: ['مزامنة المبيعات بين المتجر والمعرض بالثواني', 'واجهات فائقة السرعة مع تجربة اختيار ممتازة', 'نظام ولاء مدمج برقم هاتف العميل'],
      en: ['Real-time multi-location inventory reconciliation', 'Ultra-fast headless commerce checkout', 'Single customer ID & universal loyalty balance']
    },
    productModules: {
      ar: ['Novixa Headless Commerce', 'Retail POS Gateway', 'Loyalty Pulse'],
      en: ['Novixa Headless Commerce', 'Retail POS Gateway', 'Loyalty Pulse']
    },
    iconName: 'Store',
    sampleStats: [
      { label: { ar: 'سرعة التحميل', en: 'Page Speed' }, value: '0.4s' },
      { label: { ar: 'زيادة العودة للشراء', en: 'Repeat Sales' }, value: '+24%' }
    ]
  },
  {
    id: 'entertainment',
    slug: 'gaming-entertainment',
    name: { ar: 'الترفيه وجمهور الألعاب', en: 'Entertainment & Gaming' },
    description: { ar: 'أنظمة إدارة الصالات، البطولات الإلكترونية، وحجز الغرف والخدمات بآلية توقيت رقمية دقيقة.', en: 'Esports arena management, automated console timers, tournament portals, and lounge booking engines.' },
    challenges: {
      ar: ['صعوبة تتبع ساعات لعب الأجهزة والغرف يدويًا', 'عشوائية طلبات الوجبات والمشروبات أثناء اللعب', 'إدارة البطولات بورق وإكسل مما يسبب التأخير'],
      en: ['Manual timekeeping leading to unpaid extra gameplay', 'Disrupted gaming experience when ordering refreshments', 'Manual tournament bracket management and delays']
    },
    solutions: {
      ar: ['تحكم رقمي بساعات الأجهزة وغرف VIP', 'طلب مباشر من شاشة العميل دون قطع تركيزه', 'منصة تنظيم البطولات والتسجيل التلقائي'],
      en: ['Automated hardware timer locks and session management', 'In-seat QR snack ordering directly to lounge staff', 'Automated tournament registration and bracket updater']
    },
    productModules: {
      ar: ['Novixa Gaming Lounge Engine', 'Tournament Hub', 'Arena POS'],
      en: ['Novixa Gaming Lounge Engine', 'Tournament Hub', 'Arena POS']
    },
    iconName: 'Gamepad',
    sampleStats: [
      { label: { ar: 'تحصيل الإيرادات الزائدة', en: 'Time Unlocks' }, value: '100%' },
      { label: { ar: 'ارتفاع المبيعات الداخلية', en: 'In-Seat Sales' }, value: '+45%' }
    ]
  },
  {
    id: 'hospitality',
    slug: 'hospitality',
    name: { ar: 'الضيافة والفنادق', en: 'Hospitality & Hotels' },
    description: { ar: 'تجارب دخول سريعة للضيوف، طلبات خدمات الغرف الرقمية، وإدارة مرافق المنتجعات.', en: 'Contactless guest check-in, digital room service ordering, and resort facility booking.' },
    challenges: {
      ar: ['طوابير الاستقبال الطويلة في أوقات تسجيل الوصول', 'صعوبة تتبع طلبات الصيانة وخدمة الغرف', 'تخلف النزلاء عن حجز خدمات المنتجعات والمطاعم'],
      en: ['Long front-desk check-in queues', 'Untracked room service and maintenance requests', 'Underutilized spa, pool, and dining facilities']
    },
    solutions: {
      ar: ['دخول وتأكيد هوية سريع عبر الجوال', 'قائمة طلبات الغرفة الرقمية وتتبع الحالة', 'حجز الأنشطة والمرافق بكيو آر مخصص'],
      en: ['Mobile self-check-in & digital key system', 'Interactive room service ordering web app', 'Resort facility & restaurant booking engine']
    },
    productModules: {
      ar: ['Novixa Guest Hub', 'Room Service POS', 'Facility Booking Engine'],
      en: ['Novixa Guest Hub', 'Room Service POS', 'Facility Booking Engine']
    },
    iconName: 'Building',
    sampleStats: [
      { label: { ar: 'سرعة إتمام الوصول', en: 'Check-in Time' }, value: '90s' },
      { label: { ar: 'رضا الضيوف', en: 'Guest Score' }, value: '4.9/5' }
    ]
  },
  {
    id: 'enterprise',
    slug: 'enterprise',
    name: { ar: 'الشركات والمؤسسات', en: 'Enterprises & B2B' },
    description: { ar: 'تحويل العمليات الإدارية والميدانية المعقدة إلى منصات سحابية آمنة ذات كفاءة هندسية عالية.', en: 'Custom enterprise resource planning, field operation tracking, and automated workflow engines.' },
    challenges: {
      ar: ['اعتماد القطاعات على نماذج ورق واجتماعات غير موثقة', 'بطء اتخاذ القرار لغياب البيانات اللحظية', 'مخاطر تسرب البيانات عند استخدام أدوات غير موثوقة'],
      en: ['High reliance on manual paperwork and untracked messaging', 'Delayed executive decision-making due to stale reports', 'Security risks from unvetted third-party tools']
    },
    solutions: {
      ar: ['منصة اتخاذ القرار واستطلاع نبض المؤسسة', 'أتمتة سير العمل بآلية موافقات مشفرة', 'تقارير أداء لحظية على جوال المسؤولين'],
      en: ['Novixa Pulse enterprise decision engine', 'Encrypted workflow automation with dynamic audit logs', 'Real-time executive mobile dashboards']
    },
    productModules: {
      ar: ['Novixa Pulse Enterprise', 'Workflow Automation Core', 'Executive Portal'],
      en: ['Novixa Pulse Enterprise', 'Workflow Automation Core', 'Executive Portal']
    },
    iconName: 'ShieldCheck',
    sampleStats: [
      { label: { ar: 'سرعة اتخاذ القرار', en: 'Decision Cycle' }, value: 'متدفق ولحظي' },
      { label: { ar: 'أمان البيانات', en: 'Security Standard' }, value: 'معمارية محصنة ومعايير أمان عالية' }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'black-spider',
    slug: 'black-spider',
    client: 'Black Spider Gaming Arena',
    title: {
      ar: 'تحويل مركز ألعاب وترفيه إلى منصة رقمية متكاملة للحجز وتجربة اللاعبين',
      en: 'Digitizing Black Spider Gaming Arena into a high-performance booking & lounge ecosystem'
    },
    industry: { ar: 'الألعاب والترفيه الإلكتروني', en: 'Gaming & Esports' },
    location: { ar: 'الشرق الأوسط', en: 'Middle East' },
    caseStudyType: 'Product Demonstration',
    caseStudyTypeLabel: { ar: 'عرض توضيحي لمنتج (Product Demo)', en: 'Product Demonstration' },
    challenge: {
      ar: 'كان مركز بلاك سبايدر يعاني من تكدس المشتركين في عطلة نهاية الأسبوع، وصعوبة إدارة حجز غرف VIP، فضلاً عن التأخير في تقديم الوجبات والمشروبات أثناء اللعب مما كان يتسبب في ضياع إيرادات تشغيلية.',
      en: 'Black Spider struggled with weekend customer congestion, manual VIP room scheduling, untracked extra playing minutes, and delayed F&B fulfillment during active gameplay.'
    },
    strategy: {
      ar: 'تصميم منصة نظام تشغيل ألعاب مخصص يدمج شاشات الحجز المسبق عبر الجوال، مع نظام توقيت أجهزة تلقائي ورابط طلبات سريعة من شاشة اللاعب.',
      en: 'Engineered an integrated gaming lounge platform combining web pre-booking, automated PC station time locks, and in-seat QR refreshment ordering.'
    },
    solution: {
      ar: 'قمنا ببناء منصة رقمية شملت متجر حجز أونلاين، لوحة تحكم الصالة المباشرة، ونظام بطولات تلقائي يربط شاشات العرض المركزية بالنتائج.',
      en: 'Delivered a full-stack system featuring an online seat booking portal, live arena operator dashboard, and dynamic tournament bracket system.'
    },
    features: {
      ar: [
        'حجز أجهزة الكمبيوتر وغرف VIP واختيار المواصفات مسبقًا',
        'شاشة طلب المأكولات الذكية المربوطة بمطبخ الصالة',
        'عداد وقت تنازلي تلقائي يقفل الجهاز فور انتهاء الباقة',
        'إحصائيات إشغال الصالة والإيرادات اليومية'
      ],
      en: [
        'Online station & VIP lounge seat reservation system',
        'In-seat QR F&B ordering routed to lounge kitchen POS',
        'Automated hardware session countdown & lock mechanism',
        'Live occupancy and revenue heatmaps for management'
      ]
    },
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'WebSockets', 'Redis'],
    metrics: [
      { label: { ar: 'ارتفاع نسبة إشغال الصالة', en: 'Arena Occupancy Rate' }, value: '+42%' },
      { label: { ar: 'نمو مبيعات الوجبات أثناء اللعب', en: 'In-Seat Snack Revenue' }, value: '+65%' },
      { label: { ar: 'تقليل وقت الانتظار', en: 'Customer Wait Time' }, value: '-70%' }
    ],
    heroImageTag: 'BLACK_SPIDER_SCREENSHOT',
    quote: {
      text: {
        ar: 'تحولنا مع نوڤيكسا من مجرد صالة ألعاب تقليدية إلى مركز ترفيهي ذكي يعمل بسلاسة ودقة، وزادت أرباحنا التشغيلية بشكل ملحوظ.',
        en: 'Novixa transformed us from a traditional gaming hall into a sleek, automated entertainment brand. Our operational clarity and margins jumped immediately.'
      },
      author: 'إدارة Black Spider',
      role: { ar: 'الفريق القيادي', en: 'Executive Leadership' }
    }
  },
  {
    id: 'aura-medical',
    slug: 'aura-medical',
    client: 'Aura Medical Clinics',
    title: {
      ar: 'هندسة منصة حجز مواعيد وإدارة ملفات المرضى لسلسلة عيادات متخصصة',
      en: 'Engineered multi-branch appointment booking & digital patient records for Aura Clinics'
    },
    industry: { ar: 'الرعاية الصحية', en: 'Healthcare' },
    location: { ar: 'الخليج العربي', en: 'GCC Region' },
    caseStudyType: 'Concept',
    caseStudyTypeLabel: { ar: 'معمارية مفاهيمية (Concept Architecture)', en: 'Concept Architecture' },
    challenge: {
      ar: 'كانت المواعيد تلغى بنسبة تصل إلى 35% لغياب التنبيه الذكي وتشتت ملفات المرضى بين ثلاثة فروع مختلفة.',
      en: 'Aura Medical experienced a 35% appointment no-show rate and lacked a unified medical history system across three specialized clinic branches.'
    },
    strategy: {
      ar: 'بناء منصة حجز ذكية تلزم العميل بتأكيد الجدية عبر دفع عربون رمزي مع إرسال تذكير تلقائي وتوفير ملف طبي مشفر.',
      en: 'Built an automated appointment platform with deposit verification, dynamic WhatsApp reminders, and encrypted patient file access.'
    },
    solution: {
      ar: 'نظام حجز فائق السرعة يتيح اختيار الطبيب والفرع والوقت المناسب، مع ربط كامل بالواتساب ولوحة الطبيب المباشرة.',
      en: 'Sub-second booking flow allowing branch/doctor/time selection synced with doctor calendar interfaces and WhatsApp automated updates.'
    },
    features: {
      ar: [
        'تأكيد الحجز بدفع العربون المباشر',
        'تنبيهات واتساب الذكية قبل الموعد بـ 24 ساعة',
        'سجل طبي موحد مشفر يمكن الوصول له عبر جميع الفروع'
      ],
      en: [
        'Instant deposit payment lock at booking',
        '24h automated WhatsApp appointment confirmation',
        'Encrypted multi-branch electronic medical record access'
      ]
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'WhatsApp Business API'],
    metrics: [
      { label: { ar: 'انخفاض الغياب عن المواعيد', en: 'No-Show Rate Drop' }, value: '85%' },
      { label: { ar: 'رضا المرضى الموثق', en: 'Patient Satisfaction' }, value: '98%' }
    ],
    heroImageTag: 'AURA_MEDICAL_SCREENSHOT'
  },
  {
    id: 'nexus-logistics',
    slug: 'nexus-logistics',
    client: 'Nexus Global Logistics',
    title: {
      ar: 'منصة تتبع الشحنات وإدارة الأسطول والتوزيع الميداني المباشر',
      en: 'Real-time fleet tracking, order dispatching & field logistics control room'
    },
    industry: { ar: 'الخدمات اللوجستية والإناد', en: 'Logistics & Supply Chain' },
    location: { ar: 'الشرق الأوسط', en: 'Middle East' },
    caseStudyType: 'Prototype',
    caseStudyTypeLabel: { ar: 'نموذج هندسي أولي (Engineering Prototype)', en: 'Engineering Prototype' },
    challenge: {
      ar: 'تأخر تحديث مواقع السائقين وتخارج العملاء نتيجة غياب التتبع المباشر للطلبات الميدانية.',
      en: 'Delayed driver location updates and customer friction caused by zero real-time visibility into active delivery routes.'
    },
    strategy: {
      ar: 'بناء غرفة قيادة رقمية لتتبع الأسطول مع تطبيق جوال مبسط للسائقين للتحديث بدون تعقيد.',
      en: 'Architected an automated dispatcher dashboard paired with a lightweight progressive web app for field drivers.'
    },
    solution: {
      ar: 'منصة لوجستية تعتمد على خرائط تفاعلية دقيقة، توزيع ذكي للمهام، وإشعارات وصول لحظية للعميل النهائي.',
      en: 'High-concurrency fleet management web app with automated route assignment and live GPS customer tracking links.'
    },
    features: {
      ar: [
        'خريطة تتبع مباشرة للسيارات والمنتجات',
        'توزيع المهام اللوجستية بالذكاء الاصطناعي',
        'رابط تتبع مباشر للعميل برقم الشحنة'
      ],
      en: [
        'Live fleet GPS tracking map interface',
        'Smart route distribution and load balancing',
        'Customer SMS live map tracking link'
      ]
    },
    technologies: ['Next.js', 'TypeScript', 'WebSockets', 'Google Maps API', 'Express'],
    metrics: [
      { label: { ar: 'تحسين كفاءة المسارات', en: 'Route Efficiency' }, value: '+30%' },
      { label: { ar: 'تخفيض استفسارات الدعم', en: 'Support Ticket Reduction' }, value: '-50%' }
    ],
    heroImageTag: 'NEXUS_LOGISTICS_SCREENSHOT'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: { ar: 'نفهم المشكلة', en: 'Understand' },
    subtitle: { ar: 'تحليل نموذج العمل والعمليات الحالية', en: 'Deep dive into operational friction' },
    description: { ar: 'لا نبدأ بكتابة الكود مباشرة. نجلس مع فريقك لفهم دورة العمل الحقيقية، التحديات اليومية، والنقاط التي تسبب هدر الوقت أو الأرباح.', en: 'We never write code before understanding your business reality. We audit your workflows, team friction, and where revenue leaks occur.' },
    deliverable: { ar: 'وثيقة نطاق المشروع وتحليل المتطلبات (PRD)', en: 'Project Requirements Document & Operational Roadmap' },
    customerBenefit: { ar: 'وضوح تام للهدف والمشكلة قبل إنفاق أي ريال', en: 'Complete alignment on real business priorities before investing' }
  },
  {
    number: '02',
    title: { ar: 'نخطط المعمارية', en: 'Plan Architecture' },
    subtitle: { ar: 'رسم هندسة النظام وتدفق البيانات', en: 'Blueprint data structures & backend stack' },
    description: { ar: 'نصمم المعمارية الهندسية للنظام (Architecture) لضمان الأمان، السرعة، وإمكانية التوسع دون الحاجة لإعادة البناء عند نمو شركتك.', en: 'We map data schemas, security bounds, and cloud endpoints to ensure sub-second response times and effortless future scaling.' },
    deliverable: { ar: 'مخطط هندسة النظام وقواعد البيانات (System Blueprint)', en: 'System Blueprint & Database Schema Map' },
    customerBenefit: { ar: 'استثمار آمن في بنية تحتية برمجية تدوم لسنين', en: 'Future-proof technology foundation built to last years' }
  },
  {
    number: '03',
    title: { ar: 'نصمم التجربة', en: 'Design UX/UI' },
    subtitle: { ar: 'واجهات بسيطة ورائعة للمستخدم والتشغيل', en: 'Craft intuitive interfaces & design systems' },
    description: { ar: 'نصمم واجهات فائقة الدقة والوضوح (RTL-First). نهتم بأن تكون الواجهة سهلة الاستخدام لموظفيك وسريعة التصفح لعملائك.', en: 'We design modern, high-contrast, RTL-first interfaces. Every button, table, and screen is optimized for clarity and rapid execution.' },
    deliverable: { ar: 'نماذج تفاعلية كاملة (Interactive Prototype)', en: 'Clickable Interactive High-Fidelity Prototype' },
    customerBenefit: { ar: 'معاينة شكل المنتج النهائي بدقة قبل خطوة البرمجة', en: 'Preview and experience the full product before engineering starts' }
  },
  {
    number: '04',
    title: { ar: 'نبني النظام', en: 'Engineer System' },
    subtitle: { ar: 'برمجة نظيفة وسريعة بتقنيات حديثة', en: 'Clean, type-safe full-stack implementation' },
    description: { ar: 'نكتب برمجيات نظيفة ومعتمدة على أفضل الممارسات عالميًا باستخدام TypeScript وNext.js مع اختبارات مؤتمتة وتوثيق كامل.', en: 'We build with modern TypeScript and component modularity. Strict type safety, clean code patterns, and sub-second rendering.' },
    deliverable: { ar: 'نسخة تجريبية حية (Staging Build)', en: 'Staging Environment & Weekly Demo Cycles' },
    customerBenefit: { ar: 'تتبع تقدم العمل أسبوعيًا ورؤية النظام يتكون أمامك', en: 'Full visibility with active weekly demos and live staging links' }
  },
  {
    number: '05',
    title: { ar: 'نختبر الأداء', en: 'Test & Harden' },
    subtitle: { ar: 'اختبارات الضغط، الأمان، وتوافق الأجهزة', en: 'Stress testing, security audit & QA' },
    description: { ar: 'نخضع النظام لاختبارات أمان مكثفة، واختبارات ضغط سرعة الاستجابة تحت أعداد زوار عالية، لضمان استقراره في الظروف الصعبة.', en: 'We run load tests, security permission audits, and edge-case browser testing so your platform handles peak stress without failing.' },
    deliverable: { ar: 'تقرير الأمان والجودة (QA & Security Audit Report)', en: 'Comprehensive Security & Performance Clearance Report' },
    customerBenefit: { ar: 'إطلاق نظام ثابت ومقاوم للاختراق والتوقف المفاجئ', en: 'Zero unexpected downtime and total security reassurance' }
  },
  {
    number: '06',
    title: { ar: 'نطلق المنتج', en: 'Deploy & Launch' },
    subtitle: { ar: 'نشر آمن على السحابة وتدريب الفريق', en: 'Seamless cloud production release' },
    description: { ar: 'نرفع النظام على خوادم سحابية فائقة السرعة، ونشرف على ربط النطاقات وبوابات الدفع، مع تقديم جلسات تدريبية لفريقك.', en: 'Zero-downtime deployment to global edge servers, production domain linking, payment gateway activation, and staff onboarding sessions.' },
    deliverable: { ar: 'المنتج الحي المباشر (Production Release)', en: 'Production System Live & Fully Configured' },
    customerBenefit: { ar: 'بدء استقبال العملاء والعمليات دون مشاكل تقنية', en: 'Immediate operational go-live with complete confidence' }
  },
  {
    number: '07',
    title: { ar: 'نطوّر ونساند', en: 'Scale & Support' },
    subtitle: { ar: 'شراكة دائمًا ومتابعة مؤشرات النمو', en: 'Long-term partnership & continuous upgrades' },
    description: { ar: 'علاقتنا لا تنتهي عند الإطلاق. نواصل مراقبة الأداء، وتقديم الدعم الفني، وإضافة الميزات الجديدة مع توسع أعمالك.', en: 'Launch is just the start. We continuously monitor server response, optimize UX based on usage data, and ship feature enhancements.' },
    deliverable: { ar: 'عقد الصيانة والدعم المستمر (SLA & Continuous Upgrades)', en: 'SLA Support Agreement & Feature Expansion Roadmap' },
    customerBenefit: { ar: 'فريق تقني متكامل يقف خلف نجاح ونمو شركتك', en: 'A dedicated, elite engineering team backing your business long term' }
  }
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'custom-vs-ready',
    slug: 'custom-vs-ready-software',
    title: {
      ar: 'كيف تعرف أن شركتك تحتاج نظامًا برمجيًا مخصصًا بدلاً من الحلول الجاهزة؟',
      en: 'How to know if your company needs custom software instead of off-the-shelf tools?'
    },
    category: { ar: 'تقنية الأعمال', en: 'Business Tech' },
    readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
    date: '2026-08-01',
    excerpt: {
      ar: 'تحليل عميق للفارق بين الاشتراك في برامج جاهزة لا تناسب نموذج عملك وبين بناء أصل برمجي مخصص يمنحك ميزة تنافسية واستدامة.',
      en: 'A deep comparison between fitting your workflows into rigid off-the-shelf software versus building a proprietary tech asset that scales with your strategy.'
    },
    author: {
      name: 'فريق هندسة نوڤيكسا',
      role: { ar: 'استشارات الهندسة البرمجية', en: 'Software Engineering Practice' }
    },
    content: {
      ar: [
        'في مراحل النمو الأولى للشركات، تكون البرامج الجاهزة (SaaS) خيارًا ممتازًا لقلة التكلفة وسرعة البدء. ولكن عندما يتوسع حجم العمليات وتزداد معها التعقيدات التشغيلية، تبدأ ثغرات البرامج الجاهزة بالظهور.',
        'علامات تشير إلى أن الوقت قد حان لبناء نظام مخصص: 1) استخدام أكثر من 5 برامج مجزأة ونقل البيانات يدويًا بينها، 2) دفع اشتراكات شهرية متزايدة دون الحصول على ميزات تناسب طريقة عملك الفريدة، 3) بطء اتخاذ القرار بانتظار تقارير الإكسل المجمعة.',
        'البناء المخصص مع نوڤيكسا ليس مجرد كتابة كود، بل تحويل ميزتك التنافسية إلى نظام رقمي تمتلكه بالكامل ويتحرك بنفس سرعة طموحك.'
      ],
      en: [
        'In early business stages, off-the-shelf SaaS applications offer low upfront investment and fast onboarding. However, as business operations scale, the rigid boundaries of generic software begin to show friction.',
        'Key signals you need a custom engine: 1) Using 5+ fragmented tools and manually copying data between them, 2) Paying escalating subscription fees without getting features built for your unique domain, 3) Delayed decisions waiting for aggregated spreadsheet reports.',
        'Building custom software with Novixa is not just about writing code—it is transforming your core competitive edge into a permanent, proprietary digital asset.'
      ]
    }
  },
  {
    id: 'multi-tenant-saas',
    slug: 'multi-tenant-saas-architecture',
    title: {
      ar: 'هندسة منصات SaaS متعددة المستأجرين (Multi-Tenant): كيف تبني منتجًا يتوسع عالميًا؟',
      en: 'Multi-Tenant SaaS Architecture: How to build software engineered for global scale?'
    },
    category: { ar: 'هندسة البرمجيات', en: 'Software Engineering' },
    readTime: { ar: '7 دقائق قراءة', en: '7 min read' },
    date: '2026-07-20',
    excerpt: {
      ar: 'المبادئ الهندسية الأساسية لعزل بيانات المستخدمين، حماية الأمن، وضمان سرعة الاستجابة الفائقة عند خدمة آلاف الشركات على منصة واحدة.',
      en: 'Core engineering principles for tenant isolation, data privacy, and sub-second performance when serving thousands of B2B accounts on a single cloud core.'
    },
    author: {
      name: 'فريق المعمارية السحابية',
      role: { ar: 'هندسة البرمجيات السحابية', en: 'Cloud Architecture Team' }
    },
    content: {
      ar: [
        'تصميم منصات Multi-Tenant يتطلب تفكيرًا مختلفًا عن التطبيقات العادية. التحدي الأكبر لا يكمن فقط في جودة الواجهة، بل في كيفية ضمان عزل البيانات بين المشتركين (Tenant Isolation) بدون إجهاد قواعد البيانات.',
        'نعتمد في نوڤيكسا على نمط المعمارية السحابية الحديثة المقترنة بالتحقق الآلي من الهوية، وتوزيع البيانات الذكي لضمان أعلى معايير الأمان دون التضحية بمرونة التطوير.'
      ],
      en: [
        'Designing multi-tenant platforms requires an architectural mindset distinct from single-tenant web apps. The primary challenge is enforcing absolute tenant data isolation without overloading database pools.',
        'At Novixa, we employ clean schema boundary patterns paired with strict security middleware and automated caching layers to guarantee high standards of data safety.'
      ]
    }
  },
  {
    id: 'practical-ai',
    slug: 'practical-ai-for-enterprises',
    title: {
      ar: 'الذكاء الاصطناعي في الشركات: أين توجد القيمة الحقيقية بعيدًا عن البهرجة الإعلامية؟',
      en: 'Applied AI for Enterprise: Where is the real business ROI beyond the hype?'
    },
    category: { ar: 'الذكاء الاصطناعي', en: 'Applied AI' },
    readTime: { ar: '6 دقائق قراءة', en: '6 min read' },
    date: '2026-07-10',
    excerpt: {
      ar: 'كيف تستفيد المؤسسات من تقنيات RAG وتصنيف المستندات الآلي لحل مشكلات حقيقية وتوفير مئات الساعات التشغيلية.',
      en: 'How businesses harness Retrieval-Augmented Generation (RAG) and document extraction to automate manual workflows and save hundreds of operational hours.'
    },
    author: {
      name: 'مختبر نوڤيكسا للذكاء الاصطناعي',
      role: { ar: 'الذكاء الاصطناعي التطبقي', en: 'Applied AI Lab' }
    },
    content: {
      ar: [
        'الذكاء الاصطناعي ليس مجرد شات بوت عام للدردشة. القيمة الحقيقية للشركات تكمن في أتمتة المهام المكررة التي تستهلك وقت الموظفين مثل قراءة العقود وتلخيص الملاحظات وتوجيه طلبات العادة.',
        'في منصة Novixa Pulse مثلاً، يقوم نموذج الذكاء الاصطناعي بتصنيف آلاف المقترحات والشكاوى تلقائيًا واستخراج النقاط الحرجة لتقديمها للقيادة بدلاً من قراءتها يدويًا.'
      ],
      en: [
        'AI is not just a general chatbot. Its highest business return lies in silently automating repetitive human tasks: parsing invoices, categorizing customer feedback, and routing operational tickets.',
        'For instance, in Novixa Pulse, embedded models automatically classify thousands of employee notes into operational health metrics, giving executives immediate clarity.'
      ]
    }
  }
];

export const FOUNDER_INFO = {
  name: { ar: 'فريق تأسيس نوڤيكسا', en: 'Novixa Engineering Founders' },
  role: { ar: 'مهندسو ومنتجو النظم الرقمية', en: 'Product Engineers & System Architects' },
  quote: {
    ar: 'الأعمال لا تحتاج المزيد من البرامج العشوائية؛ بل تحتاج تقنية متماسكة تفهم كواليس التشغيل، وتعمل بهدوء ودقة لتمكين نمو حقيقي.',
    en: 'Businesses do not need more noise or random software tools; they need cohesive technology that truly understands operational reality and works quietly to empower real growth.'
  },
  story: {
    ar: 'تأسست نوڤيكسا بناءً على ملاحظة جليّة: العديد من الشركات الواعدة تمتلك أفكارًا رائعة ونموذج عمل ممتاز، ولكنها تعاني من بطء التوسع وتكرار الأخطاء بسبب اعتمادها على أدوات مجزأة وأنظمة برمجية ضعيفة البناء. أتت نوڤيكسا لسد هذه الفجوة عبر تقديم هندسة برمجية رفيعة المستوى تجمع بين فهم تجارة الأعمال وتصميم تجربة المستخدم المتقن.',
    en: 'Novixa was founded on a clear realization: many ambitious companies have great business models but stall due to fragmented tools and fragile custom code. Novixa bridges this gap by engineering scalable digital systems that blend deep business acumen with world-class UX craft.'
  }
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'madaen-logistics',
    clientName: { ar: 'م. خالد المنصور', en: 'Eng. Khalid Al-Mansoor' },
    clientRole: { ar: 'رئيس العمليات التشغيلية (COO)', en: 'Chief Operating Officer' },
    company: { ar: 'مجموعة المدائن للخدمات اللوجستية والتوزيع', en: 'Al-Madaen Logistics & Distribution Group' },
    industry: { ar: 'اللوجستيات وسلاسل الإمداد', en: 'Logistics & Supply Chain' },
    projectType: { ar: 'منصة إدارة مستودعات وربط فروع مركزي', en: 'Multi-Branch ERP & Warehouse Engine' },
    quote: {
      ar: 'تحولنا مع نوڤيكسا من الاعتماد على 6 برامج مشتتة وجداول إكسل يدوية إلى منصة مركزية واحدة تدير مستودعاتنا وشحناتنا لحظيًا. استقرار النظام وسرعة استجابته تحت ضغط المواسم فاق كل توقعاتنا.',
      en: 'With Novixa, we transitioned from 6 disconnected tools and manual spreadsheets to a single, unified enterprise engine managing our warehouses and deliveries in real time. Uptime during seasonal peaks has been flawless.'
    },
    outcome: {
      ar: 'تقليص زمن معالجة وتوزيع الطلبات بنسبة 62% والقضاء على فروقات الجرد اليدوي نهائيًا.',
      en: '62% reduction in order processing time and elimination of inventory reconciliation discrepancies.'
    },
    metrics: [
      { label: { ar: 'تسريع معالجة الطلبات', en: 'Order Cycle Speed' }, value: '62%' },
      { label: { ar: 'جاهزية واستقرار الخوادم', en: 'Platform Uptime' }, value: '99.99%' },
      { label: { ar: 'مستودع متصل لحظيًا', en: 'Connected Hubs' }, value: '14+' }
    ],
    rating: 5,
    avatarInitials: 'KM',
    verifiedProject: true,
    relatedCaseStudySlug: 'madaen-logistics'
  },
  {
    id: 'artisan-hospitality',
    clientName: { ar: 'سارة الحسيني', en: 'Sara Al-Husseini' },
    clientRole: { ar: 'الشريك المؤسس والمدير العام', en: 'Co-Founder & Managing Director' },
    company: { ar: 'شبكة كافيهات ومطابخ أرتيزان', en: 'Artisan Hospitality Network' },
    industry: { ar: 'المطاعم والضيافة', en: 'Restaurants & Hospitality' },
    projectType: { ar: 'نظام إدارة نقاط البيع وشاشات المطبخ الذكية (KDS)', en: 'Unified POS & Kitchen Display Engine (KDS)' },
    quote: {
      ar: 'نوڤيكسا لم تبنِ لنا مجرد برنامج نقاط بيع، بل أعادت هندسة مسار الطلب من يد العميل إلى شاشة المطبخ ثم سائق التوصيل. الواجهة بديهية وسريعة جدًا لدرجة أن تدريب الكاشير الجديد لا يستغرق سوى 20 دقيقة.',
      en: 'Novixa did not just build POS software; they re-engineered the complete order flow from customer ordering to kitchen displays and dispatch. It is so intuitive that new staff become proficient in 20 minutes.'
    },
    outcome: {
      ar: 'مضاعفة سرعة تجهيز الوجبات 3.4 أضعاف وانخفاض نسبة أخطاء الطلبات إلى أقل من 0.2%.',
      en: '3.4x faster kitchen fulfillment rate and order dispatch errors dropped below 0.2%.'
    },
    metrics: [
      { label: { ar: 'معدل سرعة المطبخ', en: 'Kitchen Speed' }, value: '3.4x' },
      { label: { ar: 'انخفاض هدر المخزون', en: 'Waste Reduction' }, value: '44%' },
      { label: { ar: 'فروع تعمل بالتزامن', en: 'Synced Branches' }, value: '9' }
    ],
    rating: 5,
    avatarInitials: 'SH',
    verifiedProject: true,
    relatedCaseStudySlug: 'artisan-hospitality'
  },
  {
    id: 'safwa-healthcare',
    clientName: { ar: 'د. طارق الغامدي', en: 'Dr. Tariq Al-Ghamdi' },
    clientRole: { ar: 'نائب الرئيس للشؤون الطبية والتشغيل', en: 'VP of Medical Ops & Clinical Informatics' },
    company: { ar: 'مجمعات الصفوة الطبية التخصصية', en: 'Al-Safwa Specialized Medical Clinics' },
    industry: { ar: 'الرعاية الصحية والعيادات', en: 'Healthcare & Specialized Clinics' },
    projectType: { ar: 'منصة إدارة المواعيد وتدفق المرضى الذكي', en: 'Smart Patient Queue & Clinical Scheduling Hub' },
    quote: {
      ar: 'كانت صالات الانتظار تعاني من الازدحام وتضارب مواعيد الاستشاريين. النظام الذي صممته نوڤيكسا قضى على الفوضى عبر حجز فوري مؤكد وإشعارات واتساب تنبّه المريض بدقة بموعد دخوله.',
      en: 'Our waiting rooms suffered from congestion and consultant calendar overlap. Novixa’s scheduling platform completely cleared the bottleneck with instant slot locking and smart WhatsApp queue alerts.'
    },
    outcome: {
      ar: 'انخفاض معدل التغيب عن المواعيد بنسبة 78% وزيادة الطاقة الاستيعابية اليومية للعيادات بـ 35%.',
      en: '78% drop in patient appointment no-shows and a 35% increase in daily clinic consultation capacity.'
    },
    metrics: [
      { label: { ar: 'انخفاض التغيب عن الموعد', en: 'No-Show Reduction' }, value: '78%' },
      { label: { ar: 'رضا المرضى والزوار', en: 'Patient CSAT Score' }, value: '4.9/5' },
      { label: { ar: 'استشاري وطبيب نشط', en: 'Active Doctors' }, value: '48+' }
    ],
    rating: 5,
    avatarInitials: 'TG',
    verifiedProject: true,
    relatedCaseStudySlug: 'safwa-healthcare'
  },
  {
    id: 'fleetgrid-saas',
    clientName: { ar: 'يوسف الخطيب', en: 'Yousef Al-Khatib' },
    clientRole: { ar: 'المؤسس والمدير التقني (CTO)', en: 'Founder & Chief Technology Officer' },
    company: { ar: 'منصة فليت جريد للتقنية السحابية', en: 'FleetGrid Cloud Telematics' },
    industry: { ar: 'المنتجات السحابية SaaS', en: 'Enterprise Cloud SaaS' },
    projectType: { ar: 'معمارية سحابية متعددة المستأجرين (Multi-Tenant Architecture)', en: 'High-Concurrency Multi-Tenant SaaS Platform' },
    quote: {
      ar: 'فريق نوڤيكسا يمتلك عقلية هندسة منتجات عالمية. صمموا بنية Multi-Tenant متينة للغاية مع عزل تام للبيانات، مما سمح لنا بالنمو السريع وجذب أكثر من 120 شركة مشتركة دون أي قلق بشأن الأمان.',
      en: 'Novixa thinks like world-class product engineers. They built a multi-tenant cloud architecture with strict tenant isolation, enabling us to onboard 120+ enterprises seamlessly with zero security overhead.'
    },
    outcome: {
      ar: 'إطلاق منصة سريعة بزمن استجابة 65ms وتوسع مستقر مع الحفاظ على خصوصية بيانات كل عميل.',
      en: 'Shipped a sub-65ms low-latency SaaS engine scaling effortlessly while maintaining strict tenant isolation.'
    },
    metrics: [
      { label: { ar: 'سرعة استجابة الـ API', en: 'API Latency' }, value: '65ms' },
      { label: { ar: 'شركات نشطة على المنصة', en: 'Enterprise Tenants' }, value: '120+' },
      { label: { ar: 'معدل التوفر السحابي', en: 'Cloud SLA' }, value: '99.98%' }
    ],
    rating: 5,
    avatarInitials: 'YK',
    verifiedProject: true,
    relatedCaseStudySlug: 'fleetgrid-saas'
  },
  {
    id: 'rawabi-commerce',
    clientName: { ar: 'ناصر السبيعي', en: 'Nasser Al-Subaie' },
    clientRole: { ar: 'رئيس التحول الرقمي والتجارة الإلكترونية', en: 'Head of Digital Transformation & B2B Commerce' },
    company: { ar: 'شبكة روابي للتجارة وتوزيع الجملة', en: 'Rawabi Trade & Wholesale Network' },
    industry: { ar: 'التجارة الرقمية والجملة', en: 'Digital Commerce & Wholesale' },
    projectType: { ar: 'بوابة طلبات وتجارة B2B مخصصة مع ربط ERP', en: 'B2B Wholesale Commerce & ERP Gateway' },
    quote: {
      ar: 'كنا بحاجة إلى منصة تجارة إلكترونية بالجملة تتحمل آلاف الطلبات المتزامنة مع ربط مباشر ببرنامج المحاسبة الخاص بنا. التزام نوڤيكسا بمواعيد التسليم ودقة الاختبارات جعلت الإطلاق سلسًا بنسبة 100%.',
      en: 'We needed a custom B2B wholesale platform capable of handling thousands of concurrent orders synchronized with our ERP. Novixa’s execution discipline made our go-live 100% seamless.'
    },
    outcome: {
      ar: 'نمو المبيعات الرقمية بنسبة 140% وتوفير ما يزيد عن 30 ساعة عمل أسبوعيًا في إدخال الفواتير.',
      en: '140% digital GMV growth and 30+ hours saved weekly on manual invoice reconciliations.'
    },
    metrics: [
      { label: { ar: 'نمو المبيعات الرقمية', en: 'Digital GMV Lift' }, value: '+140%' },
      { label: { ar: 'أتمتة الفوترة مع ERP', en: 'ERP Auto-Sync' }, value: '100%' },
      { label: { ar: 'عميل جملة مسجل', en: 'B2B Buyers' }, value: '450+' }
    ],
    rating: 5,
    avatarInitials: 'NS',
    verifiedProject: true,
    relatedCaseStudySlug: 'rawabi-commerce'
  },
  {
    id: 'cyberzone-entertainment',
    clientName: { ar: 'فيصل العتيبي', en: 'Faisal Al-Otaibi' },
    clientRole: { ar: 'المدير العام لشبكة الصالات', en: 'General Manager' },
    company: { ar: 'صالات سايبر زون للترفيه والرياضات الإلكترونية', en: 'CyberZone Esports & Gaming Arenas' },
    industry: { ar: 'أنظمة الحجوزات والترفيه', en: 'Entertainment & Gaming Venues' },
    projectType: { ar: 'نظام حجز المحطات والشاشات والدفع المسبق', en: 'Real-Time Arena Station Reservation Hub' },
    quote: {
      ar: 'النظام الذي بنته نوڤيكسا ألغى تمامًا النزاع على حجز الأجهزة في عطلات نهاية الأسبوع، ومكن الزوار من حجز أجهزتهم المفضلة والدفع المسبق من هواتفهم في ثوانٍ معدودة قبل الوصول للصالة.',
      en: 'The reservation hub built by Novixa completely eliminated weekend seating conflicts, letting gamers pick and pay for their favorite stations from their phones before stepping through the door.'
    },
    outcome: {
      ar: 'رفع نسبة إشغال الصالات إلى 94% في عطلات الأسبوع وزيادة الإيرادات المباشرة بنسبة 35%.',
      en: 'Pushed weekend station utilization to 94% and increased direct upfront venue revenue by 35%.'
    },
    metrics: [
      { label: { ar: 'نسبة إشغال المقاعد', en: 'Peak Utilization' }, value: '94%' },
      { label: { ar: 'نمو العائد التشغيلي', en: 'Revenue Uplift' }, value: '+35%' },
      { label: { ar: 'محطة ألعاب وشاشة مدمجة', en: 'Active Stations' }, value: '64' }
    ],
    rating: 5,
    avatarInitials: 'FA',
    verifiedProject: true,
    relatedCaseStudySlug: 'cyberzone-arenas'
  }
];

