import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { ResumeViewer } from '@/components/ResumeViewer';
import profileData from '@/data/profile.json';

export const metadata: Metadata = {
  title: `Resume | ${profileData.name} - ${profileData.title}`,
  description: `View and download the resume of ${profileData.name}, ${profileData.title} based in ${profileData.location}. ${profileData.heroDescription}`,
  openGraph: {
    title: `${profileData.name} - Resume & Curriculum Vitae`,
    description: profileData.heroDescription,
    url: 'https://himanm.com/resume',
    siteName: profileData.name,
    type: 'profile',
  },
  alternates: {
    canonical: 'https://himanm.com/resume',
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
