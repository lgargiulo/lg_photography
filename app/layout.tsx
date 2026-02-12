import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lucaphotoart.com'),
  title: {
    default: 'Event Photographer Cork | Concerts, Weddings & Live Music | LG Photography',
    template: '%s | LG Photography',
  },
  description:
    'Event photographer in Cork, Ireland. Covering concerts, weddings, festivals, and live events across Ireland and Europe. Book your event photographer today.',
  keywords: [
    'event photographer cork',
    'event photographer ireland',
    'concert photographer cork',
    'wedding photographer cork',
    'music photographer ireland',
    'festival photographer ireland',
    'live event photography cork',
    'photographer cork ireland',
    'event photographer europe',
    'gig photographer cork',
  ],
  authors: [{ name: 'Luca Gargiulo' }],
  creator: 'Luca Gargiulo',
  publisher: 'LG Photography',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://lucaphotoart.com',
    siteName: 'LG Photography',
    title: 'Event Photographer Cork | Concerts, Weddings & Live Music | LG Photography',
    description:
      'Event photographer in Cork, Ireland. Covering concerts, weddings, festivals, and live events across Ireland and Europe.',
    images: [
      {
        url: '/images/lgLogo.png',
        width: 900,
        height: 900,
        alt: 'LG Photography - Professional Event & Music Photography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event & Concert Photographer Cork | Weddings & Live Music',
    description:
      'Event and concert photographer in Cork, Ireland. Covering live music, festivals, weddings, and celebrations across Ireland and Europe.',
    images: ['/images/lgLogo.png'],
  },
  alternates: {
    canonical: 'https://lucaphotoart.com',
  },
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <meta name="geo.region" content="IE-CO" />
        <meta name="geo.placename" content="Cork" />
        <meta name="geo.position" content="51.8985;-8.4756" />
        <meta name="ICBM" content="51.8985, -8.4756" />
        <link rel="icon" href="/images/lgLogo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/lgLogo.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LocalBusiness', 'Photographer'],
              name: 'Luca Gargiulo Photography',
              url: 'https://lucaphotoart.com',
              logo: 'https://lucaphotoart.com/images/lgLogo.png',
              image: 'https://lucaphotoart.com/images/lgLogo.png',
              description:
                'Event photographer in Cork, Ireland. Covering concerts, weddings, festivals, and live events across Ireland and Europe.',
              email: 'info@lucaphotoart.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cork',
                addressCountry: 'IE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 51.8985,
                longitude: -8.4756,
              },
              areaServed: [
                { '@type': 'City', name: 'Cork' },
                { '@type': 'Country', name: 'Ireland' },
                { '@type': 'Continent', name: 'Europe' },
              ],
              priceRange: '€€',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '00:00',
                closes: '23:59',
              },
              sameAs: ['https://instagram.com/lucaphotoart_'],
              knowsAbout: [
                'Event Photography',
                'Music Photography',
                'Concert Photography',
                'Wedding Photography',
                'Portrait Photography',
                'Festival Photography',
                'Corporate Event Photography',
              ],
            }),
          }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6Lffm2ksAAAAAPIACUBb0XlPfCBbxs66GrdPNUL3"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
