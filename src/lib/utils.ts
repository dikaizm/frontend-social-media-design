import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PLATFORM_DIMENSIONS, type Platform, type Format, type CanvasSize } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clampScale(min: number, base: number, max: number, cqw: number): number {
  const clampedCqw = Math.max(0, Math.min(100, cqw));
  return Math.min(max, min + (base * clampedCqw / 100));
}

export function getCanvasSize(
  platform: Platform,
  format: Format
): { width: number; height: number } | null {
  const dims = PLATFORM_DIMENSIONS[platform] as Record<Format, CanvasSize | undefined>;
  if (!dims) return null;
  return dims[format] ?? null;
}
