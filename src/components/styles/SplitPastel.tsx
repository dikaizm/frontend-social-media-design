import { CanvasSize } from '../../lib/constants';

interface SplitPastelProps {
  headline?: string;
  content?: string;
  badges?: Array<{ text: string; icon?: string }>;
  size: CanvasSize;
  className?: string;
}

export function SplitPastel({
  headline,
  content,
  badges = [],
  size,
  className = '',
}: SplitPastelProps) {
  return (
    <div
      className={`split-pastel ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Left panel - peach */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#f5e6dc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${size.width * 0.1}px`,
        }}
      >
        {headline && (
          <div style={{ maxWidth: '90%', textAlign: 'center' }}>
            <h1
              style={{
                fontSize: `${size.width * 0.09}px`,
                fontWeight: 800,
                color: '#1a1a1a',
                fontFamily: 'Outfit, sans-serif',
                lineHeight: 1.1,
                marginBottom: `${size.width * 0.04}px`,
              }}
            >
              {headline}
            </h1>

            {content && (
              <p
                style={{
                  fontSize: `${size.width * 0.03}px`,
                  fontWeight: 400,
                  color: '#555555',
                  fontFamily: 'Outfit, sans-serif',
                  lineHeight: 1.6,
                }}
              >
                {content}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right panel - lavender */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#e4dff0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${size.width * 0.1}px`,
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: `${size.width * 0.06}px ${size.width * 0.06}px`,
            pointerEvents: 'none',
          }}
        />

        {/* Badges */}
        {badges.length > 0 && (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: `${size.width * 0.04}px`,
              maxWidth: '90%',
            }}
          >
            {badges.map((badge, index) => {
              const colors = ['#c8f0d8', '#f0f0c8', '#f0d4e0'];
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: `${size.width * 0.02}px`,
                    padding: `${size.width * 0.025}px ${size.width * 0.035}px`,
                    backgroundColor: colors[index % colors.length],
                    borderRadius: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {badge.icon && (
                    <span
                      style={{
                        fontSize: `${size.width * 0.03}px`,
                      }}
                    >
                      {badge.icon}
                    </span>
                  )}

                  <span
                    style={{
                      fontSize: `${size.width * 0.03}px`,
                      fontWeight: '600',
                      color: '#1a1a1a',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    {badge.text}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
