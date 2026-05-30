/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { useCoffee, DEFAULT_CUSTOMIZATIONS } from '../context/CoffeeContext';
import { CustomizeOptions } from '../types';
import { Coffee, GlassWater, Sparkles, ShoppingBag, Check, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DrinkCustomizer() {
  const { selectedDrinkForCustomizer, setSelectedDrinkForCustomizer, addToCart, setCartOpen } = useCoffee();
  const [customs, setCustoms] = useState<CustomizeOptions>({ ...DEFAULT_CUSTOMIZATIONS });
  const [livePrice, setLivePrice] = useState(selectedDrinkForCustomizer.price);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recentCreations, setRecentCreations] = useState<any[]>([]);
  const isLoadingCreationRef = useRef(false);

  // Sync state whenever the selected drink changes!
  useEffect(() => {
    if (isLoadingCreationRef.current) {
      isLoadingCreationRef.current = false;
      return;
    }
    setCustoms({ ...DEFAULT_CUSTOMIZATIONS });
  }, [selectedDrinkForCustomizer]);

  // Load recent creations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('veloura_recent_creations');
    if (saved) {
      try {
        setRecentCreations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent creations', e);
      }
    }
  }, []);

  // Handle active calculated price summaries
  useEffect(() => {
    let price = selectedDrinkForCustomizer.price;

    // Size modifiers
    if (customs.size === 'Grande') price += 0.50;
    if (customs.size === 'Velvet XL') price += 0.95;

    // Milk modifiers
    if (customs.milk === 'Oat Milk' || customs.milk === 'Almond Milk' || customs.milk === 'Coconut Milk') {
      price += 0.60;
    }

    // Double shot modifier
    if (customs.extraShot) {
      price += 1.00;
    }

    setLivePrice(price);
  }, [customs, selectedDrinkForCustomizer]);

  const handleSizeChange = (size: CustomizeOptions['size']) => {
    setCustoms({ ...customs, size });
  };

  const handleMilkChange = (milk: CustomizeOptions['milk']) => {
    setCustoms({ ...customs, milk });
  };

  const handleSweetenerChange = (sweetener: CustomizeOptions['sweetener']) => {
    setCustoms({ ...customs, sweetener });
  };

  const handleIceChange = (iceLevel: CustomizeOptions['iceLevel']) => {
    setCustoms({ ...customs, iceLevel });
  };

  const handleSugarChange = (sugarLevel: CustomizeOptions['sugarLevel']) => {
    setCustoms({ ...customs, sugarLevel });
  };

  const toggleExtraShot = () => {
    setCustoms({ ...customs, extraShot: !customs.extraShot });
  };

  const handleAddCustomToBag = () => {
    addToCart(selectedDrinkForCustomizer, customs, livePrice, 1);

    // Save to Recent Creations
    const newCreation = {
      id: `${selectedDrinkForCustomizer.id}-${Date.now()}`,
      drink: selectedDrinkForCustomizer,
      customizations: { ...customs },
      finalPrice: livePrice,
      timestamp: Date.now()
    };

    setRecentCreations((prev) => {
      // Filter out identical items to avoid duplicating the same design in list
      const filtered = prev.filter((item) => {
        const isSameDrink = item.drink.id === selectedDrinkForCustomizer.id;
        const isSameCustoms = JSON.stringify(item.customizations) === JSON.stringify(customs);
        return !(isSameDrink && isSameCustoms);
      });
      const updated = [newCreation, ...filtered].slice(0, 3);
      localStorage.setItem('veloura_recent_creations', JSON.stringify(updated));
      return updated;
    });

    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setCartOpen(true); // Open the side bag popup directly!
    }, 850);
  };

  const handleLoadCreation = (creation: any) => {
    isLoadingCreationRef.current = true;
    setSelectedDrinkForCustomizer(creation.drink);
    setCustoms(creation.customizations);

    // Smooth scroll back to customizer workspace
    const customizerSection = document.getElementById('customizer');
    if (customizerSection) {
      customizerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickAdd = (creation: any) => {
    addToCart(creation.drink, creation.customizations, creation.finalPrice, 1);
    setCartOpen(true);
  };

  const getCustomsSummary = (opts: CustomizeOptions) => {
    const parts: string[] = [];
    parts.push(opts.size);
    if (opts.milk !== 'Whole Milk') {
      parts.push(opts.milk);
    }
    if (opts.sweetener !== 'None') {
      parts.push(opts.sweetener);
    }
    if (opts.iceLevel !== 'Regular') {
      parts.push(`${opts.iceLevel} Ice`);
    }
    if (opts.sugarLevel !== '50%') {
      parts.push(`${opts.sugarLevel} Sugar`);
    }
    if (opts.extraShot) {
      parts.push('+Double Shot');
    }
    return parts.join(' • ');
  };

  return (
    <section id="customizer" className="py-24 bg-[#F7F3EE] relative overflow-hidden">
      {/* Editorial aesthetic circles */}
      <div className="absolute top-12 left-12 w-64 h-64 bg-[#E7C9B2]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-96 h-96 bg-[#2B1B16]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Group */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C67B3D] font-extrabold flex items-center justify-center space-x-1.5">
            <Coffee className="w-3.5 h-3.5" />
            <span>Interactive Customization Laboratory</span>
          </p>
          <h3 className="font-serif italic font-extrabold text-[#2B1B16] text-3xl sm:text-4xl leading-tight">
            Design Your Recipe
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#777777] font-semibold leading-relaxed">
            Click any signature beverage from our menu above to load it here, then fine-tune sizes, oat dilutions, syrups, and espresso shot volumes.
          </p>
        </div>

        {/* Master customizer split screen panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* COLUMN LEFT: Live presentation card displaying the selected drink */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#FFFDF9] rounded-3xl p-8 border border-[#E7C9B2]/20 shadow-md relative overflow-hidden">
            {/* Background design glow */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#E7C9B2]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C67B3D] font-bold bg-[#E7C9B2]/20 px-3 py-1 rounded-full">
                Active Recipe
              </span>

              {/* Live customizer glass image showcase */}
              <div className="my-8 relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#E7C9B2]/20 shadow-md">
                <img
                  src={selectedDrinkForCustomizer.image}
                  alt={selectedDrinkForCustomizer.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating parameters specs inside details absolute */}
                <div className="absolute top-4 left-4 dark-glass-panel px-3 py-1 rounded-full text-white text-[9px] font-mono tracking-widest uppercase font-semibold">
                  Standard: {selectedDrinkForCustomizer.calories} kcal
                </div>

                {/* Subtle dark layout overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B16]/80 via-transparent to-transparent flex flex-col justify-end p-6" />
                
                {/* Visual specifications lists */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono text-[#D9B9A0] font-bold tracking-widest uppercase">
                    {selectedDrinkForCustomizer.category} Selection
                  </span>
                  <h4 className="font-serif italic font-extrabold text-xl mt-0.5 leading-none">
                    {selectedDrinkForCustomizer.name}
                  </h4>
                </div>
              </div>

              {/* Short summary block */}
              <p className="font-sans text-xs text-[#777777] leading-relaxed mb-6 font-semibold">
                {selectedDrinkForCustomizer.description}
              </p>

              {/* Dynamic specifications summarize checklist */}
              <div className="space-y-2 bg-[#F7F3EE] p-4 rounded-2xl border border-[#E7C9B2]/20">
                <p className="font-mono text-[10px] text-[#C67B3D] uppercase tracking-wider font-extrabold mb-1">Recipe Specifications</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-sans text-xs text-[#1B1B1B] font-semibold">
                  <p className="flex justify-between">
                    <span className="text-[#777777]">Size:</span>
                    <span>{customs.size}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#777777]">Dilution:</span>
                    <span>{customs.milk}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#777777]">Sweetener:</span>
                    <span className="truncate max-w-[90px] text-right">{customs.sweetener}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#777777]">Ice Parameters:</span>
                    <span>{customs.iceLevel}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#777777]">Sugar Rating:</span>
                    <span>{customs.sugarLevel}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#777777]">Double Shot:</span>
                    <span>{customs.extraShot ? 'Yes' : 'No'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Price banner and Cart addition button */}
            <div className="relative z-10 pt-6 mt-6 border-t border-[#E7C9B2]/15 flex items-center justify-between">
              <div>
                <span className="block font-sans text-[9px] uppercase tracking-widest text-[#777777] font-medium leading-none">Calculated Price</span>
                <span className="font-mono text-xl font-black text-[#2B1B16] mt-1 inline-block">
                  ${livePrice.toFixed(2)}
                </span>
              </div>

              <button
                id="customizer-add-to-bag"
                onClick={handleAddCustomToBag}
                disabled={showConfetti}
                className="px-6 py-3.5 rounded-full bg-[#2B1B16] hover:bg-[#6B3E26] disabled:bg-green-600 text-[#FFFDF9] font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:scale-102 flex items-center space-x-2"
              >
                {showConfetti ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Selected Recipe Saved!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket • ${livePrice.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* COLUMN RIGHT: Customize parameters configurations panel */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl p-8 border border-[#E7C9B2]/20 shadow-md flex flex-col justify-between">
            <div className="space-y-8">
              
              {/* Size selectors */}
              <div>
                <span className="block font-mono text-[10px] text-[#C67B3D] uppercase tracking-widest font-extrabold mb-3">1. Select Cups Size</span>
                <div className="grid grid-cols-3 gap-3">
                  {(['Regular', 'Grande', 'Velvet XL'] as CustomizeOptions['size'][]).map((size) => {
                    const extraStr = size === 'Grande' ? '+$0.50' : size === 'Velvet XL' ? '+$0.95' : 'Base';
                    return (
                      <motion.button
                        id={`size-pill-${size}`}
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                        className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                          customs.size === size
                            ? 'bg-[#2B1B16] border-[#2B1B16] text-[#FFFDF9] shadow-xs'
                            : 'border-[#E7C9B2]/30 bg-[#F7F3EE] text-[#1B1B1B] hover:bg-white'
                        }`}
                      >
                        <span className="font-sans text-xs font-bold">{size}</span>
                        <span className="font-mono text-[9px] mt-0.5 opacity-80">{extraStr}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Milk formulation selector */}
              <div>
                <span className="block font-mono text-[10px] text-[#C67B3D] uppercase tracking-widest font-extrabold mb-3">2. Milk Formulation</span>
                <div className="flex flex-wrap gap-2">
                  {(['Whole Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk', 'No Milk'] as CustomizeOptions['milk'][]).map((milky) => {
                    const extraFee = (milky === 'Oat Milk' || milky === 'Almond Milk' || milky === 'Coconut Milk') ? ' (+$0.60)' : '';
                    return (
                      <motion.button
                        id={`milk-pill-${milky}`}
                        key={milky}
                        onClick={() => handleMilkChange(milky)}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                        className={`px-4 py-2 rounded-full font-sans text-xs font-semibold border tracking-wider transition-all cursor-pointer ${
                          customs.milk === milky
                            ? 'bg-[#6B3E26] border-[#6B3E26] text-white'
                            : 'border-[#E7C9B2]/30 hover:border-[#6B3E26] text-[#1B1B1B]'
                        }`}
                      >
                        {milky}{extraFee}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Syrup flavor selection details */}
              <div>
                <span className="block font-mono text-[10px] text-[#C67B3D] uppercase tracking-widest font-extrabold mb-3">3. Specialty Sweetener Infusion</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(['None', 'Caramel Drizzle', 'Vanilla Bean', 'Brown Sugar Syrup', 'Classic Cane'] as CustomizeOptions['sweetener'][]).map((syrup) => (
                    <motion.button
                      id={`syrup-pill-${syrup}`}
                      key={syrup}
                      onClick={() => handleSweetenerChange(syrup)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.96, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                      className={`px-4 py-3 rounded-2xl font-sans text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                        customs.sweetener === syrup
                          ? 'bg-[#C67B3D] border-[#C67B3D] text-white'
                          : 'border-[#E7C9B2]/20 hover:border-[#C67B3D]'
                      }`}
                    >
                      <span>{syrup}</span>
                      {customs.sweetener === syrup && <Check className="w-3.5 h-3.5 text-white" />}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Ice levels & Sweetener percentages layout grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Ice level parameters */}
                <div>
                  <span className="block font-mono text-[10px] text-[#C67B3D] uppercase tracking-widest font-extrabold mb-3">4. Ice Parameters</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['None', 'Light', 'Regular', 'Extra Ice'] as CustomizeOptions['iceLevel'][]).map((ice) => (
                      <motion.button
                        id={`ice-pill-${ice}`}
                        key={ice}
                        onClick={() => handleIceChange(ice)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                        className={`px-3 py-2 rounded-xl border text-center font-sans text-xs font-semibold transition-all cursor-pointer ${
                          customs.iceLevel === ice
                            ? 'bg-[#2B1B16] border-[#2B1B16] text-white font-bold'
                            : 'border-[#E7C9B2]/20 hover:bg-[#F7F3EE]'
                        }`}
                      >
                        {ice}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Sugar Level */}
                <div>
                  <span className="block font-mono text-[10px] text-[#C67B3D] uppercase tracking-widest font-extrabold mb-3">5. Organic Sugar Level</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['0%', '30%', '50%', '100%'] as CustomizeOptions['sugarLevel'][]).map((sugar) => (
                      <motion.button
                        id={`sugar-pill-${sugar}`}
                        key={sugar}
                        onClick={() => handleSugarChange(sugar)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                        className={`px-3 py-2 rounded-xl border text-center font-sans text-xs font-semibold transition-all cursor-pointer ${
                          customs.sugarLevel === sugar
                            ? 'bg-[#2B1B16] border-[#2B1B16] text-white font-bold'
                            : 'border-[#E7C9B2]/20 hover:bg-[#F7F3EE]'
                        }`}
                      >
                        {sugar === '0%' ? 'Unsweetened (0%)' : sugar}
                      </motion.button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Double extraction parameters (Extras toggle switch box) */}
              <div className="pt-6 border-t border-[#E7C9B2]/15">
                <div className="flex items-center justify-between bg-[#F7F3EE] p-5 rounded-3xl border border-[#E7C9B2]/30">
                  <div className="pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-sans text-sm font-bold text-[#1B1B1B]">Add Extra Double Ristretto Shot</span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFFDF9] bg-[#6B3E26] px-2 py-0.5 rounded-md font-semibold font-extrabold">+$1.00</span>
                    </div>
                    <p className="font-sans text-xs text-[#777777] mt-1 leading-normal font-medium">
                      Introduce an additional double-shot ristretto extraction of our Antigua single-estate dark roast beans (2oz).
                    </p>
                  </div>
                  
                  {/* Luxury Toggle Switch button */}
                  <motion.button
                    id="double-shot-toggle"
                    onClick={toggleExtraShot}
                    whileTap={{ scale: 0.92 }}
                    className={`w-14 h-8 rounded-full transition-colors relative flex items-center p-1.5 focus:outline-none cursor-pointer shrink-0 ${
                      customs.extraShot ? 'bg-[#C67B3D]' : 'bg-[#D9B9A0]'
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ x: customs.extraShot ? 22 : 0 }}
                    />
                  </motion.button>
                </div>
              </div>

            </div>

            {/* Note prompt on quality assurances */}
            <p className="font-sans text-[10px] text-center text-[#777777] mt-8 leading-relaxed font-semibold">
              * Note: Every customized beverage is made completely fresh on order by certified baristas. For temperature and texture safety reasons, Nitro Cascara standard parameters must run with regular or light ice levels.
            </p>
          </div>

        </div>

        {/* Recent Creations Section */}
        {recentCreations.length > 0 && (
          <motion.div
            id="recent-creations-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 pt-12 border-t border-[#E7C9B2]/30"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-[#C67B3D]" />
                <h4 className="font-serif italic font-extrabold text-[#2B1B16] text-xl sm:text-2xl">
                  Recent Creations
                </h4>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C67B3D] bg-[#C67B3D]/10 px-2.5 py-1 rounded-full font-bold">
                  Last 3 Designs
                </span>
              </div>
              <p className="font-sans text-[11px] text-[#777777] font-semibold">
                Saved locally. Click to instantly reload or reorder.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCreations.map((creation, index) => (
                <motion.div
                  id={`recent-card-${creation.id}`}
                  key={creation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E7C9B2]/20 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col justify-between"
                >
                  {/* Subtle design accent */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C67B3D]/40" />

                  <div className="flex items-start space-x-3.5 mb-4">
                    <img
                      src={creation.drink.image}
                      alt={creation.drink.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#E7C9B2]/10"
                    />
                    <div className="min-w-0">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-[#C67B3D] font-bold">
                        {creation.drink.category}
                      </span>
                      <h5 className="font-serif italic font-extrabold text-[#2B1B16] text-sm truncate">
                        {creation.drink.name}
                      </h5>
                      <p className="font-mono text-[9px] text-[#6B3E26] font-bold mt-0.5">
                        ${creation.finalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F7F3EE] p-2.5 rounded-xl border border-[#E7C9B2]/10 mb-4 min-h-[44px] flex items-center">
                    <p className="font-mono text-[9px] text-[#777777] leading-relaxed font-semibold">
                      {getCustomsSummary(creation.customizations)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      id={`load-recent-btn-${creation.id}`}
                      onClick={() => handleLoadCreation(creation)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-1.5 rounded-lg border border-[#2B1B16]/20 hover:border-[#2B1B16] text-[#2B1B16] font-sans text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                      title="Load this recipe configuration in the customizer workspace"
                    >
                      <Sparkles className="w-3 h-3 text-[#C67B3D]" />
                      <span>Load Recipe</span>
                    </motion.button>
                    <motion.button
                      id={`quick-add-recent-btn-${creation.id}`}
                      onClick={() => handleQuickAdd(creation)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 rounded-lg bg-[#2B1B16] hover:bg-[#6B3E26] text-white flex items-center justify-center cursor-pointer font-bold transition-colors"
                      title="Quick add to basket"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
