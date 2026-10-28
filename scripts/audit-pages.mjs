import fs from 'node:fs/promises';
import path from 'node:path';

const routes = ['/', '/sheer-curtains/', '/blockout-blinds/', '/about/'];
const evidencePath = process.argv[2];
const documents = new Map();
for (const route of routes) documents.set(route, await fs.readFile(path.join('dist', route.slice(1), 'index.html'), 'utf8'));
const failures = [];
const result = [];
for (const [route, html] of documents) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const headingCount = [...html.matchAll(/<h1\b/g)].length;
  if (headingCount !== 1) failures.push(`${route}: expected one H1, found ${headingCount}`);
  if (duplicateIds.length) failures.push(`${route}: duplicate IDs ${duplicateIds.join(', ')}`);
  let internalLinks = 0;
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const target = new URL(href.replaceAll('&amp;', '&'), `https://daman.test${route}`);
    if (target.origin !== 'https://daman.test') continue;
    internalLinks += 1;
    const destination = documents.get(target.pathname);
    if (!destination) failures.push(`${route}: missing route ${href}`);
    else if (target.hash && !destination.includes(`id="${target.hash.slice(1)}"`)) failures.push(`${route}: missing anchor ${href}`);
  }
  const assets = new Set([...html.matchAll(/(?:src|href)="(\/(?:assets|fonts)\/[^"?#]+)(?:\?[^"#]*)?"/g)].map(match => match[1]));
  for (const asset of assets) {
    try { await fs.access(path.join('dist', asset.slice(1))); }
    catch { failures.push(`${route}: missing asset ${asset}`); }
  }
  if (!html.includes('134 Gateway Boulevard')) failures.push(`${route}: public address missing`);
  if (!html.includes('tel:+61433300390')) failures.push(`${route}: phone link missing`);
  if (route !== '/' && html.includes('href="/assets/daman-showreel-poster.jpg"')) failures.push(`${route}: irrelevant hero preload`);
  result.push({ route, title: html.match(/<title>(.*?)<\/title>/)?.[1], h1Count: headingCount, duplicateIds, internalLinks, localAssets: assets.size, prerendered: html.includes('id="contact"') });
}
if (failures.length) throw new Error(failures.join('\n'));
const evidence = JSON.stringify({ pages: result, result: 'pass', boundary: 'Static document, metadata, asset and link-target validation; browser interactions and visual layout are separate checks.' }, null, 2);
if (evidencePath) await fs.writeFile(evidencePath, `${evidence}\n`);
console.log(evidence);
