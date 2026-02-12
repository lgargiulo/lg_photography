'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSlide {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface HeroProps {
  slides?: HeroSlide[];
}

const defaultSlides: HeroSlide[] = [];

export default function Hero({ slides = defaultSlides }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Show placeholder if no slides available
  if (slides.length === 0) {
    return (
      <section className="relative h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden bg-bg-elevated">
        <div className="h-full flex items-center justify-center">
          <p className="text-text-light">Hero slides not available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container-custom text-center">
          <h1 className="slide-up text-white mb-4 md:mb-6">
            {slides[currentSlide].title}
          </h1>
          <p className="slide-up text-responsive-lg text-text-light max-w-2xl mx-auto mb-8 md:mb-12">
            {slides[currentSlide].subtitle}
          </p>
          <div className="slide-up flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="btn-primary">
              Get In Touch
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`tap-target w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-accent w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 hidden lg:block animate-bounce">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
