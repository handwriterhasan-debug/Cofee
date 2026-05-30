/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;

      if (totalScrollable > 0) {
        const percentage = (window.scrollY / totalScrollable) * 100;
        setScrollPercentage(percentage);
      } else {
        setScrollPercentage(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initialize
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="scroll-progress-container"
      className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[100] pointer-events-none"
    >
      <motion.div
        id="scroll-progress-indicator"
        className="h-full bg-gradient-to-r from-[#6B3E26] via-[#C67B3D] to-[#E7C9B2] origin-left shadow-[0_1px_10px_rgba(198,123,61,0.6)]"
        style={{ width: `${scrollPercentage}%` }}
        animate={{ opacity: scrollPercentage > 0.5 ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
