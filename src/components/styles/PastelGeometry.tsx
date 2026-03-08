import { CanvasSize } from '../../lib/constants';

interface PastelGeometryProps {
  headline?: string;
  items?: Array<{ label: string; value: string | number; icon?: string }>;
  pills?: string[];
  size: CanvasSize;
  className?: string;
}

export function PastelGeometry({
  headline,
  items = [],
  pills = [],
  size,
  className = '',
}: PastelGeometryProps) {
  return (
    <div
      className={`pastel-geometry ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c8d9e6',
      }}
    >
      {/* White card */}
      <div
        style={{
          width: `${size.width * 0.85}px`,
          height: `${size.height * 0.85}px`,
          backgroundColor: '#faf9f7',
          borderRadius: '12px',
          boxShadow: `0 ${size.width * 0.02}px ${size.width * 0.04}px rgba(0,0,0,0.08)`,
          padding: `${size.width * 0.08}px`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Vertical pills on right edge */}
        <div
          style={{
            position: 'absolute',
            right: '-1px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: `${size.width * 0.012}px`,
            zIndex: 2,
          }}
        >
          {pills.map((color, index) => {
            const heightMultipliers = [0.6, 0.8, 1.0, 0.9, 0.7];
            const height = size.height * 0.85 * heightMultipliers[index];

            return (
              <div
                key={index}
                style={{
                  width: `${size.width * 0.03}px`,
                  height,
                  backgroundColor: color,
                  borderRadius: `${size.width * 0.005}px ${size.width * 0.005}px 0 0`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              />
            );
          })}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {headline && (
            <h1
              style={{
                fontSize: `${size.width * 0.08}px`,
                fontWeight: 800,
                color: '#1a1a1a',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                marginBottom: `${size.width * 0.06}px`,
                textAlign: 'center',
                maxWidth: '90%',
              }}
            >
              {headline}
            </h1>
          )}

          {items.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: `${size.width * 0.04}px`,
                maxWidth: '85%',
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: `${size.width * 0.03}px`,
                    padding: `${size.width * 0.025}px ${size.width * 0.03}px`,
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    borderRadius: '8px',
                  }}
                >
                  {item.icon && (
                    <div
                      style={{
                        width: `${size.width * 0.04}px`,
                        height: `${size.width * 0.04}px`,
                        borderRadius: '50%',
                        backgroundColor: '#5a7c6a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: `${size.width * 0.02}px`,
                        fontWeight: 'bold',
                      }}
                    >
                      {item.icon}
                    </div>
                  )}

                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        fontSize: `${size.width * 0.025}px`,
                        fontWeight: '500',
                        color: '#1a1a1a',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        marginBottom: `${size.width * 0.005}px`,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: `${size.width * 0.04}px`,
                        fontWeight: '800',
                        color: '#5a7c6a',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
