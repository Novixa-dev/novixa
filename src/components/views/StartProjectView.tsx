'use client';

import React from 'react';
import { ProjectDiscoveryWizard } from '../sections/ProjectDiscoveryWizard';

export const StartProjectView: React.FC = () => {
  return (
    <div className="bg-slate-950">
      <ProjectDiscoveryWizard />
    </div>
  );
};
