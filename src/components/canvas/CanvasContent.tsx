import { ReactNode, CSSProperties } from 'react';

interface CanvasContentProps {
  children: ReactNode;
  padding?: number | string;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  className?: string;
  style?: CSSProperties;
}

export function CanvasContent({
  children,
  padding = 'clamp(24px, 5cqw, 80px)',
  justifyContent = 'center',
  alignItems = 'center',
  className = '',
  style = {},
}: CanvasContentProps) {
  return (
    <div
      className={`canvas-content ${className}`}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent,
        alignItems,
        padding,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
