import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Event Photographer Cork, Ireland',
  description:
    'Browse the portfolio of Luca Gargiulo Photography — music events, festivals & portraits photography across Ireland and Europe.',
  alternates: {
    canonical: 'https://lucaphotoart.com/portfolio',
  },
  openGraph: {
    title: 'Portfolio | Event Photographer Cork, Ireland',
    description:
      'Browse the portfolio of Luca Gargiulo Photography — music events, festivals & portraits photography across Ireland and Europe.',
    url: 'https://lucaphotoart.com/portfolio',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
