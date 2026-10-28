import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const source = process.env.CLIENT_MEDIA_SOURCE || 'C:/Users/gawar/Downloads/DAMANGROUP_ASSETS_28_Oct';
const output = 'docs/client-media-review';
await fs.mkdir(output, { recursive: true });
const files = (await fs.readdir(source)).filter(file => /\.jpe?g$/i.test(file)).sort();
const inventory = [];
for (const [index, file] of files.entries()) {
  const metadata = await sharp(path.join(source, file)).metadata();
  inventory.push({ number: index + 1, file, width: metadata.width, height: metadata.height });
}
for (let offset = 0; offset < files.length; offset += 20) {
  const batch = files.slice(offset, offset + 20);
  const composites = [];
  for (const [index, file] of batch.entries()) {
    const thumbnail = await sharp(path.join(source, file)).rotate().resize(280, 250, { fit: 'contain', background: '#e9e4db' }).jpeg().toBuffer();
    const label = Buffer.from(`<svg width="280" height="34"><rect width="280" height="34" fill="#201f1c"/><text x="12" y="24" fill="white" font-family="Arial" font-size="18">${offset + index + 1}</text></svg>`);
    const left = (index % 5) * 280;
    const top = Math.floor(index / 5) * 284;
    composites.push({ input: thumbnail, left, top }, { input: label, left, top: top + 250 });
  }
  await sharp({ create: { width: 1400, height: Math.ceil(batch.length / 5) * 284, channels: 3, background: '#e9e4db' } }).composite(composites).jpeg({ quality: 85 }).toFile(`${output}/photos-${offset + 1}.jpg`);
}
await fs.writeFile(`${output}/inventory.json`, JSON.stringify(inventory, null, 2));
console.log(JSON.stringify({ photos: files.length, contactSheets: Math.ceil(files.length / 20) }));
