'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';

interface PortfolioProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  featuredImage: any;
  excerpt: string;
}

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'Music', label: 'Music & Events' },
  { id: 'Portrait', label: 'Portraits' },
  { id: 'Travel', label: 'Travel' },
  { id: 'Other', label: 'Other' },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const projects = await client.fetch(
          `*[_type == "portfolioProject"] | order(order asc) {
            _id,
            title,
            slug,
            category,
            featuredImage {
              asset->{
                _id,
                url
              },
              hotspot,
              crop,
              alt
            },
            excerpt
          }`
        );
        setPortfolioItems(projects);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const mainCategories = categories.filter((c) => c.id !== 'all' && c.id !== 'Other').map((c) => c.id);

  const filteredItems =
    activeCategory === 'all'
      ? portfolioItems
      : activeCategory === 'Other'
        ? portfolioItems.filter((item) => !mainCategories.includes(item.category))
        : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-6">Portfolio</h1>
            <p className="text-responsive-lg text-text-light">
              A curated collection of moments captured across Ireland and Europe. From intimate
              celebrations to electrifying concerts, each project tells a unique story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-bg-elevated py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 tap-target ${
                  activeCategory === category.id
                    ? 'bg-accent text-bg'
                    : 'bg-transparent text-text-light hover:text-accent border border-border-light hover:border-accent'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section-padding bg-bg">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {loading ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-text-light">Loading portfolio...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-text-light">No projects found. Add some in Sanity Studio!</p>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  return (
                    <Link
                      key={item._id}
                      href={`/portfolio/${item.slug?.current || item._id}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group relative overflow-hidden bg-bg-card cursor-pointer aspect-square"
                      >
                      {/* Image */}
                      {item.featuredImage?.asset && (
                        <Image
                          src={urlFor(item.featuredImage).width(800).height(800).fit('crop').crop('focalpoint').auto('format').quality(90).url()}
                          alt={item.featuredImage.alt || item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      {!item.featuredImage?.asset && (
                        <div className="absolute inset-0 bg-bg-card flex items-center justify-center">
                          <p className="text-text-light text-sm">No image</p>
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-xl font-display font-light text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-text-light mb-3">{item.excerpt}</p>
                          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-wider">
                            View Project
                            <svg
                              className="w-4 h-4 transition-transform group-hover:translate-x-2"
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
                          </span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-bg/80 backdrop-blur-sm text-xs text-white uppercase tracking-wider">
                        {categories.find((c) => c.id === item.category)?.label || item.category}
                      </div>
                    </motion.div>
                  </Link>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-bg-elevated">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6">Let's Create Something Amazing</h2>
            <p className="text-responsive-lg text-text-light mb-8 max-w-xl mx-auto">
              Ready to capture your next event, celebration, or brand story? Get in touch to discuss
              your project.
            </p>
            <a href="/contact" className="btn-primary">
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
