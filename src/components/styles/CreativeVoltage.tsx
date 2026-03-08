import { CanvasSize } from '../../lib/constants';

interface CreativeVoltageProps {
  headline?: string;
  subtext?: string;
  badgeText?: string;
  accentColor?: string;
  neonColor?: string;
  size: CanvasSize;
  className?: string;
}

export function CreativeVoltage({
  headline,
  subtext,
  badgeText = 'NEW',
  accentColor = '#0066ff',
  neonColor = '#d4ff00',
  size,
  className = '',
}: CreativeVoltageProps) {
  return (
    <div
      className={`creative-voltage ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Left panel - electric blue */}
      <div
        style={{
          flex: 1,
          backgroundColor: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${size.width * 0.08}px`,
          position: 'relative',
        }}
      >
        {/* Neon glow effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 70% 50%, ${neonColor}20, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '90%', position: 'relative', zIndex: 1 }}>
          {headline ? (
            <h1
              style={{
                fontSize: `${size.width * 0.07}px`,
                fontWeight: 700,
                color: '#ffffff',
                fontFamily: 'Syne, sans-serif',
                lineHeight: 1.1,
                textAlign: 'center',
                marginBottom: `${size.width * 0.03}px`,
              }}
            >
              {headline}
            </h1>
          ) : null}

          {subtext && (
            <p
              style={{
                fontSize: `${size.width * 0.025}px`,
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'Space Mono, monospace',
                textAlign: 'center',
              }}
            >
              {subtext}
            </p>
          )}

          {badgeText && (
            <div
              style={{
                display: 'inline-block',
                backgroundColor: neonColor,
                color: accentColor,
                padding: `${size.width * 0.015}px ${size.width * 0.03}px`,
                fontSize: `${size.width * 0.02}px`,
                fontWeight: 'bold',
                fontFamily: 'Space Mono, monospace',
                marginTop: `${size.width * 0.04}px`,
              }}
            >
              {badgeText}
            </div>
          )}
        </div>
      </div>

      {/* Right panel - dark */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#1a1a2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${size.width * 0.08}px`,
          position: 'relative',
        }}
      >
        {/* Halftone texture pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${accentColor}15 1px, transparent 1px)`,
            backgroundSize: `${size.width * 0.08}px ${size.width * 0.08}px`,
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />

        {/* Content placeholder - typically an image or additional text */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: `${size.width * 0.03}px`,
          }}
        >
          <div
            style={{
              fontSize: `${size.width * 0.2}px`,
              color: neonColor,
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
            }}
          >
            ⚡
          </div>
          <p
            style={{
              fontSize: `${size.width * 0.03}px`,
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Space Mono, monospace',
            }}
          >
            ENERGETIC
          </p>
        </div>
      </div>
    </div>
  );
}
