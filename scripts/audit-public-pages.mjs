import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = process.argv[2] || 'https://daman-rebirth.pages.dev';
const output = process.argv[3];
const routes = ['/', '/sheer-curtains/', '/blockout-blinds/', '/about/'];
const failures = [];
const build = await fs.readFile('dist/index.html', 'utf8');
const bundle = build.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1];
if (!bundle) throw new Error('Could not identify the current application bundle.');
const pages = await Promise.all(routes.map(async route => {
  const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(30000) });
  const html = await response.text();
  const h1Count = [...html.matchAll(/<h1\b/g)].length;
  const matchesBuild = html.includes(bundle);
  const addressPresent = html.includes('134 Gateway Boulevard');
  if (response.status !== 200 || h1Count !== 1 || !matchesBuild || !addressPresent) failures.push(`Page failed: ${route}`);
  return { route, status: response.status, title: html.match(/<title>(.*?)<\/title>/)?.[1], h1Count, matchesBuild, addressPresent };
}));
const selected = JSON.parse(await fs.readFile('docs/client-media-review/selected-assets.json', 'utf8'));
const sources = selected.flatMap(item => item.outputs.map(item => item.url));
sources.push('/assets/projects/sheers-project-silent-v1.mp4', '/assets/projects/blockout-project-silent-v1.mp4', '/assets/projects/sheers-project-poster-v1.jpg', '/assets/projects/blockout-project-poster-v1.jpg');
const assets = [];
for (let offset = 0; offset < sources.length; offset += 6) {
  assets.push(...await Promise.all(sources.slice(offset, offset + 6).map(async url => {
    const response = await fetch(`${base}${url}`, { signal: AbortSignal.timeout(30000) });
    const bytes = Buffer.from(await response.arrayBuffer());
    const local = await fs.readFile(`public${url}`);
    const hash = value => createHash('sha256').update(value).digest('hex');
    const matchesLocal = hash(bytes) === hash(local);
    if (response.status !== 200 || !matchesLocal) failures.push(`Asset failed: ${url}`);
    return { url, status: response.status, bytes: bytes.length, type: response.headers.get('content-type'), matchesLocal };
  })));
}
const movie = await fetch(`${base}/media/showreel-20261011`, { headers: { Range: 'bytes=0-1' }, signal: AbortSignal.timeout(30000) });
const movieBytes = await movie.arrayBuffer();
const heroRange = { status: movie.status, contentRange: movie.headers.get('content-range'), bytes: movieBytes.byteLength };
if (movie.status !== 206 || movieBytes.byteLength !== 2) failures.push('Existing hero streaming range failed.');
const result = { base, bundle, pages, assets, heroRange, result: failures.length ? 'fail' : 'pass', failures, boundary: 'HTTP content and byte-identity validation only. Browser layout, hydration, colour clicks, focus and video playback remain separate checks.' };
if (output) await fs.writeFile(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ pages, assetsChecked: assets.length, heroRange, result: result.result, failures, boundary: result.boundary }, null, 2));
if (failures.length) process.exitCode = 1;
