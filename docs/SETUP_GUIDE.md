# LG Photography - Project Setup Guide

## Tech Stack

- **Framework:** Next.js 16 (React 19) with TypeScript and App Router
- **CMS:** Sanity.io v5 with embedded Studio at `/studio`
- **Styling:** Tailwind CSS v3 with custom dark theme
- **Email:** Resend (contact form)
- **Spam Protection:** Google reCAPTCHA v3
- **Hosting:** Vercel
- **Fonts:** Cormorant Garamond (headings), Inter (body)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template and fill in values
cp .env.local.example .env.local

# 3. Start development server
npm run dev
```

The site runs at **http://localhost:3000** and Sanity Studio at **http://localhost:3000/studio**.

## Environment Variables

Create `.env.local` from the example file. All required variables:

| Variable | Scope | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | https://www.sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Usually `production` |
| `NEXT_PUBLIC_SITE_URL` | Public | Your production URL |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Public | https://www.google.com/recaptcha/admin |
| `RECAPTCHA_SECRET_KEY` | Private | Same reCAPTCHA admin page |
| `RESEND_API_KEY` | Private | https://resend.com/api-keys |

## Project Structure

```
app/
  page.tsx                  # Homepage
  about/page.tsx            # About page
  services/page.tsx         # Service tiers + FAQs
  contact/page.tsx          # Contact form + FAQs
  portfolio/page.tsx        # Portfolio grid with category filters
  portfolio/[slug]/         # Individual project detail pages
  privacy/page.tsx          # Privacy policy
  terms/page.tsx            # Terms of service
  studio/[[...tool]]/       # Sanity Studio (embedded)
  api/contact/route.ts      # Contact form POST endpoint
  robots.ts                 # Dynamic robots.txt
  sitemap.ts                # Dynamic sitemap

components/                 # Reusable React components
lib/sanity/                 # Sanity client and image utilities
sanity/schemas/             # CMS content schemas
middleware.ts               # Rate limiting for API routes
```

## Sanity CMS Schemas

All content is managed through Sanity Studio at `/studio`:

- **Site Settings** — Global config: hero carousel, stats, contact info, social links, footer
- **Portfolio Projects** — Photography projects with gallery, categories (Music, Portrait, Celebrations, Sport, Architecture, Travel, Other), featured flag for homepage
- **Service Tiers** — Photography packages with pricing, features, display order
- **FAQs** — Categorised Q&A shown on services and contact pages
- **Testimonials** — Client reviews with ratings, shown on homepage
- **About Page** — Bio, personal story, approach, core values

## Available Scripts

```bash
npm run dev          # Development server with hot reload
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Third-Party Services Setup

### Sanity CMS
1. Create a project at https://www.sanity.io/manage
2. Copy the Project ID into `.env.local`
3. Access Studio at `/studio` and sign in
4. Add content starting with Site Settings

### Google reCAPTCHA v3
1. Register at https://www.google.com/recaptcha/admin
2. Choose reCAPTCHA v3
3. Add your domains (localhost for dev, production URL for live)
4. Copy site key and secret key into `.env.local`

### Resend (Email)
1. Sign up at https://resend.com
2. Verify your domain (`lucaphotoart.com`)
3. Create an API key and add it to `.env.local`
4. Emails send from `noreply@lucaphotoart.com` to `info@lucaphotoart.com`

## Design Tokens

The theme is defined in `tailwind.config.ts`:

- **Background:** `#121212` (bg), `#1a1a1a` (elevated), `#1f1f1f` (cards)
- **Text:** `#d4d4d4` (primary), `#999999` (light), `#666666` (muted)
- **Accent:** `#7c98b3` (blue-grey)
- **Borders:** `#2a2a2a`, `#353535`

## Security

Already configured:
- HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- Content Security Policy (CSP) with allowed sources
- Referrer-Policy, Permissions-Policy
- Rate limiting on API routes (60 req/min per IP via middleware)
- reCAPTCHA v3 on contact form (threshold: 0.5)
- Right-click and image drag protection

## Deployment (Vercel)

1. Push to GitHub (see `GIT_SETUP.md` in project root for git config)
2. Import repository at https://vercel.com
3. Add all environment variables from the table above
4. Deploy
5. Go to https://www.sanity.io/manage and add your Vercel URL to CORS origins
6. Point your domain to Vercel and SSL configures automatically

## Node.js

Requires **Node.js 18+** (Next.js 16 requirement). Recommended: Node.js 20 LTS.

---

Built with Next.js 16, Tailwind CSS, and Sanity.io
