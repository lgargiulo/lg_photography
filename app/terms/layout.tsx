import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Luca Gargiulo Photography. Booking, payment, cancellation, copyright, and usage rights for photography services in Cork, Ireland.',
  alternates: {
    canonical: 'https://lucaphotoart.com/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
