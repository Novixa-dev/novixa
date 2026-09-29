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
  const badge = isAr ? discipline.badgeAr : discipline.badgeEn;
  const description = isAr ? discipline.descriptionAr : discipline.descriptionEn;
  const deliverables = isAr ? discipline.keyDeliverablesAr : discipline.keyDeliverablesEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="group glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-slate-900/60 hover:border-blue-500/40 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden text-right rtl:text-right ltr:text-left"
    >
      <div className="space-y-5">
        {/* Header with Icon & Category Badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/80 text-blue-400 flex items-center justify-center">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono text-blue-300 bg-blue-950/60 border border-blue-900/60 px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display text-white group-hover:text-blue-300 transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-sm text-slate-300 font-arabic leading-relaxed">
            {description}
          </p>
        </div>

        {/* Deliverables / Standards */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            {t('المخرجات والمعايير المعمارية:', 'Architectural Standards:')}
          </div>
          <ul className="space-y-2">
            {deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-arabic leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="pt-5 mt-5 border-t border-slate-800/80">
        <div className="flex flex-wrap gap-1.5">
          {discipline.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono text-slate-300 bg-slate-950 border border-white/[0.06] px-2.5 py-1 rounded-md"
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
