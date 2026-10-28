# Real project photography and collection pages

## Client brief and sources

The client requested larger Daman branding, real curtain photography with accurate S-fold waves, full-height sheers, blockout blinds, eight sheer colour directions, a larger telephone number, the complete public address and an About page. The user confirmed the source directory `C:/Users/gawar/Downloads/DAMANGROUP_ASSETS_28_Oct` and the public address **134 Gateway Boulevard, Epping** in this conversation on 28 October 2026.

The supplied directory contains 59 JPEG files and 13 MP4 files. Photos 1–7 in the review inventory depict the Beaumont website on a laptop; they are reference material, not Daman work. The remaining files cover sheer curtains, roller blinds, details and unrelated interior work. Twelve photographs were selected for responsive web exports, with original dimensions and source SHA-256 hashes recorded in `client-media-review/selected-assets.json`. Room geometry, curtain headings, folds and fabric texture are preserved. No upscaling or generative alteration is applied to project photographs.

The connected Drive search found a Daman Home Centre catalogue folder, but did not verify the requested curtain media there. Those catalogues and logos are not used as evidence for this website. The user-confirmed local folder is authoritative for this update.

## Reference research

- [Beaumont Tiles](https://beaumont-tiles.com.au/) was reviewed on 28 October 2026. Adapted patterns are clear collection entry points, colour-led exploration, room photography and consultation pathways. Daman retains its own layout, typography, gold mark, copy and supplied media. No Beaumont source, imagery, reviews, guarantees, price claims or retail inventory is copied.
- [Silent Gliss Wave technical document](https://www.infiniti-shading.co.uk/wp-content/uploads/2020/09/TECH-5600.pdf) describes a compatible heading system producing a continuous wave. The Daman page explains the role of track, carrier spacing, fabric and fullness without asserting that Daman supplies that particular brand.
- [Luxaflex roller blinds](https://www.luxaflex.com.au/products/blinds/roller-blinds) distinguishes single/double rollers and fabric opacity choices. Daman copy uses the general distinction between the opaque panel and the installed window coverage. It does not assert an affiliation or copy proprietary product specifications.
- [Freedom S-fold information](https://www.freedom.com.au/s-fold-curtains-information) provides a primary retailer reference for the wave heading and layering sheers with a separate blockout treatment. The website explains that sheer privacy varies with lighting and that edge gaps affect room darkening.

## Implementation

- `/sheer-curtains/`: full-room project hero, S-fold/track/full-drop detail, three real gallery views, an original silent portrait clip, eight colour previews, practical visible questions, consultation steps and a related blockout link.
- `/blockout-blinds/`: real roller-blind hero, fitting/coverage/fabric guidance, real project gallery, an original silent clip, visible practical questions and a related sheer link.
- `/about/`: factual Daman introduction, supplied room photography, process and confirmed address. No invented people, project counts, reviews or history.
- Header/footer: larger house/D/dot mark and wordmark; direct links to the new pages; large telephone link; full confirmed address with a Maps link. All pages share the same navigation/contact components.
- Homepage: the sheer, blind and curtain service imagery and the gentle-daylight scene now use supplied real photographs. The established hero showreel remains the separately labelled concept film.
- The existing always-visible finish notes remain visible. The existing material studies remain labelled as design inspiration.

## Colour preview and media boundaries

The former generated before/after comparison is replaced with a colour atelier using one genuine full-height curtain photo. An SVG path follows only the curtain area and uses multiply blending to keep the original waves and their shading. White, pearl, cream, beige, light grey, dark grey, green and dark green are instant interface previews. They do not establish the stocked range, fabric opacity, colour accuracy or an installed outcome. The visible caption asks visitors to assess physical samples.

Real videos are loaded only when Play is selected. They retain their portrait frame instead of being stretched into a landscape hero. Audio is removed from the exported files; the player also enforces muted playback. Playback pauses offscreen and when the tab becomes hidden. The source WhatsApp video is about 478 pixels wide; a web export cannot turn that into native 1080p detail. See `client-media-review/film-exports.json` for export and decoding evidence.

## Deployment and verification

The build prerenders all four pages into actual HTML documents with individual titles, descriptions, canonical/OG metadata and hero image preloads. The sitemap contains all four routes. This supplies meaningful content before JavaScript hydrates, and direct page refreshes do not depend on a client-side routing fallback.

### Verified locally

- `npm run build`, `npm run lint` and `git diff --check` pass. All four pages are prerendered successfully.
- `node scripts/audit-pages.mjs docs/client-media-review/static-page-audit-2026-10-28.json` passes: each page has one H1 and no duplicate IDs; all 79 internal link references point to existing routes/anchors; all referenced local image, stylesheet, script and font URLs exist in the build. These are document checks, not 79 browser clicks.
- Both real MP4 exports fully decode with `-xerror`, contain zero audio streams and a single H264/yuv420p video stream, are 478×850 at 30fps, and have faststart metadata. The sheers clip is 1,574,351 bytes/14.267 seconds; the blinds clip is 1,576,774 bytes/8.834 seconds. Their first/middle/last-frame sheet was inspected.
- The independent source review found and corrected menu height overflow on short landscape screens and keyboard focus skipping the opened menu. The menu now scrolls within the viewport, resets its internal scroll on reopening, focuses its first link and closes when focus leaves the header. These fixes still need runtime browser verification.
- A first-click video-loading deadlock was corrected: the initial Play action mounts the source and triggers playback; decoded frames then replace the poster. This also needs browser playback verification.
- `docs/qa/client-sheer-colour-study-2026-10-28.jpg` was rendered from the same palette and curtain mask used by the interface and visually inspected. It shows colour simulations on the actual photograph; it is not a website screenshot.

### Browser verification blocker

Edge was confirmed running, the ChatGPT extension enabled, and the native messaging manifest valid using the bundled official diagnostic commands. The browser control host remained unavailable after retries and the supported fresh-profile-window reconnect. The native Windows capture helper also timed out. No responsive screenshot, hydration, real click, runtime video-playback or public visual pass is claimed for this release. The user has been asked to reconnect/reinstall the Browser plugin so these checks can be completed.

Pending: desktop/mobile/tablet visual and interaction checks through a working browser connection; physical iPhone/Android playback and real cellular checks; formal assistive-technology testing. The existing custom-domain/DNS and enquiry-delivery boundaries remain separate from this Pages review release.

### Public review release

- Implementation commit `67af2b8` deployed successfully on Cloudflare Pages as `2052bf83-cf0a-4981-be8e-fa421a7c4f11`.
- Responsive hero preload refinement `ceb9ae7` deployed successfully as `fd25fb08-51bb-464d-a13c-5067da9eaadf`. Interior hero preloads now share the rendered image's responsive source set and sizes; the About hero uses the same tablet breakpoint as its layout.
- Public HTTP checks pass for `/`, `/sheer-curtains/`, `/blockout-blinds/` and `/about/` at `https://daman-rebirth.pages.dev`. All four return 200, match the current built application bundle, contain the confirmed address, and expose one H1.
- All 38 new photo variants, posters and video files return 200 and match their local SHA-256 hashes. This confirms that the public real-video files are the exact verified audio-free exports.
- The existing hero streaming route returns `206`, `Content-Range: bytes 0-1/25642239` and exactly two bytes for the requested range.
- Machine-readable proof is in `client-media-review/public-http-audit-2026-10-28.json`; `node scripts/audit-public-pages.mjs` reproduces the checks.

These are deployment/content checks. The fresh browser-session reset and fresh browser inventory still returned an unavailable control host, so the browser visual/click/playback gate remains pending. This is a published review release, not a claim of universal device certification.
