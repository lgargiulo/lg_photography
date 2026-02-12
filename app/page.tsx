'use client';

import { useState, useEffect } from 'react';
import HeroCinematic from '@/components/HeroCinematic';
import HeroContent from '@/components/HeroContent';
import RecentWork from '@/components/RecentWork';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { client, urlFor } from '@/lib/sanity';

interface SiteSettings {
  approachConcertImage?: any;
  approachWeddingImage?: any;
  approachEditorialImage?: any;
}

export default function HomePage() {
  const [approachRef, approachInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const settings = await client.fetch(
          `*[_type == "siteSettings"][0] {
            approachConcertImage {
              asset->{
                _id,
                url
              },
              hotspot,
              crop,
              alt
            },
            approachWeddingImage {
              asset->{
                _id,
                url
              },
              hotspot,
              crop,
              alt
            },
            approachEditorialImage {
              asset->{
                _id,
                url
              },
              hotspot,
              crop,
              alt
            }
          }`
        );
        setSiteSettings(settings);
      } catch {
        // Silently fail - page works without Sanity images
      } finally {
        setLoading(false);
      }
    };

    fetchSiteSettings();
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent mb-4"></div>
          <p className="text-text-light">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <HeroCinematic />

      {/* Hero Content Section */}
      <HeroContent />

      {/* Recent Work Section */}
      <RecentWork />

      {/* My Approach Section - Horizontal 3 Points */}
      <section className="section-padding bg-bg-elevated">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-light text-white mb-6">
              My approach
            </h2>
            <p className="text-xl text-text-light leading-relaxed max-w-2xl mx-auto">
              Capturing stories across Ireland and Europe—from Cork's intimate venues to festival main stages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-accent text-accent text-xl">
                01
              </div>
              <h3 className="text-2xl font-display font-light text-white mb-4">
                Every moment matters
              </h3>
              <p className="text-text-light">
                From intimate weddings to explosive festival stages
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-accent text-accent text-xl">
                02
              </div>
              <h3 className="text-2xl font-display font-light text-white mb-4">
                Real over perfect
              </h3>
              <p className="text-text-light">
                Authentic storytelling, not posed perfection
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-accent text-accent text-xl">
                03
              </div>
              <h3 className="text-2xl font-display font-light text-white mb-4">
                Your vision, my craft
              </h3>
              <p className="text-text-light">
                Collaborative approach—I bring precision, you bring the story
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Official Partner Section - Editorial Layout */}
      <section ref={approachRef} className="section-padding bg-bg relative overflow-hidden">
        {/* Subtle Geometric Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-40 right-20 w-96 h-96 border border-accent rotate-12" />
        </div>

        <div className="container-custom">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column - Official Photographer Statement */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={approachInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-16 flex flex-col justify-center"
            >
              {/* Large Hero Text */}
              <div>
                <div className="relative inline-block mb-8">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-accent" />
                  <h2 className="text-4xl md:text-5xl font-display font-light text-white leading-tight tracking-tight">
                    Official Partner
                  </h2>
                </div>
                <p className="text-xl text-text-light leading-relaxed mb-8">
                  Proud to collaborate with Ireland's leading cultural events
                </p>

                {/* An Oíche Cork Feature */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={approachInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-display font-light text-white mb-3">
                    An Oíche Cork
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    Cork's premier celebration of Irish music, culture, and community.
                    Capturing the energy and authenticity of live performances that bring
                    together local and international talent.
                  </p>
                  <a
                    href="https://www.anoichecork.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all mt-4 cursor-pointer relative z-10"
                  >
                    <span className="text-sm uppercase tracking-wider">Visit An Oíche Cork Website</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </motion.div>
              </div>

              {/* Supporting Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={approachInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="border-l-2 border-accent pl-6"
              >
                <p className="text-text-light leading-relaxed">
                  As the official photographer, I document the moments that make each
                  event unforgettable—from intimate acoustic sessions to packed venues
                  alive with traditional Irish music.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={approachInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 -mt-4"
            >
              <Link href="/portfolio/an-oiche-cork" className="block">
                <div className="grid grid-cols-2 gap-6 auto-rows-[175px]">
                  {/* Large Concert Image */}
                  <div className="col-span-2 row-span-2 relative overflow-hidden bg-bg-card group">
                    {siteSettings?.approachConcertImage?.asset ? (
                      <Image
                        src={urlFor(siteSettings.approachConcertImage).width(1200).height(680).auto('format').quality(90).url()}
                        alt={siteSettings.approachConcertImage.alt || 'Concert photography'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-bg-elevated">
                        <p className="text-text-light text-sm">Image not available</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Celebrations Image */}
                  <div className="col-span-1 row-span-1 relative overflow-hidden bg-bg-card group">
                    {siteSettings?.approachWeddingImage?.asset ? (
                      <Image
                        src={urlFor(siteSettings.approachWeddingImage).width(600).height(340).auto('format').quality(90).url()}
                        alt={siteSettings.approachWeddingImage.alt || 'Celebrations photography'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-bg-elevated">
                        <p className="text-text-light text-sm">Image not available</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Portrait/Editorial Image */}
                  <div className="col-span-1 row-span-1 relative overflow-hidden bg-bg-card group">
                    {siteSettings?.approachEditorialImage?.asset ? (
                      <Image
                        src={urlFor(siteSettings.approachEditorialImage).width(600).height(340).auto('format').quality(90).url()}
                        alt={siteSettings.approachEditorialImage.alt || 'Editorial photography'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-bg-elevated">
                        <p className="text-text-light text-sm">Image not available</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>

          {/* View All Link at Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={approachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16 relative z-10"
          >
            <Link
              href="/portfolio/an-oiche-cork"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors group"
            >
              <span className="text-sm uppercase tracking-wider">View Project</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="section-padding bg-bg-elevated">
        <div className="container-narrow text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            Let's Create Something Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-responsive-lg text-[var(--color-text-light)] mb-8 max-w-xl mx-auto"
          >
            Whether it's a festival, a wedding day, or your next campaign—let's talk about
            bringing your vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link href="/contact" className="btn-primary">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
