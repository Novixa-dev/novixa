import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { TeamCard } from '@/components/TeamCard';
import { ENGINEERING_DISCIPLINES, GOVERNANCE_STANDARDS } from '@/data/team';
import { Language } from '@/types';
import Link from 'next/link';
import { Shield, ArrowLeft, ArrowRight, Layers, CheckCircle2, GitBranch } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'التخصصات الهندسية ومنهجية المعمارية' : 'Engineering Disciplines & Methodology',
    description: isAr
      ? 'تعرف على تخصصات نوڤيكسا الهندسية في بناء النظم الموزعة، المنصات السحابية، والذكاء الاصطناعي المؤسسي وفق معايير الحوكمة البرمجية.'
      : 'Explore Novixa engineering disciplines across distributed systems, cloud platforms, and enterprise AI governed by strict architectural standards.',
    lang,
    path: 'team',
  });
}

export default async function TeamPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold shadow-inner">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'المنهجية والتخصصات الهندسية' : 'Engineering Disciplines & Delivery Model'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {isAr
              ? 'معايير هندسية صارمة لبناء أنظمة تعتمد عليها المؤسسات.'
              : 'Architectural precision engineered for high-concurrency systems.'}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {isAr
              ? 'نعمل في نوڤيكسا بنموذج الفرق الهندسية المخصصة (Dedicated Pods) التي تجمع بين هندسة النظم الموزعة، أمان السحابة، والذكاء الاصطناعي التطبيقي لتحقيق أعلى درجات الاستقرار.'
              : 'Novixa deploys specialized engineering pods uniting distributed architecture, cloud infrastructure security, and applied AI to achieve enterprise-grade resilience.'}
          </p>

          <div className="pt-1">
            <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-slate-300 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full">
              {isAr
                ? 'فرق هندسية متخصصة • نعمل بنموذج الفرق المخصصة'
                : 'Specialised engineering teams • Dedicated-pod model'}
            </span>
          </div>
        </div>

        {/* Disciplines Section: 2 cols on lg, 1 col on mobile */}
        <div className="space-y-8">
          <div className="text-right rtl:text-right ltr:text-left border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              {isAr ? 'مجالات التخصص الهندسي الأربعة' : 'Four Core Engineering Disciplines'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-arabic">
              {isAr
                ? 'كل ركن معماري يقوده مهندسون ذوو خبرة عميقة في بيئات العمل عالية الضغط'
                : 'Each architectural discipline is governed by engineers seasoned in high-stress production environments'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ENGINEERING_DISCIPLINES.map((discipline, index) => (
              <TeamCard key={discipline.id} discipline={discipline} index={index} />
            ))}
          </div>
        </div>

        {/* Governance & Architecture Standards Section */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 border border-white/[0.08] bg-slate-900/60 space-y-10">
          <div className="max-w-2xl text-right rtl:text-right ltr:text-left space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>{isAr ? 'حوكمة الجودة والتسليم' : 'Quality & Architecture Governance'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              {isAr
                ? 'كيف نكتشف العيوب المعمارية وتراجع الإصدارات قبل أن تصل إلى الإنتاج؟'
                : 'How we catch architectural flaws and regressions before they reach production'}
            </h2>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOVERNANCE_STANDARDS.map((std, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-950/80 border border-white/[0.06] flex flex-col justify-between space-y-4 text-right rtl:text-right ltr:text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold font-mono text-blue-400">{std.step}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      {std.metric}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-display text-white leading-snug">
                    {isAr ? std.titleAr : std.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                    {isAr ? std.descAr : std.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{isAr ? 'معيار إلزامي لكل مشروع' : 'Mandatory Project Standard'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action Card */}
        <div className="glass-card rounded-2xl p-8 sm:p-10 border border-white/[0.08] bg-slate-900/60 text-center space-y-6 max-w-4xl mx-auto relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center mx-auto">
            <GitBranch className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-display text-white">
              {isAr ? 'هل تود بناء نظامك القادم مع فريقنا الهندسي؟' : 'Ready to architect your platform with our engineering team?'}
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto font-arabic leading-relaxed">
              {isAr
                ? 'نحن هنا لمناقشة أهدافك التقنية، دراسة التحديات التشغيلية، وصياغة وثيقة معمارية واضحة المعالم.'
                : 'Discuss your technical roadmap and transform complex requirements into a resilient, scalable software platform.'}
            </p>
          </div>

          <div>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-600/25 transition-colors group"
            >
              <span>{isAr ? 'تواصل مع الاستشارات الهندسية' : 'Connect with Engineering Advisory'}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
