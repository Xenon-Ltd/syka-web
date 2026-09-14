# Syka Website Design Guide

This file is the implementation-level design reference for the Syka marketing website. It translates the current Figma direction into practical rules for future UI work.

## Source of truth

- Figma file: [Syka Website Pages](https://www.figma.com/design/jA4OMgKDLJ6bkyT3P9Gw2n/Syka-Website-Pages--Copy-?node-id=0-1&p=f&t=QuyA4eAltyXxBPRb-0)
- The supplied desktop designs use a 1512px canvas.
- The primary content width is 1220px, centered on the page.
- Product pages are selected by query parameter and can be entered from `/` or `/business`.
- Images and illustrations may be approximated during layout work, but their containers, background colors, aspect ratios, and spacing must remain accurate.

## Brand direction

Syka should feel calm, credible, modern, and infrastructure-led. Use generous whitespace, strong editorial headings, restrained rounded surfaces, and deep purple/blue accents. Avoid adding gradients, decorative effects, or extra sections unless the design explicitly calls for them.

## Color tokens

Use existing project tokens where available. These are the key reference colors:

| Use                        | Color                                          |
| -------------------------- | ---------------------------------------------- |
| Deep ink / primary heading | `#25205c`                                      |
| Body text                  | `#3d4756`                                      |
| Muted text                 | `#737b87`                                      |
| Primary blue               | `#1377bc`                                      |
| Bright cyan accent         | `#008edb`                                      |
| Cream surface              | `#fcfbf1`                                      |
| Light blue surface         | `#e4f4fb`                                      |
| Purple CTA surface         | Use the existing marketing CTA token/component |
| White                      | `#ffffff`                                      |

Do not introduce a near-duplicate color for a role that already has a token.

## Typography

- Lato is the primary marketing font.
- DM Sans is used where the existing implementation already assigns it.
- Poppins is reserved for the documented Business/institution-heading exception.
- Main desktop headings: 62px with approximately 72px line height; use bold weight.
- Product feature headings: 62px with approximately 72px line height.
- Supporting section headings: 40px–62px depending on hierarchy; do not reduce a Figma 62px heading to 40px without a responsive reason.
- Body copy: usually 20px with 28px–31px line height.
- Feature point copy: usually 18px with approximately 24px line height.
- Eyebrows: 18px, regular weight, approximately 22px line height, uppercase where shown.
- FAQ questions: 30px medium weight.
- FAQ answers: 20px body text.
- CTA labels: 14px semibold, with 48px button height and 8px radius.

Always verify the font is applied at the `html`/page scope before adjusting widths or line breaks. Typography changes affect the entire page geometry.

## Layout and spacing

- Center desktop content in a 1220px container.
- Product feature rows use unequal columns: 532px text + 80px gap + 608px visual/container.
- Keep major section transitions close to the 150px rhythm used in Figma.
- Keep product feature-row transitions close to 100px.
- Use 32px border radii for large cards and partner strips where specified.
- Use 8px button radii unless a component's design explicitly requires another value.
- Prefer fixed design dimensions at desktop breakpoints when the Figma frame has a defined height. Avoid `vh` sizing for hero sections unless it is required for responsive behavior.
- The Personal hero is a deliberate narrower layout; do not force it into the standard 1220px product grid.

## Page composition

The landing pages and product pages are separate compositions.

- Personal landing page: hero, value proposition, toolkit, stability/security, workflow/use cases, testimonials, countries, CTA, FAQ, footer.
- Business landing page: business hero, solutions/institution cards, platform rows, pricing, countries, CTA, FAQ, footer.
- Product pages: product hero, page-specific feature/use-case sections, optional testimonials/countries according to Figma, CTA, FAQ, footer.
- Product pages must not append unrelated Personal or Business landing sections after their own FAQ.
- Payments and Treasury each have one countries section. Virtual Account, Virtual Card, and Invoicing do not.

## Component rules

- Reuse shared components for headers, footers, heroes, CTA panels, FAQ, testimonials, country lists, and feature rows.
- Prefer semantic HTML: headings in order, real links for navigation, buttons only for actions, and native disclosure behavior for FAQs.
- Preserve the current responsive behavior and accessibility when tuning desktop fidelity.
- Keep product hero variants explicit. The Virtual Card and Invoicing heroes use the cream treatment; standard product heroes do not.
- Keep layout boxes for excluded imagery so removing or replacing an image does not change surrounding geometry.
- Do not invent copy to fill an unresolved design placeholder. Flag the content decision instead.

## Known intentional exceptions / pending decisions

These should not be changed casually during visual cleanup:

- Business uses “Corporates & Treasury Teams” for the fourth institution audience even though the supplied Figma repeats a Rural Banks placeholder.
- Treasury currently keeps one forecasting row pending confirmation of whether the repeated Figma row is intentional.
- Security bullets and testimonial attribution need approved content decisions before being treated as final.
- Product CTA wiring and company/legal footer destinations are separate functional-completion tasks, not visual-only changes.

## Responsive behavior

- Desktop reference: 1512px canvas, 1220px content.
- At tablet and mobile widths, stack two-column feature rows rather than allowing text to become unreadably narrow.
- Preserve heading hierarchy while reducing size through existing responsive classes.
- Keep CTA buttons comfortably tappable and prevent horizontal overflow in pricing tables, carousels, and country pills.
- Validate mobile separately; desktop fidelity does not certify mobile fidelity.

## Visual QA checklist

Before calling a page complete:

1. Confirm the intended font and weight are computed in the browser.
2. Render at the Figma desktop width with animations/reveal states settled.
3. Check header position, container edges, hero height, heading wraps, and CTA dimensions.
4. Check every major section's top/bottom rhythm and the 532/80/608 product row geometry.
5. Confirm section order and that no parent landing-page content leaks into a product page.
6. Compare colors, radii, borders, and surface backgrounds while ignoring excluded image artwork.
7. Check mobile and tablet overflow after desktop adjustments.
8. Run `npm run lint`, `npx tsc --noEmit`, and `git diff --check`.

For the current reconciliation status and unresolved design questions, see [FIGMA-AUDIT.md](./FIGMA-AUDIT.md).
