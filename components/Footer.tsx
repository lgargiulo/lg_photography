'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';

interface FooterSettings {
  contactEmail?: string;
  location?: string;
  socialMedia?: {
    instagram?: string;
  };
}

const footerNavigation = {
  services: [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Venue Photography', href: '/venues' },
    { name: 'Celebrations & Portraits', href: '/weddings' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<FooterSettings | null>(null);

  useEffect(() => {
    client.fetch(
      `*[_type == "siteSettings"][0] {
        contactEmail,
        location,
        socialMedia { instagram }
      }`
    ).then(setSettings).catch(console.error);
  }, []);

  return (
    <footer className="bg-bg border-t border-border/50">
      <div className="container-custom py-8 md:py-10">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-6">
          {/* Left: Brand & Social */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="h-8 w-8 relative flex-shrink-0">
                <Image
                  src="/images/lgLogo.png"
                  alt="Luca G Photography Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-display font-light text-white">
                Luca Gargiulo Photography
              </span>
            </Link>
            {settings?.socialMedia?.instagram && (
              <a
                href={settings.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border-light text-text-muted hover:border-accent hover:text-accent transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
          </div>

          {/* Right: Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {footerNavigation.services.slice(0, 1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-light hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {footerNavigation.company.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-light hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {settings?.contactEmail && (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-text-light hover:text-accent transition-colors"
              >
                {settings.contactEmail}
              </a>
            )}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-border/50 flex justify-between items-center text-xs text-text-muted">
          <p>© {currentYear} Luca Gargiulo Photography</p>
          <p>Designed by Luca Gargiulo</p>
          <div className="flex gap-4">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
