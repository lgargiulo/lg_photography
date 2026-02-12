import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photography Services & Packages | Cork, Ireland',
  description:
    'Professional photography packages for portraits, events, weddings, and full-day coverage. Starting from €200. Based in Cork, Ireland — available across Ireland and Europe.',
  alternates: {
    canonical: 'https://lucaphotoart.com/services',
  },
  openGraph: {
    title: 'Photography Services & Packages | Cork, Ireland',
    description:
      'Professional photography packages for portraits, events, weddings, and full-day coverage. Starting from €200. Based in Cork, Ireland.',
    url: 'https://lucaphotoart.com/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
