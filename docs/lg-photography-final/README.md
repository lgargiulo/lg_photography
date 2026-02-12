# LG Photography Website

A complete, production-ready photography portfolio website built for Luca Gargiulo Photography.

## 📁 File Structure

```
lg-photography-final/
├── css/
│   └── styles.css          # Complete stylesheet
├── images/                  # Add your images here
│   ├── favicon-32x32.png
│   ├── favicon-16x16.png
│   ├── apple-touch-icon.png
│   └── og-image.jpg        # Social sharing image (1200x630)
├── index.html              # Homepage
├── events.html             # Events & Music portfolio
├── artists.html            # Artist press shots portfolio
├── venues.html             # Venue photography portfolio
├── weddings.html           # Weddings & portraits portfolio
├── about.html              # About page
├── contact.html            # Contact form
├── blog.html               # Blog listing
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
└── README.md               # This file
```

## 🖼️ Replacing Placeholder Images

All placeholder images are from Unsplash and marked with `<!-- REPLACE -->` comments. Here's what you need:

### Hero Images (Homepage)
- **Location:** `index.html` - `.hero__slide` elements
- **Size:** 1920x1080px minimum (landscape)
- **Count:** 3-4 images for slideshow
- **Content:** Your best concert/event shots

### Service Cards (All Pages)
- **Size:** 800x1000px (portrait, 4:5 ratio)
- **Content:** Representative image for each service

### Gallery Images
- **Regular:** 600x400px
- **Tall:** 600x800px (for `gallery-item--tall`)
- **Wide:** 1200x400px (for `gallery-item--wide`)
- **Format:** JPG, optimized for web (aim for <200KB each)

### Portrait/About Photo
- **Size:** 600x800px (3:4 ratio)
- **Content:** Professional headshot

### Testimonial Avatars
- **Size:** 100x100px (square, will be rounded)
- **Content:** Client photos (with permission)

### To Replace Images:
1. Find `<!-- REPLACE -->` comments in HTML files
2. Update the `src` or `style="background-image: url('...')"` attributes
3. Use relative paths like `images/your-image.jpg`
4. Update `alt` text for accessibility/SEO

## ⚙️ Configuration Required

### 1. Contact Form Setup
The contact form needs a backend. Choose one:

**Option A: Formspree (Recommended)**
1. Go to [formspree.io](https://formspree.io)
2. Create account & new form
3. Replace `YOUR_FORM_ID` in `contact.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

**Option B: Netlify Forms (if hosting on Netlify)**
Add these attributes to the form tag:
```html
<form name="contact" method="POST" data-netlify="true">
```

### 2. Email Address
Search and replace `hello@lucaphotoart.com` with your actual email.

### 3. Domain
Search and replace `lucaphotoart.com` with your domain for:
- Canonical URLs
- Structured data
- Open Graph URLs

### 4. Social Media
Update Instagram URL in footer and contact page:
```html
<a href="https://instagram.com/YOUR_USERNAME">
```

### 5. Google Analytics (Optional)
Add before `</head>` in each HTML file:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_ID');
</script>
```

## 🚀 Deployment Options

### Option 1: Netlify (Recommended - Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag & drop the entire `lg-photography-final` folder
3. Configure custom domain in settings

### Option 2: Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import project or drag & drop
3. Configure domain

### Option 3: GitHub Pages (Free)
1. Create repository
2. Push files
3. Enable Pages in repository settings

### Option 4: Traditional Hosting
1. Upload via FTP to your hosting provider
2. Ensure files are in public_html or www folder

## 📝 Content to Customize

### Homepage (`index.html`)
- [ ] Hero tagline and description
- [ ] Service descriptions
- [ ] About preview text
- [ ] Testimonial quote and attribution
- [ ] Stats (events shot, artists, etc.)

### About Page (`about.html`)
- [ ] Your bio and story
- [ ] Gear list (if you want to keep it)
- [ ] Approach/philosophy section

### Contact Page (`contact.html`)
- [ ] FAQ answers
- [ ] Response time
- [ ] Contact details

### Legal Pages
- [ ] Review and customize privacy policy
- [ ] Review and customize terms of service
- [ ] Consider consulting a lawyer for your jurisdiction

## 🎨 Customizing Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --color-bg: #050505;           /* Main background */
    --color-accent: #c9a227;       /* Gold accent */
    --color-accent-light: #dbb642; /* Lighter gold */
    --color-text: #d4d4d4;         /* Body text */
    --color-white: #ffffff;        /* Headings */
}
```

## 📱 Features Included

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark moody theme
- ✅ SEO optimized with structured data
- ✅ Open Graph & Twitter cards
- ✅ Scroll animations
- ✅ Mobile navigation menu
- ✅ Contact form with validation
- ✅ Gallery grid layouts
- ✅ GDPR-compliant privacy policy template

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📞 Support

If you need help customizing the site, reach out to your developer or the original creator.

---

Built with ❤️ for LG Photography
