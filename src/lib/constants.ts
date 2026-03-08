export interface CanvasSize {
  width: number;
  height: number;
}

export type Platform = 'instagram' | 'linkedin' | 'twitter' | 'facebook' | 'youtube' | 'pinterest' | 'tiktok';
export type Format = 'post-square' | 'post-portrait' | 'story' | 'carousel' | 'banner' | 'thumbnail' | 'post' | 'header' | 'pin' | 'cover';

export const PLATFORM_DIMENSIONS = {
  instagram: {
    'post-square': { width: 1080, height: 1080 },
    'post-portrait': { width: 1080, height: 1350 },
    story: { width: 1080, height: 1920 },
    carousel: { width: 1080, height: 1080 },
  },
  linkedin: {
    post: { width: 1200, height: 628 },
    carousel: { width: 1080, height: 1080 },
  },
  twitter: {
    post: { width: 1200, height: 675 },
    header: { width: 1500, height: 500 },
  },
  facebook: {
    post: { width: 1200, height: 630 },
    story: { width: 1080, height: 1920 },
  },
  youtube: {
    thumbnail: { width: 1280, height: 720 },
  },
  pinterest: {
    pin: { width: 1000, height: 1500 },
  },
  tiktok: {
    cover: { width: 1080, height: 1920 },
  },
} as const;

export const CONTENT_DENSITY_LIMITS = {
  quotePost: { maxQuoteLines: 3, maxContent: '1 quote + attribution' },
  headlinePost: { maxContent: '1 headline + 1 subtitle + CTA' },
  featurePost: { maxContent: '1 headline + 3-4 bullets or icons' },
  imagePost: { maxImageHeight: '60%', maxContent: '1 headline + optional caption' },
  carouselPage: { maxContent: '1 heading + 3-4 points OR 1 heading + 1 image + caption' },
  infographic: { maxContent: '1 heading + 4-6 data points/icons' },
  promotional: { maxContent: '1 headline + 1 image/graphic + CTA button' },
} as const;

export const TYPING_SCALE = {
  title: { min: 42, base: 8.25, max: 108 },
  h2: { min: 33, base: 6, max: 72 },
  body: { min: 21, base: 3.3, max: 36 },
  small: { min: 15, base: 2.25, max: 24 },
} as const;

export const SPACING_SCALE = {
  canvasPadding: { min: 24, base: 5, max: 80 },
  contentGap: { min: 12, base: 2.5, max: 32 },
} as const;

export const ICON_SIZES = {
  small: { width: 16, height: 16 },
  medium: { width: 24, height: 24 },
  large: { width: 32, height: 32 },
  xlarge: { width: 48, height: 48 },
  xxlarge: { width: 64, height: 64 },
} as const;

export const COLOR_SEMANTIC = {
  success: '#4CAF50',
  error: '#f44336',
  warning: '#FF9800',
  info: '#2196F3',
} as const;
