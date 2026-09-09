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
          justifyContent: 'space-between',
          padding: '72px 84px',
          background: '#020617',
          backgroundImage:
            'radial-gradient(circle at 82% 20%, rgba(37,99,235,0.4) 0%, rgba(2,6,23,0) 60%), radial-gradient(circle at 18% 85%, rgba(20,184,166,0.22) 0%, rgba(2,6,23,0) 55%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Top Header: Logo + Brand + Region Tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Novixa 3D Isometric Hexagon N Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #2563EB 0%, #0F172A 100%)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
              }}
            >
              <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
                <path
                  d="M14 34V14L34 34V14"
                  stroke="#FFFFFF"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="14" cy="14" r="3" fill="#38BDF8" />
                <circle cx="34" cy="34" r="3" fill="#2563EB" />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 38, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  NOVIXA
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#38BDF8', letterSpacing: '0.05em' }}>
                  ENGINEERING
                </span>
              </div>
              <span style={{ fontSize: 13, color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Software Systems &amp; Digital Products
              </span>
            </div>
          </div>

          {/* Regional Pill Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 9999,
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38BDF8',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            <span>Middle East &amp; GCC Hub</span>
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 980 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 54,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
            }}
          >
            Enterprise Software Engineering &amp; Modern Digital Platforms
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#CBD5E1',
              lineHeight: 1.45,
            }}
          >
            Transforming complex operations into resilient multi-tenant cloud platforms, distributed systems, and modern SaaS products engineered for scale.
          </div>
        </div>

        {/* Bottom Technical Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: 24,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', gap: 24, color: '#94A3B8', fontSize: 15, fontWeight: 500 }}>
            <span>• Multi-Tenant Cloud SaaS</span>
            <span>• Distributed Systems</span>
            <span>• Applied AI &amp; Automation</span>
          </div>
          <div style={{ color: '#38BDF8', fontSize: 16, fontWeight: 700, letterSpacing: '0.02em' }}>
            novixa.dev
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
