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

The hero uses a silent, 26-second H.264 concept film covering six services, with camera drift and soft dissolves rendered from original AI-generated artwork. It is illustrative imagery, not real Daman project footage or AI-generated moving fabric. Desktop and portrait mobile versions are committed in `public/assets`, so Cloudflare Pages does not need a video service or encoder.

Playback is muted and inline, with a pause/play button, still-image fallback, and automatic pausing offscreen or in a hidden tab. Reduced-motion and data-saving preferences prevent the video from being mounted or downloaded.

To regenerate with an installed FFmpeg executable:

```bash
node scripts/render-hero-video.mjs
```

Set `FFMPEG_PATH` if FFmpeg is not on your PATH. See [docs/HERO-VIDEO.md](docs/HERO-VIDEO.md) for provenance and validation.

Eight genuine-motion originals, including the alternative sheer take and clearer-motion fly-screen retake, are retained separately in `media/generated`; they have not replaced the still-artwork hero. Flow is the user's preferred sheer take, not an extra duplicate chapter. Adobe usage reconciles to 760 existing included credits with 240 remaining; no purchase was made. The six selected clips were imported into Adobe's timeline, and a native rough-cut export is preserved. Its six source ingredients survive in embedded Content Credentials, but the editor signature has a trust-list warning and the 44.6 MB export exceeds the Pages asset limit. It is not a finished public hero. With FFmpeg and C2PA Tool installed, `npm run media:audit` verifies source hashes, full video decoding, duration and embedded credentials; add `-- --trust` to check the official C2PA trust list. Set `FFMPEG_PATH` and `C2PATOOL_PATH` as needed. See the [release audit](docs/RELEASE-AUDIT-2026-10-10.md) for exact status and the remaining cinematic-production gates.

## Audit and research

See [docs/SITE-AUDIT-AND-RESEARCH.md](docs/SITE-AUDIT-AND-RESEARCH.md) for the captured public-site inventory, source record, claims policy, content decisions, and handoff gates.

The [visual refinement record](docs/ANTIGRAVITY-AND-VISUAL-REFINEMENT.md) covers selected Antigravity concept assets, new original before/after imagery, the comparison interaction, and free-only generated-video limitations. The [Cloudflare repair record](docs/CLOUDFLARE-REPAIR.md) separates saved settings, deployments and actual browser verification.

The [material and fold research](docs/MATERIAL-AND-FOLD-RESEARCH.md) supports the new original textile study, indicative colour notes and construction guide. Educational Roman/roller/curtain distinctions do not invent an unverified Daman range.
