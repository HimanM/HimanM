'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export function Work() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/himanm/repos')
      .then(res => res.json())
      .then((data: any[]) => {
        if (!Array.isArray(data)) {
            setLoading(false);
            return;
        }
        
        let validRepos = data.filter(r => !r.fork);
        
        // Sort by stars + forks descending
        let sorted = validRepos.sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count));
        
        // limit down to top 10
        sorted = sorted.slice(0, 10);
        
        if (sorted.length > 0) {
          // Identify latest
          const latestObj = [...sorted].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
          
          const formatted = sorted.map((repo, idx) => {
            const tags = [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 3) || ["DevOps", "Cloud"];
            return {
              id: repo.name,
              num: (idx + 1).toString().padStart(2, '0'),
              company: "GitHub",
              name: repo.name.replace(/-/g, ' '),
              year: new Date(repo.created_at).getFullYear().toString(),
              tags: tags.length > 0 ? tags : ["Repository"],
              metrics: [
                { val: repo.stargazers_count.toString(), label: "Stars" },
                { val: repo.forks_count.toString(), label: "Forks" },
              ],
              bgClass: "bg-gradient-to-br from-[#000B35] via-[#001F82] to-[#0050FF]",
              image: `https://opengraph.githubassets.com/1/himanm/${repo.name}`,
              link: repo.html_url,
              website: repo.homepage,
              isWip: repo.id === latestObj.id,
              description: repo.description ? repo.description : "Open source project on GitHub."
            };
          });
          
          setProjects(formatted);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const displayedProjects = isExpanded ? projects.slice(0, 10) : projects.slice(0, 2);

  return (
    <section id="work" className="pt-[80px] md:pt-[120px] pb-[40px] md:pb-[80px] px-6 md:px-11">
      <div className="flex justify-between items-center pb-5 border-b border-border mb-10 md:mb-16">
        <div>
          <p className="text-[10px] tracking-[0.14em] uppercase text-muted mb-2">Open Source Contributions</p>
          <h2 className="font-syne text-[14vw] min-[480px]:text-[clamp(52px,8vw,110px)] max-[480px]:hyphens-manual max-[480px]:break-words font-extrabold tracking-[-0.045em] leading-[0.88]">
            Projects
          </h2>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center text-muted text-sm py-12 flex items-center justify-center min-h-[400px]">Loading projects...</div>
      ) : (
        <motion.div layout className="flex flex-col">
          <AnimatePresence initial={false} mode="sync">
            {displayedProjects.map((p, i) => (
              <motion.article 
                key={p.id}
                layout
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0, marginTop: i > 0 ? 16 : 0 }}
                exit={{ opacity: 0, height: 0, y: -10, marginTop: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  className={`pcard border border-border hover:border-border-hover transition-colors duration-[400ms] rounded-[14px] overflow-hidden group`}
                  data-cursor
                >
                  <Link href={p.link} target="_blank" rel="noopener noreferrer" className="grid grid-cols-1 md:grid-cols-2 md:min-h-[400px]">
                <div className="p-[28px_24px] md:p-[40px_44px] flex flex-col justify-between gap-5 bg-bg">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3.5">
                      <span className="text-[10px] font-semibold tracking-[0.12em] text-muted">{p.num}</span>
                      {p.isWip && (
                        <span className="inline-flex items-center gap-[7px] text-[10px] font-bold tracking-[0.06em] uppercase text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-3 py-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 wip-badge-dot" />
                          LATEST REPO
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {p.tags.map((tag: string) => (
                        <span key={tag} className="text-[9px] tracking-[0.1em] uppercase px-3 py-1 border border-border rounded-full text-muted">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center gap-3.5 py-6">
                    <h3 className="font-inter text-[7vw] min-[480px]:text-[clamp(22px,2.8vw,40px)] font-extrabold tracking-[-0.03em] leading-[1.08] capitalize">{p.name}</h3>
                    <p className="text-[13px] text-muted leading-relaxed mt-2 line-clamp-3">{p.description}</p>
                  </div>
                  
                  <div className="flex gap-[32px] overflow-hidden">
                    {p.metrics.map((m: any, idx: number) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <span className="font-inter text-[30px] font-extrabold tracking-[-0.04em] text-muted whitespace-pre-line leading-tight">{m.val}</span>
                        <span className="text-[11px] text-muted leading-[1.35] max-w-[130px] whitespace-pre-line">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative overflow-hidden h-[220px] md:h-auto order-first md:order-last bg-bg flex items-center justify-center p-6 md:p-12">
                  <div className={`absolute inset-0 ${p.bgClass} transform transition-transform duration-[900ms] group-hover:scale-105`} />
                  
                  <div className="relative w-full h-full rounded-[8px] md:rounded-[12px] overflow-hidden border border-white/20 shadow-2xl z-10 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-[#0d0d0d]">
                    {p.website && p.website.startsWith('http') ? (
                      <>
                        <iframe src={p.website} className="absolute top-0 left-0 w-[200%] h-[200%] scale-50 origin-top-left z-10 border-none bg-white opacity-90 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 transition-all duration-500 pointer-events-none" tabIndex={-1} scrolling="no" title={p.name} />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-20 pointer-events-none" />
                      </>
                    ) : (
                      <>
                        <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover object-center transform transition-all duration-500 group-hover:scale-105 filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 z-10" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/45 z-20 pointer-events-none" />
                      </>
                    )}
                  </div>
                  
                  <div className="absolute bottom-6 right-6 w-11 h-11 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white group-hover:rotate-45 z-30 pointer-events-none text-white group-hover:text-black">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" className="transition-colors">
                      <path d="M2 12L12 2M12 2H4M12 2V10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {projects.length > 2 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-[7px] bg-transparent border border-border rounded-full py-[10px] px-[20px] text-muted font-inter text-[12px] tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-300 hover:bg-fg hover:text-bg hover:border-fg group"
            data-cursor
          >
            {isExpanded ? 'Show Less' : 'View More Projects'}
          </button>
        </div>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mt-12 pt-12 border-t border-border flex items-center justify-between gap-6 flex-wrap"
      >
        <div>
          <p className="text-[14px] font-semibold mb-1">Explore my code</p>
          <p className="text-[13px] text-muted leading-relaxed max-w-xl">
            Check out my GitHub profile to see all my repositories, contributions, and ongoing projects.
          </p>
        </div>
        <a href="https://github.com/himanm" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[7px] self-end bg-transparent border border-border rounded-full py-[7px] px-[15px] text-muted font-inter text-[11px] tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-300 hover:bg-fg hover:text-bg hover:border-fg group" data-cursor>
          GitHub Profile
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-all duration-300 group-hover:translate-x-[3px]">
            <path d="M2 12L12 2M12 2H4M12 2V10" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
