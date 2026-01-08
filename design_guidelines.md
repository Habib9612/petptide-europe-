# Peptide Europe - Design Guidelines

## Design Approach
**E-commerce Reference-Based**: Drawing from established pharmaceutical/supplement e-commerce patterns (similar to Shopify stores, supplement retailers) with added regulatory compliance emphasis. Clean, professional, trust-building aesthetic.

## Brand Identity
- **Name**: Peptide Europe
- **Tagline**: "Precision Peptides for European Science"
- **Color Palette**:
  - Primary Blue: `#0ea5e9` (Cyan-500) - CTAs, links, accents
  - Dark Slate: `#0f172a` (Slate-900) - Headers, text
  - White: `#ffffff` - Backgrounds, cards
  - Success Green: `#22c55e` - Stock indicators, success states

## Typography System
- **Headings**: Bold, modern sans-serif (Inter or DM Sans via Google Fonts)
  - H1: 3xl-4xl, font-bold, tracking-tight
  - H2: 2xl-3xl, font-bold
  - H3: xl-2xl, font-semibold
- **Body**: Regular sans-serif, base to lg sizing
- **Product Codes**: Monospace font for technical specs, uppercase, text-sm

## Layout & Spacing
**Spacing Units**: Tailwind 4, 6, 8, 12, 16, 24 for consistent rhythm
- Section padding: `py-16` to `py-24`
- Card padding: `p-6` to `p-8`
- Grid gaps: `gap-6` to `gap-8`

## Core Components

### Age Verification Modal
- Full-screen overlay (backdrop-blur-sm, bg-slate-900/80)
- Centered card (max-w-md, p-8, rounded-xl)
- Headline: text-2xl, font-bold
- Two-button layout: Primary "I am 18+ and Agree" / Secondary "Exit"

### Navigation
- Sticky header with backdrop blur
- Logo left, nav center (Products, Shipping, Terms), cart icon right
- Mobile: Hamburger menu with slide-in drawer

### Product Cards
- Grid layout: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Card structure: Image → Code name (text-sm, uppercase, tracking-wide, text-cyan-500) → Title → Price (strikethrough regular, bold sale) → "In Stock" badge with green pulse animation → Add to Cart button
- Hover: Subtle lift (translate-y-1, shadow-lg)

### Product Detail Page
- Two-column layout (60/40 split): Image gallery left, details right
- Tabbed content: Description / Technical Specs / Research Use Disclaimer
- Sticky "Add to Cart" section on scroll

### Stock Status Badge
- Green pulse animation: `animate-pulse` with green dot
- Text: "In Stock" or "Low Stock - Order Soon" (if < 5)

### Checkout Flow
- Multi-step indicator at top
- Payment options with 10% crypto discount prominently displayed
- SEPA/Bank transfer details in expandable section

## Images
**Hero Section**: Full-width laboratory/science imagery (pipettes, vials, research setting) with overlay gradient (from-slate-900/60 to transparent). Hero text and CTA buttons with backdrop-blur background.

**Product Images**: Clean white background, vial/bottle photography, consistent aspect ratio (1:1 or 4:5).

**Trust Badges**: Small icons for payment methods, shipping guarantees, lab certification symbols in footer.

## Page Sections (Homepage)
1. **Hero**: Full-viewport with science imagery, headline "Precision Peptides for European Science", primary CTA "Browse Products", secondary "Learn More"
2. **Featured Products**: 3-column grid of bestsellers (Tirzepatide, Semaglutide, Retatrutide)
3. **Categories**: 3-card horizontal layout (GLP-1 Agonists, Healing & Repair, Growth Factors)
4. **Trust Section**: 3-column (Fast EU Shipping, Lab-Grade Purity, Discreet Packaging)
5. **Legal Disclaimer**: Prominent "Research Use Only" banner with icon
6. **Footer**: Multi-column (Quick Links, Legal Pages, Payment Icons, Newsletter)

## Accessibility
- WCAG AA contrast ratios maintained
- Focus states: ring-2 ring-cyan-500
- All interactive elements keyboard accessible
- Age verification cannot be bypassed

## Special Features
- **Crypto Discount Banner**: Floating notification "Pay with Crypto - Save 10%" (dismissible)
- **Low Stock Urgency**: Red badge animation when stock < 5
- **Shipping Calculator**: Widget on product pages showing delivery estimates by country