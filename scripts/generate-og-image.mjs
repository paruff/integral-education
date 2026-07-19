import { createCanvas, registerFont, loadImage } from 'canvas';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT = resolve(import.meta.dirname, '../static/img/og-default.png');

// Try loading custom fonts, fall back to system
let fontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';

async function generate() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // --- Background: dark gradient ---
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // --- Accent bar at top ---
  ctx.fillStyle = '#e94560';
  ctx.fillRect(0, 0, WIDTH, 6);

  // --- Subtle decorative circles ---
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(1050, 180, 280, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-50, 500, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // --- Platform name ---
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Title
  ctx.font = `bold 64px ${fontFamily}`;
  ctx.fillText('Integral Education', WIDTH / 2, HEIGHT / 2 - 40);

  // Tagline
  ctx.fillStyle = '#a0a0c0';
  ctx.font = `28px ${fontFamily}`;
  ctx.fillText('Mastery Across All Quadrants', WIDTH / 2, HEIGHT / 2 + 40);

  // --- Bottom accent bar ---
  ctx.fillStyle = '#e94560';
  ctx.fillRect(0, HEIGHT - 6, WIDTH, 6);

  // Write to file
  const buffer = canvas.toBuffer('image/png');
  writeFileSync(OUTPUT, buffer);
  const stats = await import('fs').then(fs => fs.statSync(OUTPUT));
  console.log(`OG image created: ${OUTPUT}`);
  console.log(`Dimensions: ${WIDTH}x${HEIGHT}px`);
  console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
}

generate().catch(console.error);
