import React from 'react';
import * as LucideIcons from 'lucide-react';
import { IconType } from 'react-icons/lib';
import * as FaIcons from 'react-icons/fa';

type IconLibrary = 'lucide' | 'fontawesome';
type IconSize = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

interface IconProps {
  name: string;
  library?: IconLibrary;
  size?: IconSize;
  color?: string;
  className?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold';
}

export function Icon({
  name,
  library = 'lucide',
  size = 'medium',
  color,
  className = '',
  weight = 'regular',
}: IconProps) {
  const sizeInPixels = {
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 48,
    xxlarge: 64,
  };

  const strokeWidth = {
    thin: 1,
    light: 1.5,
    regular: 2,
    bold: 2.5,
  };

  if (library === 'lucide') {
    const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<{
      size?: number;
      color?: string;
      strokeWidth?: number;
      className?: string;
    }>;

    if (!LucideIcon) return null;

    return (
      <LucideIcon
        size={sizeInPixels[size]}
        color={color}
        strokeWidth={strokeWidth[weight]}
        className={className}
      />
    );
  }

  if (library === 'fontawesome') {
    const FaIcon = FaIcons[name as keyof typeof FaIcons] as IconType;

    if (!FaIcon) return null;

    return (
      <FaIcon
        style={{
          fontSize: sizeInPixels[size],
          color,
        }}
        className={className}
      />
    );
  }

  return null;
}
