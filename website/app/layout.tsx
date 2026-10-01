import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Cursor } from '@/components/Cursor';

import profileData from '@/data/profile.json';

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
    default: `${profileData.name} · ${profileData.title}`,
    template: `%s · ${profileData.name}`,
  },
  description: profileData.heroDescription,
  keywords: [
    profileData.name,
    'HimanM',
    profileData.title,
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
    profileData.location,
    'Cardiff Metropolitan University'
  ],
  authors: [{ name: profileData.name, url: 'https://himanm.com' }],
  creator: profileData.name,
  publisher: profileData.name,
  alternates: {
    canonical: 'https://himanm.com',
  },
  openGraph: {
    title: `${profileData.name} · ${profileData.title}`,
    description: profileData.heroDescription,
    url: 'https://himanm.com',
    siteName: `${profileData.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${profileData.name} · ${profileData.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profileData.name} · ${profileData.title}`,
    description: profileData.heroDescription,
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
      name: profileData.name,
      givenName: profileData.firstName,
      familyName: profileData.lastName,
      url: 'https://himanm.com',
      jobTitle: profileData.title,
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: profileData.education[0]?.school || 'Cardiff Metropolitan University, UK',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: profileData.location.split(',')[0].trim(),
        addressCountry: 'LK',
      },
      email: `mailto:${profileData.email}`,
      sameAs: [
        profileData.socials.github,
        profileData.socials.linkedin,
        'https://www.credly.com/users/himan',
        'https://learn.microsoft.com/api/credentials/share/en-us/HimanManduja-3121/C6C6FA5DE9DDDF86?sharingId=927B438A032C0E8E',
      ],
      knowsAbout: profileData.skills,
    },
    {
      '@type': 'WebSite',
      '@id': 'https://himanm.com/#website',
      url: 'https://himanm.com',
      name: `${profileData.name} Portfolio`,
      description: profileData.heroDescription,
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
