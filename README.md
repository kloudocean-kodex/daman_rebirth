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

## Audit and research

See [docs/SITE-AUDIT-AND-RESEARCH.md](docs/SITE-AUDIT-AND-RESEARCH.md) for the captured public-site inventory, source record, claims policy, content decisions, and handoff gates.

The [visual refinement record](docs/ANTIGRAVITY-AND-VISUAL-REFINEMENT.md) covers selected Antigravity concept assets, new original before/after imagery, the comparison interaction, and free-only generated-video limitations. The [Cloudflare repair record](docs/CLOUDFLARE-REPAIR.md) separates saved settings, deployments and actual browser verification.
