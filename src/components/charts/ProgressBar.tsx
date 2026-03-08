
import { CanvasSize } from '../../lib/constants';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  bgColor?: string;
  size: CanvasSize;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  color = '#4361ee',
  bgColor = 'rgba(255,255,255,0.1)',
  size,
  label,
  showPercentage = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`progress-bar ${className}`} style={{ width: '100%' }}>
      {label && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: `${size.width * 0.01}px`,
            fontSize: `${size.width * 0.02}px`,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          <span>{label}</span>
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${size.width * 0.015}px`,
          backgroundColor: bgColor,
          borderRadius: `${size.width * 0.008}px`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: `${size.width * 0.008}px`,
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  );
}
