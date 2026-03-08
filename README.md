# Frontend Social Media Design

A Claude Code skill for creating stunning, branded social media designs — Instagram posts, stories, carousels, LinkedIn banners, Twitter cards, and more.

## What This Does

**Frontend Social Media Design** helps non-designers create beautiful social media graphics without knowing CSS or JavaScript. It uses a "show, don't tell" approach: instead of asking you to describe your aesthetic preferences in words, it generates visual previews and lets you pick what you like.

### Key Features

- **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools, no frameworks.
- **Visual Style Discovery** — Can't articulate design preferences? No problem. Pick from generated visual previews.
- **Carousel Support** — Create multi-page swipeable carousels for Instagram, LinkedIn, and more.
- **Unsplash Integration** — Automatically finds and downloads the perfect images for your content via Unsplash API.
- **Anti-AI-Slop** — Curated distinctive styles that avoid generic AI aesthetics (bye-bye, purple gradients on white).
- **Export-Ready** — Pixel-perfect designs at exact platform dimensions, ready to screenshot and post.

## Installation

### For Claude Code Users

Copy the skill files to your Claude Code skills directory:

```bash
# Create the skill directory
mkdir -p ~/.claude/skills/frontend-social-media

# Copy the files (or download from this repo)
cp SKILL.md ~/.claude/skills/frontend-social-media/
cp STYLE_PRESETS.md ~/.claude/skills/frontend-social-media/
```

Then use it by typing `/frontend-social-media` in Claude Code.

### Unsplash API Setup (Optional but Recommended)

1. Create a free account at [unsplash.com/developers](https://unsplash.com/developers)
2. Create a new application to get your Access Key
3. Set the environment variable:

```bash
export UNSPLASH_ACCESS_KEY="your_access_key_here"
```

The skill will automatically use this to search and download images that match your content. Without it, designs will use CSS-generated visuals (still looks great!).

### Manual Download

1. Download `SKILL.md` and `STYLE_PRESETS.md` from this repo
2. Place them in `~/.claude/skills/frontend-social-media/`
3. Restart Claude Code

## Usage

### Create a Single Post

```
/frontend-social-media

> "Create an Instagram post announcing our product launch"
```

The skill will:
1. Ask about your platform, format, and content
2. Search Unsplash for a matching background image (if enabled)
3. Generate 3 visual style previews for you to compare
4. Create the full design at exact platform dimensions
5. Open it in your browser for review and export

### Create a Carousel

```
/frontend-social-media

> "Make a LinkedIn carousel with 5 tips for remote work"
```

The skill will:
1. Ask about page count and content for each page
2. Help you pick a consistent visual style
3. Source images from Unsplash for visual variety (optional)
4. Generate a multi-page carousel with swipe navigation and page dots
5. Preview in browser — export individual pages as screenshots

### Export to Image

#### Option A — Automated (recommended for carousels)

An export script is included. It uses `puppeteer-core` with your existing system Chrome — no Chromium download needed.

**One-time setup:**
```bash
npm install puppeteer-core
```

**Export all carousel slides:**
```bash
# PNG (default)
node export-carousel.js

# JPEG at a specific quality
node export-carousel.js --format jpg --quality 95

# Custom output folder or file
node export-carousel.js --out ./my-slides --file ./my-carousel.html
```

Output files are named `slide-01.png`, `slide-02.png`, etc. and saved to `./carousel-export/` by default. Images are captured at **2× device pixel ratio** (2160×2160 px) for crisp Instagram-ready quality.

#### Option B — Manual (DevTools)

1. Open the HTML file in Chrome
2. Open DevTools → **Device Mode** (Ctrl/Cmd+Shift+M)
3. Set width and height to exact canvas dimensions (e.g. 1080×1080)
4. `Ctrl/Cmd+Shift+P` → **"Capture screenshot"**
5. Repeat for each slide (use the dot indicators to navigate)

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
- **Neural Research** — Minimal, academic, AI/tech-forward. Perfect for ML research carousels and model explainers.

### Light Themes
- **Notebook Tabs** — Editorial, organized. Perfect for educational carousels.
- **Pastel Geometry** — Friendly, approachable. Great for product features.
- **Split Pastel** — Playful, modern. Ideal for lifestyle content.
- **Vintage Editorial** — Witty, personality-driven. Perfect for personal brands.
- **Stripe Blueprint** — Clean, startup-engineering. Great for AI educational carousels and SaaS features.

### Specialty
- **Neon Cyber** — Futuristic, techy. Great for SaaS announcements.
- **Terminal Green** — Developer-focused, hacker aesthetic. Ideal for dev tips and tutorials.
- **Terminal Blue** — Developer-focused, corporate-tech. Great for enterprise AI and data-heavy carousels.
- **Swiss Modern** — Clean, Bauhaus-inspired. Perfect for infographics.
- **Paper & Ink** — Literary, thoughtful. Beautiful for quote posts.

## Output Example

Each design is a single, self-contained HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Fonts, CSS variables, all styles inline -->
    <style>
        :root {
            --canvas-width: 1080px;
            --canvas-height: 1080px;
            /* ... theme colors, fonts, spacing */
        }
    </style>
</head>
<body>
    <div class="canvas">
        <!-- Unsplash background image -->
        <img src="assets/bg.jpg" class="canvas-bg-image" alt="">
        <div class="canvas-overlay canvas-overlay--dark"></div>

        <div class="canvas-content">
            <h1>Your Headline</h1>
            <p>Your content here</p>
        </div>

        <a class="unsplash-credit" href="...">Photo by Name on Unsplash</a>
    </div>
</body>
</html>
```

Carousels include additional JavaScript for:
- Swipe/touch navigation
- Arrow key navigation
- Page indicator dots
- Page counter (e.g., "2 / 5")

## Philosophy

This skill was born from the belief that:

1. **You don't need to be a designer to make beautiful things.** You just need to react to what you see.

2. **Dependencies are debt.** A single HTML file will work in 10 years. A React project from 2019? Good luck.

3. **Generic is forgettable.** Every social media post should feel custom-crafted, not template-generated.

4. **Images matter.** Unsplash integration means your designs get real, high-quality photography without leaving your editor.

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Main skill instructions for Claude Code |
| `STYLE_PRESETS.md` | Reference file with 12 curated visual styles |
| `export-carousel.js` | Node.js script to export all carousel slides as PNG/JPG |

## Assets

Place all images referenced by carousel HTML files inside the `assets/` folder alongside the HTML file.

```
assets/
├── logo-[brand].png               # Brand logo shown in every slide header
├── demo-[feature-1].png           # Screenshot of the main product / landing page (used on cover)
├── demo-[feature-2].png           # Screenshot of a key feature dashboard
├── demo-[feature-3].png           # Screenshot of a form or data entry page
├── viz-[chart-name-1].png         # Chart visualization — e.g. sector distribution
└── viz-[chart-name-2].png         # Chart visualization — e.g. risk or metric breakdown
```

**Rules for the `assets/` folder:**
- Reference images with relative paths: `src="assets/filename.png"`
- Place the folder next to the HTML file (not inside a subdirectory)
- Keep original filenames — the HTML files reference them directly
- The `export-carousel.js` script requires asset files to be present locally (the `--allow-file-access-from-files` Chrome flag is set automatically)
- When adding a new carousel project, create a new `assets/` folder alongside its HTML file

## Requirements

- [Claude Code](https://claude.ai/claude-code) CLI
- For Unsplash images: Free API key from [unsplash.com/developers](https://unsplash.com/developers)
- For image processing: Python with `Pillow` library (optional)
- For automated export: Node.js + `npm install puppeteer-core` + Google Chrome installed

## Generated Content Example

See this skill in action — all carousels on **[@stelarealab](https://www.instagram.com/stelarealab/)** are generated using this AI skill.

[![stelarealab on Instagram](https://img.shields.io/badge/Instagram-%40stelarealab-E1306C?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/stelarealab/)

## Credits

Originally created by [@zarazhangrui](https://github.com/zarazhangrui) for frontend slides with Claude Code.

Adapted for social media design workflows by [@dikaizm](https://github.com/dikaizm).

## License

MIT — Use it, modify it, share it.
