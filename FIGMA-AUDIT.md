# Syka website — Figma reconciliation audit

Reviewed 13 September 2026 against the current working tree, including uncommitted changes.

**Result: none of the seven pages is ready for pixel-perfect sign-off.** Most of the intended sections exist, and the five product pages preserve much of their design copy. The main problems are page composition, typography, content widths, vertical spacing, shared CTA/FAQ styling, and several copy differences.

This is a design-specification and source-code audit, supported by local HTTP/HTML checks. Figma context was retrieved for all seven supplied frames, with smaller nodes inspected for detailed styles. Figma screenshots were also inspected for Business, Virtual Account, and Invoicing. The final browser visual pass remains incomplete because the computer-use surface was unavailable during verification. Consequently, there are **no measured browser bounding boxes, screenshot-difference percentages, or mobile pixel-perfect claims** in this report. Dimensions described as “code” are CSS specifications or calculations from them, not observed browser measurements.

Images, illustration details, and decorative asset fidelity are excluded. Their container dimensions and background colors remain relevant because they affect layout. The reconciliation pass changed application source; this report records the original findings and current verification status.

## Page coverage

All supplied frames use a 1512px desktop canvas. Product pages are query-parameter views, accessible under both `/` and `/business`.

| Page / Figma source | Implementation | What is good | What needs reconciliation |
| --- | --- | --- | --- |
| [Business](https://www.figma.com/design/jA4OMgKDLJ6bkyT3P9Gw2n?node-id=4817-14602) | `/business` | Major visible sections are present and in the right order; all four platform rows; pricing amounts and features match. Hidden legacy sections are appropriately absent. | Hero leading/colors, Solutions title scale, institution cards, pricing geometry, missing countries, shared CTA/FAQ/footer. |
| [Personal](https://www.figma.com/design/jA4OMgKDLJ6bkyT3P9Gw2n?node-id=4780-2884) | `/` | Major sections appear in the intended order; four toolkit offerings, three stability rows, workflow use cases, testimonials, countries, CTA and FAQ exist. | Hero and value-proposition copy, toolkit copy/scale, stability typography and bullets, testimonial attribution, missing countries, shared CTA/FAQ/footer. |
| [Virtual Account](https://www.figma.com/design/jA4OMgKDLJ6bkyT3P9Gw2n?node-id=7881-10568) | `/?product=virtual-account`, `/business?product=virtual-account` | Hero copy/CTA label and principal feature, onboarding, use-case, testimonial, CTA and FAQ sections exist. Local section order broadly matches. | Shared hero geometry, feature typography and column widths; unrelated sections appear after the FAQ on both route variants. |
| [Virtual Card](https://www.figma.com/design/jA4OMgKDLJ6bkyT3P9Gw2n?node-id=7732-17134) | `?product=virtual-card` on both bases | Hero copy and all three feature-card descriptions match; international-transaction section, use case, testimonials, CTA and FAQ exist. Card fill/border/radius and title size are close to specification. | Missing cream hero background; feature-card spacing/height differences; shared typography; extra parent-route sections. |
| [Invoicing](https://www.figma.com/design/jA4OMgKDLJ6bkyT3P9Gw2n?node-id=7916-8044) | `?product=invoicing` on both bases | Hero, detail/reminder sections, collection walkthrough, use case, testimonials, CTA and questions closely follow the design copy and order. | Viewport-dependent hero height; feature typography/columns; four empty FAQ answers; extra parent-route sections. |
| [Syka Payments](https://www.figma.com/design/jA4OMgKDLJ6bkyT3P9Gw2n?node-id=7732-18644) | `?product=payments` on both bases | Hero, three benefit cards, two illustrated process rows, use case, countries, CTA and FAQ exist; process copy broadly matches. | Testimonials and use case are reversed; countries duplicated; shared hero/feature typography; extra personal sections when opened under `/`. |
| [Treasury Management](https://www.figma.com/design/jA4OMgKDLJ6bkyT3P9Gw2n?node-id=7950-10238) | `?product=treasury-management` on both bases | Hero, conversion, forecasting, yield explanation, use case, testimonials, countries, CTA and FAQ exist. | Figma has an additional repeated forecasting row; countries duplicated; shared hero/feature typography; extra personal sections under `/`. |

## Highest-priority shared fixes

### S1 — Product pages inherit unrelated content (P1, confirmed by HTML)

[app/page.tsx:52](app/page.tsx) unconditionally appends `BuiltOnStability`, `SolutionsThatFit`, `SocialProof`, and `CountriesSupported` after the selected product component, which already includes its own CTA and FAQ. These four sections are not part of the supplied product-page endings.

[app/business/page.tsx:50](app/business/page.tsx) unconditionally appends `CountriesSupported` after every product FAQ. Virtual Account, Virtual Card and Invoicing have no countries section in their Figma frames. Payments and Treasury already include one before their CTA, so the parent creates a second one after their FAQ.

Acceptance target: each product renders its own intended section sequence, followed directly by the footer. Payments and Treasury have exactly one countries section. The other three products have none. Verify both entry routes, since existing header/footer/toolkit links expose both.

### S2 — Font application needs correction before spacing work (P1, CSS evidence)

[app/layout.tsx](app/layout.tsx) places `lato.variable` on the **body**, while generated Tailwind preflight applies the default `font-family` to **html**. [app/globals.css:10](app/globals.css) maps that default to `--font-lato`, but the variable is not populated with the font on html. The generated stylesheet contains a self-reference at root (`--font-lato: var(--font-lato)`) and no body `font-family` declaration or applied `font-sans` class.

This indicates the normal page text inherits the system fallback instead of Lato. It is a high-confidence CSS diagnosis; computed font inspection remains outstanding. Loading font files alone does not apply them.

Figma uses Lato Bold for the main headings, while much of the implementation requests `font-semibold` (600). [assets/font/index.ts](assets/font/index.ts) only loads Lato 300/400/700/900; Figma also specifies Medium/SemiBold in smaller text. Some Business institution headings use Poppins SemiBold in Figma, which is not loaded here.

Acceptance target: apply the intended font at the correct scope, confirm the computed font and actual weights, then compare line breaks. Decide whether Figma's Poppins exceptions are intentional before standardizing them.

### S3 — Content widths and header position differ (P1)

The usual Figma body/header width is 1220px. Many components use `max-w-[1232px]` with 24px horizontal padding on each side, yielding **1184px usable width**, 36px narrower. On a 1512px canvas, inner content begins at x=164 rather than x=146. Product `CONTENT` removes padding at XL and does reach 1220px, producing inconsistent alignment between body, CTA, FAQ and header.

[components/layout/header.tsx:162](components/layout/header.tsx) uses 20px vertical margins; Figma places the header at y=62 on most frames, and y=47 on Virtual Card. Its switch uses 96px segments with 14px labels versus approximately 81/80px segments with 16px labels in Figma. The implemented logo height is 44px versus a 50px design box. Figma's header CTA is 183×48px; code preserves 48px height but sizes width from text and padding.

Acceptance target: consistent design-specific content bounds and header metrics at 1512px. Preserve the actual exceptions: the Personal hero is a 1120px frame starting at x=196; several product body frames start at x=138.

### S4 — Shared product hero is too wide and depends on viewport height (P1)

[components/dropdown-pages/product-hero-shell.tsx:30](components/dropdown-pages/product-hero-shell.tsx) uses a 1440px inner grid, a 112px XL gap and a 0.9:1.1 column split. At 1512px, this starts at x=36 and gives the text column about 597.6px. Account/Payments/Treasury design hero text begins around x=146 with a 547px title and 507px paragraph. The code paragraph can expand to 580px. Virtual Card's paragraph is a separate 547px design variant.

The shell sets `95vh` minimum height on both the section and inner grid; section padding adds more height. Figma uses 775px hero frames for Account/Payments/Treasury and a different 721px hero/851px background arrangement for Card. Invoicing separately uses `95vh` too.

The product title size is correctly 62px and its 1.14 leading is close to Figma's 70.6px, but weight, tracking and width still differ. Eyebrows use semibold, 1.5 leading and 0.1em tracking rather than Figma's regular 18px/22px treatment.

Acceptance target: separate hero variants with reference widths, fixed desktop spacing and intended background extent. Then validate responsive behavior independently.

### S5 — Product feature headings and columns are substantially different (P1)

Account, Invoicing, Payments and Treasury use 52px/57.2px section titles and 42px/48.3px feature titles. Inspected Figma equivalents use **62px/72px**. Feature descriptions are generally **24px/26px** in Figma versus 20px/28px in code. Introductory descriptions at 20px/31px are much closer.

Examples: [virtual-account.tsx:122](components/dropdown-pages/virtual-account.tsx), [invoicing.tsx:110](components/dropdown-pages/invoicing.tsx), [payments.tsx:169](components/dropdown-pages/payments.tsx), [treasury-management.tsx:129](components/dropdown-pages/treasury-management.tsx). Design references include `7916:8125`, `7916:8131`, `7857:14470`, `7732:18960`, and `7963:17333`.

The implementation’s equal two-column grids produce 570px columns inside 1220px after an 80px gap. Figma repeatedly specifies 532px text and 608px illustration boxes, which exactly fit the 1220px parent when combined with the 80px gap. The reconciliation should use those unequal columns rather than the current equal split.

[shared.tsx](components/dropdown-pages/shared.tsx) gets the 40px badge container and 24px icon size right. But its badge-to-text gap is 16px rather than 24px, and point text is 18px/29.25px rather than 18px/24px. Glyph fidelity is excluded from this audit.

### S6 — Vertical rhythm is not the Figma spacing system (P1)

Figma page stacks generally use 150px between major sections and 100px between product feature rows. Code commonly uses `py-32` (128px top and bottom) on consecutive sections, producing a 256px content-to-content gap, and `mt-24` (96px) between feature rows. Other boundaries, such as testimonial-to-CTA, use different spacing again.

This cannot be fixed by making every section taller or shorter by the same amount. Define section boundaries and apply the intended gap once. Avoid using the total Figma frame height as the sole acceptance test because some frames contain overflowing or detached layers.

### S7 — CTA buttons, closing panels and FAQs need their own tokens (P1)

| Element | Figma specification | Current code |
| --- | --- | --- |
| Hero/product CTA face | Typically 48px high, 14px label, 24px horizontal padding, 8px radius; some instances have a glow below the face | 18px desktop label, 32px horizontal + 16px vertical padding, generally about 60px high; glow absent |
| Personal closing CTA title | 62px / 70px | 40px / 43.2px |
| Closing panel width | 1220px | 1184px usable width |
| Closing panel height | 555px on Personal/Business; 516px on products | Content-driven panel with 64px desktop vertical padding |
| FAQ heading | 62px / 72px | 40px / 43.2px |
| FAQ question | 30px, Lato Medium, `#25205c` | 18px, semibold, `#51488c` |
| FAQ answer | 20px, `#3d4756` | 18px, `#737b87` |

Sources: [shared.tsx](components/dropdown-pages/shared.tsx), [lib/business-styles.ts](lib/business-styles.ts), [marketing-cta.tsx](components/marketing-cta.tsx), [frequently-asked-questions.tsx:40](components/frequently-asked-questions.tsx); Figma `7950:10267`, `7963:17446`, `7963:17502`.

Good: CTA panels have the intended broad purple treatment and store badges. FAQ uses native disclosure elements and initially opens the second item, consistent with the inspected design state. These are structure/state matches, not a visual sign-off.

### S8 — Country coverage and footer content differ (P1/P2)

[components/countries-supported.tsx:41](components/countries-supported.tsx) has 18 countries, whereas both landing-page Figma country sections have 20: **Australia and Canada are missing**. Code also changes “Ghana” to “Ghana (GHS)”. Compact desktop pill labels are 14px versus 16px in Figma. Figma's country block is about 1240px wide with a 61px title-to-pills gap; code uses narrower bounds and 40px. The product `AvailableCountries` array already contains all 20, but uses a different pill implementation.

[components/layout/site-footer.tsx](components/layout/site-footer.tsx) preserves the broad four-column layout and disclaimer. However, link text is 14px versus 18px design labels, copyright copy differs from “2026 Syka Ltd.”, and the product/business strapline differs from “Syka, The Smarter Bridge Between Borders”. “Get Help” is replaced with “API Documentation”. Many Company/Transparency items render as plain spans, so navigation is incomplete. Footer branding differs on the personal route; treat that as a branding decision even though image fidelity is otherwise excluded.

### S9 — Partner strips and product testimonials still differ (P2)

[companies-marquee.tsx](components/business/companies-marquee.tsx) is a static four-column strip capped at 1080px with 16px corners and approximately 96px desktop height. Figma specifies 1123×100px with 32px corners. Its 80px top margin is also smaller than the typical 150px gap in the product-page stack. Partner logo identity and artwork are excluded, but these container metrics are not.

[customer-testimonials.tsx](components/customer-testimonials.tsx) correctly uses 419px desktop cards and 32px padding. Figma's product cards are 383px tall with 80px flag containers; code uses content-driven heights and 64px flag containers. Quote leading is 32.5px versus 28px in the reference. The code track starts within the centered 1220px container (x=146 at 1512px), while the inspected design track starts at x=174. These alter card rhythm and the visible portion of the trailing card even when flag artwork is ignored.

## Page-specific findings

### Business

**Good:** The hero's main message and explanatory copy align. Solutions, institution cards, four platform rows, pricing, countries, final CTA, FAQ and footer are all present. Pricing matches $1,200/month versus $3,500/month, no setup fee versus $5,000 one-time, 0.95% transaction fee, unlimited merchants, included KYC/AML and the two support tiers. The hidden legacy “Built for African Reality” and testimonial blocks need not be restored.

**B1 (P1):** [business-hero.tsx:62](components/business/business-hero.tsx) specifies 62px/63.24px for the main title versus Figma 62px/80.6px. Description is 20px/34px, max 640px, versus 18px/29px, width 547px. Main text uses `#121733` instead of `#3d4756`; highlighted text uses `#008edb` instead of `#1377bc`. These differences affect wrapping and hero height even with images ignored.

**B2 (P1):** [solutions-and-platform.tsx:77](components/business/solutions-and-platform.tsx) sets the large Solutions title to 40px/43.2px within 860px. Figma `7505:19122` is 62px/80.6px within 1028px. Institution card headings are 24px rather than 32px; body text is 18px rather than 24px/36px. Cards therefore have materially different text density and height.

**B3 (design decision):** The fourth institution is “Corporates & Treasury Teams” in code but repeats “Rural Banks & Credit Unions” in Figma `7881:9976`. The duplicate may be a design placeholder. Resolve the intended content rather than automatically replacing the code.

**B4 (P2):** [platform-showcase.tsx](components/business/platform-showcase.tsx) preserves the four alternating rows, but uses variable content heights and 32px row gaps versus four 470px design rows separated by 40px. Its text columns, title/body leading and colors need adjustment. The first Figma row shows both a Get Started action and a Book a Demo action; code exposes only Book a Demo.

**B5 (P2):** [pricing-comparison.tsx](components/business/pricing-comparison.tsx) caps the comparison at 960px and uses 18px body text. Figma uses wider individual column frames (333px for the first two) with 16px/20.8px cell text, and about 85px body rows rather than the CSS's 80px minimum row heights. The semantic table and highlighted White-Label column are good foundations; reconcile dimensions without losing accessibility or horizontal scrolling.

### Personal

**Good:** The section inventory and broad alternating layouts are in place. “End-to-End Security” retains the intended three-step description. The workflow component supplies all three audiences and provides a mobile stack.

**P1 (P1):** [hero.tsx:59](components/hero.tsx) is 56px/61.6px versus Figma 62px/80.6px, with a narrower text column, different colors, and different description. Figma describes payment infrastructure for African entrepreneurs using stablecoins; code says “Go beyond transfers…” and introduces virtual accounts/cards. Reconcile the approved copy before tuning line breaks.

**P2 (P2):** [get-a-personal.tsx](components/get-a-personal.tsx) rewrites the value-proposition paragraph. Figma begins “Built for African entrepreneurs facing systemic payment barriers”; code uses a generic modern-platform statement. This is a content deviation, not just punctuation.

**P3 (P1):** [more-than-transfers.tsx](components/more-than-transfers.tsx) has the four correct offering titles but rewrites two descriptions: Get Paid Faster omits links/API/USDT/USDC/cards, and Local Presence substitutes dedicated account details for holding stablecoins/conversion/multi-currency balances. Card headings use the 24px compact style versus Figma 32px/44.8px; body text is 18px versus 20px/28px. The four-card arrangement is recognizable, but its sizing does not reproduce Figma's 1486px card group.

**P4 (P1):** [built-on-stability.tsx:57](components/built-on-stability.tsx) renders row headings at 32px versus Figma 62px/72px. Description text is 18px versus 24px. Bullet badges are 20px versus 40px. Text and bullet lists have been rewritten: Figma repeats payment-arrival and invoice-matching bullets across all three rows. That repeated copy looks like a placeholder and should be resolved with the designer; it is still a literal mismatch.

**P5 (P2):** [solutions-that-fit.tsx](components/solutions-that-fit.tsx) sets the desktop accordion to 360px high versus the 375px design instance. It also splits the section title into separate elements with extra spacing and different colors/leading. Check the default expanded state before comparing its animated alternatives.

**P6 (P2, content decision):** [social-proof.tsx](components/social-proof.tsx) uses Esi K., Obi J., Liam W. and Ama T. rather than the repeated Alex C./Tech Startup Founder attribution in Figma; the fourth quote also changes. Card text size, flags' container sizes, card widths and colors differ. Verify approved testimonials instead of assuming either source contains final content.

### Virtual Account

**Good:** Hero text, CTA label and main section inventory are present. The two feature rows, local-account onboarding section, cross-border use case, testimonials and closing CTA broadly follow Figma. Unlike the default FAQ data, this page supplies answers for all five questions.

**VA1 (P1):** Reconcile the shared hero, feature-title scale, point spacing, and body columns described in S4/S5. The “Dedicated…” and “Multiple currencies…” titles are 42px versus 62px design titles. The shared 1220px body token is a useful starting point.

**VA2 (P1):** Remove parent-route content after the FAQ. The design goes directly to the footer and contains no countries block.

### Virtual Card

**Good:** Three benefit-card titles and descriptions match the reference. Their 32px title size, blue fill `#e4f4fb`, 0.5px border and 32px radius are substantially aligned. All principal content blocks exist.

**VC1 (P1):** Figma's hero has a full-width cream `#fcfbf1` background extending behind the header. The shared hero shell used by [virtual-card.tsx](components/dropdown-pages/virtual-card.tsx) has no corresponding background. This is a background/layout omission, not an excluded illustration difference.

**VC2 (P2):** Feature-card padding is 36px versus 35px; body leading is 29.25px versus 26px; the heading adds an extra 8px top margin on top of the stack gap. Figma's middle card is explicitly 284px tall, while code has content-driven equal-height cards. Recheck the Figma card's long copy for clipping before adopting that height.

**VC3 (design decision):** Figma's use-case image and text bounds overlap in the supplied frame (`7881:9638`, `7881:9639`). Code uses a conventional separate two-column row. Resolve the intended geometry instead of treating the overlap as a mandatory implementation target.

### Invoicing

**Good:** Much of the page-specific text matches, including the second FAQ's visible partial-payment answer. The cream hero treatment and intentionally unpopulated right-hand visual area are consistent with the inspected reference.

**I1 (P1):** [invoicing.tsx:85](components/dropdown-pages/invoicing.tsx) uses viewport-based height instead of the design's fixed desktop hero/background arrangement. Main hero text size is close; weight, tracking, eyebrow metrics and button sizing are not.

**I2 (P1):** Section headings are 52px and feature headings 42px versus the reference's 62px/72px. The typography mismatch is especially visible in “Invoicing and payment collection in one step”, “Your details, already attached”, and “Automated Reminders”.

**I3 (completeness):** Four FAQ answers are empty. Those answers are collapsed in the supplied design, so they cannot be called missing visible design text, but the disclosure controls are unfinished interactions.

### Syka Payments

**Good:** Three benefit cards and both process rows preserve the principal copy. The single countries section inside the product component is appropriate. Its title says “three simple steps”, but Figma also contains only two illustrated rows; do not invent a third row without a content decision.

**PAY1 (P1):** Figma orders testimonials (`7881:9648`, body y=3445) **before** “Built for how you pay people” (`7863:14673`, y=4109). [payments.tsx](components/dropdown-pages/payments.tsx) places the use case before `CustomerTestimonials` at line 236. Swap the sequence if the supplied frame is authoritative.

**PAY2 (P1):** Countries are rendered twice on both route bases. Under `/`, additional personal sections also follow the product FAQ. See S1.

**PAY3 (P1):** Correct the shared hero and feature typography. For example, “Enter the details” is 42px/48.3px rather than 62px/72px; its paragraph is 20px/28px rather than 24px/26px.

### Treasury Management

**Good:** Principal hero, conversion and yield copy is present. “How Treasury Management works” retains the four key bullets, including the no-guaranteed-return and withdrawal text from the design. This audit checks copy correspondence, not the validity of product claims.

**T1 (design decision, high impact):** Figma contains three feature rows: conversion (`7950:10322`), forecasting (`7950:10345`), and a second forecasting row (`7963:17300`). Code contains two and uses the second forecasting variant's withdrawal wording. Literal reconciliation would add roughly a full section's height, but the repeated heading/paragraph strongly suggests unfinished design content. Confirm whether to keep one or two forecasting rows in the source of truth.

**T2 (P1):** Countries appear twice. Remove the parent copy and retain the product copy before the CTA.

**T3 (P1/P2):** Shared typography and column issues apply. The use-case description is allowed 380px at 20px in code, whereas its Figma text box is only 305px wide; this changes wrapping and alignment even if the image is ignored.

## Functional completeness observations

- Product CTA buttons in the hero shell and feature sections are plain `<button>` elements with no click handler, link, or enclosing submission form. Labels render, but “Create a Virtual Account”, “Create Syka Card”, “Create Invoice” and product “Get started with SYKA” actions do not initiate a flow. Landing-page `BusinessAction` links provide a reusable starting point.
- Personal, Business and Invoicing each expose four empty FAQ answers. Collapsed Figma states do not provide the missing answer copy. Obtain approved answers or decide on the intended behavior.
- Company/legal footer entries without `href` are non-interactive text. These should not be counted as completed destinations.
- Responsive classes, mobile navigation, FAQ disclosure markup, pricing overflow and carousel handlers exist. Their browser behavior was not exercised, so none is an interaction or mobile visual pass.

## Current verification and remaining work

Local checks covered `/`, `/business`, and all five product queries under both bases (12 URLs). After reconciliation, all returned HTTP 200. Product pages no longer append landing-page sections; Account, Card and Invoicing show zero countries blocks, while Payments and Treasury show one. Payments now places testimonials before its use-case section. TypeScript (`npx tsc --noEmit`) and lint pass. The production build reached `next/font` and failed because this environment could not fetch Lato, DM Sans and Poppins from Google Fonts. HTTP success does not prove client-side visual or hydration correctness.

1. Render each page at 1512px with fonts loaded and reveal animations settled. Compare section-by-section, masking excluded imagery while preserving its layout boxes.
2. Tune any remaining browser-measured differences in shared hero, section spacing, CTA, FAQ, footer and testimonial geometry.
3. Reconcile approved content decisions: Treasury’s repeated forecast row, Business’s fourth audience card, security bullets and testimonial attribution.
4. Wire the product CTAs and complete approved FAQ/footer destinations if functional completion is required later.
5. Test mobile/tablet behavior; matching mobile Figma frames would be needed for mobile pixel-perfect certification.

The report identifies the remaining decisions, but **pixel-perfect approval remains pending rendered comparison after reconciliation**.
