'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-500 ${
      scrolled 
        ? 'top-3 left-4 right-4 md:top-[16px] md:left-[22%] md:right-[22%] gap-12 p-[12px_20px] md:p-[14px_36px] rounded-full bg-bg/85 backdrop-blur-md shadow-lg shadow-black/10 dark:shadow-black/25' 
        : 'p-[18px_24px] md:py-[22px] md:px-[44px]'
    }`}>
      <Link href="#hero" className="font-syne text-[15px] font-extrabold tracking-tight" data-cursor>
        himanm
      </Link>
      <div className="flex items-center gap-4 md:gap-9">
        <ul className="hidden md:flex items-center gap-7">
          <li>
            <Link href="#work" className="text-xs font-normal tracking-widest uppercase text-muted hover:text-fg relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-fg after:transition-all after:duration-300" data-cursor>
              Work
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-xs font-normal tracking-widest uppercase text-muted hover:text-fg relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-fg after:transition-all after:duration-300" data-cursor>
              About
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-xs font-normal tracking-widest uppercase text-muted hover:text-fg relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-fg after:transition-all after:duration-300" data-cursor>
              Contact
            </Link>
          </li>
        </ul>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center gap-1.5 bg-transparent border border-border rounded-full py-1.5 px-3 md:px-3.5 text-muted font-inter text-[10px] md:text-[11px] tracking-widest uppercase hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300"
          data-cursor
        >
          <span className="text-[13px]">{mounted && theme === 'dark' ? '◐' : '◑'}</span>
          <span className="">{mounted && theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
}
