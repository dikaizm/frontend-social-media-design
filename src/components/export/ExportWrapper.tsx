import { ReactNode } from 'react';

interface ExportWrapperProps {
  children: ReactNode;
  size: { width: number; height: number };
  className?: string;
}

export function ExportWrapper({ children, size, className = '' }: ExportWrapperProps) {
  return (
    <div
      id="export-root"
      className={`export-root ${className}`}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1a1a1a',
      }}
    >
      {children}
    </div>
  );
}
