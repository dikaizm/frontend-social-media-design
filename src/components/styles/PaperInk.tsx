import { CanvasSize } from '../../lib/constants';

interface PaperInkProps {
  headline?: string;
  quote?: string;
  attribution?: string;
  accentColor?: string;
  size: CanvasSize;
  className?: string;
}

export function PaperInk({
  headline,
  quote,
  attribution,
  accentColor = '#c41e3a',
  size,
  className = '',
}: PaperInkProps) {
  return (
    <div
      className={`paper-ink ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#faf9f7',
      }}
    >
      {/* Paper texture effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(0,0,0,0.03) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(0,0,0,0.02) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: `${size.width * 0.75}px`,
          textAlign: 'center',
        }}
      >
        {headline && (
          <h1
            style={{
              fontSize: `${size.width * 0.08}px`,
              fontWeight: 700,
              color: '#1a1a1a',
              fontFamily: 'Cormorant Garamond, serif',
              lineHeight: 1.3,
              marginBottom: `${size.width * 0.05}px`,
              letterSpacing: '0.02em',
            }}
          >
            {headline}
          </h1>
        )}

        {quote && (
          <div
            style={{
              position: 'relative',
              marginBottom: `${size.width * 0.05}px`,
            }}
          >
            {/* Pull quote styling */}
            <p
              style={{
                fontSize: `${size.width * 0.06}px`,
                fontWeight: 400,
                color: '#555555',
                fontFamily: 'Source Serif 4, serif',
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: `${size.width * 0.03}px`,
                paddingLeft: `${size.width * 0.05}px`,
              }}
            >
              "{quote}"
            </p>

            {/* Decorative quote mark */}
            <span
              style={{
                position: 'absolute',
                left: '0',
                top: '-10%',
                fontSize: `${size.width * 0.25}px`,
                color: accentColor,
                fontFamily: 'Cormorant Garamond, serif',
                opacity: 0.15,
                lineHeight: 1,
              }}
            >
              "
            </span>
          </div>
        )}

        {attribution && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: `${size.width * 0.02}px`,
              marginBottom: `${size.width * 0.04}px`,
            }}
          >
            {/* Horizontal rule */}
            <div
              style={{
                flex: 1,
                height: '2px',
                backgroundColor: accentColor,
              }}
            />
            <span
              style={{
                fontSize: `${size.width * 0.025}px`,
                fontWeight: 500,
                color: '#1a1a1a',
                fontFamily: 'Source Serif 4, serif',
                letterSpacing: '0.05em',
              }}
            >
              {attribution}
            </span>
            <div
              style={{
                flex: 1,
                height: '2px',
                backgroundColor: accentColor,
              }}
            />
          </div>
        )}
      </div>

      {/* Elegant footer decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: `${size.width * 0.03}px`,
          opacity: 0.6,
        }}
      >
        <div
          style={{
            width: `${size.width * 0.002}px`,
            height: `${size.width * 0.1}px`,
            backgroundColor: accentColor,
          }}
        />
        <div
          style={{
            width: `${size.width * 0.15}px`,
            height: `${size.width * 0.002}px`,
            backgroundColor: accentColor,
          }}
        />
      </div>
    </div>
  );
}
