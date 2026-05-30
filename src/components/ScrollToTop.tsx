/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if page is scrolled past 500 pixels (roughly after Hero section)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          whileHover={{ 
            scale: 1.1, 
            y: -3,
            transition: { duration: 0.2 } 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#2B1B16] text-[#FFFDF9] hover:bg-[#C67B3D] transition-colors duration-300 shadow-[0_8px_25px_rgba(43,27,22,0.3)] border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#C67B3D] focus:ring-offset-2 flex items-center justify-center cursor-pointer group"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-5 h-5 text-[#D9B9A0] group-hover:text-white group-hover:-translate-y-0.5 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
