import { CanvasSize } from '../../lib/constants';

interface SwissModernProps {
  headline?: string;
  items?: Array<{ label: string; value: string | number }>;
  accentColor?: string;
  size: CanvasSize;
  className?: string;
}

export function SwissModern({
  headline,
  items = [],
  accentColor = '#ff3300',
  size,
  className = '',
}: SwissModernProps) {
  return (
    <div
      className={`swiss-modern ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${accentColor}30 1px, transparent 1px),
            linear-gradient(90deg, ${accentColor}30 1px, transparent 1px)
          `,
          backgroundSize: `${size.width * 0.1}px ${size.width * 0.1}px`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: `${size.width * 0.7}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${size.width * 0.04}px`,
        }}
      >
        {headline && (
          <h1
            style={{
              fontSize: `${size.width * 0.1}px`,
              fontWeight: 800,
              color: '#000000',
              fontFamily: 'Archivo, sans-serif',
              lineHeight: 1.1,
              textAlign: 'center',
              marginBottom: `${size.width * 0.04}px`,
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </h1>
        )}

        {items.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: `${size.width * 0.03}px`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: `${size.width * 0.03}px`,
                  borderBottom: `3px solid ${accentColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: `${size.width * 0.03}px`,
                    fontWeight: 400,
                    color: '#333333',
                    fontFamily: 'Nunito, sans-serif',
                    marginBottom: `${size.width * 0.01}px`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: `${size.width * 0.07}px`,
                    fontWeight: 400,
                    color: '#000000',
                    fontFamily: 'Nunito, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Geometric accent shapes */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: `${size.width * 0.15}px`,
          height: `${size.width * 0.15}px`,
          backgroundColor: accentColor,
          transform: 'rotate(15deg)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: `${size.width * 0.08}px`,
          height: `${size.width * 0.08}px`,
          borderRadius: '50%',
          border: `2px solid ${accentColor}`,
          transform: 'rotate(-10deg)',
          zIndex: 0,
        }}
      />
    </div>
  );
}
