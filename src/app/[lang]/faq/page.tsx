import React from 'react';
import Link from 'next/link';
import {
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from '@/lib/metadata';
import { FAQ_ITEMS, FAQ_TOPICS, type FaqItem } from '@/content/faq';
import { HelpCircle, MessageSquare } from 'lucide-react';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
    description: isAr
      ? 'إجابات مباشرة عن الأسئلة التي نُسأل عنها فعلاً: متى تختار نظاماً مخصصاً ومتى تكتفي بحل جاهز، مدة التنفيذ، ملكية الكود، الاستضافة، والصيانة بعد الإطلاق.'
      : 'Straight answers to what we are actually asked: when to build custom versus buy a ready solution, delivery timelines, code ownership, hosting, and what happens after launch.',
    lang,
    path: 'faq',
    eyebrow: isAr ? 'أسئلة شائعة' : 'FAQ',
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const locale = isAr ? 'ar' : 'en';

  // Built from the same array the page renders, so the markup cannot drift
  // away from the visible answers.
  const faqJsonLd = generateFaqJsonLd(
    FAQ_ITEMS.map((item) => ({
      question: item.question[locale],
      answer: item.answer[locale],
    }))
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'الأسئلة الشائعة' : 'FAQ', url: `/${lang}/faq` },
  ]);

  const topics = Object.keys(FAQ_TOPICS) as Array<FaqItem['topic']>;

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none -z-10" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-right rtl:text-right ltr:text-left">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'الأسئلة الشائعة' : 'Frequently asked'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white leading-snug">
            {isAr ? 'أسئلة يطرحها كل عميل تقريباً.' : 'What almost every client asks first.'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {isAr
              ? 'إجابات مباشرة، دون لغة تسويقية. إن لم تجد سؤالك هنا، اسأله مباشرة وسيرد عليك مهندس لا موظف مبيعات.'
              : 'Direct answers, without the marketing register. If your question is not here, ask it — an engineer replies, not a salesperson.'}
          </p>
        </header>

        {topics.map((topic) => {
          const items = FAQ_ITEMS.filter((item) => item.topic === topic);
          if (items.length === 0) return null;

          return (
            <section key={topic} className="space-y-4">
              <h2 className="text-sm font-bold font-display uppercase tracking-wider text-blue-400 border-b border-slate-800 pb-2">
                {FAQ_TOPICS[topic][locale]}
              </h2>

              <div className="space-y-3">
                {items.map((item) => (
                  // <details> gives working expand/collapse, in-page find, and
                  // keyboard support with no JavaScript and no client bundle.
                  <details
                    key={item.id}
                    id={item.id}
                    className="group glass-card rounded-2xl border border-white/[0.07] overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 hover:bg-white/[0.02] transition-colors">
                      <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                        {item.question[locale]}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-mono text-slate-400 text-lg leading-none transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 pt-1 border-t border-white/[0.05]">
                      <p className="text-sm text-slate-300 leading-relaxed font-arabic">
                        {item.answer[locale]}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}

        <aside className="glass-card rounded-2xl border border-white/[0.08] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-400" />
            <h2 className="text-lg font-bold font-display text-white">
              {isAr ? 'سؤالك ليس هنا؟' : 'Question not covered?'}
            </h2>
          </div>
          <p className="text-sm text-slate-300 font-arabic leading-relaxed">
            {isAr
              ? 'اكتب لنا مشكلتك التشغيلية بالتفصيل الذي تراه مناسباً. نقرأ كل طلب ونرد خلال يوم عمل واحد.'
              : 'Describe your operational problem in whatever detail suits you. We read every request and reply within one business day.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/start-project`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
            >
              {isAr ? 'ابدأ مشروعك' : 'Start your project'}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-slate-900/70 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-colors"
            >
              {isAr ? 'تواصل معنا' : 'Contact us'}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
