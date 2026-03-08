import { useEffect, useState } from 'react';
import { CanvasSize } from '../../lib/constants';

interface TerminalBlueProps {
  headline?: string;
  code?: string;
  output?: string;
  sectionLabel?: string;
  size: CanvasSize;
  className?: string;
}

export function TerminalBlue({
  headline,
  code,
  output,
  sectionLabel,
  size,
  className = '',
}: TerminalBlueProps) {
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
      className={`terminal-blue ${className}`}
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
      {/* Ambient corner glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: `${size.width * 0.5}px`,
          height: `${size.width * 0.5}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(77, 159, 255, 0.12) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(77, 159, 255, 0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77, 159, 255, 0.018) 1px, transparent 1px)
          `,
          backgroundSize: `${size.width * 0.08}px ${size.width * 0.08}px`,
          pointerEvents: 'none',
          opacity: 0.35,
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
              borderBottom: `1px solid rgba(77, 159, 255, 0.3)`,
            }}
          >
            {/* Section label */}
            <span style={{ color: 'rgba(77, 159, 255, 0.8)' }}>
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
              color: '#e6edf3',
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
            backgroundColor: 'rgba(35, 40, 48, 0.5)',
            borderRadius: '6px',
            padding: `${size.width * 0.03}px`,
            marginBottom: `${size.width * 0.03}px`,
            border: '1px solid rgba(77, 159, 255, 0.3)',
            borderLeft: `3px solid #4d9fff`,
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
                    color: '#4d9fff',
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
