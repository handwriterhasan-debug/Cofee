/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SUSTAINABILITY_PILLARS } from '../data';
import { Award, Leaf, Star, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative vectors / accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT PANEL - Editorial Typography & Core Values list */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#555555] font-extrabold flex items-center space-x-1">
                <Leaf className="w-3.5 h-3.5 text-black" />
                <span>Our Philosophy • Ethical Integrity</span>
              </p>
              <h3 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-tight">
                Slow-Roasting <br />
                With Modern Precision.
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed font-semibold">
              At KAF Coffee, we believe a cup of coffee is the pinnacle of physical gastronomy. Every parameter from single-estate farm latitudes to roasting minutes, mineral water filters, and cold storage thermal blocks are dialled to decimal accuracy.
            </p>

            {/* Structured Pillars Grid */}
            <div className="space-y-6 pt-4">
              {SUSTAINABILITY_PILLARS.map((pillar, idx) => (
                <div
                  id={`about-pillar-${idx}`}
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-neutral-50 hover:bg-white border border-black/5 hover:border-black/20 transition-all duration-300 shadow-xs group"
                >
                  <div className="flex items-start space-x-4">
                    <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black border border-black/10 shrink-0 font-serif italic font-extrabold shadow-sm group-hover:bg-black group-hover:text-white transition-all">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-serif italic font-extrabold text-black text-base group-hover:text-black/85 transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="font-sans text-[11px] sm:text-xs text-neutral-500 mt-1 pr-4 leading-normal font-medium">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL - Immersive Café Visual Mockups */}
          <div className="lg:col-span-6 relative">
            {/* Visual backgrounds shadows and shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-black/5 to-transparent blur-2xl pointer-events-none rounded-3xl" />
            
            {/* Big wide Unsplash image of minimalist clean coffee shop */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/10 ring-12 ring-black/5 aspect-[4/3] group max-w-lg mx-auto lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200"
                alt="KAF Coffee interior design space"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-8" />
              
              {/* Overlay elements details within photo */}
              <div className="absolute bottom-8 left-8 right-8 text-white flex items-end justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-300 font-semibold">Flagship Space</span>
                  <p className="font-serif italic font-bold text-lg mt-0.5">KAF • Islamabad, Pakistan</p>
                  <p className="font-sans text-[10px] text-white/75 mt-1">Matte black elements, soft concrete textures, active roasters.</p>
                </div>
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hidden sm:block">
                  <span className="block text-center font-mono text-[10px] font-bold text-white uppercase leading-none">Rating</span>
                  <span className="block text-center font-serif text-base font-black text-white leading-none mt-1">4.95 ★</span>
                </div>
              </div>
            </div>

            {/* Hovering secondary circular tag details */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-8 -left-2 sm:-left-6 z-20 glass-panel p-4 rounded-2xl shadow-xl max-w-[170px] border border-black/10"
            >
              <div className="flex items-center space-x-1.5 text-black mb-1">
                <Award className="w-3.5 h-3.5 fill-black text-black" />
                <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold">Open Roasters</span>
              </div>
              <p className="font-sans text-[11px] text-black font-bold leading-tight">Live Steeping station</p>
              <p className="font-sans text-[9px] text-neutral-500 mt-0.5">Guests can observe water extraction ratios live at the marble station.</p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
