# Material study and finish disclosure — scoped audit

## Changes

- Five individually generated tone previews: Oat, Mushroom, Olive, Espresso and Ink. Curtain dye changes without a whole-scene hue filter. Fine woven texture and continuous vertical waves remain visible; sheers, stone and bronze stay coordinated.
- Responsive 480/960/1536px WebP delivery. The 480px previews are 21,910–25,812 bytes; 960px are 111,190–126,902 bytes. Original 1536×1024 PNGs remain outside `public/`, archived in Git with prompt provenance and SHA-256 inventory.
- Only the default Oat preview is initially rendered, lazily. Other images load on demand and decode before a 400ms layered reveal. The previous successful frame stays beneath the transition. Stale async results cannot override a newer choice. A failed request keeps the previous frame and exposes a retry message.
- Native colour buttons expose the selected state and control both the image and the descriptive note. Reduced-motion requests have no reveal animation.
- Mobile order is heading, image, swatches and finish notes, so the image and choices are adjacent rather than separated by the introduction.
- The existing disclosure already accepted clicks across its row; it was not a plus-only handler. It now has a clearer full-width 76px activation row, a quiet circular plus/minus, a short subtitle, hover/focus treatment and separated illustrated notes. Native details/summary behavior is retained.
- A narrow cache rule covers the versioned tone files only: `public, max-age=31536000, immutable`. Future artwork replacements must use a new versioned filename, never overwrite v1. Hero film, no-audio behavior, intro loader, rest of the site and Cloudflare account/project settings are unchanged.

## Verified locally

Production build served through the local Pages runtime at `http://127.0.0.1:5190`, not the Antigravity sibling app.

- All five buttons update the selected state, note, caption and successfully decoded image.
- Title-area and icon clicks toggle the disclosure; Enter opens and Space closes it. Colour buttons also activate by Enter and Space.
- Eleven viewport sizes pass measured horizontal-overflow, 3:2 image framing, minimum 44px targets and icon-centering checks: 320×720, 375×667, 390×844, 430×932, 600×900, 820×1180, 1024×768, 1440×900, 1920×1080, 2560×1080 and 844×390 landscape.
- Mobile 2× resolution requests the 960px preview. Only the Oat image was requested before another tone was selected.
- Deliberately blocking Ink preserves decoded Oat with an honest failure message; removing the block and selecting Ink retries successfully.
- Four quick choices with a throttled connection preserve the current image while pending and finish on the last selected tone, Oat.
- Reduced motion shows one fully opaque image with no animation. The enquiry link reaches and focuses Contact with the generic email destination.
- Mobile expanded notes and tablet composition were visually inspected. A 2× screenshot provider mismatch was replaced with a correctly framed 1× capture; it is not used as visual proof.
- `npm run lint`, `npm run build` and `git diff --check` pass. Twenty asset entries have checked dimensions and hashes. Build output: JS 247.20kB / 76.38kB gzip; CSS 30.16kB / 7.22kB gzip.

Evidence: `docs/qa/tone-audit-local-2026-10-11.json`, `docs/qa/tone-local-mobile-open-2026-10-11.jpg`, `docs/qa/tone-local-tablet-2026-10-11.jpg`. Asset prompts: `docs/TONE-IMAGERY-2026-10-11.md`; asset hashes: `media/generated/tones/manifest.json`.

## Deployment and public QA

Implementation commit `3adacd3ffd8a17d67b0bafeb8b8ca8a294366833` successfully auto-deployed to production deployment `9f420024-2b24-4ea0-9419-58339ac60550`. Both the GitHub Cloudflare check and authenticated deployment dashboard reported success. The public site served the matching `index-Bx_X8tXA.js` and `index-BPWkdvcL.css` bundles.

- Real public Edge testing at 390×844, 820×1180 and 1440×900 passed all 15 tone selections with the correct pressed button, text, image source, successful decoding and fully opaque settled frame.
- At each size, title click, icon click, Enter and Space passed disclosure activation: 12 native activation checks.
- All 15 public delivery images returned HTTP 200, `image/webp` and byte-identical SHA-256 hashes matching the committed inventory.
- The public material enquiry link reached and focused Contact with `mailto:info@damangroup.com.au`. No sending or mailbox-delivery test was performed.
- No console errors, HTTP 4xx/5xx or failed network requests were recorded in this public test session.
- Desktop Olive, mobile Espresso, expanded mobile finish notes and tablet Mushroom screenshots were inspected after their animations settled. Opening-animation frames were not accepted as final visual proof.
- The additional narrow immutable-cache rule was verified through the local Pages runtime after this initial public validation. It is a caching-only follow-up; the application JS/CSS remains identical. The original first deployment used Cloudflare's default image revalidation header.

Public evidence: `docs/qa/tone-audit-public-2026-10-11.json`; screenshots: `docs/qa/tone-live-desktop-2026-10-11.jpg`, `docs/qa/tone-live-mobile-2026-10-11.jpg`, `docs/qa/tone-live-mobile-open-2026-10-11.jpg`, `docs/qa/tone-live-tablet-2026-10-11.jpg`. Latest deployment status remains a separate check for the follow-up commit, not inferred from this implementation release.

## Remaining boundaries

These are generated inspiration, not an approved product range or exact textile-colour simulator. Real fabrics and heading availability still need owner confirmation, and physical samples remain authoritative. Edge viewport emulation is not physical iOS/Safari/Android touch, screen-reader or cellular certification. Formal performance/accessibility auditing and the earlier custom-domain/launch gates remain separate. No claim of universal flawless rendering or identical generated cloth geometry is made.

## References

- [MDN: decode images before presentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode)
- [MDN: native summary disclosure and cross-platform accessibility caveats](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary)
- [W3C: target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
