import { useEffect, useState } from 'react';
import { CanvasSize } from '../../lib/constants';

interface TerminalGreenProps {
  headline?: string;
  code?: string;
  output?: string;
  sectionLabel?: string;
  size: CanvasSize;
  className?: string;
}

export function TerminalGreen({
  headline,
  code,
  output,
  sectionLabel,
  size,
  className = '',
}: TerminalGreenProps) {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Blink cursor
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`terminal-green ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0d1117',
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(57, 211, 83, 0.018) 2px,
            rgba(57, 211, 83, 0.018) 4px
          )`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: `${size.width * 0.08}px`,
        }}
      >
        {sectionLabel && (
          <div
            style={{
              fontSize: `${size.width * 0.02}px`,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: `${size.width * 0.04}px`,
              paddingBottom: `${size.width * 0.02}px`,
              borderBottom: `1px solid rgba(48, 79, 88, 0.3)`,
            }}
          >
            {/* Section label */}
            <span style={{ color: 'rgba(57, 211, 83, 0.8)' }}>
              //
            </span>
            {sectionLabel}
          </div>
        )}

        {headline && (
          <h1
            style={{
              fontSize: `${size.width * 0.06}px`,
              fontWeight: 600,
              color: '#ffffff',
              fontFamily: 'JetBrains Mono, monospace',
              lineHeight: 1.3,
              marginBottom: `${size.width * 0.05}px`,
            }}
          >
            {headline}
          </h1>
        )}

        {/* Code block */}
        <div
          style={{
            backgroundColor: 'rgba(22, 27, 34, 0.5)',
            borderRadius: '6px',
            padding: `${size.width * 0.03}px`,
            marginBottom: `${size.width * 0.03}px`,
            border: '1px solid rgba(48, 79, 88, 0.3)',
            borderLeft: `3px solid #39d353`,
          }}
        >
          {code && (
            <pre
              style={{
                fontSize: `${size.width * 0.025}px`,
                color: '#e6edf3',
                fontFamily: 'JetBrains Mono, monospace',
                margin: 0,
                whiteSpace: 'pre-wrap',
              }}
            >
              <span style={{ color: '#79c0ff' }}>
                const
              </span>{' '}
              <span style={{ color: '#56d364' }}>
                growth
              </span>
              {' = '}
              <span style={{ color: '#e3b341' }}>
                "{output}"
              </span>
              {cursorVisible && (
                <span
                  style={{
                    color: '#39d353',
                    animation: 'none',
                    marginLeft: '2px',
                  }}
                >
                  █
                </span>
              )}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
