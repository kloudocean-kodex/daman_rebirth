# Daman hero film and production brief

## Delivered concept film

The film is an original edit of AI-generated still artwork, with smooth camera drift and one-second dissolves. It is **not** AI-generated scene motion, real Daman project footage, or evidence of the exact products Daman supplies. No stock video of unknown provenance is used.

- Six chapters: sheer curtains, blinds, plantation shutters, curtains, security doors, fly screens.
- Opening and closing return to the same sheer-curtain interior for a quiet loop.
- Desktop: 1600 × 900. Portrait mobile: 720 × 1280.
- Duration: 26 seconds at 24 fps. H.264/yuv420p MP4, fast-start metadata, no audio track.
- A separate portrait edit retains the furnishings rather than wasting mobile bandwidth on a wide video.
- Matching JPEG posters are loaded first. Video starts muted and inline only when motion is permitted.
- The accessible play/pause button supports keyboard use. Offscreen and hidden-tab playback pauses automatically.
- Reduced-motion and supported browser data-saving preferences prevent mounting the video. A video error leaves the still poster and removes the unusable control.

Sources are the seven project-original PNG assets in `public/assets`: hero, blinds, shutters, curtains, security, flyscreen and the independently used material study. The curtain bedroom was generated on 10 October 2026 specifically to give opaque curtains a distinct visual chapter. The film itself uses six of these assets; the material study is not treated as a seventh service.

`scripts/render-hero-video.mjs` reproducibly renders both versions using FFmpeg. Encoding is a local production task, not part of the Cloudflare build. The committed MP4s are served as static assets; no external media API, credentials or streaming subscription is required.

Technical references: [FFmpeg zoompan/xfade](https://ffmpeg.org/ffmpeg-filters.html), [MDN autoplay guidance](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

## Genuine generated-motion upgrade: free access under evaluation

Runway's browser account was authenticated on 10 October 2026 and showed Personal / Free with 121 remaining credits. The inspected Gen-4, Gen-4 Turbo, Gen-4.5 and featured video models displayed Upgrade; selecting Gen-4 Turbo still showed Upgrade instead of a generation action. No credits were spent. Its separate ChatGPT integration is not connected. Google Flow and Adobe Firefly are being evaluated as alternatives; see `FREE-VIDEO-PROVIDER-RESEARCH.md`. Never substitute a still-image camera edit and call it generated moving curtains. New paid usage is outside the user's approved budget.

Suggested shot briefs for image-to-video, using the corresponding original image as its first-frame reference:

1. **Sheer curtains:** subtle breathing movement in sheer linen, near-imperceptible breeze, a slow 40 mm dolly forward, warm daylight, preserve the exact architecture and curtain folds. No morphing or warping.
2. **Blinds:** sunlight gradually softens through a linen blind; slow lateral camera movement brings the weave into focus. Keep hardware and blind geometry fixed; do not invent motorisation or demonstrate a performance rating.
3. **Plantation shutters:** a restrained camera glide across louvres and warm bands of afternoon light. Preserve parallel slats, hinges and window frames. No mechanically impossible movement.
4. **Curtains:** shallow camera drift along rich opaque curtain folds into the softly lit bedroom. Tactile cloth, deep taupe, bronze, natural highlights; no glossy CGI.
5. **Security doors:** measured approach toward the contemporary screened entrance, grazing warm light across fine mesh and dark metal. No claims of certification, burglary resistance or a specific product brand.
6. **Fly screens:** a still threshold and fine screen mesh, with natural leaf movement outside and a minimal camera drift. Preserve mesh topology, door frame and opening geometry.

All shots: photoreal architectural editorial cinema, restrained grade, no people, no invented logos or embedded promotional text, no fast motion, no flicker. Retain any provider-required watermark; clean exports require a provider entitlement that expressly permits them. Generate landscape masters first; inspect each shot before editing. Prepare separately art-directed portrait framing rather than blindly cropping the finished wide film.

## Interaction direction

Genuine-motion originals are preserved under `media/generated` for all six services, plus an eight-second watermarked 720p Flow sheer alternative. They are not yet the public hero. The user prefers Flow; the Adobe and Flow takes share a reference but are different videos, and only one sheer take belongs in the final sequence. Blinds lower, opaque curtains close, and the security door opens despite near-static directions; they are concepts, not product-operation or motorisation proof. The first fly-screen take is too subtle; a four-second 80-credit retake was submitted. Initial Adobe usage was 680/1000 existing credits before that retake, not a purchase. Original C2PA/SynthID provenance validates against the official trust list and must survive the production editing workflow; plain FFmpeg recompression is not a credentials-preserving export. See `media/generated/PROVENANCE.md` for measured integrity, actual credit reconciliation, quality findings and remaining gates.

The daylight study is an explicitly labelled **mood illustration**, not a light-transmission or energy-efficiency simulator. It lets visitors adjust a room atmosphere with an accessible native range input; the scene changes instantly without scroll hijacking, heavy WebGL or a third-party tracking dependency. Reduced-motion preferences still apply to the site.

The collection now separates all six confirmed core services. Gallery-only “Roller Curtains” remains unconfirmed and is not introduced as a seventh offer.

## Research and integration boundaries

- [Awwwards IM Interiors listing](https://www.awwwards.com/sites/im) and [Change — Different Living listing](https://www.awwwards.com/sites/change-different-living) were found as category references. Direct article retrieval timed out; their full experiences were **not** audited or copied. Award status is not a claim about this project.
- [Pexels API](https://www.pexels.com/api/documentation/) supports stock photos/videos and has attribution/API requirements. No Pexels asset is used in this film.
- [Unsplash API](https://unsplash.com/documentation) is a photography API; it is not an AI video-generation provider. No Unsplash asset is used in this film.
- GitHub authentication is available. Repository-level Actions secret and variable lists were empty, and no matching provider credential environment names or credential configuration files were found in the isolated project. This is not a claim that no organisation-wide or separately stored credentials exist. Secret values were not retrieved or printed.
- Two untracked videos, `hero-curtains.mp4` and `hero-sunlight.mp4`, appeared during work. They were not created by this renderer, their provenance is unknown, and they are neither referenced nor included in the commit.

## Browser QA

### Latest genuine-motion checkpoint — 10 October 2026

The fly-screen retake is saved and has visibly stronger foliage/camera movement. Adobe's last verified balance is 240/1000, with 760 included credits used and no purchase. The user successfully imported the preferred Flow sheers and five selected Adobe service clips into the existing timeline; the excluded Adobe sheer comparison and first fly-screen take are not in the edit.

The user's native 1080p/High export is preserved as `media/generated/adobe-timeline-roughcut-test-1080p.mp4`: 44,627,555 bytes, 839 decoded frames, 24 fps, 1920 × 1080, approximately 34.96 seconds, with AAC audio. Its nine embedded manifests include six component ingredients and an Adobe Firefly Video Editor signature. Ingredient hashes and the export signature validate cryptographically, but the official C2PA trust-list check reports `signingCredential.untrusted` for the editor. Do not describe this as a clean trusted-identity result. The unchanged original clips still pass the official-list check without issues.

This export is a rough cut, not the public hero. It exceeds the [25 MiB Pages asset limit](https://developers.cloudflare.com/pages/platform/limits/), has not received complete normal-speed temporal/loop/framing approval, and its Flow source remains 720p even inside a 1080p export. The source/credential evidence is preserved outside the production build. See the release audit for a quality-first completion plan; never silently strip provenance or claim that an upscale creates missing source detail.

The initial single-scene version passed Edge playback, pause, keyboard resume and mobile source-selection checks. Reduced-motion emulation verified zero mounted videos and zero MP4 resource requests. It is superseded by the six-chapter edit; final checks are recorded separately in the deployment record, not inferred from those initial results.

Final six-chapter local checks on 10 October 2026:

- Both MP4s fully decoded through FFmpeg without video errors: 624 frames each, 26 seconds. Desktop file 7,456,644 bytes; mobile file 4,539,189 bytes.
- Edge desktop playback verified 26-second duration, 1600 × 900 decoded frames, muted playback and advancing time.
- Edge portrait emulation at 390 × 844 verified the dedicated 720 × 1280 source playing and visually inspected the curtain chapter.
- Blocking MP4 URLs left the poster visible with no video element or broken playback button.
- Final reduced-motion reload verified `videoCount: 0` and `videoRequests: 0`.
- Offscreen playback paused when the daylight control received focus. Native range Home/End produced 0/100, changed the displayed mood and CSS lighting values; pointer input also worked.
- All temporary media, device, cache and network-blocking overrides were removed after QA.
- Screenshots are retained in `docs/qa`; the six-chapter contact sheet was visually inspected. Physical-device Safari/Android checks and a full accessibility/performance audit remain separate release gates.
