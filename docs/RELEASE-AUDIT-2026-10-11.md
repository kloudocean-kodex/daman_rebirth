# Daman: silent showreel and brand welcome

Date: 11 October 2026. Isolated checkout: `daman_rebirth_codex`. Antigravity's sibling checkout, live original-domain DNS, subscriptions and billing were not changed.

## Implemented

- Replaced the 26-second generated-still hero with the user's preferred six-service motion edit. Only the Flow sheer take is included; the Adobe sheer comparison and first near-static fly-screen take are excluded.
- Muted the Flow ingredient in Adobe's saved native timeline before exporting. The public MP4 contains **no audio stream**, and the browser element additionally enforces muted playback and zero volume. There is no unmute control.
- Preserved the native downloaded file unchanged: 25,642,239 bytes / approximately 24.45 MiB, 1280 × 720, 24 fps, 839 frames, 34.958333 seconds. Adobe setting: 720p / Medium. This is not a 1080p/4K delivery claim. The preferred Flow source itself is 720p.
- Maintained the visible Veo mark, nine embedded Content Credentials manifests and six source ingredient links. Signature/content hashes validate; the official-list check retains Adobe editor's `signingCredential.untrusted` warning. Do not describe this as a clean trusted-publisher result. No custom signing, stripping, recompression or remuxing was used.
- The user's `DG_Showreel_Final.mp4` has exactly the same decoded-frame hashes as the earlier native 1080p timeline export. It is silent but 44,320,250 bytes and has no embedded C2PA claim. It remains untouched in Downloads; the credential-preserving native web export is used instead.
- The new film uses `object-fit: contain`. Phone/tablet composition places a full-width 16:9 film above the editorial headline instead of cropping landscape video into portrait. Desktop preserves the cinematic overlay. No resize-triggered source swap or repeated dissolve between stills remains.
- Playback pauses offscreen/in a hidden tab, offers a keyboard-accessible pause button, and falls back to a high-priority 157,078-byte poster on errors. Reduced motion, Save-Data and reported slow-2G/2G/3G connections do not mount the movie. Autoplay denial still permits manual play.
- Added a restrained grey/olive-charcoal and champagne-gold D-and-dot welcome, header/footer monogram and SVG favicon. The supplied JPEG references are preserved unchanged in `docs/branding`. The web mark is an original simplified vector interpretation, not a claim to possess the official production logo vector.

## Loading architecture

The brand welcome is **not a barrier waiting for the entire website**. It dismisses when the critical poster and fonts settle, or after 1,400 ms, whichever comes first; fading takes 450 ms. It appears at most once per tab session when storage is available, respects reduced motion, dismisses on Tab/Escape/pointer interaction, does not trap focus, capture pointer input, lock scrolling or announce fake progress percentages. If JavaScript fails, the intro never mounts and a phone/email fallback remains available.

Below-fold photography stays independent from the intro. The poster is preloaded/high-priority; the movie is not preloaded before the motion preference and visibility checks. Fonts are requested in the head with preconnect and `display=swap`, rather than through a serial CSS `@import`. A loader cannot guarantee that later network requests will succeed; resilient independent loading is the intended architecture.

The MP4's `moov` box is at the end, as supplied by Adobe. Moving it with a plain remux would destroy embedded credentials. Live probes found that Pages' static asset endpoint ignores Range and returns the entire file with status 200, consistent with [Cloudflare's documented Pages behaviour](https://developers.cloudflare.com/pages/configuration/serving-pages/). A narrowly scoped Pages Function at `/media/showreel-20261011` therefore streams exact native byte ranges using `ASSETS` and `FixedLengthStream`, without buffering the full file, altering media or creating a second video. Its explicit `_routes.json` invokes Functions only on that endpoint; the website and other assets remain static.

The gateway implements GET/HEAD, valid prefix/open/suffix ranges, 206/416, ETag/If-Range and conditional 304, and 405 for other methods. A versioned endpoint avoids stale-film reuse on future edits. Requests count against the account's existing Workers/Pages Functions allowance; [the Free plan has a shared daily quota](https://developers.cloudflare.com/pages/functions/pricing/), not unlimited function calls. No paid plan or storage service was purchased or enabled. If film delivery fails, the page remains usable with its poster. The film is still relatively heavy at 24.45 MiB; a future smaller credential-preserving export can improve slow-network performance. This is not an ideal-low-bandwidth or universal-flawlessness claim.

## Verified locally

- `npm run lint`, `npm run build`, `git diff --check`: pass. Final build figures/deployment recorded in the checkpoint below.
- `npm run media:audit:hero -- --trust`: unchanged SHA-256, fully decoded 839 frames, correct dimensions/frame rate, zero audio streams, six selected ingredients, expected editor trust warning only.
- FFmpeg black-frame check (`blackdetect`, 98% of pixels below 5% luma for at least 0.04 s): no black intervals reported. This is not proof of absence of every subtle temporal artefact.
- Contact-sheet review: distinct sheer, opaque curtain, roller blind, rigid shutter, security door and fly-screen scenes. The last empty contact-sheet tile is unused grid space, not a black frame in the film.
- Edge widths 320, 390, 820, 1024 and 1440: document scroll width equals client width, no header overflow, one H1, no completed broken images. Film stays on one native source while resizing.
- Phone menu opens, Escape closes and focus returns to its toggle; closed navigation has `inert`.
- Room-reveal keyboard Home/End yields 0/100. Daylight Home/End yields 0/100. Olive selection changes its indicative copy and the fold disclosure opens. The hero pauses once it is actually offscreen; keyboard focus alone need not scroll a page.
- Reduced-motion reload: no mounted video, no MP4 requests in an untruncated CDP network event capture, intro hidden, decoded poster present.
- Blocked-MP4 reload: decoded poster remains, movie and non-working playback controls disappear; intro does not remain stuck. Temporary blocking and media overrides were removed.
- Native browser playback reaches `ended: true` at 34.958333 seconds, with decoded 1280 × 720 frames and no video error. Local HTTP tail-range request returns 206 and the correct 13,762-byte range, allowing the browser to retrieve end-of-file metadata without a full-file startup fetch.
- `npm audit --omit=dev`: zero reported production dependency vulnerabilities. This is not a complete security assessment.
- Streaming gateway: Wrangler 4.149.0 compilation and local Workers runtime pass. Range parser/cross-chunk checks pass; actual prefix/tail/suffix responses equal the exact corresponding native bytes. Full streamed response SHA-256 matches the original. HEAD, ETag 304, invalid-range 416 and method 405 are verified. No dependency or input-driven external fetch target is used by the gateway.

## Research informing the implementation

- [web.dev: lazy-loading video](https://web.dev/articles/lazy-loading-video): keep a critical poster available; autoplay can defeat `preload=none`, so mount playback only when appropriate.
- [MDN: object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit): `contain` preserves the whole frame; `cover` crops it. This matters for both product geometry and mandatory visible provenance.
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/): maximum individual static asset is 25 MiB. Native 1080p exports and the 720p/High test exceeded this limit; the silent 720p/Medium export fits without a paid hosting addition.
- [Adobe native export controls](https://helpx.adobe.com/firefly/web/firefly-video-editor/finalize-and-export/export-projects.html): native 720p/1080p/4K and High/Medium/Low choices. Account UI settings were verified, not inferred from marketing.
- [Luma licensing](https://lumalabs.ai/learning-hub/licensing): Free/Lite generations have non-commercial restrictions; they are not a suitable free production source for this business hero.
- [Pika support](https://pika.art/support): commercial use is listed for Creator/Fancy. Older FAQ/pricing search results conflict on free allowances, so no free commercial permission is assumed. No account signup, upload, generation or purchase was made there.

Existing approved Adobe/Flow material already meets the aesthetic direction. Generating more through uncertain free tiers is not necessary to implement an efficient brand intro; the intro uses lightweight original SVG/CSS and no generation credits.

## Outstanding / not claimed

1. Physical iPhone Safari, Android Chrome and real tablet playback/network QA; emulated Edge is not equivalent to testing every device.
2. Formal Lighthouse/Core Web Vitals and screen-reader audit. Chrome DevTools MCP was unavailable; no score or field metric is fabricated.
3. Owner confirmation of actual fabric/colour/heading range, address and any brands/certification claims before adding them. Current material colours/fold diagrams are inspiration, not inventory.
4. Original domain/canonical/social metadata and any enquiry-form delivery system belong to a separately approved launch. Current phone/email links are real navigation channels, not proof of a form backend.
5. A lower-bandwidth credential-preserving film and higher-resolution delivery can improve future large-screen/slow-network quality. Neither “flawless on all devices” nor zero dropped browser frames is claimed.

## Deployment checkpoint

`9eb83f2` deployed successfully at `20fd68f4-844e-4df3-9813-26831a4365bc`; its public HTML matched the compiled `index-DXBoSfxS.js` / `index-BJ5mEi3j.css` bundles. The public MP4's full SHA-256 matched the unchanged native export. Range probes exposed the platform limitation described above. The narrower range-gateway release and final live browser checks follow in the next checkpoint; this first success alone does not close them.

## Verified live range-gateway checkpoint

Cloudflare's logged-in dashboard exposed the actual failed-build cause: its Wrangler 3.114.17 Functions compiler did not understand the JSON import attribute. Commit `12b4a3eade5a6dbdd9f2ce22a3843df41ef4c744` replaces only that import syntax. Both the exact CI compiler version and local Wrangler 4.149.0 compile it successfully; lint, frontend build, diff checks and the native-film audit pass. No hosting, billing, DNS, permission or credential change was required.

The main-branch Git deployment completed successfully at `4be7a542-c051-4dfa-a90f-732935bca810`. Public HTML matches `index-0ODfnPnt.js` / `index-BJ5mEi3j.css`. The live gateway returns exact 206 prefix, tail and suffix bytes, HEAD 200, ETag conditional 304, unsatisfiable-range 416 and method 405. Its complete 25,642,239-byte response has the same SHA-256 as the unchanged native export. The repeated native audit decodes all 839 frames and confirms zero audio tracks, six selected components and the previously disclosed editor certificate-trust warning.

Fresh Edge checks on `https://daman-rebirth.pages.dev/` verify:

- First-visit grey/gold D-and-dot intro is visible, then clears; normal same-tab reload and reduced-motion reload do not leave an overlay stuck. The implemented maximum wait remains a code bound, not a measured guarantee that all website assets have loaded.
- The actual `/media/showreel-20261011` movie plays muted, decodes 1280 × 720 and reports 34.958333 seconds. Tablet playback is observed at 34.905879 seconds; subsequent playback continues at a lower timestamp with `loop: true`, no error and `paused: false`. Captured browser responses show 206 for the film; that normal-playback event capture was truncated, so it is not used to claim a complete network inventory. Exact range integrity is established by the separate complete HTTP tests.
- Verified viewport widths 320, 390, 820, 1024 and 1440 have no horizontal document or header overflow, one H1 and one movie source. No completed image is broken. The full-frame phone film remains above the headline instead of being portrait-cropped.
- Pause/resume controls work. Mobile navigation expands, Escape closes it, focus returns to its toggle and closed navigation is inert. The film pauses when actually scrolled offscreen.
- Room comparison and daylight controls reach 0/100 using Home/End. After the automated scroll settles, Olive selects its original inspiration copy and the fold disclosure opens. Telephone and email destinations match the published business contacts; this does not prove message delivery.
- Reduced-motion reload mounts zero videos and requests zero film endpoints in an untruncated request capture. Blocking the film endpoint removes the failed movie and its unusable controls while preserving the decoded poster; the intro does not remain stuck. Temporary network/media/viewport test overrides are removed after QA.
- Normal-playback console capture contains no warnings or errors. This excludes the deliberately blocked-video test and is not a universal error-free or all-device claim.

Visually inspected evidence is saved under `docs/qa/`: `live-brand-intro-2026-10-11.jpg`, `live-native-showreel-desktop-2026-10-11.jpg`, `live-native-showreel-mobile-2026-10-11.jpg`, `live-native-showreel-tablet-2026-10-11.jpg`, `live-materials-mobile-2026-10-11.jpg` and `live-poster-fallback-mobile-2026-10-11.jpg`. These screenshots show this native-film release, unlike the retained earlier still-film captures.

The owner is reviewing alternatives to the existing headline; no copy change is made without a selection. Remaining work is the physical-device and formal performance/accessibility checks, owner confirmation of real product ranges/address, and separately approved original-domain cutover described above. Native 720p and the film's file size remain delivery trade-offs, not an assertion of flawless 4K or slow-network playback.
