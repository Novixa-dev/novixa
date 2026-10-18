import React from 'react';
import Link from 'next/link';
import {
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from '@/lib/metadata';
import { FAQ_ITEMS, FAQ_TOPICS, type FaqItem } from '@/content/faq';
import { getContentStore } from '@/lib/content-store';
import { MessageSquare } from 'lucide-react';
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

  const store = getContentStore();
  const storedFaqs = await store.listFaqs();
  const activeFaqs = storedFaqs.length > 0
    ? storedFaqs.filter((f) => f.status !== 'draft')
    : FAQ_ITEMS;

  // Built from the same array the page renders, so the markup cannot drift
  // away from the visible answers.
  const faqJsonLd = generateFaqJsonLd(
    activeFaqs.map((item) => ({
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
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

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
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {isAr ? 'أسئلة يطرحها كل عميل تقريباً.' : 'What almost every client asks first.'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-arabic leading-relaxed">
            {isAr
              ? 'إجابات مباشرة، دون لغة تسويقية. إن لم تجد سؤالك هنا، اسأله مباشرة وسيرد عليك مهندس لا موظف مبيعات.'
              : 'Direct answers, without the marketing register. If your question is not here, ask it — an engineer replies, not a salesperson.'}
          </p>
        </header>

        {topics.map((topic) => {
          const items = activeFaqs.filter((item) => item.topic === topic);
          if (items.length === 0) return null;

          return (
            <section key={topic} className="space-y-4">
              <h2 className="text-sm font-bold font-display uppercase tracking-wider text-cyan-800 border-b border-slate-200/90 pb-2">
                {FAQ_TOPICS[topic][locale]}
              </h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <details
                    key={item.id}
                    id={item.id}
                    className="group rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] overflow-hidden transition-all"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 hover:bg-slate-50/50 transition-colors">
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug font-display">
                        {item.question[locale]}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-mono text-cyan-600 font-bold text-lg leading-none transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                      <p className="text-sm text-slate-600 leading-relaxed font-arabic">
                        {item.answer[locale]}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}

        <aside className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-600" />
            <h2 className="text-lg font-bold font-display text-slate-900">
              {isAr ? 'سؤالك ليس هنا؟' : 'Question not covered?'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 font-arabic leading-relaxed">
            {isAr
              ? 'اكتب لنا مشكلتك التشغيلية بالتفصيل الذي تراه مناسباً. نقرأ كل طلب ونرد خلال يوم عمل واحد.'
              : 'Describe your operational problem in whatever detail suits you. We read every request and reply within one business day.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/start-project`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-sm shadow-md shadow-[#38BDF8]/20 transition-all cursor-pointer"
            >
              {isAr ? 'ابدأ مشروعك' : 'Start your project'}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm transition-colors cursor-pointer"
            >
              {isAr ? 'تواصل معنا' : 'Contact us'}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
