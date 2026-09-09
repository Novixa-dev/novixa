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
          background: 'linear-gradient(135deg, #020617 0%, #0F172A 50%, #1E3A8A 100%)',
          borderRadius: 40,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeOpacity="0.7"
          />
          <path
            d="M14 34V14L34 34V14"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="14" r="3.5" fill="#38BDF8" />
          <circle cx="34" cy="34" r="3.5" fill="#2563EB" />
          <circle cx="24" cy="24" r="2" fill="#A5F3FC" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
