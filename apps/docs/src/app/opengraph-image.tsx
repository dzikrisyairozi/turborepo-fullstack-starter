import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Monorepo Starter Docs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'linear-gradient(to bottom right, #000000, #111111, #222222)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            fontWeight: 600,
            color: '#f59e0b',
            letterSpacing: '0.1em',
            marginBottom: 24,
            textTransform: 'uppercase',
          }}
        >
          Documentation
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 86,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: 32,
            lineHeight: 1.1,
          }}
        >
          Monorepo Starter Docs
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 42,
            color: '#a1a1aa',
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
          }}
        >
          Knowledge base for the Monorepo Full-Stack Starter.
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
