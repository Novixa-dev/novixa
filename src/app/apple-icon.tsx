import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2563EB 0%, #0F172A 100%)',
        }}
      >
        <svg width="112" height="112" viewBox="0 0 64 64" fill="none">
          <path
            d="M18 14V50M18 14L46 50M46 14V50"
            stroke="#F8FAFC"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="46" cy="14" r="4" fill="#14B8A6" />
          <circle cx="18" cy="50" r="4" fill="#60A5FA" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
