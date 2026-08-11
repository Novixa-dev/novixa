'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ViewType } from '../../types';
import { ProjectDiscoveryWizard } from '../sections/ProjectDiscoveryWizard';

interface StartProjectViewProps {
  onNavigate: (view: ViewType) => void;
}

export const StartProjectView: React.FC<StartProjectViewProps> = ({ onNavigate }) => {
  const { isRtl, t } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <ProjectDiscoveryWizard />
    </div>
  );
};
