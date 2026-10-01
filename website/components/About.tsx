'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import certificationsData from '@/data/certifications.json';

import profileData from '@/data/profile.json';

interface Certification {
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

function renderBoldText(text: string) {
  return text.split(/(<\/?(?:b|strong)>)/).map((part, index, parts) => {
    const isBoldText = parts[index - 1]?.match(/^<(?:b|strong)>$/) && parts[index + 1]?.match(/^<\/(?:b|strong)>$/);

    if (part.match(/^<\/?(?:b|strong)>$/)) return null;
    return isBoldText ? <strong className="font-light text-fg" key={index}>{part}</strong> : part;
  });
}

export function About() {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const certifications: Certification[] = certificationsData;
  const PREVIEW_COUNT = 4;
  const visibleCertifications = showAllCerts ? certifications : certifications.slice(0, PREVIEW_COUNT);

  const education = profileData.education;
  const skills = profileData.skills;

  return (
    <section id="about" className="py-[80px] md:py-[120px] px-6 md:px-11">
      <div className="flex justify-between items-center pb-5 border-b border-border mb-10 md:mb-16">
        <div>
          <p className="text-[10px] tracking-[0.14em] uppercase text-muted mb-2">My story</p>
          <h2 className="font-syne text-[14vw] min-[480px]:text-[clamp(52px,8vw,110px)] max-[480px]:hyphens-manual max-[480px]:break-words font-extrabold tracking-[-0.045em] leading-[0.88]">
            About
          </h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-20 mt-12 md:mt-20 items-start">
        <div className="flex flex-col gap-6">
          {profileData.bio.map((paragraph, idx) => (
            <motion.p 
              key={idx}
              className="text-[clamp(17px,1.7vw,22px)] leading-[1.62] font-light text-muted"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: "easeOut" }}
            >
              {renderBoldText(paragraph)}
            </motion.p>
          ))}
          
          <motion.a 
            href="/resume" 
            className="inline-flex items-center gap-[7px] self-start bg-transparent border border-border rounded-full py-[7px] px-[15px] text-muted font-inter text-[11px] tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-300 hover:bg-fg hover:text-bg hover:border-fg group mt-5"
            data-cursor
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
          >
            View Resume
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-all duration-300 group-hover:translate-x-[3px]">
              <path d="M2 12L12 2M12 2H4M12 2V10" />
            </svg>
          </motion.a>

          {/* Core Skills - Desktop only (left column) */}
          <motion.div
            className="hidden md:block mt-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.4, ease: "easeOut" }}
          >
            <h3 className="text-[10px] tracking-[0.14em] uppercase text-muted mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-[7px]">
              {skills.map((s, i) => (
                <span key={i} className="text-[11px] tracking-[0.06em] px-3.5 py-1.5 border border-border rounded-full text-muted">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-col gap-11">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          >
            <h3 className="text-[10px] tracking-[0.14em] uppercase text-muted mb-4">Education</h3>
            <ul className="flex flex-col">
              {education.map((e, i) => (
                <li key={i} className="flex justify-between items-baseline py-3.5 border-b border-border gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-syne text-[14px] font-bold tracking-[-0.01em]">{e.school}</span>
                    <span className="text-[12px] text-muted">{e.degree}</span>
                  </div>
                  <span className="text-[11px] text-muted whitespace-nowrap shrink-0">{e.year}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex justify-between items-baseline mb-4">
              <h3 className="text-[10px] tracking-[0.14em] uppercase text-muted">Certifications</h3>
              <span className="text-[10px] tracking-[0.1em] uppercase text-muted/60">
                {certifications.length} Credentials
              </span>
            </div>
            <ul className="flex flex-col">
              <AnimatePresence initial={false}>
                {visibleCertifications.map((a) => (
                  <motion.li 
                    key={a.title} 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {a.link ? (
                      <a 
                        href={a.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex justify-between items-baseline py-3.5 border-b border-border gap-3 group/cert hover:border-fg/40 transition-colors"
                        data-cursor
                      >
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-syne text-[14px] font-bold tracking-[-0.01em] group-hover/cert:text-accent transition-colors">
                              {a.title}
                            </span>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover/cert:opacity-100 transition-opacity text-accent shrink-0">
                              <path d="M2 10L10 2M10 2H4M10 2V8" />
                            </svg>
                          </div>
                          <span className="text-[12px] text-muted">{a.issuer}</span>
                        </div>
                        <span className="text-[11px] text-muted whitespace-nowrap shrink-0">{a.year}</span>
                      </a>
                    ) : (
                      <div className="flex justify-between items-baseline py-3.5 border-b border-border gap-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-syne text-[14px] font-bold tracking-[-0.01em]">{a.title}</span>
                          <span className="text-[12px] text-muted">{a.issuer}</span>
                        </div>
                        <span className="text-[11px] text-muted whitespace-nowrap shrink-0">{a.year}</span>
                      </div>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            {certifications.length > PREVIEW_COUNT && (
              <button
                type="button"
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="inline-flex items-center gap-2 self-start text-[11px] tracking-[0.09em] uppercase text-muted hover:text-fg transition-all duration-300 group mt-4 py-1 cursor-none"
                data-cursor
              >
                <span>
                  {showAllCerts 
                    ? 'Show fewer' 
                    : `View all (${certifications.length}) certifications`}
                </span>
                <svg 
                  width="11" 
                  height="11" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`transition-transform duration-300 text-accent ${showAllCerts ? 'rotate-180' : ''}`}
                >
                  <path d="M2.5 4.5L6 8L9.5 4.5" />
                </svg>
              </button>
            )}
          </motion.div>
          
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-[10px] tracking-[0.14em] uppercase text-muted mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-[7px]">
              {skills.map((s, i) => (
                <span key={i} className="text-[11px] tracking-[0.06em] px-3.5 py-1.5 border border-border rounded-full text-muted">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
