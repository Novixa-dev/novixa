import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          background: '#020617',
          backgroundImage:
            'radial-gradient(circle at 78% 22%, rgba(37,99,235,0.35) 0%, rgba(2,6,23,0) 55%), radial-gradient(circle at 15% 85%, rgba(20,184,166,0.18) 0%, rgba(2,6,23,0) 50%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 44 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #2563EB 0%, #0F172A 100%)',
            }}
          >
            <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
              <path
                d="M18 14V50M18 14L46 50M46 14V50"
                stroke="#F8FAFC"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="46" cy="14" r="4.5" fill="#14B8A6" />
              <circle cx="18" cy="50" r="4.5" fill="#60A5FA" />
            </svg>
          </div>
          <span style={{ fontSize: 40, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            NOVIXA
          </span>
        </div>

        <div style={{ display: 'flex', fontSize: 54, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25, maxWidth: 900 }}>
          Software Engineering &amp; Digital Products
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#94A3B8', marginTop: 28, maxWidth: 820 }}>
          Custom systems, digital products, and SaaS — engineered once, built to scale.
        </div>
      </div>
    ),
    { ...size }
  );
}
