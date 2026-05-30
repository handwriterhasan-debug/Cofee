/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Twitter, Facebook, Heart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer id="contact" className="bg-[#0A0A0A] text-white pt-20 pb-12 relative overflow-hidden border-t border-white/10">
      {/* Editorial layout borders and circles */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Core footer columns structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          
          {/* COLUMN 1 - Brand Identity & Address attributes */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            <a href="#home" className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                <span className="font-serif italic font-extrabold text-sm">K</span>
              </span>
              <div className="flex flex-col">
                <span className="font-serif italic font-bold text-lg text-white tracking-tight leading-none">
                  KAF
                </span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#A3A3A3] font-semibold mt-1">
                  Coffee • Signature
                </span>
              </div>
            </a>
            <p className="font-sans text-xs text-white/70 leading-relaxed font-semibold">
              Elegantly combining premium direct-trade sourcing with state-of-the-art water filtration and roasting parameters for pristine gastronomic cups.
            </p>
            <div className="font-sans text-xs space-y-1.5 font-medium text-[#A3A3A3]">
              <p>📍 Block 7, Roomy Signature Hotel, Super Market, F-6 Markaz, Islamabad, 44000, Pakistan</p>
              <p>📞 +92 (300) 123-4567 • hello@kafcoffee.pk</p>
            </div>
          </div>

          {/* COLUMN 2 - Discover Collections navigation Links */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3] font-extrabold">Discover</h5>
            <div className="flex flex-col space-y-2.5 font-sans text-xs text-white/85 font-semibold">
              <a href="#menu" className="hover:text-[#FFFDF9] hover:underline transition-all">Featured Coffees</a>
              <a href="#customizer" className="hover:text-[#FFFDF9] hover:underline transition-all">Artisan Customizer</a>
              <a href="#about" className="hover:text-[#FFFDF9] hover:underline transition-all">Our Islamabad Spot</a>
              <a href="#experience" className="hover:text-[#FFFDF9] hover:underline transition-all">Coffee Cinema</a>
            </div>
          </div>

          {/* COLUMN 3 - Opening schedules info */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3] font-extrabold">Hours</h5>
            <div className="flex flex-col space-y-2.5 font-mono text-[10px] text-white/85 font-semibold">
              <div className="flex justify-between">
                <span>MON - FRI:</span>
                <span className="text-[#A3A3A3]">8:00a – 11:00p</span>
              </div>
              <div className="flex justify-between">
                <span>SATURDAY:</span>
                <span className="text-[#A3A3A3]">8:00a – 12:00a</span>
              </div>
              <div className="flex justify-between">
                <span>SUNDAY:</span>
                <span className="text-[#A3A3A3]">10:00a – 10:00p</span>
              </div>
              <div className="pt-2 border-t border-white/10 text-center font-sans text-[10px] text-[#A3A3A3] uppercase leading-relaxed font-bold">
                * Holiday hours might vary.
              </div>
            </div>
          </div>

          {/* COLUMN 4 - Newsletter input subscribe simulations with interactive status */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3] font-extrabold">The KAF Journal</h5>
            <p className="font-sans text-xs text-white/70 leading-relaxed font-semibold">
              Subscribe to unlock quarterly roast calendars, exclusive tasting guides, and coffee methodology writeups.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <div className="flex items-center overflow-hidden rounded-full bg-white/10 border border-white/15 hover:border-white transition-colors p-1.5">
                <Mail className="w-4 h-4 text-white/50 ml-3 shrink-0" />
                <input
                  id="newsletter-email-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email to join..."
                  className="w-full bg-transparent border-none py-1.5 px-3 font-sans text-xs text-white placeholder-white/40 outline-none leading-none"
                  disabled={subscribed}
                />
                
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  disabled={subscribed}
                  className="p-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold uppercase transition-colors shrink-0 cursor-pointer flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subscribe feedback popover animation */}
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-14 left-0 right-0 p-3 bg-neutral-800 border border-white/20 rounded-xl text-white text-[10px] font-sans font-extrabold tracking-wider uppercase flex items-center justify-center space-x-1 shadow-md z-20"
                  >
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span>KAF Journal Subscribed!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Lower footer copyright details and interactive social handlers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-white/50 font-sans text-[10px] font-semibold tracking-wider">
          <p className="text-center sm:text-left mb-4 sm:mb-0">
            © 2026 KAF Coffee • Crafted with premium parameters. All Rights Reserved.
          </p>
          
          {/* Social connections */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.instagram.com/kaf_pk/?hl=en" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors" 
              aria-label="KAF Coffee Instagram link"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://www.instagram.com/kaf_pk/?hl=en" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors" 
              aria-label="KAF Coffee Twitter link"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://www.instagram.com/kaf_pk/?hl=en" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors" 
              aria-label="KAF Coffee Facebook link"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
