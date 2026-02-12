'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { client, urlFor } from '@/lib/sanity';

interface FeaturedProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  featuredImage: any;
  year?: string;
}

export default function RecentWork() {
  const [recentProjects, setRecentProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const projects = await client.fetch(
          `*[_type == "portfolioProject" && isFeatured == true] | order(order asc) {
            _id,
            title,
            slug,
            category,
            year,
            featuredImage {
              asset->{
                _id,
                url,
                metadata {
                  dimensions {
                    width,
                    height,
                    aspectRatio
                  }
                }
              },
              hotspot,
              crop,
              alt
            }
          }[0...6]`
        );
        setRecentProjects(projects);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);
  return (
    <section className="section-padding bg-bg relative overflow-hidden">
      {/* Subtle Geometric Background - matching 8 years section */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-40 left-20 w-96 h-96 border border-accent rotate-12" />
      </div>

      <div className="container-custom">
        {/* Section Header - matching 8 years style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left - Header */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent text-xs uppercase tracking-wider font-medium">
                Portfolio
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-light text-white mb-6 leading-tight">
              Recent Work
            </h2>
            <p className="text-lg text-text-light leading-relaxed max-w-2xl">
              A selection of projects from music festivals to intimate weddings
            </p>
          </div>

          {/* Right - Link */}
          <div className="lg:col-span-4 flex lg:justify-end lg:items-start relative z-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors group cursor-pointer"
            >
              <span className="text-sm uppercase tracking-wider">View All</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="col-span-full text-center py-20">
            <p className="text-text-light">Loading featured projects...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && recentProjects.length === 0 && (
          <div className="col-span-full text-center py-20">
            <p className="text-text-light mb-4">No featured projects yet.</p>
            <p className="text-text-light text-sm">
              Go to Sanity Studio and mark projects as &quot;Featured on Homepage&quot;
            </p>
          </div>
        )}

        {/* Masonry Grid for All Projects */}
        {!loading && recentProjects.length > 0 && (
          <Masonry
            breakpointCols={{ default: 2, 640: 1 }}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding space-y-6"
          >
            {recentProjects.slice(0, 6).map((project, index) => {
                  if (!project.featuredImage?.asset) return null;

                  const hotspot = project.featuredImage.hotspot;
                  let imageBuilder = urlFor(project.featuredImage)
                    .width(800)
                    .height(600)
                    .fit('crop')
                    .auto('format')
                    .quality(90);

                  // Add focal point if hotspot exists
                  if (hotspot && hotspot.x !== undefined && hotspot.y !== undefined) {
                    imageBuilder = imageBuilder.focalPoint(hotspot.x, hotspot.y);
                  }

                  const imageUrl = imageBuilder.url();

                  return (
                    <motion.article
                      key={project._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="group"
                    >
                      <Link
                        href={`/portfolio/${project.slug?.current || project._id}`}
                        className="block"
                      >
                        <div
                          className="relative overflow-hidden bg-bg-card aspect-[4/3]"
                        >
                          <Image
                            src={imageUrl}
                            alt={project.featuredImage.alt || project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Content overlay */}
                          <div className="absolute bottom-6 left-6 right-6">
                            <span className="inline-block px-3 py-1 bg-accent text-bg text-xs uppercase tracking-widest font-medium mb-3">
                              {project.category}
                            </span>
                            <h3 className="text-xl font-display font-light text-white group-hover:text-accent transition-colors">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
          </Masonry>
        )}

        {/* View All Link at Bottom */}
        {!loading && recentProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12 relative z-10"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors group"
            >
              <span className="text-sm uppercase tracking-wider">View All Projects</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
