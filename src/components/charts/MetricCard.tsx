
import { Icon } from '../ui/Icon';
import { CanvasSize } from '../../lib/constants';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
  size: CanvasSize;
  className?: string;
}

export function MetricCard({
  label,
  value,
  icon,
  color = '#4361ee',
  size,
  className = '',
}: MetricCardProps) {
  return (
    <div
      className={`metric-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: `${size.width * 0.03}px`,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        minWidth: `${size.width * 0.25}px`,
      }}
    >
      {icon && <Icon name={icon} size="large" color={color} />}
      <div
        style={{
          fontSize: `${size.width * 0.04}px`,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: `${size.width * 0.02}px`,
          color: 'rgba(255,255,255,0.6)',
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  );
}
