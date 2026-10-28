import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const source = process.env.CLIENT_MEDIA_SOURCE || 'C:/Users/gawar/Downloads/DAMANGROUP_ASSETS_28_Oct';
const encoder = process.env.FFMPEG_PATH;
const inventory = JSON.parse(await fs.readFile('docs/client-media-review/inventory.json', 'utf8'));
const selected = [
  [49, 'sheers-living'], [56, 'sheers-panorama'], [21, 'sfold-detail'],
  [18, 'sheers-full-height'], [27, 'sheers-kitchen'], [26, 'sheers-bedroom'],
  [50, 'sheers-bedroom-warm'], [55, 'sheers-corner'], [40, 'blockout-room'],
  [36, 'blockout-bedroom'], [8, 'blockout-office'], [35, 'roller-layering'],
];
await fs.mkdir('public/assets/projects', { recursive: true });
const manifest = [];
for (const [number, name] of selected) {
  const item = inventory.find(entry => entry.number === number);
  const bytes = await fs.readFile(path.join(source, item.file));
  const widths = [480, 960, 1600].filter(width => width <= item.width);
  if (!widths.includes(item.width)) widths.push(item.width);
  const outputs = [];
  for (const width of widths) {
    const output = `public/assets/projects/${name}-v1-${width}.webp`;
    await sharp(bytes).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 86 }).toFile(output);
    outputs.push({ url: output.replace('public', ''), width });
  }
  manifest.push({ name, source: item.file, width: item.width, height: item.height, sha256: createHash('sha256').update(bytes).digest('hex'), outputs, treatment: 'Orientation and responsive WebP export only; no invented fabric geometry or room retouching.' });
}
await fs.writeFile('docs/client-media-review/selected-assets.json', JSON.stringify(manifest, null, 2));
if (encoder) {
  const files = (await fs.readdir(source)).filter(file => /\.mp4$/i.test(file)).sort();
  const videos = [];
  const composites = [];
  for (const [index, file] of files.entries()) {
    const input = path.join(source, file);
    const result = spawnSync(encoder, ['-hide_banner', '-i', input], { encoding: 'utf8' });
    const duration = result.stderr.match(/Duration: ([\d:.]+)/)?.[1];
    const frame = spawnSync(encoder, ['-v', 'error', '-ss', '2', '-i', input, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-'], { maxBuffer: 8 * 1024 * 1024 });
    if (frame.status !== 0) throw new Error(frame.stderr.toString());
    const thumbnail = await sharp(frame.stdout).resize(280, 250, { fit: 'contain', background: '#e9e4db' }).jpeg().toBuffer();
    const label = Buffer.from(`<svg width="280" height="34"><rect width="280" height="34" fill="#201f1c"/><text x="12" y="24" fill="white" font-family="Arial" font-size="16">Video ${index + 1} · ${duration}</text></svg>`);
    const left = (index % 5) * 280;
    const top = Math.floor(index / 5) * 284;
    composites.push({ input: thumbnail, left, top }, { input: label, left, top: top + 250 });
    videos.push({ number: index + 1, file, duration, sourceHasAudio: /Audio:/.test(result.stderr), stream: result.stderr.match(/Video: .+/)?.[0] });
  }
  await sharp({ create: { width: 1400, height: Math.ceil(files.length / 5) * 284, channels: 3, background: '#e9e4db' } }).composite(composites).jpeg({ quality: 86 }).toFile('docs/client-media-review/videos.jpg');
  await fs.writeFile('docs/client-media-review/video-inventory.json', JSON.stringify(videos, null, 2));
}
console.log(JSON.stringify({ selectedPhotos: manifest.length }));
