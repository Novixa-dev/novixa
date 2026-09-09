'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Linkedin, Github, Twitter } from 'lucide-react';
import { TeamMember } from '../data/team';
import { useLanguage } from '../context/LanguageContext';

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, index = 0 }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const displayName = isEn && member.nameEn ? member.nameEn : member.name;
  const displayRole = isEn && member.roleEn ? member.roleEn : member.role;
  const displayBio = isEn && member.bioEn ? member.bioEn : member.bio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
      className="group glass-card rounded-2xl p-6 sm:p-7 border border-slate-800 bg-slate-900/70 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Top Subtle Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Member Avatar */}
      <div className="relative w-[120px] h-[120px] mb-5 rounded-full p-1 bg-gradient-to-b from-blue-500/30 via-slate-800 to-slate-900 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-300 shadow-lg shadow-slate-950/50">
        <Image
          src={member.image}
          alt={displayName}
          width={120}
          height={120}
          className="w-full h-full object-cover rounded-full bg-slate-800"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15 pointer-events-none" />
      </div>

      {/* Name and Role */}
      <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors tracking-tight">
        {displayName}
      </h3>
      <p className="text-xs font-semibold text-blue-400 font-mono tracking-wide mt-1.5 mb-3 bg-blue-950/60 border border-blue-800/40 px-3 py-1 rounded-full">
        {displayRole}
      </p>

      {/* Bio / Experience (High Contrast text-slate-300 for WCAG AA) */}
      <p className="text-sm text-slate-300 font-arabic leading-relaxed flex-grow max-w-xs mb-5">
        {displayBio}
      </p>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-2.5 pt-4 border-t border-slate-800/80 w-full mt-auto">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${displayName} LinkedIn`}
          className="p-2 rounded-lg bg-slate-950 text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-400 border border-slate-800 transition-all duration-200"
          title="LinkedIn"
        >
          <Linkedin className="w-4 h-4" aria-hidden="true" />
        </a>
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${displayName} GitHub`}
          className="p-2 rounded-lg bg-slate-950 text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-400 border border-slate-800 transition-all duration-200"
          title="GitHub"
        >
          <Github className="w-4 h-4" aria-hidden="true" />
        </a>
        <a
          href={member.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${displayName} Twitter`}
          className="p-2 rounded-lg bg-slate-950 text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-400 border border-slate-800 transition-all duration-200"
          title="Twitter (X)"
        >
          <Twitter className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </motion.div>
  );
};
export default TeamCard;
