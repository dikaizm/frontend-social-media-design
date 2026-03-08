import { CanvasSize } from '../../lib/constants';

interface VintageEditorialProps {
  headline?: string;
  quote?: string;
  author?: string;
  size: CanvasSize;
  className?: string;
}

export function VintageEditorial({
  headline,
  quote,
  author,
  size,
  className = '',
}: VintageEditorialProps) {
  return (
    <div
      className={`vintage-editorial ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f3ee',
      }}
    >
      {/* Abstract geometric shapes as accent */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          zIndex: 0,
        }}
      >
        {/* Circle outline */}
        <div
          style={{
            width: `${size.width * 0.2}px`,
            height: `${size.width * 0.2}px`,
            border: `2px solid ${'#e8d4c0'}`,
            borderRadius: '50%',
            position: 'relative',
          }}
        >
          {/* Dot on circle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '-10%',
              width: `${size.width * 0.03}px`,
              height: `${size.width * 0.03}px`,
              borderRadius: '50%',
              backgroundColor: '#e8d4c0',
            }}
          />
        </div>

        {/* Line extending from circle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '-50%',
            width: `${size.width * 0.3}px`,
            height: '2px',
            backgroundColor: '#e8d4c0',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: `${size.width * 0.75}px`,
          textAlign: 'center',
          padding: `${size.width * 0.08}px`,
        }}
      >
        {headline && (
          <h1
            style={{
              fontSize: `${size.width * 0.1}px`,
              fontWeight: 700,
              color: '#1a1a1a',
              fontFamily: 'Fraunces, serif',
              lineHeight: 1.1,
              marginBottom: `${size.width * 0.06}px`,
            }}
          >
            {headline}
          </h1>
        )}

        {quote && (
          <div
            style={{
              fontSize: `${size.width * 0.05}px`,
              fontWeight: 400,
              color: '#555555',
              fontFamily: 'Work Sans, sans-serif',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: `${size.width * 0.06}px`,
              position: 'relative',
            }}
          >
            "{quote}"

            {/* Quotation marks */}
            <div
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-5%',
                fontSize: `${size.width * 0.15}px`,
                color: '#e8d4c0',
                fontFamily: 'Fraunces, serif',
                opacity: 0.3,
              }}
            >
              "
            </div>
          </div>
        )}

        {author && (
          <p
            style={{
              fontSize: `${size.width * 0.03}px`,
              fontWeight: '500',
              color: '#e8d4c0',
              fontFamily: 'Work Sans, sans-serif',
              marginBottom: `${size.width * 0.05}px`,
            }}
          >
            — {author}
          </p>
        )}

        {/* Bordered CTA box */}
        <div
          style={{
            display: 'inline-block',
            padding: `${size.width * 0.025}px ${size.width * 0.05}px`,
            border: `3px solid ${'#e8d4c0'}`,
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontSize: `${size.width * 0.035}px`,
              fontWeight: '600',
              color: '#1a1a1a',
              fontFamily: 'Work Sans, sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            EXPLORE MORE
          </span>
        </div>
      </div>
    </div>
  );
}
