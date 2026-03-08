# React Component Reference Guide

This guide documents the reusable React components available for social media design generation.

## Overview

The Frontend Social Media Design skill now uses React + TypeScript components instead of static HTML. Components are organized into:

- **Canvas Components** - Core layout components (Canvas, Carousel)
- **Style Presets** - 13 pre-built design styles
- **Chart Components** - Data visualization (visx, Plotly)
- **UI Components** - Reusable UI elements (Icon, etc.)
- **Export Components** - Export wrapper and utilities

## Base Components

### Canvas

Main canvas component with fixed dimensions matching social media platforms.

```tsx
import { Canvas } from './src/components/canvas/Canvas';
import { PLATFORM_DIMENSIONS } from './src/lib/constants';

const size = PLATFORM_DIMENSIONS.instagram['post-square'];

<Canvas size={size}>
  {/* Content */}
</Canvas>
```

**Props:**
- `size` (CanvasSize, required): Canvas dimensions from PLATFORM_DIMENSIONS
- `children` (ReactNode, required): Content inside the canvas
- `className` (string, optional): Additional CSS classes
- `style` (CSSProperties, optional): Inline styles

**Key Features:**
- Fixed pixel dimensions
- `overflow: hidden`
- Relative positioning

---

### Carousel

Multi-page carousel with Framer Motion transitions.

```tsx
import { Carousel } from './src/components/canvas/Carousel';
import { CarouselPage } from './src/components/canvas/CarouselPage';

<Carousel size={size} showDots={true} showArrows={false} showCounter={true}>
  <CarouselPage>Page 1 content</CarouselPage>
  <CarouselPage>Page 2 content</CarouselPage>
  <CarouselPage>Page 3 content</CarouselPage>
</Carousel>
```

**Props:**
- `size` (CanvasSize, required): Canvas dimensions
- `children` (ReactNode, required): CarouselPage components
- `showDots` (boolean, default: true): Show navigation dots
- `showArrows` (boolean, default: false): Show arrow buttons
- `showCounter` (boolean, default: true): Show "2 / 5" counter

**Key Features:**
- Framer Motion slide transitions (0.4s duration)
- Touch/swipe support (via JavaScript listeners)
- Keyboard navigation (← → arrows)
- Auto-syncs dots, counter, arrows

---

### CarouselPage

Single page inside a Carousel.

```tsx
import { CarouselPage } from './src/components/canvas/CarouselPage';

<CarouselPage>
  <CanvasContent>
    {/* Page content */}
  </CanvasContent>
</CarouselPage>
```

**Props:**
- `children` (ReactNode, required): Page content
- `className` (string, optional): Additional CSS classes

**Key Features:**
- Full canvas width/height
- `overflow: hidden`
- Flex column layout

---

### CanvasContent

Content wrapper with flexible layout options.

```tsx
import { CanvasContent } from './src/components/canvas/CanvasContent';

<CanvasContent
  padding="clamp(24px, 5cqw, 80px)"
  justifyContent="center"
  alignItems="center"
>
  {/* Content */}
</CanvasContent>
```

**Props:**
- `children` (ReactNode, required): Content
- `padding` (number | string, optional): Padding value (default: "clamp(24px, 5cqw, 80px)")
- `justifyContent` (FlexJustify, optional): Horizontal alignment (default: "center")
- `alignItems` (FlexAlign, optional): Vertical alignment (default: "center")
- `className` (string, optional): Additional CSS classes
- `style` (CSSProperties, optional): Inline styles

**Key Features:**
- `z-index: 2` (above overlays)
- Flex layout
- Responsive padding via clamp()

---

## Style Presets

All style presets follow a consistent interface:

```tsx
interface StylePresetProps {
  size: CanvasSize;          // Required: Canvas dimensions
  // ... preset-specific props
}
```

### BoldSignal

Confident, bold, modern, high-impact design.

```tsx
import { BoldSignal } from './src/components/styles/BoldSignal';

<BoldSignal
  headline="Your Headline"
  subtext="Your subtext"
  number="01"
  accentColor="#FF5722"
  size={size}
/>
```

**Props:**
- `headline` (string, required): Main heading text
- `subtext` (string, optional): Supporting text below headline
- `number` (string, default: "01"): Section number
- `accentColor` (string, default: "#FF5722"): Card background color
- `size` (CanvasSize, required): Canvas dimensions
- `className` (string, optional): Additional CSS classes

**Best For:**
- Bold promotional posts
- Product launches
- Carousel cover pages

**Chart Integration:**
Works well with VisxChart (bar/line) and MetricCard.

---

### ElectricStudio

Bold, clean, professional split-panel design.

```tsx
import { ElectricStudio } from './src/components/styles/ElectricStudio';

<ElectricStudio
  headline="Your Headline"
  quote="Your quote"
  accentColor="#4361ee"
  size={size}
/>
```

**Props:**
- `headline` (string, optional): Main heading in white panel
- `quote` (string, optional): Quote text in blue panel
- `accentColor` (string, default: "#4361ee"): Bottom panel color
- `size` (CanvasSize, required): Canvas dimensions
- `className` (string, optional): Additional CSS classes

**Best For:**
- Agency portfolios
- LinkedIn posts
- Professional brand content

**Chart Integration:**
Works well with MetricCard and ProgressBar.

---

### CleanPrism

Clean white layout with blue accent and orange-purple prism gradient.

```tsx
import { CleanPrism } from './src/components/styles/CleanPrism';

<CleanPrism
  headline="Your Headline"
  subtext="Your subtext"
  sectionTitle="Key Features"
  items={features}
  accentColor="#4361ee"
  size={size}
/>
```

**Props:**
- `headline` (string, optional): Main heading text
- `subtext` (string, optional): Supporting text below headline
- `sectionTitle` (string, optional): Section title for items list
- `items` (Item[], optional): Array of items with label, value, icon
- `accentColor` (string, default: "#4361ee"): Blue accent color
- `size` (CanvasSize, required): Canvas dimensions
- `className` (string, optional): Additional CSS classes

**Best For:**
- Clean, modern layouts
- Feature showcases
- Product announcements
- List-style content

**Features:**
- White background with clean typography
- Orange to purple prism gradient in background (blurred)
- Blue accent line and interactive elements
- Item cards with hover effects
- Floating decorative elements

**Chart Integration:**
Works well with MetricCard and Icon components.

---

## Chart Components

### VisxChart

Custom charts using visx library (bar, line).

```tsx
import { VisxChart } from './src/components/charts/VisxChart';

<VisxChart
  data={data}
  width={400}
  height={300}
  color="#4361ee"
  type="bar"
  showGrid={true}
  showTooltip={true}
/>
```

**Props:**
- `data` (ChartData[], required): Array of `{ label: string, value: number }`
- `width` (number, required): Chart width in pixels
- `height` (number, required): Chart height in pixels
- `color` (string, default: "#4361ee"): Bar/line color
- `type` ("bar" | "line", default: "bar"): Chart type
- `showGrid` (boolean, default: true): Show axis grid lines
- `showTooltip` (boolean, default: true): Show tooltip on hover

**Best For:**
- Simple bar charts
- Line charts for trends
- Infographic data points

**Sizing Guidelines:**
- Use canvas width × 0.6 to 0.8 for width
- Use canvas height × 0.3 to 0.5 for height

---

### PlotlyChart

Complex charts using Plotly.js (heatmap, scatter, etc.).

```tsx
import { PlotlyChart } from './src/components/charts/PlotlyChart';

<PlotlyChart
  data={data}
  layout={{ margin: { t: 20, r: 20, b: 20, l: 20 } }}
  width={400}
  height={300}
/>
```

**Props:**
- `data` (any[], required): Plotly data array
- `layout` (Partial<Plotly.Layout>, optional): Layout configuration
- `config` (Partial<Plotly.Config>, optional): Chart configuration
- `width` (number, required): Chart width in pixels
- `height` (number, required): Chart height in pixels

**Best For:**
- Heatmaps
- Scatter plots
- Complex visualizations
- Custom chart types

**Note:**
- Static by default (no interactivity for export)
- Transparent background

---

### Heatmap

Heatmap visualization (wrapper around PlotlyChart).

```tsx
import { Heatmap } from './src/components/charts/Heatmap';

<Heatmap
  z={matrix}
  x={xLabels}
  y={yLabels}
  colorscale={[[0, '#1a1a1a'], [0.5, '#4361ee'], [1, '#00ffcc']]}
  width={400}
  height={300}
  showscale={false}
/>
```

**Props:**
- `z` (number[][], required): 2D array of values
- `x` (string[], required): X-axis labels
- `y` (string[], required): Y-axis labels
- `colorscale` (string[][], optional): Color gradient (default: dark → blue → cyan)
- `width` (number, required): Chart width in pixels
- `height` (number, required): Chart height in pixels
- `showscale` (boolean, default: false): Show color scale legend

**Best For:**
- Year-over-year comparisons
- Time-series heatmaps
- Correlation matrices

**Sizing Guidelines:**
- Use canvas width × 0.75 for width
- Use canvas height × 0.55 for height

---

### MetricCard

Data metric display with icon.

```tsx
import { MetricCard } from './src/components/charts/MetricCard';

<MetricCard
  label="Revenue"
  value="$2.4M"
  icon="trending-up"
  color="#4CAF50"
  size={size}
/>
```

**Props:**
- `label` (string, required): Metric label
- `value` (string | number, required): Metric value
- `icon` (string, optional): Lucide icon name
- `color` (string, default: "#4361ee"): Icon color
- `size` (CanvasSize, required): Canvas dimensions
- `className` (string, optional): Additional CSS classes

**Best For:**
- KPI displays
- Summary statistics
- Feature highlights

**Sizing Guidelines:**
- Width: `size.width * 0.25` (approx 1/4 canvas)
- Icon: large size
- Value font: `size.width * 0.04`
- Label font: `size.width * 0.02`

---

### ProgressBar

Progress bar with label and percentage.

```tsx
import { ProgressBar } from './src/components/charts/ProgressBar';

<ProgressBar
  value={92}
  max={100}
  label="Customer Satisfaction"
  color="#4CAF50"
  size={size}
  showPercentage={true}
/>
```

**Props:**
- `value` (number, required): Current progress value
- `max` (number, required): Maximum value (100%)
- `color` (string, default: "#4361ee"): Progress bar color
- `bgColor` (string, optional): Background color (default: rgba(255,255,255,0.1))
- `size` (CanvasSize, required): Canvas dimensions
- `label` (string, optional): Progress label text
- `showPercentage` (boolean, default: true): Show percentage text
- `className` (string, optional): Additional CSS classes

**Best For:**
- Goal tracking
- Performance metrics
- Completion status

**Sizing Guidelines:**
- Width: 100% or `size.width * 0.7`
- Height: `size.width * 0.015`
- Font: `size.width * 0.02`

---

## UI Components

### Icon

Icon wrapper for react-icons and lucide-react.

```tsx
import { Icon } from './src/components/ui/Icon';

<Icon
  name="check-circle"
  library="lucide"
  size="medium"
  color="#4CAF50"
  weight="regular"
/>
```

**Props:**
- `name` (string, required): Icon name
- `library` ("lucide" | "fontawesome", default: "lucide"): Icon library
- `size` ("small" | "medium" | "large" | "xlarge" | "xxlarge", default: "medium"): Icon size
- `color` (string, optional): Icon color
- `className` (string, optional): Additional CSS classes
- `weight` ("thin" | "light" | "regular" | "bold", default: "regular"): Icon stroke weight (lucide only)

**Sizes (pixels):**
- small: 16
- medium: 24
- large: 32
- xlarge: 48
- xxlarge: 64

**Common Icons:**

| Purpose | Lucide Name | FontAwesome Name |
|---------|-------------|-----------------|
| Check/Done | `check-circle` | `FaCheckCircle` |
| Error/Invalid | `x-circle` | `FaTimesCircle` |
| Download | `download` | `FaDownload` |
| Share | `share` | `FaShare` |
| Star | `star` | `FaStar` |
| Info | `info` | `FaInfoCircle` |
| Warning | `alert-triangle` | `FaExclamationTriangle` |
| User | `user` | `FaUser` |
| Settings | `settings` | `FaGear` |
| Search | `search` | `FaSearch` |
| Arrow Right | `arrow-right` | `FaArrowRight` |
| Trending Up | `trending-up` | `FaChartLine` |
| Activity | `activity` | `FaChartBar` |

---

### ExportWrapper

Wrapper for export purposes.

```tsx
import { ExportWrapper } from './src/components/export/ExportWrapper';

<ExportWrapper size={size}>
  {/* Design content */}
</ExportWrapper>
```

**Props:**
- `size` (CanvasSize, required): Canvas dimensions
- `children` (ReactNode, required): Design content
- `className` (string, optional): Additional CSS classes

**Key Features:**
- Sets `id="export-root"` for Puppeteer clipping
- Default dark background
- Fixed dimensions

---

## Constants & Utilities

### Platform Dimensions

```tsx
import { PLATFORM_DIMENSIONS } from './src/lib/constants';

const size = PLATFORM_DIMENSIONS.instagram['post-square'];
// { width: 1080, height: 1080 }
```

**Available Platforms:**
- `instagram`, `linkedin`, `twitter`, `facebook`, `youtube`, `pinterest`, `tiktok`

**Available Formats:**
- `post-square`, `post-portrait`, `story`, `carousel`, `banner`, `thumbnail`, `post`, `header`, `pin`, `cover`

---

### Content Density Limits

```tsx
import { CONTENT_DENSITY_LIMITS } from './src/lib/constants';

CONTENT_DENSITY_LIMITS.quotePost
// { maxQuoteLines: 3, maxContent: '1 quote + attribution' }
```

**Use to enforce:**
- Maximum content per canvas
- Prevent overflow
- Guide AI on content limits

---

### Icon Sizes

```tsx
import { ICON_SIZES } from './src/lib/constants';

ICON_SIZES.medium
// { width: 24, height: 24 }
```

---

### Color Semantics

```tsx
import { COLOR_SEMANTIC } from './src/lib/constants';

COLOR_SEMANTIC.success    // #4CAF50
COLOR_SEMANTIC.error      // #f44336
COLOR_SEMANTIC.warning    // #FF9800
COLOR_SEMANTIC.info       // #2196F3
```

---

## Export Workflow

### Command

```bash
npm run export <design-file> [platform] [format] [output-path]
```

**Examples:**

```bash
# Instagram post
npm run export src/examples/instagram-post-example.tsx instagram post-square ./output.png

# LinkedIn carousel (exports first slide)
npm run export src/examples/linkedin-carousel-example.tsx linkedin carousel ./slide-01.png

# Infographic
npm run export src/examples/infographic-example.tsx instagram post-square ./infographic.png
```

### Export Process

1. **Build** - Vite compiles React component to JS/CSS
2. **HTML Wrapper** - Creates HTML file with compiled assets
3. **Puppeteer** - Opens HTML in headless Chrome
4. **Screenshot** - Captures `#export-root` element at 2× scale
5. **Output** - Saves PNG to specified path

### Troubleshooting

**Chrome not found:**
- Install Google Chrome
- Or use system Chrome path in export script

**Build errors:**
- Check TypeScript types
- Verify component imports
- Ensure all dependencies installed

**Export issues:**
- Wait longer for React render (adjust `setTimeout`)
- Check `#export-root` ID exists
- Verify canvas dimensions are correct

---

## AI Usage Guidelines

### Component Selection

When generating designs:

1. **Start with Platform/Format**
   ```tsx
   import { PLATFORM_DIMENSIONS } from './src/lib/constants';
   const size = PLATFORM_DIMENSIONS.instagram['post-square'];
   ```

2. **Choose Style Preset**
   - Match user's requested vibe
   - Consider content type (text-heavy vs data-heavy)
   - Check chart compatibility

3. **Add Charts (if needed)**
   - VisxChart for simple bar/line
   - PlotlyChart/Heatmap for complex visualizations
   - MetricCard/ProgressBar for KPIs

4. **Wrap for Export**
   ```tsx
   <ExportWrapper size={size}>
     <Canvas size={size}>
       {/* Content */}
     </Canvas>
   </ExportWrapper>
   ```

5. **Provide Export Command**
   ```bash
   npm run export <file> <platform> <format> <output>
   ```

### Code Patterns

**Pattern 1: Single Post with Style Preset**
```tsx
import { Canvas } from './src/components/canvas/Canvas';
import { BoldSignal } from './src/components/styles/BoldSignal';
import { ExportWrapper } from './src/components/export/ExportWrapper';
import { PLATFORM_DIMENSIONS } from './src/lib/constants';

const size = PLATFORM_DIMENSIONS.instagram['post-square'];

export default function Design() {
  return (
    <ExportWrapper size={size}>
      <Canvas size={size}>
        <BoldSignal
          headline="Your Headline"
          subtext="Your subtext"
          accentColor="#FF5722"
          size={size}
        />
      </Canvas>
    </ExportWrapper>
  );
}
```

**Pattern 2: Carousel with Multiple Charts**
```tsx
import { Carousel } from './src/components/canvas/Carousel';
import { CarouselPage } from './src/components/canvas/CarouselPage';
import { CanvasContent } from './src/components/canvas/CanvasContent';
import { VisxChart } from './src/components/charts/VisxChart';
import { MetricCard } from './src/components/charts/MetricCard';

<Carousel size={size}>
  <CarouselPage>
    <CanvasContent>
      {/* Page content */}
    </CanvasContent>
  </CarouselPage>
</Carousel>
```

**Pattern 3: Infographic with Heatmap**
```tsx
import { Heatmap } from './src/components/charts/Heatmap';
import { Icon } from './src/components/ui/Icon';

<Heatmap
  z={data}
  x={labels}
  y={labels}
  width={size.width * 0.75}
  height={size.height * 0.55}
/>

<Icon name="trending-up" size="large" color="#4CAF50" />
```

### Content Guidelines

**Maximum Content Per Canvas:**
- Quote post: 1 quote (max 3 lines) + attribution
- Headline post: 1 headline + 1 subtitle + CTA
- Feature post: 1 headline + 3-4 bullets or icons
- Image post: 1 headline + 1 image (max 60% height) + optional caption
- Carousel page: 1 heading + 3-4 points OR 1 heading + 1 image + caption
- Infographic: 1 heading + 4-6 data points/icons

**If content exceeds limits:**
- Split into carousel pages
- Reduce text (shorter headlines, fewer bullets)
- Use icons instead of text where possible
- Use charts to visualize data

---

## Example Designs

See `src/examples/` for complete working examples:

1. **instagram-post-example.tsx** - Bold Signal with icon
2. **linkedin-carousel-example.tsx** - Electric Studio with VisxChart, MetricCard, ProgressBar
3. **infographic-example.tsx** - Heatmap with stats

---

## See Also

- **SKILL.md** - Main skill workflow documentation
- **STYLE_PRESETS.md** - Style preset details with React templates
- **ICONS.md** - Icon usage guide with react-icons
