# Daman deep interaction, visual and technical audit

Date: 11 October 2026. Scope: the isolated Codex checkout, not the Antigravity project. This report extends, rather than replaces, `RELEASE-AUDIT-2026-10-11.md`.

## Reproduced issues and fixes

- Mobile header enquiry and home links could leave the navigation drawer open. All internal anchors now close it; outside-pointer, Escape, fragment change and desktop-breakpoint dismissal are covered. Escape returns focus to the menu button.
- Mobile header enquiry was approximately 12px high. It now has a 44px minimum target and a compact visible Enquire label, preserving its accessible Start a conversation name. Service arrows and primary enquiry/footer links also have 44px targets.
- Small muted text used `#817c73`, measuring approximately 3.22-3.55:1 on the three light surfaces. `#68645c` measures 4.57-5.04:1 on those same surfaces. This is not a blanket contrast certification for moving imagery.
- Fragment navigation now focuses the destination without overriding native hash navigation/history; sticky-header scroll clearance is retained.
- Six service enquiry arrows now carry the selected service into the contact eyebrow and email subject. General contact links clear that context. No lead form or delivery claim was introduced.
- Before/after endpoints now hide the irrelevant endpoint label and expose pressed state. Phone labels have bounded widths. Tone controls explicitly explain that they change mood notes, not the displayed textile photograph or confirmed inventory.
- Same typography, fewer external dependencies: five unmodified official Google Fonts Latin WOFF2 files are self-hosted (131,852 bytes total), with source URLs, hashes and original OFL licenses. Three primary faces are preloaded; no runtime Google font request is required. Fingerprinted font binaries receive a one-year immutable cache policy; the font stylesheet has a one-day policy.
- Film conditional requests incorrectly treated a weak equivalent ETag as different (HEAD 200 reproduced). Weak If-None-Match equivalence now returns 304, including a validator list. Range delivery and native movie bytes are unchanged. Reference: [HTTP If-None-Match](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-None-Match).

## Interaction coverage

Inventory: 23 links and 15 additional controls, including responsive/conditional controls. Two links are telephone/email destinations, not ordinary page controls.

- All 21 internal anchors were activated on desktop and phone. Desktop: 21/21 correct destinations/focus. Phone: 18/21 first attempts, with three immediate drawer-opening automation actions hitting the underlying enquiry link before the menu geometry settled. All four menu links then passed after a visible-menu observation. Initial attempts remain in the raw evidence, not erased.
- Header enquiry/home paths, six service contexts, generic-context reset, Escape, outside pointer, desktop-breakpoint reset and native back/forward were checked.
- Three atmosphere buttons change selected state, heading, copy and image source. Five tone buttons change selected state and styling notes. Mushroom was additionally activated with Enter. The fold disclosure opens with Enter and closes with Space.
- Both ranges were exercised by pointer and Home/ArrowRight/End. Comparison endpoints produce 100/0 splits and correct labels. Daylight endpoints visibly change shade/rays opacity, not just numeric text. Settled-state samples are retained because immediate screenshots can precede CSS paint.
- The native film pause/resume button was activated in both states. Paused time 17.407478s; resumed 17.548151s, readyState 4, muted. Offscreen playback paused; reduced-motion removes the video.
- Telephone is `tel:+61433300390`. Email is `mailto:info@damangroup.com.au`, with encoded service subject when applicable. No call was placed, email sent, mailbox delivery tested or enquiry outcome fabricated.
- No unnamed controls or internal anchors without a destination were found in the inspected DOM. Unique application IDs were inspected; browser extension markup is outside application scope.

Raw local evidence: `qa/deep-audit-local-2026-10-11.json`. Some samples intentionally preserve before-paint and failed first automation attempts; they must not be interpreted as clean first-attempt passes.

## Responsive and visual coverage

Edge browser viewport checks: 320x720, 375x667, 390x844, 430x932, 600x900, 820x1180, 1024x768, 1440x900, 1920x1080, 2560x1080 and 844x390 landscape. No measured document overflow, offscreen text/control bounds, or completed broken images across that matrix. Scrollbar width was accounted for using document clientWidth, not an assumed screen width.

Settled screenshot inspection included: small-phone hero and introduction, comparison, phone collection/service artwork, daylight study, textile palette and notes, approach, contact/footer; tablet hero and two-column collection; desktop atmosphere/edit. Transitional frames after resize or smooth scrolling were re-inspected, not accepted as final layouts. All 13 current image elements decoded after the page traversal; these include one reused blind study image, not a repeated hero.

The mobile hero preserves the film at 16:9 above readable editorial copy rather than severely cropping landscape footage behind the heading. Desktop uses its established cinematic layout. Typography, grey/gold identity, palette, supplied D-with-dot motif and page aura remain intact.

## Loader and graceful loading

The intro is a brief welcome, not a promise that every page asset has downloaded. It waits for the critical poster/font readiness, has a configured 1,400ms maximum wait followed by a 450ms fade, allows pointer/Tab/Escape dismissal, remembers the visit in session storage and is suppressed for reduced motion. It does not block pointer interaction or wait for the full 25.6MB film. Lower-page imagery loads lazily.

With font, poster and movie URLs deliberately blocked in a temporary QA tab, the intro dismissed and the contact destination remained usable. With JavaScript disabled, the document exposed a plain telephone/email fallback. Repeat-visit dismissal was verified. Temporary network/script overrides were restored. This does not guarantee recovery from every browser failure, an unavailable HTML document or an enabled-JavaScript bundle download failure.

## Technical validation

- `npm run lint`, `npm run build`, `git diff --check`: pass.
- Legacy Cloudflare build compiler Wrangler 3.114.17: Pages Functions compiled successfully; the previously corrected plain JSON import remains compatible.
- Production dependency audit: zero reported advisories in `npm audit --omit=dev`; not a security certification.
- Local gateway: byte-identical 64-byte prefix, suffix, tail and clamped ranges return 206. Out-of-bounds, inverted and zero-suffix requests return 416. Unsupported multipart/malformed ranges safely return the full representation. Strong, weak, listed and wildcard validators return 304; HEAD 200 has no body, POST 405 has no body.
- Native film audit: 25,642,239 bytes, 1280x720, 24fps, 839 decoded frames, zero audio tracks, six selected component ingredients. SHA256 `B1D980E7570195A599EA25F13B2FEBB1FE2AD18544CB7678890F291D0880F70F`. No new encode/remux or asset regeneration. Visible Veo watermark and Content Credentials remain. The official trust-list check still reports `signingCredential.untrusted`; do not describe the identity as trusted.
- CDN header rules are separated so matching rules do not concatenate conflicting font Cache-Control values. Reference: [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/).
- The two unrelated untracked `hero-curtains.mp4` and `hero-sunlight.mp4` files are not staged or referenced. Local Vite copying them is not proof that they exist in Git-deployed output.

## Pending, not silently certified

1. Real iPhone/iPad Safari and Android testing, touch interaction, low-power/data-saver playback, cellular throttling and assistive-technology testing. Desktop Edge viewport emulation is not physical-device certification.
2. Formal Lighthouse/Core Web Vitals and full accessibility audit. The Chrome DevTools MCP performance tools are not configured here; no numeric performance score, LCP/INP/CLS or comprehensive WCAG AA pass is claimed.
3. Actual telephone/mail application handling and owner-controlled enquiry delivery. Links are validated; no backend form or mailbox delivery result exists.
4. Owner confirmation of product inventory, colours/headings/fabric availability, commercial/service claims and final hero words. Current headline is unchanged pending selection; recommended alternative remains The feeling of home, refined.
5. Production custom-domain/DNS cutover and any necessary owner-approved policies. A successful pages.dev preview is not proof that damangroup.com.au has moved.
6. The web film is native 720p to fit the Pages single-asset limit; the user's untouched 1080p master remains locally available. No claim of native 1080p/4K, universal zero dropped frames, or flawless playback on every connection is made. Adaptive higher-resolution delivery would be a separate deliberate deployment decision, not another lossy re-encode.

Deployment and public-browser rechecks are recorded below after the code release.
