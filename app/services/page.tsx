'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import ServiceTiers from '@/components/ServiceTiers';
import { client } from '@/lib/sanity';

const process = [
  {
    step: '01',
    title: 'Initial Consultation',
    description:
      'We discuss your vision, requirements, and expectations. I learn about your event, style preferences, and any specific shots you need.',
  },
  {
    step: '02',
    title: 'Planning & Preparation',
    description:
      'I create a detailed shot list, scout locations if needed, and coordinate with other vendors to ensure seamless coverage on the day.',
  },
  {
    step: '03',
    title: 'The Shoot',
    description:
      'Professional, unobtrusive photography that captures authentic moments while providing expert direction when needed.',
  },
  {
    step: '04',
    title: 'Post-Production',
    description:
      'Careful culling, color grading, and retouching to deliver polished, publication-ready images that exceed your expectations.',
  },
  {
    step: '05',
    title: 'Delivery',
    description:
      'High-resolution images delivered via secure online gallery, with options for prints, albums, and commercial licensing.',
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const fallbackFaqs: FAQ[] = [
  {
    question: 'What is your booking process?',
    answer:
      'Contact me with your event details and I will check availability. Once we discuss your needs and you decide to proceed, I require a 30% deposit to secure your date, with the balance due 7 days before the event.',
  },
  {
    question: 'How many photos will I receive?',
    answer:
      'This varies by package and event type. Typically, weddings receive 300-500 edited images, concerts 50-100 images, and corporate events 100-200 images. All packages include only the best, professionally edited photos.',
  },
  {
    question: 'How long until I receive my photos?',
    answer:
      'Turnaround time depends on the package: The Capture (portrait sessions) within 1 week, The Identity (half-day coverage) within 2 weeks, and The Full Story (full-day coverage) within 3 weeks. Rush delivery is available for an additional fee.',
  },
  {
    question: 'Do you provide RAW files?',
    answer:
      'RAW files are not included in standard packages as they require professional editing to look their best. However, they can be purchased separately after delivery of the edited images for an additional fee.',
  },
  {
    question: 'Can I use the photos for commercial purposes?',
    answer:
      'Usage rights depend on your package. Personal use is always included. Commercial usage rights (for advertising, promotion, resale) are available with The Identity and The Full Story packages, or can be added to any package for an additional licensing fee.',
  },
  {
    question: 'Do you travel for events?',
    answer:
      'Yes! I regularly photograph events across Ireland and Europe. Travel within Ireland is included in most packages. International travel can be arranged with travel expenses added to the project cost.',
  },
];

export default function ServicesPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(fallbackFaqs);
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    client.fetch(
      `*[_type == "faq" && (page == "services" || page == "both")] | order(order asc) {
        question,
        answer
      }`
    ).then((data: FAQ[]) => {
      if (data && data.length > 0) {
        setFaqs(data);
      }
    }).catch(() => {});
  }, []);

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="section-padding bg-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-6">Services</h1>
            <p className="text-responsive-lg text-text-light">
              Professional photography services tailored to your needs. From essential coverage to
              complete brand launches, find the perfect package for your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Tiers */}
      <ServiceTiers />

      {/* Process Section */}
      <section ref={processRef} className="section-padding bg-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="mb-4">My Process</h2>
            <p className="text-responsive-lg text-text-light max-w-2xl mx-auto">
              A streamlined workflow designed to deliver exceptional results every time
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -50 }}
                animate={processInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="flex gap-6 mb-12 last:mb-0"
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 flex items-center justify-center bg-accent text-bg font-display text-2xl font-light">
                    {item.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-display font-light text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-light leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-bg-elevated">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <p className="text-text-light">Everything you need to know about working with me</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-light p-6"
              >
                <h3 className="text-lg font-display font-light text-white mb-3">{faq.question}</h3>
                <p className="text-text-light leading-relaxed">{faq.answer}</p>
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
            <h2 className="mb-6">Ready to Get Started?</h2>
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
