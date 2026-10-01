'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import profileData from '@/data/profile.json';

export function ResumeViewer() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      const iframe = document.getElementById('resume-pdf-frame') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } else {
        window.open('/resume.pdf', '_blank')?.print();
      }
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 md:px-11 max-w-[1400px] mx-auto min-h-screen flex flex-col">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-border mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link 
              href="/" 
              className="text-[11px] tracking-[0.14em] uppercase text-muted hover:text-fg transition-colors flex items-center gap-1.5"
              data-cursor
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 7H2M2 7L7 12M2 7L7 2" />
              </svg>
              Home
            </Link>
            <span className="text-[11px] text-muted/40">/</span>
            <span className="text-[11px] tracking-[0.14em] uppercase text-muted">Resume</span>
          </div>
          <h1 className="font-syne text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-0.03em] leading-tight">
            Curriculum Vitae
          </h1>
          <p className="text-muted text-[13px] mt-1 font-light">
            {profileData.name} · {profileData.title} · {profileData.location}
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 sm:self-end">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 bg-transparent border border-border rounded-full py-2 px-4 text-muted font-inter text-[11px] tracking-[0.08em] uppercase hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300"
            data-cursor
            title="Print Resume"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6V2h8v4M4 12H3a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v3a2 2 0 01-2 2h-1M4 9h8v5H4V9z" />
            </svg>
            Print
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-transparent border border-border rounded-full py-2 px-4 text-muted font-inter text-[11px] tracking-[0.08em] uppercase hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300"
            data-cursor
            title="Open raw PDF in new tab"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12L12 2M12 2H4M12 2V10" />
            </svg>
            Raw PDF
          </a>

          <a
            href="/resume.pdf"
            download="Himan_Manduja_Resume.pdf"
            className="inline-flex items-center gap-1.5 bg-fg text-bg border border-fg rounded-full py-2 px-4 font-inter text-[11px] tracking-[0.08em] uppercase hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 shadow-sm"
            data-cursor
            title="Download PDF document"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v9M4 8l4 4 4-4M2 14h12" />
            </svg>
            Download
          </a>
        </div>
      </div>

      {/* Viewer Window */}
      <motion.div 
        className={`w-full rounded-2xl border border-border bg-[#141413] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen ? 'fixed inset-4 z-50 max-w-none h-[calc(100vh-32px)]' : 'h-[82vh] md:h-[88vh]'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-[#191918]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-border/60">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent shrink-0">
                <path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6l-4-4z" />
                <path d="M9 2v4h4" />
              </svg>
              <span className="text-[12px] font-mono text-muted tracking-tight truncate max-w-[220px] sm:max-w-none">
                Himan_Manduja_Resume.pdf
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] tracking-[0.08em] uppercase text-muted hover:text-fg transition-colors py-1 px-2.5 border border-border/80 rounded-md cursor-none"
              data-cursor
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewer"}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isFullscreen ? (
                  <path d="M4 1v3H1M10 1v3h3M4 13v-3H1M10 13v-3h3" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M1 4V1h3M13 4V1h-3M1 10v3h3M13 10v3h-3" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
              <span>{isFullscreen ? 'Exit' : 'Expand'}</span>
            </button>
          </div>
        </div>

        {/* Embedded Document Frame */}
        <div className="relative flex-1 w-full h-full bg-[#1b1b1a]">
          <object
            data="/resume.pdf#view=FitH"
            type="application/pdf"
            className="w-full h-full border-0"
            title="Himan Manduja Resume PDF"
          >
            <iframe
              id="resume-pdf-frame"
              src="/resume.pdf#view=FitH"
              className="w-full h-full border-0"
              title="Himan Manduja Resume PDF"
            />
            {/* Fallback for browsers that don't support inline PDF objects */}
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
              <p className="text-[14px] text-muted mb-4">
                Your browser or device does not support embedded PDF preview.
              </p>
              <a
                href="/resume.pdf"
                download="Himan_Manduja_Resume.pdf"
                className="inline-flex items-center gap-2 bg-fg text-bg py-2.5 px-6 rounded-full text-xs uppercase tracking-wider font-semibold"
              >
                Download Resume PDF
              </a>
            </div>
          </object>
        </div>
      </motion.div>

      {/* Quick Mobile Tip */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-muted/70 gap-2">
        <span>Tip: If reading on mobile, use the Download or Raw PDF buttons for full touch zoom.</span>
        <span>Last updated: 2026 · Himan Manduja</span>
      </div>
    </div>
  );
}
