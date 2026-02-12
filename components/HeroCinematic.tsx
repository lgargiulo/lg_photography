'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { client, urlFor } from '@/lib/sanity';

interface HeroImageData {
  url: string;
  alt: string;
  objectPosition: string;
  mobileUrl: string | null;
  mobileObjectPosition: string;
}

export default function HeroCinematic() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroImages, setHeroImages] = useState<HeroImageData[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Fetch hero images from Site Settings with hotspot data
    const fetchHeroImages = async () => {
      try {
        const settings = await client.fetch(
          `*[_type == "siteSettings"][0] {
            heroImages[] {
              asset->{
                _id,
                url
              },
              hotspot,
              crop,
              alt,
              mobileImage {
                asset->{
                  _id,
                  url
                },
                hotspot,
                crop
              }
            }
          }`
        );

        if (settings?.heroImages && settings.heroImages.length > 0) {
          const imageData = settings.heroImages.map((img: any) => {
            const url = urlFor(img)
              .width(1920)
              .height(1080)
              .fit('crop')
              .auto('format')
              .quality(90)
              .url();

            const hotspot = img.hotspot;
            const objectPosition = hotspot
              ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
              : '50% 50%';

            let mobileUrl: string | null = null;
            let mobileObjectPosition = '50% 50%';
            if (img.mobileImage?.asset) {
              mobileUrl = urlFor(img.mobileImage)
                .width(750)
                .height(1334)
                .fit('crop')
                .auto('format')
                .quality(90)
                .url();
              const mobileHotspot = img.mobileImage.hotspot;
              if (mobileHotspot) {
                mobileObjectPosition = `${mobileHotspot.x * 100}% ${mobileHotspot.y * 100}%`;
              }
            }

            return { url, alt: img.alt || 'Luca Gargiulo Photography', objectPosition, mobileUrl, mobileObjectPosition };
          });
          setHeroImages(imageData);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching hero images:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  // TODO: Re-enable carousel when ready
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [heroImages.length]);

  // Show loading spinner while images are being fetched
  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-bg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent mb-4"></div>
            <p className="text-text-light">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error message if images failed to load
  if (error || heroImages.length === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-bg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <p className="text-text-light text-lg mb-4">Unable to load hero images</p>
            <p className="text-text-light text-sm">Please check your Sanity configuration</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={isMobile && heroImages[currentIndex].mobileUrl
              ? heroImages[currentIndex].mobileUrl!
              : heroImages[currentIndex].url}
            alt={heroImages[currentIndex].alt}
            fill
            priority={currentIndex === 0}
            className="object-cover"
            style={{
              objectPosition: isMobile && heroImages[currentIndex].mobileUrl
                ? heroImages[currentIndex].mobileObjectPosition
                : heroImages[currentIndex].objectPosition,
            }}
            sizes="100vw"
            quality={90}
          />
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* TODO: Re-enable carousel indicators when ready */}
    </section>
  );
}
