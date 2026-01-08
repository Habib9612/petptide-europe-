# Peptide Europe

## Overview

Peptide Europe is a full-stack e-commerce web application for selling research-grade peptides to European laboratories and research institutions. The platform features a product catalog, shopping cart, checkout system with multiple payment options (crypto with 10% discount, bank transfer, credit card), and regulatory compliance features including age verification. The site emphasizes "research use only" throughout and includes multi-language support for EU markets.

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
- **Pricing Strategy**: All 15 products display competitor pricing exactly €4 higher than our sale price to show competitive advantage

The schema includes products, cart items, and orders tables. The storage interface (`IStorage`) abstracts data operations, making it straightforward to switch from in-memory to database-backed storage.

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

### Payment Integration (Planned)
- **BTCPay Server**: Cryptocurrency payments (Bitcoin, USDT, Ethereum) with 10% discount
- **SEPA Bank Transfer**: European bank transfers
- **High-risk Merchant Account**: Credit card processing (e.g., Seamless Chex)

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner for Replit environment
- **tsx**: TypeScript execution for development server

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available in dependencies)
- **express-session**: Session middleware (available in dependencies)