#!/usr/bin/env node
/**
 * export-design.ts
 * Exports a React component to PNG image(s) using Vite dev server + Puppeteer.
 *
 * Output is always saved to:  output/<design-name>/
 *   - Single post  → output/<design-name>/<design-name>.png
 *   - Carousel     → output/<design-name>/slide-01.png, slide-02.png, ...
 *
 * Usage:
 *   npx tsx export-scripts/export-design.ts <design-file> [platform] [format]
 *
 * Examples:
 *   npx tsx export-scripts/export-design.ts src/generated/my-design.tsx instagram post-square
 *   npx tsx export-scripts/export-design.ts src/generated/my-carousel.tsx instagram post-portrait
 */

import puppeteer from 'puppeteer-core';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Parse CLI args
const args = process.argv.slice(2);
const designFile = args[0];
const platform = args[1] || 'instagram';
const format = args[2] || 'post-square';

if (!designFile) {
  console.error('❌  Error: design-file argument is required.');
  console.log('\nUsage:');
  console.log('  npx tsx export-scripts/export-design.ts <design-file> [platform] [format]\n');
  process.exit(1);
}

// Derive output directory from the design file name
const designName = path.basename(designFile, path.extname(designFile));
const outDir = path.join(process.cwd(), 'output', designName);

// Platform dimensions
const PLATFORM_DIMENSIONS: Record<string, Record<string, { width: number; height: number }>> = {
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
};

const size = PLATFORM_DIMENSIONS[platform]?.[format];
if (!size) {
  console.error(`❌  Invalid platform or format: ${platform} / ${format}`);
  process.exit(1);
}

console.log(`\n🎨  Design Exporter`);
console.log(`   Design  : ${designFile}`);
console.log(`   Platform: ${platform}`);
console.log(`   Format  : ${format}`);
console.log(`   Size    : ${size.width} × ${size.height}`);
console.log(`   Output  : ${outDir}\n`);

// Find Chrome
function findChrome(): string | null {
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { execSync } = require('child_process');
  try { return execSync('which chromium-browser 2>/dev/null').toString().trim(); } catch {}
  try { return execSync('which google-chrome 2>/dev/null').toString().trim(); } catch {}
  return null;
}

// Main export function
async function exportDesign() {
  const chromePath = findChrome();
  if (!chromePath) {
    console.error('❌  Could not find Chrome/Chromium. Install Google Chrome and try again.');
    process.exit(1);
  }

  const rootDir = process.cwd();
  const designAbsPath = path.resolve(designFile);

  // Create a temp directory with a proper React entrypoint
  const tmpDir = path.join(rootDir, '.export-tmp');
  fs.mkdirSync(tmpDir, { recursive: true });

  // Import path from the tmp entry file to the design file
  const designImportPath = path.relative(tmpDir, designAbsPath).replace(/\\/g, '/');

  const entryContent = `
import { createRoot } from 'react-dom/client';
import Component from '${designImportPath}';

const root = document.getElementById('root');
if (root) createRoot(root).render(<Component />);
`;

  const indexHtmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module" src="/entry.tsx"></script>
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #1a1a1a; overflow: hidden; }
      #root { width: ${size.width}px; height: ${size.height}px; overflow: hidden; }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

  fs.writeFileSync(path.join(tmpDir, 'entry.tsx'), entryContent);
  fs.writeFileSync(path.join(tmpDir, 'index.html'), indexHtmlContent);

  console.log(`🔨  Starting dev server...`);

  const server = await createServer({
    configFile: false,
    root: tmpDir,
    plugins: [react()],
    // Disable PostCSS (project's postcss.config.js uses tailwindcss v3 API
    // which errors in Tailwind v4; components use inline styles anyway)
    css: { postcss: { plugins: [] } },
    server: {
      port: 5199,
      strictPort: true,
      // Allow Vite 5+ to serve files from outside the tmp root (e.g. src/)
      fs: { allow: [rootDir] },
    },
    logLevel: 'silent',
  });

  await server.listen();

  console.log(`✅  Dev server ready`);
  console.log(`📸  Launching browser...`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  // Disable Framer Motion animations so slides render at their final state instantly
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: size.width, height: size.height, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5199', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for React to mount and render
  await page.waitForSelector('#export-root', { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 400));

  // Detect carousel
  const isCarousel = (await page.$('.carousel')) !== null;

  fs.mkdirSync(outDir, { recursive: true });

  if (isCarousel) {
    const totalSlides: number = await page.evaluate(
      () => document.querySelectorAll('[aria-label^="Go to slide"]').length
    );

    console.log(`\n   Carousel detected — ${totalSlides} slides\n`);

    for (let i = 0; i < totalSlides; i++) {
      if (i > 0) {
        await page.click(`[aria-label="Go to slide ${i + 1}"]`);
        // With prefers-reduced-motion, Framer Motion animations are instant;
        // a brief settle pause is enough for React to commit the render.
        await new Promise((r) => setTimeout(r, 150));
      }

      const slideNum = String(i + 1).padStart(2, '0');
      const slidePath = path.join(outDir, `slide-${slideNum}.png`);

      // Viewport == canvas size and #root == canvas size, so the
      // full-viewport screenshot is exactly the canvas — no clip needed.
      await page.screenshot({ path: slidePath, type: 'png' });
      console.log(`   ✅  Slide ${slideNum}  →  slide-${slideNum}.png`);
    }

    console.log(`\n🎉  Done! ${totalSlides} slides saved to:\n   ${outDir}\n`);
  } else {
    const filePath = path.join(outDir, `${designName}.png`);

    await page.screenshot({ path: filePath, type: 'png' });
    console.log(`\n🎉  Done! Image saved to:\n   ${filePath}\n`);
  }

  await browser.close();
  await server.close();

  // Clean up temp directory
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

exportDesign().catch((error) => {
  console.error('❌  Export failed:', error);
  process.exit(1);
});
