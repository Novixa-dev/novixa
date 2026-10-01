import React from 'react';
import { ProjectDiscoveryWizard } from '../sections/ProjectDiscoveryWizard';

/**
 * Thin wrapper around the discovery wizard.
 *
 * Takes no `lang`: the wizard is a client component with real form state and
 * reads the locale from `useLanguage()` itself. Threading a prop through here
 * would be a parameter that exists only to be ignored.
 */
export const StartProjectView: React.FC = () => {
  return (
    <div className="bg-slate-950">
      <ProjectDiscoveryWizard />
    </div>
  );
};
