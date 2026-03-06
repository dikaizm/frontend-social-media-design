#!/usr/bin/env node
/**
 * export-carousel.js
 * Exports every slide of {design}.html as a 1080×1080 image.
 *
 * Usage:
 *   node export-carousel.js [options]
 *
 * Options:
 *   --format  jpg | png          (default: png)
 *   --quality 1-100              (JPEG only, default: 95)
 *   --out     ./carousel-export  (output directory)
 *   --file    ./path-to-your-design.html  (required)
 *
 * Requirements:
 *   npm install puppeteer-core
 *   (Uses system Chrome — no separate Chromium download needed)
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
const OUT_DIR = get('--out', './carousel-export');
const HTML_FILE = get('--file', '');

if (!HTML_FILE) {
    console.error('❌  Error: --file argument is required.');
    console.log('\nUsage:');
    console.log('  node export-carousel.js --file ./path-to-your-design.html [options]\n');
    process.exit(1);
}

if (!['png', 'jpg', 'jpeg'].includes(FORMAT)) {
    console.error('❌  --format must be png or jpg');
    process.exit(1);
}
const FINAL_FORMAT = FORMAT === 'jpeg' ? 'jpg' : FORMAT;

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

    console.log(`\n🎨  Carousel Exporter`);
    console.log(`   Chrome : ${chromePath}`);
    console.log(`   File   : ${htmlPath}`);
    console.log(`   Format : ${FINAL_FORMAT.toUpperCase()}${FINAL_FORMAT === 'jpg' ? ` (quality ${QUALITY})` : ''}`);
    console.log(`   Output : ${path.resolve(OUT_DIR)}\n`);

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

    // Match the carousel canvas size at 2× device pixel ratio for crisp output
    const CANVAS = 1080;
    await page.setViewport({ width: CANVAS, height: CANVAS, deviceScaleFactor: 2 });

    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    // Let fonts / images / animations settle
    await new Promise(r => setTimeout(r, 1000));

    // Discover total slide count
    const totalPages = await page.evaluate(() =>
        document.querySelectorAll('.carousel-page').length
    );

    console.log(`   Slides : ${totalPages}\n`);

    for (let i = 0; i < totalPages; i++) {
        // Set carousel to slide i (instant, no animation)
        await page.evaluate((index) => {
            const track = document.getElementById('carouselTrack');
            if (!track) return;
            track.style.transition = 'none';
            track.style.transform = `translateX(-${index * 100}%)`;

            // Sync dot indicators
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((d, di) => d.classList.toggle('active', di === index));

            // Sync counter
            const counter = document.getElementById('carouselCounter');
            if (counter) {
                counter.textContent = `${index + 1} / ${document.querySelectorAll('.carousel-page').length}`;
            }
        }, i);

        // Small settle pause so any CSS paint finishes
        await new Promise(r => setTimeout(r, 150));

        const slideNum = String(i + 1).padStart(2, '0');
        const filename = `slide-${slideNum}.${FINAL_FORMAT}`;
        const outPath = path.join(OUT_DIR, filename);

        // Clip screenshot to the .carousel element bounds
        const clip = await page.evaluate(() => {
            const el = document.querySelector('.carousel');
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { x: r.left, y: r.top, width: r.width, height: r.height };
        });

        await page.screenshot({
            path: outPath,
            type: FINAL_FORMAT === 'jpg' ? 'jpeg' : 'png',
            ...(FINAL_FORMAT === 'jpg' ? { quality: QUALITY } : {}),
            ...(clip ? { clip } : {}),
        });

        console.log(`   ✅  Slide ${slideNum}  →  ${filename}`);
    }

    await browser.close();
    console.log(`\n🎉  Done! ${totalPages} slides saved to:\n   ${path.resolve(OUT_DIR)}\n`);
})();
