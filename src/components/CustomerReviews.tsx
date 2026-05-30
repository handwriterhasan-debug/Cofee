/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TESTIMONIALS } from '../data';
import { Quote, Star, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function CustomerReviews() {
  return (
    <section id="experience" className="py-24 bg-[#F7F3EE] relative overflow-hidden">
      {/* Editorial layout borders */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E7C9B2]/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E7C9B2]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header content */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C67B3D] font-extrabold flex items-center justify-center space-x-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Tested Gastronomy Critiques</span>
          </p>
          <h3 className="font-serif italic font-extrabold text-[#2B1B16] text-3xl sm:text-4xl leading-tight">
            Guest Experiences
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#777777] font-semibold leading-relaxed">
            Read critical notes on our cold drip emulsions, vanilla cascades, and overall customer service left by designers, critics, and coffee purists alike.
          </p>
        </div>

        {/* Testimonials cards Grid layout */}
        <div id="testimonials-row" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              id={`testimonial-card-${review.id}`}
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#E7C9B2]/20 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Giant quote mark element absolute */}
              <div className="absolute top-6 right-8 text-[#E7C9B2]/20 group-hover:text-[#C67B3D]/15 transition-transform duration-300 pointer-events-none select-none">
                <Quote className="w-12 h-12 stroke-[1.2] rotate-180" />
              </div>

              <div className="space-y-4">
                {/* Visual Interlocking Rating stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className="w-3.5 h-3.5 fill-[#C67B3D] stroke-[#C67B3D]"
                    />
                  ))}
                </div>

                {/* Comment review */}
                <p className="font-sans text-xs sm:text-sm text-[#1B1B1B] leading-relaxed font-semibold italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author profile tag */}
              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-[#E7C9B2]/10 relative z-10 w-full">
                <img
                  src={review.avatar}
                  alt={review.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-[#E7C9B2]/20 shadow-inner group-hover:border-[#C67B3D] transition-colors"
                />
                <div>
                  <h4 className="font-serif italic font-extrabold text-[#2B1B16] text-sm">
                    {review.name}
                  </h4>
                  <p className="font-sans text-[10px] text-[#777777] font-semibold tracking-wider">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial awards credit row */}
        <div id="cafe-press-awards-bar" className="mt-16 pt-12 border-t border-[#E7C9B2]/20 flex flex-wrap items-center justify-center gap-12 text-center opacity-70">
          <p className="font-mono text-[9px] text-[#777777] uppercase tracking-widest font-extrabold">FEATURED IN</p>
          <span className="font-serif italic text-sm font-black text-[#6B3E26]">THE NEW YORK GASTRONOMIST</span>
          <span className="font-serif italic text-sm font-black text-[#6B3E26]">DAILY BREW REPORT</span>
          <span className="font-serif italic text-sm font-black text-[#6B3E26]">ESTATE TRACE MONTHLY</span>
          <span className="font-serif italic text-sm font-black text-[#6B3E26]">DESIGN REVELATION</span>
        </div>

      </div>
    </section>
  );
}
