'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

// Split text animation - same as "Event Photographer"
const SplitText = ({ text }: { text: string }) => {
  const letters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.8 },
    },
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
      animate="visible"
      exit="exit"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block' }}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showLogoText, setShowLogoText] = useState(false);
  const { scrollY } = useScroll();

  // Smart scroll: hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setIsScrolled(latest > 20);
  });

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Handle logo text visibility with 15 second timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showLogoText) {
      timer = setTimeout(() => {
        setShowLogoText(false);
      }, 15000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showLogoText]);

  const handleLogoHover = () => {
    setShowLogoText(true);
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={isHidden && !isMenuOpen ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-soft' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="flex items-center gap-3"
            onMouseEnter={handleLogoHover}
          >
            <Link href="/" className="tap-target relative group">
              <div className="h-10 md:h-12 w-10 md:w-12 relative">
                <Image
                  src="/images/lgLogo.png"
                  alt="Luca G Photography Logo"
                  fill
                  sizes="(max-width: 768px) 40px, 48px"
                  className="object-contain"
                  loading="eager"
                  priority
                />
              </div>
            </Link>
            <AnimatePresence mode="wait">
              {showLogoText && (
                <motion.div className="text-xl md:text-2xl font-display font-light text-white">
                  <SplitText text="Luca Gargiulo Photography" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium tracking-wider uppercase text-text hover:text-accent transition-colors relative group"
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden tap-target flex flex-col justify-center items-center gap-1.5 group relative"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0,
              }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0,
              }}
              className="block h-0.5 w-6 bg-white"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
            className="lg:hidden fixed inset-0 top-16 bg-bg/95 backdrop-blur-md z-40"
          >
            <nav className="container-custom py-8 h-full flex flex-col justify-center">
              <ul className="space-y-8">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1,
                      type: 'spring' as const,
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-3xl font-display font-light text-white hover:text-accent transition-colors tap-target py-2"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
