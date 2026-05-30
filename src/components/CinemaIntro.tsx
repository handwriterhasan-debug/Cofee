/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Coffee } from 'lucide-react';

interface CinemaIntroProps {
  onExplore: () => void;
}

export default function CinemaIntro({ onExplore }: CinemaIntroProps) {
  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    // Trigger button animation delay for a cinematic feel
    const timer = setTimeout(() => {
      setAnimateButton(true);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="cinema-intro-overlay"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-[#DFD3C6] py-12 px-6 select-none"
    >
      {/* Cinematic subtle grid design details to keep luxury aesthetic */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1B1B1B_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Top micro elements (subtle header detail) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex flex-col items-center text-center space-y-1"
      >
        <div className="flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#6B3E26]" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#2B1B16] font-extrabold">
            Reserve Artisanal Experience
          </span>
        </div>
      </motion.div>

      {/* Center Video/Cinema Container with fallback and slow Ken Burns entrance */}
      <div className="relative flex-1 w-full max-w-4xl flex items-center justify-center my-4 overflow-hidden px-4 md:px-0">
        {/* Soft shadow background blur */}
        <div className="absolute w-[80%] h-[70%] bg-[#C67B3D]/10 rounded-full filter blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ 
            opacity: 1, 
            scale: 1 
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_25px_60px_-15px_rgba(43,27,22,0.35)] ring-1 ring-[#2B1B16]/10 flex items-center justify-center bg-[#DFD3C6]"
        >
          <video
            src="https://res.cloudinary.com/dxxjtyvmk/video/upload/v1780132101/Create_smooth_animation_202605301340_w2fvtw.mp4"
            poster="https://i.ibb.co/QvkmHXw9/Chat-GPT-Image-May-28-2026-04-39-11-PM.png"
            className="w-full h-full object-cover select-none"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Subtle elegant glass overlay tag */}
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[9px] font-mono tracking-wider text-white border border-white/10 uppercase">
            Ambient Active Canvas
          </div>
        </motion.div>
      </div>

      {/* Footer / High contrast Explore Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: animateButton ? 1 : 0, y: animateButton ? 0 : 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xs flex flex-col items-center space-y-3"
      >
        <button
          id="cinema-explore-action"
          onClick={onExplore}
          className="group w-full relative overflow-hidden bg-[#2B1B16] hover:bg-[#6B3E26] text-[#FFFDF9] py-4.5 px-8 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-350 shadow-[0_12px_30px_rgba(43,27,22,0.3)] flex items-center justify-center space-x-3 cursor-pointer transform hover:scale-[1.03] active:scale-[0.98]"
        >
          {/* Subtle inside shine animation */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <Coffee className="w-4 h-4 text-[#D9B9A0] group-hover:rotate-12 transition-transform duration-300" />
          
          <span className="relative z-10 tracking-[0.25em]">Explore Veloura</span>
          
          <ArrowRight className="w-4 h-4 text-[#D9B9A0] group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>

        <p className="font-mono text-[8px] uppercase tracking-widest text-[#2B1B16]/50">
          Click to enter the sanctuary
        </p>
      </motion.div>
    </div>
  );
}
