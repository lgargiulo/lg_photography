# LG Photography - Professional Portfolio Platform

A high-performance, mobile-first photography portfolio built with Next.js 16, Sanity CMS, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16.1+ (App Router, React Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens
- **CMS:** Sanity.io v3 with Studio
- **Image Optimization:** Next/Image with AVIF support
- **Deployment:** Vercel (recommended)

## Prerequisites

- Node.js 18+ and npm
- A Sanity.io account (free tier available)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

1. Go to [sanity.io](https://www.sanity.io/) and create a new project
2. Note your Project ID and Dataset name (usually "production")

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

### 5. Access Sanity Studio

1. Navigate to http://localhost:3000/studio
2. Sign in with your Sanity account
3. Start adding content!

## Project Structure

```
lg-photography/
├── app/                      # Next.js App Router
│   ├── globals.css          # Tailwind CSS with design tokens
│   ├── layout.tsx           # Root layout with metadata & JSON-LD
│   ├── page.tsx             # Homepage
│   ├── about/               # About page
│   ├── contact/             # Contact page with form
│   ├── portfolio/           # Portfolio grid & project detail pages
│   ├── services/            # Service tiers & FAQs
│   ├── privacy/             # Privacy policy
│   ├── terms/               # Terms of service
│   ├── robots.ts            # Robots.txt generation
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── studio/              # Sanity Studio route
├── components/              # React components
├── lib/                     # Utilities and helpers
│   └── sanity/             # Sanity client & image builder
├── sanity/                  # Sanity configuration
│   └── schemas/            # Content schemas
├── public/                  # Static assets
├── middleware.ts            # Rate limiting for API routes
├── next.config.ts          # Next.js config with security headers
├── sanity.config.ts        # Sanity Studio configuration
└── tailwind.config.ts      # Tailwind configuration
```

## Design System

### Colors
- **Background:** `#050505` (almost black)
- **Accent:** `#c9a227` (gold)
- **Text:** `#d4d4d4` (light gray)

### Typography
- **Display:** Cormorant Garamond (headings)
- **Body:** Inter (body text)

### Breakpoints (Mobile-First)
- **Mobile:** 320-767px
- **Tablet:** 768-1024px
- **Desktop:** 1025px+

## Content Types (Sanity CMS)

- **Portfolio Projects** — Photography projects with galleries, categories, and rich text descriptions
- **Service Tiers** — Photography packages (The Capture, The Identity, The Full Story)
- **FAQs** — Frequently asked questions, assignable to Services page, Contact page, or both
- **Testimonials** — Client reviews with ratings and avatars
- **About Page** — Bio, skills, and background info
- **Site Settings** — Global config: contact info, social media, hero images

## Features

- Fully responsive (mobile, tablet, desktop, landscape)
- Touch-optimized with 44px minimum tap targets
- Dark moody editorial theme
- SEO optimized (dynamic sitemap, robots.txt, JSON-LD structured data, per-page metadata)
- Image optimization (AVIF, WebP, lazy loading, Sanity hotspot/crop)
- Mobile-specific hero images from Sanity
- CMS-driven content with hardcoded fallbacks
- Security headers (CSP, Permissions-Policy, HSTS, X-Frame-Options)
- Rate limiting on API routes via middleware
- Portfolio with category filtering and lightbox gallery
- Contact form with service selection

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SITE_URL`
5. Deploy!

### Update Sanity CORS Settings

After deployment, add your Vercel URL to Sanity CORS origins:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API settings
4. Add your production URL to CORS origins

## Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## License

ISC License - Copyright (c) 2026 Luca Gargiulo
