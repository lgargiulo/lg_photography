import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Luca Gargiulo | Event Photographer Cork, Ireland',
  description:
    'Event photographer based in Cork, Ireland. Originally from Sorrento, Italy. Covering weddings & live events across Ireland and Europe.',
  alternates: {
    canonical: 'https://lucaphotoart.com/about',
  },
  openGraph: {
    title: 'About Luca Gargiulo | Event Photographer Cork, Ireland',
    description:
      'Event photographer based in Cork, Ireland. Originally from Sorrento, Italy. Covering weddings & live events across Ireland and Europe.',
    url: 'https://lucaphotoart.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
