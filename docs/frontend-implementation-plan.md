# sykabank.com — frontend implementation plan

15 October 2026. Replaces the earlier `FRONTEND-IMPROVEMENTS.md` backlog (11 October 2026, now removed). It records where each backlog item stands after the current uncommitted work, adds findings from a fresh review of the whole app, and orders the remaining work into phases for approval.

Baseline at the time of writing: `npm run lint` (0 errors, 3 warnings), `npx --no-install tsc --noEmit` (clean), `npm test` (38 passing), `npm run build` (succeeds, 41 routes).

Scope is unchanged from the original backlog: frontend only. No changes to backend endpoints, token issuance, mail, storage or hosting. Where a feature needs content or a destination that isn't approved yet, it stays absent or uses existing contact and recovery paths.

Legend: **Done**: implemented and checked in source. **Partial**: some of the item is implemented and the rest is listed. **Open**: not started. **Owner**: blocked on a content or product decision (see [Decisions needed](#decisions-needed)).

---

## 1. Status of the original backlog

### P0/P1 findings

| Item | Status | Evidence / what remains |
| --- | --- | --- |
| Hide the Next.js dev indicator | Done | `devIndicators: false` in `next.config.ts`. |
| Disabled primary signup buttons | Partial | Owner decision: personal signup stays disabled until the personal web app is hosted. The buttons still render as a greyed, unexplained `disabled` control (`BusinessAction` with no `href`). Needs honest availability wording (Phase 1). |
| Company placeholder links | Partial | Footer reads `companyLinks` and hides undefined entries. The **header** still hard-codes `href: "#"` for all five items (`components/layout/header.tsx:72-76`). |
| Closed mobile nav exposed to AT | Done | Panel is `inert` and `invisible` when closed. Focus moves to the close button on open and back to the menu button on close. Escape closes it. |
| "Start your company in minutes" wording | Done | Phrase removed. Registration now reads "Apply for a Syka merchant account". |
| Legal entity attribution | Partial | One `ENTITY_STATEMENT` is used on every footer, but it names **"Xenon Technology Inc."** while the copyright line and legal pages say **"Xenon Technologies Inc."** (`components/layout/site-footer.tsx:13` vs `:70`). |
| Cookie Preference Centre promise | Done | Policy §10.2 now points to browser settings. No tracking scripts are present, so no centre is needed. |
| Bounded upload/request recovery | Done | 20 s request timeout, 60 s upload stall timeout, cancel via `AbortSignal`, retry with the kept file, uploads aborted on unmount. |
| Protect tracking credentials | Partial | `?token=` is stripped from the registration URL, merchant pages send `referrer: no-referrer` and are `noindex`, and "Remove from this device" exists. Remaining: the status page path itself carries the token (`/business/merchant/application/[token]`). Start over doesn't abort in-flight uploads. |
| Sanitize displayed errors | Done | `userMessage()` maps every error to controlled copy, and the backend's text is never rendered. Covered by tests. |
| Optimize large animations | Partial | Lazy-load, pause off-screen, live reduced-motion and `.webp` posters are done. The JSON is still heavy: `invoicing-automated-reminders.json` 3.3 MB, `virtual-account-dedicated-details.json` 2.4 MB, `virtual-account-multi-currency.json` 2.0 MB. |
| Automated frontend coverage | Partial | Vitest is set up with 38 tests covering `lib/merchant-applications.ts` and `lib/merchant-registration.ts`. There are no component tests for the registration, status or recovery screens. |

### Error-message standard

| Item | Status |
| --- | --- |
| All nine standard messages | Done: `ERROR_MESSAGES` in `lib/merchant-applications.ts`. |
| Strip stack traces / raw provider text | Done |
| Preserve form data, field errors + accessible summary | Done: `FormAlert` lists invalid fields as buttons that focus each one. |
| Don't clear identity / duplicate-create on network loss | Done: create-on-timeout points to recovery, and submit-on-timeout re-reads status before offering a retry. |
| No unnecessary console output | Done: no `console.*` in app code. |
| Non-secret reference available for support | Done: reference shown with a Copy button. The token is never presented as a support code. |

### Home and business landing pages

| Item | Status | What remains |
| --- | --- | --- |
| Reduce personal hero top spacing | Needs visual check | `pt-10` in source. Confirm on a 768 px-tall laptop. |
| Personal vs business clarity | Partial | Both heroes still use the same "Get started for free" / "See How It Works" pair. |
| Specific CTAs | Partial | Business CTAs to `/business/merchant/registration` still say "Get started" or "Get started for free" (`business-hero.tsx:87`, `solutions-and-platform.tsx:117`, header). Should be "Apply for a merchant account". |
| Eligibility / locations / onboarding before start | Partial | Done inside the registration flow ("Before you start"). Not on the business landing page. |
| Standardise spacing, type, buttons | Open | Button radius, height and colour vary (`rounded-lg` vs `rounded-[14px]`, `#413787` vs `xenon-brand`). |
| Replace generic claims | Owner | See claims audit in §2. |
| Approved evidence for claims | Owner | See claims audit in §2. |
| Country support per product | Owner | 24-country list confirmed (see note in §2). Sending vs receiving per product not yet distinguished. |
| Every visible action works | Partial | Disabled personal CTAs and the disabled "View full docs" button remain. |

### Product and developer pages

| Item | Status | What remains |
| --- | --- | --- |
| Audience / capability / availability / pricing / next step per product | Open | Pages have capability copy only. |
| Dedicated product URLs | Open | Still `?product=` query params, with canonical set to `/business?product=…`. |
| Verify SDK names and code samples | Partial | SDK labelled "coming soon" and the sample is labelled "Preview". Step 2 still claims "Your key is generated instantly from the dashboard" and the card claims "Sandbox environment, full test coverage". These need confirmation. |
| Distinguish illustrative UI | Done | Product media is `aria-hidden` and non-interactive. |
| Static fallbacks, no delayed hidden content | Done | Posters, and `riseIn` keeps first-screen text visible without JS. |
| Pause off-screen / reduced motion live | Done | |
| Stable layout while media loads | Done | Fixed aspect boxes plus posters. |

### Application registration

| Item | Status | What remains |
| --- | --- | --- |
| Explain documents, steps, expectations upfront | Done | `RegistrationIntro`. |
| Show what's saved / how to resume | Done | Resume banner, tracking link card, emailed link. |
| Required/optional indicators match contract | Partial | All 8 fields are marked required. The API contract marks only 6 as required (`phone`, `target_audience` optional). This was a deliberate product choice, so confirm it (Decision D5). |
| Explain "Target audience type" | Done | Hint text added. |
| Recovery/help links throughout | Done | Top bar on every step. |
| Previews, replace, progress, rejection messages | Done | Preview only for files picked in this session; the API intentionally returns no download links. |
| Guard unsaved changes on internal nav | Done | Capture-phase link guard plus `beforeunload`. |
| Review & Submit complete, linked to edit | Done | |
| Confirm submission state, reference, next steps | Done | |
| Prevent duplicate submissions | Done | |
| Focus first invalid field without smooth scroll | Done | |

### Status and recovery

| Item | Status | What remains |
| --- | --- | --- |
| Refresh status + Last checked | Done | |
| Explain each status and who acts next | Partial | **Bug:** `nextStep()` returns "Our team is reviewing your application" for every non-editable application, including approved and rejected ones (`merchant-application-pages.tsx:61-70`). |
| Requested corrections navigable | Done | "Continue application" whenever `editable`. |
| Inspect/copy long references and filenames | Done | |
| Clear from this device | Done | |
| Recovery expiry, cooldown, old/new code | Done | Uses `expires_in_seconds` when returned, with a 60 s resend cooldown. |
| Invalid link / no storage always has a path | Done | |
| Guide approved applicants to merchant app | Partial | `/business/merchant/download` exists but nothing links to it. It should be linked from the status page once approved (blocked on D2/D3). |
| No stale data across tokens | Done | Status page keyed by token. |

### Header, footer, legal, shared UI

| Item | Status | What remains |
| --- | --- | --- |
| One source of truth for destinations | Partial | Header Company items (above). The support email is hard-coded in 6 places instead of using `SUPPORT_EMAIL`. |
| Menu open/close, Escape, outside click, focus | Done | |
| Alt text | Done | No `phone-image` / `country-flag` style alts remain. |
| Legal readability, dates, version | Done | |
| Cookie controls match behaviour | Done | |
| Not-found and error pages | Done | `app/not-found.tsx`, `app/error.tsx`. |

### Accessibility, performance, metadata

| Item | Status |
| --- | --- |
| Responsive / 200 % zoom / long content testing | Open: manual pass needed. |
| Keyboard test of full journeys | Open: manual pass needed. |
| Focus visibility, labels, announcements, contrast | Partial: merchant inputs use `focus:ring-[#0c3283]/20` (20 % opacity, likely below 3:1). Error text `text-red-700` passes. |
| Status not by colour alone | Done |
| Measure on slow phone/network | Open |
| Metadata, canonicals, sitemap | Done: canonicals set and sitemap covers products and support. |
| noindex on private pages | Done |
| Broken links, hydration warnings | Open: needs a crawl of the built site. |

---

## 2. New findings from the whole-app review

These items were not in the original backlog.

1. **Testimonials are placeholder content.** `components/social-proof.tsx` and `components/customer-testimonials.tsx` repeat the same "cut our international vendor payment costs by 85%" quote under four different names. Either supply real, approved testimonials or remove the section (D1).
2. **Unverified claims on live pages.**
   - "Over 3000 businesses use SYKA": `business-hero.tsx:62`
   - "Trusted by financial institutions across Africa and the Caribbean" and "enterprise-grade compliance": `business-hero.tsx`
   - "SOC 2 compliant … multi-sig custody": `built-on-stability.tsx:18`
   - "0.95% of transaction value" pricing: `pricing-comparison.tsx:37`
   - Partner logos in `companies-marquee.tsx` (permission to display)
   - "Production-ready in hours", "Sandbox environment, full test coverage", "key is generated instantly from the dashboard": `api-documentation.tsx`
3. **Support FAQ contradicts the countries list.** `lib/support-content.ts:33` says five pay-in currencies and "over 80 countries". The owner confirmed the 24-country list in `countries-supported.tsx` is correct and the FAQ is wrong. Note that the list renders 38 entries (24 named countries plus the XAF/XOF zone members), so confirm which number should appear in copy.
4. **Disabled controls with no explanation.** `BusinessAction` renders a greyed `<button disabled>` when a URL is unset. A visitor can't tell why it doesn't work. The same applies to "View full docs" when `NEXT_PUBLIC_SYKA_DOCS_URL` is unset.
5. **Rejected applicants get no path forward.** The API allows a new application after rejection, but the status page doesn't offer one.
6. **Duplicate cookie route.** Both `/cookies` and `/cookies-and-tracking-technologies` serve the same page. The canonical is `/cookies`, but the second route should redirect (308) rather than render.
7. **Hard-coded support email.** `support@sykabank.com` is written out in `merchant-flow.tsx`, `merchant-application-pages.tsx` (×2), `business-links.ts` and others, while `SUPPORT_EMAIL` already exists in `lib/support-content.ts`.
8. **Business CTA styling drift.** Merchant screens use `#0c3283` / `rounded-[14px]`, marketing uses `xenon-brand` / `rounded-lg`, and platform showcase uses `#413787`. Consolidate into `lib/business-styles.ts` tokens.
9. **Lint warnings.** Unused `PartnerJSSquared`, `PartnerSonaQode`, `MaryHealthLogo` in `companies-marquee.tsx`. Either remove them or keep the commented logos behind a clear note.
10. **Sidebar step icon.** The third registration step reuses `applicantMuted` (`merchant-flow.tsx:69`). There is no review/submit icon.
11. **Start over leaves uploads running.** `startOver()` resets state but doesn't abort `uploadControllers`, so a finished upload can attach to the abandoned application.
12. **`robots.ts` only disallows registration.** That's harmless because every private page is `noindex`, but either disallow all of `/business/merchant/` or none for consistency. Blocking pages that rely on `noindex` stops crawlers from seeing the `noindex`, so prefer removing the disallow.

---

## 3. Implementation plan

Each phase can ship on its own. Phases 1–2 need no owner input. Phase 3 depends on the decisions below.

### Phase 1: correctness and honest actions (no owner input needed)

1. **Status page next-step logic.** Rework `nextStep()` to cover approved and rejected outcomes. With no status enum in the API spec, derive the outcome from `decision_note` (documented as the rejection reason) plus `status`/`stage`, and keep the "With Syka" fallback for unknown values. For rejected applications, add "Start a new application" (calls `storeToken(null)` and goes to registration).
2. **Unavailable actions.** Change `BusinessAction` so that with no `href` it renders a non-button element with visible availability text, for example "Personal accounts opening soon", rather than a greyed button. Apply this to the personal hero, Get-a-personal, End-to-end security, the header on personal routes, and "View full docs".
3. **Header Company menu.** Build the items from `companyLinks`, filter out undefined entries, and hide the Company dropdown entirely when none are set (same rule as the footer).
4. **Business CTA wording.** Change "Get started" / "Get started for free" to "Apply for a merchant account" wherever the target is `businessLinks.signup`.
5. **Start over aborts uploads** (`merchant-flow.tsx` `startOver`).
6. **Redirect** `/cookies-and-tracking-technologies` → `/cookies` via `redirects()` in `next.config.ts` and delete the re-export route.
7. **Single support email.** Move `SUPPORT_EMAIL` into `lib/business-links.ts` (or keep it in `support-content.ts`) and import it everywhere.
8. **Lint clean-up** in `companies-marquee.tsx`. Add a review/submit sidebar icon.
9. **robots.ts:** remove the registration disallow and rely on `noindex`.

Acceptance: lint has 0 warnings, tsc and build are clean, existing tests pass, and the new unit tests for `nextStep()` pass.

### Phase 2: performance, accessibility, tests

1. **Lottie weight.** Re-export the three heaviest animations with fewer layers, rounded keyframes and no embedded raster images (target under 600 KB each), or convert them to MP4/WebM like the virtual-card and treasury rows, which already ship at 750–880 KB. Keep posters.
2. **Focus visibility.** Raise merchant input focus rings to a solid `#0c3283` 2 px ring, and check contrast on `#99a1af` and `#717182` small text against `#fafafa`.
3. **Button tokens.** Add primary and secondary business and merchant button classes to `lib/business-styles.ts` and replace the ad-hoc variants.
4. **Component tests.** Add `@testing-library/react` + `jsdom`, then cover:
   - registration validation summary and focus
   - create-on-timeout showing recovery instead of retrying
   - upload timeout, cancel and retry
   - submit-on-timeout re-reading status
   - status page for each outcome
   - recovery invalid code, resend cooldown and different email
5. **Manual QA pass.** Cover 360 / 768 / 1280 / 1512 widths, 200 % zoom, keyboard-only through registration → status → recovery, VoiceOver on the mobile nav and country combobox, and Lighthouse on a throttled mobile profile for `/`, `/business` and one product page. Record the results in this file.
6. **Link and hydration crawl** of `npm run start` (all sitemap URLs plus the merchant routes), with the console checked for hydration warnings.

### Phase 3: content and destinations (needs decisions)

1. **Testimonials and claims** (D1): replace or remove the duplicated quote, and edit or remove each claim in §2.2 that isn't approved.
2. **Entity wording** (D4): make the footer statement and copyright line name the same entity, using the owner-approved wording.
3. **Support FAQ countries** (D6): rewrite `which-countries-and-currencies-can-i-use` to match the 24-country list.
4. **Approved-merchant guidance** (D2, D3): link `/business/merchant/download` from the status page for approved applications once builds are published, and fix the step order in `installSteps` to match the confirmed sequence.
5. **Product page structure** (D7): add audience, availability, pricing and next step to each product page.
6. **Dedicated product URLs** (D8, optional): move to `/business/products/[slug]` with 308 redirects from the query-param URLs, and update the sitemap and canonicals.
7. **Business landing eligibility block:** a short "Who can apply / what you'll need" section above the business CTA, reusing `RegistrationIntro` content.

### Out of scope (unchanged)

Backend status enum, token lifetime or rotation, moving the token out of the status URL path (needs a backend session or cookie), support-ticket API, analytics.

---

## Decisions needed

| ID | Question | Blocks |
| --- | --- | --- |
| D1 | Are there real, approved testimonials? If not, remove the Social Proof section? | Phase 3.1 |
| D2 | Approved merchant order: install the app first and then wait for approval, or get approval first and then install? (still ambiguous from 14 Oct) | Phase 3.4 |
| D3 | When will Windows/macOS/Linux merchant builds be published, and should the download page be linked before then? | Phase 3.4 |
| D4 | Which entity name goes in the footer statement and copyright: "Xenon Technologies Inc."? | Phase 3.2 |
| D5 | Keep phone and target audience required, though the API treats them as optional? | none (current behaviour stays) |
| D6 | Correct pay-in currencies and destination count for the support FAQ. | Phase 3.3 |
| D7 | Pricing and availability text for each product. | Phase 3.5 |
| D8 | Approve dedicated product URLs? | Phase 3.6 |
| D9 | Approve: "Over 3000 businesses", "SOC 2 compliant", "0.95%" pricing, "Africa and the Caribbean", partner logos, API dashboard/sandbox claims. | Phase 3.1 |
| D10 | Wording for unavailable personal signup, for example "Personal accounts opening soon". | Phase 1.2 (a default will be used if none is given) |

## Final acceptance checks

- No framework indicator, placeholder link or unexplained disabled control in normal use.
- No console output or rendering of tokens, applicant data or raw backend text.
- Hidden navigation is unreachable by keyboard and assistive tech.
- Registration, upload, submit, status (all outcomes) and recovery show accurate states, and uncertain outcomes never invite duplicates.
- Every visible claim and destination is approved.
- `npm run lint` (0 warnings), `npx --no-install tsc --noEmit`, `npm test` and `npm run build` pass. `npm run start` is checked against the existing API configuration.
