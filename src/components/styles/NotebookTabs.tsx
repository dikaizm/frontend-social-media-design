import { CanvasSize } from '../../lib/constants';

interface NotebookTabsProps {
  title?: string;
  sectionTitle?: string;
  items?: Array<{ text: string; icon?: string }>;
  size: CanvasSize;
  className?: string;
}

export function NotebookTabs({
  title,
  sectionTitle,
  items = [],
  size,
  className = '',
}: NotebookTabsProps) {
  const tabColors = ['#98d4bb', '#c7b8ea', '#f4b8c5', '#a8d8ea', '#ffe6a7'];

  return (
    <div
      className={`notebook-tabs ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2d2d2d',
      }}
    >
      {/* Paper card */}
      <div
        style={{
          width: `${size.width * 0.85}px`,
          height: `${size.height * 0.85}px`,
          backgroundColor: '#f8f6f1',
          borderRadius: '4px',
          boxShadow: `0 ${size.width * 0.01}px ${size.width * 0.03}px rgba(0,0,0,0.2)`,
          position: 'relative',
          padding: `${size.width * 0.08}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Binder hole decorations on left */}
        <div
          style={{
            position: 'absolute',
            left: `${size.width * 0.03}px`,
            top: `${size.width * 0.03}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: `${size.width * 0.12}px`,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                width: `${size.width * 0.02}px`,
                height: `${size.width * 0.02}px`,
                borderRadius: '50%',
                background: '#e0e0e0',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            marginLeft: `${size.width * 0.08}px`,
            flex: 1,
          }}
        >
          {title && (
            <h1
              style={{
                fontSize: `${size.width * 0.07}px`,
                fontWeight: 700,
                color: '#1a1a1a',
                fontFamily: 'Bodoni Moda, serif',
                lineHeight: 1.2,
                marginBottom: `${size.width * 0.03}px`,
                maxWidth: '90%',
              }}
            >
              {title}
            </h1>
          )}

          {sectionTitle && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: `${size.width * 0.02}px`,
                marginBottom: `${size.width * 0.05}px`,
                paddingBottom: `${size.width * 0.02}px`,
                borderBottom: '2px solid #1a1a1a',
              }}
            >
              <span
                style={{
                  fontSize: `${size.width * 0.05}px`,
                  fontWeight: '400',
                  color: '#1a1a1a',
                  fontFamily: 'Bodoni Moda, serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {sectionTitle}
              </span>
            </div>
          )}

          {items.length > 0 && (
            <div style={{ marginTop: `${size.width * 0.03}px` }}>
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: `${size.width * 0.025}px`,
                    marginBottom: `${size.width * 0.04}px`,
                  }}
                >
                  <div
                    style={{
                      fontSize: `${size.width * 0.035}px`,
                      color: '#666666',
                      fontFamily: 'DM Sans, sans-serif',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Colorful tabs on right edge */}
      <div
        style={{
          position: 'absolute',
          right: `${(size.width - size.width * 0.85) / 2}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: `${size.width * 0.015}px`,
          zIndex: 2,
        }}
      >
        {tabColors.map((color, index) => {
          const heightMultipliers = [0.6, 0.8, 1.0, 0.9, 0.7];
          const height = size.height * heightMultipliers[index];

          return (
            <div
              key={index}
              style={{
                width: `${size.width * 0.035}px`,
                height,
                backgroundColor: color,
                borderRadius: `${size.width * 0.005}px ${size.width * 0.005}px 0 0`,
                boxShadow: `0 ${size.width * 0.005}px ${size.width * 0.01}px rgba(0,0,0,0.1)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
