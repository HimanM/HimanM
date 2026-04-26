'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hoverText, setHoverText] = useState('Guest');

  useEffect(() => {
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const checkHoverSticking = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [data-cursor], .pcard:not(.pcard--wip)');
      
      if (clickable) {
        document.body.classList.add('is-hovering');
        const text = clickable.getAttribute('data-cursor');
        setHoverText(text === 'hi' ? 'Say hi! 👋' : 'Guest');
      } else {
        document.body.classList.remove('is-hovering');
        setHoverText('Guest');
      }
    };

    document.addEventListener('mouseover', checkHoverSticking);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', checkHoverSticking);
      document.body.classList.remove('is-hovering');
    };
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      className="custom-cursor hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className="cursor-arrow absolute top-0 left-0 w-[22px] h-[26px] drop-shadow-md transition-transform duration-200">
        <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L2 21L6.8 16.2L10.4 24L13.4 22.6L9.8 14.8L17 14.8L2 2Z" fill="white" stroke="#0C0C0B" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>
      <div className="cursor-label absolute top-[18px] left-[16px] bg-[#1A1A19] text-[#EDEDE8] font-inter text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full whitespace-nowrap flex items-center gap-[5px] shadow-lg border border-white/10 transition-colors duration-250">
        <span className="cursor-label-dot w-1.5 h-1.5 rounded-full bg-[#FF3D00] shrink-0" />
        <span className="transition-opacity duration-150">{hoverText}</span>
      </div>
    </motion.div>
  );
}
