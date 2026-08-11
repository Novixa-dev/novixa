import { LeadService } from '../src/lib/leads/service';
import { SQLiteLeadRepository } from '../src/lib/leads/sqlite-repository';

async function runTests() {
  console.log('🧪 [Novixa QA] Starting Automated Test Suite for LeadService...');

  const repository = new SQLiteLeadRepository();
  const service = new LeadService(repository);

  let passed = 0;
  let failed = 0;

  // Test 1: Submit valid lead
  try {
    const res = await service.submitLead({
      name: 'Dr. Faisal Al-Mansoor',
      email: 'faisal@healthtech.sa',
      company: 'Riyadh Health Group',
      projectType: 'custom_software',
      industry: 'healthcare',
      operationalProblem: 'HL7 / FHIR Integration latency',
      budgetRange: '$25k - $50k',
      timeline: '1-3 months',
      language: 'ar'
    });

    if (res.success && res.lead.id && res.lead.status === 'NEW') {
      console.log('✅ Test 1 Passed: Valid lead registered successfully in SQLite.');
      passed++;
    } else {
      console.error('❌ Test 1 Failed:', res);
      failed++;
    }
  } catch (e) {
    console.error('❌ Test 1 Exception:', e);
    failed++;
  }

  // Test 2: Reject missing name
  try {
    const res = await service.submitLead({
      name: '',
      email: 'test@novixa.io',
      projectType: 'saas_product',
      industry: 'hospitality'
    });

    if (res.success === false && res.error.includes('name')) {
      console.log('✅ Test 2 Passed: Missing contact name correctly rejected.');
      passed++;
    } else {
      console.error('❌ Test 2 Failed:', res);
      failed++;
    }
  } catch (e) {
    console.error('❌ Test 2 Exception:', e);
    failed++;
  }

  // Test 3: Reject invalid email
  try {
    const res = await service.submitLead({
      name: 'Sami',
      email: 'invalid-email-format',
      projectType: 'saas_product',
      industry: 'logistics'
    });

    if (res.success === false && res.error.includes('email')) {
      console.log('✅ Test 3 Passed: Invalid email format correctly rejected.');
      passed++;
    } else {
      console.error('❌ Test 3 Failed:', res);
      failed++;
    }
  } catch (e) {
    console.error('❌ Test 3 Exception:', e);
    failed++;
  }

  // Test 4: Retrieve created leads
  try {
    const leads = await service.getAllLeads();
    if (leads.length > 0 && leads[0].name === 'Dr. Faisal Al-Mansoor') {
      console.log('✅ Test 4 Passed: Retrieved leads array matches database record.');
      passed++;
    } else {
      console.error('❌ Test 4 Failed: Count mismatch or lead missing.');
      failed++;
    }
  } catch (e) {
    console.error('❌ Test 4 Exception:', e);
    failed++;
  }

  console.log(`\n📊 Test Summary: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
