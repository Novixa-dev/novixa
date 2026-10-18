'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Server, Layers, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { EngineeringDiscipline } from '../data/team';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Server,
  Layers,
  Cpu,
  ShieldCheck,
};

interface TeamCardProps {
  discipline?: EngineeringDiscipline;
  index?: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ discipline, index = 0 }) => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  if (!discipline) return null;

  const IconComponent = iconMap[discipline.icon] || Server;
  const title = isAr ? discipline.titleAr : discipline.titleEn;
  const description = isAr ? discipline.descriptionAr : discipline.descriptionEn;
  const deliverables = isAr ? discipline.keyDeliverablesAr : discipline.keyDeliverablesEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="group rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] hover:border-cyan-500/40 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden text-right rtl:text-right ltr:text-left"
    >
      <div className="space-y-5">
        {/* Header with Icon */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center">
            <IconComponent className="w-6 h-6" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-sm text-slate-600 font-arabic leading-relaxed">
            {description}
          </p>
        </div>

        {/* Deliverables / Standards */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
            {t('المخرجات والمعايير المعمارية:', 'Architectural Standards:')}
          </div>
          <ul className="space-y-2">
            {deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-arabic leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="pt-5 mt-5 border-t border-slate-100">
        <div className="flex flex-wrap gap-1.5">
          {discipline.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
