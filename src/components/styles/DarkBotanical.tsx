import { CanvasSize } from '../../lib/constants';

interface DarkBotanicalProps {
  headline?: string;
  subtext?: string;
  attribution?: string;
  size: CanvasSize;
  className?: string;
}

export function DarkBotanical({
  headline,
  subtext,
  attribution,
  size,
  className = '',
}: DarkBotanicalProps) {
  return (
    <div
      className={`dark-botanical ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Abstract soft gradient circles (blurred, overlapping) */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: `${size.width * 0.5}px`,
          height: `${size.width * 0.5}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 165, 116, 0.3) 0%, rgba(212, 165, 116, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: `${size.width * 0.6}px`,
          height: `${size.width * 0.6}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 180, 184, 0.25) 0%, rgba(232, 180, 184, 0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '60%',
          width: `${size.width * 0.4}px`,
          height: `${size.width * 0.4}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 184, 150, 0.2) 0%, rgba(201, 184, 150, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Thin vertical accent lines */}
      <div
        style={{
          position: 'absolute',
          left: '10%',
          top: '15%',
          width: '1px',
          height: `${size.height * 0.3}px`,
          background: 'rgba(232, 180, 184, 0.3)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '15%',
          bottom: '20%',
          width: '1px',
          height: `${size.height * 0.25}px`,
          background: 'rgba(201, 184, 150, 0.25)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: `${size.width * 0.7}px`,
          textAlign: 'center',
        }}
      >
        {headline && (
          <h1
            style={{
              fontSize: `${size.width * 0.09}px`,
              fontWeight: 600,
              color: '#e8e4df',
              fontFamily: 'Cormorant, serif',
              lineHeight: 1.2,
              marginBottom: `${size.width * 0.04}px`,
              letterSpacing: '0.02em',
            }}
          >
            {headline}
          </h1>
        )}

        {subtext && (
          <p
            style={{
              fontSize: `${size.width * 0.035}px`,
              fontWeight: 300,
              color: '#9a9590',
              fontFamily: 'IBM Plex Sans, sans-serif',
              lineHeight: 1.6,
              marginBottom: `${size.width * 0.06}px`,
            }}
          >
            {subtext}
          </p>
        )}

        {attribution && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: `${size.width * 0.02}px`,
            }}
          >
            <div
              style={{
                width: `${size.width * 0.03}px`,
                height: '1px',
                background: 'rgba(232, 180, 184, 0.5)',
              }}
            />
            <p
              style={{
                fontSize: `${size.width * 0.022}px`,
                fontStyle: 'italic',
                color: 'rgba(232, 180, 184, 0.7)',
                fontFamily: 'Cormorant, serif',
              }}
            >
              {attribution}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
