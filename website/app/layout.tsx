import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Cursor } from '@/components/Cursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://himanm.com'),
  title: {
    default: 'Himan Manduja · DevOps Engineer',
    template: '%s · Himan Manduja',
  },
  description: 'DevOps Engineer candidate and Software Engineering graduate based in Colombo, Sri Lanka. Hands-on experience with Kubernetes, Terraform, Docker, AWS, Azure, Google Cloud, and CI/CD automation.',
  keywords: [
    'Himan Manduja',
    'HimanM',
    'DevOps Engineer',
    'DevOps Portfolio',
    'Cloud Infrastructure',
    'Kubernetes',
    'Terraform',
    'Docker',
    'CI/CD',
    'AWS Cloud Practitioner',
    'Microsoft Certified Azure Administrator Associate',
    'Google Cloud Certified Associate Cloud Engineer',
    'Platform Engineering',
    'Site Reliability',
    'Colombo Sri Lanka',
    'Cardiff Metropolitan University'
  ],
  authors: [{ name: 'Himan Manduja', url: 'https://himanm.com' }],
  creator: 'Himan Manduja',
  publisher: 'Himan Manduja',
  alternates: {
    canonical: 'https://himanm.com',
  },
  openGraph: {
    title: 'Himan Manduja · DevOps Engineer',
    description: 'DevOps Engineer candidate specializing in CI/CD automation, cloud infrastructure, Docker, and Terraform.',
    url: 'https://himanm.com',
    siteName: 'Himan Manduja Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Himan Manduja · DevOps Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himan Manduja · DevOps Engineer',
    description: 'DevOps Engineer candidate specializing in CI/CD automation, cloud infrastructure, Docker, and Terraform.',
    creator: '@himanm',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.ico',
    shortcut: '/icon.ico',
    apple: '/icon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://himanm.com/#person',
      name: 'Himan Manduja',
      givenName: 'Himan',
      familyName: 'Manduja',
      url: 'https://himanm.com',
      jobTitle: 'DevOps Engineer',
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Cardiff Metropolitan University, UK',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Colombo',
        addressCountry: 'LK',
      },
      email: 'mailto:hghimanmanduja@gmail.com',
      sameAs: [
        'https://github.com/himanm',
        'https://linkedin.com/in/himanm',
        'https://www.credly.com/users/himan',
        'https://learn.microsoft.com/api/credentials/share/en-us/HimanManduja-3121/C6C6FA5DE9DDDF86?sharingId=927B438A032C0E8E',
      ],
      knowsAbout: [
        'DevOps',
        'Cloud Infrastructure',
        'Kubernetes',
        'Terraform',
        'Docker',
        'CI/CD Automation',
        'Amazon Web Services (AWS)',
        'Microsoft Azure',
        'Google Cloud Platform (GCP)',
        'GitHub Actions',
        'Jenkins',
        'Linux Administration',
        'Ansible',
        'Site Reliability Engineering'
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://himanm.com/#website',
      url: 'https://himanm.com',
      name: 'Himan Manduja Portfolio',
      description: 'DevOps Engineer and Software Engineering graduate portfolio.',
      publisher: {
        '@id': 'https://himanm.com/#person',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} font-inter bg-bg text-fg min-h-screen transition-colors duration-[400ms] antialiased overflow-x-hidden`} suppressHydrationWarning>
        <Providers>
          {children}
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
