import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getSiteUrl } from '@/lib/site';

export const runtime = 'nodejs';

const SIZE = { width: 1200, height: 630 };

/**
 * IBM Plex Sans Arabic carries both Arabic and Latin glyphs, so one face
 * renders both locales' cards. Without an explicitly supplied font, satori
 * has no Arabic coverage and every Arabic title renders as tofu boxes.
 */
let fontPromise: Promise<Buffer> | null = null;
function loadFont(): Promise<Buffer> {
  // Read from disk rather than `fetch(new URL(..., import.meta.url))`: webpack
  // rewrites that to a relative `/_next/static/media/...` path, which has no
  // origin server-side and throws ERR_INVALID_URL. `outputFileTracingIncludes`
  // in next.config.ts keeps this file in the deployed function bundle.
  if (!fontPromise) {
    fontPromise = readFile(path.join(process.cwd(), 'src/app/og/IBMPlexSansArabic-SemiBold.ttf'));
  }
  return fontPromise;
}

function clamp(value: string, max: number): string {
  const trimmed = value.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

/**
 * Wraps text into explicit lines instead of letting satori break it.
 *
 * Satori does not implement the bidi algorithm: it lays Arabic words out in
 * source order left-to-right and ignores `direction: rtl`, so an Arabic title
 * renders with its words in reverse reading order. Breaking the text into
 * lines ourselves — and reversing the word order within each line for Arabic —
 * puts every word in its correct visual position. Latin runs embedded in an
 * Arabic line (product names, "SaaS") keep their own internal order, which is
 * what bidi would also produce.
 */
function rtlRun(value: string, rtl: boolean): string {
  return rtl ? value.split(' ').reverse().join(' ') : value;
}

function wrapLines(value: string, maxCharsPerLine: number, rtl: boolean): string[] {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return rtl ? lines.map((line) => line.split(' ').reverse().join(' ')) : lines;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lang = searchParams.get('l') === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  const title = clamp(
    searchParams.get('t') ||
      (isAr
        ? 'نوڤيكسا — هندسة البرمجيات والمنتجات الرقمية'
        : 'Novixa — Software Engineering & Digital Products'),
    110
  );
  const description = clamp(
    searchParams.get('d') ||
      (isAr
        ? 'أنظمة ومنتجات رقمية تُبنى لتشغيل الأعمال في اليمن والخليج.'
        : 'Systems and digital products engineered to run real businesses across Yemen and the GCC.'),
    170
  );
  const eyebrow = clamp(searchParams.get('k') || (isAr ? 'نوڤيكسا' : 'NOVIXA'), 40);

  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 80px',
          background: '#020617',
          backgroundImage:
            'radial-gradient(circle at 82% 18%, rgba(37,99,235,0.42) 0%, rgba(2,6,23,0) 58%), radial-gradient(circle at 14% 88%, rgba(20,184,166,0.20) 0%, rgba(2,6,23,0) 55%)',
          direction: isAr ? 'rtl' : 'ltr',
          fontFamily: 'Plex',
        }}
      >
        {/* Brand row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            flexDirection: isAr ? 'row-reverse' : 'row',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexDirection: isAr ? 'row-reverse' : 'row' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #2563EB 0%, #0F172A 100%)',
                border: '1px solid rgba(56,189,248,0.3)',
              }}
            >
              <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
                <path d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.6" />
                <path d="M14 34V14L34 34V14" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="14" cy="14" r="3" fill="#38BDF8" />
                <circle cx="34" cy="34" r="3" fill="#2563EB" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: isAr ? 'flex-end' : 'flex-start' }}>
              <span style={{ fontSize: 32, color: '#FFFFFF', letterSpacing: isAr ? 0 : '0.02em' }}>NOVIXA</span>
              <span style={{ fontSize: 15, color: '#94A3B8' }}>
                {isAr
                  ? rtlRun('هندسة البرمجيات والمنتجات الرقمية', true)
                  : 'Software Engineering & Digital Products'}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: 9999,
              background: 'rgba(15,23,42,0.85)',
              border: '1px solid rgba(56,189,248,0.35)',
              color: '#38BDF8',
              fontSize: 16,
            }}
          >
            <span>{rtlRun(eyebrow, isAr)}</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1010, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: isAr ? 'flex-end' : 'flex-start' }}>
            {wrapLines(title, isAr ? 38 : 42, isAr).slice(0, 3).map((line, i) => (
              <div key={i} style={{ display: 'flex', fontSize: 50, color: '#FFFFFF', lineHeight: 1.34 }}>
                {line}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: isAr ? 'flex-end' : 'flex-start' }}>
            {wrapLines(description, isAr ? 78 : 88, isAr).slice(0, 3).map((line, i) => (
              <div key={i} style={{ display: 'flex', fontSize: 23, color: '#CBD5E1', lineHeight: 1.6 }}>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: 22,
            flexDirection: isAr ? 'row-reverse' : 'row',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isAr ? 'row-reverse' : 'row',
              gap: 22,
              color: '#94A3B8',
              fontSize: 16,
            }}
          >
            <span>{isAr ? 'اليمن' : 'Yemen'}</span>
            <span>·</span>
            <span>{isAr ? 'الخليج' : 'GCC'}</span>
            <span>·</span>
            <span>{isAr ? 'عربي / English' : 'Arabic / English'}</span>
          </div>
          <div style={{ color: '#38BDF8', fontSize: 18 }}>{new URL(getSiteUrl()).host}</div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [{ name: 'Plex', data: fontData, style: 'normal', weight: 600 }],
      headers: {
        'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
      },
    }
  );
}
