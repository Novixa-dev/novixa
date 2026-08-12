export * from './leads/types';
export * from './leads/firestore-repository';
export * from './leads/service';

import { leadService } from './leads/service';

// Backwards-compatibility leadRepository object wrapping LeadService/SQLiteLeadRepository
export const leadRepository = {
  createLead: async (input: any) => {
    const result = await leadService.submitLead({
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      projectType: input.projectType,
      industry: input.industry,
      operationalProblem: input.problem || input.operationalProblem,
      currentSetup: input.existingSystem || input.currentSetup,
      budgetRange: input.budgetRange,
      timeline: input.timeline,
      message: input.details || input.message,
      language: input.language || 'ar',
      source: 'web_wizard'
    });

    if (result.success === false) {
      throw new Error(result.error);
    }

    return result.lead;
  },

  getLeads: async () => {
    return leadService.getAllLeads();
  }
};
