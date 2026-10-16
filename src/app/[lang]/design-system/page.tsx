import React from 'react';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbJsonLd } from '@/lib/metadata';
import {
  ACCESSIBILITY_RULES,
  CHART_PALETTE,
  DIRECTION_RULES,
  RADIUS_SCALE,
  STATUS_COLORS,
  SURFACE_COLORS,
  SURFACE_RULES,
  TYPE_SCALE,
  TYPOGRAPHY_RULES,
  VERIFICATION_FACTS,
  type Rule,
} from '@/content/design-system';
import { Ruler, Palette, Type, Layers, Languages, Accessibility, CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'نظام التصميم ومعايير الهندسة' : 'Design System & Engineering Standards',
    description: isAr
      ? 'القواعد التي يُبنى بها هذا الموقع فعلاً: الألوان بنسب تباينها المقيسة، تدرّج الحواف، نظام الخطوط العربي واللاتيني، قواعد الاتجاه RTL، والتزامات الوصولية بالأرقام التي تثبتها.'
      : 'The rules this site is actually built on: colours with their measured contrast ratios, the radius scale, the Arabic and Latin type system, the RTL direction rules, and the accessibility commitments with the numbers behind them.',
    lang,
    path: 'design-system',
    eyebrow: isAr ? 'نظام التصميم' : 'Design system',
  });
}

/** Shared renderer for the four rule clusters — the shape is identical. */
function RuleList({ rules, locale }: { rules: Rule[]; locale: 'ar' | 'en' }) {
  return (
    <div className="space-y-3">
      {rules.map((rule) => (
        <div
          key={rule.title.en}
          className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-2 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)]"
        >
          <h3 className="text-sm font-bold text-slate-900 leading-snug">{rule.title[locale]}</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-arabic">{rule.body[locale]}</p>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: typeof Palette;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-bold font-display uppercase tracking-wider text-cyan-800 border-b border-slate-200/80 pb-2">
      <Icon className="w-4 h-4 text-cyan-600" aria-hidden="true" />
      {children}
    </h2>
  );
}

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const locale = isAr ? 'ar' : 'en';

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'نظام التصميم' : 'Design system', url: `/${lang}/design-system` },
  ]);

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 text-right rtl:text-right ltr:text-left">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
            <Ruler className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
            <span>{isAr ? 'نظام التصميم' : 'Design system'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {isAr
              ? 'القواعد التي بُني بها هذا الموقع، لا القواعد التي نقول إننا نتبعها.'
              : 'The rules this site is built on, not the rules we say we follow.'}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-arabic leading-relaxed">
            {isAr
              ? 'كل قيمة في هذه الصفحة مقروءة من الكود نفسه، وكل رقم فيها نتيجة قياس لا تقدير. إن كنت تقيّمنا كشريك هندسي فهذه الصفحة هي الدليل: نفس الصرامة التي نطبّقها على موقعنا هي التي ستحصل عليها في نظامك.'
              : 'Every value on this page is read off the implementation, and every number is measured rather than estimated. If you are evaluating us as an engineering partner, this page is the evidence: the rigour applied to our own site is the rigour your system gets.'}
          </p>
        </header>

        <section className="space-y-4">
          <SectionHeading icon={CheckCircle2}>
            {isAr ? 'ما يتحقق تلقائياً' : 'What is verified automatically'}
          </SectionHeading>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {VERIFICATION_FACTS.map((fact) => (
              <div
                key={fact.label.en}
                className="bg-white rounded-xl border border-slate-200/90 p-4 space-y-1 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)]"
              >
                <dd className="text-xl font-bold font-display text-slate-900">{fact.value}</dd>
                <dt className="text-xs text-slate-500 font-arabic leading-relaxed">
                  {fact.label[locale]}
                </dt>
              </div>
            ))}
          </dl>
          <p className="text-xs text-slate-500 font-arabic leading-relaxed">
            {isAr
              ? 'كل رقم أعلاه يُنتجه أمر في هذا المستودع: npm run typecheck · lint · test · build · test:e2e، و Lighthouse على كل صفحة مُعدّلة.'
              : 'Each figure above is produced by a command in this repository: npm run typecheck · lint · test · build · test:e2e, and Lighthouse on every page touched.'}
          </p>
        </section>

        <section className="space-y-4">
          <SectionHeading icon={Palette}>{isAr ? 'الألوان' : 'Colour'}</SectionHeading>
          <p className="text-sm text-slate-600 font-arabic leading-relaxed">
            {isAr
              ? 'قماش رمادي-أزرق عميق، أزرق ملكي للإجراء، وأخضر مزرق ثانوي. لا بنفسجي ولا نيلي في أي مكان — وهذا قرار مقصود ضد المظهر النمطي لمنتجات SaaS، لا سهو.'
              : 'A deep slate canvas, royal blue for action, a teal secondary. No purple or indigo anywhere — a deliberate decision against the generic SaaS look, not an oversight.'}
          </p>
          <ul className="space-y-3">
            {[...SURFACE_COLORS, ...STATUS_COLORS].map((token) => (
              <li
                key={token.name}
                className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-start gap-4 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)]"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 w-10 h-10 shrink-0 rounded-lg border border-slate-300 shadow-sm"
                  style={{ backgroundColor: token.value }}
                />
                <div className="space-y-1 min-w-0">
                  <p className="flex flex-wrap items-center gap-2">
                    <code className="font-mono text-sm text-slate-900 font-bold" translate="no">
                      {token.value}
                    </code>
                    <span className="text-xs text-slate-500 font-mono" translate="no">
                      {token.name}
                    </span>
                    {token.contrast && (
                      <span className="text-xs text-cyan-700 font-mono font-medium" translate="no">
                        {token.contrast}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed font-arabic">
                    {token.role[locale]}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-3 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)]">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'لوحة الرسوم البيانية' : 'The chart palette'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {CHART_PALETTE.map((color) => (
                <span key={color} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 rounded-md border border-slate-300 shadow-xs"
                    style={{ backgroundColor: color }}
                  />
                  <code className="font-mono text-xs text-slate-500" translate="no">
                    {color}
                  </code>
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-arabic">
              {isAr
                ? 'خمسة ألوان فئوية اجتازت جميع الفحوص الخمسة، وأسوأ زوج متجاور بينها يفصله ΔE قدره 9.4 تحت محاكاة عمى الأحمر-الأخضر (الحد المستهدف 8.0). ولأن اللون وحده لا يكفي، تعرض لوحة التشغيل نفس البيانات في جدول.'
                : 'Five categorical colours that pass all five checks, with the worst adjacent pair separated by ΔE 9.4 under simulated deuteranopia (target 8.0). Because colour alone is never enough, the console presents the same data as a table.'}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeading icon={Type}>{isAr ? 'الخطوط' : 'Typography'}</SectionHeading>
          <ul className="space-y-3">
            {TYPE_SCALE.map((token) => (
              <li
                key={token.family}
                className="bg-white rounded-xl border border-slate-200/90 p-4 space-y-1 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)]"
              >
                <p className="flex flex-wrap items-baseline gap-2">
                  <span className="text-base font-bold text-slate-900" translate="no">
                    {token.family}
                  </span>
                  <code className="font-mono text-xs text-slate-500" translate="no">
                    var({token.variable})
                  </code>
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-arabic">
                  {token.usage[locale]}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 font-arabic leading-relaxed">
            {isAr
              ? 'الثلاثة محمّلة ومستضافة ذاتياً عبر next/font — لا طلب خارجي إلى Google Fonts عند التشغيل، ولا وسوم <link> تعطّل الرسم.'
              : 'All three are self-hosted through next/font — no runtime request to Google Fonts, no render-blocking <link> tags.'}
          </p>
          <RuleList rules={TYPOGRAPHY_RULES} locale={locale} />
        </section>

        <section className="space-y-4">
          <SectionHeading icon={Layers}>
            {isAr ? 'الأسطح وتدرّج الحواف' : 'Surfaces and the radius scale'}
          </SectionHeading>
          <ul className="grid sm:grid-cols-2 gap-3">
            {RADIUS_SCALE.map((token) => (
              <li
                key={token.name}
                className="bg-white border border-slate-200/90 p-4 space-y-2 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)]"
                style={{ borderRadius: Math.min(token.px, 16) }}
              >
                <p className="flex items-baseline gap-2">
                  <code className="font-mono text-sm text-slate-900 font-bold" translate="no">
                    {token.name}
                  </code>
                  <span className="text-xs text-slate-500 font-mono" translate="no">
                    {token.px === 999 ? '∞' : `${token.px}px`}
                  </span>
                </p>
                <p className="text-sm text-slate-600 font-arabic leading-relaxed">
                  {token.usage[locale]}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 font-arabic leading-relaxed">
            {isAr
              ? 'العلاقة بين المستويات هي القاعدة لا القيم نفسها: الحاوية الخارجية دائماً أوسع حافة من البطاقة داخلها.'
              : 'The relationship between the levels is the rule, not the values themselves: an outer container is always rounder than the card inside it.'}
          </p>
          <RuleList rules={SURFACE_RULES} locale={locale} />
        </section>

        <section className="space-y-4">
          <SectionHeading icon={Languages}>
            {isAr ? 'الاتجاه واللغة' : 'Direction and language'}
          </SectionHeading>
          <RuleList rules={DIRECTION_RULES} locale={locale} />
        </section>

        <section className="space-y-4">
          <SectionHeading icon={Accessibility}>
            {isAr ? 'الوصولية' : 'Accessibility'}
          </SectionHeading>
          <RuleList rules={ACCESSIBILITY_RULES} locale={locale} />
        </section>

        <aside className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)]">
          <h2 className="text-lg font-bold font-display text-slate-900 leading-snug">
            {isAr ? 'تريد هذا المستوى في نظامك؟' : 'Want this standard in your system?'}
          </h2>
          <p className="text-sm text-slate-600 font-arabic leading-relaxed">
            {isAr
              ? 'هذه الصفحة ليست عرضاً تسويقياً بل مواصفة. نكتب واحدة مثلها لكل نظام نبنيه، ويستلمها فريقك مع الكود.'
              : 'This page is a specification, not a pitch. We write one like it for every system we build, and your team receives it with the code.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/start-project`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-sm shadow-md shadow-[#38BDF8]/20 transition-all cursor-pointer"
            >
              {isAr ? 'ابدأ مشروعك' : 'Start your project'}
            </Link>
            <Link
              href={`/${lang}/dashboard`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-all"
            >
              {isAr ? 'شاهد لوحة التشغيل' : 'See the console'}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
