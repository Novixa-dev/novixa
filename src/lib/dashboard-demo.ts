import type { Language } from '@/types';

/**
 * Data behind the interactive operations console at `/{lang}/dashboard`.
 *
 * ── This data is illustrative. ──────────────────────────────────────────────
 * Every number here is generated, not measured. It exists to demonstrate the
 * shape of the console Novixa ships with its products — which panels exist,
 * how a branch manager reads them — not to report any client's results. The UI
 * says so on the page, prominently and in both locales, because presenting
 * invented figures as real outcomes is the one thing this project does not do
 * (see AGENTS.md). Nothing here is attributed to a named client.
 *
 * The series are produced by a seeded generator rather than `Math.random()`:
 * the same seed yields the same values on the server and in the browser, so
 * the prerendered HTML matches the first client render and React does not
 * report a hydration mismatch. It also means the page looks identical on every
 * visit instead of reshuffling under the reader.
 */

export type ModuleId = 'restaurant' | 'booking' | 'aqar' | 'pulse';

export interface Bilingual {
  ar: string;
  en: string;
}

/** A value read directly off the console's header row. */
export interface Kpi {
  id: string;
  label: Bilingual;
  value: string;
  /** Period-over-period change, already formatted. `null` when not tracked. */
  delta: string | null;
  /** Whether `delta` is a good or bad movement for this particular metric. */
  deltaDirection: 'up-good' | 'down-good' | 'neutral';
  caption: Bilingual;
}

export interface SeriesPoint {
  /** Day index, 0 = oldest in the window. */
  day: number;
  value: number;
}

export interface Breakdown {
  id: string;
  label: Bilingual;
  value: number;
}

export interface FeedEvent {
  id: string;
  /** Minutes before "now" — rendered as a relative time. */
  minutesAgo: number;
  severity: 'ok' | 'info' | 'warn';
  text: Bilingual;
}

export interface DashboardModule {
  id: ModuleId;
  /** Product name — a proper noun, identical in both locales by design. */
  product: string;
  label: Bilingual;
  /** What an operator uses this console for, in one line. */
  purpose: Bilingual;
  kpis: Kpi[];
  trend: {
    label: Bilingual;
    /** Axis unit, e.g. "order" — used in the tooltip and the table view. */
    unit: Bilingual;
    series: SeriesPoint[];
  };
  breakdown: {
    label: Bilingual;
    /** What the numbers count, for the table view's column header. */
    unit: Bilingual;
    items: Breakdown[];
  };
  feed: FeedEvent[];
}

/**
 * Chart palette.
 *
 * Validated against the six categorical-colour checks on this site's dark
 * chart surface (#0F172A): lightness band, chroma floor, CVD separation under
 * simulated protanopia/deuteranopia, normal-vision separation, and contrast.
 * Worst adjacent pair is ΔE 9.4 (deuteranopia), above the 8.0 target.
 *
 * Slots are assigned in this fixed order and never cycled — the order is what
 * makes the CVD guarantee hold. Derived from the brand ramp (blue primary,
 * teal secondary); deliberately no purple or indigo.
 */
export const CHART_COLORS = ['#3B82F6', '#0D9488', '#D97706', '#E11D48', '#0284C7'] as const;

export const CHART_SURFACE = '#0F172A';

/** Days of history shown in the trend panel. */
export const TREND_WINDOW_DAYS = 14;

/**
 * Mulberry32 — a small, fast, well-distributed 32-bit PRNG.
 *
 * Deterministic for a given seed, which is the whole point: server and client
 * must generate byte-identical series.
 */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Builds a plausible daily series: a gentle trend, a weekly rhythm, and
 * bounded noise. Weekly seasonality is what makes an operations chart read as
 * real data rather than a smooth curve — weekends genuinely differ.
 */
function buildSeries({
  seed,
  base,
  trendPerDay,
  weeklyAmplitude,
  noise,
  weekendPeakDays = [4, 5],
}: {
  seed: number;
  base: number;
  trendPerDay: number;
  weeklyAmplitude: number;
  noise: number;
  /** Day-of-week indices that run hot (0 = the window's first day). */
  weekendPeakDays?: number[];
}): SeriesPoint[] {
  const rand = seededRandom(seed);
  return Array.from({ length: TREND_WINDOW_DAYS }, (_, day) => {
    const dayOfWeek = day % 7;
    const weekly = weekendPeakDays.includes(dayOfWeek) ? weeklyAmplitude : -weeklyAmplitude / 3;
    const jitter = (rand() - 0.5) * 2 * noise;
    const value = base + trendPerDay * day + weekly + jitter;
    return { day, value: Math.max(0, Math.round(value)) };
  });
}

export const DASHBOARD_MODULES: DashboardModule[] = [
  {
    id: 'restaurant',
    product: 'Novixa Restaurant',
    label: { ar: 'المطاعم والمقاهي', en: 'Restaurants & Cafés' },
    purpose: {
      ar: 'شاشة تشغيل الفرع: الطلبات الواردة، طابور المطبخ، وزمن التحضير لحظة بلحظة.',
      en: 'The branch floor view: incoming orders, the kitchen queue, and prep time as it happens.',
    },
    kpis: [
      {
        id: 'orders',
        label: { ar: 'طلبات اليوم', en: 'Orders today' },
        value: '312',
        delta: '+8.4%',
        deltaDirection: 'up-good',
        caption: { ar: 'مقارنة بالأسبوع الماضي', en: 'vs. same day last week' },
      },
      {
        id: 'prep',
        label: { ar: 'متوسط زمن التحضير', en: 'Avg. prep time' },
        value: '11:20',
        delta: '−2:05',
        deltaDirection: 'down-good',
        caption: { ar: 'من استلام الطلب حتى التقديم', en: 'ticket accepted → served' },
      },
      {
        id: 'queue',
        label: { ar: 'طابور المطبخ الآن', en: 'Kitchen queue now' },
        value: '7',
        delta: null,
        deltaDirection: 'neutral',
        caption: { ar: 'تذاكر مفتوحة على شاشة KDS', en: 'open tickets on the KDS' },
      },
      {
        id: 'waste',
        label: { ar: 'هدر المواد', en: 'Ingredient waste' },
        value: '3.1%',
        delta: '−1.4pt',
        deltaDirection: 'down-good',
        caption: { ar: 'من إجمالي الاستهلاك', en: 'of total consumption' },
      },
    ],
    trend: {
      label: { ar: 'الطلبات اليومية', en: 'Daily orders' },
      unit: { ar: 'طلب', en: 'orders' },
      series: buildSeries({ seed: 1471, base: 268, trendPerDay: 2.6, weeklyAmplitude: 46, noise: 18 }),
    },
    breakdown: {
      label: { ar: 'الطلبات حسب القناة', en: 'Orders by channel' },
      unit: { ar: 'طلب', en: 'orders' },
      items: [
        { id: 'qr', label: { ar: 'قائمة QR على الطاولة', en: 'QR menu at table' }, value: 138 },
        { id: 'counter', label: { ar: 'نقطة البيع (الكاشير)', en: 'Counter POS' }, value: 94 },
        { id: 'delivery', label: { ar: 'التوصيل', en: 'Delivery' }, value: 52 },
        { id: 'phone', label: { ar: 'الهاتف والواتساب', en: 'Phone & WhatsApp' }, value: 28 },
      ],
    },
    feed: [
      { id: 'r1', minutesAgo: 2, severity: 'ok', text: { ar: 'تذكرة #4471 خرجت من المطبخ خلال 9:12 دقيقة.', en: 'Ticket #4471 cleared the kitchen in 9:12.' } },
      { id: 'r2', minutesAgo: 9, severity: 'warn', text: { ar: 'صنف «دجاج مشوي» اقترب من حد إعادة الطلب (4 حصص متبقية).', en: '"Grilled chicken" hit its reorder threshold — 4 portions left.' } },
      { id: 'r3', minutesAgo: 17, severity: 'info', text: { ar: 'فتح الفرع الثاني وردية المساء ومزامنة المخزون تمت.', en: 'Second branch opened the evening shift; stock synced.' } },
      { id: 'r4', minutesAgo: 31, severity: 'ok', text: { ar: 'دفعة إلكترونية بقيمة 18,400 تمت التسوية بنجاح.', en: 'Card batch of 18,400 settled successfully.' } },
    ],
  },
  {
    id: 'booking',
    product: 'Novixa Booking',
    label: { ar: 'الحجوزات والمواعيد', en: 'Bookings & Appointments' },
    purpose: {
      ar: 'جدول اليوم وحالة التأكيدات: من أكد، من لم يحضر، وأين توجد فجوة قابلة للبيع.',
      en: "Today's schedule and confirmation state: who confirmed, who did not show, and where a sellable gap sits.",
    },
    kpis: [
      {
        id: 'booked',
        label: { ar: 'حجوزات اليوم', en: 'Bookings today' },
        value: '86',
        delta: '+11.9%',
        deltaDirection: 'up-good',
        caption: { ar: 'مقارنة بالأسبوع الماضي', en: 'vs. same day last week' },
      },
      {
        id: 'noshow',
        label: { ar: 'نسبة عدم الحضور', en: 'No-show rate' },
        value: '4.6%',
        delta: '−9.2pt',
        deltaDirection: 'down-good',
        caption: { ar: 'بعد تفعيل تأكيد الواتساب', en: 'since WhatsApp confirmation went live' },
      },
      {
        id: 'utilisation',
        label: { ar: 'إشغال الجدول', en: 'Schedule utilisation' },
        value: '78%',
        delta: '+6pt',
        deltaDirection: 'up-good',
        caption: { ar: 'من الساعات المتاحة', en: 'of available hours' },
      },
      {
        id: 'deposit',
        label: { ar: 'حجوزات بعربون', en: 'Deposit-backed' },
        value: '61%',
        delta: null,
        deltaDirection: 'neutral',
        caption: { ar: 'دفعت مقدماً لتأكيد الموعد', en: 'prepaid to hold the slot' },
      },
    ],
    trend: {
      label: { ar: 'الحجوزات المؤكدة يومياً', en: 'Confirmed bookings per day' },
      unit: { ar: 'حجز', en: 'bookings' },
      series: buildSeries({ seed: 8823, base: 64, trendPerDay: 1.1, weeklyAmplitude: 14, noise: 7 }),
    },
    breakdown: {
      label: { ar: 'مصدر الحجز', en: 'Booking source' },
      unit: { ar: 'حجز', en: 'bookings' },
      items: [
        { id: 'self', label: { ar: 'حجز ذاتي عبر الرابط', en: 'Self-service link' }, value: 44 },
        { id: 'reception', label: { ar: 'الاستقبال', en: 'Reception desk' }, value: 22 },
        { id: 'whatsapp', label: { ar: 'واتساب', en: 'WhatsApp' }, value: 14 },
        { id: 'walkin', label: { ar: 'بدون موعد', en: 'Walk-in' }, value: 6 },
      ],
    },
    feed: [
      { id: 'b1', minutesAgo: 4, severity: 'ok', text: { ar: 'تأكيد حضور تلقائي لـ 12 موعداً في نافذة الـ 24 ساعة.', en: 'Auto-confirmed 12 appointments in the 24-hour window.' } },
      { id: 'b2', minutesAgo: 13, severity: 'info', text: { ar: 'فجوة 45 دقيقة في جدول د. الطبيب أُتيحت للحجز الفوري.', en: 'A 45-minute gap was released back for instant booking.' } },
      { id: 'b3', minutesAgo: 26, severity: 'warn', text: { ar: 'موعدان بدون عربون تجاوزا مهلة التأكيد.', en: 'Two deposit-free slots passed their confirmation deadline.' } },
      { id: 'b4', minutesAgo: 48, severity: 'ok', text: { ar: 'مزامنة التقويم مع جهاز الاستقبال اكتملت.', en: 'Calendar synced with the reception terminal.' } },
    ],
  },
  {
    id: 'aqar',
    product: 'Novixa Aqar',
    label: { ar: 'العقارات والمحافظ', en: 'Property & Portfolio' },
    purpose: {
      ar: 'حالة المحفظة: الوحدات المشغولة، التحصيل المستحق، والعقود التي تقترب من التجديد.',
      en: 'Portfolio state: occupied units, collections due, and contracts approaching renewal.',
    },
    kpis: [
      {
        id: 'occupancy',
        label: { ar: 'نسبة الإشغال', en: 'Occupancy' },
        value: '91%',
        delta: '+3pt',
        deltaDirection: 'up-good',
        caption: { ar: 'من إجمالي 240 وحدة', en: 'across 240 units' },
      },
      {
        id: 'collection',
        label: { ar: 'كفاءة التحصيل', en: 'Collection rate' },
        value: '94.2%',
        delta: '+7.8pt',
        deltaDirection: 'up-good',
        caption: { ar: 'محصل خلال شهر الاستحقاق', en: 'collected within the due month' },
      },
      {
        id: 'overdue',
        label: { ar: 'دفعات متأخرة', en: 'Overdue payments' },
        value: '11',
        delta: '−6',
        deltaDirection: 'down-good',
        caption: { ar: 'تجاوزت تاريخ الاستحقاق', en: 'past their due date' },
      },
      {
        id: 'renewals',
        label: { ar: 'تجديدات خلال 30 يوماً', en: 'Renewals in 30 days' },
        value: '18',
        delta: null,
        deltaDirection: 'neutral',
        caption: { ar: 'عقود تحتاج إجراءً', en: 'contracts needing action' },
      },
    ],
    trend: {
      label: { ar: 'التحصيل اليومي', en: 'Daily collections' },
      unit: { ar: 'دفعة', en: 'payments' },
      series: buildSeries({ seed: 3391, base: 22, trendPerDay: 0.5, weeklyAmplitude: 9, noise: 5, weekendPeakDays: [0, 1] }),
    },
    breakdown: {
      label: { ar: 'الوحدات حسب النوع', en: 'Units by type' },
      unit: { ar: 'وحدة', en: 'units' },
      items: [
        { id: 'residential', label: { ar: 'سكني', en: 'Residential' }, value: 132 },
        { id: 'commercial', label: { ar: 'تجاري', en: 'Commercial' }, value: 64 },
        { id: 'office', label: { ar: 'مكتبي', en: 'Office' }, value: 30 },
        { id: 'storage', label: { ar: 'مستودعات', en: 'Storage' }, value: 14 },
      ],
    },
    feed: [
      { id: 'a1', minutesAgo: 6, severity: 'ok', text: { ar: 'سند قبض آلي صدر لدفعة إيجار الوحدة B-204.', en: 'Receipt issued automatically for unit B-204 rent.' } },
      { id: 'a2', minutesAgo: 22, severity: 'warn', text: { ar: '3 عقود تنتهي خلال 14 يوماً بدون إشعار تجديد.', en: 'Three contracts expire within 14 days with no renewal notice sent.' } },
      { id: 'a3', minutesAgo: 40, severity: 'info', text: { ar: 'طلب صيانة جديد من المستأجر في المجمع الشمالي.', en: 'New maintenance request from a tenant in the north complex.' } },
      { id: 'a4', minutesAgo: 71, severity: 'ok', text: { ar: 'تسوية عمولة وسيط لصفقتي تأجير.', en: 'Broker commission settled for two lease deals.' } },
    ],
  },
  {
    id: 'pulse',
    product: 'Novixa Pulse',
    label: { ar: 'نبض المؤسسة', en: 'Workforce Pulse' },
    purpose: {
      ar: 'ما الذي يقوله الفريق فعلاً: معدل المشاركة، المواضيع المتكررة، وسرعة إغلاق الملاحظة.',
      en: 'What the team is actually saying: participation, recurring themes, and how fast a note gets closed.',
    },
    kpis: [
      {
        id: 'participation',
        label: { ar: 'معدل المشاركة', en: 'Participation' },
        value: '68%',
        delta: '+21pt',
        deltaDirection: 'up-good',
        caption: { ar: 'من الموظفين النشطين', en: 'of active employees' },
      },
      {
        id: 'score',
        label: { ar: 'مؤشر النبض', en: 'Pulse score' },
        value: '7.4',
        delta: '+0.6',
        deltaDirection: 'up-good',
        caption: { ar: 'من 10، متوسط الربع', en: 'out of 10, quarter average' },
      },
      {
        id: 'resolution',
        label: { ar: 'زمن إغلاق الملاحظة', en: 'Time to resolve' },
        value: '4.2', // days
        delta: '−2.9',
        deltaDirection: 'down-good',
        caption: { ar: 'أيام، من الرفع حتى الإغلاق', en: 'days, raised → closed' },
      },
      {
        id: 'open',
        label: { ar: 'ملاحظات مفتوحة', en: 'Open notes' },
        value: '23',
        delta: null,
        deltaDirection: 'neutral',
        caption: { ar: 'بانتظار رد الإدارة', en: 'awaiting a management reply' },
      },
    ],
    trend: {
      label: { ar: 'الملاحظات المرفوعة يومياً', en: 'Notes submitted per day' },
      unit: { ar: 'ملاحظة', en: 'notes' },
      series: buildSeries({ seed: 5507, base: 14, trendPerDay: 0.35, weeklyAmplitude: 6, noise: 4, weekendPeakDays: [0, 1, 2] }),
    },
    breakdown: {
      label: { ar: 'الملاحظات حسب الموضوع', en: 'Notes by theme' },
      unit: { ar: 'ملاحظة', en: 'notes' },
      items: [
        { id: 'operational', label: { ar: 'عوائق تشغيلية', en: 'Operational blockers' }, value: 71 },
        { id: 'tools', label: { ar: 'أدوات وأنظمة', en: 'Tools & systems' }, value: 48 },
        { id: 'culture', label: { ar: 'بيئة العمل', en: 'Work environment' }, value: 34 },
        { id: 'ideas', label: { ar: 'مقترحات تطوير', en: 'Improvement ideas' }, value: 27 },
      ],
    },
    feed: [
      { id: 'p1', minutesAgo: 8, severity: 'info', text: { ar: 'تصنيف آلي: 6 ملاحظات جديدة ضمن «عوائق تشغيلية».', en: 'Auto-classified: 6 new notes under "operational blockers".' } },
      { id: 'p2', minutesAgo: 19, severity: 'ok', text: { ar: 'إغلاق ملاحظة حول بطء نظام الحضور بعد نشر التحديث.', en: 'Closed a note on slow attendance sign-in after the patch shipped.' } },
      { id: 'p3', minutesAgo: 44, severity: 'warn', text: { ar: 'موضوع «ورديات نهاية الأسبوع» تكرر 9 مرات هذا الأسبوع.', en: '"Weekend shifts" recurred 9 times this week.' } },
      { id: 'p4', minutesAgo: 95, severity: 'ok', text: { ar: 'استطلاع الربع أُغلق بمشاركة 68%.', en: 'Quarterly pulse closed at 68% participation.' } },
    ],
  },
];

export function getModule(id: ModuleId): DashboardModule {
  const found = DASHBOARD_MODULES.find((m) => m.id === id);
  if (!found) throw new Error(`Unknown dashboard module: ${id}`);
  return found;
}

/** Picks the locale side of a bilingual value. */
export function pick(value: Bilingual, lang: Language): string {
  return lang === 'ar' ? value.ar : value.en;
}
