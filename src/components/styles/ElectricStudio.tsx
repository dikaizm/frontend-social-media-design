import { CanvasSize } from '../../lib/constants';

interface ElectricStudioProps {
  headline?: string;
  quote?: string;
  accentColor?: string;
  size: CanvasSize;
  className?: string;
}

export function ElectricStudio({
  headline,
  quote,
  accentColor = '#4361ee',
  size,
  className = '',
}: ElectricStudioProps) {
  return (
    <div
      className={`electric-studio ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Top panel - white */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${size.width * 0.08}px`,
        }}
      >
        <div style={{ maxWidth: '90%' }}>
          {headline ? (
            <h1
              style={{
                fontSize: `${size.width * 0.06}px`,
                fontWeight: 800,
                color: '#0a0a0a',
                fontFamily: 'Manrope, sans-serif',
                lineHeight: 1.2,
                textAlign: 'center',
              }}
            >
              {headline}
            </h1>
          ) : null}
        </div>
      </div>

      {/* Accent bar */}
      <div
        style={{
          width: '4px',
          height: '100%',
          backgroundColor: accentColor,
        }}
      />

      {/* Bottom panel - blue */}
      <div
        style={{
          flex: 1,
          backgroundColor: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${size.width * 0.08}px`,
        }}
      >
        <div style={{ maxWidth: '90%' }}>
          {quote ? (
            <p
              style={{
                fontSize: `${size.width * 0.05}px`,
                fontWeight: 400,
                color: '#ffffff',
                fontFamily: 'Manrope, sans-serif',
                lineHeight: 1.4,
                textAlign: 'center',
              }}
            >
              "{quote}"
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
