# sykabank.com — frontend improvements

Updated 11 October 2026. This is the revised frontend-only improvement backlog, based on source inspection and the prior local website review. The listed changes are recommendations, not completed implementation.

## Scope and presentation requirements

- Present the finished public website now: no development badge, framework indicator, debug panel, test-only screen, fake operational result or internal API wording.
- Remove unnecessary application console logs and raw exception/payload output; never print tracking tokens, applicant data or document URLs.
- Errors should explain the failed action and a useful next step in plain language.
- Keep build/test tooling and the existing backend connection configuration. This work does not change backend endpoints, token issuance, mail services, storage infrastructure or hosting.
- Use only currently supported APIs and approved content. If a feature needs unavailable backend behavior, keep it absent or use a clear existing contact/recovery path.
- **P0:** applicant privacy and safe submission recovery. **P1:** functional correctness and essential usability. **P2:** conversion, accessibility and polish.

## P0/P1 findings from the source and visual review

- [ ] **Hide the Next.js development indicator.** Configure the supported on-screen indicator setting (`devIndicators: false`); validate presentation with a built app. This does not suppress compiler/runtime failures, which still need fixing.
- [ ] **Resolve disabled primary signup buttons.** Personal Get started controls were disabled in the local configuration. Connect the approved destination or replace the misleading action with honest availability/contact wording.
- [ ] **Replace Company placeholder links.** About, Blog, Press, Careers and Community use `#` in the header despite shared configurable links elsewhere. Use the shared targets or remove unavailable entries.
- [ ] **Remove closed mobile navigation from interaction/accessibility.** The offscreen panel remains an exposed modal dialog. Unmount it or make it appropriately hidden/inert when closed; restore focus when it closes.
- [ ] **Correct application wording.** “Start your company in minutes” suggests company incorporation. Describe applying for a Syka merchant account and the actual supported next steps.
- [ ] **Clarify legal entity attribution.** Footer variants inconsistently name different Xenon/Syka entities. Use owner-approved wording that explains the relevant jurisdiction rather than arbitrarily choosing one name.
- [ ] **Resolve the Cookie Preference Centre promise.** The policy references a centre not found in the reviewed application code. Align the frontend control and copy with actual approved behavior.
- [ ] **Add bounded upload/request recovery.** The upload helper has progress/network-error handling but no explicit timeout/abort lifecycle. Add clear timeout/cancel/retry states, clean up pending work on navigation and avoid losing the existing application identity.
- [ ] **Protect frontend tracking credentials.** Tokens occur in URLs and localStorage. Avoid analytics/log/referrer exposure, clear them deliberately on shared devices and scope restored state to the current application. Backend expiry/issuance changes are outside scope.
- [ ] **Sanitize displayed errors.** The application API helper forwards arbitrary backend messages, and screens render them. Map documented errors to controlled copy and field guidance with a safe fallback.
- [ ] **Optimize large animations.** Several Lottie assets are approximately 1.9–3.2 MB uncompressed. Preserve existing lazy loading/reduced-motion behavior, simplify heavy assets and provide static fallbacks.
- [ ] **Add automated frontend workflow coverage.** The current package scripts have no test command. Cover registration validation, recovery, status, uploads and error states without importing fixtures into runtime UI.

Source locations: `next.config.ts`, `lib/business-links.ts`, `lib/merchant-applications.ts`, `components/layout/header.tsx`, `components/layout/site-footer.tsx`, `components/legal/legal-content.ts`, `components/merchant/`, `components/dropdown-pages/product-media.tsx`, `public/animations/`, `package.json`.

## Error-message standard

| Situation | Suggested message and behavior |
| --- | --- |
| Requirements unavailable | “We couldn’t load the application form. Try again.” Show Retry and existing support access. |
| Invalid email/phone | Explain the expected format next to the field; focus the first invalid control. |
| Upload timed out | “This upload took too long. Check your connection and try again.” Preserve other known uploaded documents. |
| Unsupported file | State supported types/size from current requirements without raw validator text. |
| Submission response lost | “We couldn’t confirm your submission. Check your application status before submitting again.” Preserve the application reference/token privately. |
| Application link unavailable | “This application link is no longer available. Recover your application to continue.” Avoid exposing another applicant’s details. |
| Recovery request | Use the existing non-enumerating response behavior; never confirm that an unknown email has an account. |
| Invalid/expired recovery code | “This code is invalid or has expired. Check it or request a new code.” |
| Unexpected error | “We couldn’t complete this action. Try again or contact support.” Do not claim data was saved or lost without evidence. |

- [ ] Keep business-rule guidance when safe and useful; remove stack traces, internal endpoint names and raw provider/storage errors.
- [ ] Preserve valid form data after recoverable failures and show field errors plus a concise accessible summary.
- [ ] Do not clear the tracking identity after a network failure or create another application merely because the response was lost.
- [ ] Avoid unnecessary console output; investigate framework warnings rather than disabling the console globally.
- [ ] Keep optional non-secret application references available for support; do not expose tokens as support codes.

## Home and business landing pages

- [ ] Reduce excessive top spacing in the personal hero so the main action is visible on shorter laptop screens.
- [ ] Make Personal versus Business value propositions and signup destinations unambiguous.
- [ ] Use specific CTAs such as Apply for a merchant account or Contact sales where appropriate.
- [ ] Explain eligibility, supported locations and approved onboarding expectations before asking users to start.
- [ ] Standardize spacing, typography, button hierarchy, section widths and contrast.
- [ ] Replace repetitive generic claims with concrete approved benefits and product capabilities.
- [ ] Check that published compliance/security claims, customer counts, testimonials, savings and timing have approved supporting evidence; adjust frontend copy when unavailable.
- [ ] Distinguish country support for sending, receiving and particular products using approved information; do not imply universal support.
- [ ] Ensure every visible action works or has clear availability wording rather than silently doing nothing.

## Product and developer pages

- [ ] Give each product a clear audience, capability summary, availability, pricing explanation and next step.
- [ ] Consider dedicated product URLs for clear sharing/navigation, keeping old links working if routes change.
- [ ] Verify approved SDK names, code samples, installation commands and documentation destinations before presenting them as usable.
- [ ] Distinguish illustrative product UI from real interactive controls.
- [ ] Add static fallbacks if an animation fails, and avoid delayed entrance animations that hide important initial content.
- [ ] Preserve pause-offscreen/lazy-loading behavior and honor reduced-motion preferences, including changes while the page is open.
- [ ] Keep product-page layout stable while media loads and supply correctly sized compressed images/posters.

## Application registration

- [ ] Explain required documents, eligibility, steps and approved review expectations before registration begins.
- [ ] Show what has actually been saved and how the user can resume.
- [ ] Match required/optional indicators to the supported contract and approved product requirement.
- [ ] Explain ambiguous terms such as Target audience type with concrete examples.
- [ ] Keep recovery/help links accessible throughout the flow.
- [ ] Provide document previews and supported replacement controls, progress and actionable rejection messages.
- [ ] Guard unsaved changes during internal navigation as well as browser/tab closure.
- [ ] Keep Review & Submit complete, readable and linked back to editable sections.
- [ ] Confirm the returned submission state, reference and next steps without assuming approval or account provisioning.
- [ ] Prevent accidental duplicate submissions and keep unknown outcomes distinct from definite failures.
- [ ] Focus the first invalid field without unnecessary smooth animation or disruptive scrolling.

## Status and recovery

- [ ] Add Refresh status and Last checked using the existing status endpoint.
- [ ] Explain each returned status and whether the applicant or Syka acts next.
- [ ] Make requested corrections specific and navigable to the supported edit flow.
- [ ] Let users inspect/copy long non-secret references and filenames rather than only truncating them.
- [ ] Provide Clear this application from this device without implying deletion of the backend application.
- [ ] Explain recovery-code expiry, resend cooldown and the existing old/new-code behavior without inventing guarantees.
- [ ] Ensure invalid-link and unavailable-storage states always provide a recovery path.
- [ ] Guide approved applicants to the actual supported merchant-access process, using approved destinations only.
- [ ] Prevent stale data from one token/application appearing while another loads.

## Header, footer, legal pages and shared UI

- [ ] Use one source of truth for header/footer destinations and approved entity/contact wording.
- [ ] Ensure menu opening/closing, Escape, outside click, focus return and mobile scrolling work predictably.
- [ ] Give decorative images empty alternative text and meaningful images useful descriptions; remove names such as phone-image/country-flag when unhelpful.
- [ ] Make legal sections readable with working navigation, consistent typography and approved dates/version text.
- [ ] Align any cookie-preference controls and explanatory copy with actual frontend behavior; do not invent controls for tracking that is not present.
- [ ] Provide meaningful not-found and error pages with safe navigation and existing help links.

## Accessibility, performance and frontend metadata

- [ ] Test mobile/tablet/desktop layouts, orientation, 200% zoom, touch keyboards and long content.
- [ ] Keyboard-test the complete registration/upload/recovery journey, menus, country selectors and carousels.
- [ ] Check focus visibility, labels, error/progress announcements and color contrast.
- [ ] Keep status and selection understandable without color alone.
- [ ] Measure the built frontend on a slower phone/network; optimize large assets and unnecessary client work before introducing more animation.
- [ ] Check metadata, canonical URLs, sitemap and public product routing for consistency.
- [ ] Preserve noindex behavior for application/recovery/token pages and avoid embedding private data in page metadata, social previews or frontend analytics.
- [ ] Check broken links, failed assets, hydration warnings and runtime errors rather than hiding diagnostics globally.

## Frontend acceptance checks

- [ ] No framework indicator, debug UI, development label, placeholder Company link or misleading disabled primary action remains in normal use.
- [ ] No unnecessary application console logging or sensitive applicant/token/document data is emitted.
- [ ] Hidden navigation cannot receive focus or appear as an active dialog to assistive technology.
- [ ] Registration, upload, submit, status and recovery present accurate pending/error/success states using existing APIs.
- [ ] Failed/uncertain submissions preserve the application identity and do not invite duplicate creation.
- [ ] All visible product/support/signup destinations and approved claims are accurate.
- [ ] Run `npm run lint`, `npx --no-install tsc --noEmit` and `npm run build`; inspect `npm run start` using the existing API configuration and add targeted frontend regression tests.
- [ ] The final build requires no further cosmetic cleanup. Backend/hosting work is not assumed by this document.
