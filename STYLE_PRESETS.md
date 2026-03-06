# Style Presets Reference

Curated visual styles for Frontend Social Media Design. Each preset is inspired by real design references—no generic "AI slop" aesthetics. **Abstract shapes only—no illustrations.**

---

## ⚠️ CRITICAL: Canvas Sizing (Non-Negotiable)

**Every design MUST use a fixed canvas size matching the target platform. The canvas is the final output — it must look pixel-perfect at the exact dimensions.**

### Standard Social Media Dimensions

| Platform | Format | Dimensions (px) | Aspect Ratio |
|----------|--------|-----------------|--------------|
| Instagram | Post (Square) | 1080 × 1080 | 1:1 |
| Instagram | Post (Portrait) | 1080 × 1350 | 4:5 |
| Instagram | Story / Reel | 1080 × 1920 | 9:16 |
| Instagram | Carousel Page | 1080 × 1080 or 1080 × 1350 | 1:1 or 4:5 |
| Facebook | Post | 1200 × 630 | 1.91:1 |
| Facebook | Story | 1080 × 1920 | 9:16 |
| Twitter / X | Post | 1200 × 675 | 16:9 |
| Twitter / X | Header | 1500 × 500 | 3:1 |
| LinkedIn | Post | 1200 × 628 | 1.91:1 |
| LinkedIn | Carousel Page | 1080 × 1080 or 1080 × 1350 | 1:1 or 4:5 |
| TikTok | Cover | 1080 × 1920 | 9:16 |
| YouTube | Thumbnail | 1280 × 720 | 16:9 |
| Pinterest | Pin | 1000 × 1500 | 2:3 |

### Content Density Limits Per Canvas

| Content Type | Maximum Content |
|--------------|----------------|
| Quote post | 1 quote (max 3 lines) + attribution + optional logo |
| Headline post | 1 headline + 1 subtitle + CTA |
| Feature post | 1 headline + 3-4 bullet points or icons |
| Image post | 1 headline + 1 image (max 60% canvas height) + optional caption |
| Carousel page | 1 heading + 3-4 points OR 1 heading + 1 image + caption |
| Infographic | 1 heading + 4-6 data points/icons |
| Promotional | 1 headline + 1 image/graphic + CTA button |

**Too much content? → Split into carousel pages or simplify. Never cram.**

### Required Base CSS (Include in ALL Designs)

```css
/* ===========================================
   CANVAS SIZING: MANDATORY
   Copy this entire block into every design.
   Adjust --canvas-width and --canvas-height per platform.
   =========================================== */

:root {
    /* Canvas dimensions — change per platform */
    --canvas-width: 1080px;
    --canvas-height: 1080px;

    /* Typography — scales relative to canvas.
       For a 1080×1080 social-media canvas, the `clamp()` defaults below
       are often too small. Use fixed px values instead:
         --title-size: 108–120px
         --h2-size:    84–96px
         --body-size:  36–42px
         --small-size: 27–33px
         --micro-size: 21–24px
       Only use clamp() when the same file must render at multiple sizes. */
    --title-size: clamp(42px, 8.25cqw, 108px);
    --h2-size: clamp(33px, 6cqw, 72px);
    --body-size: clamp(21px, 3.3cqw, 36px);
    --small-size: clamp(15px, 2.25cqw, 24px);

    /* Spacing */
    --canvas-padding: clamp(24px, 5cqw, 80px);
    --content-gap: clamp(12px, 2.5cqw, 32px);
}

/* 1. Page setup — center the canvas on screen */
html, body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1a1a;
}

/* 2. Single canvas = fixed dimensions */
.canvas {
    width: var(--canvas-width);
    height: var(--canvas-height);
    overflow: hidden; /* CRITICAL: no overflow ever */
    position: relative;
    display: flex;
    flex-direction: column;
    container-type: inline-size; /* Enable container queries */
}

/* 3. Content wrapper */
.canvas-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 100%;
    overflow: hidden;
    padding: var(--canvas-padding);
}

/* 4. Images constrained to canvas */
img {
    max-width: 100%;
    max-height: 60%;
    object-fit: contain;
}

/* 5. Grids adapt to canvas space */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
    gap: var(--content-gap);
}

/* ===========================================
   UNSPLASH IMAGE OVERLAY
   For background images fetched via Unsplash API
   =========================================== */

.canvas-bg-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
}

/* Dark overlay for text readability on photos */
.canvas-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
}

.canvas-overlay--dark {
    background: linear-gradient(180deg,
        rgba(0,0,0,0.3) 0%,
        rgba(0,0,0,0.6) 100%
    );
}

.canvas-overlay--gradient {
    background: linear-gradient(135deg,
        rgba(0,0,0,0.7) 0%,
        rgba(0,0,0,0.2) 100%
    );
}

/* Content above the overlay */
.canvas-content {
    position: relative;
    z-index: 2;
}

/* Unsplash attribution (required by API terms) */
.unsplash-credit {
    position: absolute;
    bottom: 8px;
    right: 12px;
    font-size: 10px;
    color: rgba(255,255,255,0.5);
    z-index: 3;
    text-decoration: none;
}

/* ===========================================
   REDUCED MOTION
   =========================================== */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.2s !important;
    }
}
```

### Carousel CSS Architecture

For carousel (multi-page) designs, use horizontal scroll-snap:

```css
/* ===========================================
   CAROUSEL: MANDATORY FOR MULTI-PAGE DESIGNS
   =========================================== */

/* Carousel wrapper replaces single .canvas */
.carousel {
    width: var(--canvas-width);
    height: var(--canvas-height);
    overflow: hidden;
    position: relative;
}

.carousel-track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Each page = one canvas-sized frame */
.carousel-page {
    min-width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    container-type: inline-size;
}

.carousel-page .canvas-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--canvas-padding);
    overflow: hidden;
}

/* Page indicators (dots) */
.carousel-dots {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
}

.carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
}

.carousel-dot.active {
    background: rgba(255,255,255,0.9);
    transform: scale(1.3);
}

/* Navigation arrows */
.carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    backdrop-filter: blur(4px);
}

.carousel-nav:hover {
    background: rgba(255,255,255,0.3);
}

.carousel-nav--prev { left: 12px; }
.carousel-nav--next { right: 12px; }

/* Page counter (e.g., "2 / 5") */
.carousel-counter {
    position: absolute;
    top: 16px;
    right: 20px;
    font-size: var(--small-size);
    color: rgba(255,255,255,0.6);
    z-index: 10;
    font-variant-numeric: tabular-nums;
}
```

### Canvas Sizing Checklist

Before finalizing any design, verify:

- [ ] `.canvas` or `.carousel-page` has exact `width` and `height` set (no `100vh`)
- [ ] All font sizes use `clamp()` or fixed sizes appropriate for the canvas
- [ ] All spacing uses `clamp()` or fixed values
- [ ] Content respects density limits (max 4 bullets, max 1 image per canvas)
- [ ] `overflow: hidden` is set on the canvas/page
- [ ] Images have proper `max-height` constraints
- [ ] No negated CSS functions (use `calc(-1 * clamp(...))` not `-clamp(...)`)
- [ ] Unsplash images have an overlay for text readability
- [ ] Unsplash attribution is included when using API photos

---

## Dark Themes

### 1. Bold Signal

**Vibe:** Confident, bold, modern, high-impact

**Layout:** Colored card on dark gradient. Number top-left, headline centered.

**Typography:**
- Display: `Archivo Black` (900)
- Body: `Space Grotesk` (400/500)

**Colors:**
```css
:root {
    --bg-primary: #1a1a1a;
    --bg-gradient: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
    --card-bg: #FF5722;
    --text-primary: #ffffff;
    --text-on-card: #1a1a1a;
}
```

**Signature Elements:**
- Bold colored card as focal point (orange, coral, or vibrant accent)
- Large section numbers (01, 02, etc.)
- Grid-based layout for precise alignment

**Best For:** Bold promotional posts, product launches, carousel cover pages

---

### 2. Electric Studio

**Vibe:** Bold, clean, professional, high contrast

**Layout:** Split panel—white top, blue bottom. Brand marks in corners.

**Typography:**
- Display: `Manrope` (800)
- Body: `Manrope` (400/500)

**Colors:**
```css
:root {
    --bg-dark: #0a0a0a;
    --bg-white: #ffffff;
    --accent-blue: #4361ee;
    --text-dark: #0a0a0a;
    --text-light: #ffffff;
}
```

**Signature Elements:**
- Two-panel vertical split
- Accent bar on panel edge
- Quote typography as hero element
- Minimal, confident spacing

**Best For:** Agency portfolios, LinkedIn posts, professional brand content

---

### 3. Creative Voltage

**Vibe:** Bold, creative, energetic, retro-modern

**Layout:** Split panels—electric blue left, dark right. Script accents.

**Typography:**
- Display: `Syne` (700/800)
- Mono: `Space Mono` (400/700)

**Colors:**
```css
:root {
    --bg-primary: #0066ff;
    --bg-dark: #1a1a2e;
    --accent-neon: #d4ff00;
    --text-light: #ffffff;
}
```

**Signature Elements:**
- Electric blue + neon yellow contrast
- Halftone texture patterns
- Neon badges/callouts
- Script typography for creative flair

**Best For:** Creative announcements, event promotions, hype content

---

### 4. Dark Botanical

**Vibe:** Elegant, sophisticated, artistic, premium

**Layout:** Centered content on dark. Abstract soft shapes in corner.

**Typography:**
- Display: `Cormorant` (400/600) — elegant serif
- Body: `IBM Plex Sans` (300/400)

**Colors:**
```css
:root {
    --bg-primary: #0f0f0f;
    --text-primary: #e8e4df;
    --text-secondary: #9a9590;
    --accent-warm: #d4a574;
    --accent-pink: #e8b4b8;
    --accent-gold: #c9b896;
}
```

**Signature Elements:**
- Abstract soft gradient circles (blurred, overlapping)
- Warm color accents (pink, gold, terracotta)
- Thin vertical accent lines
- Italic signature typography
- **No illustrations—only abstract CSS shapes**

**Best For:** Luxury branding, beauty/wellness content, inspirational quotes

---

## Light Themes

### 5. Notebook Tabs

**Vibe:** Editorial, organized, elegant, tactile

**Layout:** Cream paper card on dark background. Colorful tabs on right edge.

**Typography:**
- Display: `Bodoni Moda` (400/700) — classic editorial
- Body: `DM Sans` (400/500)

**Colors:**
```css
:root {
    --bg-outer: #2d2d2d;
    --bg-page: #f8f6f1;
    --text-primary: #1a1a1a;
    --tab-1: #98d4bb; /* Mint */
    --tab-2: #c7b8ea; /* Lavender */
    --tab-3: #f4b8c5; /* Pink */
    --tab-4: #a8d8ea; /* Sky */
    --tab-5: #ffe6a7; /* Cream */
}
```

**Signature Elements:**
- Paper container with subtle shadow
- Colorful section tabs on right edge (vertical text)
- Binder hole decorations on left

**Best For:** Educational carousels, list posts, tips & tutorials

---

### 6. Pastel Geometry

**Vibe:** Friendly, organized, modern, approachable

**Layout:** White card on pastel background. Vertical pills on right edge.

**Typography:**
- Display: `Plus Jakarta Sans` (700/800)
- Body: `Plus Jakarta Sans` (400/500)

**Colors:**
```css
:root {
    --bg-primary: #c8d9e6;
    --card-bg: #faf9f7;
    --pill-pink: #f0b4d4;
    --pill-mint: #a8d4c4;
    --pill-sage: #5a7c6a;
    --pill-lavender: #9b8dc4;
    --pill-violet: #7c6aad;
}
```

**Signature Elements:**
- Rounded card with soft shadow
- **Vertical pills on right edge** with varying heights (like tabs)
- Consistent pill width, heights: short → medium → tall → medium → short
- Download/action icon in corner

**Best For:** Product features, how-to posts, app showcases

---

### 7. Split Pastel

**Vibe:** Playful, modern, friendly, creative

**Layout:** Two-color vertical split (peach left, lavender right).

**Typography:**
- Display: `Outfit` (700/800)
- Body: `Outfit` (400/500)

**Colors:**
```css
:root {
    --bg-peach: #f5e6dc;
    --bg-lavender: #e4dff0;
    --text-dark: #1a1a1a;
    --badge-mint: #c8f0d8;
    --badge-yellow: #f0f0c8;
    --badge-pink: #f0d4e0;
}
```

**Signature Elements:**
- Split background colors
- Playful badge pills with icons
- Grid pattern overlay on right panel
- Rounded CTA buttons

**Best For:** Lifestyle content, comparison posts, before/after carousels

---

### 8. Vintage Editorial

**Vibe:** Witty, confident, editorial, personality-driven

**Layout:** Centered content on cream. Abstract geometric shapes as accent.

**Typography:**
- Display: `Fraunces` (700/900) — distinctive serif
- Body: `Work Sans` (400/500)

**Colors:**
```css
:root {
    --bg-cream: #f5f3ee;
    --text-primary: #1a1a1a;
    --text-secondary: #555;
    --accent-warm: #e8d4c0;
}
```

**Signature Elements:**
- Abstract geometric shapes (circle outline + line + dot)
- Bold bordered CTA boxes
- Witty, conversational copy style
- **No illustrations—only geometric CSS shapes**

**Best For:** Personal brand content, thought leadership, quote posts

---

## Specialty Themes

### 9. Neon Cyber

**Vibe:** Futuristic, techy, confident

**Typography:** `Clash Display` + `Satoshi` (Fontshare)

**Colors:** Deep navy (#0a0f1c), cyan accent (#00ffcc), magenta (#ff00aa)

**Signature:** Particle backgrounds, neon glow, grid patterns

**Best For:** Tech product launches, SaaS announcements, developer content

---

### 10. Terminal Green

**Vibe:** Developer-focused, hacker aesthetic

**Typography:** `JetBrains Mono` (monospace only)

**Colors:** GitHub dark (#0d1117), terminal green (#39d353)

**Signature:** Scan lines, blinking cursor, code syntax styling

**Best For:** Dev tips carousels, coding tutorials, tech memes

---

### 10b. Terminal Blue

**Vibe:** Developer-focused, corporate-tech, data-driven — Terminal Green with every green accent replaced by blue. Use when the brand is professional/enterprise rather than hacker/OSS.

**Derived from:** Terminal Green (preset #10) — swap `#39d353` → `#4d9fff` throughout.

**Typography:** `JetBrains Mono` (monospace only, same as Terminal Green)

**Colors:**
```css
:root {
    --bg-primary:   #0d1117;   /* GitHub dark — unchanged */
    --bg-secondary: #161b22;
    --bg-panel:     #1a2233;   /* Code block background */
    --border-dim:   #21334a;

    --blue-bright:  #4d9fff;   /* Primary accent (replaces terminal green) */
    --blue-dim:     #1a6aff;   /* Secondary accent */

    --text-primary: #e6edf3;
    --text-secondary:#8b949e;
    --text-muted:   #484f58;
    --text-blue:    #79c0ff;   /* Pale blue — keyword color */
    --text-green:   #56d364;   /* Kept only for data/numbers */
    --text-orange:  #e3b341;   /* Strings / string values */

    --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
```

**Signature Elements:**
- Repeating scanline overlay (subtle `rgba(77,159,255,0.018)` stripe every 4px)
- Ambient corner glow: `radial-gradient` circle in bottom-right, `rgba(77,159,255,0.12)`
- Grid background (`54px × 54px`) with `opacity: 0.35` on cover/CTA pages
- `border-left: 3px solid var(--blue-bright)` on code boxes
- Stat bars: `linear-gradient(90deg, var(--blue-dim), var(--blue-bright))` with `box-shadow: 0 0 8px rgba(77,159,255,0.5)`
- Metric cards: top accent strip `linear-gradient(90deg, --blue-dim, --blue-bright)`
- Slide header: logo left · source badge center · page counter right

**No Animations Rule (for exports):**
> All `animation:` and `@keyframes` declarations MUST be removed before export. Static versions of animated elements (cursor stays solid, dot stays on) are used instead. This ensures exported PNG/JPG frames are crisp with no mid-animation glitch frames.

**Layout Pattern (Portrait 1080 × 1350):**
- **Slide header** (fixed top): logo + source badge + page counter
- **Thin horizontal divider** after header
- **`canvas-content`**: section label (`// LABEL`) → headline → data component
- **No footer source line** on interior slides — source credit only on the final CTA slide

**Best For:** Financial services, enterprise AI, SaaS, data-heavy research carousels, professional brand content

---

### 11. Swiss Modern

**Vibe:** Clean, precise, Bauhaus-inspired

**Typography:** `Archivo` (800) + `Nunito` (400)

**Colors:** Pure white, pure black, red accent (#ff3300)

**Signature:** Visible grid, asymmetric layouts, geometric shapes

**Best For:** Data visualizations, infographic posts, minimalist brands

---

### 12. Paper & Ink

**Vibe:** Editorial, literary, thoughtful

**Typography:** `Cormorant Garamond` + `Source Serif 4`

**Colors:** Warm cream (#faf9f7), charcoal (#1a1a1a), crimson accent (#c41e3a)

**Signature:** Drop caps, pull quotes, elegant horizontal rules

**Best For:** Long-form quote posts, book/article promotions, storytelling carousels

---

## Font Pairing Quick Reference

| Preset | Display Font | Body Font | Source |
|--------|--------------|-----------|--------|
| Bold Signal | Archivo Black | Space Grotesk | Google |
| Electric Studio | Manrope | Manrope | Google |
| Creative Voltage | Syne | Space Mono | Google |
| Dark Botanical | Cormorant | IBM Plex Sans | Google |
| Notebook Tabs | Bodoni Moda | DM Sans | Google |
| Pastel Geometry | Plus Jakarta Sans | Plus Jakarta Sans | Google |
| Split Pastel | Outfit | Outfit | Google |
| Vintage Editorial | Fraunces | Work Sans | Google |
| Neon Cyber | Clash Display | Satoshi | Fontshare |
| Terminal Green | JetBrains Mono | JetBrains Mono | JetBrains |
| Terminal Blue | JetBrains Mono | JetBrains Mono | JetBrains |

---

## DO NOT USE (Generic AI Patterns)

**Fonts:** Inter, Roboto, Arial, system fonts as display

**Colors:** `#6366f1` (generic indigo), purple gradients on white

**Layouts:** Everything centered identically, generic hero sections, identical card grids

**Decorations:** Realistic illustrations, gratuitous glassmorphism, drop shadows without purpose

---

## CSS Gotchas (Common Mistakes)

### Negating CSS Functions

**WRONG — silently ignored by browsers:**
```css
right: -clamp(28px, 3.5vw, 44px);   /* ❌ Invalid! Browser ignores this */
margin-left: -min(10vw, 100px);      /* ❌ Invalid! */
top: -max(2rem, 4vh);                /* ❌ Invalid! */
```

**CORRECT — wrap in `calc()`:**
```css
right: calc(-1 * clamp(28px, 3.5vw, 44px));  /* ✅ */
margin-left: calc(-1 * min(10vw, 100px));     /* ✅ */
top: calc(-1 * max(2rem, 4vh));               /* ✅ */
```

CSS does not allow a leading `-` before function names like `clamp()`, `min()`, `max()`. The browser silently discards the entire declaration, causing the property to fall back to its initial/inherited value. This is especially dangerous because there is no console error — the element simply appears in the wrong position.

**Rule: Always use `calc(-1 * ...)` to negate CSS function values.**

---

## Troubleshooting Canvas Issues

### Content Overflows the Canvas

**Symptoms:** Content cut off, elements outside the visible area

**Solutions:**
1. Check canvas has `overflow: hidden` (not `overflow: auto` or `visible`)
2. Reduce content — split into carousel pages
3. Ensure all font sizes use `clamp()` or fixed sizes appropriate for the canvas
4. Check images have `max-height` constraints (e.g., `max-height: 60%`)

### Text Unreadable Over Unsplash Background

**Symptoms:** Text blends into background image, poor contrast

**Solutions:**
1. Add `.canvas-overlay--dark` or `.canvas-overlay--gradient` between image and content
2. Use text-shadow: `text-shadow: 0 2px 8px rgba(0,0,0,0.5)`
3. Add a semi-transparent card behind text
4. Choose a darker Unsplash image (append `&w=1080&q=80&fm=jpg` for quality control)

### Carousel Pages Inconsistent

**Symptoms:** Different pages have different visual weight or awkward transitions

**Solutions:**
1. Use the same `--canvas-padding` and `--content-gap` across all pages
2. Keep heading position consistent (same top offset)
3. Use page numbering for context (e.g., "2 / 5")
4. Maintain the same background treatment across all pages

### Exporting to Image

**Recommendation:** Use the included `export-carousel.js` script (requires `npm install puppeteer-core`). It auto-detects system Chrome and captures each slide at exact canvas dimensions.

```bash
# Export all slides as PNG
node export-carousel.js

# Export as JPEG (quality 0–100)
node export-carousel.js --format jpg --quality 95

# Custom output folder or HTML file
node export-carousel.js --out ./slides --file ./my-carousel.html
```

**Script pattern (puppeteer-core + system Chrome):**
```js
const puppeteer = require('puppeteer-core');
// 1. Launch with executablePath pointing to system Chrome
// 2. setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 }) for crisp 2× output
// 3. For each slide: set track translateX(-N*100%), wait 150ms, screenshot with clip to .carousel bounds
// 4. Screenshot type: 'jpeg' (quality) or 'png'
```

**Key settings:**
- `deviceScaleFactor: 2` — produces crisp 2160×2160 output (Instagram displays at 2×)
- `clip` to `.carousel` `getBoundingClientRect()` — strips browser chrome
- Set `transition: none` before each slide to avoid animation blink
- `--allow-file-access-from-files` flag required for `file://` local assets

**Manual method:** Browser DevTools → Device Mode → set 1080×1080 → screenshot.
