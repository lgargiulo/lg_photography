'use client';

import Image from 'next/image';
import { useState } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface GalleryGridProps {
  images: GalleryImage[];
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export default function GalleryGrid({
  images,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
}: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const previousImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  const gridCols = {
    mobile: `grid-cols-${columns.mobile}`,
    tablet: `md:grid-cols-${columns.tablet}`,
    desktop: `lg:grid-cols-${columns.desktop}`,
  };

  return (
    <>
      {/* Gallery Grid */}
      <div
        className={`grid ${gridCols.mobile} ${gridCols.tablet} ${gridCols.desktop} gap-4 md:gap-6`}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] overflow-hidden bg-bg-card cursor-pointer tap-target"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 tap-target text-white hover:text-accent transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              previousImage();
            }}
            className="absolute left-4 tap-target text-white hover:text-accent transition-colors"
            aria-label="Previous image"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full mx-auto px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 tap-target text-white hover:text-accent transition-colors"
            aria-label="Next image"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
