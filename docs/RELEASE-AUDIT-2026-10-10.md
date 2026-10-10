# Daman release audit — 10 October 2026

## Scope and current publication boundary

Isolated repository: `daman_rebirth_codex`. Antigravity's separate working folder is not modified. This is an illustrative brand/website concept, not a claim that the generated homes are Daman installations. The existing business website and DNS are unchanged. The Pages deployment is separate from a business-domain launch.

The release includes the original textile study, five indicative colour notes, researched curtain-wave/roller/Roman construction guidance, keyboard-visible service links, skip navigation, inert closed mobile navigation, Escape-to-close behaviour and a 44 px menu target. The tablet menu avoids a crowded desktop navigation. A genuine 320 px layout overflow was fixed at the introduction grid/flex constraint, not hidden with horizontal clipping.

## Technical checks completed locally

- `npm run lint`: pass, no reported issues.
- `npm run build`: pass; 21 transformed modules. Release CSS 24.61 kB / 6.14 kB gzip; JavaScript 242.19 kB / 74.94 kB gzip.
- `git diff --check`: pass; normal Windows line-ending warnings only.
- `npm audit --omit=dev`: zero reported production-dependency vulnerabilities. This is not a security certification or an audit of excluded development dependencies.
- Thirteen literal asset references resolve locally; template-generated desktop/mobile film and poster paths are checked in browser playback separately.
- All eight generated source videos pass byte-hash, full decode, dimensions, duration, audio-presence and original embedded-credential checks. Official C2PA trust-list validation reports no source issues. Included credits reconcile to 760 used / 240 remaining, with no duplicate canonical hashes.
- Browser layout checks at requested widths 320, 390, 820, 1024 and 1440: document scroll width equals client width; no completed image has zero natural width; exactly one H1. Classic desktop scrollbars reserve 15 px, so measured client widths are 305, 375, 805, 1009 and 1425.
- Desktop film decodes at 1600 × 900 / 26 seconds, plays muted, pauses through the control, and is paused while the material controls are in view.
- Olive selection updates the pressed state and descriptive note; the native fold disclosure opens and exposes the three construction descriptions. The original material image decodes at 1440 px wide and is framed at its native 3:2 ratio rather than cropping away the sheer panel.

Local screenshots in `qa` are supporting evidence, not proof of a future deployed release. Public desktop/mobile and media-fallback checks are a separate gate and will be appended after deployment.

## Visual findings

The direction is warm and editorial: cream, matte mushroom, olive, espresso and ink; restrained serif/sans/mono hierarchy; natural timber/stone light; a separate three-textile image rather than another reused hero frame. Colour buttons communicate inspiration, not confirmed stock or actual photographic recolouring. Construction illustrations distinguish vertical curtain waves from flat roller panels and raised horizontal Roman folds. Physical samples and Daman's actual catalogue still determine available colours, headings and styles.

The original before/after room comparison and daylight mood control remain explicitly labelled concepts, not performance simulations. There are no fabricated reviews, client-project counts, certification badges, supplier affiliations or verified fabric-composition claims.

## Genuine cinematic hero: not yet released

The six selected motion sources are safely imported into the Adobe timeline. The user's native export is preserved outside `public`, as `media/generated/adobe-timeline-roughcut-test-1080p.mp4`. It contains 839 fully decodable frames at 24 fps, approximately 34.96 seconds, 1080p and AAC audio. Size: 44,627,555 bytes. A sampled contact sheet is retained in `qa/adobe-timeline-roughcut-review.jpg`.

The export retains nine manifests, six original ingredients, a valid content hash and a cryptographically valid Adobe editor signature. The official trust-list result nevertheless reports `signingCredential.untrusted` for the editor. The trust warning is recorded, not bypassed or described as a clean validation. The visible Veo mark remains on the Flow shot.

The file exceeds the [Cloudflare Pages 25 MiB single-asset limit](https://developers.cloudflare.com/pages/platform/limits/). Moving it into `public` would risk a failed deployment; raw 44.6 MB autoplay would also be inappropriate for mobile. The Flow source is genuinely 720p; a 1080p output does not manufacture additional detail.

Completion plan:

1. Review every selected scene at normal speed, including fine mesh, blind edges, shutter louvres and moving cloth. Decode success alone does not rule out flicker, texture shimmer or perceptual stutter.
2. Keep native 24 fps throughout; avoid synthetic frame interpolation and aggressive sharpening that can destabilise mesh and folds. Select stable portions and use restrained approximately 0.6–1 second dissolves with balanced exposure, not flash cuts. Trim the stronger opening/closing motion where it distracts from the furnishings.
3. Produce a quiet loop without adding a duplicate sheer-service chapter. Use one Flow sheer take only; retain its mandatory watermark. Confirm the final sequence and correct chapter timings against the actual export.
4. Use a native provenance-preserving web export, comfortably under 25 MiB, and inspect dark gradients and textile/mesh detail before accepting compression. Resolve or clearly account for the publisher trust warning. Do not recompress with the still-artwork renderer and silently discard source credentials.
5. Art-direct portrait framing separately. Do not crop away the required watermark or mechanically centre-crop a wide security/fly-screen composition. Keep muted inline playback, poster fallback, accessible pause, offscreen pause, reduced-motion and data-saving behaviour.
6. Validate each final export's original-ingredient lineage, complete decoding and normal-speed playback on the actual deployed site. Test a throttled connection and physical iOS Safari / Android Chrome before claiming broad device readiness.

The public hero remains the previously delivered silent 26-second generated-still cinematic edit. It is not represented as genuine cloth/scene motion. No unreviewed motion clip is substituted just to declare the feature finished.

## Remaining business and launch gates

- Final genuine-motion production and responsive review, as above.
- Physical-device iOS/Android checks, full screen-reader/accessibility assessment and formal performance profiling. Chrome DevTools performance MCP is not configured; no invented Lighthouse/Core Web Vitals score is supplied.
- Google Fonts are externally loaded with `display=swap`; self-hosting and measured font-shift/performance optimisation remain future work, not claimed improvements.
- Daman approval of the actual fabric/headings/range and business details before custom-domain cutover. Conflicting street addresses remain deliberately omitted.
- Contact uses verified phone/email link destinations. No web-form submission, inbox delivery, analytics consent setup or Search Console registration is claimed.
- Canonical/social metadata and production domain/SEO decisions should follow approval of the final launch URL. No domain/DNS/account/billing changes are made in this release.
