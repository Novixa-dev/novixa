import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { feedback, category, author, role } = body;

    if (!feedback || !String(feedback).trim()) {
      return NextResponse.json({ success: false, error: 'Feedback note cannot be empty' }, { status: 400 });
    }

    const textLength = String(feedback).trim().length;
    const score = Math.min(99, Math.max(78, 82 + (textLength % 16)));

    const item = {
      id: `pulse_${Date.now()}`,
      timestamp: new Date().toISOString(),
      author: author ? String(author).slice(0, 50) : 'عضو فريق التشغيل',
      role: role ? String(role).slice(0, 50) : 'العمليات الميدانية',
      category: category ? String(category).slice(0, 50) : 'تحسين تشغيلي',
      text: String(feedback).slice(0, 500),
      votes: 1,
      score,
      status: 'ANALYZED'
    };

    return NextResponse.json({
      success: true,
      item,
      calculatedPulseScore: score,
      message: 'Feedback analyzed in interactive demo endpoint.'
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
