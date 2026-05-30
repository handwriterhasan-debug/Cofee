/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useCoffee } from '../context/CoffeeContext';
import { Sparkles, Calendar, Award, ArrowUpRight, Zap } from 'lucide-react';

export default function Hero() {
  const { setSelectedDrinkForCustomizer } = useCoffee();

  const handleOrderLatest = () => {
    // Scroll to customization container
    const el = document.getElementById('customizer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center bg-gradient-to-tr from-[#FFFDF9] via-[#F7F3EE] to-[#EFEAE2] overflow-hidden"
    >
      {/* Subtle Cinematic Grid/Noise Background detail */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#2B1B16_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Coffee bean outline stroke-only top-right */}
      <motion.svg
        className="absolute right-[8%] top-[14%] w-28 h-28 text-[#6B3E26]/8 pointer-events-none select-none z-0 hidden md:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          rotate: [0, 15, -10, 0],
          y: [0, -8, 4, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M5 12a7 7 0 0 1 14 0 7 7 0 0 1-14 0Z" />
        <path d="M12 5c0 3.5-2 6.5-5 7 5 .5 7 3.5 7 7" />
      </motion.svg>

      {/* Gooseneck Kettle outline stroke-only bottom-left */}
      <motion.svg
        className="absolute left-[3%] bottom-[12%] w-36 h-36 text-[#6B3E26]/6 pointer-events-none select-none z-0 hidden lg:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          rotate: [0, -6, 4, 0],
          y: [0, 6, -4, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M35,75 C35,50 40,40 50,40 L65,40 L62,75 Z" />
        <path d="M42,40 L45,28 L58,28 L61,40" />
        <circle cx="51.5" cy="24" r="2" />
        <path d="M38,45 L26,45 L26,68 L38,68" />
        <path d="M64,48 C72,48 76,38 80,48" />
        <path d="M80,48 C81,50 80,53 79,55" />
      </motion.svg>

      {/* Espresso Cup outline stroke-only bottom-right */}
      <motion.svg
        className="absolute right-[4%] bottom-[10%] w-40 h-40 text-[#6B3E26]/6 pointer-events-none select-none z-0 hidden lg:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          y: [0, 10, -5, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Saucer */}
        <path d="M20,72 L80,72 C85,72 85,76 80,76 L20,76 C15,76 15,72 20,72 Z" />
        {/* Cup */}
        <path d="M28,45 L72,45 C72,62 65,72 50,72 C35,72 28,62 28,45 Z" />
        {/* Handle */}
        <path d="M72,50 C78,50 80,58 72,62" />
        {/* Steam */}
        <path d="M44,35 C44,27 47,27 47,19" />
        <path d="M50,37 C50,29 53,29 53,21" />
        <path d="M56,35 C56,27 59,27 59,19" />
      </motion.svg>

      {/* Editorial Decorative Background Elements */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -35, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-[#E7C9B2]/15 rounded-full filter blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -25, 30, 0],
          y: [0, 35, -25, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#6B3E26]/8 rounded-full filter blur-[100px] pointer-events-none"
      />

      {/* Abstract background giant typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.015] w-full text-center">
        <h1 className="font-serif italic font-black text-[15rem] leading-none uppercase tracking-tighter">
          Veloura
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* LEFT COLUMN - Premium Editorial Typo & copy */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E7C9B2]/30 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C67B3D] animate-spin" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#2B1B16] font-extrabold">
              Veloura Reserve • Summer 2026 Collection
            </span>
          </motion.div>

          {/* Large display headline with Playfair-serif mix */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#2B1B16] leading-[1.05] font-extrabold max-w-xl mx-auto lg:mx-0"
          >
            Crafted <br />
            <span className="font-sans not-italic text-[#6B3E26]">Coffee </span> 
             Experiences.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-sm sm:text-base text-[#777777] leading-relaxed max-w-md mx-auto lg:mx-0 font-medium"
          >
            Premium handcrafted estate-grown cold drinks, prepared with artisanal roasting parameters, organic cold milks, and signature caramel infusions.
          </motion.p>

          {/* Call to actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <a
              id="hero-explore-menu-btn"
              href="#menu"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2B1B16] hover:bg-[#6B3E26] text-[#FFFDF9] font-sans text-xs font-bold tracking-widest uppercase transition-all duration-350 shadow-lg shadow-[#2B1B16]/10 flex items-center justify-center space-x-2"
            >
              <span>Explore Premium Menu</span>
            </a>
            <button
              id="hero-order-custom-btn"
              onClick={handleOrderLatest}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#F7F3EE] text-[#2B1B16] border border-[#E7C9B2]/40 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-350 flex items-center justify-center space-x-2 shadow-xs group"
            >
              <span>Customizer Board</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Minimal specs block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-3 gap-6 pt-10 border-t border-[#E7C9B2]/30 max-w-sm mx-auto lg:mx-0 text-left"
          >
            <div>
              <span className="block font-serif italic text-xl font-bold text-[#6B3E26]">98 pts</span>
              <span className="block font-sans text-[10px] uppercase tracking-widest text-[#777777] font-medium mt-1">Roast Rating</span>
            </div>
            <div>
              <span className="block font-serif italic text-xl font-bold text-[#6B3E26]">100%</span>
              <span className="block font-sans text-[10px] uppercase tracking-widest text-[#777777] font-medium mt-1">Sustain Sourced</span>
            </div>
            <div>
              <span className="block font-serif italic text-xl font-bold text-[#6B3E26]">0:20h</span>
              <span className="block font-sans text-[10px] uppercase tracking-widest text-[#777777] font-medium mt-1">Slow Steeped</span>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN - Interlocking layers of modern images and card banners */}
        <div id="hero-beverage-showcase" className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
          
          {/* Main big graphic glow circle behind cup */}
          <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#E7C9B2]/40 to-[#6B3E26]/20 shadow-xl blur-md pointer-events-none" />

          {/* Centerpiece Beverage Video Loop in 16:9 landscape aspect ratio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ 
              scale: 1.04, 
              y: -8, 
              rotate: 1,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
            className="relative z-20 w-full max-w-md sm:max-w-lg aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl shadow-[#6B3E26]/10 border border-white/60 ring-8 ring-white/20 select-none group cursor-pointer bg-[#DFD3C6]"
          >
            <video
              id="hero-featured-cup-video"
              src="https://res.cloudinary.com/dxxjtyvmk/video/upload/v1779971935/Ice_falling_into_cup_202605281738_yxmqqt.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 pointer-events-none"
            />
            {/* Dark gradient overlay on bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B16]/95 via-[#2B1B16]/30 to-transparent flex flex-col justify-end p-6" />
            
            {/* Text on card */}
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#E7C9B2] font-semibold">Interactive Brew Loop</span>
              <h3 className="font-serif italic font-semibold text-lg sm:text-xl leading-tight mt-1">Under-Ice Press Brew</h3>
            </div>
          </motion.div>

          {/* FLOATING GLASS CARD 1 - Nutrition specs */}
          <motion.div
            animate={{
              y: [0, -14, 0],
              x: [0, 6, 0],
              rotate: [1, -1.5, 1]
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05 }}
            className="absolute -top-1 right-2 sm:right-10 z-30 glass-panel p-4 rounded-2xl shadow-lg border border-white/60 max-w-[170px] cursor-default"
          >
            <div className="flex items-center space-x-2 text-[#C67B3D] mb-1">
              <Zap className="w-3.5 h-3.5 fill-[#C67B3D]" />
              <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold">Nutrition Specs</span>
            </div>
            <p className="font-sans text-xs font-bold text-[#2B1B16] leading-tight">110 kcal</p>
            <span className="block font-sans text-[9px] text-[#777777] mt-0.5">Steeped in cold water, 50% Organic sweetener cane</span>
          </motion.div>

          {/* FLOATING GLASS CARD 2 - Origin badges */}
          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, -5, 0],
              rotate: [-1, 1.5, -1]
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-4 left-2 sm:left-4 z-30 glass-panel p-4 rounded-2xl shadow-lg border border-white/60 max-w-[190px] cursor-default"
          >
            <div className="flex items-center space-x-2 text-[#6B3E26] mb-1.5">
              <Award className="w-4 h-4" />
              <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold">Reserve Blend</span>
            </div>
            <p className="font-serif italic text-xs font-bold text-[#1B1B1B] leading-tight">Single Estate Antigua</p>
            <p className="font-sans text-[9px] text-[#777777] mt-1 leading-normal">Organic beans sun-dried over cedar boxes for natural complexity.</p>
          </motion.div>

          {/* FLOATING CIRCULAR ACCENT - Calendar booking prompt */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.12 }}
            className="absolute bottom-20 -right-2 sm:-right-6 z-30 bg-[#2B1B16] text-[#FFFDF9] p-4 rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-2xl text-center cursor-pointer hover:bg-[#C67B3D] transition-all duration-300"
            onClick={handleOrderLatest}
          >
            <Calendar className="w-4 h-4 text-[#D9B9A0] mb-1" />
            <span className="font-sans text-[8px] uppercase tracking-widest font-bold leading-none">Customize Now</span>
            <span className="font-mono text-[9px] text-[#E7C9B2] font-semibold mt-0.5">Barista Panel</span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
