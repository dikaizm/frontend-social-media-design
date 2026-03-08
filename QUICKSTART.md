# Quick Start Guide

Get started with the React-based Frontend Social Media Design skill in 5 minutes.

## Step 1: Install Dependencies

```bash
npm install
```

This installs React 18, TypeScript, Vite, chart libraries, and all dependencies.

## Step 2: Test the Export Pipeline

Run one of the example designs to verify everything works:

```bash
# Example 1: Instagram post with Bold Signal
npm run export src/examples/instagram-post-example.tsx instagram post-square ./test-instagram.png

# Example 2: LinkedIn carousel with charts
npm run export src/examples/linkedin-carousel-example.tsx linkedin carousel ./test-linkedin.png

# Example 3: Infographic with Heatmap
npm run export src/examples/infographic-example.tsx instagram post-square ./test-infographic.png
```

Expected output:
```
🎨  Design Exporter
   Design : src/examples/instagram-post-example.tsx
   Platform: instagram
   Format : post-square
   Size   : 1080 × 1080
   Output : /path/to/your/project/test-instagram.png

🔨  Building design...
✅  Build complete

📸  Exporting image...
🎉  Done! Image saved to:
   /path/to/your/project/test-instagram.png
```

## Step 3: View the Output

Open the generated PNG file to see the result:
```bash
open test-instagram.png
```

You should see a high-quality 1080×1080 image with the Bold Signal design.

## Step 4: Create Your Own Design

### Example: Simple Instagram Post

Create a file `my-design.tsx`:

```tsx
import React from 'react';
import { Canvas } from './src/components/canvas/Canvas';
import { BoldSignal } from './src/components/styles/BoldSignal';
import { ExportWrapper } from './src/components/export/ExportWrapper';
import { PLATFORM_DIMENSIONS } from './src/lib/constants';

const size = PLATFORM_DIMENSIONS.instagram['post-square'];

export default function MyDesign() {
  return (
    <ExportWrapper size={size}>
      <Canvas size={size}>
        <BoldSignal
          headline="Hello World"
          subtext="My first social media design"
          number="01"
          accentColor="#4361ee"
          size={size}
        />
      </Canvas>
    </ExportWrapper>
  );
}
```

Export it:

```bash
npm run export my-design.tsx instagram post-square ./my-design.png
```

### Example: Carousel with Charts

Create a file `my-carousel.tsx`:

```tsx
import React from 'react';
import { Canvas } from './src/components/canvas/Canvas';
import { Carousel } from './src/components/canvas/Carousel';
import { CarouselPage } from './src/components/canvas/CarouselPage';
import { CanvasContent } from './src/components/canvas/CanvasContent';
import { VisxChart } from './src/components/charts/VisxChart';
import { ExportWrapper } from './src/components/export/ExportWrapper';
import { PLATFORM_DIMENSIONS } from './src/lib/constants';

const size = PLATFORM_DIMENSIONS.linkedin.carousel;
const data = [
  { label: 'Q1', value: 45 },
  { label: 'Q2', value: 78 },
  { label: 'Q3', value: 62 },
];

export default function MyCarousel() {
  return (
    <ExportWrapper size={size}>
      <Canvas size={size}>
        <Carousel size={size} showDots={true}>
          <CarouselPage>
            <CanvasContent>
              <h1 style={{ fontSize: '48px', color: '#fff' }}>Page 1: Cover</h1>
            </CanvasContent>
          </CarouselPage>
          <CarouselPage>
            <CanvasContent>
              <h1 style={{ fontSize: '48px', color: '#fff' }}>Page 2: Chart</h1>
              <VisxChart
                data={data}
                width={500}
                height={300}
                color="#4361ee"
                type="bar"
              />
            </CanvasContent>
          </CarouselPage>
        </Carousel>
      </Canvas>
    </ExportWrapper>
  );
}
```

Export each slide:
```bash
# Slide 1 (default)
npm run export my-carousel.tsx linkedin carousel ./slide-01.png

# Note: To export all slides in a carousel, you would need to modify the
# export script to iterate through carousel pages or use the original
# export-carousel.js script with the generated HTML file.
```

## Common Issues

### "Chrome not found" Error

Install Google Chrome:
```bash
# macOS
brew install --cask google-chrome

# Linux (Ubuntu/Debian)
sudo apt-get install google-chrome-stable

# Linux (Fedora)
sudo dnf install google-chrome
```

Or update the Chrome path in `export-scripts/export-design.ts`.

### "Cannot find module" Error

Make sure dependencies are installed:
```bash
npm install
```

### TypeScript Errors

Check that all imports are correct:
- Use relative paths from project root: `'./src/components/...'`
- Verify component exports exist in the files

### Build Fails

Ensure your component is a valid React component:
- Must have a default export
- Must return JSX
- Must have proper TypeScript types

## Platform & Format Reference

### Instagram
- `post-square`: 1080×1080
- `post-portrait`: 1080×1350
- `story`: 1080×1920
- `carousel`: 1080×1080

### LinkedIn
- `post`: 1200×628
- `carousel`: 1080×1080

### Twitter
- `post`: 1200×675
- `header`: 1500×500

### Facebook
- `post`: 1200×630
- `story`: 1080×1920

### YouTube
- `thumbnail`: 1280×720

### Pinterest
- `pin`: 1000×1500

### TikTok
- `cover`: 1080×1920

## Next Steps

- Read `REACT_REFERENCE.md` for complete component documentation
- Read `STYLE_PRESETS.md` for style preset details
- Read `ICONS.md` for icon usage guide
- Explore `src/examples/` for more examples

## Using the Skill with Claude Code

1. Install the skill files in `~/.claude/skills/frontend-social-media/`
2. Restart Claude Code
3. Type `/frontend-social-media`
4. Answer the questions about platform, format, content, style
5. Get React component code and export command
6. Run the command to generate your image

## For Technical Users

If you're a React developer, you can:

1. **Copy the generated component** into your own project
2. **Customize it** with your own data, styling, or interactivity
3. **Use components as templates** for your design system
4. **Integrate** with your build pipeline

All components have full TypeScript support and are production-ready.

## Support

If you encounter issues:

1. Check the error message in the terminal
2. Verify all dependencies are installed (`npm install`)
3. Ensure Google Chrome is installed
4. Check your component syntax (TypeScript errors)
5. See `REACT_REFERENCE.md` → "Troubleshooting" section

Happy designing! 🎨
