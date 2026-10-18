import Link from 'next/link';
import type { Project } from '@/data/projects';

export function ProjectCards({ projects, heading: Heading = 'h3' }: { projects: Project[]; heading?: 'h2' | 'h3' }) {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <article key={project.slug}>
          <Link href={`/projects/${project.slug}`} className="project-entry" data-cursor>
            <span className="project-entry-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div className="project-entry-heading">
              <p className="project-entry-category">{project.label}</p>
              <Heading>{project.title}</Heading>
            </div>
            <div className="project-entry-description">
              <p>{project.summary}</p>
              <span className="project-entry-stack">{project.tags.join(' · ')}</span>
            </div>
            <svg className="project-entry-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </article>
      ))}
    </div>
  );
}
