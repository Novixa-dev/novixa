export class NextResponse {
  static json(data: any, init?: { status?: number; headers?: Record<string, string> }) {
    return new Response(JSON.stringify(data), {
      status: init?.status || 200,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    });
  }

  static redirect(url: string | URL, status = 307) {
    return new Response(null, {
      status,
      headers: { Location: typeof url === 'string' ? url : url.toString() },
    });
  }

  static next() {
    return new Response(null, { status: 200 });
  }
}

export interface NextRequest extends Request {
  nextUrl?: URL;
}
