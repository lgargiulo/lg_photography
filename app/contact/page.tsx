'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { client } from '@/lib/sanity';

interface ContactSettings {
  contactEmail?: string;
  location?: string;
  socialMedia?: {
    instagram?: string;
  };
}

interface FAQ {
  question: string;
  answer: string;
}

const fallbackFaqs: FAQ[] = [
  {
    question: 'How far in advance should I book?',
    answer:
      'For weddings and major events, I recommend booking 6-12 months in advance. For other projects, 2-4 weeks notice is usually sufficient, though I can sometimes accommodate last-minute requests.',
  },
  {
    question: 'Do you travel for shoots?',
    answer:
      'Absolutely! I\'m based in Cork but regularly travel across Ireland and Europe. Travel costs are included in packages for locations within 50km of Cork, with reasonable rates for further distances.',
  },
  {
    question: 'How long until I receive my photos?',
    answer:
      'Delivery times vary by package: The Capture (portrait sessions) within 1 week, The Identity (half-day coverage) within 2 weeks, and The Full Story (full-day coverage) within 3 weeks. Sneak peeks are usually shared within 48 hours.',
  },
  {
    question: 'Can I request specific shots or styles?',
    answer:
      'Yes! I encourage clients to share reference images and discuss their vision. While I bring my professional perspective, your input helps ensure we capture exactly what you need.',
  },
  {
    question: 'What if the weather is bad on the day?',
    answer:
      'I\'m experienced in all weather conditions and always have a backup plan. Rain can actually create stunning, dramatic shots. For outdoor-dependent events, we can discuss rescheduling options.',
  },
];

export default function ContactPage() {
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [settings, setSettings] = useState<ContactSettings | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>(fallbackFaqs);

  useEffect(() => {
    client.fetch(
      `*[_type == "siteSettings"][0] {
        contactEmail,
        location,
        socialMedia { instagram }
      }`
    ).then(setSettings).catch(() => {});

    client.fetch(
      `*[_type == "faq" && (page == "contact" || page == "both")] | order(order asc) {
        question,
        answer
      }`
    ).then((data: FAQ[]) => {
      if (data && data.length > 0) {
        setFaqs(data);
      }
    }).catch(() => {});
  }, []);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (integrate with your email service later)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitStatus('success');

    // Reset form after success
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        service: '',
        message: '',
      });
      setSubmitStatus('idle');
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-bg">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6">Let's Talk</h1>
            <p className="text-responsive-lg text-text-light max-w-2xl mx-auto">
              Whether you're planning a festival, getting married, or need brand photography—I'd
              love to hear about your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section ref={formRef} className="section-padding bg-bg-elevated">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <h3 className="text-xl font-display mb-4 text-accent">Get In Touch</h3>
                <div className="space-y-4">
                  {settings?.contactEmail && (
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="flex items-center gap-3 text-text-light hover:text-accent transition-colors tap-target"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{settings.contactEmail}</span>
                    </a>
                  )}
                  {settings?.location && (
                    <div className="flex items-center gap-3 text-text-light">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{settings.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {settings?.socialMedia?.instagram && (
                <div>
                  <h3 className="text-xl font-display mb-4 text-accent">Follow</h3>
                  <div className="flex gap-4">
                    <a
                      href={settings.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target flex items-center justify-center w-12 h-12 glass-light hover:bg-accent transition-all"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xl font-display mb-4 text-accent">Quick Response</h3>
                <p className="text-text-light text-sm">
                  Usually back to you within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-light mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg border border-border-light text-white focus:border-accent focus:outline-none transition-colors"
                    placeholder="What should I call you?"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-light mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg border border-border-light text-white focus:border-accent focus:outline-none transition-colors"
                    placeholder="Where can I reach you?"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-text-light mb-2">
                    What do you need?
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg border border-border-light text-white focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="">Choose what fits best</option>
                    <option value="music">Music & Festival Photography</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="corporate">Corporate & Events</option>
                    <option value="brand">Brand & Editorial</option>
                    <option value="other">Not sure yet / Something else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-light mb-2">
                    Tell me about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-bg border border-border-light text-white focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder="What are you working on? When is it happening? What kind of vibe are you going for?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-accent text-sm"
                  >
                    ✓ Got it! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="section-padding bg-bg">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <p className="text-text-light">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-light p-6"
              >
                <h3 className="text-lg font-display text-white mb-3">{faq.question}</h3>
                <p className="text-text-light leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
