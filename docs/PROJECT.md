# Syka marketing site (sykabank.com)

Next.js 16 (App Router) marketing site for Syka, payment infrastructure for African entrepreneurs.
React 19, Tailwind 4, Framer Motion, Three.js, Vitest.

## Pages
- `/` personal landing page. The same path also serves `?product=` and `?developer=` views.
- `/business` business landing page, with its own `?product=` and `?developer=` views.
- `/support` help hub. Also legal pages, cookies and data security.
- `/about` company story, payment use cases, and shared card FAQs.
- `/careers` team culture and hiring process; currently shows no open roles.
- `/coverage` supported-country directory and on-request corridor enquiries. Uses `lib/countries.ts` until approved live/on-request classifications are supplied.
- `/business/merchant/*` merchant application flow. It shows no site header or footer.

## Done
- Personal hero redesigned: light background, centered copy, two app screens inside a wireframe globe of country circles (`components/hero.tsx`, `components/hero-globe/`).
- Business hero globe (`components/business/globe-scene.ts`).
- Coverage reuses the Business `HeroGlobe` with a large sphere cropped at the right and bottom of the hero; it shares the animation and reduced-motion fallback.
- Company, Careers, and Coverage pages from `newpages/` and Figma. Shared layout in `components/company/`; approved card answers in `lib/card-faq.ts` also used by Virtual Cards.
- About and Careers photos come from the Figma file (`Syka Website Pages (Copy)`). Originals are 4096px. `public/company/*.jpg` holds 2x-display-size copies.

## Personal hero: how it works
- `components/hero.tsx` holds the copy and layout. Text renders in the server HTML.
- `components/hero-globe/phone-globe.tsx` shows the two screens as still images first. It loads the Three.js scene when the page is idle.
- `phone-globe-scene.ts` draws the globe. Country circles travel along latitude and meridian lines. They pass behind and in front of the phones.
- `globe-path.ts` holds the pure math. `tests/globe-path.test.ts` covers it.
- `phone-layout.ts` holds the shared phone placement and globe margins. The still image and the scene both use it.
- The globe is an ellipsoid sized to the phone pair plus a margin (`GLOBE_MARGIN`).
- Countries come from `lib/countries.ts`. The list of codes that travel the globe is in `phone-globe.tsx`.
- No WebGL: the still images stay. Reduced motion: one still frame of the globe. Touch input does not move the globe.

## Decisions
- Motion rules: Tailwind 4 `translate-*`/`scale-*` set the CSS `translate`/`scale` properties, so a transition must list `translate` or `scale`, not `transform`. Buttons get press feedback from a global `scale: 0.97` rule; a button that sets its own transition must include `scale`. CTA links get it from `BusinessAction`. Scroll reveals use `Reveal` (`components/dropdown-pages/shared.tsx`) or `lib/animation.ts` presets, with `transform` strings rather than Framer `x`/`y`. Support and legal pages have no reveals on purpose. Reduced motion keeps fades and colour changes and drops movement (`app/globals.css`).
- Header Personal/Business pill: only `/` (Personal) and `/business/*` (Business) set the side. All other pages keep the visitor's last side (`localStorage` key `syka-audience`, default Personal). The rule is in `lib/audience.ts`; the hook is `components/layout/use-audience.ts`. The Developers menu, product links and Get started link follow the same side.
- Hero uses the global light header. A dark hero was prototyped and dropped.
- Screens are `assets/images/phone-home.webp` and `phone-transfer.webp`, cut from the supplied PNGs.
- `assets/images/phone-with-frame.png` is no longer used by any code.

## Open questions
- Remove `phone-with-frame.png`?
- Signup, store and company links are env-driven (`lib/business-links.ts`). Unset links show disabled buttons.
- Hero is not yet checked on a real phone, or for LCP and bundle size.
- Figma copy differs from site copy on About, Careers and Coverage. Site copy is kept. Figma also shows a sample open role and Careers filters; the site keeps the "no open roles" state. New company pages passed build, lint, TypeScript, and route checks; browser visual QA remains pending because browser automation was unavailable.
