'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

// Split text animation helper
const SplitText = ({ text, delay = 0, inView }: { text: string; delay?: number; inView: boolean }) => {
  const letters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      style={{ display: 'flex', overflow: 'hidden', flexWrap: 'wrap', justifyContent: 'center' }}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block' }}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function HeroContent() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-24 bg-bg-elevated">
      <div className="container-narrow text-center px-6">
        {/* Main Title */}
        <div className="mb-12 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-white leading-tight tracking-wide"
          >
            <SplitText text="Event Photographer" inView={inView} />
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            <div className="h-px w-12 bg-accent" />
            <span className="text-lg md:text-xl text-accent tracking-widest">
              Ireland & Europe
            </span>
            <div className="h-px w-12 bg-accent" />
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-12 space-y-6"
        >
          <p className="text-lg md:text-xl text-text-light leading-relaxed">
            Professional photography services for events, portraits, and creative projects across Ireland and Europe.
            I collaborate with brands, artists, and individuals who require authentic visual storytelling—whether
            for press materials, social content, or comprehensive event coverage.
          </p>
          <p className="text-base md:text-lg text-white">
            Currently booking for 2026.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link href="/services" className="btn-primary">
            Explore Services
          </Link>
          <Link href="/portfolio" className="btn-secondary">
            View Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
