---
name: cardtonic-sizing
description: Apply the Cardtonic.com typography and spacing scale to a Tailwind CSS page. Use this skill whenever the user asks to make a page "bigger", "more like cardtonic", "match cardtonic sizes", upsize an existing Tailwind layout, or applies Cardtonic-style typography/spacing. Also use when the user references cardtonic.com as a visual reference for their own page, even if they don't explicitly name this skill — the cue is any combination of Tailwind + Cardtonic or requests to increase type scale / section padding / button size on a Tailwind page.
---

# Cardtonic Sizing

A Tailwind CSS sizing scale inspired by cardtonic.com — a modern Nigerian fintech site with big, confident type and generous breathing room. Use this to upsize an existing Tailwind page so it reads with the same "bold and spacious" feel.

## The philosophy, in one line

Cardtonic pages feel bigger because headlines are **one step larger than most sites use**, sections have **double the vertical padding** of a default Tailwind layout, and buttons/CTAs are **chunky and tap-friendly**. Apply all three together — doing only one creates imbalance.

## Scope

This skill covers typography size, spacing, and element sizing only. It doesn't prescribe colors, fonts, or component structure — those stay with whatever the page already has. The result is "same page, scaled up and loosened out."

## The scale

Every value is a standard Tailwind utility. Mobile → tablet → desktop, in that order.

### Typography

| Role | Classes | Px (desktop) |
|---|---|---|
| Hero headline (h1) | `text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]` | 48 → 60 → 72 |
| Section heading (h2) | `text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight` | 30 → 36 → 48 |
| Sub-section / card title (h3) | `text-xl md:text-2xl font-semibold leading-snug` | 20 → 24 |
| Lead paragraph (under hero) | `text-lg md:text-xl text-gray-600 leading-relaxed` | 18 → 20 |
| Body text | `text-base md:text-lg leading-relaxed` | 16 → 18 |
| Small / caption / label | `text-sm` | 14 |
| Eyebrow label (above headline) | `text-sm font-semibold uppercase tracking-wider` | 14 |

The hero `leading-[1.1]` is important — default `leading-tight` (1.25) looks slack at 72px.

### Spacing

| Role | Classes | Px (desktop) |
|---|---|---|
| Section vertical padding | `py-16 md:py-24 lg:py-32` | 64 → 96 → 128 |
| Page horizontal gutter | `px-6 md:px-8 lg:px-12` | 24 → 32 → 48 |
| Max content width | `max-w-7xl mx-auto` | 1280 centered |
| Gap between hero headline + lead | `space-y-6` or `mb-6` | 24 |
| Gap between lead + CTA row | `mt-8 md:mt-10` | 32 → 40 |
| Grid/card gap | `gap-6 md:gap-8` | 24 → 32 |
| Paragraph spacing inside prose | `space-y-4` | 16 |

Section padding is the single biggest lever. Most default Tailwind pages use `py-12` or `py-16`; cardtonic-style sections feel roomy because they go up to `py-32` on desktop.

### Buttons & interactive elements

| Role | Classes |
|---|---|
| Primary CTA | `px-8 py-4 text-base md:text-lg font-semibold rounded-full` |
| Secondary / outline button | `px-8 py-4 text-base md:text-lg font-semibold rounded-full border-2` |
| Compact / nav button | `px-5 py-2.5 text-sm md:text-base font-medium rounded-full` |
| Input field | `px-5 py-4 text-base md:text-lg rounded-xl` |

Buttons use `rounded-full` (pill shape) by default on cardtonic, which reinforces the friendly fintech vibe. If the existing page uses `rounded-lg` or `rounded-xl` consistently, keep that — don't mix pill and square on the same page.

### Cards & containers

| Role | Classes |
|---|---|
| Feature card | `p-8 md:p-10 rounded-2xl` |
| Info/stat card | `p-6 md:p-8 rounded-xl` |
| Image card radius | `rounded-2xl overflow-hidden` |

## How to apply this to an existing page

The user's task is almost always "make my page bigger, like cardtonic." The steps:

1. **Read the page first.** Identify every hero/section/card/button by semantic role, not by reading class lists. Note the current sizing so you can describe the change in the summary.
2. **Upsize by role, not by find-and-replace.** Don't blanket-replace `text-4xl` with `text-6xl` across the file — the same class can appear on an h2 and on a pricing number and mean different things. Match each element to its role in the table above, then apply.
3. **Keep responsive breakpoints.** Every size in the scale is a three-step responsive ramp. Preserve `md:` and `lg:` variants; a page that only sets desktop sizes will feel cramped on mobile or oversized on phones.
4. **Upsize spacing at the same time as type.** Bigger text in the same cramped section looks worse, not better. Always adjust section `py-*` when adjusting headline size.
5. **Leave colors, fonts, and component structure alone.** This skill is about scale, not rebranding. If the page uses Inter at `font-medium`, keep that. Only change what the scale prescribes.
6. **Summarise the diff at the end.** After editing, tell the user which elements were upsized (hero, section headings, section padding, buttons, cards) so they can verify without diffing.

## Common pitfalls

- **Stacking `font-bold` on headings that already have `font-semibold` in a custom font.** Check the existing font weight conventions; on a page that uses a geometric sans at `font-semibold` for headlines, adding `font-bold` may look heavier than intended. When in doubt, match the page's existing heading weight.
- **Applying `leading-[1.1]` to smaller headings.** That tight leading is specifically for hero-scale type (48px+). On an h3 at 20-24px it reads as cramped.
- **Upsizing nav or footer text.** The scale is for page content, not chrome. Nav items stay at `text-sm` / `text-base`; oversized nav text makes the page feel amateur, not bold.
- **Forgetting the container.** Big type inside a full-width div looks uncontained. Wrap sections in `max-w-7xl mx-auto px-6 md:px-8 lg:px-12` so content has a clear horizontal boundary.

## Quick reference — minimum viable upsize

If the user wants the fastest possible "make it bigger like cardtonic" pass and doesn't need per-element tuning, these three changes carry most of the weight:

```
h1  →  text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]
h2  →  text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight
sections  →  py-16 md:py-24 lg:py-32
```

Do those three and the page will already read as noticeably cardtonic-scale. Layer in the button, card, and body-text upsizes for a fuller match.