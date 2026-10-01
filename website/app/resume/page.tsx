import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { ResumeViewer } from '@/components/ResumeViewer';

export const metadata: Metadata = {
  title: 'Resume | Himan Manduja - DevOps Engineer',
  description: 'View and download the resume of Himan Manduja, Software Engineering graduate and DevOps Engineer specializing in Kubernetes, Terraform, Cloud Infrastructure, and CI/CD.',
  openGraph: {
    title: 'Himan Manduja - Resume & Curriculum Vitae',
    description: 'DevOps Engineer Intern candidate with hands-on experience in CI/CD automation, cloud infrastructure, Docker, and Terraform.',
    url: 'https://himanm.com/resume',
    siteName: 'Himan Manduja',
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
