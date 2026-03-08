import { CanvasSize } from '../../lib/constants';

interface CleanPrismProps {
  headline?: string;
  subtext?: string;
  sectionTitle?: string;
  items?: Array<{ label: string; value?: string | number; icon?: string }>;
  accentColor?: string;
  size: CanvasSize;
  className?: string;
}

export function CleanPrism({
  headline,
  subtext,
  sectionTitle,
  items = [],
  accentColor = '#4361ee',
  size,
  className = '',
}: CleanPrismProps) {
  return (
    <div
      className={`clean-prism ${className}`}
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
      {/* Prism gradient background */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-15%',
          width: `${size.width * 0.6}px`,
          height: `${size.height * 0.6}px`,
          background: `
            linear-gradient(135deg,
              rgba(255, 107, 53, 0.15) 0%,
              rgba(255, 152, 0, 0.12) 25%,
              rgba(139, 92, 246, 0.18) 50%,
              rgba(255, 87, 34, 0.15) 75%,
              rgba(168, 85, 247, 0.1) 100%
            )
          `,
          filter: 'blur(80px)',
          borderRadius: '50%',
          transform: 'rotate(-15deg)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-20%',
          width: `${size.width * 0.5}px`,
          height: `${size.height * 0.5}px`,
          background: `
            radial-gradient(circle at 30% 70%,
              rgba(255, 107, 53, 0.1) 0%,
              rgba(139, 92, 246, 0.15) 40%,
              rgba(168, 85, 247, 0.1) 70%,
              transparent 100%
            )
          `,
          filter: 'blur(100px)',
          borderRadius: '60% 40% 40% 60%',
          transform: 'rotate(20deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: `${size.width * 0.75}px`,
          textAlign: 'center',
        }}
      >
        {/* Blue accent line */}
        <div
          style={{
            width: `${size.width * 0.15}px`,
            height: '3px',
            backgroundColor: accentColor,
            marginBottom: `${size.width * 0.04}px`,
            borderRadius: '2px',
          }}
        />

        {headline && (
          <h1
            style={{
              fontSize: `${size.width * 0.09}px`,
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              lineHeight: 1.2,
              marginBottom: `${size.width * 0.03}px`,
            }}
          >
            {headline}
          </h1>
        )}

        {subtext && (
          <p
            style={{
              fontSize: `${size.width * 0.03}px`,
              fontWeight: 400,
              color: '#333333',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              lineHeight: 1.6,
              marginBottom: `${size.width * 0.06}px`,
              maxWidth: '90%',
            }}
          >
            {subtext}
          </p>
        )}

        {sectionTitle && (
          <div
            style={{
              marginBottom: `${size.width * 0.05}px`,
              paddingBottom: `${size.width * 0.03}px`,
              borderBottom: '2px solid #f0f0f0',
            }}
          >
            <h2
              style={{
                fontSize: `${size.width * 0.04}px`,
                fontWeight: 600,
                color: '#1a1a1a',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: `${size.width * 0.02}px`,
              }}
            >
              {sectionTitle}
            </h2>
          </div>
        )}

        {items.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: `${size.width * 0.04}px`,
              maxWidth: '100%',
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${size.width * 0.025}px`,
                  padding: `${size.width * 0.025}px ${size.width * 0.03}px`,
                  backgroundColor: 'rgba(244, 244, 255, 0.6)',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor;
                  (e.currentTarget.querySelector('span:last-child') as HTMLElement | null)?.style.setProperty('color', '#ffffff');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(244, 244, 255, 0.6)';
                  (e.currentTarget.querySelector('span:last-child') as HTMLElement | null)?.style.setProperty('color', '#000000');
                }}
              >
                {item.icon && (
                  <span
                    style={{
                      fontSize: `${size.width * 0.035}px`,
                      color: accentColor,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {item.icon}
                  </span>
                )}

                <span
                  style={{
                    fontSize: `${size.width * 0.025}px`,
                    fontWeight: 400,
                    color: '#000000',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    flex: 1,
                    textAlign: 'left',
                  }}
                >
                  {item.label}
                </span>

                {item.value && (
                  <span
                    style={{
                      fontSize: `${size.width * 0.035}px`,
                      fontWeight: 600,
                      color: accentColor,
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      marginLeft: 'auto',
                    }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative floating elements */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: `${size.width * 0.04}px`,
          height: `${size.width * 0.04}px`,
          borderRadius: '50%',
          background: `linear-gradient(135deg, #ff6b35 0%, #8b5cf6 100%)`,
          boxShadow: `0 ${size.width * 0.01}px ${size.width * 0.02}px rgba(255, 107, 53, 0.3)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '12%',
          width: `${size.width * 0.03}px`,
          height: `${size.width * 0.03}px`,
          borderRadius: '50%',
          background: `linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)`,
          boxShadow: `0 ${size.width * 0.01}px ${size.width * 0.015}px rgba(139, 92, 246, 0.25)`,
        }}
      />
    </div>
  );
}
