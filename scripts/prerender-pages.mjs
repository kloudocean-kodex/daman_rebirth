import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const outputRoot = join(projectRoot, 'dist');
const baseUrl = 'https://damangroup.com.au';
const pages = [
  {
    path: '/',
    title: 'Daman Group | Window Furnishings & Home Detail',
    description: 'Daman Group offers made-to-measure blinds, curtains, shutters, fly screens and security doors from Melbourne, Victoria.',
    image: '/assets/daman-showreel-poster.jpg',
    imageWidth: 1280,
    imageHeight: 720,
    imageAlt: 'Sunlit living room with sheer curtains; illustrative concept, not a completed Daman project.',
  },
  {
    path: '/sheer-curtains/',
    title: 'Sheer Curtains Melbourne | Daman Group',
    description: 'Explore full-height sheer curtains and considered S-fold details with Daman Group in Melbourne. See real project photography and plan your window furnishings.',
    image: '/assets/projects/sheers-living-v1-1280.webp',
    imageWidth: 1280,
    imageHeight: 960,
    imageAlt: 'Full-height sheer curtains in a furnished living room, supplied Daman project photography.',
  },
  {
    path: '/blockout-blinds/',
    title: 'Blockout Blinds Melbourne | Daman Group',
    description: 'Discover blockout roller blinds for light control and privacy with Daman Group in Melbourne. Explore real rooms, fabric choices and considered fitting details.',
    image: '/assets/projects/blockout-room-v1-1600.webp',
    imageWidth: 1600,
    imageHeight: 1200,
    imageAlt: 'Lowered blockout roller blinds in a timber-floored room, supplied Daman project photography.',
  },
  {
    path: '/about/',
    title: 'About Daman Group | Epping, Melbourne',
    description: 'Meet Daman Group in Epping, Melbourne. A personal approach to window furnishings, from sheer curtains and blinds to shutters, security doors and fly screens.',
    image: '/assets/projects/sheers-panorama-v1-1280.webp',
    imageWidth: 1280,
    imageHeight: 960,
    imageAlt: 'Sheer curtains surrounding a living and dining room, supplied Daman project photography.',
  },
];

function escapeAttribute(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Missing ${label} in the built HTML template.`);
  return html.replace(pattern, () => replacement);
}

function renderPage(template, page, markup) {
  const canonical = `${baseUrl}${page.path}`;
  const metadata = {
    description: page.description,
    'og:title': page.title,
    'og:description': page.description,
    'og:url': canonical,
    'og:image': `${baseUrl}${page.image}`,
    'og:image:width': page.imageWidth,
    'og:image:height': page.imageHeight,
    'og:image:alt': page.imageAlt,
    'twitter:image': `${baseUrl}${page.image}`,
  };
  let html = replaceRequired(template, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(page.title)}</title>`, 'title');
  html = replaceRequired(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`, 'canonical');
  for (const [name, content] of Object.entries(metadata)) {
    const attribute = name.startsWith('og:') ? 'property' : 'name';
    html = replaceRequired(html, new RegExp(`<meta ${attribute}="${name}" content="[^"]*"\\s*\\/?>`), `<meta ${attribute}="${name}" content="${escapeAttribute(content)}" />`, name);
  }
  if (page.path !== '/') {
    const imageBase = page.image.replace(/-\d+\.webp$/, '');
    const sourceSet = [...new Set([480, 960, page.imageWidth])].map(width => `${imageBase}-${width}.webp ${width}w`).join(', ');
    html = replaceRequired(html, /<link rel="preload" as="image" href="\/assets\/daman-showreel-poster\.jpg"[^>]*>/, `<link rel="preload" as="image" href="${page.image}" imagesrcset="${sourceSet}" imagesizes="(max-width: 900px) 100vw, 57vw" fetchpriority="high" />`, 'homepage poster preload');
  }
  return replaceRequired(html, /<div id="root"><\/div>/, `<div id="root">${markup}</div>`, 'empty React root');
}

const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const template = await readFile(join(outputRoot, 'index.html'), 'utf8');
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  for (const page of pages) {
    await access(join(outputRoot, page.image.slice(1)));
    const markup = renderToString(React.createElement(React.StrictMode, null, React.createElement(App, { path: page.path })));
    const html = renderPage(template, page, markup);
    const directory = join(outputRoot, page.path.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'index.html'), html);
    console.log(`Prerendered ${page.path}`);
  }
} finally {
  await server.close();
}
