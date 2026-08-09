import { NextResponse } from 'next/server';
import { leadRepository, CreateLeadInput } from '@/lib/leads';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, industry } = body;

    if (!name || !String(name).trim()) {
      return NextResponse.json({ success: false, error: 'Contact name is required' }, { status: 400 });
    }

    if (!email || !String(email).includes('@') || !String(email).includes('.')) {
      return NextResponse.json({ success: false, error: 'Valid corporate email is required' }, { status: 400 });
    }

    if (!projectType || !industry) {
      return NextResponse.json({ success: false, error: 'Project type and industry sector are required' }, { status: 400 });
    }

    const leadInput: CreateLeadInput = {
      name: String(name).slice(0, 100),
      email: String(email).slice(0, 100),
      projectType: String(projectType).slice(0, 100),
      industry: String(industry).slice(0, 100),
      company: body.company ? String(body.company).slice(0, 100) : '',
      phone: body.phone ? String(body.phone).slice(0, 50) : '',
      problem: body.problem ? String(body.problem).slice(0, 1000) : '',
      existingSystem: body.existingSystem ? String(body.existingSystem).slice(0, 100) : '',
      budgetRange: body.budgetRange ? String(body.budgetRange).slice(0, 50) : '$10k - $25k',
      timeline: body.timeline ? String(body.timeline).slice(0, 50) : 'Asap',
      details: body.details ? String(body.details).slice(0, 1000) : '',
    };

    const lead = await leadRepository.createLead(leadInput);

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        timestamp: lead.createdAt,
        message: 'Your project brief has been registered with Novixa engineering leadership.',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to process lead inquiry' }, { status: 500 });
  }
}
