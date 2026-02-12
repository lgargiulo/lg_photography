import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Luca Gargiulo Photography. Learn how we collect, use, and protect your personal data in accordance with GDPR and Irish data protection law.',
  alternates: {
    canonical: 'https://lucaphotoart.com/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
