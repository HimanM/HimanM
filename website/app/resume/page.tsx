import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { ResumeViewer } from '@/components/ResumeViewer';
import profileData from '@/data/profile.json';

export const metadata: Metadata = {
  title: 'Resume',
  description: `View and download the resume of ${profileData.name}, ${profileData.title} based in ${profileData.location}. ${profileData.heroDescription}`,
  openGraph: {
    title: `${profileData.name} - Resume & Curriculum Vitae`,
    description: profileData.heroDescription,
    url: 'https://www.himanm.com/resume',
    siteName: profileData.name,
    type: 'profile',
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    username: 'HimanM',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${profileData.name} resume` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Resume · ${profileData.name}`,
    description: profileData.heroDescription,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.himanm.com/resume',
  },
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg min-h-screen">
        <ResumeViewer />
      </main>
    </>
  );
}
