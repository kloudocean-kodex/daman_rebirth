# Daman Group Rebirth

An original, responsive Vite + React concept for Daman Group Pty Ltd. It is designed as a static Cloudflare Pages deployment and deliberately uses only verified public business information and original, AI-generated visuals.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20` or newer

No runtime environment variables are required. Contact paths are `tel:` and `mailto:` links; add a server-side lead endpoint before replacing them with a web form.

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
