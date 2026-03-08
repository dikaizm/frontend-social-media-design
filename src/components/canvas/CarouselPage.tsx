import { ReactNode } from 'react';

interface CarouselPageProps {
  children: ReactNode;
  className?: string;
}

export function CarouselPage({ children, className = '' }: CarouselPageProps) {
  return (
    <div
      className={`carousel-page ${className}`}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}
