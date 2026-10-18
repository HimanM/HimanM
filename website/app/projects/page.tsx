import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { ProjectCards } from '@/components/ProjectCards';
import { projects } from '@/data/projects';
import profileData from '@/data/profile.json';

const pageUrl = 'https://www.himanm.com/projects';

export const metadata: Metadata = {
  title: 'DevOps Projects',
  description: `Selected DevOps, cloud infrastructure, Kubernetes, and CI/CD projects by ${profileData.name}.`,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `DevOps Projects · ${profileData.name}`,
    description: `Selected DevOps, cloud infrastructure, Kubernetes, and CI/CD projects by ${profileData.name}.`,
    url: pageUrl,
    siteName: `${profileData.name} Portfolio`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `DevOps projects by ${profileData.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `DevOps Projects · ${profileData.name}`,
    description: `Selected DevOps, cloud infrastructure, Kubernetes, and CI/CD projects by ${profileData.name}.`,
    images: ['/og-image.png'],
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name: 'DevOps Projects',
    url: pageUrl,
    isPartOf: { '@id': 'https://www.himanm.com/#website' },
    author: { '@id': 'https://www.himanm.com/#person' },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        url: `https://www.himanm.com/projects/${project.slug}`,
      })),
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 pb-20 pt-28 md:px-11 md:pt-32">
        <div className="mx-auto max-w-[1120px]">
          <nav aria-label="Breadcrumb" className="project-breadcrumb">
            <Link href="/#hero" className="transition-colors hover:text-fg">Home</Link>
            <span aria-hidden="true" className="text-muted/50">/</span>
            <span aria-current="page" className="text-fg">Projects</span>
          </nav>
          <header className="mb-8 md:mb-10">
            <h1 className="font-syne text-[clamp(44px,7vw,84px)] font-extrabold leading-[0.95] tracking-[-0.05em]">Projects</h1>
            <p className="mt-5 max-w-[640px] text-[14px] leading-relaxed text-muted md:text-[16px]">Cloud infrastructure, delivery automation, and operations tooling. {projects.length} projects, explained through their implementation.</p>
          </header>
          <ProjectCards projects={projects} heading="h2" />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7">
            <Link href="/#work" className="text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-fg">← Featured on home</Link>
            <a href="https://github.com/himanm" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-fg">GitHub profile ↗</a>
          </div>
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </>
  );
}
