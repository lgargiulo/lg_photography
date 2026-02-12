import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function ServiceCard({
  title,
  description,
  image,
  href,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block relative overflow-hidden bg-bg-card rounded-none hover:transform hover:scale-[1.02] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl text-white font-display font-light mb-3 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-text-light text-sm md:text-base line-clamp-2 mb-4">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-wider">
          View Portfolio
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
    </Link>
  );
}
