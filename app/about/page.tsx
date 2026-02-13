'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { client, urlFor } from '@/lib/sanity';

interface SiteSettings {
  whereILiveImages?: any[];
  whereITravelImages?: any[];
}

interface AboutPageData {
  heroImage?: any;
  heading?: string;
  introText?: string;
  storyParagraphs?: Array<{ text: string }>;
  values?: Array<{ title: string; description: string }>;
}

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [whereILiveRef, whereILiveInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [whereITravelRef, whereITravelInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [aboutPageData, setAboutPageData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveImageOrientations, setLiveImageOrientations] = useState<{ [key: string]: 'portrait' | 'landscape' }>({});
  const [travelImageOrientations, setTravelImageOrientations] = useState<{ [key: string]: 'portrait' | 'landscape' }>({});

  // Function to detect image orientation
  const detectImageOrientation = (
    imageUrl: string,
    imageId: string,
    type: 'live' | 'travel'
  ) => {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.onload = () => {
      const orientation = img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait';
      if (type === 'live') {
        setLiveImageOrientations(prev => ({ ...prev, [imageId]: orientation }));
      } else {
        setTravelImageOrientations(prev => ({ ...prev, [imageId]: orientation }));
      }
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch site settings for images
        const settings = await client.fetch(
          `*[_type == "siteSettings"][0] {
            whereILiveImages[] {
              asset->{
                _id,
                url
              },
              hotspot,
              crop,
              alt
            },
            whereITravelImages[] {
              asset->{
                _id,
                url
              },
              hotspot,
              crop,
              alt,
              location
            }
          }`
        );
        setSiteSettings(settings);

        // Fetch about page content
        const aboutData = await client.fetch(
          `*[_type == "aboutPage"][0] {
            heroImage {
              asset->{
                _id,
                url
              },
              hotspot,
              crop,
              alt
            },
            heading,
            introText,
            storyParagraphs[] {
              text
            },
            values[] {
              title,
              description
            }
          }`
        );
        setAboutPageData(aboutData);
      } catch {
        // Silently fail - page works without Sanity data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Detect image orientations when settings are loaded
  useEffect(() => {
    if (siteSettings?.whereILiveImages) {
      siteSettings.whereILiveImages.forEach((image: any) => {
        const imageUrl = urlFor(image).width(800).auto('format').url();
        detectImageOrientation(imageUrl, image.asset._id, 'live');
      });
    }
    if (siteSettings?.whereITravelImages) {
      siteSettings.whereITravelImages.forEach((image: any) => {
        const imageUrl = urlFor(image).width(800).auto('format').url();
        detectImageOrientation(imageUrl, image.asset._id, 'travel');
      });
    }
  }, [siteSettings]);

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
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="section-padding bg-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative aspect-square bg-bg-card overflow-hidden"
            >
              {aboutPageData?.heroImage ? (
                <Image
                  src={urlFor(aboutPageData.heroImage).width(800).auto('format').quality(90).url()}
                  alt={aboutPageData.heroImage.alt || 'Luca Gargiulo - Photographer'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-bg-elevated">
                  <p className="text-text-light">Hero image not available</p>
                </div>
              )}
              <div className="absolute inset-0 gradient-overlay opacity-30" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                {aboutPageData?.heading || "Hi, I'm Luca."}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="text-responsive-lg text-text-light mb-6"
              >
                {aboutPageData?.introText ||
                  "A photographer based in Cork, Ireland, originally from Sorrento on Italy's Amalfi Coast."}
              </motion.p>
              {aboutPageData?.storyParagraphs && aboutPageData.storyParagraphs.length > 0 ? (
                aboutPageData.storyParagraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-text mb-4"
                  >
                    {paragraph.text}
                  </motion.p>
                ))
              ) : (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                    className="text-text mb-4"
                  >
                    Growing up by the sea in Sorrento, surrounded by Mediterranean light and the colours of the Amalfi Coast, I developed an eye for beauty in everyday moments. That sense of wonder stuck with me — it's in everything I shoot.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-text mb-4"
                  >
                    My photography journey started when I moved to Prague in 2021. There's something about
                    chasing the perfect shot in a new city that got me hooked. Now based in Ireland, I'm
                    exploring everything from dramatic coastlines to the energy of live events.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9 }}
                    className="text-text mb-4"
                  >
                    By day, I work remotely as a software developer, which gives me the freedom to travel
                    and shoot wherever the next story takes me. I love capturing real moments — the split
                    second when everything comes together, whether it's a crowd at a gig or a portrait
                    session by the coast.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.0 }}
                    className="text-text mb-8"
                  >
                    No forced poses, no over-produced setups. Just something genuine that tells a story.
                  </motion.p>
                </>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
                className="mt-10 text-center"
              >
                <Link href="/contact" className="btn-primary">
                  Let's Work Together
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Where I Live Section */}
      <section ref={whereILiveRef} className="section-padding bg-bg-elevated">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whereILiveInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Where I Live</h2>
            <p className="text-responsive-lg text-text-light max-w-2xl mx-auto">
              Based in County Cork, Ireland—where dramatic coastlines meet vibrant culture
            </p>
          </motion.div>

          {siteSettings?.whereILiveImages && siteSettings.whereILiveImages.length > 0 && (
            <>
              <div className="flex flex-wrap gap-4">
                {siteSettings.whereILiveImages.map((image: any, index: number) => {
                  const orientation = liveImageOrientations[image.asset._id];
                  const widthClass = orientation === 'portrait'
                    ? 'w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]'
                    : 'w-full sm:w-[calc(50%-8px)] lg:w-[calc(50%-12px)]';
                  const aspectClass = orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]';

                  return (
                    <motion.div
                      key={image.asset._id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={whereILiveInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className={`relative ${aspectClass} ${widthClass} overflow-hidden bg-bg-card group`}
                    >
                      <Image
                        src={urlFor(image).width(600).auto('format').quality(90).url()}
                        alt={image.alt || 'County Cork'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <Link href="/portfolio/cork" className="btn-secondary">
                  View All Photos
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Where I Travel Section */}
      <section ref={whereITravelRef} className="section-padding bg-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whereITravelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Where I Travel</h2>
            <p className="text-responsive-lg text-text-light max-w-2xl mx-auto">
              Always seeking new perspectives—from European cities to hidden gems around the world
            </p>
          </motion.div>

          {siteSettings?.whereITravelImages && siteSettings.whereITravelImages.length > 0 && (
            <>
              <div className="flex flex-wrap gap-4">
                {siteSettings.whereITravelImages.map((image: any, index: number) => {
                  const orientation = travelImageOrientations[image.asset._id];
                  const widthClass = orientation === 'portrait'
                    ? 'w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]'
                    : 'w-full sm:w-[calc(50%-8px)] lg:w-[calc(50%-12px)]';
                  const aspectClass = orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]';

                  return (
                    <motion.div
                      key={image.asset._id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={whereITravelInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className={`relative ${aspectClass} ${widthClass} overflow-hidden bg-bg-card group`}
                    >
                      <Image
                        src={urlFor(image).width(800).auto('format').quality(90).url()}
                        alt={image.alt || image.location || 'Travel photo'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {image.location && (
                        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-white text-lg font-display">{image.location}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <Link href="/portfolio/london-street-photography" className="btn-secondary">
                  View All Photos
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="section-padding bg-bg-elevated">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Core Values</h2>
            <p className="text-responsive-lg text-text-light max-w-2xl mx-auto">
              The principles that guide every project I take on
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(aboutPageData?.values && aboutPageData.values.length > 0
              ? aboutPageData.values
              : [
                  {
                    title: 'Authenticity',
                    description: 'Capturing genuine moments and real emotions, not staged perfection.',
                  },
                  {
                    title: 'Excellence',
                    description:
                      'Professional equipment, refined techniques, and unwavering attention to detail.',
                  },
                  {
                    title: 'Partnership',
                    description: 'Collaborative approach ensuring your vision comes to life.',
                  },
                ]
            ).map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="glass-light p-8 text-center"
              >
                <h3 className="text-2xl font-display text-accent mb-4">{value.title}</h3>
                <p className="text-text-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-bg">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Ready to Start?</h2>
            <p className="text-responsive-lg text-text-light mb-8 max-w-xl mx-auto">
              Let's discuss your project and create something memorable together.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-primary">
                Get In Touch
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
