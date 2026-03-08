# Icon System Quick Reference

## Overview

Replace emoji icons with professional icons for polished, professional social media designs.

## Installation

### For React Projects
```bash
npm install react-icons
```

### For Static HTML (No Installation Required)
Just add CDN links to your HTML file.

## Quick Start

### Option 1: React Icons (React Projects)

```jsx
import { FaCheckCircle, FaDownload, FaStar } from 'react-icons/fa';
import { PhCheckCircle, PhDownloadSimple, PhStar } from 'react-icons/ph';

// Font Awesome icons
<FaCheckCircle size={48} color="#4CAF50" />
<PhCheckCircle size={48} weight="fill" />
```

### Option 2: Phosphor Icons (Recommended for Static HTML)

```html
<script src="https://unpkg.com/@phosphor-icons/web"></script>

<i class="ph ph-check-circle"></i>
<i class="ph ph-download-simple"></i>
<i class="ph ph-star"></i>
```

### Option 3: Font Awesome (Static HTML)

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<i class="fa-solid fa-check-circle"></i>
<i class="fa-solid fa-download"></i>
<i class="fa-solid fa-star"></i>
```

## Icon Sizing

```css
.icon {
  width: clamp(24px, 4cqw, 48px);
  height: clamp(24px, 4cqw, 48px);
  font-size: clamp(24px, 4cqw, 48px);
}

/* Size variants */
.icon-small {
  width: clamp(16px, 2.5cqw, 24px);
  height: clamp(16px, 2.5cqw, 24px);
}

.icon-large {
  width: clamp(48px, 6cqw, 72px);
  height: clamp(48px, 6cqw, 72px);
}
```

## Common Icons

| Purpose | Font Awesome | Phosphor | React Icons |
|---------|-------------|----------|-------------|
| Check/Done | `fa-check-circle` | `check-circle` | `FaCheckCircle` |
| Error/Invalid | `fa-times-circle` | `x-circle` | `FaTimesCircle` |
| Download | `fa-download` | `download-simple` | `FaDownload` |
| Share | `fa-share` | `share-network` | `FaShare` |
| Star | `fa-star` | `star` | `FaStar` |
| Info | `fa-info-circle` | `info` | `FaInfoCircle` |
| Warning | `fa-exclamation-triangle` | `warning` | `FaExclamationTriangle` |
| User | `fa-user` | `user` | `FaUser` |
| Settings | `fa-gear` | `gear` | `FaGear` |
| Search | `fa-search` | `magnifying-glass` | `FaSearch` |
| Arrow Right | `fa-arrow-right` | `arrow-right` | `FaArrowRight` |

## Color System

```css
.icon {
  color: var(--text-primary);
}

.icon-success {
  color: #4CAF50;
}

.icon-error {
  color: #f44336;
}

.icon-warning {
  color: #FF9800;
}

.icon-accent {
  color: var(--accent);
}
```

## Usage Example

```html
<!-- Feature list with icons -->
<div class="feature-list">
  <div class="feature-item">
    <i class="ph ph-check-circle icon icon-success"></i>
    <div class="feature-content">
      <h3>Feature Title</h3>
      <p>Description of the feature</p>
    </div>
  </div>
</div>

<style>
  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: clamp(12px, 2.5cqw, 24px);
  }

  .icon {
    width: clamp(32px, 5cqw, 48px);
    height: clamp(32px, 5cqw, 48px);
    flex-shrink: 0;
  }
</style>
```

## Icon Library Recommendations by Style

| Style | Recommended Library |
|-------|-------------------|
| Bold Signal | Font Awesome / Phosphor |
| Electric Studio | Lucide / Phosphor |
| Creative Voltage | Font Awesome (Solid) |
| Dark Botanical | Phosphor (Light) |
| Notebook Tabs | Font Awesome (Regular) |
| Pastel Geometry | Phosphor (Regular) |
| Split Pastel | Font Awesome (Solid) |
| Vintage Editorial | Phosphor (Duotone) |
| Neon Cyber | Lucide / Phosphor |
| Terminal Green/Blue | Lucide (Code icons) |
| Swiss Modern | Font Awesome / Lucide |
| Paper & Ink | Phosphor (Light) |

## Migration Guide

Replace emojis with professional icons:

| Emoji | Icon Replacement |
|-------|-----------------|
| ✅ | `<i class="ph ph-check-circle"></i>` |
| ❌ | `<i class="ph ph-x-circle"></i>` |
| ℹ️ | `<i class="ph ph-info"></i>` |
| ⚠️ | `<i class="ph ph-warning"></i>` |
| 🎨 | `<i class="ph ph-palette"></i>` |
| 📁 | `<i class="ph ph-folder"></i>` |
| 📱 | `<i class="ph ph-device-mobile"></i>` |
| 📸 | `<i class="ph ph-camera"></i>` |
| 📄 | `<i class="ph ph-file-text"></i>` |
| 🎯 | `<i class="ph ph-crosshair"></i>` |
| ⬇️ | `<i class="ph ph-download-simple"></i>` |
| ➡️ | `<i class="ph ph-arrow-right"></i>` |

## Resources

- **React Icons:** https://react-icons.github.io/react-icons/
- **Phosphor Icons:** https://phosphoricons.com/
- **Font Awesome:** https://fontawesome.com/
- **Lucide Icons:** https://lucide.dev/

## Documentation

For comprehensive icon guidelines:
- `SKILL.md` → "Icon Guidelines" section
- `STYLE_PRESETS.md` → "Icon System" section
