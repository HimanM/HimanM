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
  metadataBase: new URL('https://www.himanm.com'),
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
  authors: [{ name: profileData.name, url: 'https://www.himanm.com' }],
  creator: profileData.name,
  publisher: profileData.name,
  alternates: {
    canonical: 'https://www.himanm.com',
  },
  openGraph: {
    title: `${profileData.name} · ${profileData.title}`,
    description: profileData.heroDescription,
    url: 'https://www.himanm.com',
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
      '@id': 'https://www.himanm.com/#person',
      name: profileData.name,
      alternateName: 'HimanM',
      description: profileData.heroDescription,
      image: {
        '@type': 'ImageObject',
        '@id': 'https://www.himanm.com/#portrait',
        url: 'https://www.himanm.com/images/himan-manduja-profile.png',
        contentUrl: 'https://www.himanm.com/images/himan-manduja-profile.png',
        caption: `${profileData.name} in graduation attire`,
      },
      givenName: profileData.firstName,
      familyName: profileData.lastName,
      url: 'https://www.himanm.com',
      mainEntityOfPage: { '@id': 'https://www.himanm.com/#profile' },
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
      ],
      knowsAbout: profileData.skills,
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.himanm.com/#website',
      url: 'https://www.himanm.com',
      name: `${profileData.name} Portfolio`,
      description: profileData.heroDescription,
      publisher: {
        '@id': 'https://www.himanm.com/#person',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
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
