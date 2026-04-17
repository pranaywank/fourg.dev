import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'Fourg Product Studio Docs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
 
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f8fafc',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Subtle grid background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10 }}>
          <div 
            style={{ 
              color: '#2563eb', 
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              fontSize: 24, 
              fontWeight: 800, 
              letterSpacing: '2px', 
              marginBottom: 40, 
              padding: '12px 24px', 
              borderRadius: '100px',
              fontFamily: 'sans-serif'
            }}
          >
            FOURG RESOURCES
          </div>
          <div 
            style={{ 
              color: '#0f172a', 
              fontSize: 96, 
              fontWeight: 900, 
              textAlign: 'left', 
              lineHeight: 1.1, 
              fontFamily: 'sans-serif',
              letterSpacing: '-3px',
              maxWidth: '900px'
            }}
          >
            The Architect's <br/>
            Knowledge Base.
          </div>
          <div 
            style={{ 
              color: '#64748b', 
              fontSize: 36, 
              marginTop: 40, 
              maxWidth: '900px', 
              textAlign: 'left', 
              lineHeight: 1.5,
              fontFamily: 'sans-serif'
            }}
          >
            An exhaustive GitBook library of execution playbooks, GTM strategies, and architectural blueprints for Vibe Coders and Indie Founders.
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
