/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Smartphone, Sparkles, Check, Gift, Milestone, Award, QrCode, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MobileAppSection() {
  const [loyaltyBeans, setLoyaltyBeans] = useState(4);
  const [claimed, setClaimed] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);

  const handleCollectBean = () => {
    if (loyaltyBeans >= 10) {
      // already full
      return;
    }
    setLoyaltyBeans(prev => prev + 1);
  };

  const handleClaimReward = () => {
    if (loyaltyBeans < 10) return;
    setClaimed(true);
    setTimeout(() => {
      setLoyaltyBeans(0);
      setClaimed(false);
    }, 2500);
  };

  return (
    <section id="app" className="py-24 bg-[#FFFDF9] relative overflow-hidden">
      {/* Editorial layout circles */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F7F3EE] rounded-tl-full pointer-events-none opacity-40" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#E7C9B2]/10 rounded-br-full pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT PANEL - Description and features */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-[#6B3E26]/10 px-4 py-1.5 rounded-full border border-[#E7C9B2]/20"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#6B3E26]" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#6B3E26] font-bold">
                  Veloura Digital Club • iOS & Android
                </span>
              </motion.div>

              <h3 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2B1B16] leading-tight">
                Order Ahead. <br />
                Collect Veloura Stars.
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#777777] leading-relaxed font-semibold">
              Elevate your coffee routine with our customized digital companion. Store your favorite sugar ratios in your Cloud iCloud profile, scan at any reserve marble bar, and unlock exclusive microlot drops available only for club members.
            </p>

            {/* Custom Interactive features summaries */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-2 rounded-lg bg-[#E7C9B2]/25 text-[#6B3E26]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs sm:text-sm font-bold text-[#2B1B16]">Siri Customizer Integration</h4>
                  <p className="font-sans text-[11px] sm:text-xs text-[#777777] mt-0.5 font-semibold">
                    Voice trigger your favorite recipe variant directly from your home screen. "Hey Siri, brew my Veloura."
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 p-2 rounded-lg bg-[#E7C9B2]/25 text-[#6B3E26]">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs sm:text-sm font-bold text-[#2B1B16]">Exclusive Reserve Drops</h4>
                  <p className="font-sans text-[11px] sm:text-xs text-[#777777] mt-0.5 font-semibold">
                    Unlock rare Antigua micro-lot beans, sun-dried honey collections, and specialized Geisha roast events weeks before standard guests.
                  </p>
                </div>
              </div>
            </div>

            {/* App Store / Google Play Mock buttons */}
            <div id="app-download-actions" className="flex flex-wrap items-center gap-4 pt-4">
              <div className="cursor-pointer bg-[#2B1B16] text-[#FFFDF9] px-6 py-3 rounded-2xl flex items-center space-x-3 hover:bg-[#6B3E26] transition-colors border border-[#E7C9B2]/20 shadow-md">
                <Smartphone className="w-6 h-6 text-[#E7C9B2]" />
                <div className="text-left leading-none">
                  <span className="block text-[9px] uppercase tracking-widest text-[#E7C9B2]">Download on the</span>
                  <span className="block font-sans text-sm font-black mt-1">App Store</span>
                </div>
              </div>

              <div className="cursor-pointer bg-white text-[#2B1B16] px-6 py-3 rounded-2xl flex items-center space-x-3 hover:bg-[#F7F3EE] transition-colors border border-[#E7C9B2]/30 shadow-xs">
                <QrCode className="w-6 h-6 text-[#6B3E26]" />
                <div className="text-left leading-none">
                  <span className="block text-[9px] uppercase tracking-widest text-[#777777]">Scan QR for install</span>
                  <span className="block font-sans text-xs font-bold mt-1 text-[#6B3E26]">Get Digital Link</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Live Interactive Phone Simulator rendering loyalty cards */}
          <div className="lg:col-span-6 flex justify-center">
            
            <div className="relative w-80 h-[580px] bg-[#1B1B1B] rounded-[3rem] p-3.5 shadow-2xl border-4 border-[#E7C9B2]/30 ring-12 ring-[#2B1B16]/20 overflow-hidden flex flex-col justify-between">
              
              {/* Dynamic island notch representation */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#000] rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full ml-auto mr-4" />
              </div>

              {/* iOS Live screen element */}
              <div className="w-full h-full bg-[#FFFDF9] rounded-[2.3rem] overflow-hidden flex flex-col p-5 relative select-none">
                
                {/* Header status bar inside phone */}
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#2B1B16] tracking-tight mb-4 mt-2">
                  <span>9:41 AM</span>
                  <div className="flex items-center space-x-1.5">
                    <span>5G</span>
                    <span className="w-5 h-2.5 border border-black/30 rounded-xs flex items-center p-0.5"><span className="w-full h-full bg-[#2B1B16] rounded-xs" /></span>
                  </div>
                </div>

                {/* Main App Layout */}
                <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                  
                  {/* Digital App greeting and logo */}
                  <div className="flex items-center justify-between border-b border-[#E7C9B2]/10 pb-3 mb-4">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#2B1B16] flex items-center justify-center text-[#FFFDF9]"><span className="font-serif italic font-bold text-[10px]">V</span></span>
                      <span className="font-serif italic font-bold text-xs text-[#2B1B16]">Veloura Reserve</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#C67B3D] font-bold">VIP CLUB</span>
                  </div>

                  {/* Core App Display 1: Interactive RFID Loyalty card with subtle metal gradients */}
                  <div className="bg-gradient-to-tr from-[#2B1B16] via-[#6B3E26] to-[#C67B3D] p-4 rounded-2xl text-white shadow-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl pointer-events-none" />
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-[#E7C9B2] font-semibold leading-none">Club ID Card</span>
                        <h5 className="font-serif italic text-sm font-bold mt-1 max-w-[120px] leading-tight">Veloura Member</h5>
                      </div>
                      <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#D9B9A0]" />
                      </div>
                    </div>

                    {/* Coffee Stars/Beans count visualizer info */}
                    <div className="mt-8">
                      <span className="block text-[8px] uppercase tracking-widest text-[#E7C9B2] font-semibold">Stars Balance</span>
                      <div className="flex items-baseline space-x-1 mt-0.5">
                        <span className="font-mono text-2xl font-black">{loyaltyBeans}</span>
                        <span className="text-xs text-[#E7C9B2]/80">/ 10 beans</span>
                      </div>
                    </div>

                    {/* Progress slider bar showing target to free beverage */}
                    <div className="mt-2.5">
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D9B9A0] to-[#FFFDF9] rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${(loyaltyBeans / 10) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[8px] mt-1.5 text-white/70">
                        <span>{10 - loyaltyBeans} stars to 1 free Reserve blend</span>
                        <span>Level III</span>
                      </div>
                    </div>
                  </div>

                  {/* Core App Display 2: Interactive Grid progress dots click simulator */}
                  <div className="my-4 p-4 rounded-2xl bg-[#F7F3EE] border border-[#E7C9B2]/20 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="block font-mono text-[8px] text-[#C67B3D] uppercase tracking-widest font-bold mb-2">My Bean Milestones</span>
                      
                      {/* Grid representation of 10 coffee stars */}
                      <div className="grid grid-cols-5 gap-2">
                        {[...Array(10)].map((_, index) => {
                          const isActive = index < loyaltyBeans;
                          return (
                            <motion.div
                              id={`phone-loyalty-star-${index}`}
                              animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                              key={index}
                              className={`aspect-square rounded-full flex items-center justify-center transition-all ${
                                isActive
                                  ? 'bg-[#6B3E26] text-white font-serif italic text-[10px] font-extrabold shadow-sm'
                                  : 'border border-[#E7C9B2]/40 bg-white text-[#777777]'
                              }`}
                            >
                              {isActive ? '★' : 'o'}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interaction Buttons details */}
                    <div className="mt-3 inline-flex items-center justify-between w-full">
                      {loyaltyBeans >= 10 ? (
                        <button
                          id="phone-claim-coupon-btn"
                          onClick={handleClaimReward}
                          disabled={claimed}
                          className="w-full py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider transition-all animate-bounce"
                        >
                          {claimed ? 'Claimed! Check Email' : 'Claim Free Americano 🎁'}
                        </button>
                      ) : (
                        <button
                          id="phone-simulate-scan-btn"
                          onClick={handleCollectBean}
                          className="w-full py-2 bg-[#2B1B16] hover:bg-[#6B3E26] text-[#FFFDF9] rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider transition-all duration-300 shadow-xs"
                        >
                          Simulate QR Scan (+1 Star)
                        </button>
                      )}
                    </div>
                  </div>

                  {/* App utility indicators */}
                  <div className="flex justify-around items-center pt-2.5 border-t border-[#E7C9B2]/10 mt-auto">
                    <div className="flex flex-col items-center text-[#C67B3D] cursor-pointer">
                      <Smartphone className="w-4 h-4" />
                      <span className="text-[7px] font-bold mt-0.5">Reserve</span>
                    </div>
                    <div
                      id="utility-qr-simulate"
                      onClick={() => setShowBarcode(!showBarcode)}
                      className="flex flex-col items-center text-[#777777] hover:text-[#2B1B16] cursor-pointer"
                    >
                      <QrCode className="w-4 h-4" />
                      <span className="text-[7px] mt-0.5">Quick Scan</span>
                    </div>
                  </div>

                </div>

                {/* Sub-overlay representing Scan QR / Barcode popover simulated */}
                <AnimatePresence>
                  {showBarcode && (
                    <motion.div
                      initial={{ opacity: 0, y: '50%' }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: '50%' }}
                      className="absolute inset-0 bg-black/90 z-40 flex flex-col items-center justify-center p-8 text-center text-white rounded-[2.3rem]"
                    >
                      <button
                        id="phone-close-barcode-btn"
                        onClick={() => setShowBarcode(false)}
                        className="absolute top-4 right-4 text-white/60 p-1.5 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="font-mono text-[8px] uppercase tracking-widest text-[#E7C9B2] font-semibold mb-4">Scan barcodes at cash registry</p>
                      
                      {/* Fake stylized scan RFID patterns */}
                      <div className="p-4 bg-white rounded-2xl flex items-center justify-center select-none shadow-lg">
                        <QrCode className="w-32 h-32 text-black" />
                      </div>
                      <p className="font-mono text-[9px] text-white/80 mt-4 font-bold">VIP_MEMBER_986D012B</p>
                      <span className="block text-[8px] text-white/50 mt-1">Updates stars instantly on extraction parameters.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
