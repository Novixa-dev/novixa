import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { TeamCard } from '@/components/TeamCard';
import { TEAM_MEMBERS } from '@/data/team';
import { Language } from '@/types';
import Link from 'next/link';
import { Terminal, Users, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'فريق الهندسة والقيادة التقنية' : 'Engineering Core & Leadership Team',
    description: isAr
      ? 'تعرف على مهندسي ومطوري نوڤيكسا المتخصصين في بناء المنصات السحابية الموزعة، أنظمة الذكاء الاصطناعي، والمنتجات الرقمية عالية الأداء.'
      : 'Meet the engineers, architects, and product leads building resilient distributed platforms and AI systems at Novixa.',
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
      {/* Background Accent Ambient Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-600/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold shadow-inner">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'فريق نوڤيكسا الهندسي' : 'Novixa Engineering & Architecture'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {isAr
              ? 'عقول هندسية تبني أنظمة رقمية تعتمد عليها كبرى الأعمال.'
              : 'Architects and engineers building software you can rely on.'}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {isAr
              ? 'نخبة من مهندسي النظم الموزعة، مطوري الواجهات التفاعلية، وخبراء الذكاء الاصطناعي المكرسين لتحقيق التميز البرمجي والتشغيلي.'
              : 'A dedicated team of distributed systems engineers, full-stack builders, and AI architects committed to technical precision.'}
          </p>
        </div>

        {/* Team Grid: 3 cols on lg, 2 cols on md, 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Bottom Call to Action Card */}
        <div className="glass-card rounded-2xl p-8 sm:p-10 border border-slate-800 bg-slate-900/60 text-center space-y-6 max-w-4xl mx-auto relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-display text-white">
              {isAr ? 'هل تود العمل مع فريقنا الهندسي على مشروعك القادم؟' : 'Ready to engineer your next platform with our team?'}
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              {isAr
                ? 'نحن هنا لمناقشة أهدافك التقنية وتحويل المتطلبات المعقدة إلى برمجيات مستقرة وقابلة للتوسع.'
                : 'Discuss your technical roadmap and transform complex operations into resilient, scalable platforms.'}
            </p>
          </div>

          <div>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>{isAr ? 'تواصل مع الفريق الهندسي' : 'Connect with Engineering'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
