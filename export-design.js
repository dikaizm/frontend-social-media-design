#!/usr/bin/env node
/**
 * export-design.js
 * Exports social media designs (single posts or multi-page carousels) as images.
 * Auto-detects canvas size and design type from the HTML file.
 *
 * Usage:
 *   node export-design.js --file ./path-to-your-design.html [options]
 *
 * Options:
 *   --file     ./path/to/design.html   Path to the HTML design file (required)
 *   --format   jpg | png               Output image format (default: png)
 *   --quality  1-100                   JPEG quality, ignored for PNG (default: 95)
 *   --out      ./output/project        Output directory (default: output/{project-name})
 *   --width    1080                    Override canvas width in px (auto-detected by default)
 *   --height   1350                    Override canvas height in px (auto-detected by default)
 *   --scale    2                       Device pixel ratio for crisp output (default: 2)
 *
 * Requirements:
 *   npm install puppeteer-core
 *   (Uses system Chrome — no separate Chromium download needed)
 *
 * Supports:
 *   - Single post designs  (.canvas element)
 *   - Multi-page carousels (.carousel + .carousel-page elements)
 *   - Any platform/size — reads --canvas-width / --canvas-height from the design's CSS
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// ─── Parse CLI args ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const get = (flag, def) => {
    const i = args.indexOf(flag);
    return i !== -1 && args[i + 1] ? args[i + 1] : def;
};

const FORMAT = get('--format', 'png').toLowerCase();
const QUALITY = parseInt(get('--quality', '95'), 10);
const SCALE   = parseFloat(get('--scale', '2'));
const WIDTH_OVERRIDE  = get('--width',  null);
const HEIGHT_OVERRIDE = get('--height', null);
const HTML_FILE = get('--file', '');

if (!HTML_FILE) {
    console.error('❌  Error: --file argument is required.');
    console.log('\nUsage:');
    console.log('  node export-design.js --file ./path-to-your-design.html [options]\n');
    console.log('Options:');
    console.log('  --format  jpg | png   (default: png)');
    console.log('  --quality 1-100       (JPEG only, default: 95)');
    console.log('  --out     <dir>       (default: output/{project-name})');
    console.log('  --width   <px>        (override canvas width, auto-detected by default)');
    console.log('  --height  <px>        (override canvas height, auto-detected by default)');
    console.log('  --scale   <n>         (device pixel ratio, default: 2)\n');
    process.exit(1);
}

if (!['png', 'jpg', 'jpeg'].includes(FORMAT)) {
    console.error('❌  --format must be png or jpg');
    process.exit(1);
}
const FINAL_FORMAT = FORMAT === 'jpeg' ? 'jpg' : FORMAT;

// Derive default output dir from the HTML file's parent folder name:
//   generated/{project-name}/carousel.html  →  output/{project-name}/
const projectName = path.basename(path.dirname(path.resolve(HTML_FILE)));
const OUT_DIR = get('--out', path.join('output', projectName));

// ─── Locate Chrome ───────────────────────────────────────────────────────────
function findChrome() {
    // Common macOS paths
    const candidates = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
        '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    ];
    for (const c of candidates) {
        if (fs.existsSync(c)) return c;
    }
    // Try which
    try { return execSync('which chromium-browser 2>/dev/null').toString().trim(); } catch { }
    try { return execSync('which google-chrome 2>/dev/null').toString().trim(); } catch { }
    return null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function resolveFile(filePath) {
    const abs = path.resolve(filePath);
    if (!fs.existsSync(abs)) {
        console.error(`❌  File not found: ${abs}`);
        process.exit(1);
    }
    return abs;
}

// ─── Main ────────────────────────────────────────────────────────────────────
(async () => {
    const chromePath = findChrome();
    if (!chromePath) {
        console.error('❌  Could not find Chrome/Chromium. Install Google Chrome and try again.');
        process.exit(1);
    }

    const htmlPath = resolveFile(HTML_FILE);
    const fileUrl = `file://${htmlPath}`;

    ensureDir(OUT_DIR);

    // ── Launch browser at a generous viewport; we'll clip to the actual canvas ──
    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--allow-file-access-from-files',
        ],
    });

    const page = await browser.newPage();

    // Use a large initial viewport so CSS variables are readable before we know the canvas size
    await page.setViewport({ width: 1920, height: 1920, deviceScaleFactor: SCALE });
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    // Let fonts / images settle
    await new Promise(r => setTimeout(r, 1000));

    // ── Auto-detect canvas dimensions from CSS variables ──────────────────────
    const detected = await page.evaluate(() => {
        const root = document.documentElement;
        const style = getComputedStyle(root);
        const parse = (v) => parseInt(v.trim().replace('px', ''), 10) || null;
        return {
            width:  parse(style.getPropertyValue('--canvas-width')),
            height: parse(style.getPropertyValue('--canvas-height')),
        };
    });

    const canvasW = WIDTH_OVERRIDE  ? parseInt(WIDTH_OVERRIDE,  10) : (detected.width  || 1080);
    const canvasH = HEIGHT_OVERRIDE ? parseInt(HEIGHT_OVERRIDE, 10) : (detected.height || 1080);

    // Resize viewport to exact canvas dimensions so layout is pixel-perfect
    await page.setViewport({ width: canvasW, height: canvasH, deviceScaleFactor: SCALE });
    await new Promise(r => setTimeout(r, 300));

    // ── Detect design type: carousel or single ────────────────────────────────
    const { isCarousel, totalPages } = await page.evaluate(() => {
        const pages = document.querySelectorAll('.carousel-page');
        return { isCarousel: pages.length > 0, totalPages: pages.length };
    });

    console.log(`\n🎨  Social Media Exporter`);
    console.log(`   Chrome : ${chromePath}`);
    console.log(`   File   : ${htmlPath}`);
    console.log(`   Size   : ${canvasW} × ${canvasH} px  (scale ${SCALE}×  →  ${canvasW * SCALE} × ${canvasH * SCALE} px output)`);
    console.log(`   Type   : ${isCarousel ? `Carousel (${totalPages} slides)` : 'Single post'}`);
    console.log(`   Format : ${FINAL_FORMAT.toUpperCase()}${FINAL_FORMAT === 'jpg' ? ` (quality ${QUALITY})` : ''}`);
    console.log(`   Output : ${path.resolve(OUT_DIR)}\n`);

    // Helper: clip rect for a given CSS selector
    const getClip = (selector) => page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top, width: r.width, height: r.height };
    }, selector);

    const shoot = async (filename, clip) => {
        const outPath = path.join(OUT_DIR, filename);
        await page.screenshot({
            path: outPath,
            type: FINAL_FORMAT === 'jpg' ? 'jpeg' : 'png',
            ...(FINAL_FORMAT === 'jpg' ? { quality: QUALITY } : {}),
            ...(clip ? { clip } : {}),
        });
        return outPath;
    };

    if (!isCarousel) {
        // ── Single post ───────────────────────────────────────────────────────
        const clip = await getClip('.canvas');
        const filename = `post.${FINAL_FORMAT}`;
        await shoot(filename, clip);
        console.log(`   ✅  ${filename}`);

    } else {
        // ── Carousel ──────────────────────────────────────────────────────────
        for (let i = 0; i < totalPages; i++) {
            // Navigate to slide i instantly (no animation)
            await page.evaluate((index) => {
                // Find track by common IDs or class
                const track = document.getElementById('carouselTrack') || 
                              document.getElementById('track') || 
                              document.querySelector('.carousel-track');
                
                if (!track) return;

                track.style.transition = 'none';
                
                // Calculate slide width for pixel-perfect translation
                // (Percentage based transforms fail if the track is wider than the viewport)
                const firstPage = track.querySelector('.carousel-page');
                const slideWidth = firstPage ? firstPage.offsetWidth : 1080;
                
                track.style.transform = `translateX(-${index * slideWidth}px)`;

                // Update UI elements if they exist
                const dots = document.querySelectorAll('.carousel-dot');
                dots.forEach((d, di) => d.classList.toggle('active', di === index));

                const counter = document.getElementById('carouselCounter');
                if (counter) {
                    const total = document.querySelectorAll('.carousel-page').length;
                    counter.textContent = `${index + 1} / ${total}`;
                }
            }, i);

            await new Promise(r => setTimeout(r, 150));

            const slideNum = String(i + 1).padStart(2, '0');
            const filename = `slide-${slideNum}.${FINAL_FORMAT}`;
            const clip = await getClip('.carousel');
            await shoot(filename, clip);
            console.log(`   ✅  Slide ${slideNum}  →  ${filename}`);
        }
    }

    await browser.close();

    const count = isCarousel ? totalPages : 1;
    console.log(`\n🎉  Done! ${count} file${count > 1 ? 's' : ''} saved to:\n   ${path.resolve(OUT_DIR)}\n`);
})();
