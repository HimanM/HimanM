'use client';

import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="hero" className="min-h-[100svh] flex flex-col justify-end pb-[max(40px,calc(40px+env(safe-area-inset-bottom)))] md:pb-[max(56px,calc(56px+env(safe-area-inset-bottom)))] px-6 md:px-11 relative">
      <motion.p 
        className="text-[11px] tracking-[0.14em] uppercase text-muted mb-5 overflow-hidden"
      >
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
        >
          Software Engineering Grad · DevOps Enthusiast
        </motion.span>
      </motion.p>
      
      <h1 className="font-syne text-[13vw] min-[480px]:text-[clamp(65px,11vw,180px)] font-extrabold tracking-[-0.04em] leading-[0.85] mb-8 md:mb-12 w-full max-w-[1200px]" style={{ contain: 'layout paint' }}>
        <span className="block overflow-hidden relative pb-[0.2em] -mb-[0.2em]">
          <motion.span 
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.05, ease: "easeOut", delay: 0.05 }}
          >
            Himan
          </motion.span>
        </span>
        <span className="block overflow-hidden relative pb-[0.2em] -mb-[0.2em]">
          <motion.span 
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.05, ease: "easeOut", delay: 0.15 }}
          >
            Manduja
          </motion.span>
        </span>
      </h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <motion.p 
          className="max-w-[360px] text-[15px] leading-[1.65] text-muted font-light overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65, ease: "easeOut" }}
        >
          Recent software engineering graduate with hands-on experience in CI/CD automation, cloud infrastructure, and Kubernetes. Based in Colombo, Sri Lanka, looking for DevOps internships.
        </motion.p>
        
        <div className="flex flex-col items-start md:items-end gap-2.5">
          <motion.div 
            className="inline-flex items-center gap-[7px] text-[11px] tracking-[0.09em] uppercase border border-border px-3.5 py-[7px] rounded-full pill-available"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.75, ease: "easeOut" }}
          >
            <span className="pill-dot" />
            Looking for internships
          </motion.div>
          
          <motion.div 
            className="inline-flex items-center gap-[7px] text-[11px] tracking-[0.09em] uppercase border border-border px-3.5 py-[7px] rounded-full text-muted"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.85, ease: "easeOut" }}
          >
            Colombo, Sri Lanka
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute top-[auto] bottom-14 right-6 md:top-[110px] md:bottom-auto md:right-11 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        aria-hidden="true"
      >
        <div className="w-[1px] h-[64px] bg-border relative overflow-hidden">
          <motion.div
            className="absolute left-0 w-full h-full bg-accent"
            animate={{ top: ["-100%", "100%"] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
        <span className="text-[9px] tracking-[0.18em] uppercase text-muted [writing-mode:vertical-lr]">Scroll</span>
      </motion.div>
    </section>
  );
}
