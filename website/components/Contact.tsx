'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('hghimanmanduja@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="pt-[80px] md:pt-[120px] px-6 md:px-11 pb-20">
      <p className="text-[10px] tracking-[0.14em] uppercase text-muted mb-2">Get in touch</p>
      
      <div className="font-syne text-[14vw] min-[480px]:text-[clamp(52px,9vw,130px)] max-[480px]:hyphens-manual max-[480px]:break-words font-extrabold tracking-[-0.045em] leading-[0.88] my-14 md:my-18">
        <span className="block relative pb-[0.2em] -mb-[0.2em]">
          <motion.span 
            className="block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.0, ease: "easeOut" }}
          >
            Say hi!
          </motion.span>
        </span>
        <span className="block relative pb-[0.2em] -mb-[0.2em]">
          <motion.span 
            className="block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
          >
            <a 
              href="mailto:hghimanmanduja@gmail.com" 
              className="relative inline-block transition-colors duration-300 hover:text-accent group"
              data-cursor="hi"
            >
              Let&apos;s talk
              <svg width="0.7em" height="0.7em" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mb-[0.12em] ml-2">
                <path d="M3 15L15 3M15 3H5M15 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="absolute bottom-1.5 left-0 w-0 h-1 bg-accent transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-full" />
            </a>
          </motion.span>
        </span>
      </div>
      
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-9"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 group">
            <p className="text-[13px] text-muted leading-[1.7]">hghimanmanduja@gmail.com</p>
            <button 
              onClick={handleCopy}
              className={`inline-flex items-center justify-center bg-transparent border-none p-0.5 text-muted transition-all duration-200 cursor-none hover:text-fg opacity-0 group-hover:opacity-100 ${copied ? '!text-[#00C96B] !opacity-100' : ''}`}
              aria-label="Copy email address"
            >
              {copied ? (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7l3.5 3.5L11 3" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4.5" y="4.5" width="7" height="7" rx="1.2" />
                  <path d="M1.5 8.5V2.5a1 1 0 0 1 1-1h6" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-[13px] text-muted leading-[1.7]">Colombo, Sri Lanka</p>
        </div>
        
        <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
          <a href="mailto:hghimanmanduja@gmail.com" className="text-[11px] tracking-[0.1em] uppercase text-muted hover:text-fg transition-colors duration-300" data-cursor="hi">
            Email
          </a>
          <a href="https://linkedin.com/in/himanm" target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.1em] uppercase text-muted hover:text-fg transition-colors duration-300" data-cursor="hi">
            LinkedIn
          </a>
          <a href="https://github.com/himanm" target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.1em] uppercase text-muted hover:text-fg transition-colors duration-300" data-cursor="hi">
            GitHub
          </a>
        </div>
      </motion.div>
      
      <p className="text-[11px] text-muted mt-8 text-center pt-8 border-t border-border">
        © 2026 Himan Manduja · DevOps Engineer
      </p>
    </section>
  );
}
