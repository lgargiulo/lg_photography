import { Metadata } from 'next';
import { client, urlFor } from '@/lib/sanity';
import ProjectDetailClient from './ProjectDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const project = await client.fetch(
    `*[_type == "portfolioProject" && slug.current == $slug][0] {
      title,
      excerpt,
      category,
      location,
      "seoTitle": seo.metaTitle,
      "seoDescription": seo.metaDescription,
      featuredImage {
        asset->{ url },
        alt
      }
    }`,
    { slug }
  );

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = project.seoTitle || `${project.title} | ${project.category} Photography`;
  const description =
    project.seoDescription ||
    project.excerpt ||
    `${project.title} — ${project.category.toLowerCase()} photography by Luca Gargiulo${project.location ? ` in ${project.location}` : ''}. Professional event and concert photographer based in Cork, Ireland.`;
  const imageUrl = project.featuredImage?.asset?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `https://lucaphotoart.com/portfolio/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://lucaphotoart.com/portfolio/${slug}`,
      type: 'article',
      ...(imageUrl && {
        images: [
          {
            url: `${imageUrl}?w=1200&h=630&fit=crop&auto=format`,
            width: 1200,
            height: 630,
            alt: project.featuredImage?.alt || project.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl && {
        images: [`${imageUrl}?w=1200&h=630&fit=crop&auto=format`],
      }),
    },
  };
}

export default function ProjectDetailPage() {
  return <ProjectDetailClient />;
}
