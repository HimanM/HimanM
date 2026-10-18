import Link from 'next/link';
import { ProjectCards } from '@/components/ProjectCards';
import { projects } from '@/data/projects';
import { ProjectReveal } from '@/components/ProjectReveal';

export function Work() {
  return (
    <section id="work" className="pt-[80px] pb-[40px] px-6 md:px-11 md:pt-[120px] md:pb-[80px]">
      <ProjectReveal className="mb-8 flex items-end justify-between md:mb-12">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-muted">Selected DevOps work</p>
          <h2 className="font-syne text-[14vw] font-extrabold leading-[0.88] tracking-[-0.045em] min-[480px]:text-[clamp(52px,8vw,110px)] max-[480px]:hyphens-manual max-[480px]:break-words">Projects</h2>
        </div>
        <span className="mb-1 hidden text-[11px] uppercase tracking-[0.12em] text-muted sm:block">{String(projects.length).padStart(2, '0')} case studies</span>
      </ProjectReveal>

      <ProjectCards projects={projects.slice(0, 4)} />

      <ProjectReveal className="mt-8 flex justify-center" delay={0.16}>
        <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-[10px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-fg hover:bg-fg hover:text-bg" data-cursor>
          View all {projects.length} projects
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </ProjectReveal>
    </section>
  );
}
