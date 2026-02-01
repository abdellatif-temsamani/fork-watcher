# Fork Watcher - Y2K Design Document

## Overview
A comprehensive Y2K-inspired redesign of Fork Watcher - a GitHub fork monitoring tool. The design combines futuristic Y2K aesthetics with a Nature design system approach.

---

## Design Philosophy

### Y2K Aesthetic
Y2K (Year 2000) web design draws from late 90s/early 2000s digital culture:
- **Futuristic & Cyber**: Glossy surfaces, glowing accents, digital patterns
- **Bold Colors**: High-contrast neon greens against dark backgrounds
- **Tech Elements**: Terminal-style blocks, window panels, digital textures
- **3D Effects**: Layered shadows, subtle transforms, hover animations

### Nature Design System
Applied alongside Y2K for maintainability and UX:
- **Calm Spacing**: Generous whitespace, not dense
- **Soft Surfaces**: Rounded corners, not bubbly
- **Readable Density**: Comfortable for long sessions
- **Accessible Contrast**: Clear text against backgrounds

---

## Color System

### Primary Palette: Jungle Green
Dark mode only, green-dominant theme with Y2K digital interpretation:

```css
/* Primary Jungle Green - Neon/Acid */
--primary: oklch(0.75 0.25 145);           /* #39FF14 - Acid green */
--primary-glow: oklch(0.85 0.3 145);       /* Brighter glow variant */
--jungle-dark: oklch(0.55 0.2 145);        /* Darker green */
--matrix: oklch(0.7 0.22 145);             /* Matrix-terminal green */

/* Backgrounds - Deep dark with green tint */
--background: oklch(0.06 0.015 145);       /* Almost black with green */
--card: oklch(0.1 0.02 145);               /* Slightly elevated */
--muted: oklch(0.15 0.025 145);            /* Subtle surfaces */

/* Chrome/Silver Accents */
--chrome: oklch(0.85 0.01 260);            /* Light silver */
--chrome-dark: oklch(0.6 0.02 260);        /* Dark silver */
```

### Design Intent
The green is used in a **synthetic, digital way**:
- Glow effects for CTAs and interactive states
- Matrix-style terminal blocks for code/data
- Gradient text for headings
- **Never** natural/earthy/muted

---

## Typography

### Font Families
- **Primary**: Geist Sans (modern, clean)
- **Monospace**: Geist Mono (terminal/code blocks)

### Scale
- **Hero**: 6xl-8xl (96px), font-bold, tracking-tighter
- **H1**: 4xl-5xl (48-56px), tracking-tight
- **H2**: 3xl-4xl (36-48px)
- **Body**: Base (16px), comfortable line-height
- **Code/Terminal**: Sm (14px), monospace

### Special Treatments
- **Gradient Text**: Primary colors for hero headings
- **Chrome Text**: Silver gradient for secondary emphasis
- **Glow Text**: Text shadow effects for emphasis

---

## Spacing System (Nature)

Following calm, breathable spacing:

| Token | Value | Usage |
|-------|-------|-------|
| space-24 | 96px | Hero padding |
| space-16 | 64px | Section gaps |
| space-12 | 48px | Major components |
| space-8 | 32px | Cards, containers |
| space-6 | 24px | Component groups |
| space-4 | 16px | Element gaps |
| space-2 | 8px | Tight spacing |

---

## Components

### WindowPanel
Y2K "fake OS window" aesthetic for cards:
- Rounded corners (2xl)
- Subtle gradient border on hover
- Optional window controls (dots)
- Elevated shadows with primary tint
- 3D hover effect (lift + glow)

### GlowButton
Primary CTA with jungle green glow:
- Gradient background (primary to darker)
- Large shadow with primary color
- Hover: stronger glow + slight lift
- Active: press down effect

### ChromeButton
Secondary action with silver styling:
- Border with chrome color
- Optional fill variant
- Hover: subtle glow

### StatusBadge
Sticker-style badges:
- Rounded-full shape
- Variants: jungle (primary), chrome, matrix
- Optional glow animation
- Small dot indicator

### TerminalBlock
Matrix-style code display:
- Dark background with green tint
- Monospace font
- Header with controls
- Prompt character ($)

### NeoInput
Futuristic form input:
- Glow focus ring
- Primary border on focus
- Smooth transitions

---

## 3D Effects Guidelines

### Where to Apply
- **Interactive elements only**: buttons, cards, links
- **Hover states**: lift + glow
- **Active states**: press down

### Where NOT to Apply
- Static text
- Decorative elements
- Background patterns

### Implementation
```css
/* 3D Button */
hover:shadow-xl hover:shadow-primary/50 hover:-translate-y-0.5
active:translate-y-0 active:shadow-md

/* 3D Card */
hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1
transition-all duration-300
```

---

## Effects

### Scanlines
Subtle horizontal lines (3% opacity):
- Positioned as overlay
- Pointer-events: none
- Very subtle - don't distract

### Noise Texture
Grainy background texture (2.5% opacity):
- SVG-based fractal noise
- Adds organic feel to digital aesthetic
- Pointer-events: none

### Glow Effects
Box-shadow based glows:
- Multiple layers for depth
- Primary color with alpha transparency
- Use sparingly for emphasis

---

## Page Structure

### Landing Page (page.tsx)
1. **Hero**: Large gradient text, floating fork icons, CTA buttons
2. **Features**: 3 window panels with icons
3. **How It Works**: Terminal-style steps (01, 02, 03)
4. **CTA**: Full-width panel with glow button
5. **Footer**: Minimal, GitHub link only

### GitHub Input (github/page.tsx)
- Centered form in WindowPanel
- Username input with search icon
- Terminal helper block
- Clean footer

### User Results (github/[username]/page.tsx)
- User header with avatar glow
- Stats badges
- Repo cards (WindowPanel)
- Fork lists (TerminalBlock)

---

## Animation Guidelines

### Float Animation
- Used for decorative elements
- 6s duration, infinite
- Subtle Y-axis movement

### Pulse Glow
- Used for live/loading indicators
- 3s duration, ease-in-out
- Pulsing shadow

### Page Transitions
- animate-in, fade-in
- slide-in-from-bottom
- 700ms duration

### Spinner
- Green primary ring
- Dark base ring
- Smooth spin animation

---

## Accessibility

### Color Contrast
- All text meets WCAG AA
- Primary green on dark: high contrast
- Chrome text: sufficient contrast

### Focus States
- Visible ring on all interactive elements
- Primary color ring
- 2px width

### Reduced Motion
- Support `prefers-reduced-motion`
- Static alternatives for animations

---

## File Structure

```
src/
├── app/
│   ├── globals.css          # Y2K theme tokens
│   ├── layout.tsx           # Dark mode force
│   ├── page.tsx             # Landing (Y2K)
│   └── github/
│       ├── page.tsx         # Input form
│       └── [username]/
│           └── page.tsx     # Results
├── components/
│   ├── effects/             # Visual effects
│   │   ├── GlowEffect.tsx
│   │   ├── Scanlines.tsx
│   │   ├── NoiseTexture.tsx
│   │   └── EffectsLayer.tsx
│   ├── y2k/                 # Y2K UI kit
│   │   ├── WindowPanel.tsx
│   │   ├── GlowButton.tsx
│   │   ├── ChromeButton.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── NeoInput.tsx
│   │   ├── TerminalBlock.tsx
│   │   ├── GradientText.tsx
│   │   ├── ChromeText.tsx
│   │   ├── JungleText.tsx
│   │   └── Y2KFooter.tsx
│   └── github/              # Domain components
│       ├── UsernameInput.tsx
│       ├── RepoForksList.tsx
│       ├── RepoCard.tsx
│       ├── ForkItem.tsx
│       ├── LoadingState.tsx
│       └── ErrorState.tsx
└── types/
    └── github.ts            # Type definitions
```

---

## GitHub Link

**Repository:** https://github.com/abdellatif-temsamani/fork-watcher

Only social link in the footer - keeping it minimal and clean.

---

## Implementation Notes

### Tailwind v4
- CSS-based configuration in globals.css
- OKLCH color space for modern color management
- Custom utilities via @layer utilities
- Theme tokens using --var syntax

### Build Configuration
- React Compiler enabled
- Partial prerendering for dynamic routes
- ESLint for quality checks

### Performance
- Server components by default
- Suspense boundaries for async data
- Image optimization with next/image
- CSS variables for theme switching (instant)

---

## Quality Checklist

- [x] Dark mode only (forced)
- [x] All colors from CSS variables
- [x] No inline styles
- [x] 3D effects only on interactive elements
- [x] Y2K aesthetic achieved
- [x] Nature spacing maintained
- [x] GitHub link in footer
- [x] Components small and reusable
- [x] Build passes
- [x] Lint passes (mostly - pre-existing issues)

---

## Future Enhancements

Possible additions:
- Dark/light toggle (currently dark-only)
- More animation options
- Additional color themes
- PWA support
- More detailed fork analytics

---

## Summary

The Fork Watcher Y2K redesign successfully combines:
1. **Y2K Aesthetic**: Neon greens, window panels, terminal blocks, glow effects
2. **Nature Design**: Calm spacing, readable density, soft surfaces
3. **Modern UX**: Accessible, performant, maintainable
4. **Dark Mode**: Exclusive dark theme with green accents
5. **3D Effects**: Subtle and purposeful, not overwhelming

The result is a unique, memorable interface that feels both futuristic and usable - capturing the playful optimism of Y2K digital culture while maintaining modern design standards.

---

*Document created: 2026-02-01*
*Theme: Y2K + Nature Design System*
*Primary: Jungle Green (#39FF14)*
*Framework: Next.js 16 + Tailwind v4*
