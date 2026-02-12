import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Hire an Event Photographer in Cork, Ireland',
  description:
    'Book an event photographer in Cork, Ireland. Covering weddings, festivals, and live events. Available across Ireland and Europe.',
  alternates: {
    canonical: 'https://lucaphotoart.com/contact',
  },
  openGraph: {
    title: 'Contact | Hire an Event Photographer in Cork, Ireland',
    description:
      'Book an event photographer in Cork, Ireland. Covering weddings, festivals, and live events. Available across Ireland and Europe.',
    url: 'https://lucaphotoart.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
