# LG Photography - Technical Documentation

## Architecture Overview

A photography portfolio for Luca Gargiulo, built with Next.js 16 (App Router), Sanity CMS, and Tailwind CSS. The site uses a dark editorial design with cinematic Framer Motion animations throughout.

**Live URL:** https://lucaphotoart.com
**Sanity Studio:** /studio

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.4 |
| UI | React | 19.2.3 |
| Language | TypeScript (strict mode) | 5.9.3 |
| CMS | Sanity.io | 5.6.0 |
| Styling | Tailwind CSS | 3.4.19 |
| Animations | Framer Motion | 12.29.2 |
| Email | Resend | 6.9.2 |
| Spam Protection | Google reCAPTCHA v3 | - |
| Lightbox | yet-another-react-lightbox | 3.28.0 |
| Grid Layout | react-masonry-css | 1.0.16 |
| Rich Text | @portabletext/react | 6.0.2 |

---

## Routing

```
/                          Homepage
/about                     About page (bio, story, values)
/services                  Service tiers, process, FAQs
/contact                   Contact form with reCAPTCHA
/portfolio                 Portfolio grid with category filtering
/portfolio/[slug]          Individual project detail + gallery
/privacy                   Privacy policy (GDPR compliant)
/terms                     Terms of service
/studio                    Sanity CMS Studio
/api/contact               POST - Contact form submission
```

---

## Rendering Strategy

| Page | Rendering | Reason |
|---|---|---|
| Root layout | Server | Metadata, fonts, JSON-LD structured data |
| Homepage | Client | Sanity data fetching, animations |
| About | Client | Sanity data fetching, image orientation detection |
| Services | Client | Sanity FAQ fetching, animations |
| Contact | Client | Form state, reCAPTCHA integration |
| Portfolio | Client | Category filtering, animated transitions |
| Portfolio/[slug] | Hybrid | Server: generateMetadata for SEO. Client: gallery, lightbox |
| Privacy / Terms | Client | Framer Motion animations |
| robots.ts / sitemap.ts | Server | Static generation |

All client pages follow the same pattern: `useEffect` fetch from Sanity on mount, loading spinner, then render with Framer Motion animations.

---

## Sanity CMS Schemas

### siteSettings (singleton)
Global configuration split into 8 groups:
- **General** — title, logo, description
- **Hero** — heading, tagline, carousel images (each with optional mobile variant + hotspot), stats (events, artists, years, clients)
- **Approach** — 3 images (concert, celebrations, editorial) used on homepage
- **About - County Cork** — location images (max 4), travel images with location labels (max 6)
- **Contact** — email (validated), phone, location string
- **Footer** — services/company/legal link arrays, copyright, designer credit
- **Social Media** — Instagram, Facebook, Twitter, LinkedIn URLs

### portfolioProject
Photography projects displayed in portfolio:
- title, slug (auto-generated, max 96 chars), category (enum)
- Categories: Music, Portrait, Celebrations, Sport, Architecture, Travel, Other
- featuredImage (hotspot, required alt text)
- excerpt, description (PortableText), gallery (images with hotspot, caption, verticalPosition)
- year, client name, tags array
- isFeatured (boolean) — controls homepage visibility
- order (number) — display priority
- seo (metaTitle max 60, metaDescription max 160)

### serviceTier
Photography packages:
- name, tagline, description, price (string, e.g. "From €500")
- features (array, min 3 items)
- ctaText (default: "Get Started")
- isFeatured (marks as "Most Popular"), badge text
- order (required)

### faq
- question, answer (plain text)
- category: General, Booking, Pricing, Delivery, Technical
- page: Services, Contact, Both
- order

### testimonial
- name, role, company, quote
- avatar (image, hotspot), rating (1-5, default 5)
- serviceType: Events & Music, Artists, Venues, Celebrations, General
- featured (homepage toggle), order

### aboutPage (singleton)
- heroImage, heading, introText
- storyParagraphs (array of text blocks)
- approachHeading, approachTagline, approachDescription (PortableText)
- values (max 3, each with title + description)
- seo

---

## Components

### Layout Components
| Component | Type | Used In |
|---|---|---|
| Header.tsx | Client | Root layout (all pages) |
| Footer.tsx | Client | Root layout (all pages) |
| ImageProtection.tsx | Client | Root layout (all pages) |

**Header** — Fixed navigation with smart hide-on-scroll (hides on scroll down, shows on scroll up). Logo hover triggers split-text animation showing full name. Mobile: slide-in drawer from right with spring animation.

**Footer** — Fetches contact info and Instagram URL from Sanity siteSettings. Three-section layout: brand/social, navigation links, copyright/legal.

**ImageProtection** — Renders nothing. Attaches global `contextmenu` and `dragstart` event listeners to prevent right-click saving and image dragging.

### Homepage Components
| Component | Type | Purpose |
|---|---|---|
| HeroCinematic.tsx | Client | Full-screen hero with Sanity image carousel, mobile-aware |
| HeroContent.tsx | Client | Split-text animated intro below hero |
| RecentWork.tsx | Client | Masonry grid of up to 6 featured projects |

**HeroCinematic** — Fetches hero images from siteSettings with hotspot data. Supports separate mobile images (vertical aspect). Uses AnimatePresence for slide transitions with scale/fade effects.

**HeroContent** — Letter-by-letter spring animation for "Event Photographer" heading. Intersection observer triggers animation once on first view. CTAs: "Explore Services" and "View Portfolio".

**RecentWork** — Queries `portfolioProject` where `isFeatured == true`, ordered by `order asc`, limited to 6. Two-column masonry (1 on mobile). Hotspot-aware image URLs. Hover: scale 1.05x + gradient overlay.

### Service Components
| Component | Type | Purpose |
|---|---|---|
| ServiceTiers.tsx | Client | Pricing tier comparison cards |
| ServiceCard.tsx | Server | Reusable service offering card |

**ServiceTiers** — Fetches from Sanity with hardcoded fallback (The Capture €200, The Identity €500+, The Full Story €1,200+). Featured tier renders larger with accent border. Staggered reveal animation.

### Gallery Components
| Component | Type | Purpose |
|---|---|---|
| GalleryGrid.tsx | Client | Masonry gallery with built-in lightbox |

**GalleryGrid** — Click-to-open lightbox with previous/next arrows. Body scroll lock when open. Configurable column counts per breakpoint. Used as fallback; main gallery in ProjectDetailClient uses yet-another-react-lightbox.

### Other
| Component | Type | Purpose |
|---|---|---|
| ClientLogos.tsx | Client | Partner/client logo grid (6 items) |

---

## Data Fetching Pattern

Every client page follows this pattern:

```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetch = async () => {
    try {
      const result = await client.fetch(GROQ_QUERY);
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  fetch();
}, []);
```

No server-side data fetching (getServerSideProps/getStaticProps) is used. All pages are client-rendered with Sanity CDN queries.

**Exception:** `portfolio/[slug]/page.tsx` uses `generateMetadata()` for server-side SEO metadata generation.

---

## Gallery Layout Algorithm

`ProjectDetailClient.tsx` uses a custom algorithm to arrange gallery images:

1. **Two vertical images in sequence** — Side-by-side in equal 50/50 split
2. **Vertical followed by horizontal** — 35% vertical / 65% horizontal (or reversed via `verticalPosition` field)
3. **Single vertical image** — Full width
4. **Single horizontal image** — Full width

The algorithm iterates through the gallery array, consuming 1 or 2 images per row depending on orientation. Image dimensions are read from Sanity asset metadata.

---

## API: Contact Form

**POST /api/contact**

Processing pipeline:
1. Validate `RESEND_API_KEY` environment variable exists
2. Check reCAPTCHA token is present in request body
3. Verify token with Google (`https://www.google.com/recaptcha/api/siteverify`)
4. Reject if score < 0.5 (spam)
5. Validate required fields: name, email, message
6. Validate email format via regex
7. Send email via Resend:
   - From: `LG Photography <noreply@lucaphotoart.com>`
   - To: `info@lucaphotoart.com`
   - Reply-To: sender's email
   - Subject: `New enquiry from {name} — {service}`

Returns `{ success: true }` on success, appropriate 400/500 errors otherwise.

---

## Middleware

`middleware.ts` implements in-memory rate limiting on all `/api/` routes:

- **Window:** 60 seconds
- **Limit:** 60 requests per IP per minute
- **Storage:** In-memory Map (resets on server restart)
- **Headers:** X-RateLimit-Limit, X-RateLimit-Remaining
- **429 response** with Retry-After: 60

IP extracted from `x-forwarded-for` header, falling back to `'anonymous'`.

---

## Security

### HTTP Headers (next.config.ts)
- HSTS: 2-year max-age with includeSubDomains and preload
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy: camera, microphone, geolocation, browsing-topics all disabled

### Content Security Policy
- Scripts: self + unsafe-inline/eval + cdn.sanity.io + Google (reCAPTCHA)
- Styles: self + unsafe-inline + fonts.googleapis.com
- Images: self + data + blob + https + cdn.sanity.io + images.unsplash.com
- Fonts: self + fonts.gstatic.com
- Connections: self + Sanity API
- Frames: self + Google

### Client-Side
- Right-click disabled globally (ImageProtection component)
- Image dragging disabled on all img elements
- reCAPTCHA badge hidden via CSS (`visibility: hidden`)

---

## Image Optimisation

### Next.js Config
- Formats: AVIF with WebP fallback
- Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048, 3840
- Remote patterns: cdn.sanity.io, images.unsplash.com

### Sanity Image Pipeline
All images pass through `urlFor()` which chains:
- `.width()` / `.height()` — resize
- `.fit('crop')` — crop mode
- `.auto('format')` — auto AVIF/WebP
- `.quality(90)` — quality level (75 for thumbnails)
- `.focalPoint(x, y)` — hotspot-based cropping

Typical sizes used:
- Portfolio grid: 800x800 or 800x600
- Project detail hero: 2400px wide
- Gallery images: 700-1400px wide
- Lightbox: 2000px wide at quality 95
- Related projects: 600x750

---

## Design System

### Colour Palette (tailwind.config.ts)
```
Background:     #121212 (bg), #1a1a1a (elevated), #1f1f1f (card), #242424 (hover)
Text:           #d4d4d4 (primary), #999999 (light), #666666 (muted)
Accent:         #7c98b3 (primary), #a0b8ce (light), #5d7a94 (dark)
Borders:        #2a2a2a (default), #353535 (light)
```

### Typography
- **Display font:** Cormorant Garamond (weights 300-600, normal + italic)
- **Body font:** Inter (weight 400)
- Fluid sizing via `clamp()`: h1 2-4rem, h2 1.75-3rem, h3 1.5-2.25rem, body 14-16px

### Spacing
- Section padding: `clamp(80px, 12vw, 140px)` vertical
- Container max-width: 1400px (custom), 900px (narrow)
- Responsive padding: 20px mobile, 40px tablet, 80px desktop

### Utility Classes (globals.css)
- `.btn-primary` / `.btn-secondary` — button styles with 48px min-height
- `.tap-target` — 44x44px minimum touch area
- `.glass` / `.glass-light` — backdrop blur effects
- `.shadow-cinematic` / `.shadow-soft` — depth shadows
- `.gradient-overlay` — dark bottom gradient for image overlays
- `.text-gradient` — background-clip gradient text
- `.fade-in` / `.slide-up` — CSS animations

### Scrollbar
Desktop only (1025px+): custom scrollbar with 12px width, dark track, accent-dark thumb on hover.

---

## SEO

### Metadata (layout.tsx)
- Title template: `%s | LG Photography`
- Default title targets "Event Photographer Cork"
- Keywords: event/concert/wedding/music/festival photographer Cork/Ireland
- Open Graph: website type, locale en_IE
- Twitter: summary_large_image

### Structured Data (JSON-LD)
- Types: LocalBusiness + Photographer
- Location: Cork, Ireland (51.8985, -8.4756)
- Area served: Cork, Ireland, Europe
- Price range: €€

### Dynamic Generation
- `robots.ts` — allows all, disallows /studio/ and /api/, points to sitemap
- `sitemap.ts` — fetches all portfolio slugs from Sanity, generates URLs with priorities (homepage 1.0, portfolio 0.9, services/about/contact 0.8, projects 0.7, legal 0.3)

### Per-Page Metadata
- About: "About Luca Gargiulo | Event Photographer Cork, Ireland"
- Services: "Photography Services & Packages | Cork, Ireland"
- Contact: "Contact | Hire an Event Photographer in Cork, Ireland"
- Portfolio: "Portfolio | Event Photographer Cork, Ireland"
- Portfolio/[slug]: Dynamic from Sanity seo fields

---

## Animation Patterns

All animations use Framer Motion with consistent patterns:

- **Scroll-triggered:** `whileInView` with `viewport={{ once: true }}` — fires once per element
- **Staggered children:** Container with `staggerChildren: 0.1-0.2` delay
- **Standard entrance:** `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}`
- **Duration:** 0.6-0.8s for most elements
- **Image hover:** `group-hover:scale-105` or `scale-110` with 700ms CSS transition
- **Spring physics:** Used in Header split-text (damping: 12, stiffness: 200)
- **Page transitions:** AnimatePresence with `mode="wait"` for category filter changes

---

## Sanity Client Configuration

Two client files exist:

1. **lib/sanity.ts** — Hardcoded project ID (`1k4vjjoe`). Used by most components.
2. **lib/sanity/client.ts** — Environment variable based. Used by newer code.

Both use: dataset `production`, API version `2024-01-01`, CDN enabled.

Image URL builder available via `urlFor()` from both locations.

---

## Legal Pages

### Privacy Policy
GDPR and Irish law compliant. Covers:
- Data collected (contact, event details, photos, analytics)
- Retention: inquiries 6-12 months, client data 6 years (Irish tax), photos indefinitely, analytics 26 months
- 7 GDPR rights enumerated
- DPC complaint information (Dublin)

### Terms of Service
- Payment: 30% non-refundable deposit, balance 7 days before event
- Cancellation tiers: >90 days (deposit transferable), 30-90 days (50%), <30 days (100%)
- Copyright: photographer retains, client gets license for personal/social/commercial use
- Delivery: The Capture (1 week), The Identity (2 weeks), The Full Story (3 weeks)
- 90-day digital gallery access
- No RAW files in standard packages

---

## File Map

```
app/
  layout.tsx              Root layout: fonts, metadata, JSON-LD, Header/Footer
  page.tsx                Homepage: hero, recent work, approach, partner, CTA
  globals.css             Design tokens, utility classes, animations
  robots.ts               Dynamic robots.txt
  sitemap.ts              Dynamic sitemap from Sanity
  about/page.tsx          Bio, Cork/travel galleries, values
  services/page.tsx       ServiceTiers component, 5-step process, FAQs
  contact/page.tsx        Form with reCAPTCHA, contact info, FAQs
  portfolio/page.tsx      Category-filtered grid of all projects
  portfolio/[slug]/
    page.tsx              Server metadata generation
    ProjectDetailClient.tsx  Full project detail with gallery + lightbox
  privacy/page.tsx        GDPR privacy policy
  terms/page.tsx          Terms of service
  api/contact/route.ts    POST endpoint: reCAPTCHA verify + Resend email
  studio/
    layout.tsx            Minimal passthrough
    [[...tool]]/page.tsx  Sanity Studio

components/
  Header.tsx              Smart-scroll nav with mobile drawer
  Footer.tsx              Contact info from Sanity, nav links
  Hero.tsx                Static carousel hero (legacy, replaced by HeroCinematic)
  HeroCinematic.tsx       Sanity-driven hero with mobile support
  HeroContent.tsx         Split-text animated intro section
  RecentWork.tsx          Featured projects masonry grid
  ServiceCard.tsx         Service offering card (server component)
  ServiceTiers.tsx        Pricing comparison with Sanity fallback
  GalleryGrid.tsx         Masonry gallery with built-in lightbox
  ClientLogos.tsx         Partner logo grid
  ImageProtection.tsx     Right-click and drag prevention

lib/
  sanity.ts               Sanity client (hardcoded project ID)
  sanity/client.ts        Sanity client (env-based)
  sanity/image.ts         Image URL builder utility

sanity/
  config.ts               Studio configuration
  cli.ts                  CLI configuration
  schemas/index.ts        Schema exports
  schemas/siteSettings.ts Site-wide configuration (421 lines)
  schemas/portfolioProject.ts  Photography projects
  schemas/serviceTier.ts  Pricing packages
  schemas/aboutPage.ts    About page content
  schemas/testimonial.ts  Client reviews
  schemas/faq.ts          FAQ entries

middleware.ts             Rate limiting (60 req/min/IP)
next.config.ts            Image optimisation, security headers, CSP
tailwind.config.ts        Dark theme, fonts, custom shadows
tsconfig.json             Strict TS, path alias @/*
postcss.config.mjs        Tailwind + autoprefixer
```
