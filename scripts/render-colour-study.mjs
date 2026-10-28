import fs from 'node:fs/promises';
import sharp from 'sharp';
import { sheerColours, sheerCurtainMask } from '../src/sheer-colours.js';

const photograph = 'public/assets/projects/sheers-full-height-v1-1600.webp';
const composites = [];
for (const [index, colour] of sheerColours.entries()) {
  const overlay = Buffer.from(`<svg width="1600" height="1200" viewBox="0 0 1600 1200"><path d="${sheerCurtainMask}" fill="${colour.fill}" fill-opacity="${colour.opacity}"/></svg>`);
  const tinted = await sharp(photograph).composite([{ input: overlay, blend: 'multiply' }]).toBuffer();
  const tile = await sharp(tinted).resize(400, 300).jpeg().toBuffer();
  const label = Buffer.from(`<svg width="400" height="50"><rect width="400" height="50" fill="#e8e2d7"/><text x="18" y="31" fill="#292722" font-family="Georgia" font-size="20">${colour.name}</text></svg>`);
  const left = index % 4 * 400;
  const top = Math.floor(index / 4) * 350;
  composites.push({ input: tile, left, top }, { input: label, left, top: top + 300 });
}
await fs.mkdir('docs/qa', { recursive: true });
await sharp({ create: { width: 1600, height: 700, channels: 3, background: '#e8e2d7' } }).composite(composites).jpeg({ quality: 90 }).toFile('docs/qa/client-sheer-colour-study-2026-10-28.jpg');
console.log('Saved real-photo colour simulation study; this is not a browser screenshot.');
