# LG Photography - Professional Portfolio Platform

A high-performance, mobile-first photography portfolio built with Next.js 16, Sanity CMS, and Tailwind CSS v4.

## 🚀 Tech Stack

- **Framework:** Next.js 16.1+ (App Router, React Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens
- **CMS:** Sanity.io v3 with Studio
- **Image Optimization:** Next/Image with AVIF support
- **Deployment:** Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ and npm
- A Sanity.io account (free tier available)
- (Optional) Resend account for contact form emails

## 🛠️ Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Sanity

1. Go to [sanity.io](https://www.sanity.io/) and create a new project
2. Note your Project ID and Dataset name (usually "production")

### 3. Configure Environment Variables

Copy the example environment file:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` and add your credentials:

\`\`\`env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=your_resend_key (optional for now)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

- **Website:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

### 5. Access Sanity Studio

1. Navigate to http://localhost:3000/studio
2. Sign in with your Sanity account
3. Start adding content!

## 📁 Project Structure

\`\`\`
lg-photography/
├── app/                      # Next.js App Router
│   ├── globals.css          # Tailwind CSS with design tokens
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   └── studio/              # Sanity Studio route
├── components/              # React components
├── lib/                     # Utilities and helpers
│   └── sanity/             # Sanity client & image builder
├── sanity/                  # Sanity configuration
│   └── schemas/            # Content schemas
├── public/                  # Static assets
├── next.config.ts          # Next.js configuration
├── sanity.config.ts        # Sanity Studio configuration
└── tailwind.config.ts      # Tailwind configuration
\`\`\`

## 🎨 Design System

The dark moody theme from the original HTML site has been migrated to Tailwind CSS v4:

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

## 📝 Content Types

### Services
Event photography, artist press shots, venue photography, weddings/portraits

### Blog Posts
Articles with rich text, images, categories, and tags

### Gallery Images
Organized by category with tags and featured status

### Testimonials
Client reviews with ratings and avatars

### Pages
Flexible pages for About, Contact, etc.

### Site Settings
Global settings like contact info, social media, stats

## 🎯 Features

- ✅ Fully responsive (mobile, tablet, desktop, landscape)
- ✅ Touch-optimized with 44px minimum tap targets
- ✅ Dark moody editorial theme
- ✅ SEO optimized with structured data
- ✅ Image optimization (AVIF, WebP, lazy loading)
- ✅ Sanity CMS with hotspot/crop support
- ✅ Security headers (CSP, HSTS, etc.)
- ✅ 100/100 Lighthouse target
- ⏳ Contact form with email integration (Resend)
- ⏳ Blog system with categories
- ⏳ Dynamic OG image generation

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`
5. Deploy!

### Update Sanity CORS Settings

After deployment, add your Vercel URL to Sanity CORS origins:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API settings
4. Add your production URL to CORS origins

## 📦 Scripts

\`\`\`bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
\`\`\`

## 🔐 Security

Security headers are configured in `next.config.ts`:
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME sniffing protection)
- X-XSS-Protection
- Referrer-Policy

## 📸 Image Optimization

Images are automatically optimized using Next/Image:
- AVIF format (with WebP/JPEG fallbacks)
- Responsive srcSet for all device sizes
- Blur placeholders from Sanity LQIP
- Lazy loading below the fold
- Hotspot/crop support via Sanity

## 🤝 Contributing

This is a personal portfolio project for Luca Gargiulo Photography.

## 📄 License

ISC License - Copyright (c) 2026 Luca Gargiulo

---

Built with ❤️ using Next.js 16 and Sanity.io
