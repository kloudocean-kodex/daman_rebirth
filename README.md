# Daman Group Rebirth

An original, responsive Vite + React site for Daman Group Pty Ltd, deployed through Git-connected Cloudflare Pages. The homepage and collection pages combine supplied real project photography with clearly labelled original concept studies and the established concept hero film.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22.12` or newer (Node 24 is also supported)

No runtime environment variables are required. Contact paths are `tel:` and `mailto:` links; add a server-side lead endpoint before replacing them with a web form.

## Collections and real media

The build prerenders `/`, `/sheer-curtains/`, `/blockout-blinds/` and `/about/` into HTML with route-specific metadata. `node scripts/audit-pages.mjs` checks document headings, duplicate IDs, local asset references and internal link targets after a build. Browser visual and interaction QA remains a separate check.

The 28 October supplied-media selection uses real full-height S-fold curtain and roller-blind photographs. Original source filenames and hashes are recorded in `docs/client-media-review/selected-assets.json`. Responsive WebP exports preserve the photographed geometry. The eight-colour sheer atelier is a clearly labelled digital tint preview, not a confirmed product range.

The two collection films are silent, click-to-play portrait exports with no audio streams. Their source footage is 478×850; neither the exports nor their presentation claim native HD detail. Full-decoding and audio-absence evidence is in `docs/client-media-review/film-exports.json`.

To reproduce the optional media preparation, set `CLIENT_MEDIA_SOURCE` to the original client directory and `FFMPEG_PATH` to your FFmpeg executable, then run `node scripts/review-client-media.mjs`, `node scripts/prepare-client-assets.mjs` and `node scripts/encode-client-films.mjs`. Committed assets allow Cloudflare builds without FFmpeg or access to the private source folder.

The public address was confirmed by the owner: 134 Gateway Boulevard, Epping, Victoria, Australia. See `docs/REAL-PROJECT-REFINEMENT-2026-10-28.md` for the brief, source review and verification boundaries.

### Production domain

The canonical URL, social preview URLs, `robots.txt`, and `sitemap.xml` use `https://damangroup.com.au/`. The Pages `_redirects` file preserves the previous `/index.html`, `/about.html`, `/contact.html`, and gallery URLs.

In Cloudflare Pages, add `damangroup.com.au` as a custom domain before relying on DNS records; add `www.damangroup.com.au` as well if it should redirect to the apex domain. Verify the authoritative DNS and retain any existing mail-related MX/TXT records before saving changes. DNS and redirect rules must be verified in the account dashboard; this repository change alone does not publish the domain.

## Hero film

The hero now uses a silent, approximately 35-second native Adobe showreel assembled from six genuine generated-motion concepts: the preferred Google Flow sheers and five Adobe service scenes. It is illustrative imagery, not real Daman project footage or verified product-operation footage. The unchanged native 720p/24 fps MP4 is committed in `public/assets`; Cloudflare Pages needs no encoder, media API or paid hosting addition.

The film has no audio track. Playback additionally enforces muted/zero-volume inline playback, with pause/play, poster fallback, and automatic pausing offscreen or in a hidden tab. Reduced motion, data saving and reported slow connections prevent video mounting. The full frame and mandatory Veo mark are retained; phone/tablet layouts separate the film from the headline instead of cropping it.

To reproduce the superseded still-artwork edit for reference, not the current hero:

```bash
node scripts/render-hero-video.mjs
```

Set `FFMPEG_PATH` if FFmpeg is not on your PATH. See [docs/HERO-VIDEO.md](docs/HERO-VIDEO.md) for provenance and validation.

Eight unchanged motion originals and the native 1080p rough cut remain separately in `media/generated`. The new 25,642,239-byte silent web export fits Pages' 25 MiB limit and preserves nine embedded Content Credentials manifests/six ingredient links. The Adobe editor's official trust-list warning remains documented; it is not represented as a clean trusted-identity result. Last generation-credit reconciliation on 10 October: 760/1000 included credits used, 240 remaining; no new generation, purchase or plan change in this release.

With FFmpeg and C2PA Tool installed, `npm run media:audit` audits the eight sources and `npm run media:audit:hero -- --trust` audits the native web film, audio absence and exact selected ingredients. Set `FFMPEG_PATH` and `C2PATOOL_PATH` as needed. Do not recompress/remux the signed film using a workflow that strips provenance. See the [current release audit](docs/RELEASE-AUDIT-2026-10-11.md) for verified checks, delivery trade-offs and outstanding gates.

The champagne-gold D-and-dot intro is a lightweight SVG/CSS interpretation of the supplied logos. It waits only for the critical poster/fonts, exits within 1.4 seconds plus its fade, skips repeat tab-session visits/reduced motion, and never traps focus or waits for the whole MP4. Original logo references are preserved in `docs/branding`.

Pages' static server currently ignores HTTP Range. Production playback therefore uses the versioned `/media/showreel-20261011` streaming Function, preserving exact signed native bytes and serving proper 206 ranges. Only that route invokes Functions; other pages/assets stay static. It uses the existing Workers allowance, not a newly purchased plan. Vite development uses the direct MP4; use `npx wrangler pages dev dist` after a build to verify the real gateway locally. `wrangler.jsonc` preserves the existing `dist` output directory and contains no credentials.

## Audit and research

See [docs/SITE-AUDIT-AND-RESEARCH.md](docs/SITE-AUDIT-AND-RESEARCH.md) for the captured public-site inventory, source record, claims policy, content decisions, and handoff gates.

The [visual refinement record](docs/ANTIGRAVITY-AND-VISUAL-REFINEMENT.md) covers selected Antigravity concept assets, new original before/after imagery, the comparison interaction, and free-only generated-video limitations. The [Cloudflare repair record](docs/CLOUDFLARE-REPAIR.md) separates saved settings, deployments and actual browser verification.

The [material and fold research](docs/MATERIAL-AND-FOLD-RESEARCH.md) supports the new original textile study, indicative colour notes and construction guide. Educational Roman/roller/curtain distinctions do not invent an unverified Daman range.
