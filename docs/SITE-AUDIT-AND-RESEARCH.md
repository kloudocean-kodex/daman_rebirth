# Daman Group website audit and rebirth research

Audit snapshot: 9–10 October 2026. This record separates verified public facts from recommendations and avoids treating indexed content as proof of broader claims. The complete direct-browser audit and asset inventory are in [AUDIT-2026-10-10-LIVE.md](AUDIT-2026-10-10-LIVE.md).

## Verified public business record

- **Entity:** DAMAN GROUP PTY LTD; ABN **84 634 126 015**; ACN **634 126 015**.
- **Status:** ABN active and GST registration active from 14 June 2019; Australian private company; main business location reported as VIC 3750.
- **Official website contact:** `+61 433 300 390`, `info@damangroup.com.au`, and Epping, Melbourne, Victoria.
- **Public offer:** blinds, sheer curtains, curtains, plantation shutters, fly screens, security doors, free in-home measure/quote, and free advice.
- **Property types stated:** apartment, villa, home, office, building, townhouse, shop and garage.

## Source ledger

| Source | Used for | Caveat |
| --- | --- | --- |
| [Daman Group home](https://damangroup.com.au/index.html) | services, broad proposition, property types, contact footer | Direct crawl timed out; indexed public-page text was used as a secondary capture. Recheck before launch. |
| [Daman Group about](https://damangroup.com.au/about.html) | stated approach and design philosophy | Indexed text only; the new copy is original. |
| [Daman Group contact](https://damangroup.com.au/contact.html) | phone/email/address cross-check | Two street addresses appear across the live site. |
| [Australian Business Register](https://abr.business.gov.au/ABN/View?id=84634126015) | legal entity, ABN/ACN, status, GST, broad location | Official public register; recheck on launch. |

## Current-site inventory captured

- Discoverable pages: `index.html`, `about.html`, `Gallery.html`, `contact.html`.
- Home sections: hero, property-type list, services, “why choose” copy, testimonials, contact/footer.
- Services: blinds, sheer curtains, fly screens, plantation shutters, security doors, curtains.
- About themes: consultation, custom concept, finishing touches; human-centred design, sustainability, innovation/creativity, collaboration/transparency.
- Contact fields: name, email, mobile/subject and message.
- Gallery labels: Blinds, Curtains, Sheer Curtains, Plantation Shutter, Flyscreen, Security Doors and Roller Curtains. Roller Curtains appear in the gallery only, so they remain a confirmation-required category.

## Risks and content policy

- **Address conflict:** footer has `134 Gateway Blvd, Epping`; contact content has `9A Dilop Drive, Epping`. The rebuild intentionally shows only “Epping, Melbourne, Victoria” pending owner confirmation.
- **Brand ambiguity:** historical ABR data listed “DAMAN BLINDS AND HOME DECOR” to 20 March 2025. The concept uses the current legal entity/website name, “Daman Group”.
- **Claims hygiene:** do not publish unsupported service coverage, product warranties, lead times, sustainability credentials, automation capability, testimonials, project photography or compliance claims without owner evidence.
- **Lead capture:** a static site must not claim enquiry delivery. This build exposes direct phone/email actions until a tested server-side endpoint exists.

## Rebirth strategy

- **Positioning:** a sharper focus on made-to-measure window furnishings and protective home detail; a restrained premium voice without invented heritage, awards or project claims.
- **IA:** atmosphere-led hero, compact service collection, three-stage client approach, direct contact actions.
- **Typography:** Playfair Display (editorial display), Manrope (utility/body), DM Mono (labels).
- **System:** warm limestone `#f0ede6`, charcoal `#201f1c`, muted bronze `#b49769`; responsive layout, reduced-motion support and semantic landmarks.

## Asset register

| Asset | Origin | Release status |
| --- | --- | --- |
| `public/assets/daman-hero-original.png` | Original image generated for this project on 9 Oct 2026 | Approved for the concept hero and curtain card |
| `public/assets/daman-shutters-original.png` | Original image generated for this project on 9 Oct 2026 | Approved for shutter and approach sections |
| `public/assets/daman-security-original.png` | Original image generated for this project on 9 Oct 2026 | Approved for security-door card |
| `public/assets/daman-blinds-original.png` | Original image generated for this project on 9 Oct 2026 | Approved for blind card |
| `public/assets/daman-flyscreen-original.png` | Original image generated for this project on 9 Oct 2026 | Approved for fly-screen card |
| `public/assets/daman-material-study-original.png` | Original image generated for this project on 10 Oct 2026 | Approved for original material-study section |
| existing `blinds.jpg`, `doors.jpg`, `hero.jpg`, `shutters.jpg` | Existing remote-repository files; provenance unverified | Not used by this rebuild; preserve or remove only after the repository owner confirms they are no longer needed. |

## Launch gates

- [ ] Confirm customer-facing address, service area, legal footer, privacy policy, social accounts and ABN display.
- [ ] Supply approved product specifications, warranties, terms and compliance evidence before publishing related claims.
- [x] Rebuild visuals use five original project-generated assets; maintain a provenance/approval log before release.
- [ ] Implement enquiry delivery (Pages Function/CRM), server-side validation, spam control, consent, retry/DLQ and delivery monitoring.
- [ ] Complete real-device browser QA, keyboard/screen-reader checks, image optimisation, SEO metadata, sitemap/robots and production-domain verification.
