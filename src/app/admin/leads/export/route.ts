import { NextResponse, type NextRequest } from 'next/server';
import { getAdminSession } from '@/lib/auth/admin';
import { getLeadStore, isLeadSource, isLeadStatus, type Lead } from '@/lib/leads';
import { leadsToCsv } from '@/lib/leads/csv';

export const dynamic = 'force-dynamic';

/** CSV of the leads matching the current filters. Admin-only, never cached. */
export async function GET(request: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  const store = getLeadStore();
  if (!store) return new NextResponse('No lead store configured.', { status: 503 });

  const params = request.nextUrl.searchParams;
  const status = params.get('status');
  const source = params.get('source');
  const search = params.get('q') ?? undefined;

  const rows: Lead[] = [];
  for (let offset = 0; ; offset += 500) {
    const page = await store.list({
      status: isLeadStatus(status) ? status : undefined,
      source: isLeadSource(source) ? source : undefined,
      search,
      limit: 500,
      offset,
    });
    rows.push(...page.rows);
    if (rows.length >= page.total || page.rows.length === 0) break;
  }

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(leadsToCsv(rows), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="novixa-leads-${stamp}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
