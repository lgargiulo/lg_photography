'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { client, urlFor } from '@/lib/sanity';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Custom components for PortableText to handle external links
const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http://') || href.startsWith('https://');

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light underline transition-colors"
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className="text-accent hover:text-accent-light underline transition-colors">
          {children}
        </Link>
      );
    },
  },
};

interface PortfolioProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  featuredImage: any;
  gallery?: any[];
  description?: any;
  client?: string;
  year?: string;
  location?: string;
  challenge?: any;
  approach?: any;
  tags?: string[];
}

export default function ProjectDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Fetch the current project
        const projectData = await client.fetch(
          `*[_type == "portfolioProject" && slug.current == $slug][0] {
            _id,
            title,
            slug,
            category,
            description,
            client,
            year,
            location,
            challenge,
            approach,
            tags,
            featuredImage {
              asset->{
                _id,
                url
              },
              hotspot,
              crop,
              alt
            },
            gallery[] {
              asset->{
                _id,
                url,
                metadata {
                  dimensions {
                    width,
                    height
                  }
                }
              },
              hotspot,
              crop,
              alt,
              verticalPosition
            }
          }`,
          { slug }
        );

        setProject(projectData);

        // Fetch related projects (same category, excluding current)
        if (projectData) {
          const related = await client.fetch(
            `*[_type == "portfolioProject" && category == $category && slug.current != $slug] | order(order asc) [0...3] {
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
              }
            }`,
            { category: projectData.category, slug }
          );
          setRelatedProjects(related);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-light">Loading project...</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">Project Not Found</h1>
          <Link href="/portfolio" className="text-accent hover:text-accent-light">
            ← Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  // Prepare lightbox slides from gallery
  const lightboxSlides = project.gallery?.filter(img => img?.asset).map((image) => ({
    src: urlFor(image).width(2000).auto('format').quality(95).url(),
    alt: image.alt || project.title,
  })) || [];

  // Handle image click
  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] bg-bg overflow-hidden">
        {project.featuredImage?.asset && (
          <Image
            src={urlFor(project.featuredImage).width(2400).auto('format').quality(90).url()}
            alt={project.featuredImage.alt || project.title}
            fill
            className="object-cover object-[center_20%]"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Back Link */}
              <Link
                href="/portfolio"
                className="flex items-center gap-2 text-text-light hover:text-accent transition-colors mb-6 w-fit"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Portfolio
              </Link>

              {/* Category */}
              <div className="inline-block px-3 py-1 bg-accent text-bg text-xs font-medium uppercase tracking-wider mb-1">
                {project.category}
              </div>

              {/* Title */}
              <h1 className="mb-6 text-white">{project.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-text-light">
                {project.client && (
                  <>
                    <div>
                      <span className="text-text-muted">Client:</span>{' '}
                      <span className="text-white">{project.client}</span>
                    </div>
                    <span>•</span>
                  </>
                )}
                {project.year && (
                  <>
                    <div>
                      <span className="text-text-muted">Year:</span>{' '}
                      <span className="text-white">{project.year}</span>
                    </div>
                    {project.location && <span>•</span>}
                  </>
                )}
                {project.location && (
                  <div>
                    <span className="text-text-muted">Location:</span>{' '}
                    <span className="text-white">{project.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      {project.description && (
        <section className="section-padding bg-bg">
          <div className="container-custom max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="mb-6">About This Project</h2>
              <div className="text-responsive-lg text-text-light leading-relaxed prose prose-invert max-w-none">
                <PortableText value={project.description} components={portableTextComponents} />
              </div>
            </motion.div>

            {/* Challenge & Approach */}
            {(project.challenge || project.approach) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {project.challenge && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-display font-light text-white mb-4">The Challenge</h3>
                    <div className="text-text-light leading-relaxed prose prose-invert prose-sm max-w-none">
                      <PortableText value={project.challenge} components={portableTextComponents} />
                    </div>
                  </motion.div>
                )}
                {project.approach && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-display font-light text-white mb-4">My Approach</h3>
                    <div className="text-text-light leading-relaxed prose prose-invert prose-sm max-w-none">
                      <PortableText value={project.approach} components={portableTextComponents} />
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-bg-card text-text-light text-sm border border-border hover:border-accent hover:text-accent transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="section-padding bg-bg-elevated">
          <div className="container-custom">
            <div className="flex flex-col gap-8">
              {(() => {
                const rows: any[] = [];
                let i = 0;
                let imageIndex = 0; // Track flat index for lightbox

                while (i < project.gallery.length) {
                  const image = project.gallery[i];
                  if (!image?.asset) {
                    i++;
                    continue;
                  }

                  const width = image.asset.metadata?.dimensions?.width || 1;
                  const height = image.asset.metadata?.dimensions?.height || 1;
                  const isVertical = height > width;

                  // Check if next image is also vertical
                  const nextImage = project.gallery[i + 1];
                  const nextWidth = nextImage?.asset?.metadata?.dimensions?.width || 1;
                  const nextHeight = nextImage?.asset?.metadata?.dimensions?.height || 1;
                  const nextIsVertical = nextHeight > nextWidth;

                  if (isVertical && nextIsVertical && nextImage?.asset) {
                    // Two vertical images together - equal split
                    const currentIndex1 = imageIndex;
                    const currentIndex2 = imageIndex + 1;
                    rows.push(
                      <motion.div
                        key={`row-${i}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="grid grid-cols-2 gap-8"
                        style={{ height: '700px' }}
                      >
                        <button
                          onClick={() => handleImageClick(currentIndex1)}
                          className="relative w-full h-full bg-bg-card overflow-hidden shadow-photo cursor-pointer group"
                        >
                          <Image
                            src={urlFor(image).width(700).height(700).fit('crop').auto('format').quality(90).url()}
                            alt={image.alt || `${project.title} - Image ${i + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </button>
                        <button
                          onClick={() => handleImageClick(currentIndex2)}
                          className="relative w-full h-full bg-bg-card overflow-hidden shadow-photo cursor-pointer group"
                        >
                          <Image
                            src={urlFor(nextImage).width(700).height(700).fit('crop').auto('format').quality(90).url()}
                            alt={nextImage.alt || `${project.title} - Image ${i + 2}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </button>
                      </motion.div>
                    );
                    imageIndex += 2;
                    i += 2;
                  } else if (isVertical && !nextIsVertical && nextImage?.asset) {
                    // Vertical + horizontal - same height, no gaps
                    const verticalPosition = image.verticalPosition || 'left';
                    const currentIndex1 = imageIndex;
                    const currentIndex2 = imageIndex + 1;
                    const verticalImg = (
                      <button
                        onClick={() => handleImageClick(currentIndex1)}
                        className="relative overflow-hidden w-full lg:w-[35%] lg:h-[600px] lg:bg-bg-card lg:shadow-photo cursor-pointer group"
                      >
                        <div className="max-w-sm mx-auto lg:max-w-none lg:mx-0 shadow-photo lg:shadow-none">
                          <Image
                            src={urlFor(image).width(700).auto('format').quality(90).url()}
                            alt={image.alt || `${project.title} - Image ${i + 1}`}
                            width={700}
                            height={1050}
                            className="w-full h-auto lg:absolute lg:inset-0 lg:w-full lg:h-full lg:object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 1024px) 100vw, 35vw"
                          />
                        </div>
                      </button>
                    );
                    const horizontalImg = (
                      <button
                        onClick={() => handleImageClick(currentIndex2)}
                        className="relative overflow-hidden w-full lg:w-[65%] lg:h-[600px] lg:bg-bg-card shadow-photo cursor-pointer group"
                      >
                        <Image
                          src={urlFor(nextImage).width(1300).auto('format').quality(90).url()}
                          alt={nextImage.alt || `${project.title} - Image ${i + 2}`}
                          width={1300}
                          height={867}
                          className="w-full h-auto lg:absolute lg:inset-0 lg:w-full lg:h-full lg:object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 65vw"
                        />
                      </button>
                    );

                    rows.push(
                      <motion.div
                        key={`row-${i}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="flex flex-col lg:flex-row gap-8"
                      >
                        {verticalPosition === 'left' ? (
                          <>
                            {verticalImg}
                            {horizontalImg}
                          </>
                        ) : (
                          <>
                            {horizontalImg}
                            {verticalImg}
                          </>
                        )}
                      </motion.div>
                    );
                    imageIndex += 2;
                    i += 2;
                  } else if (isVertical) {
                    // Last vertical image alone - full width
                    const currentIndex = imageIndex;
                    rows.push(
                      <motion.div
                        key={`row-${i}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                      >
                        <button
                          onClick={() => handleImageClick(currentIndex)}
                          className="relative w-full bg-bg-card overflow-hidden shadow-photo cursor-pointer group block"
                        >
                          <Image
                            src={urlFor(image).width(1400).auto('format').quality(90).url()}
                            alt={image.alt || `${project.title} - Image ${i + 1}`}
                            width={1400}
                            height={2000}
                            className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                          />
                        </button>
                      </motion.div>
                    );
                    imageIndex++;
                    i++;
                  } else {
                    // Horizontal image - full width
                    const currentIndex = imageIndex;
                    rows.push(
                      <motion.div
                        key={`row-${i}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                      >
                        <button
                          onClick={() => handleImageClick(currentIndex)}
                          className="relative w-full bg-bg-card overflow-hidden shadow-photo cursor-pointer group block"
                        >
                          <Image
                            src={urlFor(image).width(1400).auto('format').quality(90).url()}
                            alt={image.alt || `${project.title} - Image ${i + 1}`}
                            width={1400}
                            height={1000}
                            className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                          />
                        </button>
                      </motion.div>
                    );
                    imageIndex++;
                    i++;
                  }
                }

                return rows;
              })()}
            </div>
          </div>
        </section>
      )}

      {/* More Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-bg">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="mb-4">More Projects</h2>
              <p className="text-text-light">Explore more of my work</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={`/portfolio/${relatedProject.slug?.current || relatedProject._id}`}
                    className="group block relative aspect-[4/5] overflow-hidden bg-bg-card"
                  >
                    {relatedProject.featuredImage?.asset && (
                      <Image
                        src={urlFor(relatedProject.featuredImage).width(600).height(750).fit('crop').crop('focalpoint').auto('format').quality(90).url()}
                        alt={relatedProject.featuredImage.alt || relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <p className="text-sm text-accent uppercase tracking-wider mb-2">
                        {relatedProject.category}
                      </p>
                      <h3 className="text-xl font-display font-light text-white group-hover:text-accent transition-colors">
                        {relatedProject.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors text-lg"
              >
                View All Projects
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-bg-elevated">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-light p-8 md:p-12"
          >
            <h2 className="mb-4">Like What You See?</h2>
            <p className="text-responsive-lg text-text-light mb-8 max-w-xl mx-auto">
              Let's talk about your next project and how we can create something special together.
            </p>
            <Link href="/contact" className="btn-primary">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        styles={{
          container: { backgroundColor: 'rgba(18, 18, 18, 0.95)' },
        }}
        render={{
          iconLoading: () => (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ),
        }}
        carousel={{
          preload: 2,
        }}
      />
    </main>
  );
}
