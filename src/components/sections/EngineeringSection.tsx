'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Cpu, ShieldCheck, Zap, Database, Server, Lock, Cloud, Globe } from 'lucide-react';

export const EngineeringSection: React.FC = () => {
  const { isRtl, t } = useLanguage();

  const techGroups = [
    { category: 'Frontend', techs: ['React 19', 'Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend & APIs', techs: ['Node.js', 'Express', 'TypeScript ESM', 'WebSockets', 'REST & GraphQL'] },
    { category: 'Cloud Infrastructure', techs: ['Vercel Edge', 'Docker Containers', 'Cloud Run', 'Redis Cache', 'CDN Edge'] },
    { category: 'Database & Security', techs: ['PostgreSQL', 'Firestore', 'SOC2 Isolation', '256-Bit SSL', 'OAuth 2.0'] },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono font-medium tracking-wide">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t('الفلسفة الهندسية', 'Engineering Philosophy')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            {t('وراء كل تجربة بسيطة،', 'Behind every simple experience,')} <br />
            <span className="text-white">{t('هندسة برمجية قوية ومحكمة.', 'lies a robust engineering core.')}</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-arabic">
            {t(
              'لا نكتفي بجعل الواجهات جميلة. نبني معمارية برمجية فائقة الأمان، سريعة الاستجابة بالملي ثانية، ومصممة لتحمل ملايين الطلبات.',
              'We don\'t just design sleek interfaces. We engineer high-availability cloud architecture built for sub-second response speeds and strict SOC2 compliance.'
            )}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              titleAr: 'معمارية سحابية مرنة',
              titleEn: 'Elastic Cloud Core',
              descAr: 'توسع تلقائي للموارد أثناء الذروة لمنع البطء والتوقف.',
              descEn: 'Auto-scaling infrastructure handling high traffic spikes without downtime.',
              icon: Cloud,
              color: 'text-slate-300'
            },
            {
              titleAr: 'أمن وعزل البيانات',
              titleEn: 'Data Isolation & Security',
              descAr: 'تشفير كامل وضوابط وصول دقيقة لحماية بيانات الشركات.',
              descEn: 'Strict tenant boundary encryption and role-based access control.',
              icon: ShieldCheck,
              color: 'text-slate-300'
            },
            {
              titleAr: 'تراسل فوري (Real-Time)',
              titleEn: 'Real-Time WebSockets',
              descAr: 'تحديثات مباشرة بالثواني للطلبات والمخزون والمواعيد.',
              descEn: 'Sub-second WebSocket pipelines for order queues and inventory updates.',
              icon: Zap,
              color: 'text-slate-300'
            },
            {
              titleAr: 'واجهات برمجة APIs حديثة',
              titleEn: 'Modular API Architecture',
              descAr: 'ربط سلس مع بوابات الدفع وبرامج الفوترة وشركات الشحن.',
              descEn: 'Clean REST & GraphQL endpoints for seamless ERP & payment gateway integration.',
              icon: Server,
              color: 'text-slate-300'
            },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="bg-[#0b1120] rounded-xl p-6 border border-slate-800 text-right rtl:text-right ltr:text-left space-y-4 hover:border-slate-700 transition-colors">
                <div className={`p-3 rounded-lg bg-slate-900 border border-slate-800 inline-block ${item.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display mb-1.5">
                    {t(item.titleAr, item.titleEn)}
                  </h3>
                  <p className="text-sm text-slate-400 font-arabic leading-relaxed">
                    {t(item.descAr, item.descEn)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Groups */}
        <div className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold font-display text-white">
              {t('منظومة التقنيات المعتمدة لدى نوڤيكسا', 'Novixa Engineering Stack')}
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {t('تقنيات حديثة مجربة ومستقرة', 'Battle-tested Production Stack')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right rtl:text-right ltr:text-left">
            {techGroups.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.techs.map((tItem, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
