'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { client } from '@/lib/sanity';

interface Tier {
  name: string;
  tagline: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
  featured: boolean;
  badge?: string;
}

const fallbackTiers: Tier[] = [
  {
    name: 'The Capture',
    tagline: 'Portrait Session',
    description: 'Affordable portraits for artists, brands, couples, or individuals',
    price: '€200',
    features: [
      '1 hour session',
      '30+ edited high-resolution images',
      'Personal usage rights',
      '1-week delivery',
    ],
    cta: 'Get Started',
    href: '/contact',
    featured: false,
  },
  {
    name: 'The Identity',
    tagline: 'Half-Day Coverage',
    description: '3 hours for any event, concert, or ceremony-only wedding',
    price: 'From €500',
    features: [
      'Up to 3 hours coverage',
      '100+ edited high-resolution images',
      'Commercial usage rights',
      '2-week delivery',
    ],
    cta: 'Book Now',
    href: '/contact',
    featured: true,
  },
  {
    name: 'The Full Story',
    tagline: 'Full-Day Coverage',
    description: 'Full-day coverage for weddings, festivals, or all-day events',
    price: 'From €1,200',
    features: [
      'Full day coverage (8 hours)',
      '300+ edited high-resolution images',
      'Commercial usage rights',
      '3-week delivery',
    ],
    cta: 'Get Started',
    href: '/contact',
    featured: false,
  },
];

export default function ServiceTiers() {
  const [tiers, setTiers] = useState<Tier[]>(fallbackTiers);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    client.fetch(
      `*[_type == "serviceTier"] | order(order asc) {
        name,
        tagline,
        description,
        price,
        features,
        "cta": coalesce(ctaText, "Get Started"),
        "featured": coalesce(isFeatured, false),
        badge
      }`
    ).then((data: any[]) => {
      if (data && data.length > 0) {
        setTiers(data.map((t) => ({
          ...t,
          href: '/contact',
        })));
      }
    }).catch(() => {});
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section ref={ref} className="section-padding bg-bg-elevated">
      <div className="container-custom">
        {/* Tiers Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={item}
              className={`relative group ${
                tier.featured
                  ? 'lg:-mt-8 lg:mb-8'
                  : ''
              }`}
            >
              <div
                className={`h-full glass-light rounded-none p-8 md:p-10 transition-all duration-500 ${
                  tier.featured
                    ? 'border-accent shadow-cinematic'
                    : 'border-border-light hover:border-accent/50'
                } border-2`}
              >
                {/* Featured/Badge */}
                {(tier.featured || tier.badge) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  >
                    <span className="px-4 py-1 bg-accent text-bg text-xs font-bold uppercase tracking-wider">
                      {tier.badge || 'Most Popular'}
                    </span>
                  </motion.div>
                )}

                {/* Tier Header */}
                <div className="text-center mb-8">
                  <h3
                    className={`text-2xl md:text-3xl font-display mb-2 ${
                      tier.featured ? 'text-accent' : 'text-white'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-sm text-text-light uppercase tracking-wider mb-4">
                    {tier.tagline}
                  </p>
                  <p className="text-text mb-6">{tier.description}</p>
                  <div className="text-4xl font-display font-light text-white">
                    {tier.price}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 text-text-light"
                    >
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          tier.featured ? 'text-accent' : 'text-text'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={tier.href}
                  className={`block w-full text-center py-3 px-6 rounded-none font-medium uppercase tracking-wider transition-all duration-300 ${
                    tier.featured
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 rounded-none transition-opacity duration-500 pointer-events-none ${
                  tier.featured ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
                }`}
                style={{
                  background:
                    'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(201,162,39,0.2), transparent 40%)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5 }}
          className="text-center mt-16"
        >
          <p className="text-text-light mb-6">
            Not sure which tier is right for you?
          </p>
          <Link
            href="/contact"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Let's Discuss Your Needs
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
