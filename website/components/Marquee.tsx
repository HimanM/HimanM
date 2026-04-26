'use client';
import { motion } from 'motion/react';

export function Marquee() {
  const items = [
    "CI/CD Automation", "Kubernetes", "Docker", "System Design", "Cloud Infrastructure", "DevOps", "AI Practitioner", "Infrastructure as Code", "Claude Code", "Open Source", "Platform Engineering", "Site Reliability", "Agile & DevOps"
  ];
  
  return (
    <div className="py-3.5 overflow-hidden whitespace-nowrap bg-bg border-y border-border flex" aria-hidden="true" style={{ width: '100vw', contain: 'strict' }}>
      <motion.div 
        className="flex min-w-max"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 180, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mq-item font-syne text-[11px] font-semibold tracking-[0.12em] uppercase text-muted px-7 inline-flex items-center gap-14 after:content-['✦'] after:text-[7px]">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
