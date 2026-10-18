import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { projects } from '@/data/projects';
import { projectArticles } from '@/content/projects';
import profileData from '@/data/profile.json';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  const article = projectArticles[slug];
  if (!project || !article) notFound();
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `https://www.himanm.com/projects/${slug}` },
    openGraph: { title: `${project.title} · ${profileData.name}`, description: project.description, url: `https://www.himanm.com/projects/${slug}`, type: 'article', authors: ['https://www.himanm.com/#about'], modifiedTime: article.reviewedAt, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: project.title }] },
    twitter: { card: 'summary_large_image', title: project.title, description: project.description, images: ['/og-image.png'] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  const article = projectArticles[slug];
  if (!project || !article) notFound();
  const { Content, toc } = article;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const url = `https://www.himanm.com/projects/${slug}`;
  const sourceUrl = `${project.repository}/tree/${article.sourceRevision}`;
  const reviewDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(article.reviewedAt));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: project.title,
        description: project.description,
        url,
        inLanguage: 'en',
        articleSection: project.label,
        dateModified: article.reviewedAt,
        mainEntityOfPage: url,
        isPartOf: { '@id': 'https://www.himanm.com/projects#collection' },
        author: { '@type': 'Person', '@id': 'https://www.himanm.com/#person', name: profileData.name, url: 'https://www.himanm.com/#about' },
        publisher: { '@id': 'https://www.himanm.com/#person' },
        image: 'https://www.himanm.com/og-image.png',
        about: { '@type': 'SoftwareSourceCode', name: project.title, codeRepository: project.repository, version: article.sourceRevision, url: sourceUrl },
      },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.himanm.com/' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://www.himanm.com/projects' },
        { '@type': 'ListItem', position: 3, name: project.title, item: url },
      ] },
    ],
  };
  const contents = <ol>{toc.map(([id,label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>;

  return <>
    <Navbar />
    <main className="project-article min-h-screen px-6 pb-20 pt-28 md:px-11 md:pt-32">
      <article className="mx-auto max-w-[1120px]">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <Link href="/projects">Projects</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>
        <header className="project-article-header">
          <p className="project-entry-category">{project.label}</p>
          <h1>{project.title}</h1>
          <p className="project-article-deck">{project.summary}</p>
          <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[12px] leading-relaxed text-muted">
            <span>By <Link href="/#about" className="underline underline-offset-4 hover:text-fg">{profileData.name}</Link></span>
            <span>Source reviewed <time dateTime={article.reviewedAt}>{reviewDate}</time></span>
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-fg">Reviewed commit {article.sourceRevision.slice(0, 7)} ↗</a>
          </p>
          <div className="project-article-meta">
            <p>{project.tags.join(' · ')}</p>
            <a href={project.repository} target="_blank" rel="noopener noreferrer">View repository <span aria-hidden="true">↗</span></a>
          </div>
        </header>
        <details className="project-mobile-contents"><summary>On this page</summary>{contents}</details>
        <div className="project-article-layout">
          <div className="project-prose"><Content /></div>
          <nav className="project-toc" aria-label="Article contents"><p>On this page</p>{contents}</nav>
        </div>
        <footer className="project-article-footer">
          <Link href="/projects">← All projects</Link>
          <Link href={`/projects/${next.slug}`} className="max-w-[55%] text-right"><span className="block text-[10px] text-muted mb-1">Next article</span>{next.title} →</Link>
        </footer>
      </article>
    </main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
  </>;
}
