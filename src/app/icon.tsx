import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const dynamic = 'force-static'
export const alt = 'Fourg Product Studio Docs'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2563eb', // Blue to signify docs/resources
          color: 'white',
          borderRadius: '6px',
          fontSize: 18,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-1px'
        }}
      >
        <span style={{ transform: 'translateY(-1px)'}}>4G</span>
      </div>
    ),
    { ...size }
  )
}
