import React, { useState, Children, ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CanvasSize } from '../../lib/constants';

interface CarouselProps {
  children: ReactNode;
  size: CanvasSize;
  showDots?: boolean;
  showArrows?: boolean;
  showCounter?: boolean;
}

export function Carousel({
  children,
  size,
  showDots = true,
  showArrows = false,
  showCounter = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = Children.toArray(children);
  const totalPages = slides.length;

  const nextSlide = () =>
    setCurrentIndex((i) => (i + 1) % totalPages);
  const prevSlide = () =>
    setCurrentIndex((i) => (i - 1 + totalPages) % totalPages);
  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div
      className="carousel"
      style={{
        width: size.width,
        height: size.height,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: size.width, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -size.width, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', height: '100%' }}
        >
          {slides[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {showCounter && (
        <div
          className="carousel-counter"
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            zIndex: 10,
            fontFamily: 'monospace',
          }}
        >
          {currentIndex + 1} / {totalPages}
        </div>
      )}

      {showDots && (
        <div
          className="carousel-dots"
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i === currentIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                transform: i === currentIndex ? 'scale(1.3)' : 'scale(1)',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {showArrows && (
        <>
          <CarouselNavButton
            direction="prev"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          />
          <CarouselNavButton
            direction="next"
            onClick={nextSlide}
            disabled={currentIndex === totalPages - 1}
          />
        </>
      )}
    </div>
  );
}

interface CarouselNavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'prev' | 'next';
  disabled?: boolean;
}

function CarouselNavButton({ direction, onClick, disabled }: CarouselNavButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)',
        border: 'none',
        color: 'white',
        fontSize: '18px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        zIndex: 10,
        opacity: disabled ? 0.3 : 1,
        ...((direction === 'prev' ? { left: '12px' } : { right: '12px' }) as React.CSSProperties),
      }}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
    >
      {direction === 'prev' ? '‹' : '›'}
    </button>
  );
}
