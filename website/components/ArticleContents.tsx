'use client';

import { useEffect, useId, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';

export function ArticleContents({ toc }: { toc: string[][] }) {
  const [activeId, setActiveId] = useState(toc[0]?.[0] ?? '');
  const groupId = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const headings = toc.map(([id]) => document.getElementById(id)).filter((heading): heading is HTMLElement => heading !== null);
    if (!headings.length) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = Number.parseFloat(getComputedStyle(headings[0]).scrollMarginTop) + 1;
      let current = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > readingLine) break;
        current = heading.id;
      }
      // The final section may be too short to reach the reading line.
      if (window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) {
        current = headings[headings.length - 1].id;
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    const observer = new ResizeObserver(schedule);
    const article = document.querySelector('.project-prose');
    if (article) observer.observe(article);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [toc]);

  return (
    <LayoutGroup id={groupId}>
      <ol>{toc.map(([id, label]) => (
        <li key={id}>
          <a href={`#${id}`} aria-current={activeId === id ? 'location' : undefined}>
            {activeId === id && <motion.span
              layoutId="active-section"
              className="project-toc-indicator"
              aria-hidden="true"
              initial={false}
              transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
            />}
            {label}
          </a>
        </li>
      ))}</ol>
    </LayoutGroup>
  );
}
