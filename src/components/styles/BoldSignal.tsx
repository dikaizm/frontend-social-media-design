import { CanvasSize } from '../../lib/constants';

interface BoldSignalProps {
  headline: string;
  subtext?: string;
  number?: string;
  accentColor?: string;
  size: CanvasSize;
  className?: string;
}

export function BoldSignal({
  headline,
  subtext,
  number = '01',
  accentColor = '#FF5722',
  size,
  className = '',
}: BoldSignalProps) {
  return (
    <div
      className={`bold-signal ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ height: '100%', padding: `${size.width * 0.05}px` }}
      >
        {/* Number */}
        {number && (
          <div
            className="font-black text-white/20 mb-8"
            style={{
              fontSize: `${size.width * 0.15}px`,
              fontFamily: 'Archivo Black, sans-serif',
            }}
          >
            {number}
          </div>
        )}

        {/* Colored card */}
        <div
          className="text-center"
          style={{
            backgroundColor: accentColor,
            color: '#1a1a1a',
            padding: `${size.width * 0.04}px`,
            maxWidth: `${size.width * 0.7}px`,
          }}
        >
          <h1
            style={{
              fontSize: `${size.width * 0.08}px`,
              fontWeight: 'bold',
              marginBottom: `${size.width * 0.02}px`,
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {headline}
          </h1>
          {subtext && (
            <p
              style={{
                fontSize: `${size.width * 0.03}px`,
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
