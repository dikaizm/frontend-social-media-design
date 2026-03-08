import { CanvasSize } from '../../lib/constants';

interface NeonCyberProps {
  headline?: string;
  subtext?: string;
  accentColor?: string;
  neonColor?: string;
  size: CanvasSize;
  className?: string;
}

export function NeonCyber({
  headline,
  subtext,
  accentColor = '#4d9fff',
  neonColor = '#00ffcc',
  size,
  className = '',
}: NeonCyberProps) {
  return (
    <div
      className={`neon-cyber ${className}`}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0f1c',
      }}
    >
      {/* Particle background effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${accentColor}15 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${neonColor}10 0%, transparent 50%),
            radial-gradient(circle at 50% 90%, ${accentColor}8 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(77, 159, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77, 159, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: `${size.width * 0.06}px ${size.width * 0.06}px`,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: `${size.width * 0.8}px`,
          textAlign: 'center',
        }}
      >
        {headline && (
          <h1
            style={{
              fontSize: `${size.width * 0.09}px`,
              fontWeight: 800,
              color: '#ffffff',
              fontFamily: 'Clash Display, sans-serif',
              lineHeight: 1.1,
              marginBottom: `${size.width * 0.04}px`,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: `
                0 0 10px ${accentColor},
                0 0 20px ${accentColor},
                0 0 30px ${accentColor}
              `,
            }}
          >
            {headline}
          </h1>
        )}

        {subtext && (
          <p
            style={{
              fontSize: `${size.width * 0.035}px`,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'Satoshi, sans-serif',
              lineHeight: 1.6,
              letterSpacing: '0.02em',
              textShadow: `0 0 10px ${accentColor}40`,
            }}
          >
            {subtext}
          </p>
        )}

        {/* Neon accent line */}
        <div
          style={{
            width: `${size.width * 0.2}px`,
            height: '3px',
            background: `linear-gradient(90deg, ${accentColor} 0%, ${neonColor} 50%, ${accentColor} 100%)`,
            boxShadow: `0 0 10px ${neonColor}, 0 0 20px ${neonColor}`,
            margin: `${size.width * 0.06}px auto`,
          }}
        />
      </div>

      {/* Corner glow effects */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: `${size.width * 0.05}px`,
          height: `${size.width * 0.05}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          width: `${size.width * 0.08}px`,
          height: `${size.width * 0.08}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${neonColor}30 0%, transparent 70%)`,
          filter: 'blur(25px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
