'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader() {
  const [loading, setLoading] = useState(true);

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (sessionStorage.getItem('himan_visited')) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setTimeout(() => setLoading(false), 0);
    } else {
      sessionStorage.setItem('himan_visited', '1');
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="preloader"
          aria-hidden="true"
          className="fixed inset-0 bg-bg z-[9000] flex items-center justify-center flex-col gap-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="pl-bar-wrap w-[160px] h-[1px] bg-border overflow-hidden">
            <motion.div
              className="pl-bar h-full bg-fg"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
