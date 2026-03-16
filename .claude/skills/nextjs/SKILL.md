---
name: nextjs
description: Next.js development patterns, component architecture, animation conventions, and design system for the sykabank.com project. Use when building, editing, or animating components on this site.
allowed-tools: Read, Grep, Glob, Bash, Edit, Write
---

# Sykabank.com — Next.js Development Skill

## Project Overview
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 + `tw-animate-css` + `shadcn/tailwind.css`
- **Animation**: `framer-motion` v12 (primary), CSS `transition-*` classes (secondary)
- **UI helpers**: `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, `radix-ui`
- **Lottie**: `@lottiefiles/dotlottie-react`, `lottie-react` (available but not yet in use on homepage)

## Directory Structure
```
app/
  layout.tsx         — root layout (Header + Footer wrapping all pages)
  page.tsx           — homepage (personal)
  globals.css        — Tailwind theme, design tokens, custom shadows
  business/
    page.tsx         — business landing page
components/
  hero.tsx                   — homepage hero (no animations yet)
  get-a-personal.tsx         — "Borderless World" section (no animations yet)
  more-than-transfers.tsx    — feature bento grid (CSS group-hover transitions)
  end-to-end-security.tsx    — 3-step section (no animations yet)
  built-on-stability.tsx     — 3-card grid (no animations yet)
  solutions-that-fit.tsx     — accordion cards (framer-motion layout + AnimatePresence)
  social-proof.tsx           — testimonial carousel (framer-motion AnimatePresence + drag)
  countries-supported.tsx    — country pill grid (no animations yet)
  layout/
    header.tsx               — sticky nav (CSS transitions for mobile drawer + pill switcher)
    footer.tsx
  business/                  — business page components
  dropdown-pages/            — product/developer sub-pages (shown via ?product= query param)
```

## Design Tokens (globals.css)
| Token | Value |
|---|---|
| `text-xenon` | `#008EDB` (brand blue) |
| `text-xenon-600` | `#0081C7` (hover) |
| `bg-[#1E1A63]` | deep navy (social proof bg) |
| `bg-[#E4F4FB]` | light blue (get-a-personal bg) |
| `shadow-xenon_card` | `0px 9px 54px 0px #9aa9b31f` |
| `--font-sans` | Lato |
| `--font-dmSans` | DM Sans |

## Animation Conventions

### Framer Motion patterns already in use:
```tsx
// Slide carousel (social-proof.tsx)
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};
<AnimatePresence mode="wait" custom={direction}>
  <motion.div key={key} custom={direction} variants={variants}
    initial="enter" animate="center" exit="exit"
    transition={{ duration: 0.35, ease: "easeInOut" }} />
</AnimatePresence>

// Accordion expand (solutions-that-fit.tsx)
<motion.div layout animate={{ flex: isExpanded ? 2.2 : 1 }}
  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }} />
```

### CSS transition patterns already in use:
```tsx
// Image hover scale (more-than-transfers.tsx)
className="transition-transform duration-500 ease-out group-hover:scale-105"

// Button gap expand
className="transition-[gap] duration-300 ease-out group-hover:gap-3"

// Colors
className="transition-colors hover:bg-xenon-600"
```

## When Adding Scroll-Triggered Animations
Add `"use client"` directive, use `useInView` from framer-motion or `IntersectionObserver`. Pattern:
```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

<motion.div ref={ref}
  initial={{ opacity: 0, y: 24 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5, ease: "easeOut" }} />
```

## Component Rules
- Server Components by default — only add `"use client"` when state, effects, or event handlers are needed
- Use `next/image` with `placeholder="blur"` for all images with `StaticImageData`
- Prefer `fill` + `sizes` for responsive images inside positioned containers
- Use `cn()` from `@/lib/utils` (tailwind-merge + clsx) for conditional classNames
- Max content width: `max-w-[1292px]` with `px-5 sm:px-6 lg:px-0`
- Section spacing: `mt-16 lg:mt-24`
- Heading pattern: `text-[33px] sm:text-[39px] font-bold leading-[1.1] text-[#121733]`
- Subheading accent: wrap keyword in `<span className="text-xenon">`

## Homepage Sections (in order)
1. `<Hero />` — headline + CTA + phone mockup
2. `<GetAPersonalAccount />` — feature split layout
3. `<MoreThanTransfers />` — bento feature cards
4. `<EndToEndSecurity />` — 3-step split layout
5. `<BuiltOnStability />` — 3-column trust cards
6. `<SolutionsThatFit />` — animated accordion cards
7. `<SocialProof />` — dark testimonial carousel
8. `<CountriesSupported />` — country pill grid

## Arguments
$ARGUMENTS
