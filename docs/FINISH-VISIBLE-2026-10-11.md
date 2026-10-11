# The shape of a finish — no-click refinement

## Decision and scope

The prior polish made the whole native summary row clickable, rather than just its plus icon. It still kept the three notes collapsed, which did not meet the user's clarified preference to avoid an expansion action.

The accordion is now removed entirely. Curtain waves, Roller blinds and Roman folds are visible by default, under an editorial serif heading and quiet subtitle, with the existing line illustrations and fine separators. There is no plus, minus, hover-only reveal, summary control or hidden content. Regular page scrolling remains necessary on shorter screens; no content has to be opened.

Opinion: three short useful explanations are better presented directly than hidden behind a low-discoverability control. The tradeoff is a somewhat longer page. This keeps the same restrained aura and avoids adding a carousel, nested interactions or unrelated design changes.

Only `src/MaterialStudy.jsx` and its fold-specific rules in `src/material-study.css` change. Tone assets, tone-loading logic, hero film, no-audio behavior, loader, other components, contact details and Cloudflare configuration are unchanged. Old disclosure audit files remain historical evidence, not a claim about the new static section.

## Local validation

- Eleven viewport checks passed: 320×720, 375×667, 390×844, 430×932, 600×900, 820×1180, 1024×768, 1440×900, 1920×1080, 2560×1080 and 844×390 landscape. No measured document or article overflow; all three rows had positive layout height and full opacity without activation.
- Heading hierarchy is Material notes H2, finish heading H3 and individual notes H4. Decorative diagrams remain hidden from assistive technologies.
- All five tone selections still changed the pressed state and decoded image correctly.
- Tab from Ink goes directly to the material enquiry link, not a redundant disclosure control. Enter reaches and focuses Contact.
- `npm run lint`, `npm run build` and `git diff --check` passed. The JS and CSS bundles are slightly smaller after deleting disclosure markup and styles.
- The mobile section was visually inspected at 390×1000. An unsuitable native-scroll screenshot was rejected and replaced; it is not used as proof.

Local evidence: `docs/qa/finish-visible-local-2026-10-11.json` and `docs/qa/finish-visible-local-mobile-2026-10-11.jpg`. Vite preview validation is specific to these static notes and colour controls, not a new test of the unchanged Pages media gateway.

## Release gate

Public deployment and responsive browser verification follow this implementation commit. Physical Safari/iOS/Android and formal assistive-technology coverage remain separate pending checks; viewport emulation is not universal device certification.
