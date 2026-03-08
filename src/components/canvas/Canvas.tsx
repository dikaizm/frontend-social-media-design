import { ReactNode, CSSProperties } from 'react';
import { CanvasSize } from '../../lib/constants';

interface CanvasProps {
  children: ReactNode;
  size: CanvasSize;
  className?: string;
  style?: CSSProperties;
}

export function Canvas({ children, size, className = '', style = {} }: CanvasProps) {
  return (
    <div
      className={`canvas ${className}`}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
