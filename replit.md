# Peptide Europe

## Overview

Peptide Europe is a full-stack e-commerce web application for selling research-grade peptides to European laboratories and research institutions. The platform features a product catalog, shopping cart, checkout system with multiple payment options (crypto with 10% discount, bank transfer, credit card), and regulatory compliance features including age verification. The site emphasizes "research use only" throughout and includes multi-language support for EU markets. Includes an About Us page and a complete affiliate/partner program with referral tracking and commission system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: Zustand for cart state with localStorage persistence, React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Build Tool**: Vite with React plugin

The frontend follows a component-based architecture with pages in `client/src/pages/` and reusable components in `client/src/components/`. UI components from shadcn/ui are located in `client/src/components/ui/`.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: Node.js with HTTP server
- **API Design**: RESTful endpoints under `/api/` prefix
- **Build**: esbuild for production bundling with selective dependency bundling

The server uses a modular structure with routes defined in `server/routes.ts` and storage abstraction in `server/storage.ts`. In development, Vite middleware handles frontend serving; in production, static files are served from the build output.

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's table definitions
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Current Storage**: In-memory storage implementation with product data hardcoded (ready for database migration)
- **Pricing Strategy**: All 20 products display competitor pricing exactly €4 higher than our sale price to show competitive advantage
- **Free Shipping**: Orders over €120 get free shipping (otherwise €9.99)

The schema includes products, cart items, orders, newsletter subscribers, and user blog posts tables. The storage interface (`IStorage`) abstracts data operations, making it straightforward to switch from in-memory to database-backed storage.

### Newsletter System
- Subscribers receive a unique WELCOME10-XXXXXXXX discount code for 10% off first order
- Discount codes are one-time use and marked as used after order placement
- API: POST /api/newsletter (subscribe), POST /api/newsletter/validate (check code), POST /api/newsletter/use-code (consume code)

### Blog/Insights System
- Static research articles defined in `client/src/lib/blog-data.ts` with slugs for routing
- User-created blog posts via API with in-memory storage
- Routes: /insights (listing), /insights/:slug (static articles), /insights/user/:id (user posts)
- API: GET /api/blog-posts, POST /api/blog-posts

### Peptide Dosage Guide
- Interactive reference page at /peptide-guide with 53 peptides across 9 categories
- Data defined in `client/src/lib/peptide-guide-data.ts`
- Features: search filtering, category filter buttons, expandable rows with detail cells (vial size, reconstitution, dose, frequency, cycle, notes)
- Categories: Weight Loss, Fat Loss/Muscle, Muscle Growth, Recovery & Repair, Cognitive, Longevity & Anti-Aging, Immune & Gut, Sexual Health, Skin & UV Protection
- Linked from header navigation ("Dosage Guide") and home page Resources section

### Peptide Calculator
- Reconstitution calculator at /calculator
- Inputs: peptide amount (mg), bacteriostatic water volume (mL), desired dose (mcg/mg), syringe size
- Outputs: draw volume, syringe units, total doses per vial, concentration
- Includes reconstitution guide, storage guidelines, and common solvents sidebar

### About Us Page
- Company information page at /about with 6 sections: hero, who we are (with 4 value cards), quality pipeline (5-step timeline), mission quote, stats (3 cards), research disclaimer
- Framer-motion animations throughout

### Affiliate/Partner Program
- Landing page at /partners with program overview, how it works (3 steps), commission details
- Signup at /partners/signup creates affiliate account with unique referral code (PE-XXXXXXXX format)
- Dashboard at /partners/dashboard shows clicks, conversions, earnings, commission rate, referral link, recent referrals table
- Dashboard access via email + referral code authentication
- Database tables: affiliates (tracking, stats), affiliate_referrals (individual conversions)
- API: POST /api/affiliates/signup, GET /api/affiliates/dashboard, POST /api/affiliates/validate-code, POST /api/affiliates/track-click
- 10% default commission rate, real-time click and conversion tracking

### FAQ System
- Comprehensive FAQ page at /faq with 6 sections (30+ Q&As)
- Sections: General Peptide Questions, Storage & Handling, Ordering & Payment, Shipping & Delivery, Product Quality & Testing, Returns & Refunds
- Category filtering and expandable accordion-style Q&A items

### Landing Page Structure
The home page (`client/src/pages/home.tsx`) uses a premium biotech design that surpasses GenScript's layout with the following sections:
- **Hero**: 3D molecular animation with teal/amber particle system, dark gradient background, stats bar at bottom with colored accent numbers
- **SectionNav**: Sticky navigation bar (top-14, z-40) with anchor links to sections + "Quote / Order" CTA
- **ScienceSection** (id="science"): Molecular science overview with amino acid sequence card + dual CTAs
- **WhyChooseUs** (id="why-choose-us"): Dark background section with 4 icon+stat cards (24h, 98-99%+, 20+, 27 Countries), dual CTAs
- **ProcessSection** (id="process"): 6-step numbered grid (01-06) with border-separated cells
- **SpecsTable** (id="specifications"): Product quality specification table on muted background
- **MidPageCTA**: Bold teal gradient banner "Ready to order? Ships within 24 hours" with white CTA button
- **FeaturedPeptides** (id="catalog"): 6 popular product cards with prices + 4 category cards below
- **Testimonials** (id="testimonials"): Dark background with 3 researcher testimonial cards
- **ToolsAndResources** (id="tools"): 3 resource cards (Calculator, Insights, FAQ) in centered grid
- **NewsletterSection**: Email signup with 10% discount code
- **DisclaimerBanner**: Legal research-use disclaimer

### Color Palette (Luxury Minimalist)
- **Light Mode Primary**: Clean blue (HSL 220 70% 50%) - modern, professional
- **Dark Mode Primary**: Lighter blue (HSL 217 80% 62%) - legible on dark backgrounds
- **Background**: Pure white (HSL 0 0% 100%) / Deep charcoal (HSL 224 71% 4%)
- **Success**: Clean emerald (HSL 160 60% 40%)
- **Category Colors**: Blue accent variations
- Design philosophy: single blue accent, clean whites, no competing colors, no gold
- framer-motion animations on all sections (scroll-triggered whileInView)
- Hover lift effects on cards (shadow + translate-y)

### Product Images
- Custom vial images for BPC-157, CJC-1295, and Hexarelin via `client/src/lib/product-images.ts` import map
- Other products use FlaskConical icon placeholder

### Key Design Patterns
- **Path Aliases**: `@/` maps to client src, `@shared/` maps to shared code
- **Shared Types**: Schema types exported from `shared/schema.ts` are used by both frontend and backend
- **Context Providers**: Language and theme contexts wrap the application for global state
- **Component Composition**: shadcn/ui components are customized via className props and CSS variables

### Internationalization
Multi-language support implemented via custom i18n system in `client/src/lib/i18n.ts` supporting English, German, French, Spanish, Italian, and Dutch.

### Theme System
Light/dark mode support using CSS custom properties defined in `client/src/index.css` with a ThemeProvider context for toggling.

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migration tooling (`npm run db:push`)

### UI Framework
- **Radix UI**: Headless UI primitives (dialogs, dropdowns, tabs, etc.)
- **Lucide React**: Icon library
- **React Icons**: Additional icons (specifically Bitcoin/crypto icons)
- **Embla Carousel**: Carousel/slider component

### Payment Integration
- **Stripe**: Credit card payments via Stripe Checkout (hosted page). Integration uses Replit's Stripe connector for credentials. Files: `server/stripeClient.ts`, `server/webhookHandlers.ts`. Webhook route registered before `express.json()` in `server/index.ts`. Checkout session created via `POST /api/stripe/create-checkout` with `price_data` line items. Success page at `/checkout/success`.
- **Cryptocurrency**: Manual crypto payments (Bitcoin, USDT, Ethereum) with 10% discount
- **SEPA Bank Transfer**: European bank transfers (manual process)

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner for Replit environment
- **tsx**: TypeScript execution for development server

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available in dependencies)
- **express-session**: Session middleware (available in dependencies)