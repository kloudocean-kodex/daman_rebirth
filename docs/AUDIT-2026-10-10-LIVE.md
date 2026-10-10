# Daman Group live-site forensic audit — 10 October 2026

This is an evidence record, not a source for copying code, copy or photography. The page was inspected directly in Edge at `https://damangroup.com.au/`; public content and asset URLs are recorded only to support a lawful, original replacement.

## Capture coverage

| Area | Evidence captured | Status |
| --- | --- | --- |
| Home | navigation, hero, property types, six service panels, testimonial carousel, CTA, footer | verified in Edge |
| About | consultation/concept/finish sequence and four stated values | verified in Edge |
| Gallery | eight visible labels and gallery/footer contact details | verified in Edge |
| Contact | address, email, phone, form fields and embedded third-party surface | verified in Edge |
| Asset shell | 21 images, 7 stylesheets and 7 scripts visible on home | verified in Edge |
| Public registry | legal entity/ABN/ACN/status | previously verified against ABR; refresh before release |

## Live information architecture

### Top-level paths

- `index.html` — home.
- `about.html` — brand/about narrative.
- `Gallery.html` — image grid; capitalisation differs from other routes.
- `contact.html` — contact and enquiry form.

### Home content map

1. Header: Home, About, Gallery, Contact, “Free Consultation”.
2. Hero: custom blinds/interior-design positioning plus CTA.
3. “Our Sites”: apartment, villa, home, office, building, townhouse, shop, garage.
4. Home-improvement/explainer block.
5. Service area: blinds, sheer curtains, fly screens, plantation shutters, security doors and curtains.
6. “Why choose”: custom supply/install, free consultation; national coverage, fast delivery and premium-material statements are currently claimed but not independently substantiated.
7. Testimonial carousel: three named testimonials repeat in the DOM. Do not migrate these without review-source evidence and client approval.
8. Shared footer: Gateway Boulevard Epping address, phone, email, social icons, services, newsletter field.

### Gallery taxonomy

Visible labels are: Blinds; Curtains; Sheer Curtains; Plantation Shutter; Flyscreen; Security Doors; Roller Curtains; Blinds (second image). “Roller Curtains” is **gallery-only evidence**, not a confirmed core service in the global service menu/footer. The rebuild intentionally keeps it out of public service navigation until the owner confirms it.

### About-page statements

The page describes consultation, custom design concept and final finishing. Its stated themes are human-centred design, sustainability, innovation/creativity and collaboration/transparency. These are brand aspirations rather than independently verified operational credentials; the rebuild does not convert them into sustainability, certification or performance claims.

### Contact and data-flow findings

- Contact content displays `9 A Dilop drive Epping` with `Info@damangroup.com.au` and `+0433300390`.
- Shared footer displays `134 Gateway Blvd Epping, Melbourne, VIC, Australia, Victoria` with `+61 433 300 390` and `info@damangroup.com.au`.
- Form fields: name, email, mobile, message.
- Edge exposes an embedded `about:blank` frame and a visible `htmlcodex.com/contact-form` reference in the form area. Delivery, consent, anti-spam controls, privacy disclosures and failure handling were not verified. Do not reuse this implementation.

## Technical and experience audit

### Observed stack (home)

- **Styles:** Google Fonts (Heebo/Inter), Font Awesome, Bootstrap Icons, Animate.css, Bootstrap, Owl Carousel and a site stylesheet.
- **Scripts:** Bootstrap bundle, jQuery 3.4.1, WOW, jQuery Easing, Owl Carousel, Waypoints and a site script.
- **Media:** 21 discovered image requests on the rendered home page.
- **Direct TLS client check:** PowerShell rejected the certificate chain as `NotTimeValid` during non-browser retrieval. Edge rendered the page; validate the certificate chain and monitoring from the hosting account before production changes.

### Defensible UX findings

| Priority | Finding | Rebuild response |
| --- | --- | --- |
| Critical | Conflicting customer address across live pages | Show only Epping/Melbourne until owner confirms a public address. |
| Critical | Enquiry delivery is not proven; third-party form reference is visible | Use `tel:`/`mailto:` in the static concept; add a tested server-side endpoint before a web form. |
| High | Gallery taxonomy differs from service navigation | Maintain a confirmed-service model and a separate evidence/asset register. |
| High | Repeated testimonials have no linked review provenance | Do not migrate reviews or star ratings. |
| High | Wide client-side legacy stack and third-party dependencies | Rebuild uses Vite/React, no jQuery/carousel/icon CDN dependency. |
| Medium | Copy has grammatical inconsistencies and broad unsubstantiated claims | Replace with short original language rooted in verified categories only. |
| Medium | Service cards route back to the same page or anchors | Rebuild uses intentional in-page navigation and direct contact actions. |
| Medium | Image quality/provenance is unclear | Rebuild uses project-original generated imagery and keeps legacy files out of public output. |

## Rebirth decisions informed by research

- Use editorial serif display type plus restrained utility sans, not a generic trade-template visual language.
- Let a visitor begin with an outcome (“soft light”, “private retreat”, “open air”) before seeing categories; this adds a useful choice without claiming product specifications.
- Preserve a compact collection and a clear three-stage process instead of stacking repeated promotional cards.
- Avoid competitor-derived claims such as automation, smart-home integrations, thermal ratings, price, lead time, warranty, product material or service-area promises until Daman supplies substantiation.
- The material study is original art direction, not a claim that every pictured material is currently stocked.

## External context used for direction, not copied

- [Koko Blinds](https://kokoblinds.com.au/) illustrates current Melbourne-category language around sheers, blinds and shutters.
- [Lifestyle Curtains](https://www.lifestylecurtains.com.au/) demonstrates a concise measured-to-installed narrative.
- [Sway Curtains](https://www.swaycurtains.com.au/) demonstrates scannable service/process information architecture.
- [Creative Bloq’s 2026 typography review](https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026) supports the direction toward expressive, character-led typography; no third-party design, copy or assets were reused.

## Antigravity comparison

- The existing `daman_rebirth` workspace was inspected read-only and remains untouched.
- It has an existing commit (`5ef1870`) plus uncommitted `index.html` and asset changes.
- `http://localhost:5173` returned `ERR_CONNECTION_REFUSED` in Edge on 10 October 2026. It is not a functioning QA target at capture time.
- The isolated Codex build lives in `daman_rebirth_codex`; it is the only directory changed by this work.

## Non-public asset capture

- An asset inventory and private local reference bundle was created from the visibly rendered home page on 10 October 2026: 28 image/stylesheet files downloaded, 0 failures.
- Local capture directory: `C:\Users\gawar\AppData\Local\Temp\browser-use\assets\291f5973-0e39-4296-aaf2-53b5d8f51358`.
- It is intentionally excluded from Git and the new public website. The machine-readable URL inventory is stored in `docs/live-home-assets-2026-10-10.json`.
