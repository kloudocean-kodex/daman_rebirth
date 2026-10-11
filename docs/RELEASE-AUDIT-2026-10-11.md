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

The MP4's `moov` box is at the end, as supplied by Adobe. Moving it with a plain remux would destroy embedded credentials. Efficient startup therefore relies on HTTP byte-range delivery, to be verified on Pages. The film remains relatively heavy at 24.45 MiB; this is a native-quality/provenance compromise, not a claim of ideal low-bandwidth performance. A future smaller credential-preserving export or separately approved media hosting is an optimisation, not a prerequisite to showing the poster or using the page.

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

Pending this release's push, Pages result and live browser audit. The previous deployed release was `cc23aaf`; it used the older still-motion film. Do not infer a new public deployment from a local build.
