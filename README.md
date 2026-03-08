# Frontend Social Media Design

A Claude Code skill for creating stunning, branded social media designs using React components — Instagram posts, stories, carousels, LinkedIn banners, Twitter cards, and more.

## What This Does

**Frontend Social Media Design** helps non-designers create beautiful social media graphics without knowing CSS or JavaScript. It uses a "show, don't tell" approach: instead of asking you to describe your aesthetic preferences in words, it generates React components and visual previews that let you pick what you like.

**v2.0:** Now uses React + TypeScript components with built-in chart libraries (visx, Plotly) for advanced data visualization.

### Key Features

- **React Components** - Modern, type-safe components for AI to generate and adapt
- **Visual Style Discovery** — Can't articulate design preferences? No problem. Pick from generated visual previews.
- **Advanced Charts** - Built-in support for visx and Plotly.js for complex data visualizations
- **Carousel Support** — Create multi-page swipeable carousels with Framer Motion animations
- **Unsplash Integration** — Automatically finds and downloads the perfect images for your content via Unsplash API.
- **Anti-AI-Slop** — Curated distinctive styles that avoid generic AI aesthetics (bye-bye, purple gradients on white).
- **Export-Ready** - Integrated build and export pipeline (Vite + Puppeteer) for pixel-perfect output
- **Professional Icons** - Use react-icons, lucide-react, or FontAwesome instead of emoji for polished designs
- **Dual Audience** - Serves both technical users (React developers) and non-technical users (just export images)

## Installation

### For Claude Code Users

Copy the skill files to your Claude Code skills directory:

```bash
# Create the skill directory
mkdir -p ~/.claude/skills/frontend-social-media

# Copy the files (or download from this repo)
cp SKILL.md ~/.claude/skills/frontend-social-media/
cp STYLE_PRESETS.md ~/.claude/skills/frontend-social-media/
cp REACT_REFERENCE.md ~/.claude/skills/frontend-social-media/
cp ICONS.md ~/.claude/skills/frontend-social-media/
```

Then use it by typing `/frontend-social-media` in Claude Code.

### Install Dependencies

```bash
npm install
```

This installs:
- React 18 + TypeScript
- Charts: @visx/xychart, react-plotly.js
- Animations: framer-motion
- Icons: react-icons, lucide-react
- Export: puppeteer-core, html2canvas
- State: zustand

### Unsplash API Setup (Optional but Recommended)

1. Create a free account at [unsplash.com/developers](https://unsplash.com/developers)
2. Create a new application to get your Access Key
3. Set the environment variable:

```bash
export UNSPLASH_ACCESS_KEY="your_access_key_here"
```

The skill will automatically use this to search and download images that match your content. Without it, designs will use CSS-generated visuals (still looks great!).

## Usage

### How the Skill Works

1. **User Request:** "Create an Instagram post announcing our product launch"

2. **AI Generates:**
   - React component file (`.tsx`)
   - Export command to run
   - Instructions on customizing if needed

3. **User Exports:**
   ```bash
   npm run export <design-file> <platform> <format> <output-path>
   ```

4. **Output:** High-quality image at exact platform dimensions

### Create a Single Post

```
/frontend-social-media

> "Create an Instagram post announcing our product launch"
```

The skill will:
1. Ask about your platform, format, and content
2. Generate 3 visual style previews for you to compare
3. Create a React component with chosen style preset
4. Provide export command
5. You run the command → get image

### Create a Carousel

```
/frontend-social-media

> "Make a LinkedIn carousel with 5 tips for remote work"
```

The skill will:
1. Ask about page count and content for each page
2. Help you pick a consistent visual style
3. Generate React components with Carousel structure
4. Include charts/data visualizations if needed
5. Provide export command for each slide

### Using Professional Icons

The skill supports multiple icon libraries:

**Recommended:** lucide-react (Modern, clean icons)
- `npm install lucide-react`
- Tree-shakeable, excellent TypeScript support

**Alternative:** react-icons (Comprehensive library)
- `npm install react-icons`
- 100,000+ icons from multiple libraries

**Usage:**
```tsx
import { Icon } from './src/components/ui/Icon';

<Icon name="check-circle" library="lucide" size="medium" color="#4CAF50" />
```

See `ICONS.md` for complete icon reference and style-specific recommendations.

### Export to Image

**Automated Export (Recommended):**

The skill includes an integrated export pipeline using Vite + Puppeteer.

```bash
# Instagram post
npm run export src/examples/instagram-post-example.tsx instagram post-square ./output.png

# LinkedIn carousel (exports first slide)
npm run export src/examples/linkedin-carousel-example.tsx linkedin carousel ./slide-01.png

# Infographic
npm run export src/examples/infographic-example.tsx instagram post-square ./infographic.png
```

**Export Process:**
1. Vite compiles React component to JS/CSS
2. HTML wrapper is created
3. Puppeteer opens HTML in headless Chrome
4. Screenshot captures `#export-root` at 2× scale
5. PNG is saved to specified path

**Quality:**
- 2× device pixel ratio (2160×2160 for Instagram 1080×1080)
- PNG format for lossless quality
- Exact platform dimensions

### For React Developers

Technical users can:
- Take generated React components and use them in their own apps
- Modify components for interactivity
- Use components as templates for design systems
- Integrate with their build pipelines

All components are fully typed with TypeScript interfaces.

## Supported Platforms

| Platform | Formats |
|----------|---------|
| Instagram | Post (1080×1080), Portrait (1080×1350), Story (1080×1920), Carousel |
| LinkedIn | Post (1200×628), Carousel |
| Twitter / X | Post (1200×675), Header (1500×500) |
| Facebook | Post (1200×630), Story (1080×1920) |
| YouTube | Thumbnail (1280×720) |
| Pinterest | Pin (1000×1500) |
| TikTok | Cover (1080×1920) |

## Included Styles

### Dark Themes
- **Bold Signal** — Confident, high-impact. Great for product launches.
- **Electric Studio** — Clean, professional. Perfect for agency portfolios.
- **Creative Voltage** — Energetic, retro-modern. Ideal for event promotions.
- **Dark Botanical** — Elegant, sophisticated. Beautiful for luxury brands.

### Light Themes
- **Clean Prism** — Clean white layout with orange-purple prism gradient. Perfect for modern, minimalist designs.
- **Notebook Tabs** — Editorial, organized. Perfect for educational carousels.
- **Pastel Geometry** — Friendly, approachable. Great for product features.
- **Split Pastel** — Playful, modern. Ideal for lifestyle content.
- **Vintage Editorial** — Witty, personality-driven. Perfect for personal brands.

### Specialty
- **Neon Cyber** — Futuristic, techy. Great for SaaS announcements.
- **Terminal Green** — Developer-focused. Ideal for dev tips and tutorials.
- **Swiss Modern** — Clean, Bauhaus-inspired. Perfect for infographics.
- **Paper & Ink** — Literary, thoughtful. Beautiful for quote posts.

## Component Library

### Base Components
- **Canvas** - Fixed-size canvas container
- **Carousel** - Multi-page carousel with Framer Motion
- **CarouselPage** - Single carousel page
- **CanvasContent** - Flexible content wrapper

### Style Presets
All 13 style presets as React components:
- **BoldSignal**, **ElectricStudio**, **CreativeVoltage**, **DarkBotanical**
- **CleanPrism**, **NotebookTabs**, **PastelGeometry**, **SplitPastel**, **VintageEditorial**
- **NeonCyber**, **TerminalGreen**, **TerminalBlue**, **SwissModern**, **PaperInk**

### Chart Components
- **VisxChart** - Custom bar/line charts using visx
- **PlotlyChart** - Complex charts using Plotly.js
- **Heatmap** - Heatmap visualization
- **MetricCard** - KPI display with icon
- **ProgressBar** - Progress bar with label

### UI Components
- **Icon** - Icon wrapper for react-icons and lucide-react
- **ExportWrapper** - Export wrapper with `#export-root` ID

See `REACT_REFERENCE.md` for complete component documentation with examples.

## Example Designs

See `src/examples/` for complete working examples:

1. **instagram-post-example.tsx** - Bold Signal with icon
2. **linkedin-carousel-example.tsx** - Electric Studio with VisxChart, MetricCard, ProgressBar
3. **infographic-example.tsx** - Heatmap with trend stats
4. **tech-launch-carousel-example.tsx** - Neon Cyber 4-page tech launch carousel
5. **clean-prism-example.tsx** - Clean Prism with feature list and hover effects

Run examples:
```bash
npm run export src/examples/clean-prism-example.tsx instagram post-square ./clean-prism.png
```

## Philosophy

This skill was born from the belief that:

1. **You don't need to be a designer to make beautiful things.** You just need to react to what you see.

2. **Components are better than templates.** AI can adapt and compose React components to create custom designs, not just fill in templates.

3. **Rich ecosystem enables creativity.** Access to visx, Plotly, Framer Motion means more creative possibilities.

4. **Generic is forgettable.** Every social media post should feel custom-crafted, not template-generated.

5. **Images matter.** Unsplash integration means your designs get real, high-quality photography without leaving your editor.

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Main skill workflow documentation (React-based) |
| `STYLE_PRESETS.md` | Style preset details with React templates |
| `REACT_REFERENCE.md` | Complete component library reference |
| `ICONS.md` | Icon usage guide with react-icons |
| `package.json` | Dependencies and npm scripts |
| `export-scripts/export-design.ts` | Export pipeline (Vite + Puppeteer) |

## Component Structure

```
src/
├── components/
│   ├── canvas/          # Base layout components
│   ├── styles/          # 12 style preset components
│   ├── charts/          # Data visualization components
│   ├── ui/              # Reusable UI components
│   └── export/          # Export wrapper
├── hooks/              # Custom React hooks
├── lib/               # Constants and utilities
└── examples/           # Complete example designs
```

## Requirements

- [Claude Code](https://claude.ai/claude-code) CLI
- Node.js 18+ and npm
- Google Chrome (for Puppeteer export)
- For Unsplash images: Free API key from [unsplash.com/developers](https://unsplash.com/developers)

## Credits

Originally created by [@zarazhangrui](https://github.com/zarazhangrui) for frontend slides with Claude Code.

Migrated to React + TypeScript by [@dikaizm](https://github.com/dikaizm).

## License

MIT — Use it, modify it, share it.
