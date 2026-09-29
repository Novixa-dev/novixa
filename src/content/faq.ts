/**
 * Questions Novixa is actually asked, with answers that match what the rest of
 * the site says.
 *
 * Every entry is rendered visibly on `/{lang}/faq` and marked up as FAQPage
 * structured data from the *same* source. Google treats FAQ markup that does
 * not match visible content as a policy violation, and the usual way sites
 * trip that is by keeping the markup in one file and the page copy in another
 * until they drift.
 *
 * Answers stay inside what is verifiable: delivery windows and engagement
 * mechanics that Novixa controls, never invented client outcomes, headcounts,
 * years in business or certifications.
 */

export interface FaqItem {
  id: string;
  /** Groups questions under a heading on the page. */
  topic: 'engagement' | 'delivery' | 'ownership' | 'operations';
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
}

export const FAQ_TOPICS: Record<FaqItem['topic'], { ar: string; en: string }> = {
  engagement: { ar: 'كيف نبدأ العمل معاً', en: 'Starting an engagement' },
  delivery: { ar: 'التنفيذ والمواعيد', en: 'Delivery & timelines' },
  ownership: { ar: 'الملكية والعقود', en: 'Ownership & contracts' },
  operations: { ar: 'التشغيل بعد الإطلاق', en: 'Life after launch' },
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'custom-vs-ready',
    topic: 'engagement',
    question: {
      ar: 'كيف أعرف هل أحتاج نظاماً مخصصاً أم حلاً جاهزاً؟',
      en: 'How do I know whether I need a custom system or a ready solution?',
    },
    answer: {
      ar: 'القاعدة العملية: إذا كانت عمليتك تشبه إلى حد بعيد ما تفعله المطاعم أو العيادات أو مكاتب العقارات الأخرى، فالحل الجاهز يوفّر عليك شهوراً وتكلفة كبيرة، ويُهيَّأ بهويتك ويُنشر خلال 5 إلى 14 يوماً. أما إذا كان نموذج عملك يحتوي على منطق تشغيلي لا تجده في أي برنامج جاهز — تسعير غير تقليدي، دورة موافقات خاصة، تكامل مع أنظمة قديمة — فالبناء المخصص هو الخيار الصحيح. نحدد هذا معك في جلسة نطاق قصيرة قبل أن تلتزم بأي شيء.',
      en: 'The practical test: if your operation closely resembles what other restaurants, clinics or property offices do, a ready solution saves you months and a large share of the cost — configured to your brand and deployed in 5 to 14 days. If your model carries operational logic no off-the-shelf product has — unusual pricing, a bespoke approval chain, integration with a legacy system — custom is the right call. We settle this with you in a short scoping session before you commit to anything.',
    },
  },
  {
    id: 'first-step',
    topic: 'engagement',
    question: {
      ar: 'ما هي أول خطوة عملية للبدء؟',
      en: 'What is the first practical step?',
    },
    answer: {
      ar: 'جلسة نطاق قصيرة. نجلس مع من يدير العملية فعلياً — لا مع من يشرحها فقط — ونمر على دورة العمل الحالية ونقاط الاحتكاك اليومية. مخرج هذه الجلسة وثيقة نطاق ومتطلبات (PRD) تصف ما سيُبنى بالضبط، قبل كتابة أي كود وقبل أي التزام مالي.',
      en: 'A short scoping session. We sit with whoever actually runs the operation — not only whoever can describe it — and walk the current workflow and its daily friction points. The output is a scope and requirements document describing exactly what will be built, before any code is written and before any financial commitment.',
    },
  },
  {
    id: 'pricing',
    topic: 'engagement',
    question: {
      ar: 'لماذا لا تنشرون الأسعار على الموقع؟',
      en: 'Why are prices not published on the site?',
    },
    answer: {
      ar: 'لأن الرقم بلا نطاق محدد يضلل الطرفين. نظام حجوزات لعيادة واحدة ونظام حجوزات لسلسلة من ستة فروع مع بوابة دفع وتكامل واتساب يحملان الاسم نفسه ويختلفان في الكلفة اختلافاً كبيراً. باقات الحلول الجاهزة المعروضة على الموقع تصف نطاق التهيئة والتسليم بوضوح، والرقم النهائي يُحدد بعد جلسة النطاق ويُثبَّت في العقد.',
      en: 'Because a figure without a defined scope misleads both sides. A booking system for one clinic and a booking system for a six-branch chain with a payment gateway and WhatsApp integration carry the same name and very different costs. The tiers shown on the site describe delivery scope plainly; the final figure is agreed after the scoping session and fixed in the contract.',
    },
  },
  {
    id: 'timeline',
    topic: 'delivery',
    question: {
      ar: 'ما مدة تنفيذ المشروع؟',
      en: 'How long does a project take?',
    },
    answer: {
      ar: 'الحلول الجاهزة تُهيَّأ وتُنشر خلال 5 إلى 14 يوم عمل حسب حجم التخصيص وعدد الفروع. الأنظمة المخصصة تُسلَّم على مراحل: كل مرحلة لها مخرج محدد وعرض حي قبل الانتقال للتالية، فتبقى ترى تقدماً ملموساً بدلاً من انتظار تسليم واحد في النهاية. المدة الإجمالية تُقدَّر في وثيقة النطاق.',
      en: 'Ready solutions are configured and deployed in 5 to 14 working days, depending on how much customisation and how many branches are involved. Custom systems are delivered in stages: each stage has a defined output and a live walkthrough before the next begins, so you see real progress instead of waiting for one delivery at the end. The overall duration is estimated in the scope document.',
    },
  },
  {
    id: 'arabic-first',
    topic: 'delivery',
    question: {
      ar: 'هل الأنظمة تدعم العربية فعلاً أم مجرد ترجمة؟',
      en: 'Do the systems genuinely support Arabic, or is it just a translation?',
    },
    answer: {
      ar: 'العربية هي اللغة الأساسية في كل ما نبنيه، وليست طبقة تُضاف في النهاية. هذا يعني اتجاه واجهة صحيح من اليمين لليسار في كل شاشة، وخطوطاً عربية مناسبة للقراءة الطويلة، وترتيباً صحيحاً للأرقام والتواريخ والعملات، وطباعة فواتير وتقارير بالعربية دون كسر في التنسيق. هذا الموقع نفسه مبني بالطريقة ذاتها.',
      en: 'Arabic is the primary language in everything we build, not a layer added at the end. That means correct right-to-left direction on every screen, Arabic typefaces suited to sustained reading, correct handling of numbers, dates and currency, and Arabic invoices and reports that print without breaking. This site itself is built the same way.',
    },
  },
  {
    id: 'source-code',
    topic: 'ownership',
    question: {
      ar: 'هل أملك الكود المصدري؟',
      en: 'Do I own the source code?',
    },
    answer: {
      ar: 'نعم. تُسلَّم مستودعات الكود كاملة مع التوثيق التقني والمعماري، ولا نحتفظ بأي قيد يمنعك من الانتقال إلى فريق آخر أو مزود استضافة آخر. الملكية منصوص عليها في العقد، ولا نربط النظام بمنصة مغلقة تجعل الخروج مكلفاً.',
      en: 'Yes. The full code repositories are handed over along with technical and architectural documentation, and we keep no lock that prevents you moving to another team or another hosting provider. Ownership is stated in the contract, and we do not tie the system to a closed platform that makes leaving expensive.',
    },
  },
  {
    id: 'nda',
    topic: 'ownership',
    question: {
      ar: 'هل توقعون اتفاقية عدم إفصاح؟',
      en: 'Will you sign a non-disclosure agreement?',
    },
    answer: {
      ar: 'نعم، ونوقعها قبل أن تشاركنا أي تفاصيل حساسة عن عملك أو بياناتك. الاتفاقية متبادلة وتغطي بيانات العملاء والعمليات والأرقام التي نطّلع عليها أثناء العمل.',
      en: 'Yes, and we sign it before you share any sensitive detail about your business or your data. The agreement is mutual and covers the customer data, operations and figures we see during the engagement.',
    },
  },
  {
    id: 'hosting',
    topic: 'operations',
    question: {
      ar: 'هل يجب أن أستضيف النظام عندكم؟',
      en: 'Do I have to host with you?',
    },
    answer: {
      ar: 'لا. نوفر استضافة سحابية مدارة لمن يفضّل ألا يتعامل مع الخوادم إطلاقاً، وهي الخيار الأكثر اختياراً. ويمكن بنفس القدر نشر النظام على حسابك السحابي الخاص أو بنيتك التحتية، وتسليمك إعدادات النشر كاملة. القرار لك، ولا يغيّر شيئاً في ملكيتك للكود.',
      en: 'No. We offer managed cloud hosting for teams who would rather not deal with servers at all, which is what most choose. The system can equally be deployed to your own cloud account or infrastructure, with the full deployment configuration handed over. It is your call, and it changes nothing about your ownership of the code.',
    },
  },
  {
    id: 'after-launch',
    topic: 'operations',
    question: {
      ar: 'ماذا يحدث بعد الإطلاق؟ هل تختفون؟',
      en: 'What happens after launch — do you disappear?',
    },
    answer: {
      ar: 'البرمجيات تحتاج رعاية مستمرة لتبقى سريعة وآمنة. نقدم عقود صيانة ودعم واضحة تغطي إصلاح الأخطاء، التحديثات الأمنية، تحديث المكتبات لمنع تراكم الديون التقنية، ومراقبة الجاهزية. التواصل يكون مع مهندسي النظام مباشرة، لا عبر طبقة دعم غير تقنية. ويمكنك أيضاً أخذ الكود وإدارته بفريقك الداخلي إن رغبت.',
      en: 'Software needs ongoing care to stay fast and secure. We offer clear maintenance and support agreements covering bug fixes, security updates, dependency upgrades that stop technical debt accumulating, and uptime monitoring. You talk to the engineers who built the system, not a non-technical support tier. You are equally free to take the code and run it with your own team.',
    },
  },
  {
    id: 'existing-system',
    topic: 'operations',
    question: {
      ar: 'لدي نظام قديم يعمل. هل يجب استبداله بالكامل؟',
      en: 'I have an old system that works. Does it have to be replaced entirely?',
    },
    answer: {
      ar: 'غالباً لا، والاستبدال الكامل عادةً أسوأ خيار متاح. الأكثر جدوى هو تحديث تدريجي: نبقي النظام الحالي يعمل ونبني حوله، أو نربطه عبر واجهات برمجية، أو ننقل جزءاً واحداً مؤلماً في كل مرة. نقيّم الحالة أولاً ونقول لك بصراحة إن كان الأفضل هو البقاء على ما لديك مع تحسينات محدودة.',
      en: 'Usually not — a full replacement is often the worst available option. The more workable path is incremental modernisation: keep the current system running and build around it, connect it through APIs, or move one painful part at a time. We assess first, and we will tell you plainly if the better answer is keeping what you have with limited improvements.',
    },
  },
];
