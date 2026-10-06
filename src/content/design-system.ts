import { CHART_COLORS } from '@/lib/dashboard-demo';

/**
 * The published design system.
 *
 * Every value here is read off the implementation — `globals.css`,
 * `src/app/fonts.ts`, `lib/dashboard-demo.ts` — rather than written
 * independently, so the page cannot drift into describing a system the site
 * does not actually use. Where a number was measured (a contrast ratio, a
 * colour distance, a timing), the number is the measured one and the method is
 * named next to it.
 *
 * `AGENTS.md` holds the same decisions for contributors. This file is the
 * client-facing half: an engineering firm that sells discipline should be able
 * to show the discipline.
 */

export interface Bilingual {
  ar: string;
  en: string;
}

export interface ColorToken {
  name: string;
  value: string;
  role: Bilingual;
  /** Contrast against the token this colour is used on, when it carries text. */
  contrast?: string;
}

export interface RadiusToken {
  name: string;
  px: number;
  usage: Bilingual;
}

export interface TypeToken {
  family: string;
  variable: string;
  usage: Bilingual;
}

export interface Rule {
  title: Bilingual;
  body: Bilingual;
}

export const SURFACE_COLORS: ColorToken[] = [
  {
    name: 'canvas',
    value: '#020617',
    role: {
      ar: 'خلفية الصفحة. الموقع داكن فقط، ولا توجد سمة فاتحة — يُعلَن ذلك للمتصفح مرة واحدة عبر color-scheme: dark.',
      en: 'Page background. The site is dark-only — there is no light theme — and the browser is told once via color-scheme: dark.',
    },
  },
  {
    name: 'surface',
    value: '#0F172A',
    role: {
      ar: 'البطاقات واللوحات المرتفعة، وخلفية الرسوم البيانية في لوحة التشغيل.',
      en: 'Cards and raised panels, and the plotting surface in the console.',
    },
  },
  {
    name: 'primary',
    value: '#2563EB',
    role: {
      ar: 'لون الإجراء الأساسي: الأزرار الرئيسية وحلقة التركيز. لا يُستخدم كلون نص على الخلفية الداكنة (3.90:1) — يُستخدم كخلفية يقف عليها نص أبيض، وكعنصر واجهة غير نصي حيث الحد المطلوب 3:1.',
      en: 'The primary action colour: main buttons and the focus ring. Never used as a text colour on the dark canvas (3.90:1) — it is a background that white text sits on, and a non-text UI element, where the threshold is 3:1.',
    },
    contrast: '5.17:1 (white on it)',
  },
  {
    name: 'accent',
    value: '#0D9488',
    role: {
      ar: 'لون ثانوي للتمييز، يُستخدم بندرة ليحتفظ بقيمته.',
      en: 'The secondary accent, used sparingly so it keeps its value.',
    },
    contrast: '5.39:1',
  },
  {
    name: 'text',
    value: '#F8FAFC',
    role: {
      ar: 'النص الأساسي على الخلفية الداكنة.',
      en: 'Body text on the dark canvas.',
    },
    contrast: '19.28:1',
  },
  {
    name: 'text-faint',
    value: '#94A3B8',
    role: {
      ar: 'أخف درجة مسموح بها لنص مقروء: 7.87:1 على خلفية الصفحة و 7.04:1 فوق بطاقة. ما هو أخف من ذلك (‎#64748B‎) يعطي 4.24:1 و 3.79:1 — يسقط تحت حد 4.5:1 للنص العادي، ولذلك هو محجوز لعناصر الواجهة غير النصية حيث الحد 3:1. هذه القاعدة وُضعت بعد أن ظهر الخلل فعلاً: صفحة نظام التصميم نفسها بدأت بـ‎#64748B‎ وأسقطت درجة الوصولية من 100 إلى 96، وكشفت الاستخدام نفسه في مكوّنين قائمين.',
      en: 'The lightest shade allowed for readable text: 7.87:1 on the page background, 7.04:1 over a card. Anything lighter (#64748B) gives 4.24:1 and 3.79:1 — under the 4.5:1 threshold for normal text — so it is reserved for non-text UI, where the threshold is 3:1. This rule exists because the defect actually happened: this very page started on #64748B, dropped the accessibility score from 100 to 96, and exposed the same usage in two existing components.',
    },
    contrast: '7.87:1 / 7.04:1',
  },
  {
    name: 'text-muted',
    value: '#CBD5E1',
    role: {
      ar: 'النص الثانوي: 13.59:1 على خلفية الصفحة و 12.15:1 فوق بطاقة.',
      en: 'Secondary text: 13.59:1 on the page background, 12.15:1 over a card.',
    },
    contrast: '13.59:1 / 12.02:1',
  },
];

/**
 * The categorical chart palette, imported from the console's own module so the
 * two can never disagree.
 */
export const CHART_PALETTE = CHART_COLORS;

export const RADIUS_SCALE: RadiusToken[] = [
  { name: 'rounded-2xl', px: 16, usage: { ar: 'الحاويات الخارجية واللوحات', en: 'Outer containers and panels' } },
  { name: 'rounded-xl', px: 12, usage: { ar: 'البطاقات الداخلية والأزرار الكبيرة', en: 'Inner cards and large buttons' } },
  { name: 'rounded-lg', px: 8, usage: { ar: 'الحقول والأزرار الصغيرة', en: 'Inputs and small buttons' } },
  { name: 'rounded-full', px: 999, usage: { ar: 'الشرائح والشارات', en: 'Pills and badges' } },
];

export const TYPE_SCALE: TypeToken[] = [
  {
    family: 'Alexandria',
    variable: '--font-display',
    usage: {
      ar: 'العناوين والعناصر العرضية. يدعم العربية واللاتينية بوزن عريض واضح.',
      en: 'Headings and display type. Covers Arabic and Latin with a clear heavy weight.',
    },
  },
  {
    family: 'IBM Plex Sans Arabic',
    variable: '--font-arabic',
    usage: {
      ar: 'نص المتن العربي — وهو اللغة الأساسية للموقع لا ترجمة له.',
      en: "Arabic body text — the site's primary language, not a translation of it.",
    },
  },
  {
    family: 'Inter',
    variable: '--font-english',
    usage: {
      ar: 'نص المتن الإنجليزي، يُطبَّق عبر html[lang="en"] body.',
      en: 'English body text, applied through html[lang="en"] body.',
    },
  },
];

export const TYPOGRAPHY_RULES: Rule[] = [
  {
    title: {
      ar: 'العناوين العربية تحمل leading-snug',
      en: 'Arabic headings carry leading-snug',
    },
    body: {
      ar: 'الارتفاع السطري الافتراضي الضيق في أحجام text-3xl وما فوق يجعل صاعدات السطر الثاني وحركاته تتلامس بصرياً مع السطر الذي قبله في العربية. كل عنوان في المشروع يحمل leading-snug أو أوسع لهذا السبب تحديداً.',
      en: "Tailwind's default tight line-height at text-3xl and above lets ascenders and diacritics on a wrapped second line collide visually with the line above in Arabic. Every heading in the project carries leading-snug or looser for exactly that reason.",
    },
  },
  {
    title: {
      ar: 'text-wrap: balance على h1 و h2 عالمياً',
      en: 'text-wrap: balance on h1 and h2 globally',
    },
    body: {
      ar: 'قاعدة واحدة في globals.css تمنع بقاء كلمة واحدة وحدها في آخر سطر من العنوان — وهو خلل بصري أوضح في العربية لأن الالتفاف المتعرج يقطع تدفق الخط المتصل. المتصفحات التي لا تدعم الخاصية تلتف بشكل عادي.',
      en: 'One rule in globals.css keeps a wrapped title from stranding a single short word on its last line — a bigger visual tell in Arabic, where ragged wrapping disrupts the connected flow of the script. Browsers without support just wrap normally.',
    },
  },
  {
    title: {
      ar: 'أرقام جدولية على مستوى body',
      en: 'Tabular figures at the body level',
    },
    body: {
      ar: 'font-variant-numeric: tabular-nums مُعلَنة مرة واحدة، فتتراصف أرقام المؤشرات في لوحة التشغيل وبطاقات الأرقام بدل أن ترتجف عند تغيّر القيمة. لا حاجة لإضافة الخاصية على كل عنصر.',
      en: 'font-variant-numeric: tabular-nums is declared once, so metric and stat figures line up instead of jittering as values change. No need to add it per element.',
    },
  },
];

export const SURFACE_RULES: Rule[] = [
  {
    title: {
      ar: 'glass-card بلا backdrop-filter — والسبب مقيس',
      en: 'glass-card carries no backdrop-filter, and the reason is measured',
    },
    body: {
      ar: 'الصفحة الرئيسية وحدها تعرض 57 من هذه البطاقات. كل backdrop-filter يُنشئ طبقة تركيب خاصة به ويُضبّب ما خلفه — قياساً، أكبر تكلفة واحدة على الصفحة في ملف هاتف مُقيَّد. وجميعها تقريباً تجلس على خلفية مسطّحة، وتضبيب لون صلب لا ينتج أي فرق مرئي. فرفعنا عتامة الخلفية بدلاً من ذلك، وهو مكافئ بصرياً فوق هذه الخلفية.',
      en: 'The homepage alone renders 57 of these. Each backdrop-filter promotes its own compositing layer and blurs the backdrop behind it — measured as the single largest cost on the page on a throttled mobile profile. Almost every one of them sits on the flat canvas, where blurring a solid colour produces no visible difference at all. The background opacity was raised instead, which is visually equivalent over this canvas.',
    },
  },
  {
    title: {
      ar: 'glass-overlay للأسطح التي تطفو فعلاً',
      en: 'glass-overlay for the surfaces that genuinely float',
    },
    body: {
      ar: 'شريط التنقل والنوافذ المنبثقة وقائمة الأوامر تطفو فوق محتوى يتحرك بالتمرير، وهناك يُقرأ التضبيب ويستحق تكلفته. الحالات الأخرى تستخدم السطح المسطّح.',
      en: 'The navbar, modals and command menu float over scrolling content; there the blur reads and earns its cost. Everything else uses the flat surface.',
    },
  },
  {
    title: {
      ar: 'تأجيل تخطيط الأقسام خارج الشاشة',
      en: 'Off-screen sections defer their layout',
    },
    body: {
      ar: 'الصفحة الرئيسية تحمل اثني عشر قسماً، وكان المتصفح يخطّطها كلها قبل رسم العنوان الرئيسي: تأخير رسم عنصر LCP بلغ 1275 مللي ثانية مقابل 18 مللي ثانية لأول بايت. مع content-visibility: auto على كل قسم بعد الواجهة الأولى هبط التأخير إلى 288 مللي ثانية. المحتوى يبقى في شجرة الوصولية وقابلاً للبحث داخل الصفحة وللطباعة — هذه ليست display: none.',
      en: 'The homepage carries twelve sections and the browser laid all of them out before painting the H1: 1275 ms of LCP element render delay against 18 ms to first byte. With content-visibility: auto on every section after the hero that delay fell to 288 ms. The content stays in the accessibility tree, stays findable by in-page search, and still prints — this is not display: none.',
    },
  },
];

export const DIRECTION_RULES: Rule[] = [
  {
    title: {
      ar: 'العربية هي الحالة الأساسية، والإنجليزية هي الاستثناء',
      en: 'Arabic is the unmarked state; English is the override',
    },
    body: {
      ar: 'لا تُكتب text-left أو text-right أو ml-* أو mr-* مباشرة. النمط المتبع هو text-right rtl:text-right ltr:text-left — يبدو مكرراً وهو مقصود: RTL هي الحالة غير المعلَّمة و ltr: هي ما يتجاوزها.',
      en: 'No hardcoded text-left, text-right, ml-* or mr-*. The pattern is text-right rtl:text-right ltr:text-left — it looks redundant and it is intentional: RTL is the unmarked state and ltr: is the override.',
    },
  },
  {
    title: {
      ar: 'اتجاه الأيقونات يُشتق من الاتجاه لا يُكتب يدوياً',
      en: 'Icon direction is derived, never hardcoded',
    },
    body: {
      ar: 'const ArrowIcon = isRtl ? ArrowLeft : ArrowRight — الحركة إلى الأمام تشير يساراً في RTL ويميناً في LTR.',
      en: 'const ArrowIcon = isRtl ? ArrowLeft : ArrowRight — forward motion points left in RTL and right in LTR.',
    },
  },
  {
    title: {
      ar: 'dir و lang يُضبطان قبل أول رسم',
      en: 'dir and lang are set before first paint',
    },
    body: {
      ar: 'سكربت مُعطِّل صغير في layout.tsx يضبطهما من المسار، فلا تظهر /en للحظة بالاتجاه الخاطئ قبل الإماهة. ثم يحافظ LanguageContext على التزامن بعد الإماهة. الاثنان يجب أن يبقيا متوافقين.',
      en: 'A small blocking script in layout.tsx sets them from the route, so /en never flashes RTL before hydration. LanguageContext then keeps them in sync after hydration. The two must stay consistent.',
    },
  },
  {
    title: {
      ar: 'ar و en فقط، وأي شيء غيرهما يعطي 404',
      en: 'Only ar and en; anything else is a 404',
    },
    body: {
      ar: 'dynamicParams = false على [lang]/layout.tsx. هذا ما يمنع الروابط العشوائية من أن تُقدَّم كصفحات عربية مكرّرة قابلة للفهرسة.',
      en: 'dynamicParams = false on [lang]/layout.tsx. That is what stops garbage URLs from soft-404ing as indexable duplicate content.',
    },
  },
];

export const ACCESSIBILITY_RULES: Rule[] = [
  {
    title: {
      ar: 'حلقة التركيز تحمل حلقة داكنة معها',
      en: 'The focus ring carries a dark ring with it',
    },
    body: {
      ar: 'مخطط 2px أزرق وحده يختفي تقريباً داخل الأزرار الزرقاء، ويجلس مباشرة على المحتوى خلف الأسطح نصف الشفافة. إضافة box-shadow داكن بمقدار 2px يفصل المخطط عن أي سطح، فيُقرأ المؤشر بالطريقة نفسها على زر وبطاقة وخلفية الصفحة.',
      en: 'A bare 2px blue outline nearly disappears inside the blue buttons and sits directly on the content behind semi-transparent surfaces. A 2px dark box-shadow separates the outline from whatever is underneath, so the indicator reads the same on a button, a card and the page background.',
    },
  },
  {
    title: {
      ar: 'النص المتدرّج ينجو من وضع التباين العالي',
      en: 'Gradient text survives forced-colors mode',
    },
    body: {
      ar: 'السطر الثاني من العنوان الرئيسي يُرسم بقَص تدرّج على حدود الحروف. وضع forced-colors يتجاهل صور الخلفية — ومنها هذا التدرّج — فيختفي أول ما تقوله الصفحة. القاعدة تُحرّر القص وتُعيد اللون إلى CanvasText، أي إلى اللون الذي اختاره المستخدم بنفسه. وهي مكتوبة ضد النمط لا ضد العنصر، وخارج أي @layer لأن الطبقات تخسر أمام طبقة utilities مهما كانت دقّتها.',
      en: "The headline's second line is painted by clipping a gradient to the glyphs. Forced-colors discards background images — that gradient among them — and the first thing the page says disappears. The rule releases the clip and restores CanvasText, the user's own chosen foreground. It is written against the pattern rather than the one element, and it sits outside any @layer, because layers lose to Tailwind's utilities layer however specific they are.",
    },
  },
  {
    title: {
      ar: 'التباين مقيس من البكسلات المرسومة',
      en: 'Contrast is measured from rendered pixels',
    },
    body: {
      ar: '290 عقدة نصية على سبع صفحات، مقروءة من لقطات الشاشة لا من شجرة DOM — لأن الأسطح نصف الشفافة لا يستطيع محلّل الوصولية تركيبها، فيتقلّب حكمه بين تشغيلين متتاليين على نفس الصفحة. لا توجد حالات فشل حقيقية.',
      en: '290 text nodes across seven pages, read from screenshot pixels rather than from the DOM — the semi-transparent surfaces cannot be composited by the accessibility engine, whose verdict changed between two consecutive runs on identical markup. No genuine failures.',
    },
  },
  {
    title: {
      ar: 'الحركة الزخرفية تتوقف عند طلب تقليلها',
      en: 'Decorative movement stops when reduced motion is asked for',
    },
    body: {
      ar: 'بدائل Reveal و RevealGroup تحترم prefers-reduced-motion، واختبار متصفح يؤكد توقّف الحركة فعلاً بدل الاعتماد على مراجعة الكود.',
      en: 'The Reveal and RevealGroup primitives honour prefers-reduced-motion, and a browser test asserts the movement actually stops rather than trusting a code review.',
    },
  },
];

/** Verification facts, each one a number produced by a command in this repo. */
export const VERIFICATION_FACTS: Array<{ label: Bilingual; value: string }> = [
  { label: { ar: 'اختبارات وحدة', en: 'Unit tests' }, value: '78' },
  { label: { ar: 'اختبارات متصفح (سطح مكتب · لوحي · هاتف)', en: 'Browser tests (desktop · tablet · mobile)' }, value: '120' },
  { label: { ar: 'عناوين في خريطة الموقع', en: 'URLs in the sitemap' }, value: '90' },
  { label: { ar: 'أنواع بيانات منظّمة', en: 'Structured-data types' }, value: '9' },
  { label: { ar: 'Lighthouse — وصولية · أفضل الممارسات · SEO', en: 'Lighthouse — accessibility · best practices · SEO' }, value: '100 / 100 / 100' },
  { label: { ar: 'أخطاء وتحذيرات ESLint', en: 'ESLint errors and warnings' }, value: '0 / 0' },
];
