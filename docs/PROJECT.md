# Syka marketing site (sykabank.com)

Next.js 16 (App Router) marketing site for Syka, payment infrastructure for African entrepreneurs.
React 19, Tailwind 4, Framer Motion, Three.js, Vitest.

## Pages
- `/` personal landing page. The same path also serves `?product=` and `?developer=` views.
- `/business` business landing page, with its own `?product=` and `?developer=` views.
- `/support` help hub. Also legal pages, cookies and data security.
- `/business/merchant/*` merchant application flow. It shows no site header or footer.

## Done
- Personal hero redesigned: light background, centered copy, two app screens inside a wireframe globe of country circles (`components/hero.tsx`, `components/hero-globe/`).
- Business hero globe (`components/business/globe-scene.ts`).

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
- Hero uses the global light header. A dark hero was prototyped and dropped.
- Screens are `assets/images/phone-home.webp` and `phone-transfer.webp`, cut from the supplied PNGs.
- `assets/images/phone-with-frame.png` is no longer used by any code.

## Open questions
- Remove `phone-with-frame.png`?
- Signup, store and company links are env-driven (`lib/business-links.ts`). Unset links show disabled buttons.
- Hero is not yet checked on a real phone, or for LCP and bundle size.
